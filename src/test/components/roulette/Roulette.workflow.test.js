import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Add jest-dom matchers
import { ethers } from 'ethers';
import { Roulette } from '../../../components/roulette/Roulette';
import * as blockchainWrapper from '../../../common/blockchainWrapper';

// Mock the blockchain wrapper
jest.mock('../../../common/blockchainWrapper');

describe('Roulette Workflow Tests', () => {
    const mockPlayerAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    let mockEventEmitter;

    beforeEach(() => {
        // Reset all mocks
        jest.clearAllMocks();
        
        // Create a mock event emitter
        mockEventEmitter = {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        };

        // Setup default mock implementations
        blockchainWrapper.rouletteContractEvents = mockEventEmitter;
        blockchainWrapper.getBlock.mockResolvedValue({ number: 100 });
        blockchainWrapper.getTokenBalance.mockResolvedValue('100.0');
        blockchainWrapper.getPlayerAllowance.mockResolvedValue('1000.0');
        blockchainWrapper.getPlayerNumberCompletionSetCurrent.mockResolvedValue([]);
        blockchainWrapper.getPlayerNumberCompletionSetsCounter.mockResolvedValue(0);
    });

    test('complete betting and spinning workflow', async () => {
        const { container } = render(<Roulette playerAddress={mockPlayerAddress} />);

        // Wait for initial data to load
        await waitFor(() => {
            expect(blockchainWrapper.getTokenBalance).toHaveBeenCalled();
        });

        // 1. Select a chip amount ($5)
        const chip5 = screen.getByText('$5');
        fireEvent.click(chip5);

        // 2. Click on a betting square (number 7)
        const bettingSquares = screen.getAllByText('7');
        const bettingSquare = bettingSquares.find(el => 
            el.closest('.ClickableBet-component') !== null
        );
        fireEvent.click(bettingSquare);

        // 3. Verify the bet is placed - check if chip shows $5 on the square
        await waitFor(() => {
            const chips = container.querySelectorAll('.betting-square-chip');
            const placedChip = Array.from(chips).find(chip => 
                chip.textContent === '$5' && chip.style.display !== 'none'
            );
            expect(placedChip).toBeTruthy();
        });

        // 4. Setup mock for successful transaction
        const mockTx = {
            wait: jest.fn().mockResolvedValue({ blockNumber: 101 })
        };
        blockchainWrapper.executeWager.mockResolvedValue(mockTx);

        // 5. Click spin button
        const spinButton = screen.getByText('SPIN');
        fireEvent.click(spinButton);

        // 6. Verify executeWager was called
        await waitFor(() => {
            expect(blockchainWrapper.executeWager).toHaveBeenCalledWith(mockPlayerAddress);
        });

        // 7. Verify transaction was confirmed
        expect(mockTx.wait).toHaveBeenCalled();

        // 8. Simulate blockchain event with winning number
        const eventHandler = mockEventEmitter.on.mock.calls.find(
            call => call[0] === 'ExecutedWager'
        )?.[1];
        
        expect(eventHandler).toBeDefined();
        eventHandler(mockPlayerAddress, ethers.BigNumber.from(7));

        // 9. Verify UI updates with result
        await waitFor(() => {
            // Check that the spin result shows 7
            const spinResult = container.querySelector('.SpinResult-component .spin-result-label');
            expect(spinResult).toHaveTextContent('7');
        });

        // 10. Verify balance refresh was triggered
        await waitFor(() => {
            expect(blockchainWrapper.getTokenBalance).toHaveBeenCalledTimes(2);
        });
    });

    test('prevents betting more than balance', async () => {
        // Set low balance
        blockchainWrapper.getTokenBalance.mockResolvedValue('2.0');
        
        render(<Roulette playerAddress={mockPlayerAddress} />);

        await waitFor(() => {
            expect(blockchainWrapper.getTokenBalance).toHaveBeenCalled();
        });

        // Select high chip amount ($5)
        const chip5 = screen.getByText('$5');
        fireEvent.click(chip5);

        // Mock alert
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

        // Try to place bet
        const bettingSquares = screen.getAllByText('7');
        const bettingSquare = bettingSquares.find(el => 
            el.closest('.ClickableBet-component') !== null
        );
        fireEvent.click(bettingSquare);

        expect(alertSpy).toHaveBeenCalledWith("You don't have enough money to place that bet!");
        alertSpy.mockRestore();
    });

    test('handles transaction errors gracefully', async () => {
        const { container } = render(<Roulette playerAddress={mockPlayerAddress} />);

        // Place a bet
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
            expect(errorElement).toHaveTextContent('Failed to execute wager');
        });
    });

    test('properly tracks numbers hit', async () => {
        // Set some numbers already hit
        blockchainWrapper.getPlayerNumberCompletionSetCurrent
            .mockResolvedValue([7, 23, 37]); // 37 is "00"

        const { container } = render(<Roulette playerAddress={mockPlayerAddress} />);

        // Wait for numbers to load
        await waitFor(() => {
            expect(blockchainWrapper.getPlayerNumberCompletionSetCurrent)
                .toHaveBeenCalledWith(mockPlayerAddress);
        });

        // Check that hit numbers are highlighted
        await waitFor(() => {
            const hitNumbers = container.querySelectorAll('.hit-number');
            const seven = Array.from(hitNumbers).find(el => el.textContent === '7');
            const twentyThree = Array.from(hitNumbers).find(el => el.textContent === '23');
            const doubleZero = Array.from(hitNumbers).find(el => el.textContent === '00');

            expect(seven).toHaveStyle({ backgroundColor: 'yellow' });
            expect(twentyThree).toHaveStyle({ backgroundColor: 'yellow' });
            expect(doubleZero).toHaveStyle({ backgroundColor: 'yellow' });
        });
    });

    test('enforces one bet per spin restriction', async () => {
        render(<Roulette playerAddress={mockPlayerAddress} />);

        // Place first bet
        const bettingSquares = screen.getAllByText('7');
        const bettingSquare7 = bettingSquares.find(el => 
            el.closest('.ClickableBet-component') !== null
        );
        fireEvent.click(bettingSquare7);

        // Place second bet
        const redSquare = screen.getByText('Red');
        fireEvent.click(redSquare);

        // Mock alert
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

        // Try to spin
        fireEvent.click(screen.getByText('SPIN'));

        expect(alertSpy).toHaveBeenCalledWith(
            "Only one bet per spin is supported right now. Please remove extra bets or wait for multi-bet support."
        );
        alertSpy.mockRestore();
    });

    test('updates UI correctly after winning bet', async () => {
        const { container } = render(<Roulette playerAddress={mockPlayerAddress} />);

        // Place bet on 7
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

        // Simulate winning on 7
        const eventHandler = mockEventEmitter.on.mock.calls.find(
            call => call[0] === 'ExecutedWager'
        )?.[1];
        
        // Update balance to reflect winning
        blockchainWrapper.getTokenBalance.mockResolvedValue('135.0'); // Won 35:1 on $1 bet

        eventHandler(mockPlayerAddress, ethers.BigNumber.from(7));

        // Check that the result is displayed
        await waitFor(() => {
            const spinResult = container.querySelector('.SpinResult-component .spin-result-label');
            expect(spinResult).toHaveTextContent('7');
            expect(spinResult).toHaveStyle({ backgroundColor: 'rgb(217, 72, 72)' }); // Red color
        });

        // Verify balance was updated
        await waitFor(() => {
            const balanceElement = container.querySelector('.PlayerInfo-component');
            expect(balanceElement).toHaveTextContent(/135/);
        });
    });

    test('cleans up event listeners on unmount', async () => {
        const { unmount } = render(<Roulette playerAddress={mockPlayerAddress} />);

        // Wait for component to mount and register listeners
        await waitFor(() => {
            expect(mockEventEmitter.on).toHaveBeenCalled();
        });

        // Get all registered event handlers
        const registeredHandlers = mockEventEmitter.on.mock.calls
            .filter(call => call[0] === 'ExecutedWager')
            .map(call => call[1]);

        // Unmount
        unmount();

        // Verify all handlers were cleaned up
        registeredHandlers.forEach(handler => {
            expect(mockEventEmitter.off).toHaveBeenCalledWith('ExecutedWager', handler);
        });
    });

    test('handles precision with small balances', async () => {
        // Set precise balance
        blockchainWrapper.getTokenBalance.mockResolvedValue('1.123456789012345678');
        
        render(<Roulette playerAddress={mockPlayerAddress} />);

        await waitFor(() => {
            expect(blockchainWrapper.getTokenBalance).toHaveBeenCalled();
        });

        // Should be able to place $1 bet
        const bettingSquares = screen.getAllByText('7');
        const bettingSquare = bettingSquares.find(el => 
            el.closest('.ClickableBet-component') !== null
        );

        // No alert should appear
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
        fireEvent.click(bettingSquare);
        expect(alertSpy).not.toHaveBeenCalled();
        alertSpy.mockRestore();
    });
});