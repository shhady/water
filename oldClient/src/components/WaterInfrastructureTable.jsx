import TableLookUps from "../constants/TableLookUps";
import AdjustableTable from "./AdjustableTable";

const WaterInfrastructureTable = () => {
  const waterInfrastructureColumns = [
    { field: "id", headerName: "WATER_INFRASTRUCTURE_ID", flex: 1, hide: true },
    {
      field: "infrastructureName",
      headerName: TableLookUps("INFRASTRUCTURE_NAME"),
      flex: 1,
    },
    {
      field: "infrastructureAttribute",
      headerName: TableLookUps("INFRASTRUCTURE_ATTRIBUTE"),
      flex: 1,
    },
    {
      field: "latitude",
      headerName: TableLookUps("LATITUDE"),
      flex: 1,
    },
    {
      field: "longitude",
      headerName: TableLookUps("LONGITUDE"),
      flex: 1,
    },
    {
      field: "city",
      headerName: TableLookUps("CITY"),
      flex: 1,
    },
    {
      field: "street",
      headerName: TableLookUps("STREET"),
      flex: 1,
    },
    {
      field: "streetNumber",
      headerName: TableLookUps("STREET_NUMBER"),
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
    const data = Data.map((waterInfrastructure) => {
      return {
        id: waterInfrastructure._id,
        infrastructureName:
          waterInfrastructure?.infrastructureName ??
          TableLookUps("FIELD_ERROR"),
        infrastructureAttribute:
          waterInfrastructure?.infrastructureAttribute ??
          TableLookUps("FIELD_ERROR"),
        latitude: waterInfrastructure?.latitude ?? TableLookUps("FIELD_ERROR"),
        longitude:
          waterInfrastructure?.longitude ?? TableLookUps("FIELD_ERROR"),
        status: waterInfrastructure?.status
          ? "True"
          : "False" ?? TableLookUps("FIELD_ERROR"),
        city: waterInfrastructure?.city ?? TableLookUps("FIELD_ERROR"),
        street: waterInfrastructure?.street ?? TableLookUps("FIELD_ERROR"),
        streetNumber:
          waterInfrastructure?.streetNumber ?? TableLookUps("FIELD_ERROR"),
        createdAt:
          waterInfrastructure?.createdAt ?? TableLookUps("FIELD_ERROR"),
        updatedAt:
          waterInfrastructure?.updatedAt ?? TableLookUps("FIELD_ERROR"),
      };
    });
    return data;
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
      <h2>{TableLookUps("INFRASTRUCTURES")}</h2>
      <AdjustableTable
        queryURL={"/WaterInfras"}
        Massage={massage}
        Format={format}
        Columns={waterInfrastructureColumns}
      />
    </div>
  );
};

export default WaterInfrastructureTable;
