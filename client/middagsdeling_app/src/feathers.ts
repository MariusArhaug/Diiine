const io = require('socket.io-client');
const feathers = require('@feathersjs/feathers');
const socketio = require('feathers-socketio');
const auth = require('feathers-authentication-client');

const socket = io('http://localhost:3030', {transports: ['websocket']});
// Init feathers
const client = feathers();

// Register socket.io to talk to backend/server
client.configure(socketio(socket));

//for authentication
client.configure(auth({
	storageKey: 'auth',
	storage: window.localStorage,
}));

client.authenticate({
	strategy: 'local',
	email: 'admin@middag.no',
	password: 'supersecret'
});


/* try {
	await client.authenticate({
		strategy: 'local',
		...credentials
		// email: 'admin@middag.no',
		// password: 'supersecret'
	});
	console.log('we tryin hard');
	const result = await client.get('authentication');

	result ? setResult(result) : setResult(null);
	
} catch (error) {
	throw Error(error); 
} */

export default client