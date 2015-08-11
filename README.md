# ToyRobot-Lite
A Command line interface application to excecise a toy robot.

Installation
------------
1. Clone the repo
2. npm install

Running unit tests
------------------
1. grunt

Startup
-------
1. node robot-cli

Commands
--------
**PLACE**
Sets the position of the robot. You must specify the x/y coordinates and direction to face the robot in the format: _x,y,direction_ where direction is one of [NORTH,SOUTH,EAST,WEST] and 0,0 is the south west corner.

**MOVE**
Moves the robot forward one space. Has no effect if the robot has not been placed, or if the robot is at the edge of the board.

**LEFT**
Rotates the robot left 90 degrees. Has no effect if the robot has not been placed.

**RIGHT**
Rotates the robot right 90 degrees. Has no effect if the robot has not been placed.

**REPORT**
Reports the position of the robot. Has no effect if the robot has not been placed.

