import { Server } from 'socket.io';
import consola from 'consola';
import Room from './room.js';

import { hosts } from '../env.js'

export const sockets = app => {
    const io = new Server(app, {
        cors: { origin: hosts }
    })

    consola.info('Socket.IO initialized!');

    const classic = io.of('/classic');

    classic.on('connection', socket => {
        const { playerName, roomCode, roomAction } = socket.handshake.query;
        socket.send(`Hello, ${playerName}!`)

        const room = new Room({ io: classic, socket, playerName, roomCode, roomAction });

        const joinedRoom = room.init();
        consola.info(`Client connected! Player's name: "${playerName}"`)

        if(joinedRoom){
            room.showPlayers()
        }
    })

    return io;
}