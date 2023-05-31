import React from "react";
import { Tables } from "../CustomHook/Tables.Custom";
import translate from "../services/translate";

const TriggerTable = () => {
  const language = localStorage.getItem("language");
  const triggersColumns = [
    { field: "id", headerName: "TRIGGER_ID", flex: 1, hide: true },
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
      field: "status",
      headerName: translate(language, "status"),

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
    Data = Data.map((trigger) => {
      return {
        id: trigger._id,
        trigger: trigger.triggerNumber,
        triggerName: trigger.triggerName,
        triggerType: trigger.triggerType,
        sensorName: trigger.sensorName,
        sensorType: trigger.sensorType,
        System: trigger.System,
        SystemNumber: trigger.SystemNumber,
        status: trigger.status,
        createdAt: trigger.createdAt,
        updatedAt: trigger.updatedAt,
      };
    });
    console.log("Data Trigger", Data);
    return Data;
  };

  return (
    <div>
      <h2>{translate(language, "triggers")}</h2>
      <Tables
        QueryName={"Triggers"}
        Massage={massage}
        columns={triggersColumns}
        type="Trigger"
      />
    </div>
  );
};

export default TriggerTable;
