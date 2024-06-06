import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (error, result) => {
    if (error) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});

router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

//image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});
//end upload

router.post("/add_category", (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  con.query(sql, [req.body.category], (err, results) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
});

router.post("/add_employee", upload.single("image"), (req, res) => {
  const sql = `INSERT INTO employee 
  (name, surname, email, password, salary, address, category_id, date_of_birth, gender, job_title, date_of_hire, phone_number, employment_type, image) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "Error hashing password" });
    const values = [
      req.body.name,
      req.body.surname,
      req.body.email,
      hash,
      req.body.salary,
      req.body.address,
      req.body.category_id,
      req.body.date_of_birth,
      req.body.gender,
      req.body.job_title,
      req.body.date_of_hire,
      req.body.phone_number,
      req.body.employment_type,
      req.file.filename,
    ];
    con.query(sql, values, (err, result) => {
      if (err) return res.json({ Status: false, Error: err.message });
      return res.json({ Status: true });
    });
  });
});



router.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id =?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.put("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const { name, surname, email, salary, address, category_id, date_of_birth, job_title, phone_number } = req.body;
  const formattedDateOfBirth = new Date(date_of_birth).toISOString().split('T')[0];

  const sql = `
    UPDATE employee 
    SET name = ?, surname = ?, email = ?, salary = ?, address = ?, category_id = ?, date_of_birth = ?, job_title = ?, phone_number = ?
    WHERE id = ?
  `;

  const values = [
    name,
    surname,
    email,
    salary,
    address,
    category_id,
    formattedDateOfBirth,
    job_title,
    phone_number,
    id,
  ];

  con.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating employee:", err);
      return res.json({ Status: false, Error: "Query Error: " + err });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = `delete from employee where id = ?`;
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/admin_count", (req, res) => {
  const sql = "select count(id) as admin from admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employee_count", (req, res) => {
  const sql = "select count(id) as employee from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/salary_count", (req, res) => {
  const sql = "select sum(salary) as salary from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});
router.get("/admin_records", (req, res) => {
  const sql = "select* from admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

// Get all categories
router.get("/categories", (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

// Get employees by category
router.get("/categories/:category_id/employees", (req, res) => {
  const { category_id } = req.params;
  con.query(
    "SELECT * FROM employee WHERE category_id = ?",
    [category_id],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json(results);
      }
    }
  );
});

// Record attendance
router.post("/attendance", (req, res) => {
  const { employeeId, date, status } = req.body;
  con.query(
    "INSERT INTO attendance (employee_id, date, status) VALUES (?, ?, ?)",
    [employeeId, date, status],
    (error, result) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json({ id: result.insertId });
      }
    }
  );
});

router.get("/categories_with_employee_count", (req, res) => {
  const sql = `
    SELECT c.id, c.name, COUNT(e.id) as employee_count
    FROM category c
    LEFT JOIN employee e ON c.id = e.category_id
    GROUP BY c.id, c.name
  `;
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get('/department_employee_count', (req, res) => {
  const sql = `
    SELECT category.name AS department, COUNT(employee.id) AS employeeCount
    FROM employee
    JOIN category ON employee.category_id = category.id
    GROUP BY category.name
  `;
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});
router.get('/department_salary_distribution', (req, res) => {
  const sql = `
    SELECT category.name AS department, SUM(employee.salary) AS salary
    FROM employee
    JOIN category ON employee.category_id = category.id
    GROUP BY category.name
  `;
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get('/leaves', (req, res) => {
  const sql = 'SELECT l.*, e.name AS employee_name FROM leaves l JOIN employee e ON l.employee_id = e.id';
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

router.put('/leaves/:leaveId', (req, res) => {
  const { leaveId } = req.params;
  const { status } = req.body;
  const sql = 'UPDATE leaves SET status = ? WHERE id = ?';
  con.query(sql, [status, leaveId], (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

export { router as adminRouter };
