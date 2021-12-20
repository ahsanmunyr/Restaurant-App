import { USER_GET_INFO, NEAR_ME_USERS,NO_NEAR_ME_USERS } from './../Actions/actionType'
const initialState={}


export function userGets(state=initialState,action){
    // console.warn("Reducer",action.payload)
    switch(action.type){
        case USER_GET_INFO:          
            return action.payload;
        default:
            return state
    }
}

export function getNearMeUsers(state=initialState,action){
    // console.warn(action)
    switch(action.type){
        case NEAR_ME_USERS:          
            return action.payload;
        case NO_NEAR_ME_USERS:
            return action.payload;
        default:
            return state
    }
}

