Swarm
=====

Attempt at Swarm AI in pure Javascript (can do pretty and unpredicable things as a collective).

Current commit can be found live at http://swarmy.azurewebsites.net/


Query Parameters
================

The demo found above also has the option of passing in query parameters to manipulate the demo.

Example usage: http://swarmy.azurewebsites.net/?debug=1&speed=1&bees=64&targets=4&vc=9&ac=0.6&ft=1

- debug
    - boolean (1 OR 0)
    - Shows the current leader of the pack in white
- speed
    - float
    - The smaller the number, the faster the targets move
- bees
    - int
    - Modify how many bees are on screen (some computers/browsers may need a reduced number of bees)
- targets
    - int
    - Modify how many targets are on screen
    - Encourage the swarms to split up and do crazy things
- vc
    - float
    - VelocityClamp
    - Modify this to allow the bees to have a bigger or smaller maximum velocity
- ac
    - float
    - AccelerationClamp
    - Modify this to allow the bees to have a bigger or smaller maximum acceleration
- ft
    - boolean (1 OR 0)
    - Defaults to true
    - When turned off, the framerate will not be limited (will try and run as fast as possible)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/Workshop2/swarm/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

