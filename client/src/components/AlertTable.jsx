import { DataGrid } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useQuery } from "react-query";
import { useState } from "react";

const fetchData = async (url) => {
  const res = await fetch(url);
  return res.json();
};

const url = "http://localhost:5000";

const pondCLickHandler = (params) => {
  alert(params.row.alerts);
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
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => (
      <button
        onClick={() => console.log(`Clicked row with id ${params.row.id}`)}
      >
        Click me
      </button>
    ),
  },
];

const pondColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "pond", headerName: "Pond Number", width: 130 },
  { field: "alerts", headerName: "Alerts", width: 130 },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => (
      <button onClick={() => pondCLickHandler(params)}>Click me</button>
    ),
  },
];

const AlertTable = () => {
  const waterResponse = useQuery("water", () => fetchData(url + "/WaterData"));
  const cyberResponse = useQuery("cyber", () =>
    fetchData(url + "/CyberProblem")
  );

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
  const pondRows = Object.values(
    data.reduce((acc, curr, index) => {
      const { P, T, p } = curr;
      acc[P] = acc[P] || { id: index, pond: P, alerts: [] };
      acc[P].alerts.push(T + " - " + p);
      return acc;
    }, {})
  );

  const rows = data.map((dat, index) => {
    return {
      id: index,
      pond: dat.P,
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
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 50, 100]}
        checkboxSelection
      />
      <DataGrid
        rows={pondRows}
        columns={pondColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 50, 100]}
        checkboxSelection
      />
    </div>
  );
};

export default AlertTable;
