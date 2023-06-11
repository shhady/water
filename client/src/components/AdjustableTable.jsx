import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { baseURL } from "../constants/urlConstants.js";
import { Box } from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import useRequest from "../hooks/useRequest.js";

const fetchData = async (url) => {
  const res = await fetch(url);
  return res.json();
};

function AdjustableTable({ Columns, queryURL, Massage, Format }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [rows, setRows] = useState([]);
  const Response = useQuery(queryURL, () => fetchData(baseURL + queryURL));
  const Data = Response.data;
  const { loading, error, sendFetchRequest } = useRequest();

  useEffect(() => {
    if (Massage == undefined) {
      return;
    }
    if (Data != null) {
      setRows(Massage(Data));
    }
  }, [Data, Massage]);

  if (Response.isLoading || loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (Response.isError || error) {
    return error ? <h1>{error.message}</h1> : <h1>ERROR</h1>;
  }

  const handleEditClick = (index) => {
    setIsEditing(true);
    setEditRowIndex(index);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setEditRowIndex(null);

    // You can access the edited row object using the editRowIndex
    const editedRow = rows.find((row) => row.id === editRowIndex);
    if (editedRow && !editedRow.fresh) {
      sendFetchRequest(
        baseURL + queryURL + "/" + editedRow.id,
        Format(editedRow),
        "PUT"
      ).then((data) => console.log(data));
    } else {
      console.log("POST request", queryURL);
      sendFetchRequest(baseURL + queryURL, Format(editedRow), "POST").then(
        (data) => console.log(data)
      );
      // id = response.id
      editedRow.fresh = false;
    }

    // You can update the rows state here if needed
    // setRows(updatedRows);
  };

  const handleAddRowClick = () => {
    const newRow = {
      id: rows.length + 1,
      ...Columns.map((col) => ""),
      fresh: true,
    };
    setRows([...rows, newRow]);
    setIsEditing(true);
    setEditRowIndex(rows.length + 1);
  };

  let columns = [
    ...Columns,
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => {
        const rowIndex = params.row.id; // Update here
        if (isEditing && rowIndex === editRowIndex) {
          return <button onClick={handleSaveClick}>Save</button>;
        }

        return <button onClick={() => handleEditClick(rowIndex)}>Edit</button>;
      },
    },
  ];

  const renderCell = (params) => {
    const rowIndex = params.row.id; // Update here
    const field = params.field;
    const value = params.value;

    if (isEditing && rowIndex === editRowIndex) {
      return (
        <input
          style={{ fontSize: "10px" }}
          type="text"
          defaultValue={value}
          onChange={(e) => {
            const updatedRows = [...rows];
            const row = rows.findIndex((row) => row.id === rowIndex);
            updatedRows[row][field] = e.target.value;
            setRows(updatedRows);
          }}
        />
      );
    }

    return <div>{value}</div>;
  };

  columns = columns.map((col, index) =>
    index !== columns.length - 1 ? { ...col, renderCell } : col
  );

  return (
    <div style={{ height: 400, width: "100%" }}>
      <button onClick={handleAddRowClick}>+</button>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        renderCell={renderCell}
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

export default AdjustableTable;
