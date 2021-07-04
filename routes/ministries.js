const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.locals.db.query('SELECT * FROM `tb_ministry`', (error, rows) => {
        res.send(rows);
    });
})

router.post('/', (req, res) => {
    console.log(req.body);
    const { MinistryID, MinistryName, MinistryDivisions, MinistryHQ, MinisterResponsible } = req.body;

    const query = `INSERT INTO tb_ministry(MinistryID,MinistryName,MinistryDivisions, MinistryHQ,MinisterResponsible) VALUES ('${MinistryID.toString()}','${MinistryName.toString()}','${MinistryDivisions.toString()}','${MinistryHQ.toString()}','${MinisterResponsible.toString()}')`;

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

router.patch('/:MinistryID', (req, res) => {
    const { MinistryID, MinistryName, MinistryDivisions, MinistryHQ, MinisterResponsible } = req.body;
    const query = `UPDATE tb_ministry SET MinistryDivisions = '${MinistryDivisions}', MinisterResponsible= '${MinisterResponsible}' WHERE MinistryID ='${req.params.MinistryID}'`;

    console.log('MinistryID to be updated is ', req.params.MinistryID)
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

router.delete('/:MinistryID', (req, res) => {
    const query = `DELETE FROM tb_ministry WHERE MinistryID = '${req.params.MinistryID}'`;
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
});

module.exports = router;