import * as actionType from '../actions/ActionType';

const initialState = {};

const tableReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.CHANGE_TABLE_NUMBER:
            const table = action.payload;
            return {
                ...state,
                table
            };
        default:
            return state;
    }
}

export default tableReducer;