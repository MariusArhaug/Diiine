const io = require('socket.io-client');
const feathers = require('@feathersjs/feathers');
const socketio = require('feathers-socketio');
const auth = require('feathers-authentication-client');

const socket = io('http://localhost:3030/', {transports: ['websocket']});
// Init feathers
const client = feathers();

// Register socket.io to talk to backend/server
client.configure(socketio(socket));

//client.configure(feathers.authentication());
//for authentication
client.configure(auth({
	storageKey: 'auth',
	storage: window.localStorage,
}));

export default client