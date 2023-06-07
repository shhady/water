//import { Tables } from "../CustomHook/Tables.Custom";
import TableLookUps from "../constants/TableLookUps";
import AdjustableTable from "./AdjustableTable";

const TriggerTable = () => {
  const triggersColumns = [
    { field: "id", headerName: "TRIGGER_ID", flex: 1, hide: true },
    //trigger name
    {
      field: "triggerName",
      headerName: TableLookUps("TRIGGER_NAME"),
      flex: 1,
    },
    //trigger number

    {
      field: "triggerType",
      headerName: TableLookUps("TRIGGER_TYPE"),
      flex: 1,
    },
    {
      field: "validValueH",
      headerName: "validValueH",
      flex: 1,
    },
    {
      field: "validValueL",
      headerName: "validValueL",
      flex: 1,
    },
    {
      field: "valueType",
      headerName: "valueType",
      flex: 1,
    },
    {
      field: "value",
      headerName: "value",
      flex: 1,
    },
    {
      field: "status",
      headerName: TableLookUps("STATUS"),

      flex: 1,
    },
    {
      field: "createdAt",
      headerName: TableLookUps("CREATED_AT"),

      flex: 1,
    },
    {
      field: "updatedAt",
      headerName: TableLookUps("UPDATED_AT"),

      flex: 1,
    },
  ];

  const massage = (Data) => {
    Data = Data.map((trigger) => {
      return {
        id: trigger._id,
        triggerName: trigger?.triggerName ?? TableLookUps("FIELD_ERROR"),
        triggerType: trigger?.triggerType ?? TableLookUps("FIELD_ERROR"),
        validValueH: trigger?.validValueH ?? TableLookUps("FIELD_ERROR"),
        validValueL: trigger?.validValueL ?? TableLookUps("FIELD_ERROR"),
        valueType: trigger?.valueType ?? TableLookUps("FIELD_ERROR"),
        value: trigger?.value ?? TableLookUps("FIELD_ERROR"),
        status: trigger?.status
          ? "True"
          : "False" ?? TableLookUps("FIELD_ERROR"),
        createdAt: trigger?.createdAt ?? TableLookUps("FIELD_ERROR"),
        updatedAt: trigger?.updatedAt ?? TableLookUps("FIELD_ERROR"),
      };
    });
    console.log("Data Trigger", Data);
    return Data;
  };

  return (
    <div>
      <h2>{TableLookUps("TRIGGERS")}</h2>
      <AdjustableTable
        queryURL={"/Triggers"}
        Massage={massage}
        Columns={triggersColumns}
      />
    </div>
  );
};

export default TriggerTable;
