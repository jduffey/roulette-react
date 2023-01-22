import React from 'react';

import { BetResultsInfo } from './BetResultsInfo';
import { Board } from "./Board";
import { ChipSelection } from './ChipSelection';
import { CurrentBetsInfo } from './CurrentBetsInfo';
import { MostRecentSpinResults } from './MostRecentSpinResults';
import { PlayerInfo } from './PlayerInfo';
import { SpinButton } from './SpinButton';
import { SpinResult } from './SpinResult';

import { getBetNameMultiplier } from '../common/getBetNameMultiplier';
import { getNewBalance } from '../common/getNewBalance';
import { getRandomWheelNumber } from '../common/getRandomWheelNumber';
import { getWinningCriteria } from '../common/getWinningCriteria';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        const initialPlayerBalance = 10000;
        this.state = {
            betsOnBoard: {},
            playerBalance: initialPlayerBalance,
            currentChipAmountSelected: 1,
            mostRecentSpinResults: [],
            mostRecentWinningBetOptions: [],
            previousRoundBets: {},
            previousRoundStartingBalance: null,
        };
    }

    isSpinAllowed() {
        return Object.keys(this.state.betsOnBoard).length > 0;
    }

    handleBettingSquareClick(bettingSquareName) {
        const currentChipAmountSelected = this.state.currentChipAmountSelected;
        const copyBetsOnBoard = Object.assign({}, this.state.betsOnBoard);

        if (currentChipAmountSelected > this.state.playerBalance) {
            alert("You don't have enough money to place that bet!");
            return;
        }

        if (copyBetsOnBoard[bettingSquareName]) {
            copyBetsOnBoard[bettingSquareName] += currentChipAmountSelected;
        } else {
            copyBetsOnBoard[bettingSquareName] = currentChipAmountSelected;
        }

        const newBalance = this.state.playerBalance - currentChipAmountSelected;

        this.setState({
            betsOnBoard: copyBetsOnBoard,
            playerBalance: newBalance,
        });
    }

    getWinningBetOptions(wheelNumber) {
        const betsOptionsPlaced = Object.keys(this.state.betsOnBoard);
        const winningCriteria = getWinningCriteria(wheelNumber);
        const whichBetOptionsWon = betsOptionsPlaced.filter((betOptionPlaced) => winningCriteria.has(betOptionPlaced));

        return whichBetOptionsWon;
    }

    handleSpinButtonClick() {
        if (!this.isSpinAllowed()) {
            return;
        }

        const randomWheelNumber = getRandomWheelNumber();

        // TODO where is this used since it's not in getNewBalance?
        const winningBetOptions = this.getWinningBetOptions(randomWheelNumber);

        const betAmountOnBoard = this.calculateTotalBetAmount(this.state.betsOnBoard);

        const startingBalance = this.state.playerBalance + betAmountOnBoard;
        const newPlayerBalance =
            getNewBalance(startingBalance, this.state.betsOnBoard, randomWheelNumber);

        // TODO not terribly worried about this atm but setting this to 1 returns the entire slice/array; find a more robust solution
        const numberOfResultsToDisplay = 20;
        const mostRecentSpinResults = this.state.mostRecentSpinResults.slice(-(numberOfResultsToDisplay - 1));
        mostRecentSpinResults.push(randomWheelNumber);

        this.setState({
            previousRoundStartingBalance: this.state.playerBalance + this.calculateTotalBetAmount(this.state.betsOnBoard),
            playerBalance: newPlayerBalance,
            mostRecentWinningBetOptions: winningBetOptions,
            previousRoundBets: this.state.betsOnBoard,
            betsOnBoard: {},
            mostRecentSpinResults: mostRecentSpinResults,
        });
    }

    handleChipAmountClick(chipAmount) {
        this.setState({
            currentChipAmountSelected: chipAmount,
        });
    }

    calculateTotalBetAmount(bets) {
        return Object.values(bets).reduce((acc, betAmount) => acc + betAmount, 0);
    }

    render() {
        const mostRecentSpinResult = this.state.mostRecentSpinResults.slice(-1)[0];
        const playerBalance = this.state.playerBalance;
        return (
            <div>
                <Board
                    onClick={(bettingSquareName) => this.handleBettingSquareClick(bettingSquareName)}
                    betsOnBoard={this.state.betsOnBoard}
                />
                <ChipSelection
                    onClick={(chipAmount) => this.handleChipAmountClick(chipAmount)}
                    currentChipAmountSelected={this.state.currentChipAmountSelected}
                />
                <SpinButton
                    onClick={() => this.handleSpinButtonClick()}
                    isSpinAllowed={this.isSpinAllowed()}
                />
                <SpinResult
                    spinResult={mostRecentSpinResult}
                />
                <MostRecentSpinResults
                    spinResults={this.state.mostRecentSpinResults}
                />
                <PlayerInfo
                    availableBalance={playerBalance} // TODO bug is here? Appears to not always add winnings to balance, but sometimes does..?
                    totalBetAmount={this.calculateTotalBetAmount(this.state.betsOnBoard)}
                />
                <CurrentBetsInfo
                    betsOnBoard={this.state.betsOnBoard}
                />
                <BetResultsInfo
                    startingBalance={this.state.previousRoundStartingBalance}
                    bets={this.state.previousRoundBets}
                    winningWheelNumber={mostRecentSpinResult}
                />
            </div >
        );
    }

    calculateWinningsPlusReturnedBets(betsOnBoard, winningBetOptions) {
        const winnings = Object.keys(betsOnBoard).reduce((acc, betName) => {
            const multiplier = getBetNameMultiplier(betName);

            return acc +
                (winningBetOptions.includes(betName) ?
                    betsOnBoard[betName] * multiplier :
                    0);
        }, 0);

        const betsReturned = Object.keys(betsOnBoard).reduce((acc, betName) => {
            return acc +
                (winningBetOptions.includes(betName) ?
                    betsOnBoard[betName] :
                    0);
        }, 0);

        return winnings + betsReturned;
    }
}
