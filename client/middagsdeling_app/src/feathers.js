const io = require('socket.io-client');
const feathers = require('feathers/client');
const socketio = require('feathers-socketio');
const auth = require('feathers-authentication-client');

const socket = io('http://localhost:3000/register/', {
	transports: ['websocket']
});
// Init feathers
const client = feathers();

// Register socket.io to talk to backend/server
client.configure(socketio(socket));
//for authentication
client.configure(auth({
	storageKey: 'auth',
	storage: window.localStorage,
}));

/*
client.reAuthenticate().then(() => {
	//show application page
}).catch(() => {
	//show login page
})*/


//document.getElementById('form').addEventListener('submit', post);

/*async function post(e) {
	console.log("posted!")
	e.preventDefault();

	const firstName = document.getElementById('first name');
	const lastName = document.getElementById('first name');
	const email = document.getElementById('e-mail'); 
	//const address = document.getElementById('address');
	const password = document.getElementById('password');
	let isAdmin = document.getElementById('isAdmin').value;

	//concat names and turn string into bool
	const fullName = firstName.value + " " + lastName.value;
	isAdmin = (isAdmin === 'true');
	
	client.service('users').create({
		name: fullName,
		password: password.value,
		email: email.value,
		created_at: new Date(),
		updated_at: new Date(),
		allergies: "None",
		isAdmin: isAdmin
	})
	// clear values
	firstName = ''
	lastName = ''
	fullName = ''
	email = ''
	password = ''
}*/

export default client