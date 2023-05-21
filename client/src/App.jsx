import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TableConfiguration } from "./components/TableConfiguration";
import { AddTrigger } from "./pages";
//import CreateRow from "./pages/CreateRow.page";
import { SharedLayout } from "./components";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route path="/" element={<TableConfiguration />} />
            <Route path="/add_trigger" element={<AddTrigger />} />
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
