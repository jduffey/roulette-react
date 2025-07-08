import { useEffect, useState } from 'react';

import {
    getTokenBalance,
    getRouletteContractTokenBalance,
    fundRouletteContract,
    HOUSE_ADDRESS,
} from "../../common/blockchainWrapper";

const formattedChainNumber = (chainNumber, decimals) => {
    return chainNumber !== null && chainNumber !== undefined
        ? parseFloat(chainNumber)
            .toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : "Loading...";
}

const CLASS_NAME = "HouseInfo-component";
export function HouseInfo(props) {
    const [houseBalance, setHouseBalance] = useState(undefined);
    const [rouletteContractBalance, setRouletteContractBalance] = useState(undefined);
    const [isFunding, setIsFunding] = useState(false);

    const refreshHouseBalance = async () => {
        try {
            const houseBal = await getTokenBalance(HOUSE_ADDRESS);
            setHouseBalance(houseBal);
        } catch (error) {
            console.error('Error refreshing house balance:', error);
        }
    };

    const refreshRouletteContractBalance = async () => {
        try {
            const contractBal = await getRouletteContractTokenBalance();
            setRouletteContractBalance(contractBal);
        } catch (error) {
            console.error('Error refreshing Roulette contract balance:', error);
        }
    };

    const handleFundContract = async () => {
        setIsFunding(true);
        try {
            await fundRouletteContract(1000); // Fund with 1000 tokens
            await refreshHouseBalance();
            await refreshRouletteContractBalance();
        } catch (error) {
            console.error('Error funding contract:', error);
            alert('Failed to fund contract. Please try again.');
        } finally {
            setIsFunding(false);
        }
    };

    useEffect(() => {
        // Initial load with a small delay to ensure contracts are ready
        const timer = setTimeout(() => {
            refreshHouseBalance();
            refreshRouletteContractBalance();
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Refresh balances when block number changes (indicating new transactions)
    useEffect(() => {
        if (props.latestBlockNumber > 0) {
            refreshHouseBalance();
            refreshRouletteContractBalance();
        }
    }, [props.latestBlockNumber]);

    return (
        <div
            className={CLASS_NAME}
        >
            <div>
                Block Height
                <br />
                {props.latestBlockNumber}
            </div>
            <div>
                House Balance
                <br />
                {formattedChainNumber(houseBalance, 3)}
            </div>
            <div>
                Contract Balance
                <br />
                {formattedChainNumber(rouletteContractBalance, 3)}
            </div>
            <button
                onClick={handleFundContract}
                disabled={isFunding}
                style={{
                    backgroundColor: isFunding ? "#cccccc" : "#ff4444",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    cursor: isFunding ? "not-allowed" : "pointer",
                    marginTop: "10px"
                }}
            >
                {isFunding ? "Funding..." : "Fund Contract (1000)"}
            </button>
        </div >
    )
}
