import * as actionType from '../actions/ActionType';

const initialState = {
    numberOfItems: 0,
    items: [],
    total: 0,
};

const basketReducer = (state = initialState, action) => {
    switch (action.type) {
            
        case actionType.ADD_TO_BASKET:
            return {
                ...state,
                numberOfItems: state.numberOfItems += 1,
                total: state.total += action.item.price,
                items: [
                    ...state.items,
                    action.item,
                ]
            }
            
        case actionType.INCREASE_QUANTITY:
            return {
                // update the numberOfItems value in a basket object
                ...state,
                numberOfItems: state.numberOfItems += 1,
                total: state.total += action.item.price,
                // iterate through the items array to reach the object and update its quantity value
                items: state.items.map((item, index) => {
                    if (index === action.item.index) {
                        return {
                            // return the needed object and update the quantity value
                            ...item,
                            quantity: action.item.quantity += 1
                        }
                    }
                    // return unchanged item that does not match the index
                    return item
                })
            };
            
            case actionType.DECREASE_QUANTITY: 
                return {
                    ...state,
                    numberOfItems: state.numberOfItems -= 1,
                    total: state.total -= action.item.price,
                    items: state.items.map((item, index) => {
                        if (index === action.item.index) {
                            return {
                                ...item,
                                quantity: action.item.quantity -= 1
                            }
                        }
                        return item
                    })
                };
                
            case actionType.REMOVE_FROM_BASKET:
                return {
                    ...state,
                    numberOfItems: state.numberOfItems -= action.item.quantity,
                    total: state.total -= (action.item.price * action.item.quantity),
                    items: [
                        ...state.items.splice(0, action.item.index),
                        ...state.items.splice(action.item.index + 1)
                    ]
                };
                
        default:
            return state;
    }
}

export default basketReducer;