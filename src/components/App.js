import { NavigationBar } from "./NavigationBar";
import { Roulette } from "./Roulette";

import { Route, Routes } from "react-router-dom";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<NavigationBar />} />
            <Route path="/roulette" element={<Roulette />} />
        </Routes>
    );
}
