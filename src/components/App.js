import { Route, Routes } from "react-router-dom";

import { Layout } from "./Layout";

import { Home } from "./Home";
import { NextGame } from "./NextGame";
import { Roulette } from "./Roulette";
import { SicBo } from "./SicBo";

const elementInLayout = (element) => <Layout>{element}</Layout>

export function App() {
    return (
        <Routes>
            <Route path="/" element={elementInLayout(<Home />)} />
            <Route path="/next-game" element={elementInLayout(<NextGame />)} />
            <Route path="/roulette" element={elementInLayout(<Roulette />)} />
            <Route path="/sic-bo" element={elementInLayout(<SicBo />)} />
        </Routes>
    );
}
