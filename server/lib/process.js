
// const config = require('../config');

function process(tweet) {

	// This shall not be random
	const rand = Math.random() * (2) - 1;
	const rating = rand.toFixed(2);

	var data = {
		url: 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str,
		rating: rating
	};

	return data;
}

module.exports = {
	process: process
};
