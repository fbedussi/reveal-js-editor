export const cards = (state, action) => {
   switch (action.type) {
        case 'ADD_CARD': 
            let newCard = Object.assign({}, action.data, {
                score: 1,
                id: +new Date() 
            });
            
            return state? state.concat([newCard]) : [newCard];
         case 'UPDATE_CARD':
            let cardUpdate = action.data;
            return state.map(card=> (card.id === cardUpdate.id)?
               Object.assign({}, card, cardUpdate) :
               card
            );
         case 'DELETE_CARD':
            return state.filter(card => card.id !== action.data);
         default:
            return state || [];
   }
};

export const decks = (state, action) => {
   switch (action.type) {
        case 'ADD_DECK': 
            let newDeck = { name: action.data, id: +new Date()};
            return state? state.concat([newDeck]) : [newDeck];
         default:
            return state || [];
   }
};

export const addingDeck = (state, action) => {
   switch (action.type) {
      case 'SHOW_ADD_DECK': return true;
      case 'HIDE_ADD_DECK': return false;
      default: return !!state;
   }
};
