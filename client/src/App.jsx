import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TableConfiguration } from "./components/TableConfiguration";
import { AddTrigger, CreateRow, Statistics } from "./pages";
import { SharedLayout } from "./components";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route path="/" element={<TableConfiguration />} />
            <Route path="/add_trigger" element={<AddTrigger />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/data-form" element={<CreateRow />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>

    // <div className="App">
    //   {/* <AlertTable /> */}
    //   <TableConfiguration/>
    // </div>
  );
}

export default App;

App.js;
