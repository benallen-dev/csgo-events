# csgo-events
Node.js module that fires events when CS:GO game state changes.

Some code based on Shaunidiot's CSGOGSI implementation at https://github.com/shaunidiot/node-csgo-gsi

## Socket.io
The module includes socketio for communication with frontend apps. If you don't need this functionality, feel free to ignore it.

## Events

### roundLive
Fires when the round goes live.

### roundFreezetime
Fires when freezetime starts.

### roundOver
Fires on round end and returns the winning team
- T
- CT

### bombPlanted
Fires when the bomb is planted

### bombDefused
Fires when the bomb is defused

### bombExploded
Fires when the bomb explodes