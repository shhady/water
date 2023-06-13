import React, { useEffect } from "react";
import useRequest from "../hooks/useRequest";
import { baseURL } from "../constants/urlConstants.js";
import MiniAdjustableTable from "./MiniAdjustableTable";

import TableLookUps from "../constants/TableLookUps";

import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const TriggerTypeTable = () => {
  const { loading, error, sendFetchRequest } = useRequest();

  // CHANGE THIS AND USE data from useRequest
  useEffect(() => {
    sendFetchRequest(
      baseURL + "/Arrays",
      { names: ["TriggerTypes", "TriggerNames"] },
      "PUT"
    )
      .then((data) => {
        localStorage.setItem("trigger-types", JSON.stringify(data[1]));
        localStorage.setItem("trigger-names", JSON.stringify(data[0]));
      })
      .catch((err) => console.log(err));
  }, [sendFetchRequest]);

  if (Response.isLoading || loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (Response.isError || error) {
    return error ? <h1>{error.message}</h1> : <h1>ERROR</h1>;
  }

  const triggersColumns = [
    { field: "id", headerName: "TRIGGER_TYPE_ID", flex: 1, hide: true },
    {
      field: "triggerType",
      headerName: TableLookUps("TRIGGER_TYPE"),
      flex: 1,
    },
  ];

  const massage = (names) =>
    names.map((name, index) => ({ id: index, triggerType: name }));
  const reverseMassage = (names) => names.map((name) => name.triggerType);

  return (
    <div>
      <h2>{TableLookUps("TRIGGER_TYPES")}</h2>
      <MiniAdjustableTable
        queryURL={"/Arrays/TriggerTypes"}
        Columns={triggersColumns}
        Massage={massage}
        ReverseMassage={reverseMassage}
      />
    </div>
  );
};

export default TriggerTypeTable;
