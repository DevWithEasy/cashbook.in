import { io } from 'socket.io-client';

const socket = io(process.env.NODE_ENV === 'production' ? 'https://cashbook-in-api.onrender.com' : 'http://localhost:8080')

export default socket