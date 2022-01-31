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
            // console.log(response.data)
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
            // console.log(location.data)
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

export const loginUser = (email, password, navigation) => async (dispatch) => {
    try {
        console.log(email, password)
        const response = await axios.post(`${deploy_API}/client/login`, {
            email: email,
            password: password
        })
        console.log(response.data, "=====================================================================================================")
        if (response.data.status) {
            dispatch({
                type: types.AUTH_LOGGED_IN,
                payload: response.data.data,
            })
            const user = JSON.stringify(response.data.data)
            await AsyncStorage.setItem('token', user)
        } else {
            // console.log(response.data.msg)
            if(response.data.msg == "Please verify your account"){
                showMessage({
                    message: "WARNING",
                    description: "Your account has not verified, Please verify your account",
                    type: "warning",
                });
                dispatch({
                    type: types.OTP_VERIFY,
                    payload: {
                        data: response.data.data,
                    },
                })
                navigation.navigate('otpverify')
            }else{
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
            dispatch({
                type: types.AUTH_LOGGING_IN_ERROR,
                payload: {
                    userLogin: false,
                },
            })
        }
    } catch (error) {
        // console.log(error, "[Error: Network Error]")
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

export const verifyOtp = (number, code) => async (dispatch) => {
    console.log(code, "SADASDASD")
    try{
        const responseVerify = await axios.post(`${deploy_API}/client/verify`, {
            phone: code.user_phone,
            verification_code: number
        })
        console.log(responseVerify.data.msg)
        if (responseVerify.data.msg === "Verified successfully") {
            const user = JSON.stringify(responseVerify.data.data)
            await AsyncStorage.setItem('token', user)
            // await AsyncStorage.setItem('token', responseVerify.data.data)
            dispatch({
                type: types.AUTH_OTP_VERIFY,
                payload: {
                    data: responseVerify.data.data
                },
            })
            showMessage({
                message: "Success",
                description: "Verified successfully!!!",
                type: "success",
            });
            // fadeChange()
        } else {
            alert("otp error")
        }
    }catch(err){
        
    }
}

export const Otp = (otp, number, fadeChange) => async (dispatch) => {
    try {
        // console.log(otp, number)
        if (otp != null) {
            const responseVerify = await axios.post(`${deploy_API}/client/verify`, {
                phone: number,
                verification_code: otp
            })
            // (`${deploy_API}/client/verify`, {
            //     phone: number,
            //     verification_code: otp
            // })
            console.log(responseVerify.data.msg)
            if (responseVerify.data.msg === "Verified successfully") {
                dispatch({
                    type: types.AUTH_OTP_VERIFY,
                    payload: {
                        data: responseVerify.data.data
                    },
                })
                showMessage({
                    message: "Success",
                    description: "Verified successfully!!!",
                    type: "success",
                });
                // fadeChange()
            } else {
                alert("otp error")
            }
        } else {
            // console.log(number)
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
                showMessage({
                    message: "Success",
                    description: "Verification is sent!!",
                    type: "success",
                });
            } else {
                showMessage({
                    message: "Error",
                    description: "OTP Error",
                    type: "error",
                });
            }
        }
    }
    catch (err) {
        console.log(err)
    }
}


export const consoleFunc = () => async (dispatch) => {
    // console.log("Test by roshaan")
}

export const SignUpStepOne = (name, email, password, confirmPassword, mobileNumber, fadeChange, onChangeError) => async (dispatch) => {
    // console.log(email, password, confirmPassword, mobileNumber)
    try {
        const data = {
            user_name: name,
            email: email,
            password: password,
            confirm_password: confirmPassword,
            phone: mobileNumber,
        }
        const response = await axios.post(`${deploy_API}/client/register`, data);
        // console.log(response.data)
        if (response.data.status) {
            fadeChange()
            dispatch({
                type: types.AUTH_SIGNUP,
                payload: response.data.msg
            })
            showMessage({
                message: "Success",
                description: "Account create successfully, Please wait for number verfication.",
                type: "success",
            });

        } else {
            // alert(response.data.msg)
            showMessage({
                message: "Warning",
                description: response.data.msg,
                type: "warning",
            });
            onChangeError(response.data.msg)
            dispatch({
                type: types.AUTH_ERROR,
                payload: null
            })
        }

    } catch (error) {
        onChangeError(error)
        // alert("error")
        console.log(error)
    }
};

export const SignOut = () => async (dispatch) => {
    console.log("sign out")
    try {

        // await AsyncStorage.removeItem('token')
        // await AsyncStorage.removeItem('userData')
        // await AsyncStorage.removeItem('userinformation')
        dispatch({
            type: types.AUTH_LOGOUT,
            payload: {}
        })
        dispatch({
            type: types.AUTH_OTP_VERIFY,
            payload: {
                data: null
            }
        })
        
        await AsyncStorage.clear()
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
        // console.log(userSignup.user_gender_interest, "-----")
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
        // console.log(response.data)
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

export const getReviews = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${deploy_API}/api/review/getreview`, {
            params: {
                restaurant_id: id
            }
        });
        if(response.data.status){
            dispatch({
                type: types.REVIEWS,
                payload: {
                    data: response.data.data,
                },
            })
        }
    }
    catch(err){
        console.log(err)
        dispatch({
            type: types.REVIEWS_EEROR,
            payload: {
                data: null,
            },
        })
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
            // console.log(placename)
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
        console.log(category.data.data, "getCategory")
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
    // console.log(id, "id")
    try {
        const items = await axios.get(`${deploy_API}/api/item/getclientitems`, {
            params: {
                category_id: id,
            }
        });
        console.log("=============================================",items.data.data, "=============================================")
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
        // console.log(response.data)
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
        console.log(response.data)
        // console.log(response.data, "========ORDER_PLACE==========/api/orders/getuserorderdetails?user_id=============orderDetails========")
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
                // alert("SAD")
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
        // console.log(response.data, "=========acceptOrderDetails======/api/orders/getclientorderdetails?order_id======----------------------------------------------------------------------------------------------------------------------------------=======ORDER_ACCEPT_DATA=====")
        // {"msg": "Your order is not assigned to any rider", "status": true}
        if (response.data.status) {
            // alert("SAD")
            if(response.data.msg == "Your order is not assigned to any rider"){
                dispatch({
                    type: types.ORDER_ACCEPT_ERROR,
                    payload: {
                        data: null,
                        order: false
                    }
                })
            }else{
                dispatch({
                    type: types.ORDER_ACCEPT_DATA,
                    payload: {
                        data: response.data.data,
                        order: response.data.status
                    }
                })
            }
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

export const getHistory = (id) => async (dispatch) => {

    try {
        const response = await axios.get(`${deploy_API}/api/orders/getorderhistorys?user_id=${id}`)
        console.log(response.data.data)

        if(response.data.status){
            dispatch({
                type: types.HISTORY,
                payload: {
                    data: response.data.data
                }
            })
        }else{
            dispatch({
                type: types.HISTORY_ERROR,
                payload: {
                    data: null
                }
            })
        }
    }
    catch (err) {
        console.log(err)
        dispatch({
            type: types.HISTORY_ERROR,
            payload: {
                data: null
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

export const orderPlaceDataEmpty = () => async (dispatch) => {
    dispatch({
        type: types.ORDER_PLACE_EMPTY,
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


export const getRestuarantByReviewAction = (ratting, navigation) => async (dispatch) => {
    try{
        const response = await axios.get(`${deploy_API}/api/search/rating?rating=${ratting}`)
        console.log(response.data.data)
        if(response.data.status){
            dispatch({
                type: types.SEARCHDATA,
                payload: {
                    data: response.data
                }
            })
            navigation.navigate('search')
        }
    }catch(eer){
        console.log(eer)
        showMessage({
            message: "Warning",
            description: "No record found",
            type: "warning",
        });
        dispatch({
            type: types.SEARCHDATA_ERROR,
            payload: {
                data: null
            }
        })
    }
}

export const getItemByRangeAction = (price1,price2, navigation) => async (dispatch) => {
    try{
//         {{base_url}}/api/search/food?min=22&max=55

// {{base_url}}/api/search/bev?min=12&max=55
        const response = await axios.get(`${deploy_API}/api/search/food?min=${price1}&max=${price2}`)
        console.log(response.data.data)
        if(response.data.status){
            dispatch({
                type: types.SEARCHDATAITEM,
                payload: {
                    data: response.data
                }
            })
            navigation.navigate('search')
        }
    }catch(eer){
        console.log(eer)
        showMessage({
            message: "Warning",
            description: "No record found",
            type: "warning",
        });
        dispatch({
            type: types.SEARCHDATAITEM_ERROR,
            payload: {
                data: null
            }
        })
    }
}

export const getItemByRangeActionB = (price1,price2, navigation) => async (dispatch) => {
    try{
//         {{base_url}}/api/search/food?min=22&max=55

// {{base_url}}/api/search/bev?min=12&max=55
        const response = await axios.get(`${deploy_API}/api/search/bev?min=${price1}&max=${price2}`)
        console.log(response.data.data)
        if(response.data.status){
            dispatch({
                type: types.SEARCHDATAITEM,
                payload: {
                    data: response.data
                }
            })
            navigation.navigate('search')
        }
    }catch(eer){
        console.log(eer)
        showMessage({
            message: "Warning",
            description: "No record found",
            type: "warning",
        });
        dispatch({
            type: types.SEARCHDATAITEM_ERROR,
            payload: {
                data: null
            }
        })
    }
}

export const clearRestaurant = () => async (dispatch) => {
    dispatch({
        type: types.SEARCHDATA_ERROR,
        payload: {
            data: null
        }
    })
}

export const clearItems = () => async (dispatch) => {
    dispatch({
        type: types.SEARCHDATAITEM_ERROR,
        payload: {
            data: null
        }
    })
}

export const forgetpassword = (email,navigation) => async (dispatch) => {
    try{
        console.log(email)
        const response = await axios.post(`${deploy_API}/client/forget-password`,{
            email: email,
        });
        if(response.data.msg == "Password reset instructions has been successfully sent"){
            navigation.navigate('forgotpasswordotp')
            showMessage({
                message: "Success",
                description: response.data.msg,
                type: "success",
            });
        }else{
            showMessage({
                message: "ERROR",
                description: response.data.msg,
                type: "danger",
            });
        }
    }catch(err){
        console.log(err)
        showMessage({
            message: "ERROR",
            description: "Request failed",
            type: "danger",
        });
    }
}


export const checkEmailOTP = (code,navigation) => async (dispatch) => {
    try{
        console.log(code)
        const response = await axios.post(`${deploy_API}/client/check-token`,{
            forget_hash: code,
        });
        if(response.data.success){
            navigation.navigate('changepassword')
            dispatch({
                type: types.FORGOTPASSWORD_OTP,
                payload: {
                    data: response.data.message
                }
            })
            showMessage({
                message: "Success",
                description: "Validation Successfully Completed!!!",
                type: "success",
            });
        }
        // navigation.navigate('changepassword')
    }catch(err){
        console.log(err)
        const response = await axios.post(`${deploy_API}/client/check-token`,{
            forget_hash: code,
        });
        dispatch({
            type: types.FORGOTPASSWORD_OTP_ERROR,
            payload: {
                data: null
            }
        })
        showMessage({
            message: "ERROR",
            description: "Request failed",
            type: "danger",
        });
    }
}

export const passwordChange = (password,navigation, hashed, email) => async (dispatch) => {
    try{
        const response = await axios.post(`${deploy_API}/client/create-password`,{
            password: password,
            confirmPassword: password,
            passwordHash: hashed,
            userEmail: email
        });
        if(response.data.success){
            navigation.navigate('login')
            showMessage({
                message: "Success",
                description: "Password Changed Successfully!!!",
                type: "success",
            });
        }else{
            showMessage({
                message: "ERROR",
                description: "Request failed",
                type: "danger",
            });
        }
        // console.log(password)
        // navigation.navigate('login')
    }catch(err){
        console.log(err)
        showMessage({
            message: "ERROR",
            description: "Request failed",
            type: "danger",
        });
    }
}






export const profileUpdated = (username, address, image, id) => async (dispatch) => {
    try{

        var bodyFormData = new FormData();
            bodyFormData.append('image',{
                uri:image.uri,
                name:image.fileName,
                type:image.type
            });
            bodyFormData.append('user_name', username);
            bodyFormData.append('user_address', address);
            bodyFormData.append('user_id', id);

        const response = await axios({
            method: "post",
            url: `${deploy_API}/api/user/updateuser`,
            data: bodyFormData,
            headers: { Accept: 'application/json',
                            "Content-Type": "multipart/form-data"
                        },
          })
        if(response.data.status){
            showMessage({
                message: "Profile Updated!!!",
                description: response.data.msg,
                type: "success",
            });
        }else{
            showMessage({
                message: "ERROR",
                description: response.data.msg,
                type: "danger",
            });
            
        }
        }catch(error){
            showMessage({
                message: "ERROR",
                description: "Network Error",
                type: "danger",
            }); 
        }
}