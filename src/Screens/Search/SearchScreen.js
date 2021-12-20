import React, {
  useEffect,
  useState,
  useRef
} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  PermissionsAndroid,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  TouchableHighlight,
  TextInput,
  ScrollView
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Searchbar } from 'react-native-paper';
import TextSample from '../../Components/Text';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
const SearchScreen = ({
    navigation
  }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    useEffect(() => {
    }, [])
    return ( 
      <View style={styles.container}>
         <StatusBar translucent backgroundColor="#f54749" />
          <View style={{position:'absolute', top: 40, width: '90%', flexDirection:'column'}}>
                    <View style={{alignItems:'center', justifyContent:'flex-start', left: 20,}}>
                        <TextSample 
                            Label="Fast and Delicious Food" 
                            Color="black" 
                            Size={hp("3%")} 
                            TextAlign='left'
                            NumberOfLines={1} 
                            Font="Overpass-Bold"
                            TextDecorationLine='none'
                            TextTransform='none'
                        />
                  </View>
      </View>
      <View style={{width: '90%', flexDirection:'row', alignItems:'flex-start', justifyContent:'space-between', alignSelf: 'center',  height: '10%' }}>
                                    <Searchbar
                                            placeholder="Search "
                                            onChangeText={onChangeSearch}
                                            value={searchQuery}
                                            style={{borderRadius: 20, width: '75%'}}
                                    />
                                    <View style={{ alignItems:'center', justifyContent:'center'}}>
                                          <TouchableOpacity style={{backgroundColor:'#f54749', width: 50, height: 50, borderRadius: 20, alignItems:'center', justifyContent:'center'}} onPress={()=> navigation.navigate('searchfilter')}>
                                              <Ionicons name="md-filter" style={{}} size={20} color='white' />
                                          </TouchableOpacity>
                                    </View>
      </View>
      <View style={{justifyContent: 'center',  flexDirection:'column', alignItems:'center', width: '80%', height: '50%', alignSelf:'center'}}>
              <LottieView speed={2} style={{height: '100%', width: '50%'}}  autoPlay loop={false} source={require('./../../Assets/Lottie/search.json')} />
              <TextSample 
                                                                Label="Search the food you love" 
                                                                Color="black" 
                                                                Size={hp("2%")} 
                                                                TextAlign='left'
                                                                NumberOfLines={1} 
                                                                Font="Overpass-Bold"
                                                                TextDecorationLine='none'
                                                                TextTransform='none'
                                          /> 
              <TextSample 
                                                                Label="It's all at your fingertips – the restaurants and shops you love" 
                                                                Color="black" 
                                                                Size={hp("1.5%")} 
                                                                TextAlign='center'
                                                                NumberOfLines={2} 
                                                                Font="Overpass-Regular"
                                                                TextDecorationLine='none'
                                                                TextTransform='none'
                                          />
      </View>
    </View>
  )
}


export default SearchScreen;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: '100%',
    backgroundColor: 'white'
  },
  touchableOpacity:{
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: 'white',
    width: wp('60%'),
    height: hp('6%'),
    justifyContent: 'center',
    borderRadius: 25,
    alignItems:'center'
},
touchableOpacityText: {
  color: 'black',
  fontFamily: 'Overpass-Bold',
  fontSize: hp('2'),
  textAlign:'center'
},
})