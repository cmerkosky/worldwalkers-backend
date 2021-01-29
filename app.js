import express from 'express'
import {sockets} from './sockets/sockets.js';
import http from 'http';
import routes from './routes.js'
import cors from 'cors';
import consola from 'consola'
import { API_PORT, SOCKETS_PORT, hosts } from './env.js';

const app = express();
const server = new http.Server(app);

// Bind a new sockets instance to this HTTP Server
const io = sockets(server);

app.use(cors({ origin: hosts }));
app.use(express.json());

routes(app);

// Listen for HTTP requests with express on the this port
app.listen(API_PORT, () =>{
    consola.info(`API listening on port ${Number(API_PORT)}!`);
});

// Bind this server (and previously bound sockets instance) to this instance
server.listen(SOCKETS_PORT, () => {
    consola.info(`Sockets listening on port ${Number(SOCKETS_PORT)}!`);
})
