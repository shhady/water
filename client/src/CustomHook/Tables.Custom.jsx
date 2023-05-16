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
    obj.row.status = true;
    fetch(url + "/" + params.QueryName + "/" + obj.id, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(obj.row),
    }).then((res) => {
      if (res.ok) {
        // setRows([...Rows]);
        console.log("done");
      }
    });
  };

  const createHandler = () => {
    const inputs = params.columns
      .map((col) => col.field)
      .filter((col) => {
        return col != "id" && col != "createdAt" && col != "updatedAt";
      });
    localStorage.setItem("inputs", JSON.stringify(inputs));
    navigate(`./add_trigger`);
  };

  const Columns = params.columns.concat({
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (obj) => (
      <button onClick={() => clickHandler(obj)}>Update me</button>
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
