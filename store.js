import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import dataReducer from './src/reducers/dataReducer';
import basketReducer from './src/reducers/basketReducer';
import tableReducer from './src/reducers/tableReducer';

const rootReducer = combineReducers({
    basket: basketReducer,
    table: tableReducer,
    data: dataReducer,
});

const configureStore = () => {
    let store = createStore(rootReducer, applyMiddleware(thunk));
    return store
}

export default configureStore;