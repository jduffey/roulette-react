import { Home } from "./Home";
import { Roulette } from "./Roulette";

import { Route, Routes } from "react-router-dom";
import { NextGame } from "./NextGame";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roulette" element={<Roulette />} />
            <Route path="/next-game" element={<NextGame />} />
        </Routes>
    );
}
