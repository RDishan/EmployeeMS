import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Avatar,
  AppBar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import moment from "moment";

const EmpDetail = () => {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/employee/empdashboard/${id}`)
      .then((result) => {
        setEmployee(result.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const formatDateOfBirth = (date) => {
    return moment(date).format("MMMM Do, YYYY");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#c8e6c9",
        minHeight: "100vh",
        padding: 3,
      }}
    >
      <AppBar
        position="static"
        sx={{ mb: 6, backgroundColor: "#2e7d32" }}
      ></AppBar>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <TableContainer component={Paper} sx={{ boxShadow: 20, mb: 2,backgroundColor: "#c8e6c9",  marginTop: '-10px', paddingLeft: '20px', paddingRight: '20px'}}>
              <Table aria-label="personal details" sx={{ minWidth: '100%' }}>
                <TableHead>
                  <TableRow sx={{ borderBottom: '1px solid #1b5e20' }}>
                    <TableCell
                      colSpan={2}
                      sx={{ backgroundColor: "1b5e20", fontSize: "1.2rem",fontWeight: "bold" ,color: "white"}}
                    >
                      Personal Details
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ borderBottom: '2px solid #1b5e20' }}>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold">
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{employee.name}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ borderBottom: '2px solid #1b5e20' }}>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold">
                        Surname
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {employee.surname}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ borderBottom: '2px solid #1b5e20' }}>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold">
                        Gender
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{employee.gender}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ borderBottom: '2px solid #1b5e20' }}>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold">
                        Date of Birth
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {formatDateOfBirth(employee.date_of_birth)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ borderBottom: '2px solid #1b5e20' }}>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold">
                        Phone Number (+94)
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {employee.phone_number}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold">
                        Email Address
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{employee.email}</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              top: "90px", 
              left: "100px",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                boxShadow: 10,
                borderRadius: 3,
                p: 3,
                textAlign: "center",
                backgroundColor: "#8FBC8F",
              }}
            >
              <Avatar
                alt={employee.name}
                src={`http://localhost:3001/Images/${employee.image}`}
                sx={{ width: "100%", height: "400px", borderRadius: "120px" }}
              />
              {employee.gender === "Male" ? (
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", marginTop: 4 }}
                >
                  Mr. {employee.surname}
                </Typography>
              ) : (
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", marginTop: 4 }}
                >
                  Mrs. {employee.surname}
                </Typography>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={7} sx={{ marginTop: -12 ,paddingTop: '20px' }}>
            <TableContainer component={Paper} sx={{ boxShadow: 20 , marginTop: '-10px', paddingLeft: '20px', paddingRight: '20px',backgroundColor: "#c8e6c9"}}>
              <Table aria-label="job details">
                <TableHead>
                  <TableRow sx={{ borderBottom: '1px solid #1b5e20' }}>
                    <TableCell
                      colSpan={2}
                      sx={{ backgroundColor: "#1b5e20",fontSize: "1.2rem", fontWeight: "bold",color: "white" }}
                    >
                      Job Details
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ borderBottom: '2px solid #1b5e20' }}>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold">
                        Job Title
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {employee.job_title}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ borderBottom: '2px solid #1b5e20' }}>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold">
                        Department
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{employee.dname}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ borderBottom: '2px solid #1b5e20' }}>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold">
                        Employment Type
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {employee.employment_type}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ borderBottom: '2px solid #1b5e20' }}>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold">
                        Date of Hire
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{formatDateOfBirth(employee.date_of_hire)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold">
                        Salary
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        ${employee.salary}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default EmpDetail;
