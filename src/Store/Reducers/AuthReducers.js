import {VERIFY_OTP} from "../actions/type"
import { 
    AUTH_LOGGED_IN,
    AUTH_LOGOUT, 
    AUTH_SIGNUP, 
    AUTH_OTP, 
    AUTH_LOGGING_IN_ERROR,
    AUTH_ALL_SIGNUP, 
    USER_INTEREST, 
    USER_FAVOURITE, 
    USER_GET_INFO, 
    USER_LAT_LONG ,
    USER_LOCATION ,
    USER_LOCATION_ERROR,
    USER_SEARCH_APPLY,
    USER_SEARCH_APPLY_ERROR,
    USER_GET_RESTAURANT,
    USER_GET_RESTAURANT_ERROR,
    USER_GET_ITEMS,
    USER_GET_ITEMS_ERROR,
    USER_GET_ITEMS_CLEAR,
    USER_GET_CATEGORY,
    USER_GET_CATEGORY_ERROR,
    USER_GET_CATEGORY_CLEAR,
    USER_GET_RESTAURANT_ITEM,
    USER_GET_RESTAURANT_ITEM_ERROR,
    USER_GET_RESTAURANT_ITEM_CLEAR,
    USER_GET_DEALS,
    USER_GET_DEALS_ERROR,
    ADD_TO_CART,
    ADD_QUANTITY,
    MINUS_QUANTITY,
    CART_DELETE,
    STRIPE_DETAILS,
    STRIPE_DETAILS_ERROR,
    RESTAURANT_INFO,
    RESTAURANT_INFO_CLEAR,
    ORDER_PLACE,
    ORDER_PLACE_ERROR,
    ORDER_ACCEPT_DATA,
    ORDER_ACCEPT_ERROR,
    RIDERCOORDS,
    RIDERCOORDS_ERROR,
    NAV,
    FIREBASEDATA
} from '../Actions/actionType'

const initialState={
    userLogin: false,
    testing: 'abc'
}
const initialNav={
    navigation: null
}
const initialOrderStack = {
    data: null,
    order: false
}

const initialOrderAccept = {
    data: null,
    order: false,
}

const initialCoords = {
    data: null,
    condition: false
}

const initialFirebaseData = {
    data: null
}

export function riderCoord(state=initialCoords,action){
    switch(action.type){
        case RIDERCOORDS:
            return action.payload;
        case RIDERCOORDS_ERROR:
            return action.payload;
        default:
            return state
    }
}



export function orderAccept(state=initialOrderAccept,action){
    switch(action.type){
        case ORDER_ACCEPT_DATA:
            return action.payload;
        case ORDER_ACCEPT_ERROR:
            return action.payload;
        default:
            return state
    }
}


export function placeOrderStatus(state=initialOrderStack,action){
    switch(action.type){
        case ORDER_PLACE:
            return action.payload;
        case ORDER_PLACE_ERROR:
            return action.payload;
        default:
            return state
    }
}

export function restaurantInfo(state=null,action){
    switch(action.type){
        case RESTAURANT_INFO:
            return action.payload;
        case RESTAURANT_INFO_CLEAR:
            return action.payload;
        default:
            return state
    }
}

export function userCreditCardDetail(state=null,action){
    switch(action.type){
        case STRIPE_DETAILS:
            return action.payload;
        case STRIPE_DETAILS_ERROR:
            return action.payload;
        default:
            return state
    }
}


export function userAddToCart(state=[],action){
    switch(action.type){
        case ADD_TO_CART:
            console.log("add")

            return [...state, action.payload]


        case ADD_QUANTITY:
            // console.log("add quantity",action.payload.itemId)
            const updatedState=[...state].map(item=>{
                if(item.itemId==action.payload.itemId){
                    let mult = item.qty+action.payload.qty
                    return {
                        ...item,
                        qty:item.qty+action.payload.qty,
                        price: parseInt(item.price) 

                    }
                }
                return item
            })
            return updatedState
        case MINUS_QUANTITY:
            // console.log("minus quantity",action.payload.itemId)
            const updatedMinusState=[...state].map((item,i)=>{
                // console.log("abc",action.payload.itemId)
                if(item.itemId==action.payload.itemId){
                    let mult = item.qty + action.payload.qty
                    // console.log("stats",mult)
                    if(mult){
                        return {
                            ...item,
                            qty:item.qty + action.payload.qty,
                            price: parseInt(item.price) 
    
                        }
                    }
                }else{
                    return item
                }
            }).filter(item=>item)
            return updatedMinusState
        case CART_DELETE:
                return action.payload;
        default:
            return state
    }
}

