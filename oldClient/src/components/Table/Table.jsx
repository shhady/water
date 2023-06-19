import React, { useState, useEffect, createRef } from "react";
import MaterialTable from "@material-table/core";
import tableIcons from "./MaterialTableIcons";
import { ExportCsv } from "@material-table/exporters";
import "./table.css";

function Table({
  title,
  data,
  columns,
  options,
  indexKey,
  isLoading = true,
  actions = [],
}) {
  const tableRef = createRef(null);
  const [loading, setLoading] = useState(isLoading);
  const [tableOptions, setTableOptions] = useState({ ...options });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setTableOptions((prevOptions) => ({
      ...prevOptions,
      paging: options?.constPageSize
        ? data?.length > options.constPageSize
        : true,
    }));
  }, [data?.length, options]);

  const editable = {};
  if (options?.editOptions?.add) {
    editable.onRowAdd = (newData) =>
      new Promise((resolve, reject) => {
        setLoading(true);
        if (options.editOptions.add(newData)) {
          resolve();
        } else {
          reject();
        }
        setLoading(false);
      });
  }
  if (options?.editOptions?.update) {
    editable.onRowUpdate = (newData) =>
      new Promise((resolve, reject) => {
        setLoading(true);
        if (options.editOptions.update(newData)) {
          resolve();
        } else {
          reject();
        }
        setLoading(false);
      });
  }
  if (options?.editOptions?.delete) {
    editable.onRowDelete = (oldData) =>
      new Promise((resolve) => {
        setLoading(true);
        options.editOptions.delete(oldData);
        resolve();
        setLoading(false);
      });
  }

  const displayColumns = Object.entries(columns).map(([key, value]) => ({
    title: value,
    field: key,
    initialEditValue: options?.initialEditValue?.[key] || null,
    lookup: options?.lookup?.[key] || null,
    filtering: options?.filter?.[key] !== false,
    render: options?.render?.[key] || null,
    type: options?.type?.[key] || null,
    cellStyle: { textAlign: "start" },
    customSort: options?.customSort?.[key] || null,
    validate: options?.customValidate?.[key] || null,
    editable:
      options?.editOptions?.disableCols?.includes(key) &&
      !options?.editOptions?.editableOnUpdate?.includes(key)
        ? "never"
        : "always",
    editComponent: options?.editOptions?.customEditComponent?.[key] || null,
    hidden: options?.hidden?.[key] || null,
  }));

  useEffect(() => {
    setTableOptions((prevOptions) => ({
      ...prevOptions,
      columns: displayColumns,
    }));
  }, [displayColumns]);

  useEffect(() => {
    if (data) {
      setLoading(false);
      if (!options.constPageSize) {
        if (data.length < 10) {
          setTableOptions((prevOptions) => ({
            ...prevOptions,
            pageSizeOptions: [data.length, 10, 50, 100].sort((a, b) => a - b),
          }));
          tableRef.current.dataManager.changePageSize(data.length);
        } else {
          setTableOptions((prevOptions) => ({
            ...prevOptions,
            pageSizeOptions: [10, 50, 100],
          }));
          if (![10, 50, 100].includes(tableRef.current.dataManager.pageSize)) {
            tableRef.current.dataManager.changePageSize(10);
          }
        }
      }
    }
  }, [data]);

  return (
    <div className="table-container">
      <MaterialTable
        title={title}
        icons={tableIcons}
        columns={tableOptions.columns}
        data={data}
        options={{
          ...tableOptions,
          loading,
          pageSize: tableOptions.pageSize || 10,
          actionsColumnIndex: -1,
          exportButton: options?.exportCsv !== false ? true : false,
          exportCsv: () => {
            ExportCsv(tableRef.current, options.exportCsvOptions);
          },
        }}
        actions={actions}
        editable={editable}
        tableRef={tableRef}
      />
    </div>
  );
}

export default Table;
