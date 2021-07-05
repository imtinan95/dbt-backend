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

//testing routes
app.get('/', (req, res) => {
  res.locals.db.query('SELECT * FROM tb_fetch', (error, rows) => {
    res.send(rows);
  });
});
app.post('/dataEntry/fetch/', (req, res) => {
  console.log(req.body);
  const { name, email, pass } = req.body;
  res.locals.db.query(
    `INSERT INTO tb_fetch(name,email,pass) VALUES ('${name}','${email.toString()}','${pass}')`,
    (error, rows) => {
      console.log(error);
      if (error) {
        console.log(Object.keys(error));
        const errNo = error;
        const message = errNo == 1062 ? 'Duplicate Data ' : 'Enter Again';
        return res.status(400).send(message);
      }
      res.status(200).send(rows);
    }
  );
});
app.post('/dataEntry/fetch/del', (req, res) => {
  res.locals.db.query(
    `DELETE FROM tb_fetch WHERE email = '${req.body.email}'`,
    (error, rows) => {
      console.log('Error:', error);
      if (error) {
        console.log(' Object.keys', Object.keys(error));
        const errNo = error;
        const message = errNo == 1062 ? 'Duplicate Data ' : 'Enter Again';
        return res.status(400).send(message);
      }
      res.status(200).send(rows);
    }
  );
});

{
  // for getting data on reports and queries

  // app.get('/query/candidate', (req, res) => {
  // });

  // app.get('/query/divisions', (req, res) => {
  //   res.locals.db.query('SELECT * FROM tb_divisions', (error, rows) => {
  //     res.send(rows);
  //   });
  // });

  // //.....






  // app.get('/save', (req, res) => {
  //   res.locals.db.query(
  //     'INSERT INTO tb_fetch(name,email,password) VALUES ("","","")',
  //     (error, rows) => {
  //       res.send(rows);
  //     }
  //   );
  // });

  // app.get('/del', (req, res) => {
  //   res.locals.db.query(
  //     'DELETE FROM tb_candidate WHERE candidateName="Sadiq"',
  //     (error, rows) => {
  //       res.send(rows);
  //     }
  //   );
  // });
}
app.listen(port, () => {
  db.connect();

  console.log(`Example app listening at http://localhost:${port}`);
});
