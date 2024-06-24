import { useEffect, useMemo, useState } from "react";
import AxiosInstance from "./Axios";
import { MaterialReactTable } from "material-react-table";
import Dayjs from "dayjs";
import { Box, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Home = () => {
  const [myData, setMydata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data from the API
  const GetData = async () => {
    try {
      setLoading(true);
      const res = await AxiosInstance.get(`project/`);
      setMydata(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data");
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    GetData();
  }, []);

  // Define columns for the table
  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Name", size: 150 },
      { accessorKey: "status", header: "Status", size: 150 },
      { accessorKey: "comments", header: "Comments", size: 200 },
      {
        accessorFn: (row) => Dayjs(row.start_date).format("DD-MM-YYYY"),
        header: "Start date",
        size: 150,
      },
      {
        accessorFn: (row) => Dayjs(row.end_date).format("DD-MM-YYYY"),
        header: "End date",
        size: 150,
      },
    ],
    []
  );

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={myData}
          enableRowActions
          renderRowActions={({ row }) => (
            <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
              <IconButton
                color="secondary"
                component={Link}
                to={`edit/${row.original.id}`}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                component={Link}
                to={`delete/${row.original.id}`}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        />
      )}
    </div>
  );
};

export default Home;
