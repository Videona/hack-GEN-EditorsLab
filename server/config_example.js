module.exports = {

	// Twitter Keys
	twitter: {
		consumer_key: 'YOUR_TWITTER_CONSUMER_KEY',
		consumer_secret: 'YOUR_TWITTER_CONSUMER_SECRET',
		access_token_key: 'YOUR_TWITTER_ACCESS_TOKEN_KEY',
		access_token_secret: 'YOUR_TWITTER_ACCESS_TOKEN_SECRET'
	},

	firebase: {
		serviceAccount: 'conf-YOUR_SERVICE_ACCOUNT_FILENAME.json',	// conf-prefix avoid git to track that file
		databaseURL: 'https://YOUR_PROJECT_ID.firebaseio.com'
	},

	// List of topics listening
	topics: ['#inktober', '#challenge', '#ishalltestthis']

};