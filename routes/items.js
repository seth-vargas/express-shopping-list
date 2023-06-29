const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const items = require("../fakeDb")

/* returns json for items in fakeDb */

router.get("/", (req, res) => {
    res.json({ items: items })
})

/* creates new item in fakeDb and returns json of newItem from request body.  */

router.post("/", (req, res) => {

    if (!req.body.name || !req.body.price) {
        throw new ExpressError("Invalid user input", 400)
    }
    const newItem = {
        name: req.body.name,
        price: req.body.price
    }
    const foundItem = items.find(item => item.name === newItem.name)
    if (foundItem !== undefined) {
        throw new ExpressError("item in list", 403)
    }
    items.push(newItem)
    res.status(201).json({ added: { name: newItem.name, price: newItem.price } })
})

/* returns json for a specific item */

router.get("/:name", (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
        throw new ExpressError("item not found", 404)
    }
    res.json({ name: foundItem.name, price: foundItem.price })
})

/* updates item in fakeDb and returns json of updated item */

router.patch("/:name", (req, res) => {
    try {
        const foundItem = items.find(item => item.name === req.params.name)
        if (foundItem === undefined) {
            throw new ExpressError("item not found", 404)
        }
        if (res.body.name) {
            foundItem.name = res.body.name
        }
        if (res.body.price) {
            foundItem.price = res.body.price
        }
        res.json({ updated: { "name": foundItem.name, "price": foundItem.price } })
    } catch (error) {
        console.log(error)
    }
})

/* removes item from fakeDb and returns  */

router.delete("/:name", (req, res) => {
    const foundItemIndex = items.findIndex(item => item.name === req.params.name)
    if (foundItemIndex === -1) {
        throw new ExpressError("item not found", 404)
    }
    items.splice(foundItemIndex, 1)
    res.json({ message: "Deleted" })
})

module.exports = router