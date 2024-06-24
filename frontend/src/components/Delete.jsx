import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AxiosInstance from "./Axios";
import { useNavigate, useParams } from "react-router-dom";

const Delete = () => {
  const { id: MyId } = useParams();
  const [myData, setMydata] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GetData = async () => {
    try {
      const res = await AxiosInstance.get(`project/${MyId}`);
      setMydata(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data");
      setLoading(false);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  const navigate = useNavigate();

  const submission = async () => {
    try {
      await AxiosInstance.delete(`project/${MyId}/`);
      navigate(`/`);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              backgroundColor: "#00003f",
              marginBottom: "10px",
            }}
          >
            <Typography sx={{ marginLeft: "20px", color: "#fff" }}>
              Delete project: {myData.name}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              boxShadow: 3,
              padding: 4,
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                marginBottom: "40px",
              }}
            >
              Are you sure that you want to delete this project: {myData.name}?
            </Box>

            <Box sx={{ width: "30%" }}>
              <Button
                variant="contained"
                onClick={submission}
                sx={{ width: "100%" }}
              >
                Delete the project
              </Button>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Delete;
