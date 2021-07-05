var mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 61691;

const candidatesRoute = require('./routes/candidates')
const divisionsRoute = require('./routes/divisions')
const positionsRoute = require('./routes/positions')
const employeesRoute = require('./routes/employees')
const ministriesRoute = require('./routes/ministries')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testDB',
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((res, req, next) => {
  req.locals.db = db;
  next();
});

app.use('/candidates/', candidatesRoute)
app.use('/divisions/', divisionsRoute)
app.use('/positions/', positionsRoute)
app.use('/positions/', positionsRoute)
app.use('/employees/', employeesRoute)
app.use('/ministries/', ministriesRoute)

app.listen(port, () => {
  db.connect();

  console.log(`Example app listening at http://localhost:${port}`);
});
