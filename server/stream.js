var TwitterPackage = require('twitter');
var config = require('./config');

var Process = require('./lib/process');

var Store = require('./lib/store');

var secret = {
	consumer_key: config.twitter.consumer_key,
	consumer_secret: config.twitter.consumer_secret,
	access_token_key: config.twitter.access_token_key,
	access_token_secret: config.twitter.access_token_secret
};

var Twitter = new TwitterPackage(secret);

// ToDo: Update the listening hashtag according to firebase

Twitter.stream('statuses/filter', {track: config.topics.toString()}, function(stream) {
	stream.on('data', processTweet);
	stream.on('error', function(error) {
		console.log(error);
	});
});

function processTweet(tweet) {
	const data = Process.process(tweet);

	console.log(data);

	const hash = 'breakingNews';

	Store.save(hash, data, function(success, id) {
		if(success) {
			console.log('Stored tweet with id ' + id);
		} else {
			console.error('Error storing tweet with id ' + id);
		}
	});
	console.log('Processed!!');
}


