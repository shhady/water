import React from "react";
import { Tables } from "../CustomHook/Tables.Custom";
import translate from "../services/translate";

const IdentifierTable = () => {
  const language = localStorage.getItem("language");
  const identifiersColumns = [
    {
      field: "id",
      headerName: translate(language, "IdentifierID"),
      flex: 1,
      hide: true,
    },
    {
      field: "sensorName",
      headerName: translate(language, "sensorName"),
      flex: 1,
    },
    {
      field: "sensorType",
      headerName: translate(language, "sensorType"),
      flex: 1,
    },
    {
      field: "System",
      headerName: translate(language, "System"),
      flex: 1,
    },
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
    { field: "city", headerName: translate(language, "city"), flex: 1 },
    { field: "street", headerName: translate(language, "street"), flex: 1 },
    { field: "number", headerName: translate(language, "number"), flex: 1 },
    { field: "latitude", headerName: translate(language, "latitude"), flex: 1 },
    {
      field: "longitude",
      headerName: translate(language, "longitude"),
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
    console.log("Identifiers", Data);
    Data = Data.map((identifier) => {
      return {
        id: identifier._id,
        sensorName: identifier.sensor.sensorName,
        sensorType: identifier.sensor.sensorType,
        System: identifier.sensor.System,
        SystemNumber: identifier.sensor.SystemNumber,
        status: identifier.status,
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
  };
  return (
    <div>
      <h2>{translate(language, "Identifiers")}</h2>
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
