var mysql = require("mysql");
const express = require("express");
const app = express();
const port = 61691;

const db = mysql.createConnection({
  host: "http://10.1.1.17",
  user: "pma",
  password: "",
  database: "book_selling_system",
});

app.use((res, req, next) => {
  req.locals.db = db;
  next();
});

app.get("/", (req, res) => {
  res.locals.db.query("SELECT * FROM tb_fetch", (error, rows) => {
    res.send(rows);
  });
});

app.get("/save", (req, res) => {
  res.locals.db.query(
    "INSERT INTO tb_fetch(name,email,password) VALUES ('','','')",
    (error, rows) => {
      res.send(rows);
    }
  );
});

app.get("/del", (req, res) => {
  res.locals.db.query(
    "DELETE FROM tb_fetch WHERE name='Rayyan Khan'",
    (error, rows) => {
      res.send(rows);
    }
  );
});

app.listen(port, () => {
  db.connect();

  console.log(`Example app listening at http://localhost:${port}`);
});
