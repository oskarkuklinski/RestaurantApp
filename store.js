import { createStore, combineReducers } from 'redux';
import basketReducer from './src/reducers/basketReducer';
import tableReducer from './src/reducers/tableReducer';

const rootReducer = combineReducers({
    basket: basketReducer,
    table: tableReducer
});

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;