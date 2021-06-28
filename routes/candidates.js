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
    const query = `INSERT INTO tb_candidate(RollNo,CandidateName,CNIC,DOB, Contact, Degree) VALUES ('${RollNo}','${CandidateName.toString()}','${CNIC}','${DOB.toString()}','${Contact.toString()}','${Degree.toString()}')`;
    res.locals.db.query(query, (error, rows) => {
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
})


router.delete('/:RollNo', (req, res) => {
    res.locals.db.query(
        `DELETE FROM tb_candidate WHERE RollNo = '${req.params.RollNo}'`,
        (error, rows) => {
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
});

module.exports = router;