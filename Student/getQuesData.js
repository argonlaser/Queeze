var parseJson = function(callback) {

  //read json
  var fs = require('fs');
  var file =  './ques.json';
  var data = null;
  try {
    var str = fs.readFileSync(file).toString();
  }
  catch (err) {
    console.log('File exception : ' + err);
    return callback(err, data);
  }
  try{
    data = JSON.parse(str);
  }
  catch(err) {
    console.log('Error parsing json : ' + err);
    return callback(err,data);
  }
  _shuffle(data.questions);
  return callback(null,data);
}

var _shuffle = function(v) {
  for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
  return v;
};
module.exports = parseJson;
