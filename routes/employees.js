const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.locals.db.query('SELECT * FROM `tb_employee`', (error, rows) => {
        res.send(rows);
    });
})

router.post('/', (req, res) => {
    console.log(req.body);
    const { EmployeeID, EmployeeName, CNIC, DOB, Contact } = req.body;

    const query = `INSERT INTO tb_employee(EmployeeID,EmployeeName,CNIC, DOB,Contact) VALUES ('${EmployeeID}','${EmployeeName}','${CNIC}','${DOB}','${Contact}')`;

    res.locals.db.query(query, (error, rows) => {
        console.log(error);

        if (error) {
            console.log(Object.keys(error));
            const errNo = error;
            const message = errNo == 1062 ? 'Duplicate Data ' : 'Duplicate Entry, Enter Again';
            return res.status(400).send(message);
        }
        res.status(200).send(rows);
    }
    );
})

router.patch('/:EmployeeID', (req, res) => {
    const { EmployeeID, EmployeeName, CNIC, DOB, Contact } = req.body;
    const query = `UPDATE tb_employee SET Contact = '${Contact}', DOB = '${DOB}' WHERE EmployeeID ='${req.params.EmployeeID}'`;

    console.log('EmployeeID to be updated is ', req.params.EmployeeID)
    console.log('Body to be updated is ', req.body)
    res.locals.db.query(query, (error, rows) => {
        query
        console.log('Error:', error);
        if (error) {
            console.log(' Object.keys', Object.keys(error));
            const errNo = error;
            const message = errNo == 1062 ? 'Data not Found' : 'Enter Again';
            return res.status(400).send(message);
        }
        res.status(200).send(rows);
    }
    );

})

router.delete('/:EmployeeID', (req, res) => {
    const query = `DELETE FROM tb_employee WHERE EmployeeID = '${req.params.EmployeeID}'`;
    res.locals.db.query(query, (error, rows) => {
        query
        console.log('Error:', error);
        if (error) {
            console.log(Object.keys(error));
            const errNo = error;
            const message = errNo == 1062 ? 'Duplicate Data ' : 'Duplicate Entry, Enter Again';
            return res.status(400).send(message);
        }
        res.status(200).send(rows);
    }
    );
});

module.exports = router;