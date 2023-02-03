import { Route, Routes } from "react-router-dom";

import { Layout } from "./Layout";

import { Home } from "./Home";
import { NextGame } from "./NextGame";
import { Roulette } from "./Roulette";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/next-game" element={<Layout><NextGame /></Layout>} />
            <Route path="/roulette" element={<Layout><Roulette /></Layout>} />
        </Routes>
    );
}
