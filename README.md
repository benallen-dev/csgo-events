# csgo-events
Node.js module that fires events when CS:GO game state changes.

Some code based on Shaunidiot's CSGOGSI implementation at https://github.com/shaunidiot/node-csgo-gsi

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