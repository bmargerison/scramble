const request = require('supertest');
const { db } = require('../models/recipe')
const Recipe = require('../models/recipe')
process.env.NODE_ENV = 'test'
server = require('../bin/www');


describe("/recipes", () => {
  
  afterEach(async () => {
    await db.dropDatabase()
  });

  describe("GET /", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(server).get("/recipes")
      expect(response.statusCode).toBe(200)
    })
  })

  describe("POST /", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(server).post("/recipes").send({ 
        _user: "000a000000000000000a0000",
        url: "www.recipe.com",
        name: "recipe",
        ingredients: ['1', '2', '3'],
      })
      expect(response.statusCode).toBe(201)
    })
    test("500 status code if no user", async () => {
      const response = await request(server).post("/recipes").send({ 
      })
      expect(response.statusCode).toBe(400)
    })
  })
  
})