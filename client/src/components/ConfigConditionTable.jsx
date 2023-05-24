import React from "react";
import { Tables } from "../CustomHook/Tables.Custom";
import TableLookUps from "../constants/TableLookUps";

const ConfigConditionTable = () => {
  const configConditionsColumns = [
    {
      field: "id",
      headerName: TableLookUps("config Condition ID"),
      flex: 1,
      hide: true,
    },
    { field: "systemId", headerName: TableLookUps("systemId"), flex: 1 },
    {
      field: "previousSystemId",
      headerName: TableLookUps("previousSystemId"),
      flex: 1,
    },
    { field: "trigger", headerName: TableLookUps("trigger"), flex: 1 },
    { field: "type", headerName: TableLookUps("type"), flex: 1 },
    { field: "triggerName", headerName: TableLookUps("triggerName"), flex: 1 },
    {
      field: "measuredValue",
      headerName: TableLookUps("measuredValue"),
      flex: 1,
    },
    { field: "valueType", headerName: TableLookUps("valueType"), flex: 1 },
    { field: "level", headerName: TableLookUps("Level"), flex: 1 },
    { field: "createdAt", headerName: TableLookUps("Created"), flex: 1 },
    { field: "updatedAt", headerName: TableLookUps("Updated"), flex: 1 },
  ];
  return (
    <div>
      <h2>{TableLookUps("Config Conditions")}</h2>
      <Tables
        QueryName={"configConditions"}
        columns={configConditionsColumns}
        type="ConfigConditions"
      />
    </div>
  );
};

export default ConfigConditionTable;
