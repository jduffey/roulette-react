import { Route, Routes } from "react-router-dom";

import { Layout } from "./Layout";

import { Home } from "./Home";
import { ChuckALuck } from "./chuck-a-luck/ChuckALuck";
import { ThreeCardPoker } from "./three-card-poker/ThreeCardPoker";
import { Roulette } from "./roulette/Roulette";
import { SicBo } from "./sic-bo/SicBo";
import { Blackjack } from "./blackjack/Blackjack";
import { Baccarat } from "./baccarat/Baccarat";
import { Keno } from "./keno/Keno";
import { SpacePoker } from "./space-poker/SpacePoker";
import { DiamondMiner } from "./diamond-miner/DiamondMiner";
import { GiftTree } from "./gift-tree/GiftTree";
import { CoinFlip } from "./coin-flip/CoinFlip";

import { Balances } from "./balances/Balances";

import { FIRST_PLAYER_ADDRESS } from "../common/blockchainWrapper";

const elementInLayout = (element) => <Layout>{element}</Layout>

export function App() {
    return (
        <Routes>
            <Route path="/" element={elementInLayout(<Home />)} />

            <Route path="/chuck-a-luck" element={elementInLayout(<ChuckALuck />)} />
            <Route path="/three-card-poker" element={elementInLayout(<ThreeCardPoker />)} />
            <Route path="/roulette" element={elementInLayout(<Roulette playerAddress={FIRST_PLAYER_ADDRESS} />)} />
            <Route path="/sic-bo" element={elementInLayout(<SicBo />)} />
            <Route path="/blackjack" element={elementInLayout(<Blackjack />)} />
            <Route path="/baccarat" element={elementInLayout(<Baccarat />)} />
            <Route path="/keno" element={elementInLayout(<Keno />)} />
            <Route path="/space-poker" element={elementInLayout(<SpacePoker />)} />
            <Route path="/diamond-miner" element={elementInLayout(<DiamondMiner />)} />
            <Route path="/gift-tree" element={elementInLayout(<GiftTree />)} />
            <Route path="/coin-flip" element={elementInLayout(<CoinFlip />)} />

            <Route path="/balances" element={elementInLayout(<Balances />)} />
        </Routes>
    );
}