export function userGetDeals(state=initialState,action){
    switch(action.type){
        case USER_GET_DEALS:
            return action.payload;
        case USER_GET_DEALS_ERROR:
            return action.payload;
        default:
            return state
    }
}

export function userGetRestaurantItem(state=initialState,action){
    switch(action.type){
        case USER_GET_RESTAURANT_ITEM:
            return action.payload;
        case USER_GET_RESTAURANT_ITEM_CLEAR:
            return action.payload;
        case USER_GET_RESTAURANT_ITEM_ERROR:
            return action.payload;
        default:
            return state
    }
}


export function userGetCategory(state=initialState,action){
    switch(action.type){
        case USER_GET_CATEGORY:
            return action.payload;
        case USER_GET_CATEGORY_CLEAR:
            return action.payload;
        case USER_GET_CATEGORY_ERROR:
            return action.payload;
        default:
            return state
    }
}


export function userGetItems(state=initialState,action){
    switch(action.type){
        case USER_GET_ITEMS:
            return action.payload;
        case USER_GET_ITEMS_CLEAR:
                return action.payload;
        case USER_GET_ITEMS_ERROR:
            return action.payload;
        default:
            return state
    }
}

export function userGetRestaurant(state=initialState,action){
    switch(action.type){
        case USER_GET_RESTAURANT:
            return action.payload;
        // case USER_GET_RESTAURANT_CLEAR:
        //         return action.payload;
        case USER_GET_RESTAURANT_ERROR:
            return action.payload;
        default:
            return state
    }
}

export function userSearchApply(state=initialState,action){
    switch(action.type){
        case USER_SEARCH_APPLY:
            return action.payload;
        case USER_SEARCH_APPLY_ERROR:
            return action.payload;
        default:
            return state
    }
}

export function userLocations(state=initialState,action){
    switch(action.type){
        case USER_LOCATION:
            return action.payload;
        case USER_LOCATION_ERROR:
            return action.payload;
        default:
            return state
    }
}

export  function userLatitudeLongitude(state=initialState,action){

    switch(action.type){
        case USER_LAT_LONG:
            return action.payload;
        default:
            return state
    }
}

export  function userLogin(state=initialState,action){

    switch(action.type){
        case AUTH_LOGGED_IN:
            return action.payload;
        case AUTH_LOGGING_IN_ERROR:
            return action.payload;
        case AUTH_LOGOUT:
            return action.payload;
        default:
            return state
    }
}

// For Signup Data Get to 3 steps
export  function userSignup(state=initialState,action){

    switch(action.type){
        case AUTH_SIGNUP:
            return action.payload;
        default:
            return state
    }
}

export  function userOtp(state=initialState,action){

    switch(action.type){
        case AUTH_OTP:
            return action.payload;
        default:
            return state
    }
}


export  function userOtpVerify(state=initialState,action){

    switch(action.type){
        case AUTH_OTP_VERIFY:
            return action.payload;
        default:
            return state
    }
}

export  function userInterest(state=initialState,action){

    switch(action.type){
        case USER_INTEREST:
            return action.payload;
        default:
            return state
    }
}

export  function userFavourite(state=initialState,action){

    switch(action.type){
        case USER_FAVOURITE:
            return action.payload;
        default:
            return state
    }
}

export  function userAuthSignUp(state=initialState,action){

    switch(action.type){
        case AUTH_ALL_SIGNUP:
            return action.payload;
        case AUTH_LOGOUT:
                return action.payload;
        default:
            return state
    }
}

export  function navigationApp(state=initialNav,action){

    switch(action.type){
        case NAV:
            return action.payload;
        default:
            return state
    }
}

export  function firebaseData(state=initialFirebaseData,action){

    switch(action.type){
        case FIREBASEDATA:
            return action.payload;
        default:
            return state
    }
}
