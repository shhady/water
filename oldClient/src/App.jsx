import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TableConfiguration } from "./components/TableConfiguration";
import { CreateRow, Statistics } from "./pages";

import TriggerType from "./pages/AddTriggerType";
import DisplayMap from "./components/DisplayMap";
import { MyProvider } from "./services/MyProvider";
import SharedLayout from "./components/layout/SharedLayout";
import Hamburger from "./components/Hamburger/Hamburger";

function App() {
  const links = [
    { endpoint: "/", label: "Home" },
    { endpoint: "/statistics", label: "statistics" },
  ];
  return (
    <MyProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route
                path="/"
                element={
                  <Hamburger
                    direction="left"
                    links={links}
                  />
                }
              >
                <Route path="/" element={<TableConfiguration />} />
                <Route path="/statistics" element={<Statistics />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;

App.js;
