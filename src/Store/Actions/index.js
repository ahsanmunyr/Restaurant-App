import axios from "axios"
import { api, deploy_API, GoogleMapURL, GoogleMapKey, GoogleMapDetailURL } from "../../Config/Apis.json"
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as types from './actionType'
import { showMessage, hideMessage } from "react-native-flash-message";


export const stripe = (token, pesa) => async (dispatch) => {
    try {
        const response = await axios.post(`${deploy_API}/api/payment/pay`, {
            amount: pesa,
            stripeToken: token
        })
        if (response.data) {
            dispatch({
                type: types.STRIPE_PAYMENT,
                payload: response.data,
            })
            console.log(response.data)
        }
    }
    catch (e) {
        dispatch({
            type: types.STRIPE_PAYMENT_ERROR,
            payload: response.data,
        })
        console.log(e)
    }
}

export const stripeDetail = (obj) => async (dispatch) => {
    try {
        if (obj) {
            dispatch({
                type: types.STRIPE_DETAILS,
                payload: obj,
            })
        }
    }
    catch (e) {
        console.log(e)
        dispatch({
            type: types.STRIPE_PAYMENT_ERROR,
            payload: null,
        })
    }
}


export const userGet = (userID) => async (dispatch) => {
    try {
        const response = await axios.get(`${deploy_API}/api/auth/userInfo`, {
            params: {
                user_id: userID
            }
        });
        if (response.data.status) {

            dispatch({
                type: types.USER_GET_INFO,
                payload: response.data.data,
            })
        } else {
            alert("error")
        }
    } catch (error) {
        console.log(error)
    }
};

export const nearMeUsers = (latitude, longitude) => async (dispatch) => {
    // console.log(latitude, longitude, "longitude0")
    try {
        const location = await axios.get(`${deploy_API}/api/post/nearMe`, {
            params: {
                kilometers: 5,
                user_latitude: latitude,
                user_longitude: longitude
            }
        });
        if (location.data.length > 0) {
            console.log(location.data)
            dispatch({
                type: types.NEAR_ME_USERS,
                payload: location.data,
            })
        } else {
            dispatch({
                type: types.NO_NEAR_ME_USERS,
                payload: []
            })
        }
    } catch (err) {
        console.log(err, "ERROR nearMeUser")
    }
}

export const loginUser = (email, password) => async (dispatch) => {
    try {
        // console.log(email, password)
        const response = await axios.post(`${deploy_API}/client/login`, {
            email: email,
            password: password
        })
        // console.log(response.data.data)
        if (response.data.status) {
            console.log('success')
            dispatch({
                type: types.AUTH_LOGGED_IN,
                payload: response.data.data,
            })
            // const token = response.data.data.token
            const user = JSON.stringify(response.data.data)
            console.log(user)
            await AsyncStorage.setItem('token', user)
            // await AsyncStorage.setItem('userinformation',user)
        } else {
            console.log("fail")
            showMessage({
                message: "ERROR",
                description: "Login Failed",
                type: "danger",
            });
            dispatch({
                type: types.AUTH_LOGGING_IN_ERROR,
                payload: {
                    userLogin: false,
                },
            })
        }
    } catch (error) {
        console.log(error, "[Error: Network Error]")
        showMessage({
            message: "ERROR",
            description: "Network Error",
            type: "danger",
        });
        dispatch({
            type: types.AUTH_LOGGING_IN_ERROR,
            payload: {
                userLogin: false,
            },
        })
    }
};

export const userDetailsSave = (data) => async (dispatch) => {
    dispatch({
        type: types.AUTH_LOGGED_IN,
        payload: data
    })
}
export const Otp = (email, password, confirmPassword, mobileNumber, fadeChange) => async (dispatch) => {
    try {
        if (otp != null) {
            const responseVerify = await axios.get(`${deploy_API}/client/verify`, {
                params: {
                    phonenumber: number,
                    code: otp
                }
            });
            if (responseVerify.data.message === "User is Verified!!") {
                dispatch({
                    type: types.AUTH_OTP_VERIFY,
                    payload: responseVerify.data,

                })
                fadeChange()
            } else {
                alert("error")
            }
        } else {
            console.log(number)
            const response = await axios.get(`${deploy_API}/api/auth/login`, {
                params: {
                    phonenumber: number,
                    channel: 'sms'
                }
            });
            if (response.data.message === "Verification is sent!!") {
                fadeChange()
                dispatch({
                    type: types.AUTH_OTP,
                    payload: response.data,

                })
            } else {
                alert("error")
            }
        }
    }
    catch (err) {
        console.log(err)
    }
}


