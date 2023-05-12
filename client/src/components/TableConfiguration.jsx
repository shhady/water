import { Tables } from "../CustomHook/Tables.Custom";

function TableConfiguration(promp) {

    const triggersColums = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "trigger", headerName: "Trigger", width: 130 },
        { field: "meaning", headerName: "Meaning", width: 130 },
        { field: "number", headerName: "Number", width: 130 },
        { field: "system", headerName: "System", width: 130 },
        { field: "createdAt", headerName: "Created At", width: 130 },
        { field: "updatedAt", headerName: "Updated At", width: 130 },
    ]
    const identifiersColums = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "additionalIdentifier", headerName: "additionalIdentifier", width: 130 },
        { field: "status", headerName: "status", width: 130 },
        { field: "city", headerName: "city", width: 130 },
        { field: "street", headerName: "street", width: 130 },
        { field: "number", headerName: "number", width: 130 },
        { field: "latitude", headerName: "latitude", width: 130 },
        { field: "longitude", headerName: "longitude", width: 130 },
        { field: "createdAt", headerName: "Created At", width: 130 },
        { field: "updatedAt", headerName: "Updated At", width: 130 },
    ];

    const configConditionsColums = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "autoGenerator", headerName: "autoGenerator", width: 130 },
        { field: "systemId", headerName: "systemId", width: 130 },
        { field: "previousSystemId", headerName: "previousSystemId", width: 130 },
        { field: "trigger", headerName: "trigger", width: 130 },
        { field: "type", headerName: "type", width: 130 },
        { field: "triggerName", headerName: "triggerName", width: 130 },
        { field: "measuredValue", headerName: "measuredValue", width: 130 },
        { field: "valueType", headerName: "valueType", width: 130 },
        { field: "createdAt", headerName: "Created At", width: 130 },
        { field: "updatedAt", headerName: "Updated At", width: 130 },
    ];
    return (<>
        <h2>Triggers</h2>
        <Tables QueryName={"Triggers"} columns={triggersColums} />
        <hr />
        <h2>Identifiers</h2>
        <Tables QueryName={"Identifiers"} columns={identifiersColums} />
        <hr />
        <h2>Config Conditions</h2>
        <Tables QueryName={"configConditions"} columns={configConditionsColums} />
    </>);
}

export { TableConfiguration }