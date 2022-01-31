import {combineReducers,compose,createStore,applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import {
    userLogin, 
    userSignup,
    userFavourite,
    userInterest,
    // userAuthSignUp, 
    userLatitudeLongitude, 
    userLocations, 
    userSearchApply,
    userGetRestaurant,
    userGetItems,
    userGetCategory,
    userGetRestaurantItem,
    userGetDeals,
    userAddToCart,
    userCreditCardDetail,
    restaurantInfo,
    placeOrderStatus,
    orderAccept,
    riderCoord,
    navigationApp,
    firebaseData,
    userOtpVerify,
    historyReducer,
    getRestaurantReview,
    OTPPhone,
    SearchDataRedux,
    SearchDataItemRedux,ForgotPasswordRedux
} from './Reducers/AuthReducers'
import {userGets, getNearMeUsers} from './Reducers/InAppReducer'

const reducers = combineReducers({
    userLogin,
    userSignup,
    userFavourite,
    userInterest,
    // userAuthSignUp,
    userGets,
    getNearMeUsers,
    userLatitudeLongitude,
    userLocations,
    userSearchApply,
    userGetRestaurant,
    userGetItems,
    userGetCategory,
    userGetRestaurantItem,
    userGetDeals,
    userAddToCart,
    userCreditCardDetail,
    restaurantInfo,
    placeOrderStatus,
    orderAccept,
    riderCoord,
    navigationApp,
    firebaseData,
    userOtpVerify,
    historyReducer,
    getRestaurantReview,
    OTPPhone,
    SearchDataRedux,
    SearchDataItemRedux,
    ForgotPasswordRedux
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store=createStore(reducers,{},composeEnhancers(applyMiddleware(ReduxThunk)));


export default store