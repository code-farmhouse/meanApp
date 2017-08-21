var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/meandb');

router.get('/', function(req, res) {
	var collection = db.get('songs');
	collection.find({}, function(err, songs){
		if (err) throw err;
		res.json(songs);
	});
});

module.exports = router;
