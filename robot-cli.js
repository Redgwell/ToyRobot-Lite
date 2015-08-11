'use strict';

var prompt = require('cli-input');
var interpreter = require('./interpreter');

var ps = prompt({
  infinite: true,
  trim: true
});

ps.on('value', function(value, options, ps) {
  var result = interpreter.handleCommand(value.join(' '));
  if (result) {
    console.log(result);
  }
});

console.log('Please enter some toy-robot commands:');
ps.run([{ key: 'commands', message: '>'}]);
