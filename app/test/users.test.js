const request = require('supertest');
const mongoose = require('mongoose');

afterEach(async () => {
  await server.close();
});

beforeEach(() => {
  server = require('../bin/www');
  jest.setTimeout(30000);
});

describe("/users", () => {

  describe("GET", () => {
    console.log('')
    test("should respond with a 200 status code", async () => {
      const response = await request(server).get("/users")
      expect(response.statusCode).toBe(200)
    })
  })

  describe("POST", () => {
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

})

