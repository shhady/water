import React from "react";
import { Tables } from "../CustomHook/Tables.Custom";
import TableLookUps from "../constants/TableLookUps";

const TriggerTable = () => {
  const triggersColumns = [
    { field: "id", headerName: "Trigger ID", flex: 1, hide: true },
    {
      field: "trigger",
      headerName: TableLookUps("trigger"),
      flex: 1,
    },
    {
      field: "meaning",
      headerName: TableLookUps("meaning"),

      flex: 1,
    },
    { field: "number", headerName: TableLookUps("number"), flex: 1 },
    {
      field: "system",
      headerName: TableLookUps("system"),
      flex: 1,
    },
    {
      field: "status",
      headerName: TableLookUps("status"),

      flex: 1,
    },
    {
      field: "createdAt",
      headerName: TableLookUps("createdAt"),

      flex: 1,
    },
    {
      field: "updatedAt",
      headerName: TableLookUps("updatedAt"),

      flex: 1,
    },
  ];
  
  return (
    <div>
      <h2>{TableLookUps("triggers")}</h2>
      <Tables QueryName={"Triggers"} columns={triggersColumns} type="Trigger" />
    </div>
  );
};

export default TriggerTable;
