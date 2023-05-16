import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TableConfiguration } from "./components/TableConfiguration";
//import { AddTrigger } from "./pages/AddTrigger.page";
import CreateRow from "./pages/CreateRow.page";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<TableConfiguration />} />
          <Route path="/add_trigger" element={<CreateRow />} />
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
