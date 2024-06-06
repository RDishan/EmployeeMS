// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import axios from "axios";

const Attendance = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [employees, setEmployees] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/categories")
      .then((response) => {
        const { Status, Result } = response.data;
        if (Status && Array.isArray(Result)) {
          setCategories(Result);
        } else {
          console.error("Invalid categories data structure:", response.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (category) {
      axios
        .get(`http://localhost:3001/auth/categories/${category}/employees`)
        .then((response) => setEmployees(response.data))
        .catch((error) => console.error(error));
    }
  }, [category]);

  const handleAttendanceChange = (id, status) => {
    setEmployees(
      employees.map((emp) => (emp.id === id ? { ...emp, status } : emp))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    employees.forEach((employee) => {
      axios
        .post("http://localhost:3001/auth/attendance", {
          employeeId: employee.id,
          date,
          status: employee.status,
        })
        .then((response) => console.log(response.data))
        .catch((error) => console.error(error));
    });
  };

  return (
    <Container style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Record Attendance
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Department</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {employees.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    {emp.name} {emp.surname}
                  </TableCell>
                  <TableCell>{emp.job_title}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.phone_number}</TableCell>
                  <TableCell>
                    <Select
                      value={emp.status || ""}
                      onChange={(e) =>
                        handleAttendanceChange(emp.id, e.target.value)
                      }
                    >
                      <MenuItem value="Present">Present</MenuItem>
                      <MenuItem value="Absent">Absent</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Button
          type="submit"
          variant="contained"
          style={{ backgroundColor: "#228B22", color: "white" ,marginTop: '25px' }}
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Attendance;
