export default function getRandomRoomCode(length = 3){
    var toShuffle = Object.keys(cityNames)
    shuffle(toShuffle)
    var retList = []
    for(var i = 0; i < length ; i++){
        const key = toShuffle[i]
        retList.push({
            letter: key,
            cityName: cityNames[key]
        });
    }

    return retList
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