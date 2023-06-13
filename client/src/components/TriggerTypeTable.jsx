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

  const triggerTypesColumns = [
    { field: "id", headerName: "TRIGGER_ID", flex: 1, hide: true },
    {
      field: "triggerTypeString",
      headerName: TableLookUps("TRIGGER_TYPE"),
      flex: 2,
    },
    {
      field: "description",
      headerName: TableLookUps("TRIGGER_NAME"),
      flex: 2,
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
    if (!Data) {
      return
    }
    Data = Data.map((triggerType) => {
      return {
        id: triggerType._id,
        triggerTypeString:triggerType?.triggerTypeString ?? TableLookUps("FIELD_ERROR"),
        description: triggerType?.description ?? TableLookUps("FIELD_ERROR"),
        status: triggerType?.status
          ? "True"
          : "False" ?? TableLookUps("FIELD_ERROR"),
        createdAt: triggerType?.createdAt ?? TableLookUps("FIELD_ERROR"),
        updatedAt: triggerType?.updatedAt ?? TableLookUps("FIELD_ERROR"),
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
    triggerTypeString: {
      type: "text",
      renderType: "select",
      options: () => JSON.parse(localStorage.getItem("trigger-types")),
    },
    description: {
      type: "text",
    },
    status: { type: "checkbox" },
  };

  return (
    <div>
      <h2>{TableLookUps("TRIGGER_TYPES")}</h2>
      <AdjustableTable
        queryURL={"/TriggerTypes"}
        Massage={massage}
        Format={format}
        Columns={triggerTypesColumns}
        EditRender={editRender}
      />
    </div>
  );
};

export default TriggerTable;
