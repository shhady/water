import React, { useState } from "react";
import MaterialTable from "@material-table/core";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

function Table({ data, lookups }) {
  const [tableData, setTableData] = useState(data);

  const handleRowClick = (event, rowData) => {
    const updatedData = [...tableData];
    const rowIndex = updatedData.findIndex((item) => item.id === rowData.id);
    console.log("HI");
    if (rowIndex !== -1) {
      updatedData[rowIndex] = { ...rowData, editing: true };
      setTableData(updatedData);
    }
  };

  const handleSaveRow = (newData, oldData) => {
    return new Promise((resolve, reject) => {
      const updatedData = [...tableData];
      const rowIndex = updatedData.findIndex((item) => item.id === oldData.id);
      // send update request
      console.log("HI");
      if (rowIndex !== -1) {
        updatedData[rowIndex] = { ...newData, editing: false };
        setTableData(updatedData);
        resolve(); // Resolve the promise if the update is successful
      } else {
        reject(new Error("Row not found")); // Reject the promise if the row is not found
      }
    });
  };

  const handleAddRow = (newData) => {
    return new Promise((resolve) => {
      const newId = Date.now().toString();
      const newRow = { id: newId, editing: true, ...newData };
      const updatedData = [newRow, ...tableData];
      setTableData(updatedData);
      resolve();
    });
  };

  const renderFieldValue = (field, rawValue) => {
    if (lookups[field] && lookups[field][rawValue]) {
      return lookups[field][rawValue];
    }
    return rawValue;
  };

  const renderActions = (rowData) => {
    return (
      <div
        style={{ display: "flex", justifyContent: "flex-end" }}
        onClick={(event) => handleRowClick(event, rowData)}
      >
        <EditIcon style={{ cursor: "pointer" }} />
      </div>
    );
  };

  const columns = Object.keys(data[0]).map((key) => ({
    title: key,
    field: key,
    render: (rowData) => renderFieldValue(key, rowData[key]),
  }));

  return (
    <div>
      <button onClick={handleAddRow} style={{ marginBottom: "10px" }}>
        <AddIcon /> Add Row
      </button>
      <MaterialTable
        title="Editable Table"
        columns={columns}
        data={tableData}
        options={{
          search: true,
          paging: true,
          draggable: false,
          toolbar: false,
          pageSize: 10,
          pageSizeOptions: [10, 50, 100],
        }}
        actions={[
          {
            icon: () => null,
            render: renderActions,
          },
        ]}
        editable={{
          onRowUpdate: handleSaveRow,
          onRowAdd: handleAddRow,
        }}
      />
    </div>
  );
}

export default Table;
