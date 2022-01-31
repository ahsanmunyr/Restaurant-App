import React, {
    useEffect,
    useState,
    useRef,
    useMemo
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
    Image,Animated,
    KeyboardAvoidingView,
    LayoutAnimation,
    Platform,
    UIManager,
    TouchableHighlight,
    TextInput,
    ScrollView,useWindowDimensions
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Avatar, Searchbar, List, Colors } from 'react-native-paper';
import TextSample from '../../Components/Text';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import {deploy_API} from './../../Config/Apis.json'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Rating, AirbnbRating } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import Message from '../../../model/Messages';
import * as actions from '../../Store/Actions'
import {connect} from "react-redux";
import CategoryRestaurants from '../../Components/CategoryRestaurants';
import Skeleton from '../../Components/Skeleton';
import moment from 'moment';
const CategoryScreen = ({
      navigation, body, getCategoryClear,userGetCategory,getRestaurantReview
    }) => {
    const [loading, onChangeLoading] = useState(false)
    const [array, onChangeArray] = useState([])
      useEffect(()=>{
        let isMounted = true
        if(userGetCategory.length > 0){
          onChangeArray(userGetCategory)
          // console.log(userGetCategory, "Ahsan0000000000000000000")
          onChangeLoading(true)
        }
        if (isMounted)
        navigation.addListener('blur',()=>{
          getCategoryClear()
        });
        return () => { isMounted = false };
      },[userGetCategory])
      const FirstRoute = () => (
        <View style={{  backgroundColor: 'white', justifyContent:'center', alignItems:'flex-start', flexDirection:'column', paddingLeft: 10, paddingRight: 10 }} >
                     <TextSample 
                                    Label={body.title} 
                                    Color="black" 
                                    Size={hp("3%")} 
                                    TextAlign='left'
                                    NumberOfLines={1} 
                                    Font="Overpass-Bold"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                      /> 
                   <TextSample 
                                    Label={body.description} 
                                    Color="grey" 
                                    Size={hp("1.6%")} 
                                    TextAlign='left'
                                    NumberOfLines={2} 
                                    Font="Overpass-Bold"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                      /> 
                      <View style={{justifyContent:'space-between', alignItems:'center', flexDirection:'row', alignSelf:'center', width: '100%'}}>
                   
                          <Rating imageSize={15} readonly startingValue={body.ratings}  /> 
                          <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'flex-start'}}>
                            {
                              body.distance != null ?
                              <View style={{ 
                                padding: 5, 
                                borderRadius: 12, 
                                backgroundColor:'#e8e8e8',
                                flexDirection:'row', 
                                justifyContent:'flex-end', 
                                alignItems:'flex-start', right: 5
                              }}>
                              <Ionicons name="location-outline" style={{padding: 1}} size={13} color='#f54749' />
                              <TextSample 
                                                  Label={(body.distance).toFixed(2)+" Km"} 
                                                  Color="#f54749" 
                                                  Size={hp("1.5%")} 
                                                  TextAlign='left'
                                                  NumberOfLines={1} 
                                                  Font="Overpass-Regular"
                                                  TextDecorationLine='none'
                                                  TextTransform='none'
                              />
                          </View>:
                          <View style={{ 
                            padding: 5, 
                            borderRadius: 12, 
                            backgroundColor:'#e8e8e8',
                            flexDirection:'row', 
                            justifyContent:'flex-end', 
                            alignItems:'flex-start', right: 5
                          }}>
            
                          <TextSample 
                                              Label={"Get by Rating"} 
                                              Color="#f54749" 
                                              Size={hp("1.5%")} 
                                              TextAlign='left'
                                              NumberOfLines={1} 
                                              Font="Overpass-Regular"
                                              TextDecorationLine='none'
                                              TextTransform='none'
                            />
                        </View>

                            }
                          
                          <View style={{padding: 5, borderRadius: 12, backgroundColor:'#e8e8e8',flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                            <TextSample 
                                                  Label={'Reviews '} 
                                                  Color="#f54749" 
                                                  Size={hp("1.4%")} 
                                                  TextAlign='left'
                                                  NumberOfLines={1} 
                                                  Font="Overpass-Regular"
                                                  TextDecorationLine='none'
                                                  TextTransform='none'
                              /> 
                              <TextSample 
                                                  Label={body.reviews} 
                                                  Color="#f54749" 
                                                  Size={hp("1.4%")} 
                                                  TextAlign='left'
                                                  NumberOfLines={1} 
                                                  Font="Overpass-Regular"
                                                  TextDecorationLine='none'
                                                  TextTransform='none'
                              /> 
                          </View>
                      
                      </View>

                      </View>
                      <View style={{justifyContent:'space-around', width: '100%', height:'60%',flexDirection:'column'}}>
                        <View style={{ width:'100%', height:'30%', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                          <View style={{backgroundColor:'#f54749', width: 50, height: 50, borderRadius: 12, justifyContent:'center', alignItems:'center'}}>
                              <Ionicons name="time-outline" style={{padding: 1}} size={30} color='white' />
                          </View>
                          <View style={{flexDirection:'column'}}>
                            <TextSample 
                                                    Label={' Open Time: '+ body.openTime } 
                                                    Color="black" 
                                                    Size={hp("1.6%")} 
                                                    TextAlign='left'
                                                    NumberOfLines={1} 
                                                    Font="Overpass-Regular"
                                                    TextDecorationLine='none'
                                                    TextTransform='none'
                            />
                            <TextSample 
                                                    Label={' Close Time: '+ body.closeTime } 
                                                    Color="black" 
                                                    Size={hp("1.6%")} 
                                                    TextAlign='left'
                                                    NumberOfLines={1} 
                                                    Font="Overpass-Regular"
                                                    TextDecorationLine='none'
                                                    TextTransform='none'
                            />
                          </View>
                        </View>
                        <View style={{height:0.5, width: '100%', backgroundColor: 'grey'}} />

                        <View style={{ width:'100%', height:'30%', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                          <View style={{backgroundColor:'#f54749', width: 50, height: 50, borderRadius: 12, justifyContent:'center', alignItems:'center'}}>
                              <Ionicons name="pricetags-outline" style={{padding: 1}} size={30} color='white' />
                          </View>
                          <TextSample 
                                                    Label={' 30% off on all menu items '} 
                                                    Color="black" 
                                                    Size={hp("1.6%")} 
                                                    TextAlign='left'
                                                    NumberOfLines={1} 
                                                    Font="Overpass-Regular"
                                                    TextDecorationLine='none'
                                                    TextTransform='none'
                          />
                        </View>
                      </View>
        </View>
      );
      const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
           <FlatList
                    data={getRestaurantReview?.data}
                    keyExtractor={(item) => item.review_id}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    
                    key={(item) => item.restaurant_id}
                    initialNumToRender={7}
                    style={{position:'relative', paddingLeft: 10, paddingRight: 10, }}
                    scrollEnabled
                    bounces
                    bouncesZoom
                    // maintainVisibleContentPosition
                    renderItem={({ item, index }) => 
                            <View style={{justifyContent:'flex-start', alignItems:'center',flexDirection:'row', padding: 10, width: '100%'}}>
                          
                              <Avatar.Image size={35}  source={{uri: `${deploy_API+'/'+item.user_image}`}}  />
                         
                              <View style={{ justifyContent:'flex-start', alignItems:'flex-start', flexDirection:'column', left: 10, width: '90%'}}>
                              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width: '90%'}}>
                                <TextSample 
                                                      Label={item.user_name} 
                                                      Color="black" 
                                                      Size={hp("1.6%")} 
                                                      TextAlign='left'
                                                      NumberOfLines={1} 
                                                      Font="Overpass-Regular"
                                                      TextDecorationLine='none'
                                                      TextTransform='none'
                                />
                                <TextSample 
                                                    Label={" "+ moment(item.review_created_date).format('MMMM Do YYYY')} 
                                                      Color="black" 
                                                      Size={hp("1.6%")} 
                                                      TextAlign='left'
                                                      NumberOfLines={1} 
                                                      Font="Overpass-Regular"
                                                      TextDecorationLine='none'
                                                      TextTransform='none'
                                />
                              </View>
                               <TextSample 
                                                    Label={item.review_text} 
                                                    Color="grey" 
                                                    Size={hp("1.4%")} 
                                                    TextAlign='left'
                                                    NumberOfLines={3} 
                                                    Font="Overpass-Regular"
                                                    TextDecorationLine='none'
                                                    TextTransform='none'
                              />
                              <Rating imageSize={13} readonly startingValue={item.Reviews}  /> 
                              </View>
                            </View>
                        }
            />
        </View>
      );
      const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      });
      const layout = useWindowDimensions();
      const [index, setIndex] = useState(0);
      const [routes] = useState([
        { key: 'first', title: 'Details' },
        { key: 'second', title: 'Reviews' },
      ]);
      const _renderTabBar = (props) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        return (
          <View style={styles.tabBar}>
            {
              props.navigationState.routes.map((route, i) => {
                const opacity = props.position.interpolate({
                  inputRange,
                  outputRange: inputRange.map((inputIndex) =>
                    inputIndex === i ? 1 : 0.5
                  ),
                });
                return (
                  <TouchableOpacity  key={i} 
                    style={{backgroundColor: 'white', height: 50, width: 170, justifyContent:'center', alignSelf:'center'}}
                    onPress={() => setIndex(i)}>
                    <Animated.Text style={{ opacity, color: '#f54749', textAlign:'center', fontFamily:'Overpass-Light', fontSize: 20 }}>{routes[i].title}</Animated.Text>
                  </TouchableOpacity>
                );
              })
            }
          </View>
        );
      };
      return ( 
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={{position:'absolute', width: '100%', top: 0, flexDirection:'column', height:'35%', backgroundColor:'black' }}>
              <ImageBackground style={{width: '100%', height: '100%', opacity:0.7}} resizeMode='cover' source={{uri: `${deploy_API+'/'+body.images}`}}>
                  <View style={{alignItems:'center', justifyContent:'space-between', top: 40, flexDirection:'row', width: '90%', alignSelf:'center' }}>
                    <TouchableOpacity onPress={()=> navigation.navigate('home')}>
                      <View style={{zIndex: 99999, elevation: 9, backgroundColor: '#f54749', width: 40, height: 40, borderRadius: 50, justifyContent: 'center', alignItems:'center', }}>
                            <Ionicons name="arrow-back-outline" style={{}} size={20} color='white' />
                      </View>
                      </TouchableOpacity>
                      <View style={{zIndex: 99999, elevation: 9, backgroundColor: '#f54749', width: 70, height: 20, borderRadius: 50, justifyContent: 'center', alignItems:'center', }}>
                            <TextSample 
                                Label="Open" 
                                Color="white" 
                                Size={hp("1.5%")} 
                                TextAlign='left'
                                NumberOfLines={1} 
                                Font="Overpass-Bold"
                                TextDecorationLine='none'
                                TextTransform='none'
                            /> 
                    </View>
                </View>
                </ImageBackground>
            </View>
            <View style={{width: '90%',height: '37%', backgroundColor: 'white', alignSelf:'center', borderRadius: 20, top: -120 }}>
              <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={_renderTabBar}
                // swipeEnabled={true}
                // key={body.restaurantID}
                // transitionStyle='scroll'
                style={{borderRadius: 20}}
                initialLayout={{ width: layout.width }}
            />
               {/* <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    /> */}
            </View>
      {
        loading ?
          <View style={{height: '50%', position:'absolute', bottom: 0, alignSelf:'center', alignItems:'flex-start', justifyContent:'flex-start'}}>
                    <FlatList
                      data={array}
                      keyExtractor={(item) => item.category_id}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false} 
                      initialNumToRender={7}
                      ListFooterComponent={<View style={{ height: 150}} />}
                      numColumns={2}
                      style={{position:'relative',width: '100%', flexWrap:'wrap',height: '55%', paddingTop: 50}}
                      contentContainerStyle={{width: '100%', alignSelf:'flex-start', alignItems:'flex-start', justifyContent:'flex-start'}}
                      scrollEnabled
                      bounces
                      bouncesZoom
                      // maintainVisibleContentPosition
                      renderItem={({ item, index }) => 
                                  <CategoryRestaurants
                                      ID={item.category_id}
                                      Title={item.category_name}
                                      Images={item.category_image}
                                      Quantity={item.category_description}
                                      RestaurantID={item.restaurant_id}
                                      RestaurantCategoryID={item.restaurant_category_id}
                                      // RestaurantAddress={item.}
                                      Navigation={navigation}
                                  />
                      }
                  />
          </View>: 
            <View style={{height: '40%', position:'absolute', bottom: 0, justifyContent:'space-around',alignSelf:'center', width: '100%', flexDirection:'row',}}>
                <Skeleton />
                <Skeleton />
            </View>
        }
        </View>
  )
}  
function mapStateToProps({userGetCategory, getRestaurantReview}){
    return {userGetCategory, getRestaurantReview}
}
export default connect(mapStateToProps,actions)(CategoryScreen)

var styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      height: '100%',
      backgroundColor: '#e8e8e8'
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
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  })