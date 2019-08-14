import { combineReducers } from 'redux';
import basketReducer from './basketReducer';
import tableReducer from './tableReducer';

const restaurantApp = combineReducers({
    basketReducer,
    tableReducer
})

export default restaurantApp