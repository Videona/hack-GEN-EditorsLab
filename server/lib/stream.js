var Twitter = require('./twitter');

function stream(topic, onData, onError) {

	console.log('Listening to: ', topic);
	Twitter.stream('statuses/filter', {track: topic}, function(stream) {			
		Twitter.currentTwitStream = stream;

		stream.on('data', onData);
		stream.on('error', function(error) {
			console.error('Stream error:');
			console.error(error);
			if(typeof onError === 'function') {
				onError(error);
			}
		});
	});
}

function destroyStream() {
	return (Twitter.currentTwitStream && Twitter.currentTwitStream.destroy());
}


module.exports = {
	start: stream,
	stop: destroyStream
};
