const express = require("express")
const router = express.Router()
const database = require("./user_database")


router.post("/login", (req, res) => {
    database.userLogin(req, res)
})



module.exports = router