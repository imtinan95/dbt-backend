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

app.listen(port, () => {
  db.connect();

  console.log(`Example app listening at http://localhost:${port}`);
});
