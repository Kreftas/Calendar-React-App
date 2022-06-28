const express = require("express")
const router = express.Router()
const database = require("./event_database")


router.get("/select/topthree/", (req, res) => {
    database.eventSelectTopThree(req, res)
})

router.get("/select/date/", (req, res) => {
    database.eventSelectDate(req, res, false)
})

router.post("/select/month", (req, res) => {
    database.eventSelectMonth(req, res)
})

router.post("/select/day", (req, res) => {
    database.eventSelectDay(req, res)
})


router.post("/insert/time", (req, res) => {
    database.eventInsertTime(req, res)
})


router.post("/update", (req, res) => {
    database.eventUpdate(req, res)
})

router.post("/delete", (req, res) => {
    database.eventDelete(req, res)
}) 



module.exports = router