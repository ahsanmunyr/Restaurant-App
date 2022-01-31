import React, {useEffect, useState,useRef} from 'react';
import {
   TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,FlatList,
   Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView
 } from 'react-native';
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 import Avatar from '../../Components/Avatar';
 import AppText from '../../Components/AppText';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
 import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItems'
//  import Carousel, {Pagination } from 'react-native-snap-carousel'
//  import {FlatListSlider} from 'react-native-flatlist-slider';
 import Preview from './Preview';
//  heart heart-o FontAwesome
const Img = [
        {image: require('./../../Assets/Images/post1.png')},
        {image: require('./../../Assets/Images/place2.png')},
        {image: require('./../../Assets/Images/place3.png')},
    
]
 const PostList = ({ Name, Description,ProfileImg,UploadTime,TotalLike,Comment, Navigation}) => {

     const isCarousel = useRef(null)
     const [index, setIndex] = React.useState(0)
     const [like, onChangeLike] = useState(false)
    //  console.log(Name)
     const LikeFunc = () => {
         if(like){
            onChangeLike(false)
         }else{
            onChangeLike(true) 
         }
     }
    return (
 
            <View style={{
                height: hp('50%'), 
                flexDirection:'column',
                justifyContent:'center',
                // margin: 10,
                padding: 4,
                width: '95%',
                alignItems:'center',
                alignContent:'center',
                alignSelf:'center',    
                
            }}>
                    <View style={{justifyContent: 'flex-start', flexDirection:'column'}}>
                    <View style={{justifyContent: 'flex-start', flexDirection:'row'}}>
                        <Avatar
                                        size='medium'
                                        source={ProfileImg}
                                        />
                    <View style={{flexDirection:'row', padding: 4,justifyContent:'space-between', alignContent:'center', left:5, width: '80%' }}>
                            <View style={{ justifyContent:'flex-start', flexDirection:'column'}}>
                                <AppText  nol={1}  textAlign="left"  family="Poppins-SemiBold" size={hp("1.9%")} color="black" Label={Name} />
                                <AppText  nol={1}  textAlign="left"  family="Poppins-SemiBold" size={hp("1.5%")} color="black" Label={UploadTime} /> 
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                                <View style={{  flexDirection:'row'}}>
                                    <View style={{paddingRight: 5}}>
                                        <TouchableOpacity onPress={LikeFunc}>
                                        {
                                            like ?
                                            <Icon name="heart" size={18} color="#B01125" />:
                                            <Icon name="heart-o" size={18} color="#B01125" />
                                        }
                                        </TouchableOpacity>
                                    </View>
                                    <AppText  nol={1}  textAlign="left"  family="Overpass-Regular" size={hp("1.5%")} color="black" Label={TotalLike} />
                                </View>
                                <View style={{  flexDirection:'row', left:5}}>
                                    <View style={{paddingRight: 5}}>
                                        <Icon1 name="message-outline" size={18} color="#B01125" />
                                    </View>
                                    <AppText  nol={1}  textAlign="left"  family="Overpass-Regular" size={hp("1.5%")} color="black" Label={Comment} />
                                </View>

                            </View>
                    </View> 
                   
                </View>
                <TouchableOpacity 
                    onPress={()=>Navigation.navigate('mainpost',{name: Name, description: Description, profileImg: ProfileImg, uploadTime: UploadTime, totalLike:TotalLike, comment: Comment, img: Img })}
                      >
                    <View style={{ justifyContent:'flex-start',alignItems:'flex-start', }}>
                        <AppText  nol={12}  textAlign="left"  family="Overpass-Regular" size={hp("1.9%")} color="black" Label={Description} /> 
                    </View>  
                    </TouchableOpacity>
                </View>
            
                        <View style={{justifyContent:'center', flexDirection:'column', top:10, width: '100%', alignItems:'center',alignSelf:'center', height: 250, marginBottom: 10}}>
                        {/* <FlatListSlider
                            data={Img}
                            width={275}
                            autoscroll={false}
                            component={<Preview />}      
                            // indicatorActiveWidth={30}
                            loop={false}
                            contentContainerStyle={{paddingHorizontal: 0, }}
                            animation={true}
                        /> */}
                            <View style={{ marginTop: 10,}}/> 
                            <View style={{width: '95%', height:0.5, backgroundColor:'black'}} />            
                       </View>
          
        </View>
 
    )
 }
 export default PostList;