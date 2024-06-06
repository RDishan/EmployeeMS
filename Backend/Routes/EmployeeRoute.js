import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/employee_login", (req, res) => {
  const sql = "SELECT * from employee where email = ? ";
  con.query(sql, [req.body.email], (error, result) => {
    if (error) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if (error)
          return res.json({ loginStatus: false, Error: "Wrong Password" });
        if (response) {
          const email = result[0].email;
          const token = jwt.sign(
            { role: "employee", email: email, id: result[0].id },
            "jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json({ loginStatus: true, id: result[0].id });
        }
      });
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});

router.get("/empdashboard/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT e.*, c.name as dname
    FROM employee e
    INNER JOIN category c ON e.category_id = c.id
    WHERE e.id = ?`;
  con.query(sql, [id], (error, results) => {
    if (error) return res.json({ Status: false });
    return res.json(results);
  });
});
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

router.get("/:employeeId/attendance", (req, res) => {
  const { employeeId } = req.params;
  const { month } = req.query;

  let sql = "SELECT * FROM attendance WHERE employee_id = ?";
  let params = [employeeId];

  if (month) {
    sql += " AND MONTH(date) = ?";
    params.push(month);
  }

  con.query(sql, params, (error, results) => {
    if (error) {
      return res.status(500).json({ Status: false, Error: error.message });
    } else {
      return res.json({ Status: true, Result: results });
    }
  });
});
router.post("/:employeeId/request_leave", (req, res) => {
  const { employeeId } = req.params;
  const { leave_type, reason, start_date, end_date } = req.body;
  const sql = `INSERT INTO leave_request (employee_id, leave_type, reason, start_date, end_date)
               VALUES (?, ?, ?, ?, ?)`;
  con.query(
    sql,
    [employeeId, leave_type, reason, start_date, end_date],
    (err, result) => {
      if (err) return res.json({ Status: false, Error: err.message });
      return res.json({ Status: true, Result: result });
    }
  );
});

router.get("/:employeeId/leaves", (req, res) => {
  const { employeeId } = req.params;
  const sql = "SELECT * FROM leave_request WHERE employee_id = ?";
  con.query(sql, [employeeId], (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

export { router as EmployeeRouter };
