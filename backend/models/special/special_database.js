const pool = require("../../db");

const selectAll = (res, sql) => {
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err.message)
            res.send("ERROR")
        } else {
            res.send(result.rows);
        }
    })
}

const specialSelectAdded = (req, res, desc) => {
    const order = desc ? "DESC" : "ASC"
    const sql = 'SELECT id, description, date::VARCHAR(255), type FROM special ORDER BY id ' + order
    selectAll(res, sql)
}

const specialSelectToday = (req, res) => {
    const sql = 'SELECT id, description, date::VARCHAR(255), type FROM SPECIAL WHERE date = CURRENT_DATE'
    selectAll(res, sql)
}

const specialSelectDate = (req, res, desc) => {
    const order = desc ? "DESC" : "ASC"
    const sql = 'SELECT id, description, date::VARCHAR(255), type FROM special ORDER BY date ' + order
    selectAll(res, sql)
}

const specialSelectId = (req, res) => {
    const id = req.body.id;
    const sql = 'SELECT id, description, date::VARCHAR(255), type FROM special WHERE id = $1';
    pool.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err.message)
        } else {
            res.send(result.rows[0]);
        }
    })
}

const specialSelectMonth = (req, res) => {
    const {month} = req.body;
    const sql = 'select id, description, date::VARCHAR(255), type FROM special WHERE (SELECT EXTRACT(month FROM date) = $1);'
    pool.query(sql, [month], (err, result) => {
        if (err) {
            console.log(err.message)
        } else {
            res.send(result.rows);
        }
    })
}

const specialSelectDay = (req, res) => {
    const {month, day} = req.body;
    const sql = 'select id, description, date::VARCHAR(255), type FROM special WHERE (SELECT EXTRACT(DAY FROM date) = $1) AND (SELECT EXTRACT(month FROM date) = $2);'
    pool.query(sql, [day, month], (err, result) => {
        if (err) {
            console.log(err.message)
        } else {
            res.send(result.rows);
        }
    })
}


const specialInsert = (req, res) => {
    const { description, date, type } = req.body;
    const sql = 'INSERT INTO special (description, date, type) VALUES ($1, $2, $3);';
    pool.query(sql, [description, date, type], (err, result) => {
        if (err) {
            console.log(err.message)
        } else {
            res.send(result.rows);
        }
    })
}

const specialUpdate = (req, res) => {
    const { description, date, type, id } = req.body;
    const sql = 'UPDATE special SET description=$1, date=$2, type=$3 WHERE id = $4';
    pool.query(sql, [description, date, type, id], (err, result) => {
        if (err) {
            console.log(err.message)
        } else {
            res.send(result.rows);
        }
    })
}

const specialDelete = (req, res) => {
    const { id } = req.body;
    const sql = 'DELETE FROM special WHERE id=$1;';
    pool.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err.message)
        } else {
            console.log("Yo")
            res.send(result.rows);
        }
    })
}


module.exports = {
    specialSelectId: specialSelectId,
    specialSelectToday: specialSelectToday,
    specialSelectMonth: specialSelectMonth,
    specialSelectDay: specialSelectDay,
    specialSelectAdded: specialSelectAdded,
    specialSelectDate: specialSelectDate,
    specialInsert: specialInsert,
    specialUpdate: specialUpdate,
    specialDelete: specialDelete
};