import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  FlatList,
  ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextSample from '../../Components/Text';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CartItmes from '../../Components/CartItems';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TouchableOpacityBtn from '../../Components/TouchableOpacity';
import Feather from 'react-native-vector-icons/Feather'
import * as actions from '../../Store/Actions/'
import {connect} from "react-redux";
import { TouchableRipple } from 'react-native-paper';
import TextInputFeild from '../../Components/TextFeild';
import { RadioButton } from 'react-native-paper';
import ReceiptScreen from './ReceiptScreen'
const OrderCartProcess = ({navigation, route, props, userAddToCart,userLocations, userSearchApply,userCreditCardDetail,restaurantInfo,orderPlace,placeOrderStatus,userLatitudeLongitude,userLogin,cartItemsClear}) => {
    // console.log(userAddToCart)
    const [stepOne, onChangeStepOne] = useState(true)
    const [stepTwo, onChangeStepTwo] = useState(false)
    const [stepThree, onChangeStepThree] = useState(false)
    const [stepFour, onChangeStepFour] = useState(false)
    const [data, onChangeData] = useState(null)
    const [checked, setChecked] = useState('');
    const [location, onChangeLocation ] = useState('')
    const [address, onChangeAddress ] = useState('')
    const [streetNo, onChangeStreetNo ] = useState('')
    const [nearPlace, onChangeNearPlace ] = useState('')
    const [loading, onLoadingChange] = useState(true)
    const [totalAmt, onChangeTotalAmt] = useState(0)
    const [item, onChangeItem] = useState(null)
    const [restaurantInformation, onChangeRestaurantInfo] = useState(null)
    const [userID, onChangeUserID] = useState(null)
    const [onClick, onChangeOnClick] = React.useState(false);

    useEffect(()=>{
      // console.log(userLogin, "MINHAL PAGAL")
      userGet()
      if(userCreditCardDetail){
        // console.log("ASD")
        onChangeData(userCreditCardDetail)
      }
    },[userCreditCardDetail])

    useEffect(()=>{
      console.log(placeOrderStatus, "ORDERCARTPROCESS")
      if(placeOrderStatus?.order){
        onChangeOnClick(false)
        cartItemsClear()
        navigation.navigate('ProcessStack')
        // console.log("MINHAL PAGAL")
      }else{
        onChangeOnClick(placeOrderStatus.order)
      }
    },[placeOrderStatus])

    useEffect(()=>{
      var array = []
      var pesa = []
      // console.log(array)
      for(let i=0; i<userAddToCart.length; i++)
      {
        var obj  = userAddToCart[i]
        let item = {
          "item_id": obj.itemId,
          "item_qty": obj.qty,
          "item_name": obj.title
        }
        pesa.push(obj.qty * obj.price)
        
        array.push(item)
      }
      let val = pesa.reduce((a, b) => a + b, 0)
      onChangeTotalAmt(val)
      onChangeItem(array)
      console.log(pesa.reduce((a, b) => a + b, 0), 'Total AMT')
      if(restaurantInfo){
        console.log(restaurantInfo, "restaurantInfo")
        onChangeRestaurantInfo(restaurantInfo)
      }
    },[])

    

    useEffect(()=>{     
      if(userLocations.PlaceName == undefined){
        onChangeLocation('undefine')
      }else{
        onChangeLocation(userLocations.PlaceName)
      }
      if(userSearchApply.testing != "abc"){
          // console.log(userSearchApply, "Yaha")
          onChangeLocation(userSearchApply.PlaceName)
      }
      onLoadingChange(false)
  },[userLocations, userSearchApply])

    const Back = () => {
        // if(stepOne){
        //   navigation.navigate('cartScreen')
        // }
        if(stepTwo && !stepThree){
          onChangeStepTwo(false)
        }

        if(stepThree && !stepFour){
          onChangeStepThree(false)
        }

        if(stepFour){
          onChangeStepFour(false)
        }
    }

    const Next = () => {
        if(stepOne){
          onChangeStepTwo(true)
        }

        if(stepTwo){
            onChangeStepThree(true)
        }

        if(stepThree){
          onChangeStepFour(true)
      }
        
    }

    const Previous = () => {
      if(stepOne){
          navigation.navigate('cartScreen')
      }
    }
    const PlaceOrder = () => {
      onChangeOnClick(true)
      var paymentMethod;
      if(checked == "Card"){
        paymentMethod = 0
      }

      if(checked == "Cash"){
        paymentMethod = 1
      }
      const testRemark = "TEST REMARK"
      // console.log(userID, restaurantInformation.restaurantID, testRemark, paymentMethod, totalAmt, location, userLatitudeLongitude.lat, userLatitudeLongitude.long, item)
      orderPlace(userID, restaurantInformation.restaurantID, testRemark, paymentMethod, totalAmt, location, userLatitudeLongitude.lat, userLatitudeLongitude.long, item)
    }

    const userGet = async ()  => {
      let Token = await AsyncStorage.getItem('token', (err, value) => {
        if (err) {
            console.log(err)
        } else {
          const va = JSON.parse(value) // boolean false
          if(va){
  
            console.log("USER INFORMATION",va.user_id)
            // const userID = va.user_id
            onChangeUserID(va.user_id)
          }
        }
      });
  
    }
return (

    <View style={styles.container}>
            <StatusBar translucent backgroundColor="#f54749" />
       
            <View style={{width: '100%', height: 160, top: 20, position:'absolute'}}>
                <View style={{flexDirection:'row', justifyContent:'center', alignSelf:'center', alignItems:'center', height: 150}}>
                    <View style={!stepOne ? styles.circle: styles.afterCirle}>
                          <Ionicons name="md-checkmark" style={{}} size={25} color={!stepOne ? '#f54749' : 'white'} />
                    </View>
                    <View style={{width: 30, height: 4, backgroundColor:'#f54749'}} />
                    <View style={!stepTwo ? styles.circle: styles.afterCirle}>
                          <Ionicons name="md-location-sharp" style={{}} size={25} color={!stepTwo ? '#f54749' : 'white'} />
                    </View>
                    <View style={{width: 30, height: 4, backgroundColor:'#f54749'}} />
                    <View style={!stepThree ? styles.circle: styles.afterCirle}>
                          <Ionicons name="md-card-outline" style={{}} size={25} color={!stepThree ? '#f54749' : 'white'} />
                    </View>
                    <View style={{width: 30, height: 4, backgroundColor:'#f54749'}} />
                    <View style={!stepFour ? styles.circle: styles.afterCirle}>
                          <Ionicons name="md-checkmark-done-outline" style={{}} size={25} color={!stepFour ? '#f54749' : 'white'} />
                    </View>
                </View>
            </View>
           
            <View style={{justifyContent:'space-around', flexDirection:'column', alignItems:'center',width:'100%',}}>
            <View style={{
                  width: '90%',
                  height: 180,
                  justifyContent:'center',
                  alignSelf:'center',
                  }}/>

            <View style={{
                  width: '100%',
                  height:'70%',
                  alignSelf:'center',
                  
                  // borderWidth: 1,
                  // backgroundColor:'red'
              }}>

              {
                stepOne && !stepTwo && !stepThree && !stepFour ?
                <View style={{justifyContent:'flex-start', padding: 10, flexDirection:'column', alignItems:'flex-start',}}>
                  <TextSample 
                              Label="Location Details" 
                              Color="black" 
                              Size={hp("4%")} 
                              TextAlign='left'
                              NumberOfLines={1} 
                              Font="Overpass-ExtraBold"
                              TextDecorationLine='none'
                              TextTransform='none'
                  />
                  <View style={{justifyContent:'space-around', alignItems:'center', flexDirection:'column', height: 240, alignSelf:'center'}}>

                    <View style={{width: '96%', height: 50, flexDirection:'row', justifyContent:'flex-start', alignItems:'center', borderBottomWidth: 2, borderColor: 'black', alignSelf:'center' }}>
                          <Ionicons name="ios-location-outline" style={{}} size={22} color='black' />
                          <TextInputFeild
                              placeholder=" Location"
                              value={location}
                              onchange={onChangeLocation}
                              keyboardType='default'
                              secureTextEntry={false}
                              Color='black'
                          />
                    </View>
                    <View style={{width: '96%', height: 50, flexDirection:'row', justifyContent:'flex-start', alignItems:'center', borderBottomWidth: 2, borderColor: 'black', alignSelf:'center' }}>
                          <Ionicons name="md-home-outline" style={{}} size={22} color='black' />
                          <TextInputFeild
                              placeholder=" Address"
                              value={address}
                              onchange={onChangeAddress}
                              keyboardType='default'
                              secureTextEntry={false}
                              Color='black'
                          />
                    </View>
                    <View style={{width: '96%', height: 50, flexDirection:'row', justifyContent:'flex-start', alignItems:'center', borderBottomWidth: 2, borderColor: 'black', alignSelf:'center' }}>
                          <MaterialIcons name="edit-road" style={{}} size={22} color='black' />
                          <TextInputFeild
                              placeholder=" Street #"
                              value={streetNo}
                              onchange={onChangeStreetNo}
                              keyboardType='default'
                              secureTextEntry={false}
                              Color='black'
                          />
                    </View>
                    <View style={{width: '96%', height: 50, flexDirection:'row', justifyContent:'flex-start', alignItems:'center', borderBottomWidth: 2, borderColor: 'black', alignSelf:'center' }}>
                          <Ionicons name="ios-pin-outline" style={{}} size={22} color='black' />
                          <TextInputFeild
                              placeholder="Near Place"
                              value={nearPlace}
                              onchange={onChangeNearPlace}
                              keyboardType='default'
                              secureTextEntry={false}
                              Color='black'
                          />
                    </View>
                  </View>
                </View>:
                stepTwo && !stepThree && !stepFour ?
                <View style={{justifyContent:'flex-start', padding: 10, flexDirection:'column', alignItems:'flex-start', height:330}}>
                      <TextSample 
                              Label="Payment Method" 
                              Color="black" 
                              Size={hp("4%")} 
                              TextAlign='left'
                              NumberOfLines={1} 
                              Font="Overpass-ExtraBold"
                              TextDecorationLine='none'
                              TextTransform='none'
                  />
                  <View style={{width:'100%', height: 300}}>
                  <View style={{flexDirection:'column', alignItems:'flex-start', padding: 5, justifyContent:'space-between', height: 210}}>
                  <TextSample 
                              Label="Choose desired payment card" 
                              Color="grey" 
                              Size={hp("2%")} 
                              TextAlign='left'
                              NumberOfLines={1} 
                              Font="Overpass-Bold"
                              TextDecorationLine='none'
                              TextTransform='none'
                  />
                  {
                    data != null ?
                    <View style={{ height: 100, width: '100%'}}>
                      <TouchableOpacity   onPress={() => setChecked('Card')}>
                        <View style={{
                          flexDirection:'row',
                          alignItems:'center',
                          height: 60, borderRadius: 12,
                          width:'100%',
                          borderColor:'grey',
                          borderWidth:1,
                          paddingLeft: 5,
                          justifyContent:'space-between'
                        }}>
                          <FontAwesome name="credit-card" style={{}} size={32} color='#f54749'/>
                          <View style={{flexDirection:'column', alignItems:'flex-start', alignSelf:'center', width: 200, height: 50}}>
                          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between',alignSelf:'center'}}>
                          <TextSample 
                                      Label={data.card.brand}
                                      Color="black" 
                                      Size={hp("2.5%")} 
                                      TextAlign='left'
                                      NumberOfLines={1} 
                                      Font="Overpass-Bold"
                                      TextDecorationLine='none'
                                      TextTransform='none'
                          />
                          <TextSample 
                                      Label={'Expires '+ data.card.expMonth+"/"+data.card.expYear}
                                      Color="grey" 
                                      Size={hp("1.8%")} 
                                      TextAlign='left'
                                      NumberOfLines={1} 
                                      Font="Overpass-Regular"
                                      TextDecorationLine='none'
                                      TextTransform='none'
                          />
                          </View>
                        <TextSample 
                                    Label={'**** **** **** '+ data.card.last4}
                                    Color="grey" 
                                    Size={hp("1.8%")} 
                                    TextAlign='left'
                                    NumberOfLines={1} 
                                    Font="Overpass-Regular"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                        />
                        </View>
                        <RadioButton
                            value="Card"
                            color='#f54749'
                            status={ checked === 'Card' ? 'checked' : 'unchecked' }
                            // onPress={() => setChecked('first')}
                            disabled
                          />
                        </View>
                        </TouchableOpacity>
                    </View>: null
                  }
 
                  <View style={{alignSelf:'center', height: 100}}>
                  <TouchableOpacityBtn  
                                          onPress={()=> navigation.navigate('paymentcard')}
                                          title="Add Card"
                  />
                  </View>
                  </View>
                  <View style={{
                        justifyContent:'flex-start', 
                        flexDirection:'column', alignItems:'flex-start', 
                        bottom: 0, position:'absolute', width:'100%', 
                        alignSelf:'flex-start', padding: 5, height: 90
                    }}>
                  <TextSample 
                              Label="Current method" 
                              Color="grey" 
                              Size={hp("2%")} 
                              TextAlign='left'
                              NumberOfLines={1} 
                              Font="Overpass-Bold"
                              TextDecorationLine='none'
                              TextTransform='none'
                  />
               
                  <TouchableOpacity style={{ height: 100, width: '100%'}}    onPress={() => setChecked('Cash')}>
                  <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    height: 60, borderRadius: 12,
                    width:'100%',
                    borderColor:'grey',
                    borderWidth:1,
                    paddingLeft: 5,
                    justifyContent:'space-between'
                  }}>
                    <Ionicons name="cash-outline" style={{}} size={32} color='#f54749'/>
                    <View style={{flexDirection:'column', alignItems:'flex-start', alignSelf:'center', width: 200, height: 50}}>
                    <TextSample 
                              Label="Cash Payment" 
                              Color="black" 
                              Size={hp("2.5%")} 
                              TextAlign='left'
                              NumberOfLines={1} 
                              Font="Overpass-Bold"
                              TextDecorationLine='none'
                              TextTransform='none'
                      />
                      <TextSample 
                                  Label="Default method" 
                                  Color="grey" 
                                  Size={hp("1.8%")} 
                                  TextAlign='left'
                                  NumberOfLines={1} 
                                  Font="Overpass-Regular"
                                  TextDecorationLine='none'
                                  TextTransform='none'
                      />
                  </View>
                  <RadioButton
                      value="Cash"
                      color='#f54749'
                      status={ checked === 'Cash' ? 'checked' : 'unchecked' }
                      // onPress={() => setChecked('first')}
                      disabled
                    />
                  </View>
                  </TouchableOpacity>
                
                  </View>
                    {/* <RadioButton
                      value="second"
                      color='#f54749'
                      status={ checked === 'second' ? 'checked' : 'unchecked' }
                      onPress={() => setChecked('second')}
                    /> */}

                  </View>
                </View>:
                stepTwo && stepThree && !stepFour  ?
                <View  style={{ 
                                justifyContent:'flex-start',
                                padding: 10, flexDirection:'column', 
                                alignItems:'flex-start', height:340, 
                                width:'90%', 
                                // elevation: 9999, zIndex: 999,
                                // borderWidth: 0,
                                alignSelf:'center'
                                // borderRadius:12,backgroundColor:'red'

                              }}>
                  <View style={{borderColor:'black', borderStyle:'dashed', borderWidth: 1, borderRadius: 50, width:'100%'}}/>
                  <View style={{alignSelf:'center'}}>
                  <TextSample 
                              Label="Order Receipt" 
                              Color="black" 
                              Size={hp("4%")} 
                              TextAlign='left'
                              NumberOfLines={1} 
                              Font="Overpass-ExtraBold"
                              TextDecorationLine='none'
                              TextTransform='none'
                  />
                  </View>
                  <View style={{borderColor:'black', borderStyle:'dashed', borderWidth: 1, borderRadius: 50, width:'100%',}}/>
                
                  <View style={{justifyContent:'flex-start', alignItems:'center', flexDirection:'column'}}>

                  <TextSample 
                              Label={restaurantInformation.title}
                              Color="black" 
                              Size={hp("3%")} 
                              TextAlign='left'
                              NumberOfLines={1} 
                              Font="Overpass-Regular"
                              TextDecorationLine='none'
                              TextTransform='none'
                  />
                  </View>

                  <View style={{flexDirection:'column', alignItems:'flex-start', alignSelf:'flex-start', justifyContent:'space-between',}}>
                  <TextSample 
                              Label={'Restaurant Address: '}
                              Color="black" 
                              Size={hp("2%")} 
                              TextAlign='left'
                              NumberOfLines={1} 
                              Font="Overpass-Regular"
                              TextDecorationLine='none'
                              TextTransform='none'
                  />
                  {/* <View style={{width:'40%'}}> */}
                  {console.log(restaurantInformation)}
                    <TextSample 
                                Label={restaurantInformation.address}
                                Color="grey" 
                                Size={hp("2%")} 
                                TextAlign='left'
                                NumberOfLines={3} 
                                Font="Overpass-Regular"
                                TextDecorationLine='none'
                                TextTransform='none'
                    />
                  {/* </View> */}
                  </View>
                  
                  
                  <View style={{flexDirection:'column', alignItems:'flex-start', alignSelf:'flex-start', justifyContent:'space-between'}}>
                  <TextSample 
                              Label={'Drop Off Location:  '}
                              Color="black" 
                              Size={hp("2%")} 
                              TextAlign='left'
                              NumberOfLines={1} 
                              Font="Overpass-Regular"
                              TextDecorationLine='none'
                              TextTransform='none'
                  />
                  {/* <View style={{width:'60%'}}> */}
                  <TextSample 
                              Label={location}
                              Color="grey" 
                              Size={hp("2%")} 
                              TextAlign='left'
                              NumberOfLines={3} 
                              Font="Overpass-Regular"
                              TextDecorationLine='none'
                              TextTransform='none'
                  />
                  {/* </View> */}
                  </View>

                  <View style={{flexDirection:'row', alignItems:'center', alignSelf:'flex-start', justifyContent:'space-between'}}>
                  <TextSample 
                              Label={'Tel:  '}
                              Color="black" 
                              Size={hp("2%")} 
                              TextAlign='left'
                              NumberOfLines={1} 
                              Font="Overpass-Regular"
                              TextDecorationLine='none'
                              TextTransform='none'
                  />
                  <TextSample 
                              Label={restaurantInformation.phone}
                              Color="grey" 
                              Size={hp("2%")} 
                              TextAlign='left'
                              NumberOfLines={1} 
                              Font="Overpass-Regular"
                              TextDecorationLine='none'
                              TextTransform='none'
                  />
                  </View>
                  <View style={{flexDirection:'row', alignItems:'center', alignSelf:'flex-start', justifyContent:'space-between'}}>
                  <TextSample 
                              Label={'Payment Method:  '}
                              Color="black" 
                              Size={hp("2%")} 
                              TextAlign='left'
                              NumberOfLines={1} 
                              Font="Overpass-Regular"
                              TextDecorationLine='none'
                              TextTransform='none'
                  />
                  <TextSample 
                              Label={checked}
                              Color="grey" 
                              Size={hp("2%")} 
                              TextAlign='left'
                              NumberOfLines={1} 
                              Font="Overpass-Regular"
                              TextDecorationLine='none'
                              TextTransform='none'
                  />
                  
                  </View>
                  <ReceiptScreen />
                  <View style={{width:'100%', justifyContent:'space-between', flexDirection:'row', alignSelf:'flex-end', marginTop: 10}}>
                  <TextSample 
                              Label={"Subtotal"}
                              Color="black" 
                            Size={hp("2%")} 
                            // TextAlign='left'
                            NumberOfLines={3} 
                            Font="Overpass-Regular"
                            TextDecorationLine='none'
                            TextTransform='none'
                  />
                  <TextSample 
                              Label={totalAmt}
                              Color="black" 
                            Size={hp("2%")} 
                            // TextAlign='left'
                            NumberOfLines={3} 
                            Font="Overpass-Regular"
                            TextDecorationLine='none'
                            TextTransform='none'
                  />
                  </View>
                  <View style={{width:'100%', justifyContent:'space-between', flexDirection:'row', alignSelf:'flex-end', marginTop: 0}}>
                  <TextSample 
                              Label={"Sales Tax 6.25%"}
                              Color="black" 
                            Size={hp("2%")} 
                            // TextAlign='left'
                            NumberOfLines={3} 
                            Font="Overpass-Regular"
                            TextDecorationLine='none'
                            TextTransform='none'
                  />
                  <TextSample 
                              Label={"9.02"}
                              Color="black" 
                            Size={hp("2%")} 
                            // TextAlign='left'
                            NumberOfLines={3} 
                            Font="Overpass-Regular"
                            TextDecorationLine='none'
                            TextTransform='none'
                  />
                  </View>
                </View>
                :
                null
              }
    
              <View style={{
              width: '100%',
              height: 150,
              justifyContent:'space-between',
              alignItems:'center',
              alignSelf:'center',
              flexDirection:'row',
    
            }}>
            {
              stepTwo ?
            
            <TouchableOpacity style={{
              width: 130, height: 40, 
              alignItems:'center', 
              flexDirection:'row', 
              alignSelf:'center',
              justifyContent:'flex-end', 
              backgroundColor:'#f54749', 
              paddingRight: 10, 
              marginTop: 5,borderTopRightRadius: 25,
              borderBottomRightRadius: 25,
              top: 10
              
            }} onPress={Back}>
            <View style={{
              alignItems:'center', 
              flexDirection:'row', 
              paddingRight: 10, 
              }}>
                    <Ionicons name="chevron-back" style={{}} size={20} color='white' />
                    <TextSample 
                                    Label="Back" 
                                    Color="white" 
                                    Size={hp("2%")} 
                                    TextAlign='left'
                                    NumberOfLines={1} 
                                    Font="Overpass-Bold"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                    />
            </View>
            </TouchableOpacity>: 
             <TouchableOpacity style={{
              width: 130, height: 40, 
              alignItems:'center', 
              flexDirection:'row', 
              alignSelf:'center',
              justifyContent:'flex-end', 
              backgroundColor:'#f54749', 
              paddingRight: 10, 
              marginTop: 5,borderTopRightRadius: 25,
              borderBottomRightRadius: 25,
              top: 10
              
            }} onPress={Previous}>
            <View style={{
              alignItems:'center', 
              flexDirection:'row', 
              paddingRight: 10, 
              }}>
                    <Ionicons name="chevron-back" style={{}} size={20} color='white' />
                    <TextSample 
                                    Label="Edit Cart" 
                                    Color="white" 
                                    Size={hp("2%")} 
                                    TextAlign='left'
                                    NumberOfLines={1} 
                                    Font="Overpass-Bold"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                    />
            </View>
            </TouchableOpacity>
            }
            {

            stepOne && !stepTwo && !stepThree && !stepFour ?
            <TouchableOpacity style={{
              width: 130, height: 40, 
              alignItems:'center', 
              flexDirection:'row', 
              alignSelf:'center',
              justifyContent:'flex-start', 
              backgroundColor:'#f54749', 
              paddingLeft: 10, 
              marginTop: 5,borderTopLeftRadius: 25,
              borderBottomLeftRadius: 25,
              top: 10
              
            }} onPress={Next}>
            <View style={{
              alignItems:'center', 
              flexDirection:'row', 
              paddingLeft: 10, 
              }}>
                    <TextSample 
                                    Label="Next" 
                                    Color="white" 
                                    Size={hp("2%")} 
                                    TextAlign='left'
                                    NumberOfLines={1} 
                                    Font="Overpass-Bold"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                    />
                      <Ionicons name="chevron-forward" style={{}} size={20} color='white' />
            </View>
            </TouchableOpacity>
           : 
            stepTwo && !stepThree && !stepFour ?
            <TouchableOpacity style={{
              width: 130, height: 40, 
              alignItems:'center', 
              flexDirection:'row', 
              alignSelf:'center',
              justifyContent:'flex-start', 
              backgroundColor:'#f54749', 
              paddingLeft: 10, 
              marginTop: 5,borderTopLeftRadius: 25,
              borderBottomLeftRadius: 25,
              top: 10
              
            }} onPress={Next}>
            <View style={{
              alignItems:'center', 
              flexDirection:'row', 
              paddingLeft: 10, 
              }}>
                    <TextSample 
                                    Label="Next" 
                                    Color="white" 
                                    Size={hp("2%")} 
                                    TextAlign='left'
                                    NumberOfLines={1} 
                                    Font="Overpass-Bold"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                    />
                      <Ionicons name="chevron-forward" style={{}} size={20} color='white' />
            </View>
            </TouchableOpacity>
            :
            <TouchableOpacity style={{
              width: 130, height: 40, 
              alignItems:'center', 
              flexDirection:'row', 
              alignSelf:'center',
              justifyContent:'flex-start', 
              backgroundColor:'#f54749', 
              paddingLeft: 10, 
              marginTop: 5,borderTopLeftRadius: 25,
              borderBottomLeftRadius: 25,
              top: 10
              
            }} onPress={PlaceOrder}>
              {
                !onClick ?
                <View style={{
                  alignItems:'center', 
                  flexDirection:'row', 
                  paddingLeft: 10, 
                  }}>
                        <TextSample 
                                        Label="Place Order" 
                                        Color="white" 
                                        Size={hp("2%")} 
                                        TextAlign='left'
                                        NumberOfLines={1} 
                                        Font="Overpass-Bold"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                        />
                          <Ionicons name="chevron-forward" style={{}} size={20} color='white' />
                </View>:
            <View style={{ justifyContent:'center', width:'100%'}}>
            <ActivityIndicator size='small' color="white" />
            </View>
            }
            </TouchableOpacity>
            }
            </View>

            </View>




            <View style={{
              width: '90%',
              height: 100,
              justifyContent:'center',
              alignSelf:'center'
            }}/>


            
          </View>
        
    </View>

  );
};




function mapStateToProps({userAddToCart,userLocations, userSearchApply,userCreditCardDetail,restaurantInfo,placeOrderStatus,userLatitudeLongitude,userLogin}){
  return { userAddToCart,userLocations, userSearchApply,userCreditCardDetail,restaurantInfo,placeOrderStatus,userLatitudeLongitude,userLogin}
}

export default connect(mapStateToProps,actions)(OrderCartProcess)
// export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    backgroundColor:'white',
  },
  circle:{
    width: 50, height: 50, borderRadius: 50, borderWidth: 3, borderColor:'#f54749', backgroundColor:'white', alignItems:'center',justifyContent:'center'
  },
  afterCirle:{
    width: 50, height: 50, borderRadius: 50, borderWidth: 3, borderColor:'#f54749', backgroundColor:'#f54749', alignItems:'center',justifyContent:'center'
  }
});
