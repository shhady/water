import React from "react";
import { Tables } from "../CustomHook/Tables.Custom";
import TableLookUps from "../constants/TableLookUps";

const IdentifierTable = () => {
  const identifiersColumns = [
    {
      field: "id",
      headerName: TableLookUps("IdentifierID"),
      flex: 1,
      hide: true,
    },
    {
      field: "sensorName",
      headerName: TableLookUps("sensorName"),
      flex: 1,
    },
    {
      field: "sensorType",
      headerName: TableLookUps("sensorType"),
      flex: 1,
    },{
      field: "System",
      headerName: TableLookUps("System"),
      flex: 1,
    },{
      field: "SystemNumber",
      headerName: TableLookUps("SystemNumber"),
      flex: 1,
    },
    {
      field: "status",
      headerName: TableLookUps("status"),
      flex: 1,
    },
    { field: "city", headerName: TableLookUps("city"), flex: 1 },
    { field: "street", headerName: TableLookUps("street"), flex: 1 },
    { field: "number", headerName: TableLookUps("number"), flex: 1 },
    { field: "latitude", headerName: TableLookUps("latitude"), flex: 1 },
    { field: "longitude", headerName: TableLookUps("longitude"), flex: 1 },
    { field: "createdAt", headerName: TableLookUps("createdAt"), flex: 1 },
    { field: "updatedAt", headerName: TableLookUps("updatedAt"), flex: 1 },
  ];
  const massage = (Data) => {
    console.log("Identifiers",Data);
    Data = Data.map((identifier) => {
      return {
        id: identifier._id,
        sensorName: identifier.sensor.sensorName,
        sensorType: identifier.sensor.sensorType,
        System: identifier.sensor.System,
        SystemNumber: identifier.sensor.SystemNumber,
        status:identifier.status,
        city: identifier.city,
        street: identifier.street,
        number: identifier.number,
        latitude: identifier.latitude,
        longitude: identifier.longitude,
        createdAt: identifier.createdAt,
        updatedAt: identifier.updatedAt,
      };
    });
    console.log("Data Trigger", Data);
    return Data;
  }
  return (
    <div>
      <h2>{TableLookUps("Identifiers")}</h2>
      <Tables
       Massage={massage}
        QueryName={"Identifiers"}
        columns={identifiersColumns}
        type="Identifier"
      />
    </div>
  );
};

export default IdentifierTable;
