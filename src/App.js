import React from "react";
import FGP from "./components/FGP/FGP";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider } from "@mui/material";
import DefaultPalette from "./master/theme";

function App() {
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={DefaultPalette}>

        <BrowserRouter basename="/fgpurchase"  
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
          >
          <Routes>
            <Route path="/" element={<FGP />} />
          </Routes>
        </BrowserRouter>
          </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
