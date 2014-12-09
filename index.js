var co = require("co");
var assert = require('assert');
var Promise = require("bluebird");

require("tungus");
var mongoose = Promise.promisifyAll(require("mongoose"));
var Schema = mongoose.Schema;


var consoleSchema = Schema({
  name: String,
  manufacturer: String,
  released: Date
});
var Console = createAsyncModel('Console', consoleSchema);

var gameSchema = Schema({
  name: String,
  developer: String,
  released: Date,
  consoles: [{type: Schema.Types.ObjectId, ref: 'Console'}]
});
var Game = createAsyncModel('Game', gameSchema);

co(function* () {
  var db = "tingodb://" + __dirname + "/db";
  yield mongoose.connectAsync(db);

  var nintendo64 = yield Console.createAsync({
    name: 'Nintendo 64',
    manufacturer: 'Nintendo',
    released: 'September 29, 1996'
  });

  var zelda = yield Game.createAsync({
    name: 'Legend of Zelda: Ocarina of Time',
    developer: 'Nintendo',
    released: new Date('November 21, 1998'),
    consoles: [nintendo64]
  });


  console.log(nintendo64);
  console.log(zelda);

}).catch(function (err) {
  console.err(err.stack);
});


function createAsyncModel(name, schema) {
  var Model = mongoose.model(name, schema);
  Promise.promisifyAll(Model);
  Promise.promisifyAll(Model.prototype);
  return Model;
}