export const consoleFunc = () => async (dispatch) => {
    console.log("Test by roshaan")
}

export const SignUpStepOne = (email, password, confirmPassword, mobileNumber, fadeChange, onChangeError) => async (dispatch) => {
    console.log(email, password, confirmPassword, mobileNumber)
    try {
        const data = {
            email: email,
            password: password,
            confirm_password: confirmPassword,
            phone: mobileNumber,
        }
        const response = await axios.post(`${deploy_API}/client/register`, data);
        if (response.data.status) {
            fadeChange()
            dispatch({
                type: types.AUTH_SIGNUP,
                payload: response.data.msg
            })
        } else {
            // alert(response.data.msg)
            onChangeError(response.data.msg)
            dispatch({
                type: types.AUTH_ERROR,
                payload: null
            })
        }

    } catch (error) {
        onChangeError(error)
        alert("error")
        console.log(error)
    }
};

export const SignOut = () => async (dispatch) => {
    console.log("sign out")
    try {

        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('userData')
        await AsyncStorage.removeItem('userinformation')
        // await AsyncStorage.clear()
        dispatch({
            type: types.AUTH_LOGOUT,
            payload: {}
        })
    } catch (error) {
        console.log(error)
    }
};

export const Interest = (interest) => async (dispatch) => {

    try {
        // console.log(interest, "--int--")
        dispatch({
            type: types.USER_INTEREST,
            payload: interest,
        })

    } catch (error) {
        console.log(error)
    }
}

export const Favourite = (favourite) => async (dispatch) => {
    try {
        // console.log(favourite, "--fav--")    
        dispatch({
            type: types.USER_FAVOURITE,
            payload: favourite
        })

    } catch (error) {
        console.log(error)
    }
}

export const SignupAll = (userSignup, userFavourite, userInterest) => async (dispatch) => {
    try {
        console.log(userSignup.user_gender_interest, "-----")
        // console.log(userInterest, "-----")
        // const intgend = [userSignup.user_gender_interest.male, userSignup.user_gender_interest.female]
        const response = await axios.post(`${deploy_API}/api/auth/register`, {
            user_name: userSignup.user_name,
            user_email: userSignup.user_email,
            user_password: userSignup.user_password,
            user_contact: userSignup.user_contact,
            user_reg_verify_code: userSignup.user_reg_verify_code,
            user_gender: userSignup.user_gender,
            user_gender_interest: JSON.stringify(userSignup.user_gender_interest),
            user_interest: JSON.stringify(userInterest),
            user_favorite: JSON.stringify(userFavourite),
            social_login: "USER_AUTH"
        });
        console.log(response.data)
        if (response.data.status) {
            dispatch({
                type: types.AUTH_ALL_SIGNUP,
                payload: response.data.data
            })
            const token = response.data.data.Token
            await AsyncStorage.setItem('token', token)
        }
        // console.log(favourite, "--fav--")    
        // dispatch({
        //     type: types.USER_FAVOURITE,
        //     payload: favourite     
        // })

    } catch (error) {
        console.log(error)
    }
}

export const UserLatLong = (latitude, longitude) => async (dispatch) => {
    // console.log(latitude,longitude, "PPPPP")
    try {

        // console.log(latitude,longitude, "PPPPP")
        dispatch({
            type: types.USER_LAT_LONG,
            payload: {
                lat: latitude,
                long: longitude
            },
        })

    } catch (e) {
        console.log(e)
    }
}

export const UserLocation = (latitude, longitude) => async (dispatch) => {
    try {
        let placename;
        let state;
        let city;
        let country;
        const responseVerify = await axios.get(`${GoogleMapURL}`, {
            params: {
                latlng: latitude + "," + longitude,
                key: GoogleMapKey
            }
        });

        if (responseVerify.data.status == "OK") {
            placename = responseVerify.data.results[1].formatted_address
            console.log(placename)
            let arrayLoc = responseVerify.data.results[0].address_components;
            for (let i = 0; i < arrayLoc.length; i++) {
                if (arrayLoc[i].types.includes('country')) {
                    country = arrayLoc[i].long_name;
                    // console.log(country);
                }
                if (arrayLoc[i].types.includes('administrative_area_level_2')) {

                    state = arrayLoc[i].long_name;
                    // console.log(state);
                }
                if (arrayLoc[i].types.includes('administrative_area_level_1')) {

                    city = arrayLoc[i].long_name;
                    // console.log(city);
                }
            }

            dispatch({
                type: types.USER_LOCATION,
                payload: {
                    PlaceName: placename,
                    State: state,
                    City: city,
                    Country: country
                }
            })

        } else {
            dispatch({
                type: types.USER_LOCATION_ERROR,
                payload: []
            })
        }
    } catch (e) {
        console.log(e)
    }
}

