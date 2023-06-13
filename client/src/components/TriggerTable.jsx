//import { Tables } from "../CustomHook/Tables.Custom";
import TableLookUps from "../constants/TableLookUps";
import AdjustableTable from "./AdjustableTable";
import { useEffect } from "react";
import useRequest from "../hooks/useRequest.js";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { baseURL } from "../constants/urlConstants.js";

const TriggerTable = () => {
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
    { field: "id", headerName: "TRIGGER_ID", flex: 1, hide: true },
    {
      field: "triggerType",
      headerName: TableLookUps("TRIGGER_TYPE"),
      flex: 1,
    },
    {
      field: "triggerName",
      headerName: TableLookUps("TRIGGER_NAME"),
      flex: 1,
    },

    {
      field: "validValueH",
      headerName: "validValueH",
      flex: 1,
    },
    {
      field: "validValueL",
      headerName: "validValueL",
      flex: 1,
    },
    {
      field: "valueType",
      headerName: "valueType",
      flex: 1,
    },
    {
      field: "status",
      headerName: TableLookUps("STATUS"),

      flex: 1,
    },
    {
      field: "createdAt",
      headerName: TableLookUps("CREATED_AT"),

      flex: 1,
    },
    {
      field: "updatedAt",
      headerName: TableLookUps("UPDATED_AT"),

      flex: 1,
    },
  ];

  const massage = (Data) => {
    Data = Data.map((trigger) => {
      return {
        id: trigger._id,
        triggerName: trigger?.triggerName ?? TableLookUps("FIELD_ERROR"),
        triggerType:
          trigger?.triggerType?.triggerTypeString ??
          TableLookUps("FIELD_ERROR"),
        validValueH: trigger?.validValueH ?? TableLookUps("FIELD_ERROR"),
        validValueL: trigger?.validValueL ?? TableLookUps("FIELD_ERROR"),
        valueType: trigger?.valueType ?? TableLookUps("FIELD_ERROR"),
        value: trigger?.value ?? TableLookUps("FIELD_ERROR"),
        status: trigger?.status
          ? "True"
          : "False" ?? TableLookUps("FIELD_ERROR"),
        createdAt: trigger?.createdAt ?? TableLookUps("FIELD_ERROR"),
        updatedAt: trigger?.updatedAt ?? TableLookUps("FIELD_ERROR"),
      };
    });
    return Data;
  };
  function format(obj) {
    const formattedObj = {};

    for (const key in obj) {
      const value = obj[key];
      formattedObj[key] = value === "-" ? null : value;
    }
    formattedObj.status = Boolean(formattedObj.status);
    return formattedObj;
  }

  const editRender = {
    triggerName: {
      type: "text",
      renderType: "select",
      options: () => JSON.parse(localStorage.getItem("trigger-names")),
    },
    triggerType: {
      type: "text",
      renderType: "select",
      options: () => JSON.parse(localStorage.getItem("trigger-types")),
    },
    validValueH: { type: "number" },
    validValueL: { type: "number" },
    valueType: { type: "text" },
    value: { type: "number" },
    status: { type: "checkbox" },
  };

  return (
    <div>
      <h2>{TableLookUps("TRIGGERS")}</h2>
      <AdjustableTable
        queryURL={"/Triggers"}
        Massage={massage}
        Format={format}
        Columns={triggersColumns}
        EditRender={editRender}
      />
    </div>
  );
};

export default TriggerTable;
