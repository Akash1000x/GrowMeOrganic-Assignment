import { GridColDef, DataGrid } from "@mui/x-data-grid";
import * as React from "react";

type Data = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function Table() {
  const [data, setData] = React.useState<Data[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setLoading(false);
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "body",
      headerName: "Body",
      flex: 2,
    },
  ];

  return (
    <div id="table">
      <style>
        {`
          .MuiDataGrid-filler {
            display: none !important;
          }
        `}
      </style>
      <DataGrid
        rows={data}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}
