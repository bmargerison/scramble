const request = require('supertest');
const { db } = require('../models/item')
const Item = require('../models/item')
process.env.NODE_ENV = 'test'
server = require('../bin/www');

describe("/items", () => {
  
  afterEach(async () => {
    await db.dropDatabase()
  });

  describe("GET /", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(server).get("/items")
      expect(response.statusCode).toBe(200)
    });
  });

  describe("POST /", () => {
    test("should respond with a 201 status code", async () => {
      const response = await request(server).post("/items").send({
        name: "Margerine", 
        _user: "000a000000000000000a0000",
        _list: "010a000000000000000a0000",
        type: "Dairy",
      })
      console.log(response)
      expect(response.statusCode).toBe(201)
    })
    test("500 status code if no user", async () => {
      const response = await request(server).post("/items").send({ 
      })
      expect(response.statusCode).toBe(400)
    })
  })

  describe("GET /user/:id", () => {
    test("200 status code", async () => {
      const item = await request(server).post("/items").send({
        name: "Margerine", 
        _user: "000a000000000000000a0000",
        _list: "000a000000000000000a0000",
        type: "Dairy"
      })
      const response = await request(server).get(`/items/user/"000a000000000000000a0000"`)
      expect(response.statusCode).toBe(200)
    })
  })

});