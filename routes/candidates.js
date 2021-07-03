const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.locals.db.query('SELECT * FROM tb_candidate', (error, rows) => {
        res.send(rows);
    });
})

router.post('/', (req, res) => {
    console.log(req.body);
    const { RollNo, CandidateName, CNIC, DOB, Contact, Degree } = req.body;
    const query = `INSERT INTO tb_candidate(RollNo,CandidateName,CNIC,DOB, Contact, Degree) VALUES ('${RollNo}','${CandidateName}','${CNIC}','${DOB}','${Contact}','${Degree}')`;
    console.log("query is ", query)

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

router.patch('/:RollNo', (req, res) => {
    const { RollNo, CandidateName, CNIC, DOB, Contact, Degree } = req.body;
    const query = `UPDATE tb_candidate SET CandidateName = '${CandidateName}', DOB= '${DOB}', Contact = '${Contact}', Degree = '${Degree}' WHERE RollNo ='${req.params.RollNo}'`;

    console.log('RollNo to be updated is ', req.params.RollNo)
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

router.delete('/:RollNo', (req, res) => {
    const query = `DELETE FROM tb_candidate WHERE RollNo = '${req.params.RollNo}'`;
    console.log('RollNo to be deleted is ', req.params.RollNo)
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

module.exports = router;