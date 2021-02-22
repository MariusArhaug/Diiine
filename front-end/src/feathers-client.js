import io from 'socket.io-client';
import feathers from '@feathersjs/client';

const socket = io('http://localhost:3030', {
  transports: ['websocket'],
  forceNew: true
});
const client = feathers();

//register socketio
client.configure(feathers.socketio(socket));

//set up authentication with a store to cache auth token
client.configure(feathers.authentication({
  storage: window.localStorage,
}));


export default client;