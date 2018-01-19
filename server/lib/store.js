const Firebase = require('firebase-admin');
const config = require('../config');

// Fetch the service account key JSON file contents
const serviceAccount = require('../'+ config.firebase.serviceAccount);

// Initialize the app with a service account, granting admin privileges
Firebase.initializeApp({
  credential: Firebase.credential.cert(serviceAccount),
  databaseURL: config.firebase.databaseURL
});

const db = Firebase.database();

const listener = {}

var activeTag = 'breakingNews';

// Listen active tag
db.ref('search').on('value', function(snapshot) {
	activeTag = snapshot.val();

	if (typeof listener.tagChange === 'function') {
		listener.tagChange(activeTag);
	}
});


function save(data, cb) {
	
	const ref = db.ref(activeTag);

	const newData = ref.push();
	newData.set(data);

	cb(true, newData.key);
}


module.exports = {
	save: save,
	activeTag: function () { 
		return '#' + activeTag; 
	},
	onTagChange: function (cb) {
		listener.tagChange = cb;
	}
};
