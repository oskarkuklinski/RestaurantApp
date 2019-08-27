import * as actionType from '../actions/ActionType';

const initialState = {
    data: [],
    dataFetched: false,
    isFetching: false,
    error: false,
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.FETCHING_DATA:
            return {
                ...state,
                data: [],
                isFetching: true,
            }
        case actionType.FETCHING_DATA_SUCCESS: 
            return {
                ...state,
                isFetching: false,
                data: action.data,
            }
        case actionType.FETCHING_DATA_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
            }
        default:
            return state
    }
}

export default dataReducer;