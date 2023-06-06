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
      headerName: TableLookUps("SENSOR_NAME"),
      flex: 1,
    },
    {
      field: "sensorType",
      headerName: TableLookUps("SENSOR_TYPE"),
      flex: 1,
    },
    {
      field: "System",
      headerName: TableLookUps("SYSTEM"),
      flex: 1,
    },
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
    { field: "city", headerName: TableLookUps("CITY"), flex: 1 },
    { field: "street", headerName: TableLookUps("STREET"), flex: 1 },
    { field: "number", headerName: TableLookUps("NUMBER"), flex: 1 },
    { field: "latitude", headerName: TableLookUps("LATITUDE"), flex: 1 },
    { field: "longitude", headerName: TableLookUps("LONGITUDE"), flex: 1 },
    { field: "createdAt", headerName: TableLookUps("CREATED_AT"), flex: 1 },
    { field: "updatedAt", headerName: TableLookUps("UPDATED_AT"), flex: 1 },
  ];
  const massage = (Data) => {
    console.log("Identifiers", Data);
    Data = Data.map((identifier) => {
      return {
        id: identifier._id,
        sensorName:
          identifier.sensor?.sensorName ?? TableLookUps("FIELD_ERROR"),
        sensorType:
          identifier.sensor?.sensorType ?? TableLookUps("FIELD_ERROR"),
        System: identifier.sensor?.System ?? TableLookUps("FIELD_ERROR"),
        SystemNumber:
          identifier.sensor?.SystemNumber ?? TableLookUps("FIELD_ERROR"),
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
      <h2>{TableLookUps("IDENTIFIERS")}</h2>
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
