import { DataGrid } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "react-query";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../constants/urlConstants";

function Tables(params) {
  const navigate = useNavigate();

  const clickHandler = (obj) => {
    console.log(obj);
    localStorage.setItem("form-type", params.type);
    localStorage.setItem("form-data", JSON.stringify(obj.row));
    navigate("/data-form");
  };

  const createHandler = () => {
    localStorage.setItem("form-type", params.type);
    localStorage.removeItem("form-data");
    navigate("/data-form");
  };

  //get the lang out of attribute as has been set in the constants/index.js file
  let lang = document.getElementsByTagName("html")[0].getAttribute("lang");
  const lookUps = {
    en: { action: "Action", update: "Update" },
    he: { action: "פעולה", update: "עדכון" },
    ar: { action: "إجراءات", update: "تحديث" },
  };
  ////if set lang is not supported do back to english///
  if (!lookUps[lang]) {
    lang = "en";
  }

  const Columns = params.columns.concat({
    field: "action",
    headerName: lookUps[lang]["action"],
    width: 150,
    renderCell: (obj) => (
      <button onClick={() => clickHandler(obj)}>
        {lookUps[lang]["update"]}
      </button>
    ),
  });

  console.log(Rows);

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
