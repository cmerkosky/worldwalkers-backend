import consola from 'consola';

export default class Room {
    constructor(options){
        this.io = options.io;
        this.socket = options.socket;
        this.playerName = options.playerName;
        this.roomCode = options.roomCode;
        this.roomAction = options.roomAction;
        this.store = options.io.adapter;
    }

    init(){
        
        consola.info(this.store.rooms.get(this.roomCode))
        let clients = this.store.rooms.get(this.roomCode)?.clients

        consola.info(clients)
        

        if (this.roomAction === 'join'){
            this.store = this.store.rooms.get(this.roomCode); // Set the data store to local to this room
            if(clients){ // i.e. this room exists
                this.socket.join(this.roomCode); // Join the room
                
                this.store.clients.push({id: this.socket.id, playerName: this.playerName, isReady: false}) 
                this.socket.playerName = this.playerName;
                this.socket.emit('[SUCCESS] Successfully initialized');
                consola.info(`[JOIN] Client joined room ${this.roomCode}`);
                return true
            }

            consola.warn(`[JOIN FAILED] Client denied join, as roomCode ${this.roomCode} not created`);
            this.socket.emit('Error: Create a room first!');
            return false;
        }

        if (this.roomAction === 'create'){

            if(!clients){ // i.e. this room doesn't exist
                this.socket.join(this.roomCode); // Create the room
                this.store = this.store.rooms.get(this.roomCode); // Set the data store to local to this room

                this.store.clients = [{id: this.socket.id, playerName: this.playerName, isReady: false}];
                this.socket.playerName = this.playerName;
                consola.info(`[CREATE] Client created and joined room ${this.roomCode}`);
                this.socket.emit('[SUCCESS] Successfully initialised');
                return true;
            }

            consola.warn(`[CREATE FAILED] Client denied create, as roomCode ${this.roomCode} already present`);
            this.socket.emit('Error: Room already created. Join the room!');
            return false;
        }
    }

    showPlayers(){
        const {clients} = this.store;
        consola.info(clients)
        this.io.to(this.roomCode).emit('show_players', {playerList: clients})
    }
}