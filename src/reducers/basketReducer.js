import * as actionType from '../actions/ActionType';

const initialState = {
    numberOfItems: 0,
    items: []
};

const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.MODIFY_BASKET:
            const basket = action.payload;
            return basket;
        default:
            return state
    }
}

export default basketReducer;