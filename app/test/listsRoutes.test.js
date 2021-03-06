const request = require('supertest');
const { db } = require('../models/list')
const List = require('../models/list')
process.env.NODE_ENV = 'test'
server = require('../bin/www');


describe("/lists", () => {
  
  afterEach(async () => {
    await db.dropDatabase()
  });

  describe("GET /", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(server).get("/lists")
      expect(response.statusCode).toBe(200)
    })
  })

  describe("GET /:id", () => {
    test("200 status code", async () => {
      const list = await request(server).post("/lists").send({ 
        _user: "000a000000000000000a0000", 
      })
      const response = await request(server).get(`/lists/${list._body._id}`)
      expect(response.statusCode).toBe(200)
    })
  })

  describe("POST /", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(server).post("/lists").send({ 
        _user: "000a000000000000000a0000", 
      })
      expect(response.statusCode).toBe(201)
    })
    test("500 status code if no user", async () => {
      const response = await request(server).post("/lists").send({ 
      })
      expect(response.statusCode).toBe(400)
    })
  })

  describe("DELETE /:id", () => {
    test("202 status code", async () => {
      const list = await request(server).post("/lists").send({ 
        _user: "000a000000000000000a0000", 
      })
      const response = await request(server).del(`/lists/${list._body._id}`)
      expect(response.statusCode).toBe(202)
    })
    test("404 status code if list doesn't exist", async () => {
      const list = await request(server).post("/lists").send({ 
        _user: "000a000000000000000a0000", 
      })
      const response = await request(server).del(`/lists/gibberish`)
      expect(response.statusCode).toBe(404)
    })
  })

  describe("PATCH /:id", () => {
    test("200 status code", async () => {
      let listId
      await request(server).post(`/lists`).send({ 
        _user: "000a000000000000000a0000", 
      }).then((res) => {
        listId = res.body._id
      })
      const response = await request(server).patch(`/lists/${listId}`).send({ 
        item: 'bread', 
      })
      expect(response.statusCode).toBe(200)
    })
  })

  describe("GET /user/:id", () => {
    test("200 status code", async () => {
      const mockingoose = require('mockingoose');
      const User = require('../models/user')
      mockingoose.User.toReturn({ 
        _id: "000a000000000000000a0000",
        username: "username",
        email: "email@email.com",
        password: "Password123?" 
      }, 'findOne');
      const user = await User.findById({ _id: "000a000000000000000a0000" })
      const list = await request(server).post("/lists").send({ 
        _user: user._id, 
      })
      const response = await request(server).get(`/lists/user/${user._id}`)
      expect(response.statusCode).toBe(200)
    })
  })
})