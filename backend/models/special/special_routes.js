const express = require("express")
const router = express.Router()
const database = require("./special_database")

router.get("/select/added/", (req, res) => {
    database.specialSelectAdded(req, res, false)
})

router.get("/select/added/desc", (req, res) => {
    database.specialSelectAdded(req, res, true)
})

router.get("/select/date/", (req, res) => {
    database.specialSelectDate(req, res, false)
})

router.get("/select/today/", (req, res) => {
    database.specialSelectToday(req, res)
})

router.get("/select/date/desc", (req, res) => {
    database.specialSelectDate(req, res, true)
})

router.post("/select/id", (req, res) => {
    database.specialSelectId(req, res)
})

router.post("/select/month/", (req, res) => {
    database.specialSelectMonth(req, res)
})

router.post("/select/day/", (req, res) => {
    database.specialSelectDay(req, res)
})

router.post("/insert", (req, res) => {
    database.specialInsert(req, res)
})

router.post("/insert/time", (req, res) => {
    database.specialInsertTime(req, res)
})

router.post("/update", (req, res) => {
    database.specialUpdate(req, res)
})

router.post("/delete", (req, res) => {
    database.specialDelete(req, res)
}) 



module.exports = router