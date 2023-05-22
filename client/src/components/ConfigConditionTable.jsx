import React from "react";
import { Tables } from "../CustomHook/Tables.Custom";

const ConfigConditionTable = () => {
  const configConditionsColumns = [
    { field: "id", headerName: "config Condition ID", flex: 1, hide: true },
    { field: "systemId", headerName: "systemId", flex: 1 },
    { field: "previousSystemId", headerName: "previousSystemId", flex: 1 },
    { field: "trigger", headerName: "trigger", flex: 1 },
    { field: "type", headerName: "type", flex: 1 },
    { field: "triggerName", headerName: "triggerName", flex: 1 },
    { field: "measuredValue", headerName: "measuredValue", flex: 1 },
    { field: "valueType", headerName: "valueType", flex: 1 },
    { field: "level", headerName: "Level", flex: 1 },
    { field: "createdAt", headerName: "Created", flex: 1 },
    { field: "updatedAt", headerName: "Updated", flex: 1 },
  ];
  return (
    <div>
      <h2>Config Conditions</h2>
      <Tables
        QueryName={"configConditions"}
        columns={configConditionsColumns}
        type="ConfigConditions"
      />
    </div>
  );
};

export default ConfigConditionTable;
