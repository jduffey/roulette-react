import { Route, Routes } from "react-router-dom";

import { Layout } from "./Layout";

import { Home } from "./Home";
import { Roulette } from "./roulette/Roulette";
import { SicBo } from "./SicBo";
import { Balances } from "./balances/Balances";

const elementInLayout = (element) => <Layout>{element}</Layout>

export function App() {
    return (
        <Routes>
            <Route path="/" element={elementInLayout(<Home />)} />
            <Route path="/roulette" element={elementInLayout(<Roulette />)} />
            <Route path="/sic-bo" element={elementInLayout(<SicBo />)} />
            <Route path="/balances" element={elementInLayout(<Balances />)} />
        </Routes>
    );
}
