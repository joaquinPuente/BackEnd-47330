import http  from 'http';
import app from './app.js'
import { Server } from 'socket.io';

const serverHttp = http.createServer(app)
const serverSocket = new Server(serverHttp)


serverSocket.of('/realTimeProduct').on('connection', (socketClient) => {
    console.log(`Se ha conectado el cliente ${socketClient.id}`);

    socketClient.on('disconnect', () => {
        console.log(`El cliente ${socketClient.id} se ha desconectado`);
    });
});


export const io = serverSocket;

const PORT = 8080;

serverHttp.listen(PORT, ()=>{console.log(`Server running in http://localhost:${PORT}/`);})