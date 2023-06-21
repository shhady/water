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
        setTableData([...tableData,newData]);
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

  const renderFieldValue = (field, rawValue) => {
    if (lookups[field] && lookups[field][rawValue]) {
      return lookups[field][rawValue];
    }
    return rawValue;
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
