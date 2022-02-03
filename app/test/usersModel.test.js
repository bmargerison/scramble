const expect = require('chai').expect;
const User = require('../models/user')

describe("user", function() {

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
    done()
  });

});
