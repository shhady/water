import TableLookUps from "../constants/TableLookUps";
import AdjustableTable from "./AdjustableTable";

const SensorsTable = () => {
  const sensorsColumns = [
    { field: "id", headerName: "Sensor ID", flex: 1, hide: true },
    //sensorName
    {
      field: "sensorName",
      headerName: TableLookUps("SENSOR_NAME"),
      flex: 1,
    },
    //Sensore
    //sensorType
    {
      field: "sensorType",
      headerName: TableLookUps("SENSOR_TYPE"),
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
        id: sensor._id,
        sensorName: sensor.sensorName,
        sensorType: sensor.sensorType,
        latitude: sensor.latitude,
        longitude: sensor.longitude,
        sensorAttribute: sensor.sensorAttribute,
        sensorProductId: sensor.sensorProductId,
        infrastructureName:
          sensor.infrastructureParent?.infrastructureName ??
          TableLookUps("FIELD_ERROR"),
        infrastructureAttribute:
          sensor.infrastructureParent?.infrastructureAttribute ??
          TableLookUps("FIELD_ERROR"),
        status: sensor.status ? "True" : "False",
        createdAt: sensor.createdAt,
        updatedAt: sensor.updatedAt,
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
