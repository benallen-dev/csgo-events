module.exports = CsgoEvents;

// Some code based on Shaunidiot's CSGOGSI implementation at
// https://github.com/shaunidiot/node-csgo-gsi

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

require('util').inherits(CsgoEvents, require('events').EventEmitter);

var app = express();
var server = http.createServer(app);

var io = require('socket.io')(server);

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
  
  io.on('connection', function(socket){
    console.log('Socket.io connection established');
    
    socket.on('disconnect', function() {
      // disconnect handler
    });
    
    socket.on('ext', function (data) {
      this.emit('extRequest', data);
    });
  });
  

  this._currentState = '';
  this._previousState = '';
}

CsgoEvents.prototype.updateState = function (newstate, data) {
  if (this._currentState !== newstate) {
    this._previousState = this._currentState;
    this._currentState = newstate;
    this.emit(newstate, data);
  }
}

CsgoEvents.prototype.process = function (data) {
  var self = this;

  if (typeof data.round !== 'undefined') {

    switch (data.round.phase) {
      case 'live':
        if (typeof data.round.bomb !== 'undefined') {
          // data.round.bomb only becomes defined once
          // the bomb is planted.
          this.updateState('bombPlanted');
        }
        else {
          this.updateState('roundLive');
        }
        break;
      case 'freezetime':
        this.updateState('roundFreezetime');
        break;
      case 'over':
        if (typeof data.round.bomb !== 'undefined') {
          switch (data.round.bomb) {
            case 'defused':
              this.updateState('bombDefused');
              break;
            case 'exploded':
              this.updateState('bombExploded');
              break;
          }
        }
        else {
          this.updateState('roundOver', data.round.win_team);
        }
        break;
    }
  }
};