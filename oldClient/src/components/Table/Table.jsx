import React, { useState } from 'react';
import MaterialTable from '@material-table/core';
import EditIcon from '@material-ui/icons/Edit';

function Table({ data, lookups }) {
  const [tableData, setTableData] = useState(data);

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
    /// send update requst
    if (rowIndex !== -1) {
      updatedData[rowIndex] = { ...newData, editing: false };
      setTableData(updatedData);
    }
  };

  const renderFieldValue = (field, rawValue) => {
    if (lookups[field] && lookups[field][rawValue]) {
      return lookups[field][rawValue];
    }
    return rawValue;
  };

  const renderActions = (rowData) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <EditIcon
          style={{ cursor: 'pointer' }}
          onClick={(event) => handleRowClick(event, rowData)}
        />
      </div>
    );
  };

  const columns = Object.keys(data[0]).map((key) => ({
    title: key,
    field: key,
    render: (rowData) => renderFieldValue(key, rowData[key]),
  }));

  return (
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
      }}
    />
  );
}

export default Table;
