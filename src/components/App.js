import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Layout } from "./Layout";

import { Home } from "./Home";
import { NextGame } from "./NextGame";
import { Roulette } from "./roulette/Roulette";
import { SicBo } from "./sic-bo/SicBo";


export function App() {
    const [fooVar, setFooVar] = useState("I'm a fooVar!");
    const elementInLayout = (element) => <Layout>{element}</Layout>;

    return (
        <Routes>
            <Route path="/" element={elementInLayout(<Home />)} />
            <Route path="/next-game" element={elementInLayout(<NextGame />)} />
            <Route path="/roulette" element={elementInLayout(<Roulette />)} />
            <Route path="/sic-bo" element={elementInLayout(<SicBo fooVar={fooVar} setFooVar={setFooVar} />)} />
        </Routes>
    );
}
