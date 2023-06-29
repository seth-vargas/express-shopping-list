const express = require("express")
const app = express()
const itemsRoutes = require("./routes/items")
const ExpressError = require("./expressError")

app.use(express.json())
app.use("/items", itemsRoutes)

app.use((req, res, next) => {
    return new ExpressError("Not found", 404)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.json({ error: error.message })
})

module.exports = app