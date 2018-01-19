// index.js

var Stream = require('./lib/stream');
var Search = require('./lib/search');
var Process = require('./lib/process');
var Store = require('./lib/store');


var topics = [];
var topic = Store.activeTag();


tagChange(topic);

Store.onTagChange(tagChange);

function tagChange(newTag) {
	console.log('Listening tag changed to: ' + newTag);
	Stream.stop();

	if(topics.indexOf(newTag) === -1) {
		topics.push(newTag);
		
		Search.search(newTag, function(tuits) {
			for (var i = tuits.length - 1; i >= 0; i--) {
				processTweet(tuits[i]);
			}
		});
	}

	Stream.start(topics.toString(), processTweet, retry); 

}

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

function retry() {
	Stream.stop();
	Stream.start(topic, processTweet); 
}
