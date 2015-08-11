'use strict';

var should = require('should');
var interpreter = require('./interpreter');

describe('getRobot', function() {
  it('returns nothing if the robot has not been placed', function() {
    should(interpreter.getRobot()).not.be.ok();
  });
});

describe('reset', function() {
  it('clears the robot', function() {
    interpreter.handleCommand('PLACE 1,2,WEST');
    should(interpreter.getRobot()).be.ok();
    interpreter.reset();
    should(interpreter.getRobot()).not.be.ok();
  });
});

describe('handleCommand', function() {

  it('makes no changes if the command null or empty', function() {
    var invalidArguments = [null, ''];
    for (var i = 0; i < invalidArguments.length; i++) {
      interpreter.handleCommand(invalidArguments[i]);
      should(interpreter.getRobot()).not.be.ok();
    }
  });

  describe('report', function() {
    it('returns nothing if the robot has not been placed', function() {
      var result = interpreter.handleCommand('REPORT');
      should(result).not.be.ok();
    });

    it('returns the robot position if the robot has been placed', function() {
      interpreter.handleCommand('PLACE 1,2,WEST');
      var result = interpreter.handleCommand('REPORT');
      result.should.be.equal('At 1,2 facing WEST');
    });
  });

  describe('place', function() {

    beforeEach(function() { interpreter.reset(); });

    it('makes no changes if the command is missing the required arguments', function() {
      var invalidArguments = ['', '1', '1,2', '1,2,ANYWHERE'];
      for (var i = 0; i < invalidArguments.length; i++) {
        interpreter.handleCommand('PLACE ' + invalidArguments[i]);
        var result = interpreter.getRobot();
        should(interpreter.getRobot()).not.be.ok();
      }
    });

    it('sets the correct position and direction if the command has the required arguments', function() {
      var validArguments = [
        { x: 1, y: 2, direction: 'NORTH' },
        { x: 2, y: 3, direction: 'SOUTH' },
        { x: 3, y: 4, direction: 'EAST' },
        { x: 4, y: 0, direction: 'WEST' }
      ];

      for (var i = 0; i < validArguments.length; i++) {
        var args = validArguments[i];

        interpreter.handleCommand('PLACE ' + args.x + ',' + args.y + ',' + args.direction);

        var robot = interpreter.getRobot();
        should(robot).be.ok();
        robot.should.have.property('x', args.x);
        robot.should.have.property('y', args.y);
        robot.should.have.property('direction', args.direction);
      }
    });
  });

  describe('move', function() {

    beforeEach(function() { interpreter.reset(); });

    it('does nothing if the robot has not been placed', function() {
      var result = interpreter.handleCommand('MOVE');
      should(result).not.be.ok();
    });

    it('moves the robot if the robot has been placed', function() {
      interpreter.handleCommand('PLACE 1,2,WEST');
      interpreter.handleCommand('MOVE');

      var robot = interpreter.getRobot();
      should(robot).be.ok();
      robot.should.have.property('x', 0);
      robot.should.have.property('y', 2);
      robot.should.have.property('direction', 'WEST');
    });

  });

  describe('left', function() {

    beforeEach(function() { interpreter.reset(); });

    it('does nothing if the robot has not been placed', function() {
      var result = interpreter.handleCommand('LEFT');
      should(result).not.be.ok();
    });

    it('rotates the robot left if the robot has been placed', function() {
      interpreter.handleCommand('PLACE 1,2,WEST');
      interpreter.handleCommand('LEFT');

      var robot = interpreter.getRobot();
      should(robot).be.ok();
      robot.should.have.property('x', 1);
      robot.should.have.property('y', 2);
      robot.should.have.property('direction', 'SOUTH');
    });

  });

  describe('right', function() {

    beforeEach(function() { interpreter.reset(); });

    it('does nothing if the robot has not been placed', function() {
      var result = interpreter.handleCommand('RIGHT');
      should(result).not.be.ok();
    });

    it('rotates the robot right if the robot has been placed', function() {
      interpreter.handleCommand('PLACE 1,2,NORTH');
      interpreter.handleCommand('RIGHT');

      var robot = interpreter.getRobot();
      should(robot).be.ok();
      robot.should.have.property('x', 1);
      robot.should.have.property('y', 2);
      robot.should.have.property('direction', 'EAST');
    });

  });

});
