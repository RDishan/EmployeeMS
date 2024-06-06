import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    date_of_birth: "",
    gender: "",
    job_title: "",
    date_of_hire: "",
    phone_number: "+94", // Hardcoded area code
    employment_type: "",
    image: null,
  });

  const navigate = useNavigate();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in employee) {
      formData.append(key, employee[key]);
    }

    if (!employee.category_id) {
      alert("Please select a category");
      return;
    }

    axios
      .post("http://localhost:3001/auth/add_employee", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((error) => {
        console.error("There was an error adding the employee:", error);
        alert(error.message || error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label fs-5">
              Name
            </label>
            <input
              type="text"
              id="inputName"
              placeholder="Enter Name"
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputSurname" className="form-label fs-5">
              Surname
            </label>
            <input
              type="text"
              id="inputSurname"
              placeholder="Enter Surname"
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, surname: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label fs-5">
              Email
            </label>
            <input
              type="email"
              id="inputEmail4"
              placeholder="Enter Email"
              className="form-control rounded-0"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword4" className="form-label fs-5">
              Password
            </label>
            <input
              type="password"
              id="inputPassword4"
              placeholder="Enter Password"
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputSalary" className="form-label fs-5">
              Salary
            </label>
            <input
              type="text"
              id="inputSalary"
              placeholder="Enter Salary"
              className="form-control rounded-0"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label fs-5">
              Address
            </label>
            <input
              type="text"
              id="inputAddress"
              placeholder="1234 Main St"
              className="form-control rounded-0"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label fs-5">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="form-select rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {category.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputDateOfBirth" className="form-label fs-5">
              Date of Birth
            </label>
            <input
              type="date"
              id="inputDateOfBirth"
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, date_of_birth: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputGender" className="form-label fs-5">
              Gender
            </label>
            <select
              id="inputGender"
              className="form-select rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputJobTitle" className="form-label fs-5">
              Job Title
            </label>
            <input
              type="text"
              id="inputJobTitle"
              placeholder="Enter Job Title"
              className="form-control rounded-0"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, job_title: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputDateOfHire" className="form-label fs-5">
              Date of Hire
            </label>
            <input
              type="date"
              id="inputDateOfHire"
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, date_of_hire: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPhoneNumber" className="form-label fs-5">
              Phone Number
            </label>
            <input
              type="text"
              id="inputPhoneNumber"
              placeholder="Enter Phone Number"
              className="form-control rounded-0"
              autoComplete="off"
              value={employee.phone_number}
              onChange={(e) =>
                setEmployee({ ...employee, phone_number: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="employmentType" className="form-label fs-5">
              Employment Type
            </label>
            <select
              id="employmentType"
              className="form-select rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, employment_type: e.target.value })
              }
            >
              <option value="">Select Employment Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
            </select>
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="inputGroupFile01" className="form-label fs-5">
              Select Image
            </label>
            <input
              type="file"
              id="inputGroupFile01"
              name="image"
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, image: e.target.files[0] })
              }
            />
          </div>
          <div className="col-12">
            <button className="btn btn-success btn-primary w-100 rounded-0 mb-2 fs-5">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
