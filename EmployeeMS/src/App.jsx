import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Employee from "./Components/Employee";
import Category from "./Components/Category";
import AddCategory from "./Components/AddCategory";
import AddEmployee from "./Components/AddEmployee";
import EditEmployee from "./Components/EditEmployee";
import Start from "./Components/Start";
import EmployeeLogin from "./Components/EmployeeLogin";
import PrivateRoute from "./Components/PrivateRoute";
import EmpDetail from "./Components/EmpDetail";
import EmpDashboard from "./Components/EmpDashboard";
import EmpAttendance from "./Components/EmpAttendance";
import EmpLeaves from "./Components/EmpLeaves";
import Attendance from "./Components/Attendance";
import Leaves from "./Components/Leaves";
import EmpLeaveStatus from "./Components/EmpLeaveStatus";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/employee_login" element={<EmployeeLogin />}></Route>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="" element={<Home />}></Route>
          <Route path="employee" element={<Employee />}></Route>
          <Route path="category" element={<Category />}></Route>
          <Route path="attendance" element={<Attendance />}></Route>
          <Route path="leaves" element={<Leaves />}></Route>
          <Route
            path="/dashboard/add_category"
            element={<AddCategory />}
          ></Route>
          <Route
            path="/dashboard/add_employee"
            element={<AddEmployee />}
          ></Route>
          <Route
            path="/dashboard/edit_employee/:id"
            element={<EditEmployee />}
          ></Route>
        </Route>
        <Route path="/empdashboard/:id" element={<EmpDashboard />}>
          <Route path="" element={<EmpDetail />}></Route>
          <Route path="/empdashboard/:id/attendance" element={<EmpAttendance />}></Route>
          <Route path="/empdashboard/:id/leave" element={<EmpLeaves />}></Route>
          <Route path="/empdashboard/:id/leavestatus" element={<EmpLeaveStatus />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
