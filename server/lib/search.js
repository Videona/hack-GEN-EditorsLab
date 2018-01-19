var Twitter = require('./twitter');


function search(q, cb) {

	var search = {
		q: q, 
		result_type: 'recent', 
		count: 8
	};

	var tuits = [];

	Twitter.get('search/tweets', search, function(error, tweets) {
		for (var i = 0; i < tweets.statuses.length; i++) {
			tuits.push(tweets.statuses[i]);
		}

		if(typeof cb === 'function') {
			cb(tuits);
		}
	});
}

module.exports = {
	search: search
};
