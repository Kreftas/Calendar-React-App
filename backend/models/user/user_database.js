const pool = require("../../db");


const userLogin = (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT password FROM cal_user WHERE username = $1';
    pool.query(sql, [username], (err, result) => {
        if (err) {
            console.log(err.message)
            res.send({
                status: false,
                msg: "Internal server error"
            })
        } else {
            if (result.rows[0] && result.rows[0].password === password) {
                res.send({
                    status: true,
                    msg: "Logged in"
                })
            } else {
                res.send({
                    status: false,
                    msg: "Bad username or password"
                })
            }
        }
    })
}



module.exports = {
    userLogin: userLogin
};