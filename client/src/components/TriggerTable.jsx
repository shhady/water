import React from "react";
import { Tables } from "../CustomHook/Tables.Custom";

const TriggerTable = () => {
  const triggersColumns = [
    { field: "id", headerName: "Trigger ID", flex: 1, hide: true },
    {
      field: "trigger",
      headerName: "Trigger",
      flex: 1,
    },
    {
      field: "meaning",
      headerName: "Meaning",
      flex: 1,
    },
    { field: "number", headerName: "Number(Sensor)", flex: 1 },
    {
      field: "system",
      headerName: "System",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created",
      flex: 1,
    },
    {
      field: "updatedAt",
      headerName: "Updated",
      flex: 1,
    },
  ];
  return (
    <div>
      <h2>Triggers</h2>
      <Tables QueryName={"Triggers"} columns={triggersColumns} type="Trigger" />
    </div>
  );
};

export default TriggerTable;
