import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Heros from "./Pages/Heros";
import { QueryClient, QueryClientProvider } from "react-query";
import HeroPage from "./Pages/HeroPage";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import Navbar from "./Components/Navbar";
import PatchNotes from "./Pages/PatchNotes";
import Preparation from "./Pages/Preparations";
import BattleSpells from "./Pages/battleSpells";
import Emblems from "./Pages/emblems";
import Equipments from "./Pages/equipments";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="patch_notes" element={<PatchNotes />} />
              <Route path="preparations">
                <Route index element={<Preparation />} />
                <Route path="battle_spells" element={<BattleSpells />} />
                <Route path="emblems" element={<Emblems />} />
                <Route path="equipments" element={<Equipments />} />
              </Route>
              <Route path="heroes">
                <Route index element={<Heros />} />
                <Route path=":id" element={<HeroPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
