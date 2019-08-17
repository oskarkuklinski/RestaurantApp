import * as actionType from './ActionType'

// Action creators
export const changeTableNumber = (number) => {
    return {
        type: actionType.CHANGE_TABLE_NUMBER,
        payload: number,
    }
};

export const modifyBasket = (basket) => {
    return {
        type: actionType.MODIFY_BASKET,
        payload: basket,
    }
};