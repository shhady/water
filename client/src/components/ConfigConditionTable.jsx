import React from "react";
import { Tables } from "../CustomHook/Tables.Custom";
import TableLookUps from "../constants/TableLookUps";

const ConfigConditionTable = () => {
  const configConditionsColumns = [
    {
      field: "id",
      headerName: TableLookUps("CONFIG_CONDITION_ID"),
      flex: 1,
      hide: true,
    },
    { field: "systemId", headerName: TableLookUps("SYSTEM_ID"), flex: 1 },
    {
      field: "previousSystemId",
      headerName: TableLookUps("PREVIOUS_SYSTEM_ID"),
      flex: 1,
    },
    { field: "trigger", headerName: TableLookUps("TRIGGER"), flex: 1 },
    { field: "type", headerName: TableLookUps("TYPE"), flex: 1 },
    { field: "triggerName", headerName: TableLookUps("TRIGGER_NAME"), flex: 1 },
    {
      field: "measuredValue",
      headerName: TableLookUps("MEASURED_VALUE"),
      flex: 1,
    },
    { field: "valueType", headerName: TableLookUps("VALUE_TYPE"), flex: 1 },
    { field: "level", headerName: TableLookUps("LEVEL"), flex: 1 },
    { field: "createdAt", headerName: TableLookUps("CREATED_AT"), flex: 1 },
    { field: "updatedAt", headerName: TableLookUps("CREATED_AT"), flex: 1 },
  ];
  const massage = (Data) => {
    console.log("Config Conditions");
    return [];
  }
  return (
    <div>
      <h2>{TableLookUps("CONFIG_CONDITIONS")}</h2>
      <Tables
        Massage={massage}
        QueryName={"configConditions"}
        columns={configConditionsColumns}
        type="ConfigConditions"
      />
    </div>
  );
};

export default ConfigConditionTable;
