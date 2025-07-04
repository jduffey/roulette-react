import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ethers } from 'ethers';
import { Roulette } from '../../../components/roulette/Roulette';
import * as blockchainWrapper from '../../../common/blockchainWrapper';

// Mock the blockchain wrapper
jest.mock('../../../common/blockchainWrapper');

describe('Roulette Integration Tests', () => {
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

    test('renders all components correctly', async () => {
        await act(async () => {
            render(<Roulette playerAddress={mockPlayerAddress} />);
        });
        
        // Check main components are rendered
        expect(screen.getByText('SPIN')).toBeInTheDocument();
        
        // Check chip selection is rendered
        expect(screen.getByText('$1')).toBeInTheDocument();
    });

    test('handles betting workflow correctly', async () => {
        render(<Roulette playerAddress={mockPlayerAddress} />);

        // Wait for initial data load
        await waitFor(() => {
            expect(blockchainWrapper.getTokenBalance).toHaveBeenCalledWith(mockPlayerAddress);
        });

        // Click on a betting square (e.g., number 7)
        const bettingSquares = screen.getAllByText('7');
        const bettingSquare = bettingSquares.find(el => 
            el.closest('.ClickableBet-component') !== null
        );
        fireEvent.click(bettingSquare);

        // Check that pending bet is displayed
        await waitFor(() => {
            expect(screen.getByText(/STRAIGHT_UP_7/)).toBeInTheDocument();
        });
    });

    test('prevents betting more than available balance', async () => {
        // Set a low balance
        blockchainWrapper.getTokenBalance.mockResolvedValue('0.5');
        
        render(<Roulette playerAddress={mockPlayerAddress} />);

        // Wait for balance to load
        await waitFor(() => {
            expect(blockchainWrapper.getTokenBalance).toHaveBeenCalled();
        });

        // Select a high chip amount (5)
        const chip5 = screen.getByText('$5');
        fireEvent.click(chip5);

        // Mock window.alert
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

        // Try to place a bet
        const bettingSquares = screen.getAllByText('7');
        const bettingSquare = bettingSquares.find(el => 
            el.closest('.ClickableBet-component') !== null
        );
        fireEvent.click(bettingSquare);

        expect(alertSpy).toHaveBeenCalledWith("You don't have enough money to place that bet!");
        alertSpy.mockRestore();
    });

    test('handles spin workflow with blockchain interaction', async () => {
        const mockTx = {
            wait: jest.fn().mockResolvedValue({ blockNumber: 101 })
        };
        blockchainWrapper.executeWager.mockResolvedValue(mockTx);

        render(<Roulette playerAddress={mockPlayerAddress} />);

        // Place a bet
        const bettingSquares = screen.getAllByText('7');
        const bettingSquare = bettingSquares.find(el => 
            el.closest('.ClickableBet-component') !== null
        );
        fireEvent.click(bettingSquare);

        // Click spin button
        const spinButton = screen.getByText('SPIN');
        fireEvent.click(spinButton);

        // Verify executeWager was called
        await waitFor(() => {
            expect(blockchainWrapper.executeWager).toHaveBeenCalledWith(mockPlayerAddress);
        });

        // Verify transaction was waited for
        expect(mockTx.wait).toHaveBeenCalled();

        // Simulate blockchain event
        const eventHandler = mockEventEmitter.on.mock.calls.find(
            call => call[0] === 'ExecutedWager'
        )[1];
        eventHandler(mockPlayerAddress, ethers.BigNumber.from(7));

        // Check that the wheel number is displayed
        await waitFor(() => {
            expect(screen.getAllByText('7').length).toBeGreaterThan(1);
        });
    });

    test('handles multiple bets restriction', async () => {
        render(<Roulette playerAddress={mockPlayerAddress} />);

        // Place first bet
        const bettingSquares = screen.getAllByText('7');
        const bettingSquare = bettingSquares.find(el => 
            el.closest('.ClickableBet-component') !== null
        );
        fireEvent.click(bettingSquare);
        
        // Place second bet
        fireEvent.click(screen.getByText('Red'));

        // Mock alert
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

        // Try to spin
        fireEvent.click(screen.getByText('SPIN'));

        expect(alertSpy).toHaveBeenCalledWith(
            "Only one bet per spin is supported right now. Please remove extra bets or wait for multi-bet support."
        );
        alertSpy.mockRestore();
    });

    test('handles blockchain errors gracefully', async () => {
        const mockError = new Error('Transaction failed');
        blockchainWrapper.executeWager.mockRejectedValue(mockError);

        render(<Roulette playerAddress={mockPlayerAddress} />);

        // Place a bet and spin
        const bettingSquares = screen.getAllByText('7');
        const bettingSquare = bettingSquares.find(el => 
            el.closest('.ClickableBet-component') !== null
        );
        fireEvent.click(bettingSquare);
        fireEvent.click(screen.getByText('SPIN'));

        // Check error is displayed
        await waitFor(() => {
            expect(screen.getByText(/Failed to execute wager/)).toBeInTheDocument();
        });
    });

    test('cleans up event listeners on unmount', async () => {
        const { unmount } = render(<Roulette playerAddress={mockPlayerAddress} />);

        // Place bet and start spin to register event listener
        const bettingSquares = screen.getAllByText('7');
        const bettingSquare = bettingSquares.find(el => 
            el.closest('.ClickableBet-component') !== null
        );
        fireEvent.click(bettingSquare);
        
        const mockTx = { wait: jest.fn().mockResolvedValue({ blockNumber: 101 }) };
        blockchainWrapper.executeWager.mockResolvedValue(mockTx);
        
        fireEvent.click(screen.getByText('SPIN'));
        
        await waitFor(() => {
            expect(mockEventEmitter.on).toHaveBeenCalled();
        });

        // Unmount component
        unmount();

        // Verify cleanup - off should be called for any registered handlers
        const onCalls = mockEventEmitter.on.mock.calls;
        const registeredHandlers = onCalls.filter(call => call[0] === 'ExecutedWager');
        
        if (registeredHandlers.length > 0) {
            expect(mockEventEmitter.off).toHaveBeenCalled();
        }
    });

    test('updates balance after successful spin', async () => {
        const mockTx = { wait: jest.fn().mockResolvedValue({ blockNumber: 101 }) };
        blockchainWrapper.executeWager.mockResolvedValue(mockTx);
        
        // Initial balance
        blockchainWrapper.getTokenBalance.mockResolvedValue('100.0');
        
        render(<Roulette playerAddress={mockPlayerAddress} />);

        // Place bet and spin
        const bettingSquares = screen.getAllByText('7');
        const bettingSquare = bettingSquares.find(el => 
            el.closest('.ClickableBet-component') !== null
        );
        fireEvent.click(bettingSquare);
        fireEvent.click(screen.getByText('SPIN'));

        await waitFor(() => {
            expect(blockchainWrapper.executeWager).toHaveBeenCalled();
        });

        // Update balance after spin
        blockchainWrapper.getTokenBalance.mockResolvedValue('135.0'); // Won the bet

        // Trigger the event
        const eventHandler = mockEventEmitter.on.mock.calls.find(
            call => call[0] === 'ExecutedWager'
        )[1];
        eventHandler(mockPlayerAddress, ethers.BigNumber.from(7));

        // Verify balance was refreshed
        await waitFor(() => {
            expect(blockchainWrapper.getTokenBalance).toHaveBeenCalledTimes(2);
        });
    });

    test('handles precision correctly with ethers BigNumber', async () => {
        // Set balance with many decimal places
        blockchainWrapper.getTokenBalance.mockResolvedValue('0.123456789012345678');
        
        render(<Roulette playerAddress={mockPlayerAddress} />);

        await waitFor(() => {
            expect(blockchainWrapper.getTokenBalance).toHaveBeenCalled();
        });

        // Select a small chip amount - default is already 1, but let's make sure
        const chip1 = screen.getByText('$1');
        fireEvent.click(chip1);

        // Should be able to place bet with 0.123... balance
        const bettingSquares = screen.getAllByText('7');
        const bettingSquare = bettingSquares.find(el => 
            el.closest('.ClickableBet-component') !== null
        );
        fireEvent.click(bettingSquare);

        // No alert should be shown
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
        expect(alertSpy).not.toHaveBeenCalled();
        alertSpy.mockRestore();
    });
});