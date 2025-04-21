const express = require('express')
const cors = require ('cors')
const logger = require('morgan')
// const mongoose = require("mongoose")

require('dotenv').config()

const userRouter = require("./routers/UserRouter")
const cardRouter = require("./routers/CardRouter")
const transactionRouter = require("./routers/TransactionRouter")

const app = express()
app.use(cors())
app.use(express.json())
app.use(logger('dev'))


app.get('/', (req, res) => {
    res.json({
        name: "FinanceAtFreddys", 
        description: "FinanceAtFreddys. Save some dosh."
    })
})

app.use("/users", userRouter)
app.use("/cards", cardRouter)
app.use("/transactions", transactionRouter)


module.exports = app;