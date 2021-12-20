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
import Component from './Component';
const STRIPE_KEY = "pk_test_51JSf7NBHvtauYlYgB4l4yfyU8z5AjbH5zNjTyut3UWtrYl3Uw9g5rdVAqlm15Ew264zRKlCuwx1OUPNA2u7TjzS200Vt2wePFo";
const PaymentCard = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [stripeToken, setStripeToken] = useState('');
  const [data, onChangeData] = useState(null)
  const {createToken} = useStripe();

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

  // useEffect(()=>{
  //   console.log(userCreditCardDetail, "MINHAL PAGAL")
  //   if(userCreditCardDetail){
  //     onChangeData(userCreditCardDetail)
  //   }
  // },[userCreditCardDetail])
return (
  
    <View style={styles.container}>
            <StatusBar translucent backgroundColor="#f54749" />
            <View style={{justifyContent:'space-around', padding: 10, flexDirection:'row', alignItems:'flex-start', top: 50, position:'absolute', width:'100%'}}>
                    <TouchableOpacity onPress={()=> navigation.pop()}>
                        <View style={{ backgroundColor: '#f54749', width: 45, height: 45, borderRadius: 50, justifyContent: 'center', alignItems:'center', }}>
                            <Ionicons name="chevron-back" style={{}} size={20} color='white' />
                        </View>
                    </TouchableOpacity>
                    <TextSample 
                                Label="Add Credit Card" 
                                Color="black" 
                                Size={hp("4%")} 
                                TextAlign='left'
                                NumberOfLines={1} 
                                Font="Overpass-ExtraBold"
                                TextDecorationLine='none'
                                TextTransform='none'
                    />
                  
            </View>
            <View style={{height: 200, width:'90%', justifyContent:'center', alignItems:'center', alignSelf:'center'}}>
                    <StripeProvider publishableKey={STRIPE_KEY}>
                       <Component navigate={navigation}  />
                    </StripeProvider>
                    </View>
    </View>
  );
};


function mapStateToProps({userCreditCardDetail}){
  return { userCreditCardDetail}
}

export default connect(mapStateToProps,actions)(PaymentCard)
// export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    backgroundColor:'white'
  },
  
});
