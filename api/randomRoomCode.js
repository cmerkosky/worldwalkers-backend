import consola from 'consola'

export default function getRandomRoomCode(length = 3){
    var toShuffle = Object.keys(cityNames)
    shuffle(toShuffle)
    let roomCode = ""
    for(var i = 0; i < length; i++){
        roomCode += cityNames[toShuffle[i]]
    }

    consola.info(`Sending room code "${roomCode}" through the API`)

    return { roomCode }
}

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

const cityNames = {
    "A": "Algiers",
    "B": "Bogota",
    "C": "Cairo",
    "D": "Dallas",
    "F": "Fiji",
    "G": "Glasgow",
    "H": "Havana",
    "I": "Istanbul",
    "J": "Jakarta",
    "K": "Karachi",
    "L": "Lima",
    "M": "Manila",
    "O": "Osaka",
    "P": "Perth",
    "Q": "Quito",
    "R": "Rangoon",
    "S": "Seattle",
    "T": "Toronto",
    "U": "Tunis",
    "V": "Vienna",
    "W": "Washington",
    "X": "Alexandria",
    "Y": "Yokohama",
    "Z": "Zurich"
}