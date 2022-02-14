const expect = require('chai').expect;
const { db } = require('../models/user')
const User = require('../models/user')
process.env.NODE_ENV = 'test'
server = require('../bin/www');

describe("list", function() {

  afterEach(async () => {
    await db.dropDatabase()
  });

  test("should be invalid if details are empty", function(done) {
    const user = new List();

    user.validate(function(err) {
        expect(err.errors.user).to.exist;
        expect(err.errors.date).to.exist;
        expect(err.errors.items).to.exist;
        done();
    });
  });

});