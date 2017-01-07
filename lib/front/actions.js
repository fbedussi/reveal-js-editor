export function openFile(payload) {
    return { type: 'OPEN_FILE', payload};
}

export function openFileRequest(payload) {
    return { type: 'OPEN_FILE_REQUEST'};
}

//export function reset() {
//    return { type: 'RESET'};    
//}
//
//export function initCards() {
//    return { type: 'INIT_CARDS'};    
//}
//
//export function newGame(animals) {
//    return { type: 'NEW_GAME', animals: animals};    
//}