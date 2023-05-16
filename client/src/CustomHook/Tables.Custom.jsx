import { DataGrid } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "react-query";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const fetchData = async (url) => {
  const res = await fetch(url);
  return res.json();
};
const url = "http://localhost:5000";
function Tables(params) {
  const navigate = useNavigate();
  const Response = useQuery(params.QueryName, () =>
    fetchData(url + "/" + params.QueryName)
  );
  const Data = Response.data;
  const [Rows, setRows] = useState([]);
  useEffect(() => {
    if (Data != null) {
      setRows(
        Data.map((t) => ({
          ...t,
          id: t._id,
          createdAt: moment(t.createdAt).format("HH:mm:ss DD-MM-YYYY"),
          updatedAt: moment(t.updatedAt).format("HH:mm:ss DD-MM-YYYY"),
        }))
      );
    }
  }, [Data]);

  if (Response.isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (Response.isError) {
    return <h1>ERROR</h1>;
  }

  const clickHandler = (obj) => {
    console.log(obj);
    localStorage.setItem("form-type", params.type);
    localStorage.setItem("form-data", JSON.stringify(obj.row));
    navigate("/data-form");
  };

  const createHandler = () => {
    localStorage.setItem("form-type", params.type);
    localStorage.removeItem("form-data");
    navigate("/data-form");
  };

  const Columns = params.columns.concat({
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (obj) => (
      <button onClick={() => clickHandler(obj)}>Update</button>
    ),
  });

  return (
    <div style={{ width: "100%" }}>
      <button onClick={() => createHandler()}>+</button>
      <DataGrid
        autoHeight
        rows={Rows}
        columns={Columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        pageSizeOptions={[10, 50, 100]}
      />
    </div>
  );
}

export { Tables };
