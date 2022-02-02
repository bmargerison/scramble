const request = require('supertest');
const  app = require('../bin/www');

afterEach(async (done) => {
  await mongoose.connection.db.dropDatabase()
  done()
})

describe("GET /users", () => {

  describe("when passed a username and password", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/users")
      expect(response.statusCode).toBe(200)
    })
  })

})

