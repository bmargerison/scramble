const expect = require('chai').expect;
const { db } = require('../models/item')
const Item = require('../models/item')
const User = require('../models/user')
process.env.NODE_ENV = 'test'
server = require('../bin/www');
const mockingoose = require('mockingoose');

describe("item", function() {

  afterEach(async () => {
    await db.dropDatabase()
  });

  test("should be invalid if no user", function(done) {
    const item = new Item({
      name: "Diary",
      _list: "000a000000000000000a0000"
    });
    item.validate(function(err) {
        expect(err.errors._user).to.exist;
        done();
    });
  });

  test("should be invalid if no name", function(done) {
    const item = new Item({
      _user: "000a000000000000000a0000",
      _list: "000a000000000000000a0000",
    });
    item.validate(function(err) {
        expect(err.errors.name).to.exist;
        done();
    });
  });

  test("should be invalid if no list", function(done) {
    const item = new Item({
      name: "Diary",
      _user: "000a000000000000000a0000",
    });
    item.validate(function(err) {
        expect(err.errors._list).to.exist;
        done();
    });
  });

  test("item has type, user, list", async function() {
    mockingoose.User.toReturn({ 
      _id: "000a000000000000000a0000",
      username: "username",
      email: "email@email.com",
      password: "Password123?" 
    }, 'findOne');
    const user = await User.findById({ _id: "000a000000000000000a0000" })
    const item = new Item({
      _user: user._id,
      type: "dairy",
      _list: "000a000000000000000a0000"
    })
    expect(String(item._user)).to.equal(String(user.id))
    expect(String(item.type)).to.equal("dairy")
    expect(String(item.list)).to.equal("000a000000000000000a0000")
  });

});