export const LocationSearchApply = (PlaceID, placeName) => async (dispatch) => {
    try {
        let placename;
        let state;
        let city;
        let country;
        let latlong;
        const responseVerify = await axios.get(`${GoogleMapDetailURL}`, {
            params: {
                place_id: PlaceID,
                fields: "address_components,geometry",
                key: GoogleMapKey
            }
        });

        if (responseVerify.data.status == "OK") {
            //  console.warn(responseVerify.data.result.address_components)
            //  placename = responseVerify.data.results.address_components
            let arrayLoc = responseVerify.data.result.address_components
            for (let i = 0; i < arrayLoc.length; i++) {
                if (arrayLoc[i].types.includes('country')) {
                    country = arrayLoc[i].long_name;
                    // console.log(country);
                }
                if (arrayLoc[i].types.includes('administrative_area_level_2')) {

                    state = arrayLoc[i].long_name;
                    // console.log(state);
                }
                if (arrayLoc[i].types.includes('administrative_area_level_1')) {

                    city = arrayLoc[i].long_name;
                    // console.log(city);
                }
            }
            latlong = responseVerify.data.result.geometry.location;
            dispatch({
                type: types.USER_SEARCH_APPLY,
                payload: {
                    PlaceName: placeName,
                    LatLong: latlong,
                    State: state,
                    City: city,
                    Country: country
                }
            })
        } else {
            dispatch({
                type: types.USER_SEARCH_APPLY_ERROR,
                payload: []
            })
        }
    } catch (e) {
        console.log(e)
    }
}

export const getRestaurant = (latitude, longitude, km) => async (dispatch) => {
    // console.log(latitude, longitude, km, "getRestaurant")
    try {
        const restaurant = await axios.get(`${deploy_API}/api/restaurant/getuserrestaurants`, {
            params: {
                restaurant_latitude: latitude,
                restaurant_longitude: longitude,
                kilometers: km
            }
        });
        if (restaurant.data.data) {
            if (restaurant.data.data.restaurants.length <= 0) {
                dispatch({
                    type: types.USER_GET_RESTAURANT_ERROR,
                    payload: []
                })
            } else {
                dispatch({
                    type: types.USER_GET_RESTAURANT,
                    payload: restaurant.data.data
                })
            }

        } else {
            dispatch({
                type: types.USER_GET_RESTAURANT_ERROR,
                payload: []
            })
            showMessage({
                message: "Warning",
                description: "No restaurant available in your area",
                type: "warning",
            });
        }

    } catch (err) {
        dispatch({
            type: types.USER_GET_RESTAURANT_ERROR,
            payload: []
        })
        console.log(err, "ERROR getRestaurant")
        // showMessage({
        //     message: "ERROR",
        //     description: "Request failed with status code 404",
        //     type: "danger",
        //   });
    }
}

export const getDeals = (Latitude, Longitude, km) => async (dispatch) => {
    // console.log(Latitude, Longitude, km, "getDeals")
    try {
        const deals = await axios.get(`${deploy_API}/api/deal/getclientdeals`, {
            params: {
                latitude: Latitude,
                longitude: Longitude,
                kilometers: km
            }
        });
    } catch (err) {
        dispatch({
            type: types.USER_GET_DEALS_ERROR,
            payload: []
        })
        showMessage({
            message: "ERROR",
            description: "Request failed with status code 404",
            type: "danger",
        });
    }
}

export const getCategory = (id) => async (dispatch) => {
    // console.log(id, "id")
    try {
        const category = await axios.get(`${deploy_API}/api/restaurant/getuserrestaurant`, {
            params: {
                restaurant_id: id,
            }
        });
        if (category.data.data.length <= 0) {
            dispatch({
                type: types.USER_GET_CATEGORY_ERROR,
                payload: []
            })
        } else {
            console.log('Category')
            dispatch({
                type: types.USER_GET_CATEGORY,
                payload: category.data.data
            })
        }
    } catch (err) {
        dispatch({
            type: types.USER_GET_CATEGORY_ERROR,
            payload: []
        })
        console.log(err, "ERROR Category")
    }
}

