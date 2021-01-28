import consola from 'consola';

export default class Room {
    constructor(options){
        this.io = options.io;
        this.socket = options.socket;
        this.playerName = options.playerName;
        this.roomId = options.roomId;
        this.action = options.action;
        this.options = JSON.parse(options.options);
        this.store = options.io.adapter;
    }

    async init(playerName){
        // Get all the clients connected to the given room
        let clients;
        await this.io.to(this.roomId).clients((e, _clients) => {
            clients = _clients || consola.error('[INTERNAL ERROR] Room creation failed!');
            consola.debug(`Connected clients are: ${clients}`);
        })

        if (this.action === 'join'){
            this.store = this.store.rooms[this.roomId]; // Set the data store to local to this room

            if(clients.length >= 1){ // i.e. this room exists
                await this.socket.join(this.roomId); // Join the room
                
                this.store.clients.push({id: this.socker.id, playerName, isReady: false}) 
                this.socket.playerName = playerName;
                this.socket.emit('[SUCCESS] Successfully initialized');
                consola.info(`[JOIN] Client joined room ${this.roomId}`);
                return true
            }

            consola.warn(`[JOIN FAILED] Client denied join, as roomId ${this.roomId} not created`);
            this.socket.emit('Error: Create a room first!');
            return false;
        }

        if (this.action === 'create'){

            if(clients.length < 1){ // i.e. this room doesn't exist
                await this.socker.join(this.roomId); // Create the room
                this.store = this.store.rooms[this.roomId]; // Set the data store to local to this room

                this.store.clients = [{id: this.socker.id, username, isReady: false}];
                this.socket.playerName = playerName;
                consola.info(`[CREATE] Client created and joined room ${this.roomId}`);
                this.socket.emit('[SUCCESS] Successfully initialised');
                return true;
            }

            consola.warn(`[CREATE FAILED] Client denied create, as roomId ${this.roomId} already present`);
            this.socket.emit('Error: Room already created. Join the room!');
            return false;
        }
    }
}