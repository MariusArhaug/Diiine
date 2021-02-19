import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';

const socket = io('localhost:3030', {
	transports: ['websocket']
});
const client = feathers();

client.configure(socketio(socket));
client.configure(auth({
	storageKey: 'auth',
	storage: window.localStorage,
}));


export default client;
