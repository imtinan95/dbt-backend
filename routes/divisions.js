const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.locals.db.query('SELECT * FROM `tb_division`', (error, rows) => {
        res.send(rows);
    });
})

router.post('/', (req, res) => {
    console.log(req.body);
    const { DivisionID, DivisionName, Contact, DivisionManager, ParentMinistry, MinistryID } = req.body;

    const query = `INSERT INTO tb_division(DivisionID,DivisionName,Contact, DivisionManager,ParentMinistry, MinistryID) VALUES ('${DivisionID.toString()}','${DivisionName.toString()}','${Contact.toString()}','${DivisionManager.toString()}','${ParentMinistry.toString()}','${MinistryID.toString()}')`;

    res.locals.db.query(query, (error, rows) => {
        console.log(error);

        if (error) {
            console.log(Object.keys(error));
            const errNo = error;
            const message = errNo == 1062 ? 'Duplicate Data ' : 'Duplicate Entry, Enter Again';
            return res.status(400).send(message);
        }
    }
    );
})

router.delete('/:DivisionID', (req, res) => {
    const query = `DELETE FROM tb_division WHERE DivisionID = '${req.params.DivisionID}'`;
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