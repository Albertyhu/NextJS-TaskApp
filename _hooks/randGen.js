//Generates a key of random characters

const alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

export const genKey = (size) => {
    var key = ""; 
    for (var i = 0; i < size; i++) {
        key += alpha[Math.floor(Math.random() * alpha.length)]; 
    }
    return key; 
}

export const pickFromArray = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}