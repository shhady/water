import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const fetchData = async (url) => {
  const res = await fetch(url);
  return res.json();
};

const useFetch = (url) => {
  const Response = useQuery(url, () => fetchData(url));
  const Data = Response.data;
  const [Rows, setRows] = useState([]);
  useEffect(() => {
    if (Data != null) {
      setRows(
        Data.map((t) => ({
          ...t,
          id: t._id,
          createdAt: moment(t.createdAt).format("HH:mm:ss DD-MM-YYYY"),
          updatedAt: moment(t.updatedAt).format("HH:mm:ss DD-MM-YYYY"),
        }))
      );
    }
  }, [Data]);

  if (Response.isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (Response.isError) {
    return <h1>ERROR</h1>;
  }
};

export default useFetch;
