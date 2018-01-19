var TwitterPackage = require('twitter');
var config = require('./config');

var secret = {
	consumer_key: config.twitter.consumer_key,
	consumer_secret: config.twitter.consumer_secret,
	access_token_key: config.twitter.access_token_key,
	access_token_secret: config.twitter.access_token_secret
};

var Twitter = new TwitterPackage(secret);

function stream(topic, onData) {

	console.log('Listening to: ', topic);
	Twitter.stream('statuses/filter', {track: topic}, function(stream) {			
		Twitter.currentTwitStream = stream;

		stream.on('data', onData);
		stream.on('error', function(error) {
			console.error('Stream error:');
			console.error(error);
		});
	});

	console.log('yooooooooooooooooooloooooooooooooooooo');
}

function destroyStream() {
	Twitter.currentTwitStream.destroy();
}


module.exports = {
	start: stream,
	stop: destroyStream
};
