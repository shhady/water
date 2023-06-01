import React from "react";
import { Tables } from "../CustomHook/Tables.Custom";
import TableLookUps from "../constants/TableLookUps";

const SensorTable = () => {
  const SensorsColumns = [
    { field: "id", headerName: "Sensor ID", flex: 1, hide: true },
    {
      field: "SystemNumber",
      headerName: TableLookUps("SYSTEM_NUMBER"),
      flex: 1,
    },
    {
      field: "System",
      headerName: TableLookUps("SYSTEM"),
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
  console.log("Sensors");
  return (
    <div>
      <h2>{TableLookUps("SENSORS")}</h2>
      <Tables QueryName={"Sensors"} columns={SensorsColumns} type="Sensor" />
    </div>
  );
};

export default SensorTable;
