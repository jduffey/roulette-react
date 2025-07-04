import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MostRecentSpinResults } from '../../../components/roulette/MostRecentSpinResults';
import { SpinResult } from '../../../components/roulette/SpinResult';
import { NumbersHitTracker } from '../../../components/roulette/NumbersHitTracker';
import * as blockchainWrapper from '../../../common/blockchainWrapper';
import { ethers } from 'ethers';

jest.mock('../../../common/blockchainWrapper');

describe('Event Listener Components', () => {
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
        blockchainWrapper.getPlayerNumberCompletionSetCurrent.mockResolvedValue([]);
    });

    describe('MostRecentSpinResults', () => {
        test('registers and cleans up event listener', () => {
            const { unmount } = render(
                <MostRecentSpinResults playerAddress={mockPlayerAddress} />
            );

            // Check event listener was registered
            expect(mockEventEmitter.on).toHaveBeenCalledWith(
                'ExecutedWager',
                expect.any(Function)
            );

            // Unmount and check cleanup
            unmount();
            expect(mockEventEmitter.off).toHaveBeenCalledWith(
                'ExecutedWager',
                expect.any(Function)
            );
        });

        test('updates spin results when event is fired', async () => {
            render(<MostRecentSpinResults playerAddress={mockPlayerAddress} />);

            // Get the registered event handler
            const eventHandler = mockEventEmitter.on.mock.calls[0][1];

            // Simulate multiple spins
            eventHandler(mockPlayerAddress, ethers.BigNumber.from(7));
            eventHandler(mockPlayerAddress, ethers.BigNumber.from(23));
            eventHandler(mockPlayerAddress, ethers.BigNumber.from(37)); // 00

            // Check results are displayed
            await waitFor(() => {
                expect(screen.getByText('7')).toBeInTheDocument();
                expect(screen.getByText('23')).toBeInTheDocument();
                expect(screen.getByText('00')).toBeInTheDocument(); // 37 displays as 00
            });
        });

        test('only keeps last 20 results', async () => {
            render(<MostRecentSpinResults playerAddress={mockPlayerAddress} />);

            const eventHandler = mockEventEmitter.on.mock.calls[0][1];

            // Simulate 25 spins
            for (let i = 1; i <= 25; i++) {
                eventHandler(mockPlayerAddress, ethers.BigNumber.from(i));
            }

            // Wait for updates
            await waitFor(() => {
                // First 5 should not be visible (1-5)
                expect(screen.queryByText('1')).not.toBeInTheDocument();
                expect(screen.queryByText('5')).not.toBeInTheDocument();
                
                // Last ones should be visible (21-25)
                expect(screen.getByText('21')).toBeInTheDocument();
                expect(screen.getByText('25')).toBeInTheDocument();
            });
        });

        test('ignores events for other players', async () => {
            render(<MostRecentSpinResults playerAddress={mockPlayerAddress} />);

            const eventHandler = mockEventEmitter.on.mock.calls[0][1];

            // Event for different player
            eventHandler('0xDifferentAddress', ethers.BigNumber.from(7));

            // Should not display
            await waitFor(() => {
                expect(screen.queryByText('7')).not.toBeInTheDocument();
            });
        });
    });

    describe('SpinResult', () => {
        test('displays prop value when provided', () => {
            render(
                <SpinResult 
                    playerAddress={mockPlayerAddress} 
                    spinResult={15}
                />
            );

            expect(screen.getByText('15')).toBeInTheDocument();
        });

        test('displays 00 for wheel number 37', () => {
            render(
                <SpinResult 
                    playerAddress={mockPlayerAddress} 
                    spinResult={37}
                />
            );

            expect(screen.getByText('00')).toBeInTheDocument();
        });

        test('updates from blockchain events', async () => {
            render(<SpinResult playerAddress={mockPlayerAddress} />);

            const eventHandler = mockEventEmitter.on.mock.calls[0][1];
            eventHandler(mockPlayerAddress, ethers.BigNumber.from(23));

            await waitFor(() => {
                expect(screen.getByText('23')).toBeInTheDocument();
            });
        });

        test('cleans up event listener on unmount', () => {
            const { unmount } = render(
                <SpinResult playerAddress={mockPlayerAddress} />
            );

            unmount();
            expect(mockEventEmitter.off).toHaveBeenCalled();
        });
    });

    describe('NumbersHitTracker', () => {
        test('fetches initial data on mount', async () => {
            render(<NumbersHitTracker playerAddress={mockPlayerAddress} />);

            await waitFor(() => {
                expect(blockchainWrapper.getPlayerNumberCompletionSetCurrent)
                    .toHaveBeenCalledWith(mockPlayerAddress);
            });
        });

        test('highlights hit numbers', async () => {
            blockchainWrapper.getPlayerNumberCompletionSetCurrent
                .mockResolvedValue([7, 23, 37]);

            render(<NumbersHitTracker playerAddress={mockPlayerAddress} />);

            await waitFor(() => {
                // Check highlighted numbers have yellow background
                const seven = screen.getByText('7');
                expect(seven).toHaveStyle({ backgroundColor: 'yellow', color: 'black' });

                const twentyThree = screen.getByText('23');
                expect(twentyThree).toHaveStyle({ backgroundColor: 'yellow', color: 'black' });

                const doubleZero = screen.getByText('00'); // 37 displays as 00
                expect(doubleZero).toHaveStyle({ backgroundColor: 'yellow', color: 'black' });

                // Check non-hit number
                const one = screen.getByText('1');
                expect(one).toHaveStyle({ backgroundColor: 'inherit', color: 'gray' });
            });
        });

        test('refreshes data when ExecutedWager event fires', async () => {
            let callCount = 0;
            blockchainWrapper.getPlayerNumberCompletionSetCurrent
                .mockImplementation(() => {
                    callCount++;
                    if (callCount === 1) return Promise.resolve([7]);
                    return Promise.resolve([7, 23]);
                });

            render(<NumbersHitTracker playerAddress={mockPlayerAddress} />);

            // Wait for initial load
            await waitFor(() => {
                expect(blockchainWrapper.getPlayerNumberCompletionSetCurrent)
                    .toHaveBeenCalledTimes(1);
            });

            // Fire event
            const eventHandler = mockEventEmitter.on.mock.calls[0][1];
            eventHandler(mockPlayerAddress, ethers.BigNumber.from(23));

            // Wait for debounced update
            await waitFor(() => {
                expect(blockchainWrapper.getPlayerNumberCompletionSetCurrent)
                    .toHaveBeenCalledTimes(2);
            }, { timeout: 1000 });
        });

        test('debounces rapid event updates', async () => {
            render(<NumbersHitTracker playerAddress={mockPlayerAddress} />);

            const eventHandler = mockEventEmitter.on.mock.calls[0][1];

            // Fire multiple events rapidly
            eventHandler(mockPlayerAddress, ethers.BigNumber.from(1));
            eventHandler(mockPlayerAddress, ethers.BigNumber.from(2));
            eventHandler(mockPlayerAddress, ethers.BigNumber.from(3));

            // Initial call + only one debounced call
            await waitFor(() => {
                expect(blockchainWrapper.getPlayerNumberCompletionSetCurrent)
                    .toHaveBeenCalledTimes(2);
            }, { timeout: 1000 });
        });

        test('cleans up timer and event listener on unmount', async () => {
            const { unmount } = render(
                <NumbersHitTracker playerAddress={mockPlayerAddress} />
            );

            // Fire event to start timer
            const eventHandler = mockEventEmitter.on.mock.calls[0][1];
            eventHandler(mockPlayerAddress, ethers.BigNumber.from(7));

            // Unmount immediately
            unmount();

            // Check cleanup
            expect(mockEventEmitter.off).toHaveBeenCalled();
            
            // Wait to ensure timer doesn't fire after unmount
            await new Promise(resolve => setTimeout(resolve, 600));
            
            // Should only have been called once (initial mount)
            expect(blockchainWrapper.getPlayerNumberCompletionSetCurrent)
                .toHaveBeenCalledTimes(1);
        });

        test('handles errors gracefully', async () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
            blockchainWrapper.getPlayerNumberCompletionSetCurrent
                .mockRejectedValue(new Error('Network error'));

            render(<NumbersHitTracker playerAddress={mockPlayerAddress} />);

            await waitFor(() => {
                expect(consoleErrorSpy).toHaveBeenCalledWith(
                    "Error fetching current number set:",
                    expect.any(Error)
                );
            });

            consoleErrorSpy.mockRestore();
        });
    });
});