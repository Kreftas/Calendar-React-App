const express = require("express")
const router = express.Router()
const database = require("./todo_database")

router.get("/select/added/", (req, res) => {
    database.todoSelectAdded(req, res, false)
})

router.get("/select/topfive", (req, res) => {
    database.todoSelectTopFive(req, res)
})

router.get("/select/added/desc", (req, res) => {
    database.todoSelectAdded(req, res, true)
})

router.get("/select/prio", (req, res) => {
    database.todoSelectPrio(req, res, false)
})

router.get("/select/prio/desc", (req, res) => {
    database.todoSelectPrio(req, res, true)
})

router.post("/select/id", (req, res) => {
    database.todoSelectId(req, res)
})

router.post("/insert", (req, res) => {
    database.todoInsert(req, res)
})

router.post("/update", (req, res) => {
    database.todoUpdate(req, res)
})

router.post("/delete", (req, res) => {
    database.todoDelete(req, res)
})



module.exports = router