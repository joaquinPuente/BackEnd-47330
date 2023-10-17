import http  from 'http';
import app from './app.js'
import { Server } from 'socket.io';

const serverHttp = http.createServer(app)
const serverSocket = new Server(serverHttp)

serverSocket.on('connect', (socketClient)=>{
    console.log(`Se a conectado el cliente ${socketClient.id}`);

    socketClient.on('new-message', (message)=>{
        console.log(`El cliente ${socketClient.id} saludo desde el frontend: ${message}`);
    })
    
    socketClient.on('disconnect', ()=>{
        console.log(`El cliente ${socketClient.id} se a desconectado`);
    })
})

const PORT = 8080;

serverHttp.listen(PORT, ()=>{console.log(`Server running in http://localhost:${PORT}/`);})