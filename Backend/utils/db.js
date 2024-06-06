import mysql from "mysql2";

const con = mysql.createConnection({
  host: "127.0.0.1",
  database: "employeems",
  user: "root",
  password: "dishansql",
});

con.connect(function (error) {
  if (error) {
    console.log("connection error", error);
  } else {
    console.log("connected");
  }
});

export default con;

