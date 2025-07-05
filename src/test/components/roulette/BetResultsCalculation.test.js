import React from 'react';
import { render, screen } from '@testing-library/react';
import { BetResultsInfo } from '../../../components/roulette/BetResultsInfo';
import { getCompleteResultsOfRound } from '../../../common/getCompleteResultsOfRound';
import { PendingBet } from '../../../common/PendingBet';

describe('Bet Results Calculation', () => {
    describe('getCompleteResultsOfRound', () => {
        test('calculates winning straight bet correctly', () => {
            const startingBalance = 100;
            const pendingBets = [new PendingBet('STRAIGHT_UP_7', 10)];
            const winningWheelNumber = 7;

            const results = getCompleteResultsOfRound(
                startingBalance,
                pendingBets,
                winningWheelNumber
            );

            expect(results.startingBalance).toBe(100);
            expect(results.winningWheelNumber).toBe(7);
            expect(results.resultsOfBets.STRAIGHT_UP_7.didBetWin).toBe(true);
            expect(results.resultsOfBets.STRAIGHT_UP_7.winningsOnBet).toBe(350); // 10 * 35
            expect(results.resultsOfBets.STRAIGHT_UP_7.betReturned).toBe(10);
            expect(results.finalBalance).toBe(450); // 100 - 10 + 350 + 10
        });

        test('calculates losing bet correctly', () => {
            const startingBalance = 100;
            const pendingBets = [new PendingBet('STRAIGHT_UP_7', 10)];
            const winningWheelNumber = 23;

            const results = getCompleteResultsOfRound(
                startingBalance,
                pendingBets,
                winningWheelNumber
            );

            expect(results.resultsOfBets.STRAIGHT_UP_7.didBetWin).toBe(false);
            expect(results.resultsOfBets.STRAIGHT_UP_7.winningsOnBet).toBe(0);
            expect(results.resultsOfBets.STRAIGHT_UP_7.betReturned).toBe(0);
            expect(results.finalBalance).toBe(90); // 100 - 10
        });

        test('calculates winning color bet correctly', () => {
            const startingBalance = 100;
            const pendingBets = [new PendingBet('RED', 20)];
            const winningWheelNumber = 7; // 7 is red

            const results = getCompleteResultsOfRound(
                startingBalance,
                pendingBets,
                winningWheelNumber
            );

            expect(results.resultsOfBets.RED.didBetWin).toBe(true);
            expect(results.resultsOfBets.RED.winningsOnBet).toBe(20); // 20 * 1
            expect(results.resultsOfBets.RED.betReturned).toBe(20);
            expect(results.finalBalance).toBe(120); // 100 - 20 + 20 + 20
        });

        test('calculates winning dozen bet correctly', () => {
            const startingBalance = 100;
            const pendingBets = [new PendingBet('FIRST_DOZEN', 30)];
            const winningWheelNumber = 11; // In first dozen

            const results = getCompleteResultsOfRound(
                startingBalance,
                pendingBets,
                winningWheelNumber
            );

            expect(results.resultsOfBets.FIRST_DOZEN.didBetWin).toBe(true);
            expect(results.resultsOfBets.FIRST_DOZEN.winningsOnBet).toBe(60); // 30 * 2
            expect(results.resultsOfBets.FIRST_DOZEN.betReturned).toBe(30);
            expect(results.finalBalance).toBe(160); // 100 - 30 + 60 + 30
        });

        test('handles multiple bets on same number correctly', () => {
            const startingBalance = 100;
            const pendingBets = [
                new PendingBet('STRAIGHT_UP_7', 5),
                new PendingBet('STRAIGHT_UP_7', 10)
            ];
            const winningWheelNumber = 7;

            const results = getCompleteResultsOfRound(
                startingBalance,
                pendingBets,
                winningWheelNumber
            );

            expect(results.resultsOfBets.STRAIGHT_UP_7.betAmount).toBe(15);
            expect(results.resultsOfBets.STRAIGHT_UP_7.winningsOnBet).toBe(525); // 15 * 35
            expect(results.resultsOfBets.STRAIGHT_UP_7.betReturned).toBe(15);
            expect(results.finalBalance).toBe(625); // 100 - 15 + 525 + 15
        });

        test('handles 0 correctly', () => {
            const startingBalance = 100;
            const pendingBets = [new PendingBet('STRAIGHT_UP_0', 10)];
            const winningWheelNumber = 0;

            const results = getCompleteResultsOfRound(
                startingBalance,
                pendingBets,
                winningWheelNumber
            );

            expect(results.resultsOfBets.STRAIGHT_UP_0.didBetWin).toBe(true);
            expect(results.resultsOfBets.STRAIGHT_UP_0.winningsOnBet).toBe(350); // 10 * 35
        });

        test('handles 00 (37) correctly', () => {
            const startingBalance = 100;
            const pendingBets = [new PendingBet('STRAIGHT_UP_00', 10)];
            const winningWheelNumber = 37; // 00

            const results = getCompleteResultsOfRound(
                startingBalance,
                pendingBets,
                winningWheelNumber
            );

            expect(results.resultsOfBets.STRAIGHT_UP_00.didBetWin).toBe(true);
            expect(results.resultsOfBets.STRAIGHT_UP_00.winningsOnBet).toBe(350); // 10 * 35
        });
    });

    describe('BetResultsInfo Component', () => {
        test('displays winning bet results correctly', () => {
            const mockResults = {
                startingBalance: 100,
                winningWheelNumber: 7,
                finalBalance: 450,
                resultsOfBets: {
                    STRAIGHT_UP_7: {
                        betAmount: 10,
                        winningsOnBet: 350,
                        betReturned: 10,
                        didBetWin: true
                    }
                }
            };

            render(<BetResultsInfo previousRoundResults={mockResults} />);

            // Check that winning information is displayed
            expect(screen.getByText(/Starting Balance:/)).toBeInTheDocument();
            expect(screen.getByText(/100/)).toBeInTheDocument();
            expect(screen.getByText(/Winning Wheel Number:/)).toBeInTheDocument();
            expect(screen.getByText(/7/)).toBeInTheDocument();
            expect(screen.getByText(/Final Balance:/)).toBeInTheDocument();
            expect(screen.getByText(/450/)).toBeInTheDocument();
        });

        test('displays multiple bet results correctly', () => {
            const mockResults = {
                startingBalance: 100,
                winningWheelNumber: 7,
                finalBalance: 110,
                resultsOfBets: {
                    STRAIGHT_UP_7: {
                        betAmount: 5,
                        winningsOnBet: 175,
                        betReturned: 5,
                        didBetWin: true
                    },
                    RED: {
                        betAmount: 10,
                        winningsOnBet: 10,
                        betReturned: 10,
                        didBetWin: true
                    },
                    SECOND_DOZEN: {
                        betAmount: 20,
                        winningsOnBet: 0,
                        betReturned: 0,
                        didBetWin: false
                    }
                }
            };

            render(<BetResultsInfo previousRoundResults={mockResults} />);

            // Check all bets are displayed
            expect(screen.getByText(/STRAIGHT_UP_7/)).toBeInTheDocument();
            expect(screen.getByText(/RED/)).toBeInTheDocument();
            expect(screen.getByText(/SECOND_DOZEN/)).toBeInTheDocument();
        });

        test('displays nothing when no results', () => {
            const { container } = render(<BetResultsInfo previousRoundResults={null} />);
            
            // Component should render but be empty
            expect(container.firstChild).toBeInTheDocument();
            expect(screen.queryByText(/Starting Balance:/)).not.toBeInTheDocument();
        });

        test('displays 00 correctly for wheel number 37', () => {
            const mockResults = {
                startingBalance: 100,
                winningWheelNumber: 37,
                finalBalance: 450,
                resultsOfBets: {
                    STRAIGHT_UP_00: {
                        betAmount: 10,
                        winningsOnBet: 350,
                        betReturned: 10,
                        didBetWin: true
                    }
                }
            };

            render(<BetResultsInfo previousRoundResults={mockResults} />);

            // Should display 00 instead of 37
            expect(screen.getByText(/00/)).toBeInTheDocument();
            expect(screen.queryByText(/37/)).not.toBeInTheDocument();
        });
    });
});