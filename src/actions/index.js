import * as actionType from './ActionType';

// TABLE NUMBER ACTIONS
export function changeTable(table) {
    return {
        type: actionType.CHANGE_TABLE_NUMBER,
        payload: table,
    }
}

// BASKET ACTIONS
export function addToBasket(item, basket) {
    let newItem = item;
    
    // increase quantity of repeating object
    // compare items' names as the whole objects differ in value of the quantity property
    if (basket.items.some(r => r.name == item.name)) {
        return {
            type: 'INCREASE_QUANTITY',
            payload: basket,
            item: newItem,
        }
    }  else {
        // add quantity and index value to the object in the basket
        newItem.quantity = 1;
        return {
            type: 'ADD_TO_BASKET',
            payload: basket,
            item: newItem,
        }
    }
}

export function removeFromBasket(item, basket) {
    return {
        type: "REMOVE_FROM_BASKET",
        payload: basket,
        item: item,
    }
}

export function increaseQuantity(item, basket) {
    return {
        type: "INCREASE_QUANTITY",
        payload: basket,
        item: item,
    }
}

export function decreaseQuantity(item, basket) {
    return {
        type: "DECREASE_QUANTITY",
        payload: basket,
        item: item,
    }
}

// DATA ACTIONS
export function getData() {
    return {
        type: actionType.FETCHING_DATA,
    }
}

export function getDataSuccess(data) {
    return {
        type: actionType.FETCHING_DATA_SUCCESS,
        data: data,
    }
}

export function getDataFailure(error) {
    return {
        type: actionType.FETCHING_DATA_FAILURE,
        error: error,
    }
}

// This is a thunk, an action creator returning a function
export function fetchData() {
    return (dispatch) => {
        dispatch(getData());
        fetch('https://my-json-server.typicode.com/oskarkuklinski/RestaurantApp/db')
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw(res.error);
                }
                dispatch(getDataSuccess(res.menu));
                return res.menu;
            })
            .catch(error => {
            dispatch(getDataFailure(error));
        })
    };
}