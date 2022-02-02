const request = require('supertest');
const { db } = require('../models/user');
const User = require('../models/user')

describe("/users", () => {

  beforeEach(() => {
    server = require('../bin/www');
    jest.setTimeout(30000);
  });
  
  afterEach(async () => {
    await db.dropDatabase()
  });

  describe("/ GET", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(server).get("/users")
      expect(response.statusCode).toBe(200)
    })
  })

  describe("/:id GET", () => {
    test("should respond with a 200 status code", async () => {
      await request(server).post("/users").send({ 
        username: "username", 
        email: "email",
        password: "password" 
      })
      const user = await User.find({ "username" : "username" })
      const response = await  request(server).get(`/users/${user[0]._id}`)
      expect(response.statusCode).toBe(200)
    })
    test("should respond with a 500 status code", async () => {
      const response = await request(server).get("/users/1")
      expect(response.statusCode).toBe(500)
    })
  })

  describe("/ POST", () => {
    test("should respond with a 201 status code", async () => {
      const response = await request(server).post("/users").send({ 
        username: "username", 
        email: "email",
        password: "password" 
      })
      expect(response.statusCode).toBe(201)
    })
    test("should respond with a 400 status code if no password", async () => {
      const response = await request(server).post("/users").send({ 
        username: "username", 
        email: "email"
      })
      expect(response.statusCode).toBe(400)
    })
  })

  describe("/:id DELETE", () => {
    test("should respond with a 202 status code", async () => {
      await request(server).post("/users").send({ 
        username: "username", 
        email: "email",
        password: "password" 
      })
      const user = await User.find({ "username" : "username" })
      const response = await  request(server).delete(`/users/${user[0]._id}`)
      expect(response.statusCode).toBe(202)
    })
  })

})
