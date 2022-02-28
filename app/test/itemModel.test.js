const expect = require('chai').expect;
const { db } = require('../models/list')
const Item = require('../models/item')
const User = require('../models/user')
process.env.NODE_ENV = 'test'
server = require('../bin/www');
const mockingoose = require('mockingoose');

describe("list", function() {

  afterEach(async () => {
    await db.dropDatabase()
  });

  test("should be invalid if no user", function(done) {
    const item = new Item();
    list.validate(function(err) {
        expect(err.errors._user).to.exist;
        done();
    });
  });

  test("should be invalid if no tyype", function(done) {
    const item = new Item();
    list.validate(function(err) {
        expect(err.errors.type).to.exist;
        done();
    });
  });

  test("item has type, user", async function() {
    mockingoose.User.toReturn({ 
      _id: "000a000000000000000a0000",
      username: "username",
      email: "email@email.com",
      password: "Password123?" 
    }, 'findOne');
    const user = await User.findById({ _id: "000a000000000000000a0000" })
    const item = new Item({
      _user: user._id,
      type: "dairy"
    })
    expect(String(list._user)).to.equal(String(user.id))
    expect(String(list.type)).to.equal("dairy")
  });

});