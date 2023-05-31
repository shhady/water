import React, { useEffect, useState } from "react";
import { Tables } from "../CustomHook/Tables.Custom";
import TableLookUps from "../constants/TableLookUps";

const TriggerTable = () => {
  const [rows, setRows] = useState([]);
  const triggersColumns = [
    { field: "id", headerName: "TRIGGER_ID", flex: 1, hide: true },
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
      <h2>{TableLookUps("TRIGGERS")}</h2>
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
