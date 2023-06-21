import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TableConfiguration from "./components/TableConfiguration";
import { CreateRow, Statistics } from "./pages";
import { MyProvider } from "./services/MyProvider";
import SharedLayout from "./components/layout/SharedLayout";

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <div className="App">
          <div className="routes">
            <Routes>
              <Route path="/" element={<SharedLayout />}>
                <Route path="/" element={<TableConfiguration />} />
                <Route path="/statistics" element={<Statistics />} />
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
