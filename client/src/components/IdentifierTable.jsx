import React from "react";
import { Tables } from "../CustomHook/Tables.Custom";

const IdentifierTable = () => {
  const identifiersColumns = [
    { field: "id", headerName: "Identifier ID", flex: 1, hide: true },
    {
      field: "additionalIdentifier",
      headerName: "additionalIdentifier",
      flex: 1,
    },
    {
      field: "status",
      headerName: "status",
      flex: 1,
    },
    { field: "city", headerName: "city", flex: 1 },
    { field: "street", headerName: "street", flex: 1 },
    { field: "number", headerName: "number", flex: 1 },
    { field: "latitude", headerName: "latitude", flex: 1 },
    { field: "longitude", headerName: "longitude", flex: 1 },
    { field: "createdAt", headerName: "Created", flex: 1 },
    { field: "updatedAt", headerName: "Updated", flex: 1 },
  ];
  return (
    <div>
      <h2>Identifiers</h2>
      <Tables
        QueryName={"Identifiers"}
        columns={identifiersColumns}
        type="Identifier"
      />
    </div>
  );
};

export default IdentifierTable;
