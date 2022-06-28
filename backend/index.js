const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const todo_router = require("./models/todo/todo_routes")
const special_router = require("./models/special/special_routes")
const event_router = require("./models/event/event_routes")
const user_router = require("./models/user/user_routes")

const cron = require('node-cron');
const pool = require("./db");

const PORT = 5000

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use("/api/todo/", todo_router)
app.use("/api/special/", special_router)
app.use("/api/event/", event_router)
app.use("/api/user/", user_router)
app.listen(PORT, () => {
    console.log("Server started on port ", PORT)
});


const job = cron.schedule("00 13 18 * * *", function jobYouNeedToExecute() {
    console.log("SHOULD UPDATE")
    const sql = "DELETE FROM EVENT WHERE dateend < (SELECT now() + INTERVAL '1 week ago')"
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err.message)
        } else {
            console.log("UPDATED DB")
        }
    })
});

