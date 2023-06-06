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
      headerName: TableLookUps("TRIGGER"),
      flex: 1,
    },
    //trigger name
    {
      field: "triggerName",
      headerName: TableLookUps("TRIGGER_NAME"),
      flex: 1,
    },
    //trigger number

    {
      field: "triggerType",
      headerName: TableLookUps("TRIGGER_TYPE"),
      flex: 1,
    },
    //Sensore
    //sensorName
    {
      field: "sensorName",
      headerName: TableLookUps("SENSOR_NAME"),
      flex: 1,
    },
    //Sensore
    //sensorType
    {
      field: "sensorType",
      headerName: TableLookUps("SENSOR_TYPE"),
      flex: 1,
    },
    //Sensore
    //System
    {
      field: "System",
      headerName: TableLookUps("SYSTEM"),
      flex: 1,
    },
    //Sensore
    //SystemNumber
    {
      field: "SystemNumber",
      headerName: TableLookUps("SYSTEM_NUMBER"),
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
    Data = Data.map((sensor) => {
      return {
        id: sensor._id,
        trigger: sensor.Trigger.number,
        triggerName: sensor.Trigger.name,
        triggerType: sensor.Trigger.type,
        sensorName: sensor.sensorName,
        sensorType: sensor.sensorType,
        System: sensor.System.name,
        SystemNumber: sensor.System.number,
        createdAt: sensor.createdAt,
        updatedAt: sensor.updatedAt,
      };
    });
    return Data;
  };

  return (
    <div>
      <h2>{TableLookUps("SENSORS")}</h2>
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