export const getItem = (id) => async (dispatch) => {
    console.log(id, "id")
    try {
        const items = await axios.get(`${deploy_API}/api/item/getclientitems`, {
            params: {
                category_id: id,
            }
        });
        if (items.data.data.length <= 0) {
            dispatch({
                type: types.USER_GET_ITEMS_ERROR,
                payload: []
            })
        } else {
            console.log('items')
            dispatch({
                type: types.USER_GET_ITEMS,
                payload: items.data.data
            })
        }
    } catch (err) {
        dispatch({
            type: types.USER_GET_ITEMS_ERROR,
            payload: []
        })
        console.log(err, "ERROR getItem")
    }
}

export const getRestaurantItems = (Id1, Id2) => async (dispatch) => {
    try {
        const category = await axios.get(`${deploy_API}/api/item/getrestaurantitems`, {
            params: {
                restaurant_id: Id1,
                category_id: Id2
            }
        });
        if (category.data.data.length <= 0) {
            dispatch({
                type: types.USER_GET_RESTAURANT_ITEM_ERROR,
                payload: []
            })
        } else {
            console.log(category.data.data, 'getRestaurantItems, -----')
            dispatch({
                type: types.USER_GET_RESTAURANT_ITEM,
                payload: category.data.data
            })
        }
    } catch (err) {
        dispatch({
            type: types.USER_GET_RESTAURANT_ITEM_ERROR,
            payload: []
        })
        console.log(err, "ERROR Category")
    }
}

export const getCategoryClear = () => async (dispatch) => {
    dispatch({
        type: types.USER_GET_CATEGORY_CLEAR,
        payload: []
    })
}

export const getItemsClear = () => async (dispatch) => {
    dispatch({
        type: types.USER_GET_ITEMS_CLEAR,
        payload: []
    })
}

export const getRestaurantItemsClear = () => async (dispatch) => {
    dispatch({
        type: types.USER_GET_RESTAURANT_ITEM_CLEAR,
        payload: []
    })
}

export const cartItemsClear = () => async (dispatch) => {
    dispatch({
        type: types.CART_DELETE,
        payload: []
    })
}

export const addToCartItems = (obj) => async (dispatch) => {
    // console.log("addToCartItems", obj)
    dispatch({
        type: types.ADD_TO_CART,
        payload: obj
    })
}

export const addcardQuantity = (obj) => async (dispatch) => {
    // console.log("addQUanity", obj)
    dispatch({
        type: types.ADD_QUANTITY,
        payload: obj
    })
}

export const minuscardQuantity = (obj) => async (dispatch) => {
    // console.log("minuscardQuantity", obj)
    dispatch({
        type: types.MINUS_QUANTITY,
        payload: obj
    })
}

export const restInfo = (obj) => async (dispatch) => {
    dispatch({
        type: types.RESTAURANT_INFO,
        payload: obj
    })
}

export const restInfoClear = () => async (dispatch) => {
    dispatch({
        type: types.RESTAURANT_INFO_CLEAR,
        payload: []
    })
}


export const orderPlace = (userID, restaurantID, testRemark, paymentMethod, totalAmt, location, lat, long, item) => async (dispatch) => {
    console.log(userID, restaurantID, testRemark, paymentMethod, totalAmt, location, lat, long, item)
    try {
        const response = await axios.post(`${deploy_API}/api/orders/create`, {
            user_id: userID,
            restaurant_id: restaurantID,
            order_remarks: testRemark,
            order_payment_method: paymentMethod,
            order_price: totalAmt,
            order_location: location,
            order_latitude: lat,
            order_longitude: long,
            items: item
        });
        console.log(response.data)
        if (response.data.status) {
            console.log("ORDER PLACE", response.data.status)
            dispatch({
                type: types.ORDER_PLACE,
                payload: {
                    order: response.data.status,
                    data: response.data.data,
                }

            })
        } else {
            showMessage({
                message: "Warning",
                description: response.data.msg,
                type: "warning",
            });
            dispatch({
                type: types.ORDER_PLACE_ERROR,
                payload: {
                    order: response.data.status,
                    data: null
                }
            })
        }
    }
    catch (err) {
        dispatch({
            type: types.ORDER_PLACE_ERROR,
            payload: []
        })
        showMessage({
            message: "Error",
            description: "Network Error",
            type: "danger",
        });
    }
}
// userID, restaurantID, testRemark, paymentMethod, totalAmt, location, lat, long, item

