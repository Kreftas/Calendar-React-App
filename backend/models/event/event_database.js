const pool = require("../../db");
const eventSelects = ' id, description, datestart::VARCHAR(255), timestart::VARCHAR(255), timeend::VARCHAR(255), color '

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


const eventSelectTopThree = (req, res) => {
    const sql = 'SELECT id, description, datestart::VARCHAR(255), timestart::VARCHAR(255), timeend::VARCHAR(255), color FROM  event WHERE datestart > now() ORDER BY datestart, timestart LIMIT 3'
    selectAll(res, sql)
}

const eventSelectDate = (req, res, desc) => {
    const order = desc ? "DESC" : "ASC"
    const sql = 'SELECT' + eventSelects + 'FROM  event ORDER BY datestart, timestart '
    selectAll(res, sql)
}

const eventSelectMonth = (req, res) => {
    const { month, year } = req.body;
    const sql = 'SELECT' + eventSelects + 'FROM  event WHERE (SELECT EXTRACT(month FROM datestart) = $1) and (SELECT EXTRACT(year FROM datestart) = $2);'
    pool.query(sql, [month, year], (err, result) => {
        if (err) {
            console.log(err.message)
        } else {
            res.send(result.rows);
        }
    })
}

const eventSelectDay = (req, res) => {
    const { month, year, day } = req.body;
    const sql = 'SELECT' + eventSelects + 'FROM  event WHERE (SELECT EXTRACT(day FROM datestart) = $1) and (SELECT EXTRACT(month FROM datestart) = $2) and (SELECT EXTRACT(year FROM datestart) = $3);'
    pool.query(sql, [day, month, year], (err, result) => {
        if (err) {
            console.log(err.message)
        } else {
            res.send(result.rows);
        }
    })
}




const eventInsertTime = (req, res) => {
    console.log("INSERT EVENT")
    const { description, datestart, timestart, timeend, color } = req.body;
    const sql = 'INSERT INTO event (description, datestart, timestart, timeend, color) VALUES ($1, $2, $3, $4, $5)';
    pool.query(sql, [description, datestart, timestart, timeend, color], (err, result) => {
        if (err) {
            console.log("ERROR")
            console.log(err.message)
        } else {
            res.send(result.rows);
        }
    })
}

const eventUpdate = (req, res) => {
    const { description, datestart, timeend, timestart, id, color } = req.body;
    const sql = 'UPDATE event SET description=$1, datestart=$2, timestart=$3, timeend=$4, color=$5 WHERE id = $6';
    pool.query(sql, [description, datestart, timestart, timeend, color, id], (err, result) => {
        if (err) {
            console.log(err.message)
        } else {
            res.send(result.rows);
        }
    })
}

const eventDelete = (req, res) => {
    const { id } = req.body;
    const sql = 'DELETE FROM event WHERE id=$1;';
    pool.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err.message)
        } else {
            res.send(result.rows);
        }
    })
}


module.exports = {
    eventSelectTopThree: eventSelectTopThree,
    eventSelectMonth: eventSelectMonth,
    eventInsertTime: eventInsertTime,
    eventSelectDay: eventSelectDay,
    eventSelectDate: eventSelectDate,
    eventUpdate: eventUpdate,
    eventDelete: eventDelete
};