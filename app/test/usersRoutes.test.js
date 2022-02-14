const request = require('supertest');
const { db } = require('../models/user')
const User = require('../models/user')
process.env.NODE_ENV = 'test'
server = require('../bin/www');

describe("/users", () => {
  
  afterEach(async () => {
    await db.dropDatabase()
  });

  describe("GET /", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(server).get("/users")
      expect(response.statusCode).toBe(200)
    })
  })

  describe("POST /login", () => {
    test("should respond with a 200 status code", async () => {
      await request(server).post("/users").send({ 
        username: "username", 
        email: "email@email.com",
        password: "Password123?" 
      })
      const response = await request(server).post("/users/login").send({ 
        email: "email@email.com",
        password: "Password123?" 
      })
      expect(response.statusCode).toBe(200)
    })
    test("404 status code if user does not exist", async () => {
      await request(server).post("/users").send({ 
        username: "username", 
        email: "email@email.com",
        password: "Password123?" 
      })
      const response = await request(server).post("/users/login").send({ 
        email: "differentemail@email.com",
        password: "Password123?" 
      })
      expect(response.statusCode).toBe(404)
    })
    test("403 status code if password incorrect", async () => {
      await request(server).post("/users").send({ 
        username: "username", 
        email: "email@email.com",
        password: "Password123?" 
      })
      const response = await request(server).post("/users/login").send({ 
        email: "email@email.com",
        password: "the wrong password" 
      })
      expect(response.statusCode).toBe(403)
    })
  })

  describe("GET /:id", () => {
    test("200 status code", async () => {
      await request(server).post("/users").send({ 
        username: "username", 
        email: "email@email.com",
        password: "Password123?" 
      })
      const savedResponse = await request(server).post("/users/login").send({ 
        email: "email@email.com",
        password: "Password123?" 
      })
      const token = savedResponse.body.token
      const user = await User.find({ "username" : "username" })
      const response = await  request(server).get(`/users/${user[0]._id}`).set('x-access-token', token)
      expect(response.statusCode).toBe(200)
    })
    test("403 status code if incorrect token", async () => {
      await request(server).post("/users").send({ 
        username: "username", 
        email: "email@email.com",
        password: "Password123?" 
      })
      const user = await User.find({ "username" : "username" })
      const response = await  request(server).get(`/users/${user[0]._id}`).set('x-access-token', 'xyz')
      expect(response.statusCode).toBe(403)
    })
    test("403 status code if no token", async () => {
      await request(server).post("/users").send({ 
        username: "username", 
        email: "email@email.com",
        password: "Password123?" 
      })
      const user = await User.find({ "username" : "username" })
      const response = await  request(server).get(`/users/${user[0]._id}`)
      expect(response.statusCode).toBe(403)
    })
  })

  describe("POST /", () => {
    test("should respond with a 201 status code", async () => {
      const response = await request(server).post("/users").send({ 
        username: "username", 
        email: "email@email.com",
        password: "Password123?" 
      })
      expect(response.statusCode).toBe(201)
    })
    test("should respond with a 400 status code if no password", async () => {
      const response = await request(server).post("/users").send({ 
        username: "username", 
        email: "email@email.com",
        password: "" 
      })
      expect(response.statusCode).toBe(400)
    })
  })

  describe("DELETE /:id", () => {
    test("should respond with a 202 status code", async () => {
      await request(server).post("/users").send({ 
        username: "username", 
        email: "email@email.com",
        password: "Password123?" 
      })
      const savedResponse = await request(server).post("/users/login").send({ 
        email: "email@email.com",
        password: "Password123?" 
      })
      const token = savedResponse.body.token
      const user = await User.find({ "username" : "username" })
      const response = await  request(server).delete(`/users/${user[0]._id}`).set('x-access-token', token)
      expect(response.statusCode).toBe(202)
    })
  })

})
