import { Route, Routes } from "react-router-dom";

import { Layout } from "./Layout";
import { Home } from "./Home";

import { AdvancedSlots } from "./advanced-slots/AdvancedSlots";
import { Baccarat } from "./baccarat/Baccarat";
import { BasicSlots } from "./basic-slots/BasicSlots";
import { BigSix } from "./big-six/BigSix";
import { Blackjack } from "./blackjack/Blackjack";
import { ChuckALuck } from "./chuck-a-luck/ChuckALuck";
import { CoinFlip } from "./coin-flip/CoinFlip";
import { DiamondMiner } from "./diamond-miner/DiamondMiner";
import { GiftTree } from "./gift-tree/GiftTree";
import { Keno } from "./keno/Keno";
import { NewRoulette } from "./new-roulette/NewRoulette";
import { Roulette } from "./roulette/Roulette";
import { SicBo } from "./sic-bo/SicBo";
import { SpacePoker } from "./space-poker/SpacePoker";
import { ThreeCardPoker } from "./three-card-poker/ThreeCardPoker";

import { Balances } from "./balances/Balances";

import { FIRST_PLAYER_ADDRESS } from "../common/blockchainWrapper";
import ChipSelection from "./common/ChipSelection";

const elementInLayout = (element) => <Layout>{element}</Layout>

export function App() {
    return (
        <Routes>
            <Route path="/" element={elementInLayout(<Home />)} />

            <Route path="/scratchpad" element={<ChipSelection />} />

            <Route path="/advanced-slots" element={elementInLayout(<AdvancedSlots />)} />
            <Route path="/baccarat" element={elementInLayout(<Baccarat />)} />
            <Route path="/basic-slots" element={elementInLayout(<BasicSlots />)} />
            <Route path="/big-six" element={elementInLayout(<BigSix />)} />
            <Route path="/blackjack" element={elementInLayout(<Blackjack />)} />
            <Route path="/chuck-a-luck" element={elementInLayout(<ChuckALuck />)} />
            <Route path="/coin-flip" element={elementInLayout(<CoinFlip />)} />
            <Route path="/diamond-miner" element={elementInLayout(<DiamondMiner />)} />
            <Route path="/gift-tree" element={elementInLayout(<GiftTree />)} />
            <Route path="/keno" element={elementInLayout(<Keno />)} />
            <Route path="/new-roulette" element={elementInLayout(<NewRoulette />)} />
            <Route path="/roulette" element={elementInLayout(<Roulette playerAddress={FIRST_PLAYER_ADDRESS} />)} />
            <Route path="/sic-bo" element={elementInLayout(<SicBo />)} />
            <Route path="/space-poker" element={elementInLayout(<SpacePoker />)} />
            <Route path="/three-card-poker" element={elementInLayout(<ThreeCardPoker />)} />

            <Route path="/balances" element={elementInLayout(<Balances />)} />
        </Routes>
    );
}
