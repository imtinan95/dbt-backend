const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.locals.db.query('SELECT * FROM `tb_position`', (error, rows) => {
        res.send(rows);
    });
})

router.post('/', (req, res) => {
    console.log(req.body);
    const { PosID, PositionName, Desgination, Pay, PostingCity } = req.body;

    const query = `INSERT INTO tb_position(PosID,PositionName,Desgination, Pay,PostingCity) VALUES ('${PosID.toString()}','${PositionName.toString()}','${Desgination.toString()}','${Pay.toString()}','${PostingCity.toString()}')`;

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

router.patch('/:PosID', (req, res) => {
    const { PosID, PositionName, Desgination, Pay, PostingCity } = req.body;
    const query = `UPDATE tb_position SET Pay = '${Pay}', PostingCity = '${PostingCity}' WHERE PosID ='${req.params.PosID}'`;

    console.log('PosID to be updated is ', req.params.PosID)
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

router.delete('/:PosID', (req, res) => {
    const query = `DELETE FROM tb_position WHERE PosID = '${req.params.PosID}'`;
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