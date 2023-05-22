import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { baseURL } from "../constants/urlConstants";

const fetchData = async (url) => {
  const res = await fetch(url);
  return res.json();
};

const ConnectionsTable = () => {
  const Response = useQuery("TriggerType", () =>
    fetchData(baseURL + "/TriggerTypes")
  );
  const [triggerTypes, setTriggerTypes] = useState([]);

  return <div>ConnectionsTable</div>;
};

export default ConnectionsTable;
