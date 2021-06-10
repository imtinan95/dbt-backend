var mysql = require("mysql");
const express = require("express");
const app = express();
const port = 61691;

const db = mysql.createConnection({
  host: "localhost",
  user: "IronMan",
  password: "",
  database: "testDB",
});

var username = " Makta ";
app.use((res, req, next) => {
  req.locals.db = db;
  next();
});

app.get("/", (req, res) => {
  res.locals.db.query("SELECT * FROM candidates", (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.get("/save", (req, res) => {
  res.locals.db.query(
    "INSERT INTO candidates(cnic,name,contact,dob,degree,roll) VALUES (321,'" +
      username +
      "',030351,'sept','cs',4021)",
    (error, rows) => {
      if (error) throw error;
      res.send(rows);
    }
  );
});

app.get("/del", (req, res) => {
  res.locals.db.query(
    "DELETE FROM candidates WHERE name='sheeda'",
    (error, rows) => {
      if (error) throw error;
      res.send(rows);
    }
  );
});

app.listen(port, () => {
  db.connect();

  console.log(`Example app listening at http://localhost:${port}`);
});
