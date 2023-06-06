// import React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { TextField } from "@mui/material";

// const MyDataGrid = ({ Rows, Columns }) => {
//   const rowsWithInputs = Rows.map((row, rowIndex) => {
//     const rowWithInputs = {};

//     for (const key in row) {
//       rowWithInputs[key] = (
//         <TextField defaultValue={row[key]} variant="outlined" size="small" />
//       );
//     }

//     return { id: rowIndex, ...rowWithInputs };
//   });

//   const columnsWithInputs = Columns.map((column) => ({
//     ...column,
//     renderCell: (params) => <input />,
//   }));

//   return (
//     <div style={{ height: 400, width: "100%" }}>
//       <DataGrid
//         rows={rowsWithInputs}
//         columns={columnsWithInputs}
//         checkboxSelection
//       />
//     </div>
//   );
// };

// export default MyDataGrid;

import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

function MyDataGrid({ Rows, Columns }) {
  const [rows, setRows] = useState(Rows);
  const [isEditing, setIsEditing] = useState(false);
  const [editRowIndex, setEditRowIndex] = useState(null);

  const handleEditClick = (index) => {
    setIsEditing(true);
    setEditRowIndex(index);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setEditRowIndex(null);
    // Save the updated data
    // ...

    // You can update the rows state here if needed
    // setRows(updatedRows);
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
          type="text"
          defaultValue={value}
          onChange={(e) => {
            const updatedRows = [...rows];
            updatedRows[rowIndex - 1][field] = e.target.value;
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
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        renderCell={renderCell}
      />
    </div>
  );
}

export default MyDataGrid;
