process.env.NODE_ENV = "test"

const request = require("supertest")

const app = require("../app")
const items = require("../fakeDb")

let potato = { name: "potato", price: 2.99 }

beforeEach(() => {
    items.push(potato)
})

afterEach(() => {
    items.length = 0
})

describe("GET /items", () => {
    test("Gets all items", async () => {
        const response = await request(app).get("/items")
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({ items: [potato] })
    })
})

describe("POST /items", () => {
    test("Creating a valid item", async () => {
        const newItem = { name: "apple", price: 3.99 }
        const response = await request(app).post("/items").send(newItem)
        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual({ added: { name: newItem.name, price: newItem.price } })
    })

    test("Creating a duplicate item", async () => {
        const newItem = potato
        const response = await request(app).post("/items").send(newItem)
        expect(response.statusCode).toBe(403)
        expect(response.body).toEqual({ error: "item in list" })
    })

    test("Creating a bad item", async () => {
        const newItem = {}
        const response = await request(app).post("/items").send(newItem)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({ error: "Invalid user input" })
    })
})

describe("GET /items/:name", () => {
    test("Successfully gets item", async () => {
        const response = await request(app).get("/items/potato")
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({ name: potato.name, price: potato.price })
    })

    test("Gets item that is not in db", async () => {
        const response = await request(app).get("/items/nothere")
        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({ error: "item not found" })
    })
})

describe("PATCH /items/:name", () => {
    test("Updates item info", async () => {
        const response = await request(app).patch("/items/potato")
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({ updated: { name: potato.name, price: potato.price } })
    })

    // test("Updates item not found in db", async () => {
    //     // TODO

    // })
})

// describe("DELETE /items/:name", () => {
//     test("", async () => {
//         const response = await request(app).delete()
//         expect(response.statusCode).toBe()
//         expect(response.body).toEqual()
//     })
// })