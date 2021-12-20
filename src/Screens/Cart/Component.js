import React, { useEffect,useState } from 'react';
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
  FlatList
} from "react-native";
import TextSample from '../../Components/Text';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CartItmes from '../../Components/CartItems';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TouchableOpacityBtn from '../../Components/TouchableOpacity';
import * as actions from '../../Store/Actions/'
import {connect} from "react-redux";
import { TouchableRipple } from 'react-native-paper';
import { showMessage, hideMessage } from "react-native-flash-message";
// import {STRIPE_KEY} from '@env';
// import {STRIPE_KEY} from 'react-native-dotenv'
import {StripeProvider,CardField, useStripe} from '@stripe/stripe-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreditCardDisplay from 'react-native-credit-card-display';

const Component = ({ stripeDetail,navigate}) => {
  const [amount, setAmount] = useState('');
  const [stripeToken, setStripeToken] = useState('');
  const {createToken} = useStripe();
  const [con, onSetCon] = useState(false)
  const [data, onChangeData] = useState(null);
  const _buyCredits = async () => {
    let newAmount = Number(amountInWallet) + Number(amount);
    if (amount === '' || stripeToken === '') {
      return;
    } else {
      console.log(amount,"----",stripeToken)
      axios.post('https://b982-110-93-244-255.ngrok.io/api/payment/pay', {
        amount: 10,
        stripeToken: "tok_1JZXZ1DTGrqq3ff6ekVt8g5R"
      })
      .then(function (response) {
        const {data, msg , status} = response.data;
        console.log(response.data);
      })
      // updateWallet(newAmount, stripeToken);
      // setIsShowAmountModal(false);
      // setAmount('');
      // setStripeToken('');
    }
  };

  const PaymentByCard = () =>
  {
    if(data){
      stripeDetail(data)
      navigate.pop()
    }
  }
return (
  
  
            
                  
       
            <View style={{
              height: 200, 
              width:'96%', justifyContent:'center', 
              alignItems:'center', alignSelf:'center', 
              borderColor: '#f54749',
              borderWidth: 1,
              borderRadius: 12,
              backgroundColor:'#e8e8e8'
              
              }}>
                 <View style={{top: -20, backgroundColor:'#28a745', width: '100%', alignItems:'center', flexDirection:'row', justifyContent:'center'}}>
                      {
                        con ? 
                        <>
                        <TextSample 
                                  Label="Information Verified  " 
                                  Color="white" 
                                  Size={hp("1.8%")} 
                                  TextAlign='left'
                                  NumberOfLines={1} 
                                  Font="Overpass-Regular"
                                  TextDecorationLine='none'
                                  TextTransform='none'
                        />
                        <MaterialIcons name="verified" style={{}} size={15} color='white' />
                        </>
                        :
                        null
                      }
                      </View>
                    <CardField
                        postalCodeEnabled={false}
                        placeholder={{
                          number: '**** **** **** ****',
                        }}
                     
                        cardStyle={{
                          backgroundColor: '#ffffff',
                          textColor: 'black',
                          // borderWidth: 1,
                          // borderColor: '#f54749',
                          // borderRadius: 5,
                          fontSize:14,
                          fontFamily:'Overpasss-Regular'
                        }}
                        style={{
                          width: '90%',
                          height: 50,
                          marginBottom: 10,
                          alignSelf: 'center',
                          backgroundColor: '#e8e8e8'
                        }}
                        onCardChange={(cardDetails) => {
                          // console.log('cardDetails', cardDetails.complete);
                          // console.log('cardDetails', cardDetails);
                          createToken(cardDetails).then(res => {
                            console.log(res);
                            // console.log(res.token)
                            if (res.token) {
                              onSetCon(true)
                              onChangeData(res.token)
                              setStripeToken(res.token.id);
                              showMessage({
                                message: "Success",
                                description: "Valid Information",
                                type: "success",
                              });
                            }
                            
                          });
                        }}
                        // onCardChange={cardDetails => {
                        //   setStripeToken('');
                        //   if (cardDetails.complete) {
                        //     createToken(cardDetails).then(res => {
                        //       console.log(res);
                        //       if (res.token) {
                        //         setStripeToken(res.token.id);
                        //       }
                        //     });
                        //   }
                        // }}
                      />
                    {
                      !con ? 
                      <View style={{top: 10, backgroundColor:'#f54749', width: '100%', alignItems:'center'}}>
                  

                        <TextSample 
                                  Label="Please add card detail " 
                                  Color="white" 
                                  Size={hp("1.8%")} 
                                  TextAlign='left'
                                  NumberOfLines={1} 
                                  Font="Overpass-Regular"
                                  TextDecorationLine='none'
                                  TextTransform='none'
                        />
                        
                        </View>:
                        <TouchableOpacityBtn onPress={PaymentByCard} title='Add Card +' />
                    }
                    
                        
                    </View>
   
  );
};


// function mapStateToProps({userAddToCart}){
//   return { userAddToCart}
// }

export default connect(null,actions)(Component)
// export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    backgroundColor:'white'
  },
  
});
