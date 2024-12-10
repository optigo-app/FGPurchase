import React from "react";
import FGP from "./components/FGP/FGP";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <div>
      <Provider store={store}>
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
      </Provider>
    </div>
  );
}

export default App;
