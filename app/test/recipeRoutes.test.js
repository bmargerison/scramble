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

})