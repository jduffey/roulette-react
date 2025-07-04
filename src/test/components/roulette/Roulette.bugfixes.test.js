import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ethers } from 'ethers';
import { Roulette } from '../../../components/roulette/Roulette';
import * as blockchainWrapper from '../../../common/blockchainWrapper';

// Mock the blockchain wrapper
jest.mock('../../../common/blockchainWrapper');

describe('Roulette Bug Fix Tests', () => {
    const mockPlayerAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    let mockEventEmitter;

    beforeEach(() => {
        jest.clearAllMocks();
        
        mockEventEmitter = {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        };

        blockchainWrapper.rouletteContractEvents = mockEventEmitter;
        blockchainWrapper.getBlock.mockResolvedValue({ number: 100 });
        blockchainWrapper.getTokenBalance.mockResolvedValue('100.0');
        blockchainWrapper.getPlayerAllowance.mockResolvedValue('1000.0');
        blockchainWrapper.getPlayerNumberCompletionSetCurrent.mockResolvedValue([]);
        blockchainWrapper.getPlayerNumberCompletionSetsCounter.mockResolvedValue(0);
    });

    test('event listeners are properly cleaned up (memory leak fix)', async () => {
        const { unmount } = render(<Roulette playerAddress={mockPlayerAddress} />);

        // Wait for initial mount
        await waitFor(() => {
            expect(blockchainWrapper.getTokenBalance).toHaveBeenCalled();
        });

        // Count initial event listeners
        const initialListeners = mockEventEmitter.on.mock.calls.filter(
            call => call[0] === 'ExecutedWager'
        );

        // Place bet and spin to create more listeners
        const bettingSquares = screen.getAllByText('7');
        const bettingSquare = bettingSquares.find(el => 
            el.closest('.ClickableBet-component') !== null
        );
        fireEvent.click(bettingSquare);

        const mockTx = { wait: jest.fn().mockResolvedValue({ blockNumber: 101 }) };
        blockchainWrapper.executeWager.mockResolvedValue(mockTx);
        
        fireEvent.click(screen.getByText('SPIN'));

        await waitFor(() => {
            expect(blockchainWrapper.executeWager).toHaveBeenCalled();
        });

        // Count all registered handlers
        const allHandlers = mockEventEmitter.on.mock.calls
            .filter(call => call[0] === 'ExecutedWager')
            .map(call => call[1]);

        // Unmount
        unmount();

        // Verify all handlers were cleaned up
        allHandlers.forEach(handler => {
            expect(mockEventEmitter.off).toHaveBeenCalledWith('ExecutedWager', handler);
        });
    });

    test('no infinite re-render loop in NumbersHitTracker', async () => {
        const { container } = render(<Roulette playerAddress={mockPlayerAddress} />);

        // Initial call
        await waitFor(() => {
            expect(blockchainWrapper.getPlayerNumberCompletionSetCurrent).toHaveBeenCalledTimes(1);
        });

        // Wait a bit to ensure no additional calls
        await new Promise(resolve => setTimeout(resolve, 100));

        // Should still be only 1 call (no infinite loop)
        expect(blockchainWrapper.getPlayerNumberCompletionSetCurrent).toHaveBeenCalledTimes(1);
    });

    test('race condition fix - UI uses blockchain result not frontend prediction', async () => {
        const { container } = render(<Roulette playerAddress={mockPlayerAddress} />);

        // Place bet
        const bettingSquares = screen.getAllByText('7');
        const bettingSquare = bettingSquares.find(el => 
            el.closest('.ClickableBet-component') !== null
        );
        fireEvent.click(bettingSquare);

        // Setup transaction
        const mockTx = { wait: jest.fn().mockResolvedValue({ blockNumber: 101 }) };
        blockchainWrapper.executeWager.mockResolvedValue(mockTx);

        // Spin
        fireEvent.click(screen.getByText('SPIN'));

        await waitFor(() => {
            expect(blockchainWrapper.executeWager).toHaveBeenCalled();
        });

        // Simulate blockchain returning a different number than expected
        const eventHandler = mockEventEmitter.on.mock.calls.find(
            call => call[0] === 'ExecutedWager'
        )?.[1];
        
        eventHandler(mockPlayerAddress, ethers.BigNumber.from(23)); // Different from bet

        // UI should show blockchain result (23), not the bet (7)
        await waitFor(() => {
            const spinResult = container.querySelector('.SpinResult-component .spin-result-label');
            expect(spinResult).toHaveTextContent('23');
        });
    });

    test('transaction error handling', async () => {
        const { container } = render(<Roulette playerAddress={mockPlayerAddress} />);

        // Place bet
        const bettingSquares = screen.getAllByText('7');
        const bettingSquare = bettingSquares.find(el => 
            el.closest('.ClickableBet-component') !== null
        );
        fireEvent.click(bettingSquare);

        // Mock transaction failure
        blockchainWrapper.executeWager.mockRejectedValue(new Error('Transaction failed'));

        // Try to spin
        fireEvent.click(screen.getByText('SPIN'));

        // Check error is displayed
        await waitFor(() => {
            const errorElement = container.querySelector('.error-message');
            expect(errorElement).toBeTruthy();
            expect(errorElement.textContent).toContain('Failed to execute wager');
        });

        // Check that wheel is no longer spinning
        await waitFor(() => {
            const spinButton = screen.getByText('SPIN');
            expect(spinButton).toBeInTheDocument();
        });
    });

    test('precision handling with BigNumbers', async () => {
        // Test with precise balance
        blockchainWrapper.getTokenBalance.mockResolvedValue('1.123456789012345678');
        
        const { container } = render(<Roulette playerAddress={mockPlayerAddress} />);

        await waitFor(() => {
            expect(blockchainWrapper.getTokenBalance).toHaveBeenCalled();
        });

        // Should be able to place $1 bet
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
        
        const bettingSquares = screen.getAllByText('7');
        const bettingSquare = bettingSquares.find(el => 
            el.closest('.ClickableBet-component') !== null
        );
        fireEvent.click(bettingSquare);

        // No alert should be shown
        expect(alertSpy).not.toHaveBeenCalled();

        // Now try to place another $1 bet (should fail)
        const bettingSquares2 = screen.getAllByText('23');
        const bettingSquare2 = bettingSquares2.find(el => 
            el.closest('.ClickableBet-component') !== null
        );
        fireEvent.click(bettingSquare2);

        // This should trigger alert since total would be $2 > balance
        expect(alertSpy).toHaveBeenCalledWith("You don't have enough money to place that bet!");
        
        alertSpy.mockRestore();
    });

    test('multiple recent spin results without duplicates', async () => {
        const { container } = render(<Roulette playerAddress={mockPlayerAddress} />);

        // Get event handler
        const eventHandler = mockEventEmitter.on.mock.calls.find(
            call => call[0] === 'ExecutedWager'
        )?.[1];

        // Simulate multiple spins
        eventHandler(mockPlayerAddress, ethers.BigNumber.from(7));
        eventHandler(mockPlayerAddress, ethers.BigNumber.from(23));
        eventHandler(mockPlayerAddress, ethers.BigNumber.from(37)); // 00

        await waitFor(() => {
            const recentResults = container.querySelector('.MostRecentSpinResults-component');
            expect(recentResults).toHaveTextContent('7');
            expect(recentResults).toHaveTextContent('23');
            expect(recentResults).toHaveTextContent('00');
        });

        // Check no duplicates when re-rendering
        const results = container.querySelectorAll('.recent-spin-result');
        expect(results.length).toBe(3);
    });

    test('numbers hit tracker updates properly on new spins', async () => {
        // Start with some numbers already hit
        blockchainWrapper.getPlayerNumberCompletionSetCurrent.mockResolvedValue([7, 23]);
        
        const { container } = render(<Roulette playerAddress={mockPlayerAddress} />);

        await waitFor(() => {
            const seven = Array.from(container.querySelectorAll('.hit-number'))
                .find(el => el.textContent === '7');
            expect(seven).toHaveStyle({ backgroundColor: 'yellow' });
        });

        // Simulate a new spin
        const eventHandler = mockEventEmitter.on.mock.calls.find(
            call => call[0] === 'ExecutedWager'
        )?.[1];

        // Update mock to include new number
        blockchainWrapper.getPlayerNumberCompletionSetCurrent.mockResolvedValue([7, 23, 15]);
        
        eventHandler(mockPlayerAddress, ethers.BigNumber.from(15));

        // Should fetch updated set after debounce
        await waitFor(() => {
            expect(blockchainWrapper.getPlayerNumberCompletionSetCurrent).toHaveBeenCalledTimes(2);
        }, { timeout: 1000 });

        // Check new number is highlighted
        await waitFor(() => {
            const fifteen = Array.from(container.querySelectorAll('.hit-number'))
                .find(el => el.textContent === '15');
            expect(fifteen).toHaveStyle({ backgroundColor: 'yellow' });
        });
    });

    test('balance updates correctly after transaction confirmation', async () => {
        const { container } = render(<Roulette playerAddress={mockPlayerAddress} />);

        // Initial balance
        await waitFor(() => {
            const playerInfo = container.querySelector('.PlayerInfo-component');
            expect(playerInfo).toHaveTextContent('100');
        });

        // Place bet and spin
        const bettingSquares = screen.getAllByText('7');
        const bettingSquare = bettingSquares.find(el => 
            el.closest('.ClickableBet-component') !== null
        );
        fireEvent.click(bettingSquare);

        const mockTx = { wait: jest.fn().mockResolvedValue({ blockNumber: 101 }) };
        blockchainWrapper.executeWager.mockResolvedValue(mockTx);

        fireEvent.click(screen.getByText('SPIN'));

        await waitFor(() => {
            expect(blockchainWrapper.executeWager).toHaveBeenCalled();
        });

        // Update balance mock for win
        blockchainWrapper.getTokenBalance.mockResolvedValue('135.0');

        // Trigger event
        const eventHandler = mockEventEmitter.on.mock.calls.find(
            call => call[0] === 'ExecutedWager'
        )?.[1];
        
        eventHandler(mockPlayerAddress, ethers.BigNumber.from(7));

        // Balance should update
        await waitFor(() => {
            const playerInfo = container.querySelector('.PlayerInfo-component');
            expect(playerInfo).toHaveTextContent('135');
        });
    });
});