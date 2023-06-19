//import { Tables } from "../CustomHook/Tables.Custom";
import TableLookUps from "../constants/TableLookUps";
import tableIcons from "./Table/MaterialTableIcons";
import Table from "./Table/Table";
import AdjustableTable from "./AdjustableTable";
import { useEffect } from "react";
import useRequest from "../hooks/useRequest.js";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { baseURL } from "../constants/urlConstants.js";

const TriggerTable = () => {
  const { loading, error, sendFetchRequest } = useRequest();

  // CHANGE THIS AND USE data from useRequest
  useEffect(() => {
    sendFetchRequest(
      baseURL + "/Arrays",
      { names: ["TriggerTypes", "TriggerNames"] },
      "PUT"
    )
      .then((data) => {
        localStorage.setItem("trigger-types", JSON.stringify(data[1]));
        localStorage.setItem("trigger-names", JSON.stringify(data[0]));
      })
      .catch((err) => console.log(err));
  }, [sendFetchRequest]);

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

  const title = "Triggers";
  const eventsCols = {
    id: "Trigger ID",
    triggerType: "Trigger Type",
    createdAt: "Created",
    updatedAt: "Updated",
    status: "Status",
  };
  const options = {
    columnsButton: true,
    hidden: { id: hideCustomerColumn },
    edit: false,
    filtering: filtering ? true : false,
    customSort: {},
    filter: { status: false },
    lookup: {
      status: { 0: "new", 1: "done" },
    },
    editOptions: {
      disableCols: ["id", "triggerType", "createdAt", "updatedAt", "status"],
    },
    render: {
      id: (rowData) => rowData.id,
      triggerType: (rowData) => rowData.triggerType,
    },
    onRowClick: (event, rowData, togglePanel) => {
      togglePanel();
    },
    rowStyle: (rowData) => {
      return {
        direction: "ltr",
        position: "relative",
        fontSize: "1.2rem",
        color: "var(--textColor)",
        backgroundColor:
          selectedRow.current === rowData.tableData.id
            ? "var(--light-gray)"
            : "inherit",
      };
    },
    detailPanel: [
      (rowData) => {
        <p>hello</p>;
      },
    ],
  };

  // const triggersColumns = [
  //   { field: "id", headerName: "TRIGGER_ID", flex: 1, hide: true },
  //   {
  //     field: "triggerType",
  //     headerName: TableLookUps("TRIGGER_TYPE"),
  //     flex: 1,
  //   },
  //   {
  //     field: "triggerName",
  //     headerName: TableLookUps("TRIGGER_NAME"),
  //     flex: 1,
  //   },

  //   {
  //     field: "validValueH",
  //     headerName: "validValueH",
  //     flex: 1,
  //   },
  //   {
  //     field: "validValueL",
  //     headerName: "validValueL",
  //     flex: 1,
  //   },
  //   {
  //     field: "valueType",
  //     headerName: "valueType",
  //     flex: 1,
  //   },
  //   {
  //     field: "status",
  //     headerName: TableLookUps("STATUS"),

  //     flex: 1,
  //   },
  //   {
  //     field: "createdAt",
  //     headerName: TableLookUps("CREATED_AT"),

  //     flex: 1,
  //   },
  //   {
  //     field: "updatedAt",
  //     headerName: TableLookUps("UPDATED_AT"),

  //     flex: 1,
  //   },
  // ];

  // const massage = (Data) => {
  //   Data = Data.map((trigger) => {
  //     return {
  //       id: trigger._id,
  //       triggerName: trigger?.triggerName ?? TableLookUps("FIELD_ERROR"),
  //       triggerType:
  //         trigger?.triggerType?.triggerTypeString ??
  //         TableLookUps("FIELD_ERROR"),
  //       validValueH: trigger?.validValueH ?? TableLookUps("FIELD_ERROR"),
  //       validValueL: trigger?.validValueL ?? TableLookUps("FIELD_ERROR"),
  //       valueType: trigger?.valueType ?? TableLookUps("FIELD_ERROR"),
  //       value: trigger?.value ?? TableLookUps("FIELD_ERROR"),
  //       status: trigger?.status
  //         ? "True"
  //         : "False" ?? TableLookUps("FIELD_ERROR"),
  //       createdAt: trigger?.createdAt ?? TableLookUps("FIELD_ERROR"),
  //       updatedAt: trigger?.updatedAt ?? TableLookUps("FIELD_ERROR"),
  //     };
  //   });
  //   return Data;
  // };
  // function format(obj) {
  //   const formattedObj = {};

  //   for (const key in obj) {
  //     const value = obj[key];
  //     formattedObj[key] = value === "-" ? null : value;
  //   }
  //   formattedObj.status = Boolean(formattedObj.status);
  //   return formattedObj;
  // }

  // const editRender = {
  //   triggerName: {
  //     type: "text",
  //     renderType: "select",
  //     options: () => JSON.parse(localStorage.getItem("trigger-names")),
  //   },
  //   triggerType: {
  //     type: "text",
  //     renderType: "select",
  //     options: () => JSON.parse(localStorage.getItem("trigger-types")),
  //   },
  //   validValueH: { type: "number" },
  //   validValueL: { type: "number" },
  //   valueType: { type: "text" },
  //   value: { type: "number" },
  //   status: { type: "checkbox" },
  // };

  const triggerArray = [
    {
      id: 1,
      triggerType: "Type A",
      createdAt: "2023-06-01",
      updatedAt: "2023-06-02",
      status: "Active",
    },
    {
      id: 2,
      triggerType: "Type B",
      createdAt: "2023-06-03",
      updatedAt: "2023-06-04",
      status: "Inactive",
    },
    {
      id: 3,
      triggerType: "Type C",
      createdAt: "2023-06-05",
      updatedAt: "2023-06-06",
      status: "Active",
    },
    {
      id: 4,
      triggerType: "Type A",
      createdAt: "2023-06-07",
      updatedAt: "2023-06-08",
      status: "Inactive",
    },
    {
      id: 5,
      triggerType: "Type B",
      createdAt: "2023-06-09",
      updatedAt: "2023-06-10",
      status: "Active",
    },
    {
      id: 6,
      triggerType: "Type C",
      createdAt: "2023-06-11",
      updatedAt: "2023-06-12",
      status: "Inactive",
    },
    {
      id: 7,
      triggerType: "Type A",
      createdAt: "2023-06-13",
      updatedAt: "2023-06-14",
      status: "Active",
    },
    {
      id: 8,
      triggerType: "Type B",
      createdAt: "2023-06-15",
      updatedAt: "2023-06-16",
      status: "Inactive",
    },
    {
      id: 9,
      triggerType: "Type C",
      createdAt: "2023-06-17",
      updatedAt: "2023-06-18",
      status: "Active",
    },
    {
      id: 10,
      triggerType: "Type A",
      createdAt: "2023-06-19",
      updatedAt: "2023-06-20",
      status: "Inactive",
    },
  ];

  return (
    <>
      {
        <Table
          indexKey="id"
          title={title}
          columns={eventsCols}
          options={options}
          data={triggerArray}
          actions={[
            {
              icon: () => (
                <div
                  style={{ color: dateFilter === 86400 ? "var(--green)" : "" }}
                >
                  <FontAwesomeIcon icon={faCalendarDay} />
                  <p>יממה</p>
                </div>
              ),
              tooltip: "הצגה יומית",
              isFreeAction: true,
              onClick: () => {
                setDateFilter(86400);
              },
            },
            {
              icon: () => (
                <div
                  style={{ color: dateFilter === 604800 ? "var(--green)" : "" }}
                >
                  <FontAwesomeIcon icon={faCalendarWeek} />
                  <p>שבוע</p>
                </div>
              ),
              tooltip: "הצגה שבועית",
              isFreeAction: true,
              onClick: () => {
                setDateFilter(604800);
              },
            },
            {
              icon: () => (
                <div
                  style={{
                    color: dateFilter === 2629743 ? "var(--green)" : "",
                  }}
                >
                  <FontAwesomeIcon icon={faCalendarDays} />
                  <p>חודש</p>
                </div>
              ),

              tooltip: "הצגה חודשית",
              isFreeAction: true,
              onClick: () => {
                setDateFilter(2629743);
              },
            },
            {
              icon: () => (
                <div
                  style={{
                    color: dateFilter === 31556926 ? "var(--green)" : "",
                  }}
                >
                  <FontAwesomeIcon icon={faCalendar} />
                  <p>שנה</p>
                </div>
              ),
              tooltip: "הצגה שנתית",
              isFreeAction: true,
              onClick: () => {
                setDateFilter(31556926);
              },
            },
            {
              icon: () => (
                <div
                  style={{
                    color: dateFilter === Infinity ? "var(--green)" : "",
                  }}
                >
                  <FontAwesomeIcon icon={faCalendarTimes} />
                  <p>הכל</p>
                </div>
              ),
              tooltip: "ללא סינון תאריך",
              isFreeAction: true,
              onClick: () => {
                setDateFilter(Infinity);
              },
            },
          ]}
        />
      }
    </>
  );
};
// <div>
//   <h2>{TableLookUps("TRIGGERS")}</h2>
//   <AdjustableTable
//     queryURL={"/Triggers"}
//     Massage={massage}
//     Format={format}
//     Columns={triggersColumns}
//     EditRender={editRender}
//   />
// </div>

export default TriggerTable;
