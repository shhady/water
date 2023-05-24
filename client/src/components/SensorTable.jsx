import React from "react";
import { Tables } from "../CustomHook/Tables.Custom";

const SensorTable = () => {
  const SensorsColumns = [
    { field: "id", headerName: "Sensor ID", flex: 1, hide: true },
    {
      field: "SystemNumber",
      headerName: "System Number",
      flex: 1,
    },
    {
      field: "System",
      headerName: "System",
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
  console.log("Sensors");
  return (
    <div>
      <h2>Sensors</h2>
      <Tables QueryName={"Sensors"} columns={SensorsColumns} type="Sensor" />
    </div>
  );
};

export default SensorTable;
