import * as actionType from './ActionType'

// Action creators
export const changeTableNumber = (number) => {
    return {
        type: actionType.CHANGE_TABLE_NUMBER,
        payload: number,
    }
};

export const addBasketItem = (quantity, item) => {
    return {
        type: actionType.ADD_BASKET_ITEM,
        payload: {quantity: quantity, item: item}
    }
};

export const subtractBasketItem = (quantity, item) => {
    return {
        type: actionType.SUBTRACT_BASKET_ITEM,
        payload: {quantity: quantity, item: item}
    }
};