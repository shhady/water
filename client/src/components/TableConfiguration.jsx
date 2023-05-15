import { Tables } from "../CustomHook/Tables.Custom";

function TableConfiguration() {
  const triggersColums = [
    { field: "id", headerName: "Trigger ID", flex: 1, hide: true },
    { field: "trigger", headerName: "Trigger", flex: 1 },
    { field: "meaning", headerName: "Meaning", flex: 1 },
    { field: "number", headerName: "Number", flex: 1 },
    { field: "system", headerName: "System", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "createdAt",
      headerName: "Created",
      flex: 1,
    },
    {
      field: "updatedAt",
      headerName: "Updated",
      flex: 1,
    },
  ];
  const identifiersColums = [
    { field: "id", headerName: "Identifier ID", flex: 1, hide: true },
    {
      field: "additionalIdentifier",
      headerName: "additionalIdentifier",
      flex: 1,
    },
    { field: "status", headerName: "status", flex: 1 },
    { field: "city", headerName: "city", flex: 1 },
    { field: "street", headerName: "street", flex: 1 },
    { field: "number", headerName: "number", flex: 1 },
    { field: "latitude", headerName: "latitude", flex: 1 },
    { field: "longitude", headerName: "longitude", flex: 1 },
    { field: "createdAt", headerName: "Created", flex: 1 },
    { field: "updatedAt", headerName: "Updated", flex: 1 },
  ];

  const configConditionsColums = [
    { field: "id", headerName: "config Condition ID", flex: 1, hide: true },
    { field: "systemId", headerName: "systemId", flex: 1 },
    { field: "previousSystemId", headerName: "previousSystemId", flex: 1 },
    { field: "trigger", headerName: "trigger", flex: 1 },
    { field: "type", headerName: "type", flex: 1 },
    { field: "triggerName", headerName: "triggerName", flex: 1 },
    { field: "measuredValue", headerName: "measuredValue", flex: 1 },
    { field: "valueType", headerName: "valueType", flex: 1 },
    { field: "createdAt", headerName: "Created", flex: 1 },
    { field: "updatedAt", headerName: "Updated", flex: 1 },
  ];
  return (
    <>
      <h2>Triggers</h2>
      <Tables QueryName={"Triggers"} columns={triggersColums} />
      <hr />
      <h2>Identifiers</h2>
      <Tables QueryName={"Identifiers"} columns={identifiersColums} />
      <hr />
      <h2>Config Conditions</h2>
      <Tables QueryName={"configConditions"} columns={configConditionsColums} />
    </>
  );
}

export { TableConfiguration };
