const pool = require("../../db");

const todoSelectAll = (res, sql) => {
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err.message)
            res.send("ERROR")
        } else {
            res.send(result.rows);
        }
    })
}

const todoSelectAdded = (req, res, desc) => {
    const order = desc ? "DESC" : "ASC"
    const sql = 'SELECT * FROM todo ORDER BY id ' + order
    todoSelectAll(res, sql)
}

const todoSelectTopFive = (req, res) => {
    const sql = 'SELECT * FROM todo ORDER BY prio LIMIT 5'
    todoSelectAll(res, sql)
}


const todoSelectPrio = (req, res, desc) => {
    const order = desc ? "DESC" : "ASC"
    const sql = 'SELECT * FROM todo ORDER BY prio ' + order
    todoSelectAll(res, sql)
}

const todoSelectId = (req, res) => {
    const id = req.body.id;
    const sql = 'SELECT * FROM todo WHERE id = $1';
    pool.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err.message)
        } else {
            res.send(result.rows[0]);
        }
    })
}

const todoInsert = (req, res) => {
    const { description, prio } = req.body;
    const sql = 'INSERT INTO todo (description, prio) VALUES ($1, $2);';
    pool.query(sql, [description, prio], (err, result) => {
        if (err) {
            console.log(err.message)
        } else {
            res.send(result.rows);
        }
    })
}

const todoUpdate = (req, res) => {
    const { description, prio, id } = req.body;
    const sql = 'UPDATE todo SET description=$1, prio=$2 WHERE id = $3';
    pool.query(sql, [description, prio, id], (err, result) => {
        if (err) {
            console.log(err.message)
        } else {
            res.send(result.rows);
        }
    })
}

const todoDelete = (req, res) => {
    const { id } = req.body;
    const sql = 'DELETE FROM todo WHERE id=$1;';
    pool.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err.message)
        } else {
            res.send(result.rows);
        }
    })
}


module.exports = {
    todoSelectId: todoSelectId,
    todoSelectTopFive: todoSelectTopFive,
    todoSelectAdded: todoSelectAdded,
    todoSelectPrio: todoSelectPrio,
    todoInsert: todoInsert,
    todoUpdate: todoUpdate,
    todoDelete: todoDelete
};