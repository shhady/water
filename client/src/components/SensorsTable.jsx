import React, { useEffect, useState } from "react";
import { Tables } from "../CustomHook/Tables.Custom";
import translate from "../services/translate";

const SensorsTable = () => {
  const [rows, setRows] = useState([]);
  const language = localStorage.getItem("language");
  const sensorsColumns = [
    { field: "id", headerName: "Sensor ID", flex: 1, hide: true },
    //trigger number
    {
      field: "trigger",
      headerName: translate(language, "trigger"),
      flex: 1,
    },
    //trigger name
    {
      field: "triggerName",
      headerName: translate(language, "triggerName"),
      flex: 1,
    },
    //trigger number

    {
      field: "triggerType",
      headerName: translate(language, "triggerType"),
      flex: 1,
    },
    //Sensore
    //sensorName
    {
      field: "sensorName",
      headerName: translate(language, "sensorName"),
      flex: 1,
    },
    //Sensore
    //sensorType
    {
      field: "sensorType",
      headerName: translate(language, "sensorType"),
      flex: 1,
    },
    //Sensore
    //System
    {
      field: "System",
      headerName: translate(language, "System"),
      flex: 1,
    },
    //Sensore
    //SystemNumber
    {
      field: "SystemNumber",
      headerName: translate(language, "SystemNumber"),
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: translate(language, "createdAt"),

      flex: 1,
    },
    {
      field: "updatedAt",
      headerName: translate(language, "updatedAt"),

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
      <h2>{translate(language, "sensors")}</h2>
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
