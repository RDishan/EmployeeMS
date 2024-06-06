import React from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";


const EmpDashboard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const handleLogout = () => {
        axios
          .get("http://localhost:3001/employee/logout")
          .then((result) => {
            if (result.data.Status) {
              localStorage.removeItem("valid");
              navigate("/");
            }
          })
          .catch((error) => console.log(error));
      };
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
      <div className="col-auto col-md-2 px-sm-2 px-0" style={{ backgroundColor: '#18450D' }}>
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to=""
              className="d-flex align-items-center pb-3 mb-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-border d-none d-sm-inline">
                AttendEase
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to=""
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={`/empdashboard/${id}/attendance`}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Attendance
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={`/empdashboard/${id}/leave`}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Leaves</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={`/empdashboard/${id}/leavestatus`}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Leave status</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Log Out</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
        <div className="p-2 d-flex justify-content-center shadow" style={{ backgroundColor: '#18450D' }}>
            <h2 className="text-white">Employee Management System</h2>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmpDashboard;
