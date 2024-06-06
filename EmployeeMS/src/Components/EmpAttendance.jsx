import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Chart from "chart.js/auto";
import "./EmpAttendance.css";
import moment from "moment";

const EmpAttendance = () => {
  const { id } = useParams();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [chartData, setChartData] = useState(null); 
  const [totalAbsents, setTotalAbsents] = useState(0);
  const [totalPresents, setTotalPresents] = useState(0);

  useEffect(() => {
    const fetchAttendanceRecords = () => {
      let url = `http://localhost:3001/employee/${id}/attendance`;
      if (selectedMonth) {
        url += `?month=${selectedMonth}`;
      }

      axios
        .get(url)
        .then((response) => {
          const { Status, Result } = response.data;
          if (Status) {
            setAttendanceRecords(Result);
            generateChartData(Result); 
            calculateTotals(Result); 
          } else {
            console.error(
              "Failed to fetch attendance records:",
              response.data.Error
            );
          }
        })
        .catch((error) =>
          console.error("Error fetching attendance records:", error)
        );
    };

    fetchAttendanceRecords();
  }, [id, selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const formatDateOfBirth = (date) => {
    return moment(date).format("MMMM Do, YYYY");
  };

  // Function to generate chart data
  const generateChartData = (attendanceRecords) => {
    const attendanceStatusCount = {
      Present: 0,
      Absent: 0,
      // Add more statuses if needed
    };

    attendanceRecords.forEach((record) => {
      attendanceStatusCount[record.status]++;
    });

    const chartLabels = Object.keys(attendanceStatusCount);
    const chartData = {
      labels: chartLabels,
      datasets: [
        {
          data: chartLabels.map((label) => attendanceStatusCount[label]),
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)", // Present color
            "rgba(255, 99, 132, 0.6)", // Absent color
          ],
        },
      ],
    };

    setChartData(chartData);
  };

  const calculateTotals = (attendanceRecords) => {
    let absents = 0;
    let presents = 0;

    attendanceRecords.forEach((record) => {
      if (record.status === "Absent") {
        absents++;
      } else if (record.status === "Present") {
        presents++;
      }
    });

    setTotalAbsents(absents);
    setTotalPresents(presents);
  };

  const renderPieChart = () => {
    const canvas = document.getElementById("attendancePieChart");
    if (canvas) {
      // Destroy previous chart instance if exists
      Chart.getChart(canvas)?.destroy();

      // Render new chart instance
      const ctx = canvas.getContext("2d");
      new Chart(ctx, {
        type: "pie",
        data: chartData,
      });
    }
  };

  // Call renderPieChart after the component has been rendered
  useEffect(() => {
    renderPieChart();
  }, [chartData]);

  return (
    <Container style={{ marginTop: "40px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        My Attendance Records
      </Typography>
      <Box mt={3} className="dropdown-container">
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          displayEmpty
          fullWidth
          className="dropdown"
        >
          <MenuItem value="">All Months</MenuItem>
          <MenuItem value="1">January</MenuItem>
          <MenuItem value="2">February</MenuItem>
          <MenuItem value="3">March</MenuItem>
          <MenuItem value="4">April</MenuItem>
          <MenuItem value="5">May</MenuItem>
          <MenuItem value="6">June</MenuItem>
          <MenuItem value="7">July</MenuItem>
          <MenuItem value="8">August</MenuItem>
          <MenuItem value="9">September</MenuItem>
          <MenuItem value="10">October</MenuItem>
          <MenuItem value="11">November</MenuItem>
          <MenuItem value="12">December</MenuItem>
        </Select>
        {attendanceRecords.length > 0 ? (
          <Table style={{ border: "2px solid black" }}>
            <TableHead>
              <TableRow sx={{ borderBottom: "2px solid #1b5e20" }}>
                <TableCell style={{ color: "white", fontSize: "1.2rem" }}>
                  Date
                </TableCell>
                <TableCell style={{ color: "white", fontSize: "1.2rem" }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell style={{ fontSize: "1rem" }}>
                    {formatDateOfBirth(record.date)}
                  </TableCell>
                  <TableCell style={{ fontSize: "1rem" }}>
                    {record.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="body1" align="center">
            No attendance records found.
          </Typography>
        )}
      </Box>
      <Box
        mt={3}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <canvas
          id="attendancePieChart"
          style={{ maxWidth: "300px", margin: "0 auto", marginBottom: "20px" }}
        ></canvas>{" "}
        {}
        <Card
          style={{
            backgroundColor: "#C8E6C9",
            maxWidth: "200px",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            border: "2px solid #1B5E20",
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom style={{ color: "#1B5E20" }}>
              Absents: {totalAbsents}
            </Typography>
            <Typography variant="h6" gutterBottom style={{ color: "#1B5E20" }}>
              Presents: {totalPresents}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default EmpAttendance;
