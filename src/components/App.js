import { Route, Routes } from "react-router-dom";

import { Layout } from "./Layout";

import { Home } from "./Home";
import { Roulette } from "./roulette/Roulette";
import { SicBo } from "./SicBo";
import { Balances } from "./balances/Balances";
import { EventsDashboard } from "./EventsDashboard";

import {
    FIRST_PLAYER_ADDRESS,
    SECOND_PLAYER_ADDRESS,
    THIRD_PLAYER_ADDRESS,
} from "../common/blockchainWrapper";

const elementInLayout = (element) => <Layout>{element}</Layout>

export function App() {
    return (
        <Routes>
            <Route path="/" element={elementInLayout(<Home />)} />
            <Route path="/roulette-p1" element={elementInLayout(<Roulette playerAddress={FIRST_PLAYER_ADDRESS} playerDbEndpoint="/player-1" />)} />
            <Route path="/roulette-p2" element={elementInLayout(<Roulette playerAddress={SECOND_PLAYER_ADDRESS} playerDbEndpoint="/player-2" />)} />
            <Route path="/roulette-p3" element={elementInLayout(<Roulette playerAddress={THIRD_PLAYER_ADDRESS} playerDbEndpoint="/player-3" />)} />
            <Route path="/sic-bo" element={elementInLayout(<SicBo />)} />
            <Route path="/balances" element={elementInLayout(<Balances />)} />
            <Route path="/events" element={elementInLayout(<EventsDashboard />)} />
        </Routes>
    );
}
