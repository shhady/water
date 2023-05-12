import { DataGrid } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "react-query";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const fetchData = async (url) => {
    const res = await fetch(url);
    return res.json();
};
const url = "http://localhost:5000";
function Tables(params) {
    const Response = useQuery(params.QueryName, () => fetchData(url + "/" + params.QueryName));
    const Data = Response.data;
    const [Rows, setRows] = useState([]);
    useEffect(() => {
        if (Data != null) {
            setRows(Data.map((t) => ({ ...t, id: t._id })));
        }
    }, [Data])

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


    const deleteHandler = (obj) => {
        console.log(obj);
        fetch(url + "/" + params.QueryName + "/" + obj.id, {
            method: "DELETE"
        }).then(res => {
            if (res.ok) {
                setRows(Rows.filter((t) => t._id !== obj.id));
            }
        });
    };


    const Columns = params.columns.concat({
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (obj) => (
            <button onClick={() => deleteHandler(obj)}>Delete me</button>
        ),
    });

    return (
        <div>
            <DataGrid
                rows={Rows}
                columns={Columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />

        </div>
    );
}

export { Tables }