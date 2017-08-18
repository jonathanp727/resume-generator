/* eslint-disable consistent-return */
const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();

function parseJSON(filename, callback) {
  fs.readFile(path.join(__dirname, '..', 'resume-data', filename), (err, file) => {
    if (err) return callback(err);
    let out;
    try {
      out = JSON.parse(file);
    } catch (err2) {
      return callback(err2);
    }
    return callback(null, out);
  });
}

/* GET home page. */
router.get('/', (req, res, next) => {
  if (!req.query.path) req.query.path = 'default.json';

  parseJSON(req.query.path, (err, results) => {
    if (err) return next(err);
    res.render('document', results);
  });
});

module.exports = router;
