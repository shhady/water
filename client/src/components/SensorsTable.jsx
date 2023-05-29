import React, { useEffect, useState } from "react";
import { Tables } from "../CustomHook/Tables.Custom";
import TableLookUps from "../constants/TableLookUps";

const SensorsTable = () => {
  const [rows, setRows] = useState([]);
  const sensorsColumns = [
    { field: "id", headerName: "Sensor ID", flex: 1, hide: true },
    //trigger number
    {
      field: "trigger",
      headerName: TableLookUps("trigger"),
      flex: 1,
    },
    //trigger name
    {
      field: "triggerName",
      headerName: TableLookUps("triggerName"),
      flex: 1,
    },
    //trigger number

    {
      field: "triggerType",
      headerName: TableLookUps("triggerType"),
      flex: 1,
    },
    //Sensore
    //sensorName
    {
      field: "sensorName",
      headerName: TableLookUps("sensorName"),
      flex: 1,
    },
    //Sensore
    //sensorType
    {
      field: "sensorType",
      headerName: TableLookUps("sensorType"),
      flex: 1,
    },
    //Sensore
    //System
    {
      field: "System",
      headerName: TableLookUps("System"),
      flex: 1,
    },
    //Sensore
    //SystemNumber
    {
      field: "SystemNumber",
      headerName: TableLookUps("SystemNumber"),
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

  const massage = (Data) => {
    Data = Data.map((sensor) => {
      return {
        id: sensor._id,
        trigger: sensor.Trigger.number,
        triggerName: sensor.Trigger.name,
        triggerType: sensor.Trigger.type,
        sensorName: sensor.sensorName,
        sensorType: sensor.sensorType,
        System: sensor.System,
        SystemNumber: sensor.SystemNumber,
        createdAt: sensor.createdAt,
        updatedAt: sensor.updatedAt,
      };
    });
    return Data;
  };

  return (
    <div>
      <h2>{TableLookUps("sensors")}</h2>
      <Tables
        QueryName={"Sensors"}
        Massage={massage}
        columns={sensorsColumns}
        type="Sensor"
      />
    </div>
  );
};

export default SensorsTable;
