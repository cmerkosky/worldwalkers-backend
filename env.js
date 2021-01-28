import dotenv from 'dotenv'
dotenv.config();

export const{
    API_PORT
} = process.env

export let hosts = [];
if(process.env.NODE_ENV === 'production'){
    // TODO: set hosts up to allow API requests
} else {
    hosts = ['http://localhost:3000'];
}