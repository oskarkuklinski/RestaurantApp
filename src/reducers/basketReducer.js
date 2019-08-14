import * as actionType from '../actions/ActionType';

const initialState = {
    numberOfItems: 0,
    items: []
};

const basketReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case actionType.ADD_BASKET_ITEM:
            return newState = state + action.payload;
        case actionType.SUBTRACT_BASKET_ITEM:
            return newState = state - action.payload;
        default:
            return state
    }
}

export default basketReducer;