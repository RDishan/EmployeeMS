import axios from "axios";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Card } from '@mui/material';
import { green, blue, red, yellow, purple } from '@mui/material/colors';

const COLORS = [green[500], blue[500], red[500], yellow[500], purple[500]];

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [departmentData, setDepartmentData] = useState([]);
  const [salaryData, setSalaryData] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    categoryCount();
    AdminRecords();
    fetchDepartmentData();
    fetchSalaryData();
  }, []);

  const AdminRecords = () => {
    axios.get("http://localhost:3001/auth/admin_records").then((result) => {
      if (result.data.Status) {
        setAdmins(result.data.Result);
      } else {
        alert(result.data.Error);
      }
    });
  };

  const adminCount = () => {
    axios.get("http://localhost:3001/auth/admin_count").then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    });
  };

  const employeeCount = () => {
    axios.get("http://localhost:3001/auth/employee_count").then((result) => {
      if (result.data.Status) {
        setEmployeeTotal(result.data.Result[0].employee);
      }
    });
  };

  const salaryCount = () => {
    axios.get("http://localhost:3001/auth/salary_count").then((result) => {
      if (result.data.Status) {
        setSalaryTotal(result.data.Result[0].salary);
      }
    });
  };

  const categoryCount = () => {
    axios.get("http://localhost:3001/auth/categories").then((result) => {
      if (result.data.Status) {
        setCategoryTotal(result.data.Result.length);
      }
    });
  };

  const fetchDepartmentData = () => {
    axios.get("http://localhost:3001/auth/department_employee_count").then((result) => {
      if (result.data.Status) {
        setDepartmentData(result.data.Result);
      }
    });
  };

  const fetchSalaryData = () => {
    axios.get("http://localhost:3001/auth/department_salary_distribution").then((result) => {
      if (result.data.Status) {
        setSalaryData(result.data.Result);
      }
    });
  };

  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3 flex-wrap">
        <div className="card text-center shadow-sm w-25 bg-success text-white mb-3 mx-2">
          <div className="card-body">
            <h4>Admin</h4>
            <hr />
            <h5>Total: {adminTotal}</h5>
          </div>
        </div>
        <div className="card text-center shadow-sm w-25 bg-success text-white mb-3 mx-2">
          <div className="card-body">
            <h4>Employee</h4>
            <hr />
            <h5>Total: {employeeTotal}</h5>
          </div>
        </div>
        <div className="card text-center shadow-sm w-25 bg-success text-white mb-3 mx-2">
          <div className="card-body">
            <h4>Salary</h4>
            <hr />
            <h5>Total: {salaryTotal}</h5>
          </div>
        </div>
        <div className="card text-center shadow-sm w-25 bg-success text-white mb-3 mx-2">
          <div className="card-body">
            <h4>Departments</h4>
            <hr />
            <h5>Total: {categoryTotal}</h5>
          </div>
        </div>
      </div>
      <div className="mt-4 px-5 pt-3">
        <h3>List of Admins</h3>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between mt-4 px-2 pt-3">
        <div style={{width: "50%"}}>
          <h3>Number of Employees in Each Department</h3>
          <BarChart width={400} height={300} data={departmentData} barSize={30}>
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="employeeCount" fill={green[500]} />
          </BarChart>
        </div>
        <div style={{width: "50%"}}>
          <h3>Salary Distribution by Department</h3>
          <BarChart  width={400} height={300}  barSize={40} data={salaryData}>
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="salary" fill={blue[500]} />
          </BarChart>
        </div>
      </div>
    </div>
  );
};


export default Home;
