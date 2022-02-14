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

})