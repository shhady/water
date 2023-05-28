import React, { useEffect, useState } from "react";
import { Tables } from "../CustomHook/Tables.Custom";
import TableLookUps from "../constants/TableLookUps";

const TriggerTable = () => {
  const [rows, setRows] = useState([]);
  const triggersColumns = [
    { field: "id", headerName: "Trigger ID", flex: 1, hide: true },
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

  const massage = (Data) => {
    Data = Data.map((trigger) => {
      return {
        id: trigger._id,
        trigger: trigger.triggerType.number,
        triggerName: trigger.triggerType.name,
        triggerType: trigger.triggerType.type,
        sensorName: trigger.sensor.sensorName,
        sensorType: trigger.sensor.sensorType,
        System: trigger.sensor.System,
        SystemNumber: trigger.sensor.SystemNumber,
        status:trigger.status,
        createdAt: trigger.createdAt,
        updatedAt: trigger.updatedAt,
      };
    });
    console.log("Data Trigger", Data);
    return Data;
  };

  return (
    <div>
      <h2>{TableLookUps("triggers")}</h2>
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
