import React from "react";
import { Tables } from "../CustomHook/Tables.Custom";
import translate from "../services/translate";

const ConfigConditionTable = () => {
  const language = localStorage.getItem("language");

  const configConditionsColumns = [
    {
      field: "id",
      headerName: translate(language, "config Condition ID"),
      flex: 1,
      hide: true,
    },
    { field: "systemId", headerName: translate(language, "systemId"), flex: 1 },
    {
      field: "previousSystemId",
      headerName: translate(language, "previousSystemId"),
      flex: 1,
    },
    { field: "trigger", headerName: translate(language, "trigger"), flex: 1 },
    { field: "type", headerName: translate(language, "type"), flex: 1 },
    {
      field: "triggerName",
      headerName: translate(language, "triggerName"),
      flex: 1,
    },
    {
      field: "measuredValue",
      headerName: translate(language, "measuredValue"),
      flex: 1,
    },
    {
      field: "valueType",
      headerName: translate(language, "valueType"),
      flex: 1,
    },
    { field: "level", headerName: translate(language, "Level"), flex: 1 },
    {
      field: "createdAt",
      headerName: translate(language, "createdAt"),
      flex: 1,
    },
    {
      field: "updatedAt",
      headerName: translate(language, "createdAt"),
      flex: 1,
    },
  ];
  const massage = (Data) => {
    console.log("Config Conditions");
    return [];
  };
  return (
    <div>
      <h2>{translate(language, "Config Conditions")}</h2>
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
