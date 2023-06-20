import React, { useRef, useState } from "react";
import MaterialTable from "@material-table/core";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

function Table({ data, lookups }) {
  const [tableData, setTableData] = useState(data);
  const tableRef = useRef();

  const handleRowClick = (event, rowData) => {
    const updatedData = [...tableData];
    const rowIndex = updatedData.findIndex((item) => item.id === rowData.id);
    if (rowIndex !== -1) {
      updatedData[rowIndex] = { ...rowData, editing: true };
      setTableData(updatedData);
    }
  };

  const handleSaveRow = (newData, oldData) => {
    const updatedData = [...tableData];
    const rowIndex = updatedData.findIndex((item) => item.id === oldData.id);
    // send update request
    if (rowIndex !== -1) {
      updatedData[rowIndex] = { ...newData, editing: false };
      setTableData(updatedData);
    }
  };

  const handleAddRow = () => {
    const newId = Date.now().toString(); // Generate a unique ID
    const newRow = { id: newId, editing: true }; // Create a new row object
    const updatedData = [newRow, ...tableData]; // Add the new row at the beginning of the table data
    setTableData(updatedData);

    // Scroll to the first page of the tablea
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
      <button onClick={handleAddRow} style={{ marginBottom: "10px" }}>
        <AddIcon /> Add Row
      </button>
      <MaterialTable
        ref={tableRef}
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
        }}
      />
    </div>
  );
}

export default Table;
