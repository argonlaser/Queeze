module.exports = function(callback) {

  //read json
  var fs = require('fs');
  var file =  './ques.json';
  var data = null;
  try {
    var str = fs.readFileSync(file).toString();
  }
  catch (err) {
    console.log('File exception : ' + err);
    return callback(err,data);
  }
  try{
    data = JSON.parse(str);
  }
  catch(err) {
    console.log('Error parsing json : ' + err);
    return callback(err,data);
  }
  console.log('Parsed json - ' + data);
  return callback(null,data);
}