import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Heros from "./Pages/Heros";
import { QueryClient, QueryClientProvider } from "react-query";
import HeroPage from "./Pages/HeroPage";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
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
