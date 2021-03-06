const expect = require('chai').expect;
const { db } = require('../models/recipe')
const Recipe = require('../models/recipe')
const User = require('../models/user')
process.env.NODE_ENV = 'test'
server = require('../bin/www');
const mockingoose = require('mockingoose');

describe("recipe", function() {

  afterEach(async () => {
    await db.dropDatabase()
  });

  test("errors for omitted variables", function(done) {
    const recipe = new Recipe({});
    recipe.validate(function(err) {
        expect(err.errors._user).to.exist;
        expect(err.errors.name).to.exist;
        expect(err.errors.url).to.exist;
        expect(err.errors.ingredients).to.exist;
        expect(err.errors.image).to.exist;
        expect(err.errors.source).to.exist;
        expect(err.errors.healthLabels).to.exist;
        done();
    });
  });

  test("recipe has name, user, ingredients, url, image, source, healthLabels", async function() {
    mockingoose.User.toReturn({ 
      _id: "000a000000000000000a0000",
      username: "username",
      email: "email@email.com",
      password: "Password123?",
    }, 'findOne');
    const user = await User.findById({ _id: "000a000000000000000a0000" })
    const recipe = new Recipe({
      _user: "000a000000000000000a0000",
      url: "www.recipe.com",
      name: "recipe",
      ingredients: ['1', '2', '3'],
      image: "url",
      source: "food",
      healthLabels: ['1', '2', '3'],
    });
    expect(String(recipe._user)).to.equal(String(user.id))
    expect(String(recipe.url)).to.equal("www.recipe.com")
    expect(String(recipe.name)).to.equal("recipe")
    expect(recipe.ingredients.length).to.equal(3)
  });

});