import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    surname: "",
    email: "",
    salary: "",
    address: "",
    category_id: "",
    date_of_birth: "",
    job_title: "",
    phone_number: "",
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategories(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/employee/${id}`)
      .then((result) => {
        const emp = result.data.Result[0];
        setEmployee({
          name: emp.name,
          surname: emp.surname,
          email: emp.email,
          salary: emp.salary,
          address: emp.address,
          category_id: emp.category_id,
          date_of_birth: emp.date_of_birth, 
          job_title: emp.job_title,
          phone_number: emp.phone_number, 
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/auth/edit_employee/${id}`, employee)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="inputName"
              placeholder="Enter Name"
              className="form-control rounded-0"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputSurname" className="form-label">
              Surname
            </label>
            <input
              type="text"
              id="inputSurname"
              placeholder="Enter Surname"
              className="form-control rounded-0"
              value={employee.surname}
              onChange={(e) =>
                setEmployee({ ...employee, surname: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="inputEmail4"
              placeholder="Enter Email"
              className="form-control rounded-0"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              id="inputSalary"
              placeholder="Enter Salary"
              className="form-control rounded-0"
              value={employee.salary}
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              id="inputAddress"
              placeholder="1234 Main St"
              className="form-control rounded-0"
              value={employee.address}
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputDateOfBirth" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              id="inputDateOfBirth"
              className="form-control rounded-0"
              value={employee.date_of_birth}
              onChange={(e) =>
                setEmployee({ ...employee, date_of_birth: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputJobTitle" className="form-label">
              Job Title
            </label>
            <input
              type="text"
              id="inputJobTitle"
              placeholder="Enter Job Title"
              className="form-control rounded-0"
              value={employee.job_title}
              onChange={(e) =>
                setEmployee({ ...employee, job_title: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPhoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              id="inputPhoneNumber"
              placeholder="Enter Phone Number"
              className="form-control rounded-0"
              value={employee.phone_number}
              onChange={(e) =>
                setEmployee({ ...employee, phone_number: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary w-100 rounded-0 mb-2">
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
