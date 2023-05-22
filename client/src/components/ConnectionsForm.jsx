import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { baseURL } from "../constants/urlConstants";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import CheckboxList from "./CheckboxList";
import axios from "axios";
import ConnectionTable from "./ConnectionsTable";

const fetchData = async (url) => {
  const res = await fetch(url);
  return res.json();
};

const ConnectionsForm = () => {
  const Response = useQuery("TriggerTypes", () =>
    fetchData(baseURL + "/TriggerTypes")
  );
  const [triggerTypes, setTriggerTypes] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    if (Response.data) {
      setTriggerTypes(Response.data.data);
    }
  }, [Response.data]);
  useEffect(() => {
    if (checkedItems == []) return;
    axios
      .post(baseURL + "/Connections/Triggers", { parameters: checkedItems })
      .then((res) => {
        setConnections(res.data.data);
      });
  }, [checkedItems]);

  if (Response.isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (Response.isError) {
    return <h1>ERROR</h1>;
  }

  return (
    <div>
      <CheckboxList
        options={triggerTypes}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
      />
      <ConnectionTable connections={connections} />
    </div>
  );
};

export default ConnectionsForm;
