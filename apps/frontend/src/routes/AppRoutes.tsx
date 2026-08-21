import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Produtores from "../pages/Produtores";
import Propriedades from "../pages/Propriedades";
import Culturas from "../pages/Culturas";

export function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/produtores" element={<Produtores />} />
                <Route path="/propriedades" element={<Propriedades />} />
                <Route path="/culturas" element={<Culturas />} />
            </Routes>
        </BrowserRouter>
    )
}
