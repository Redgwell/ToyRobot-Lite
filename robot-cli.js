var prompt = require('cli-input');

var ps = prompt({
  infinite: true,
  trim: true
});

ps.on('value', function(value, options, ps) {
  // do something with value
  console.log('you entered:', value);
});

console.log('Please enter some toy-robot commands:');
ps.run([{ key: 'commands', message: '>'}]);
