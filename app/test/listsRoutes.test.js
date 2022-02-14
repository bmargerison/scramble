const request = require('supertest');
const { db } = require('../models/list')
const List = require('../models/list')
const User = require('../models/user')
process.env.NODE_ENV = 'test'
server = require('../bin/www');
const mockingoose = require('mockingoose');

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

  describe("POST /login", () => {
    test("should respond with a 200 status code", async () => {
      mockingoose.User.toReturn({ 
        _id: "000a000000000000000a0000",
        username: "username",
        email: "email@email.com",
        password: "Password123?" 
      }, 'findOne');
      const user = await User.findById({ _id: "000a000000000000000a0000" })
      const response = await request(server).post("/lists").send({ 
        user: user._id, 
      })
      expect(response.statusCode).toBe(200)
    })
  })

})