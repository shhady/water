import React, { useRef, useState } from "react";
import MaterialTable from "@material-table/core";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

function Table({ data, lookups }) {
  const [tableData, setTableData] = useState(data);
  const tableRef = useRef();

  const handleRowAdd = (newData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setTableData([newData, ...tableData]);
        resolve();
      }, 1000);
    });
  };

  const handleRowUpdate = (newData, oldData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const updatedData = [...tableData];
        const rowIndex = updatedData.findIndex((item) => item.id === oldData.id);
        if (rowIndex !== -1) {
          updatedData[rowIndex] = { ...newData, editing: false };
          setTableData(updatedData);
          resolve();
        } else {
          reject();
        }
      }, 1000);
    });
  };
  

  const handleRowDelete = (oldData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const dataDelete = [...tableData];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setTableData([...dataDelete]);
        resolve();
      }, 1000);
    });
  };

  const handleAddRow = () => {
    const newId = Date.now().toString(); // Generate a unique ID
    const newRow = { id: newId, editing: true }; // Create a new row object
    const updatedData = [newRow, ...tableData]; // Add the new row at the beginning of the table data
    setTableData(updatedData);

    // Scroll to the first page of the table
    tableRef.current.onQueryChange({ page: 0 });
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
        onClick={(event) => handleRowClick(event, rowData)} // Attach click event to the cell
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
      <MaterialTable
        title="Custom Edit Component Preview"
        columns={columns}
        data={tableData}
        editable={{
          onRowAdd: handleRowAdd,
          onRowUpdate: handleRowUpdate,
          onRowDelete: handleRowDelete,
        }}
      />
    </div>
  );
}

export default Table;
