import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployees(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/auth/delete_employee/${id}`)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        alert("An error occurred while deleting the employee.");
      });
  };

  return (
    <div className="px-5 mt-3" style={{ fontSize: "20px" }}>
      <div className="d-flex justify-content-center mb-3">
        <h1>Employee List</h1>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <Link to="/dashboard/add_employee" className="btn btn-success">
          Add Employee
        </Link>
        <input
          type="text"
          className="form-control form-control-lg font-weight-bold"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "400px",
            fontSize: "18px",
            outline: "2px solid forestgreen",
          }}
        />
      </div>
      <div className="mt-3">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Job Title</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees
              .filter((employee) =>
                employee.name?.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.surname}</td>
                  <td>
                    <img
                      src={`http://localhost:3001/Images/` + employee.image}
                      className="employee_image"
                      alt={employee.name}
                    />
                  </td>
                  <td>{employee.email}</td>
                  <td>{employee.address}</td>
                  <td>{employee.phone_number}</td>
                  <td>{employee.job_title}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <Link
                      to={`/dashboard/edit_employee/${employee.id}`}
                      className="btn btn-info btn-sm me-2"
                      style={{
                        backgroundColor: "forestgreen",
                        color: "white",
                        borderColor: "forestgreen",
                      }}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;