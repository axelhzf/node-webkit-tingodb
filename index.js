var assert = require('assert');
var Promise = require("bluebird");

require("tungus");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var consoleSchema = Schema({
  name: String,
  manufacturer: String,
  released: Date
});
var Console = mongoose.model('Console', consoleSchema);

var gameSchema = Schema({
  name: String,
  developer: String,
  released: Date,
  consoles: [{type: Schema.Types.ObjectId, ref: 'Console'}]
});
var Game = mongoose.model('Game', gameSchema);


mongoose.connect('tingodb://' + __dirname + '/db', function (err) {
  // if we failed to connect, abort
  if (err) throw err;

  // we connected ok
  createData(function (err) {
    console.err(err);
  });
});

function createData(done) {
  Console.create({
    name: 'Nintendo 64'
    , manufacturer: 'Nintendo'
    , released: 'September 29, 1996'
  }, function (err, nintendo64) {
    if (err) return done(err);

    Game.create({
      name: 'Legend of Zelda: Ocarina of Time'
      , developer: 'Nintendo'
      , released: new Date('November 21, 1998')
      , consoles: [nintendo64]
    }, function (err) {
      if (err) return done(err);
    })
  })
}







//var db = new Db('./db', {});
//var Article = mongoose.model('Article', ArticleSchema);
//Promise.promisifyAll(Article);
//Promise.promisifyAll(Article.prototype);
//exports.Article = Article;
