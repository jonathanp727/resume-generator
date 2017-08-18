let fs = require('fs');
let path = require('path');

let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.query.path)
    req.query.path = 'default.json';

  parseJSON(req.query.path, function(err, results) {
    if(err) return next(err);
    res.render('document', results);
  });
});

parseJSON = function (filename, callback) {
  fs.readFile(path.join(__dirname, '..', 'resume-data', filename), function(err, file) {
    if (err) return callback(err);
    let out;
    try {
      out = JSON.parse(file);
    } catch(err) {
      return callback(err)
    }
    return callback(null, out);
  });
}

module.exports = router;
