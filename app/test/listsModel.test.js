const expect = require('chai').expect;
const { db } = require('../models/list')
const List = require('../models/list')
const User = require('../models/user')
process.env.NODE_ENV = 'test'
server = require('../bin/www');

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

  test("list has user, date, password", function(done) {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2021, 2, 2));
    const user = new User({
      username: "username", 
      email: "email",
      password: "password"
    })
    const list = new List({
      _user: user.id
    })
    expect(String(list._user)).to.equal(String(user.id))
    expect(list.items.length).to.equal(0)
    expect(String(list.date)).to.equal(String(new Date(+new Date())))
    jest.useRealTimers();
    done();
  });

});