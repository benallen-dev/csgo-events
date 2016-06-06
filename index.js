module.exports = CsgoEvents;

// Some code based on Shaunidiot's CSGOGSI implementation at
// https://github.com/shaunidiot/node-csgo-gsi

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

require('util').inherits(CsgoEvents, require('events').EventEmitter);

var app = express();
var server = http.createServer(app);

app.use(bodyParser.json());          // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({       // to support URL-encoded bodies
  extended: true
}));

function CsgoEvents() {
  var self = this;
  require('events').EventEmitter.call(this);
  server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("CSGO GSI server listening on", addr.address + ":" + addr.port);
  });

  app.post('/', function (req, res) {
    if (typeof req.body !== 'undefined') {
 
      self.process(req.body);
    }
  });

  this._currentState = '';
  this._previousState = '';
}

CsgoEvents.prototype.updateState = function(newstate) {
  this._previousState = this._currentState;
  this._currentState = newstate;
}

CsgoEvents.prototype.process = function (data) {
  var self = this;

  if (typeof data.round !== 'undefined') {

     switch (data.round.phase) {
      case 'live':
        if (this._currentState !== 'live') {
          this.updateState('live');
          this.emit('roundLive');
        }
        break;
      case 'freezetime':
        if (this._currentState !== 'freezetime') {
          this.updateState('freezetime');
          this.emit('roundFreezetime');
        }
        break;
      case 'over':
        if (this._currentState !== 'over') {
          this.updateState('over');
          this.emit('roundOver', data.round.win_team);
        }
 
        break;
    }

    if (typeof data.round.bomb !== 'undefined') {
      //       exploded, planted, defused
 
      switch (data.round.bomb) {
        case 'planted':
      
          break;
        case 'defused':
          
          break;
        case 'exploded':
      
          break;
      }
    }
  }
};