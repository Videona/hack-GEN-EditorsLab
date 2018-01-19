// index.js

var Stream = require('./stream');

var Process = require('./lib/process');

var Store = require('./lib/store');


var topic = Store.activeTag();
// ishalltestthis

Stream.start(topic, processTweet); 

Store.onTagChange(function (newTag) {
	console.log('Listening tag changed to: ' + newTag);
	Stream.stop();
	Stream.start('#' + newTag, processTweet); 
});

function processTweet(tweet) {
	const data = Process.process(tweet);

	console.log(data);

	Store.save(data, function(success, id) {
		if(success) {
			console.log('Stored tweet with id ' + id);
		} else {
			console.error('Error storing tweet with id ' + id);
		}
	});
	console.log('Processed!!');

	Stream.stop();
}
