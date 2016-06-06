var CsgoEvents = require('csgo-events');
var csgo = new CsgoEvents();

csgo.on('roundFreezetime', function() {
    console.log('freezetime');
});

csgo.on('roundLive', function() {
   console.log('round live');    
});

csgo.on('roundOver', function(winner) {
    console.log('Round over, ' + winner + ' win');
});

csgo.on('bombPlanted', function() {
    console.log('Bomb planted');
});

csgo.on('bombDefused', function() {
    console.log('Bomb defused');
});

csgo.on('bombExploded', function() {
    console.log('Bomb exploded');
});

csgo.on('update', function(newstate) {
    console.log('Update: ' + newstate);
});