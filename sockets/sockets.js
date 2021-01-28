import { Server } from 'socket.io';
import consola from 'consola';

const roomId = '#8BHJL'

export const sockets = app => {
    const io = new Server(app, {
        path: '/classic'
    })

    consola.info('Socket.IO initialized!');

    const classic = io.of('/classic');

    classic.on('connection', async socket => {

        const { username, roomId, action, options} = socket.handshake.query;

        consola.info('Client connected!')
        consola.info(socket)
    })

    return io;
}