import getRandomRoomCode from './randomRoomCode.js'

const routes = route => {
    route.get('/', (req, res) => {
        res.send(`API server in running (${new Date()})`);
    });

    route.get('/randomRoomCode', (req, res) => {
        if(req.query.length){
            res.json(getRandomRoomCode(req.query.length))
        }
        else{
            res.json(getRandomRoomCode(req.query.length))
        }
    })
}

export default routes;