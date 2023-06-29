# Express Shopping List
## Instructions
For this exercise we will be building a simple JSON API application where we will store a shopping list. You should use an array to store your items in the shopping list.

Each item should be a JavaScript object with the keys of name, and price.

Remember that since you are using an array for storage, this will be cleared each time the server restarts. Create a simple file called fakeDb.js which contains the following:
```
global.items = []

module.exports = items
```
Use this list of items in your routes and test files.

Your application should have the following routes:

* GET /items - this should render a list of shopping items.  
Here is what a response looks like:  
[{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]

* POST /items - this route should accept JSON data and add it to the shopping list.  
Here is what a sample request/response looks like:  
{“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}

* GET /items/:name - this route should display a single item’s name and price.  
Here is what a sample response looks like:  
{“name”: “popsicle”, “price”: 1.45}

* PATCH /items/:name, this route should modify a single item’s name and/or price.  
Here is what a sample request/response looks like:  
{“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}

* DELETE /items/:name - this route should allow you to delete a specific item from the array.  
Here is what a sample response looks like:  
{message: “Deleted”}

**Please make use of the Express Router.**

## Todos
- [x] GET /items - this should render a list of shopping items.
- [x] POST /items - this route should accept JSON data and add it to the shopping list.
- [x] GET /items/:name - this route should display a single item’s name and price.
- [x] PATCH /items/:name, this route should modify a single item’s name and/or price.
- [x] DELETE /items/:name - this route should allow you to delete a specific item from the array.
- [x] Error handling for all routes
- [ ] Write tests for routes
