'use strict';

var Robot = require('./model/robot.model');
var _robot;

function place(commandArgs) {
  if (commandArgs.length < 3) {
    console.warn('Place command received with invalid arguments. You must specify x,y,direction.');
    return;
  }

  var x = parseInt(commandArgs[0]);
  var y = parseInt(commandArgs[1]);
  var direction = commandArgs[2];

  var robot = new Robot();

  if (!robot.setDirection(direction)) {
    console.warn('Place command received with invalid argument for direction.');
    return;
  }

  robot.setPosition(x, y);

  _robot = robot;
}

function move() {
}

function left() {
}

function right() {
}

function report() {
  if (!_robot) {
    return;
  }

  return _robot.getPositionReport();
}

// MOVE
// LEFT
// RIGHT

module.exports = {
  reset: function() {
    _robot = null;
  },
  getRobot: function() {
    return _robot;
  },
  handleCommand: function(command) {
    if (!command) {
      return;
    }

    command = command.toUpperCase();

    var commandParts = command.split(' ');
    var instruction = commandParts[0];
    var commandArgs = commandParts.length > 1 ? commandParts[1].split(',') : [];

    switch (instruction) {
      case 'PLACE':
        return place(commandArgs);
      case 'REPORT':
        return report();
    }
  }
}
