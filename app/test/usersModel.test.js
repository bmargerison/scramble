const expect = require('chai').expect;
const { db } = require('../models/user')
const User = require('../models/user')
process.env.NODE_ENV = 'test'
server = require('../bin/www');

describe("user", function() {

  afterEach(async () => {
    await db.dropDatabase()
  });

  test("should be invalid if details are empty", function(done) {
    const user = new User();

    user.validate(function(err) {
        expect(err.errors.username).to.exist;
        expect(err.errors.email).to.exist;
        expect(err.errors.password).to.exist;
        done();
    });
  });

  test("user has username, email, password", function(done) {
      const user = new User({
        username: "username", 
        email: "email",
        password: "password"
      })
    expect(user.username).to.equal("username")
    expect(user.email).to.equal("email")
    expect(user.password).to.equal("password")
    done();
  });

});
