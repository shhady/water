import { useState } from "react";
import "./App.css";

import CreateAlert from "./components/CreateAlert";

function App() {
  const [section, setSection] = useState(0);
  return <div>{section === 0 && <CreateAlert />}</div>;
}

export default App;
