import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MyDatePickerField from "./forms/MyDatePickerField";
import MyTextField from "./forms/MyTextField";
import MySelectField from "./forms/MySelectField";
import MyMultiLineField from "./forms/MyMultilineField";
import { useForm } from "react-hook-form";
import AxiosInstance from "./Axios";
import Dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MyMultiSelectField from "./forms/MyMultiSelectField";

const Edit = () => {
  const { id: MyId } = useParams();
  const [projectmanager, setProjectmanager] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hardcoded_options = [
    { id: "", name: "None" },
    { id: "Open", name: "Open" },
    { id: "In progress", name: "In progress" },
    { id: "Completed", name: "Completed" },
  ];

  const GetData = async () => {
    try {
      const [projectManagerRes, employeesRes, projectRes] = await Promise.all([
        AxiosInstance.get(`projectmanager/`),
        AxiosInstance.get(`employees/`),
        AxiosInstance.get(`project/${MyId}`),
      ]);
      setProjectmanager(
        projectManagerRes.data.map((pm) => ({ ...pm, id: String(pm.id) }))
      );
      setEmployees(
        employeesRes.data.map((emp) => ({ ...emp, id: String(emp.id) }))
      );
      setValue("name", projectRes.data.name);
      setValue("status", projectRes.data.status);
      setValue(
        "employees",
        projectRes.data.employees.map((emp) => String(emp))
      );
      setValue("projectmanager", String(projectRes.data.projectmanager));
      setValue("comments", projectRes.data.comments);
      setValue("start_date", Dayjs(projectRes.data.start_date));
      setValue("end_date", Dayjs(projectRes.data.end_date));
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

  // Define validation schema using yup
  const schema = yup.object({
    name: yup.string().required("Name is a required field"),
    projectmanager: yup
      .string()
      .required("Project manager is a required field"),
    status: yup.string().required("Status is a required field"),
    employees: yup
      .array()
      .min(1, "Pick at least one option from the select field"),
    comments: yup.string(),
    start_date: yup.date().required("Start date is a required field"),
    end_date: yup
      .date()
      .required("End date is a required field")
      .min(
        yup.ref("start_date"),
        "The end date cannot be before the start date"
      ),
  });

  // Initialize form with default values and validation schema
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      name: "",
      projectmanager: "",
      status: "",
      employees: [],
      comments: "",
      start_date: null,
      end_date: null,
    },
    resolver: yupResolver(schema),
  });

  const submission = async (data) => {
    const StartDate = Dayjs(data.start_date).format("YYYY-MM-DD");
    const EndDate = Dayjs(data.end_date).format("YYYY-MM-DD");

    try {
      await AxiosInstance.put(`project/${MyId}/`, {
        name: data.name,
        projectmanager: data.projectmanager,
        employees: data.employees,
        status: data.status,
        comments: data.comments,
        start_date: StartDate,
        end_date: EndDate,
      });
      navigate(`/`);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form onSubmit={handleSubmit(submission)}>
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
              Edit project
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
                justifyContent: "space-around",
                marginBottom: "40px",
              }}
            >
              <MyTextField
                label="Name"
                name="name"
                control={control}
                placeholder="Provide a project name"
                width="30%"
              />
              <MyDatePickerField
                label="Start date"
                name="start_date"
                control={control}
                width="30%"
              />
              <MyDatePickerField
                label="End date"
                name="end_date"
                control={control}
                width="30%"
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <MyMultiLineField
                label="Comments"
                name="comments"
                control={control}
                placeholder="Provide project comments"
                width="30%"
              />
              <MySelectField
                label="Status"
                name="status"
                control={control}
                width="30%"
                options={hardcoded_options}
              />
              <MySelectField
                label="Project manager"
                name="projectmanager"
                control={control}
                width="30%"
                options={projectmanager}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "40px",
              }}
            >
              <MyMultiSelectField
                label="Employees"
                name="employees"
                control={control}
                width="30%"
                options={employees}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "40px",
              }}
            >
              <Button variant="contained" type="submit" sx={{ width: "30%" }}>
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </div>
  );
};

export default Edit;
