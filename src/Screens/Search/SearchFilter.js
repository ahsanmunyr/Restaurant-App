import React, {
    useEffect,
    useState, useCallback
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Categories } from '../../../model/categories';
import Slider from '@react-native-community/slider';
import TextInputFeild from '../../Components/TextFeild';
import TouchableOpacityBtn from '../../Components/TouchableOpacity';
import { Rating, AirbnbRating } from 'react-native-elements';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import * as actions from '../../Store/Actions';
import {connect} from 'react-redux';
  const SearchFilter = ({
      navigation,userLocations,getRestuarantByReviewAction,getItemByRangeAction,getItemByRangeActionB, clearRestaurant, clearItems
    }) => {
      const [searchQuery, setSearchQuery] = useState('');
      const onChangeSearch = query => setSearchQuery(query);
      const [click, onChangeClick] = useState(false);
      const [restaurants, onChangeRestaurants] = useState(false);
      const [foodItems, onChangeFoodItems] = useState(false);
      const [beverage, onChangeBeverage] = useState(false);
      const [selectCategory, onChangeSelectCategory] = useState(false);
      const [name, onChangeName] = useState('');
      const [radius, onChangeRadius] = useState(0);
      const [rating, onChangeRating] = useState('0');
      const [priceStart, onChangePriceStart] = useState('');
      const [priceEnd, onChangePriceEnd] = useState('');
      const [price, onChangePrice] = useState([600,2000]);
      const multiSliderValuesChange = (values) => onChangePrice(values)
      const [currentLocation, onChangeCurrentLocation] = useState('');
      const handleValueChange = useCallback((low, high) => {
        setLow(low);
        setHigh(high);
      }, []);
      useEffect(() => {
      }, [])
      const All = () => {
        if(click){
          onChangeClick(false)
        }else{
          onChangeClick(true)
          onChangeSelectCategory(true)
        }

      }
  useEffect(()=>{
    if (userLocations.PlaceName == undefined) {
      onChangeCurrentLocation('undefine');
    } else {
      onChangeCurrentLocation(userLocations.PlaceName);
    }
  },[])    

  const Restaurants = () => {
    if(restaurants){
      onChangeRestaurants(false)
    }else{
      onChangeRestaurants(true)
      onChangeSelectCategory(true)
    }
  }

  const FoodItems = () => {
    if(foodItems){
      onChangeFoodItems(false)
    }else{
      onChangeFoodItems(true)
      onChangeSelectCategory(true)
    }
  }

  const Beverage = () => {
    if(beverage){
      onChangeBeverage(false)
    }else{
      onChangeBeverage(true)
      onChangeSelectCategory(true)
    }
  }
  const cancel = () => {
    if(selectCategory){
      onChangeSelectCategory(false)
      onChangeBeverage(false)
      onChangeFoodItems(false)
      onChangeRestaurants(false)
      onChangeClick(false)
    }else{
      onChangeBeverage(true)
      onChangeFoodItems(true)
      onChangeRestaurants(true)
      onChangeClick(true)
    }
  }

  const getRestuarantByReview = () => {
    console.log(rating)
    clearItems()
    getRestuarantByReviewAction(rating, navigation)
  }

  const getItemWithRangePrice = () => {
    // console.log("SAD", price[0], price[1])
    clearRestaurant()
    getItemByRangeAction(price[0], price[1], navigation)
  }

  const getItemWithRangePriceB = () => {
    // console.log("SAD", price[0], price[1])
    clearRestaurant()
    getItemByRangeActionB(price[0], price[1], navigation)
  }


      return ( 
        <View style={styles.container}>
          <StatusBar translucent backgroundColor="#f54749" />
            <View style={{position: 'absolute', top: 40,  width:'90%', justifyContent:'center',alignSelf:'center', }}>
                <View style={{justifyContent:'space-around', flexDirection:'row', alignItems:'center', }}>
                    <TouchableOpacity onPress={()=> navigation.navigate('search')}>
                    <View style={{ backgroundColor: '#f54749', width: 60, height: 60, borderRadius: 50, justifyContent: 'center', alignItems:'center', }}>
                          <Ionicons name="arrow-back-outline" style={{}} size={25} color='white' />
                    </View>
                    </TouchableOpacity>
                            <TextSample 
                                                                Label="Filter your search" 
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
          <View style={{width: '100%', height: '70%', justifyContent:'center'}} >
            <View style={{width: '90%', justifyContent:'space-between', alignItems:'center', alignContent:'center',  alignSelf:'center', flexDirection:'row',}}>
                    <TextSample 
                                                                Label="Categories" 
                                                                Color="black" 
                                                                Size={hp("2.4%")} 
                                                                TextAlign='left'
                                                                NumberOfLines={1} 
                                                                Font="Overpass-Bold"
                                                                TextDecorationLine='none'
                                                                TextTransform='none'
                      />
                  <View style={{ width: 30, height: 30 }}>
                      <TouchableOpacity
                        disabled={selectCategory? false:true}
                        onPress={cancel} style={
                                  selectCategory?{
                                  zIndex: 99999,
                                  elevation: 9,
                                  backgroundColor: '#f54749',
                                  width: 30, 
                                  height: 30, 
                                  borderRadius: 50,
                                  justifyContent: 'center', 
                                  alignItems:'center',
                                }:
                                {
                                  zIndex: 99999,
                                  elevation: 9,
                                  backgroundColor: 'white',
                                  width: 30, 
                                  height: 30, 
                                  borderRadius: 50,
                                  justifyContent: 'center', 
                                  alignItems:'center',
                                }
                                }>
                      <Entypo name="cross" style={{}} size={15} color={selectCategory? 'white': 'black'} />
                  </TouchableOpacity>
              </View>
            </View>
            <View style={{width: '100%', height: '20%', alignItems:'center', flexDirection:'column', alignSelf:'center', }} >
                <ScrollView showsHorizontalScrollIndicator={false}  horizontal scrollEnabled 
                style={{width: '100%', height: '20%', flexDirection:'row'}}>
                  <View style={{ margin: 15, alignItems:'center', justifyContent:'center'}}>
                    {/* <TouchableOpacity 
                      onPress={All} 
                      disabled={selectCategory? true: false}
                      style={!click ?{
                              // width: 100, 
                              height: 50, 
                              alignItems:'center', 
                              justifyContent:'center',
                              backgroundColor:'white', 
                              borderRadius: 12,
                              zIndex:9999, elevation: 9, paddingLeft: 25, paddingRight: 25
                    }: {
                                backgroundColor:'#f54749',
                                borderRadius: 12,
                                zIndex:9999, elevation: 9,
                                // width: 100, 
                                paddingLeft: 25, paddingRight: 25,
                                height: 50, 
                                alignItems:'center', 
                                justifyContent:'center',
                                }}>
                    <TextSample 
                                                                Label="All" 
                                                                Color={!click ? '#f54749': 'white'} 
                                                                Size={hp("2%")} 
                                                                TextAlign='left'
                                                                NumberOfLines={1} 
                                                                Font="Overpass-Bold"
                                                                TextDecorationLine='none'
                                                                TextTransform='none'
                      />
                    </TouchableOpacity> */}
                  </View>
                  <View style={{ margin: 15, alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity 
                      onPress={Restaurants} 
                      disabled={selectCategory? true: false}
                      style={!restaurants ?{
                              // width: 100, 
                              height: 50, 
                              alignItems:'center', 
                              justifyContent:'center',
                              backgroundColor:'white', 
                              borderRadius: 12,
                              zIndex:9999, elevation: 9, paddingLeft: 25, paddingRight: 25
                      }: {
                                backgroundColor:'#f54749',
                                borderRadius: 12,
                                zIndex:9999, elevation: 9,
                                // width: 100, 
                                paddingLeft: 25, paddingRight: 25,
                                height: 50, 
                                alignItems:'center', 
                                justifyContent:'center',
                                }}>
                    <TextSample 
                                                                Label="Restaurants" 
                                                                Color={!restaurants ? '#f54749': 'white'} 
                                                                Size={hp("2%")} 
                                                                TextAlign='left'
                                                                NumberOfLines={1} 
                                                                Font="Overpass-Bold"
                                                                TextDecorationLine='none'
                                                                TextTransform='none'
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ margin: 15, alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity 
                      onPress={FoodItems} 
                      disabled={selectCategory? true: false}
                      style={!foodItems ?{
                              // width: 100, 
                              height: 50, 
                              alignItems:'center', 
                              justifyContent:'center',
                              backgroundColor:'white', 
                              borderRadius: 12,
                              zIndex:9999, elevation: 9, paddingLeft: 25, paddingRight: 25
                      }: {
                                backgroundColor:'#f54749',
                                borderRadius: 12,
                                zIndex:9999, elevation: 9,
                                // width: 100, 
                                paddingLeft: 25, paddingRight: 25,
                                height: 50, 
                                alignItems:'center', 
                                justifyContent:'center',
                                }}>
                    <TextSample 
                                                                Label="Food Items" 
                                                                Color={!foodItems ? '#f54749': 'white'} 
                                                                Size={hp("2%")} 
                                                                TextAlign='left'
                                                                NumberOfLines={1} 
                                                                Font="Overpass-Bold"
                                                                TextDecorationLine='none'
                                                                TextTransform='none'
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ margin: 15, alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity 
                      onPress={Beverage} 
                      disabled={selectCategory? true: false}
                      style={!beverage ?{
                              height: 50, 
                              alignItems:'center', 
                              justifyContent:'center',
                              backgroundColor:'white', 
                              borderRadius: 12,
                              zIndex:9999, elevation: 9, paddingLeft: 25, paddingRight: 25
                          }: {
                                backgroundColor:'#f54749',
                                borderRadius: 12,
                                zIndex:9999, elevation: 9,
                                paddingLeft: 25, paddingRight: 25,
                                height: 50, 
                                alignItems:'center', 
                                justifyContent:'center',
                                }}>
                        <TextSample 
                                                                    Label="Beverages" 
                                                                    Color={!beverage ? '#f54749': 'white'} 
                                                                    Size={hp("2%")} 
                                                                    TextAlign='left'
                                                                    NumberOfLines={1} 
                                                                    Font="Overpass-Bold"
                                                                    TextDecorationLine='none'
                                                                    TextTransform='none'
                          />
                    </TouchableOpacity>
                  </View>
                </ScrollView>
            </View>
            {
              
              restaurants ? 
              <View style={{height: '60%', width: '90%', justifyContent:'space-between', alignSelf:'center'}}>
              <View style={{flexDirection:'column', left: 10}}>
                  <View>
                          <TextSample 
                                Label="Current location: " 
                                Color="black" 
                                Size={hp("2%")} 
                                TextAlign='left'
                                NumberOfLines={1} 
                                Font="Overpass-Bold"
                                TextDecorationLine='none'
                                TextTransform='none'
                      />
                  </View> 
                  <TouchableOpacity onPress={()=>console.log("Click")}>
                  <View style={{
                      flexDirection:'row', alignItems:'flex-start', alignSelf:'flex-start', width: '90%'
                  }}> 
                  <Ionicons name="location-outline" style={{top: 2}} size={15} color='grey' />
                          <TextSample 
                                Label={currentLocation} 
                                Color="grey" 
                                Size={hp("1.5%")} 
                                TextAlign='left'
                                NumberOfLines={3} 
                                Font="Overpass-Regular"
                                TextDecorationLine='none'
                                TextTransform='none'
                          />
                          </View> 
                    </TouchableOpacity>
                </View> 
                <View style={{ left: 10,justifyContent:'flex-start', flexDirection:'column', alignItems:'flex-start',alignSelf:'flex-start', width: '90%'}}>
                        <TextSample 
                                  Label="Search by rating" 
                                  Color="black" 
                                  Size={hp("2%")} 
                                  TextAlign='left'
                                  NumberOfLines={1} 
                                  Font="Overpass-Bold"
                                  TextDecorationLine='none'
                                  TextTransform='none'
                          />
                        <View style={{padding: 10}}>
                            <Rating imageSize={25} fractions={1} startingValue={rating} onFinishRating={onChangeRating} /> 
                      </View>
                </View> 
                {/* <View style={{ left: 10,justifyContent:'flex-start', flexDirection:'column', alignItems:'flex-start',alignSelf:'flex-start', width: '90%'}}>
                        <TextSample 
                                  Label="Select radius:" 
                                  Color="black" 
                                  Size={hp("2%")} 
                                  TextAlign='left'
                                  NumberOfLines={1} 
                                  Font="Overpass-Bold"
                                  TextDecorationLine='none'
                                  TextTransform='none'
                          />
                          <Slider
                              style={{width: '100%', height: 40}}
                              minimumValue={0}
                              maximumValue={100}
                              step={10}
                              onValueChange={onChangeRadius}
                              value={radius}
                              minimumTrackTintColor="#f54749"
                              maximumTrackTintColor="#000000"
                              thumbTintColor='#f54749'
                            />
                            <TextSample 
                                  Label={radius + ' Kilometers'} 
                                  Color="black" 
                                  Size={hp("2%")} 
                                  TextAlign='left'
                                  NumberOfLines={1} 
                                  Font="Overpass-Regular"
                                  TextDecorationLine='none'
                                  TextTransform='none'
                          />
                </View>  */}
                <View style={{ justifyContent:'center', flexDirection:'column', alignItems:'center',alignSelf:'center', width: '90%'}}>
                            <TouchableOpacityBtn  
                                      onPress={getRestuarantByReview}
                                      title="Apply Filter"
                            />
                </View> 
          </View>: 
              foodItems ? 
              <View style={{height: '60%', width: '90%', justifyContent:'space-between', alignSelf:'center'}}>
              <View style={{flexDirection:'column', left: 10}}>
                  <View>
                          <TextSample 
                                Label="Current location: " 
                                Color="black" 
                                Size={hp("2%")} 
                                TextAlign='left'
                                NumberOfLines={1} 
                                Font="Overpass-Bold"
                                TextDecorationLine='none'
                                TextTransform='none'
                          />
                  </View> 
                  <TouchableOpacity onPress={()=>console.log("Click")}>
                  <View style={{
                      flexDirection:'row', alignItems:'flex-start', alignSelf:'flex-start', width: '90%'
                  }}> 
                    <Ionicons name="location-outline" style={{top: 2}} size={15} color='grey' />
                          <TextSample 
                                Label={currentLocation} 
                                Color="grey" 
                                Size={hp("1.5%")} 
                                TextAlign='left'
                                NumberOfLines={3} 
                                Font="Overpass-Regular"
                                TextDecorationLine='none'
                                TextTransform='none'
                          />
                          </View> 
                    </TouchableOpacity>
                </View> 
                <View style={{ left: 10,justifyContent:'flex-start', flexDirection:'column', alignItems:'flex-start',alignSelf:'flex-start', width: '90%'}}>
                        <TextSample 
                                  Label="Search by price" 
                                  Color="black" 
                                  Size={hp("2%")} 
                                  TextAlign='left'
                                  NumberOfLines={1} 
                                  Font="Overpass-Bold"
                                  TextDecorationLine='none'
                                  TextTransform='none'
                          />
                          <View style={{width: '100%', justifyContent:'center',alignItems:'center'}}>
                          <MultiSlider
                                minMarkerOverlapDistance={30}
                                trackStyle={{
                                  backgroundColor: '#bababa'
                                }}
                                markerStyle={{
                                  backgroundColor: '#f54749'
                                }}
                                selectedStyle={{backgroundColor:'#f54749'}}
                                values={[1000, 2000]}
                                onValuesChange={multiSliderValuesChange}
                                min={0}
                                max={3000}
                                step={100}
                                snapped
                                enabledTwo={true}
                                enabledOne={true}
                                allowOverlap={false}
                                isMarkersSeparated={true}
                              />
                            </View>
                            <TextSample 
                                  Label={'Starting Price: '+ price[0]}
                                  Color="black" 
                                  Size={hp("1.5%")} 
                                  TextAlign='left'
                                  NumberOfLines={1} 
                                  Font="Poppins-SemiBold"
                                  TextDecorationLine='none'
                                  TextTransform='none'
                            />
                            <TextSample 
                                  Label={'Ending Price: '+ price[1]}
                                  Color="black" 
                                  Size={hp("1.5%")} 
                                  TextAlign='left'
                                  NumberOfLines={1} 
                                  Font="Poppins-SemiBold"
                                  TextDecorationLine='none'
                                  TextTransform='none'
                            />
                </View> 
                {/* <View style={{ left: 10,justifyContent:'flex-start', flexDirection:'column', alignItems:'flex-start',alignSelf:'flex-start', width: '90%'}}>
                        <TextSample 
                                  Label="Select radius:" 
                                  Color="black" 
                                  Size={hp("2%")} 
                                  TextAlign='left'
                                  NumberOfLines={1} 
                                  Font="Overpass-Bold"
                                  TextDecorationLine='none'
                                  TextTransform='none'
                          />
                          <Slider
                              style={{width: '100%', height: 40}}
                              minimumValue={0}
                              maximumValue={100}
                              step={5}
                              onValueChange={onChangeRadius}
                              value={radius}
                              minimumTrackTintColor="#f54749"
                              maximumTrackTintColor="#000000"
                              thumbTintColor='#f54749'
                            />
                            <TextSample 
                                Label={radius + ' Kilometers'} 
                                Color="black" 
                                Size={hp("2%")} 
                                TextAlign='left'
                                NumberOfLines={1} 
                                Font="Overpass-Regular"
                                TextDecorationLine='none'
                                TextTransform='none'
                          />
                </View>  */}
                <View style={{ justifyContent:'center', flexDirection:'column', alignItems:'center',alignSelf:'center', width: '90%'}}>
                            <TouchableOpacityBtn  
                                      onPress={getItemWithRangePrice}
                                      title="Apply Filter"
                            />
                </View> 
          </View>:
              beverage ? 
              <View style={{height: '60%', width: '90%', justifyContent:'space-between', alignSelf:'center'}}>
              <View style={{flexDirection:'column', left: 10}}>
                  <View>
                          <TextSample 
                                Label="Current location: " 
                                Color="black" 
                                Size={hp("2%")} 
                                TextAlign='left'
                                NumberOfLines={1} 
                                Font="Overpass-Bold"
                                TextDecorationLine='none'
                                TextTransform='none'
                          />
                  </View> 
                  <TouchableOpacity onPress={()=>console.log("Click")}>
                  <View style={{
                      flexDirection:'row', alignItems:'flex-start', alignSelf:'flex-start', width: '90%'
                  }}> 
                    <Ionicons name="location-outline" style={{top: 2}} size={15} color='grey' />
                        <TextSample 
                                Label={currentLocation} 
                                Color="grey" 
                                Size={hp("1.5%")} 
                                TextAlign='left'
                                NumberOfLines={3} 
                                Font="Overpass-Regular"
                                TextDecorationLine='none'
                                TextTransform='none'
                          />
                          </View> 
                    </TouchableOpacity>
                </View> 
                <View style={{ left: 10, justifyContent:'flex-start', flexDirection:'column', alignItems:'flex-start',alignSelf:'flex-start', width: '90%'}}>
                        <TextSample 
                                  Label="Search by price" 
                                  Color="black" 
                                  Size={hp("2%")} 
                                  TextAlign='left'
                                  NumberOfLines={1} 
                                  Font="Overpass-Bold"
                                  TextDecorationLine='none'
                                  TextTransform='none'
                          />
                          <View style={{width: '100%', justifyContent:'center',alignItems:'center'}}>
                          <MultiSlider
                                minMarkerOverlapDistance={30}
                                trackStyle={{
                                  backgroundColor: '#bababa'
                                }}
                                markerStyle={{
                                  backgroundColor: '#f54749'
                                }}
                                selectedStyle={{backgroundColor:'#f54749'}}
                                values={[1000, 2000]}
                                onValuesChange={multiSliderValuesChange}
                                min={0}
                                max={3000}
                                step={100}
                                snapped
                                enabledTwo={true}
                                enabledOne={true}
                                allowOverlap={false}
                                isMarkersSeparated={true}
                              />
                            </View>
                            <TextSample 
                                  Label={'Starting Price: '+ price[0]}
                                  Color="black" 
                                  Size={hp("1.5%")} 
                                  TextAlign='left'
                                  NumberOfLines={1} 
                                  Font="Poppins-SemiBold"
                                  TextDecorationLine='none'
                                  TextTransform='none'
                            />
                            <TextSample 
                                  Label={'Ending Price: '+ price[1]}
                                  Color="black" 
                                  Size={hp("1.5%")} 
                                  TextAlign='left'
                                  NumberOfLines={1} 
                                  Font="Poppins-SemiBold"
                                  TextDecorationLine='none'
                                  TextTransform='none'
                            />
                </View> 
                {/* <View style={{ left: 10,justifyContent:'flex-start', flexDirection:'column', alignItems:'flex-start',alignSelf:'flex-start', width: '90%'}}>
                        <TextSample 
                                  Label="Select radius:" 
                                  Color="black" 
                                  Size={hp("2%")} 
                                  TextAlign='left'
                                  NumberOfLines={1} 
                                  Font="Overpass-Bold"
                                  TextDecorationLine='none'
                                  TextTransform='none'
                          />
                            <Slider
                              style={{width: '100%', height: 40}}
                              minimumValue={0}
                              maximumValue={100}
                              step={5}
                              onValueChange={onChangeRadius}
                              value={radius}
                              minimumTrackTintColor="#f54749"
                              maximumTrackTintColor="#000000"
                              thumbTintColor='#f54749' 
                            />
                              <TextSample 
                                  Label={radius + ' Kilometers'} 
                                  Color="black" 
                                  Size={hp("2%")} 
                                  TextAlign='left'
                                  NumberOfLines={1} 
                                  Font="Overpass-Regular"
                                  TextDecorationLine='none'
                                  TextTransform='none'
                          />
                </View>  */}
                <View style={{ justifyContent:'center', flexDirection:'column', alignItems:'center',alignSelf:'center', width: '90%'}}>
                            <TouchableOpacityBtn  
                                      onPress={getItemWithRangePriceB}
                                      title="Apply Filter"
                            />
                </View> 
          </View>: 
          <View style={{height: '60%', width: '90%'}} />
            }    
        </View>
      </View>
  )
}
function mapStateToProps({ userLocations }) {
  return { userLocations }
}
export default connect(mapStateToProps, actions)(SearchFilter)

  
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
  textField: {
    width: wp('80%'),
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 5,
    alignSelf:'center',
    backgroundColor:'white',
    zIndex: 9999,
    elevation: 3,
    borderRadius: 12,
    height:45,
  
    alignContent:'center', alignItems:'center'
    
},
  })