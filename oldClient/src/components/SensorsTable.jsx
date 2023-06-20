import TableLookUps from "../constants/TableLookUps";
import AdjustableTable from "./AdjustableTable";

const SensorsTable = () => {
  const sensorsColumns = [
    { field: "id", headerName: "Sensor ID", flex: 1, hide: true },
    //sensorName
    {
      field: "sensorId",
      headerName: TableLookUps("SENSOR_ID"),
      flex: 1,
    },
    {
      field: "description",
      headerName: TableLookUps("DESCRIPTION"),
      flex: 1,
    },
    //Sensore
    //sensorType
    {
      field: "triggerName",
      headerName: TableLookUps("TRIGGER_NAME"),
      flex: 1,
    },
    {
      field: "status",
      headerName: TableLookUps("STATUS"),
      flex: 1,
    },
    {
      field: "infrastructureName",
      headerName: "infrastructure Name",
      flex: 1,
    },
    {
      field: "infrastructureAttribute",
      headerName: "infrastructure Attribute",
      flex: 1,
    },
    {
      field: "latitude",
      headerName: "latitude",
      flex: 1,
    },
    {
      field: "longitude",
      headerName: "longitude",
      flex: 1,
    },
    {
      field: "sensorAttribute",
      headerName: "sensorAttribute",
      flex: 1,
    },
    {
      field: "sensorProductId",
      headerName: "sensorProductId",
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
    Data = Data.map((sensor) => {
      return {
        id: sensor?._id ?? TableLookUps("FIELD_ERROR"),
        sensorId: sensor?.sensorId ?? TableLookUps("FIELD_ERROR"),
        triggerName: sensor?.triggerReference?.triggerName  ?? TableLookUps("FIELD_ERROR"),
        latitude: sensor?.latitude ?? TableLookUps("FIELD_ERROR"),
        longitude: sensor?.longitude ?? TableLookUps("FIELD_ERROR"),
        sensorAttribute: sensor?.sensorAttribute ?? TableLookUps("FIELD_ERROR"),
        sensorProductId: sensor?.sensorProductId ?? TableLookUps("FIELD_ERROR"),
        infrastructureName:
          sensor?.infrastructureParent?.infrastructureName ??
          TableLookUps("FIELD_ERROR") ,
        infrastructureAttribute:
          sensor?.infrastructureParent?.infrastructureAttribute ??
          TableLookUps("FIELD_ERROR") , 
        status: sensor?.status ? "True" : "False" ?? TableLookUps("FIELD_ERROR"),
        createdAt: sensor?.createdAt ?? TableLookUps("FIELD_ERROR"),
        updatedAt: sensor?.updatedAt ?? TableLookUps("FIELD_ERROR"),
      };
    });
    return Data;
  };
  function format(obj) {
    const formattedObj = {};

    for (const key in obj) {
      const value = obj[key];
      formattedObj[key] = value === "-" ? null : value;
    }
    formattedObj.status = Boolean(formattedObj.status);
    return formattedObj;
  }

  return (
    <div>
      <h2>{TableLookUps("SENSORS")}</h2>
      <AdjustableTable
        queryURL={"/Sensors"}
        Massage={massage}
        Format={format}
        Columns={sensorsColumns}
      />
    </div>
  );
};

export default SensorsTable;
