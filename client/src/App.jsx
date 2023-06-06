import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TableConfiguration } from "./components/TableConfiguration";
import { CreateRow, Statistics } from "./pages";
import { SharedLayout } from "./components";
import TriggerType from "./pages/AddTriggerType";
import DisplayMap from "./components/DisplayMap";
import { MyProvider } from "./services/MyProvider";
import AdjustableTable from "./components/AdjustableTable";

const Columns = [
  { field: "Trigger", headerName: "Trigger", width: 150 },
  { field: "TriggerType", headerName: "Trigger Type", width: 150 },
  { field: "TriggerNumber", headerName: "Trigger Number", width: 150 },
];

const Rows = [
  { id: 1, Trigger: "Trigger 1", TriggerType: "Type A", TriggerNumber: 100 },
  { id: 2, Trigger: "Trigger 2", TriggerType: "Type B", TriggerNumber: 200 },
  { id: 3, Trigger: "Trigger 3", TriggerType: "Type C", TriggerNumber: 300 },
  { id: 4, Trigger: "Trigger 4", TriggerType: "Type D", TriggerNumber: 400 },
  { id: 5, Trigger: "Trigger 5", TriggerType: "Type E", TriggerNumber: 500 },
];

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route path="/" element={<TableConfiguration />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/data-form" element={<CreateRow />} />
              <Route path="/trigger-type" element={<TriggerType />} />
              <Route path="/map" element={<DisplayMap />} />
              <Route
                path="/adj"
                element={<AdjustableTable Rows={Rows} Columns={Columns} />}
              />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;

App.js;
