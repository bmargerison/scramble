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

});