let Torn_data = {

}

require('fs').readdirSync(__dirname + '/').forEach(function(file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    //exports[name] = require('./' + file)[name];
	Torn_data[name] = require('./' + file)[name]
  }
});
exports.Torn_data = Torn_data;