const expect = require('chai').expect;
const { db } = require('../models/list')
const List = require('../models/list')
const User = require('../models/user')
process.env.NODE_ENV = 'test'
server = require('../bin/www');
const mockingoose = require('mockingoose');

describe("list", function() {

  afterEach(async () => {
    await db.dropDatabase()
  });

  test("should be invalid if no user", function(done) {
    const list = new List();
    list.validate(function(err) {
        expect(err.errors._user).to.exist;
        done();
    });
  });

  test("list has user, date, password", async function() {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2021, 2, 2));
    mockingoose.User.toReturn({ 
      _id: "000a000000000000000a0000",
      username: "username",
      email: "email@email.com",
      password: "Password123?" 
    }, 'findOne');
    const user = await User.findById({ _id: "000a000000000000000a0000" })
    const list = new List({
      _user: user._id
    })
    expect(String(list._user)).to.equal(String(user.id))
    expect(list.items.length).to.equal(0)
    expect(list.name).to.equal("Grocery List")
    expect(String(list.date)).to.equal(String(new Date(+new Date())))
    jest.useRealTimers();
  });

});