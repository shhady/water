import React from "react";
import { Tables } from "../CustomHook/Tables.Custom";
import TableLookUps from "../constants/TableLookUps";

const SensorTable = () => {
  const SensorsColumns = [
    { field: "id", headerName: "Sensor ID", flex: 1, hide: true },
    {
      field: "SystemNumber",
      headerName: TableLookUps("SystemNumber"),
      flex: 1,
    },
    {
      field: "System",
      headerName: TableLookUps("system"),
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
  console.log("Sensors");
  return (
    <div>
      <h2>{TableLookUps("Sensors")}</h2>
      <Tables QueryName={"Sensors"} columns={SensorsColumns} type="Sensor" />
    </div>
  );
};

export default SensorTable;
