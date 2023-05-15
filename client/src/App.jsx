import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TableConfiguration } from "./components/TableConfiguration";
import {
  AddTrigger
} from "./pages";
function App() {
  return (

    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<TableConfiguration />} />
        <Route path="/add_trigger" element={<AddTrigger />} />
       
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
