import { DataGrid } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useQuery } from "react-query";
// Get all Cyber alerts
// Get all water pollution alerts

const fetchData = async (url) => {
  const res = await fetch(url);
  return res.json();
};

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "pond", headerName: "Pond", width: 130 },
  { field: "alertType", headerName: "Alert Type", width: 130 },
  { field: "parameter", headerName: "Parameter", width: 130 },
  { field: "value", headerName: "Value", width: 130 },
  { field: "createdAt", headerName: "Created At", width: 130 },
  { field: "updatedAt", headerName: "Updated At", width: 130 },
  { field: "status", headerName: "Status", width: 90 },
];

const AlertTable = () => {
  const waterResponse = useQuery("water", () => fetchData("water"));
  const cyberResponse = useQuery("cyber", () => fetchData("cyber"));

  if (waterResponse.isLoading || cyberResponse.isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (waterResponse.isError || cyberResponse.isError) {
    return <h1>ERROR</h1>;
  }

  // * Don't know if this works
  const data = [...waterResponse.data, ...cyberResponse.data];
  const rows = data.map((dat, index) => {
    return {
      id: index,
      Pond: dat.P,
      alertType: dat.T,
      parameter: dat.p,
      value: dat.v,
      createdAt: dat.createdAt,
      updatedAt: dat.updatedAt,
      status: dat.m,
    };
  });

  return (
    <div className="AlertTable">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default AlertTable;