// {
//     "data":{
//        "assigned_to":0,
//        "order_created_at":"2021-11-18T06:06:23.000Z",
//        "order_id":3,
//        "order_is_deleted":0,
//        "order_latitude":"24.3156",
//        "order_location":"Karachi",
//        "order_longitude":"60.1614564",
//        "order_payment_method":"1",
//        "order_price":"200",
//        "order_remarks":"test remarks",
//        "order_status":2,
//        "restaurant_id":1,
//        "user_id":4
//     },
//     "msg":"Order details fetched successfully",
//     "status":true
//  }
// orderDetails(userID)
// acceptOrderDetails(userID)
// ni use karna
export const orderDetails = (userID) => async (dispatch) => {

    try {
        const response = await axios.get(`${deploy_API}/api/orders/getuserorderdetails?user_id=${userID}`)
        console.log(response.data, "========ORDER_PLACE==========/api/orders/getuserorderdetails?user_id=============orderDetails========")
        if (response.data.status) {
            // alert("SAD")
            if(response.data.data.order_status == 1){
                dispatch({
                    type: types.ORDER_PLACE_ERROR,
                    payload: {
                        data: null,
                        order: false
                    }
                })
            }else{
                dispatch({
                    type: types.ORDER_PLACE,
                    payload: {
                        data: response.data.data,
                        order: response.data.status
                    }
                })
            }
        } else {
            dispatch({
                type: types.ORDER_PLACE_ERROR,
                payload: {
                    data: null,
                    order: false
                }
            })
        }
    }
    catch (err) {
        console.log(err)
        dispatch({
            type: types.ORDER_PLACE_ERROR,
            payload: {
                data: null,
                order: false
            }
        })
    }
}

// export const orderDetailsInFunctionComponent = (response) => async (dispatch) => {
//     if(response.data.status){
//     dispatch({
//         type: types.ORDER_PLACE,
//         payload: {
//             data: response.data.data,
//             order: response.data.status
//         }
//     })
//     }   
// }

export const acceptOrderDetails = (user_id) => async (dispatch) => {

    try {
        const response = await axios.get(`${deploy_API}/api/orders/getclientorderdetails?user_id=${user_id}`)
        console.log(response.data, "=========acceptOrderDetails======/api/orders/getclientorderdetails?order_id======----------------------------------------------------------------------------------------------------------------------------------=======ORDER_ACCEPT_DATA=====")
        
        if (response.data.status) {
            // alert("SAD")
            dispatch({
                type: types.ORDER_ACCEPT_DATA,
                payload: {
                    data: response.data.data,
                    order: response.data.status
                }
            })
        } else {
            dispatch({
                type: types.ORDER_ACCEPT_ERROR,
                payload: {
                    data: null,
                    order: false
                }
            })
        }
    }
    catch (err) {
        console.log(err)
        dispatch({
            type: types.ORDER_ACCEPT_ERROR,
            payload: {
                data: null,
                order: false
            }
        })
    }
}

export const firebaseCoordsRider = (data) => async (dispatch) => {

    try {
        dispatch({
            type: types.RIDERCOORDS,
            payload: {
                data: data,
                condition: true
            }
        })
    }
    catch (err) {
        console.log(err)
        dispatch({
            type: types.RIDERCOORDS_ERROR,
            payload: {
                data: data,
                condition: false
            }
        })
    }
}


export const orderDataClear = () => async (dispatch) => {

    dispatch({
        type: types.ORDER_ACCEPT_DATA,
        payload: {
            data: null,
            order: null
        }
    })
}

export const orderPlaceDataClear = () => async (dispatch) => {
    dispatch({
        type: types.ORDER_PLACE,
        payload: {
            data: null,
            order: false
        }
    })
}

export const saveNavigatorVariable = (nav) => async (dispatch) => {
    // console.log(nav, "============================================")
    dispatch({
        type: types.NAV,
        payload: {
            navigation: nav
        }
    })
}

export const firebaseMessageData = (data) => async (dispatch) => {
    dispatch({
        type: types.FIREBASEDATA,
        payload: {
            data: data
        }
    })
}