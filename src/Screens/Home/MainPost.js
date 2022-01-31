import React, {useEffect, useState,useRef} from 'react';
import {
   TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,FlatList,
   Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView
 } from 'react-native';
//  import comments from '../../../model/History'
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 import Avatar from '../../Components/Avatar';
 import AppText from '../../Components/AppText';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
 import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItems'
//  import Carousel, {Pagination } from 'react-native-snap-carousel'
//  import {FlatListSlider} from 'react-native-flatlist-slider';
 import Comment from './Comments';
 import Preview from './Preview';
//  heart heart-o FontAwesome
const Img = [
        {image: require('./../../Assets/Images/post1.png')},
        {image: require('./../../Assets/Images/place2.png')},
        {image: require('./../../Assets/Images/place3.png')},
    
]
 const MainPost = ({navigation, route, props}) => {

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
            height: hp('100%'), 
            flexDirection:'column',
            justifyContent:'flex-start',
            width: '100%',
            flex: 1,
            alignItems:'center',
           }}>
        <FlatList
            ListHeaderComponent={
                   <View > 
                        <View style={{justifyContent: 'flex-start', flexDirection:'column'}}>
                        <View style={{justifyContent: 'flex-start', flexDirection:'row', width: '80%', margin: 8}}>
                                <Avatar
                                     size='medium'
                                     source={route.params.profileImg}
                                />
                                <View style={{flexDirection:'row', padding: 4,justifyContent:'space-between', alignContent:'center', left:5, width: '90%' }}>
                                    <View style={{ justifyContent:'flex-start', flexDirection:'column'}}>
                                        <AppText  nol={1}  textAlign="left"  family="Poppins-SemiBold" size={hp("1.9%")} color="black" Label={route.params.name} />
                                        <AppText  nol={1}  textAlign="left"  family="Poppins-SemiBold" size={hp("1.5%")} color="black" Label={route.params.uploadTime} /> 
                                    </View>
                                </View> 
                        </View>
                        <View style={{ justifyContent:'flex-start',alignItems:'flex-start',  width: '100%' , margin: 10}}>
                            <AppText  nol={12}  textAlign="left"  family="Overpass-Regular" size={hp("1.9%")} color="black" Label={route.params.description} /> 
                        </View>                                                  
                        </View>
                                           <View style={{justifyContent:'center', flexDirection:'column',  width: '100%', alignSelf:'center', alignItems:'center'}}>
                                             
                                          
                                                    <View style={{ flexDirection:'row', width: '95%', borderRadius: 10, zIndex: 4, padding: 10, elevation: 10, borderColor: 'white', backgroundColor:'white'}}>
                                                    
                                                    <Avatar
                                                    size='small'
                                                    source={route.params.profileImg}
                                                    />
                                    
                                                    <TextInput
                                                     placeholder="Add a comment"
                                                    numberOfLines={5}
                                                        placeholderTextColor="grey"
                                                        keyboardType="default"
                                                        multiline={true}
                                                        // maxLength={40}
                                                        textAlignVertical="top"
                                                        style={{
                                                        width: '89%',
                                                            
                                                        borderRadius: 6,
                                                            top: -3,
                                                        color: "grey",
                                                    
                                                        fontSize: hp('1.9%')
                                                        }}
                                                    />
                                                     </View>            
                                        </View>
                                                
                                                
                                        </View>
                                    }
                                
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    data={comments}
                                    keyExtractor={(item, index) => index}
                                    renderItem={({ item, index }) => 
                                        <Comment
                                            img={item.image}
                                            name={item.name}
                                            time={item.time}
                                            message={item.comment}
                                        />
                                          }
                                                    
                                 />
    </View>
    )
 }
 export default MainPost;