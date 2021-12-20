import React, {useEffect, useState,useRef} from 'react';
import {
    View,Text,Image,FlatList
 } from 'react-native';
import TextSample from './Text';
import {
    Avatar,
} from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Rating, AirbnbRating } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Histories = ({
    Title,
    Images,
    Time,
    Items,
    Status,
    Price,
    Reviews,
    PaymentMethod,
    Location,
    OrderID

}) => {
const ratingCompleted = (rating) => {
        // console.log("Rating is: " + rating)
    } 
    return(   
            <View style={{
                height: hp('27%'),
                width: wp('90%'), 
                flexDirection:'row',
                margin: 10,
                borderRadius: 12,
                zIndex: 9999,
                elevation: 5,
                backgroundColor:'white',
                alignItems:'center'
            }}>
        <View style={{height: 30, position: 'absolute', backgroundColor:'white', top: 0, width: "100%", flexDirection:'column',  }}>
            <View style={{justifyContent:'space-between', alignItems:'center', flexDirection:'row',}}>
                <View style={{justifyContent:'flex-start', flexDirection:'row', alignItems:'center', left: 17}}>
                            <TextSample 
                                        Label={"Order ID: "} 
                                        Color="black" 
                                        Size={hp("1.6%")} 
                                        TextAlign='left'
                                        NumberOfLines={1} 
                                        Font="Overpass-Bold"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                            /> 
                            <TextSample 
                                        Label={OrderID} 
                                        Color="#f54749" 
                                        Size={hp("1.6%")} 
                                        TextAlign='left'
                                        NumberOfLines={1} 
                                        Font="Overpass-Bold"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                            />   
            </View>     
                        <View style={{justifyContent:'flex-start', flexDirection:'row', alignItems:'center', right: 10}}>
                                    <TextSample 
                                        Label={"ORDER STATUS:  "} 
                                        Color="black" 
                                        Size={hp("1.6%")} 
                                        TextAlign='left'
                                        NumberOfLines={2} 
                                        Font="Overpass-Bold"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                                    />
                                    {
                                        Status == 0 ? 
                                    <TextSample 
                                        Label={"Completed"} 
                                        Color="#f54749" 
                                        Size={hp("1.6%")} 
                                        TextAlign='left'
                                        NumberOfLines={2} 
                                        Font="Overpass-Bold"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                                    />: 
                                        Status == 1 ?
                                    <TextSample 
                                        Label={"Cancelled"} 
                                        Color="#f54749" 
                                        Size={hp("1.6%")} 
                                        TextAlign='left'
                                        NumberOfLines={2} 
                                        Font="Overpass-Bold"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                                    />: 
                                        Status == 2 ? 
                                    <TextSample 
                                        Label={"Order Accepted"} 
                                        Color="#f54749" 
                                        Size={hp("1.6%")} 
                                        TextAlign='left'
                                        NumberOfLines={2} 
                                        Font="Overpass-Bold"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                                    />: 
                                        Status == 3 ?
                                    <TextSample 
                                        Label={"In Proccess"} 
                                        Color="#f54749" 
                                        Size={hp("1.6%")} 
                                        TextAlign='left'
                                        NumberOfLines={2} 
                                        Font="Overpass-Bold"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                                    />: 
                                        Status == 4 ?
                                    <TextSample 
                                        Label={"On the way"} 
                                        Color="#f54749" 
                                        Size={hp("1.6%")} 
                                        TextAlign='left'
                                        NumberOfLines={2} 
                                        Font="Overpass-Bold"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                                    />:
                                        null
                                    }
                    </View>     
                </View>
                <View style={{justifyContent:'flex-start', alignItems:'center', flexDirection:'row', left: 10}}>
                                <TextSample 
                                        Label={"  "+ Location} 
                                        Color="black" 
                                        Size={hp("1.2%")} 
                                        TextAlign='left'
                                        NumberOfLines={2} 
                                        Font="Overpass-Bold"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                                />
            </View>
        </View> 
            <View style={{justifyContent:'space-between', flexDirection:'row', alignItems:'center', height: hp('15%'),
                width: wp('90%')}}>
                <View style={{top: 0, position:'relative', margin: 10, width: '25%'}}>
                <Avatar.Image
                        source={Images}
                        size={90}
                />
                </View>
                <View style={{ top: 0, left: 2, width: '75%'}}>
                    <TextSample 
                                    Label={Title} 
                                    Color="#292929" 
                                    Size={hp("1.6%")} 
                                    TextAlign='left'
                                    NumberOfLines={2} 
                                    Font="Overpass-Medium"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                    />
                    <View style={{flexDirection:'row'}}>
                    <TextSample 
                                    Label={'Payment Type: '} 
                                    Color="black" 
                                    Size={hp("1.6%")} 
                                    TextAlign='left'
                                    NumberOfLines={1} 
                                    Font="Overpass-Medium"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                    />
                    <TextSample 
                                        Label={PaymentMethod} 
                                        Color="#f54749" 
                                        Size={hp("1.6%")} 
                                        TextAlign='left'
                                        NumberOfLines={1} 
                                        Font="Overpass-Bold"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                    />
                    </View>
                    <View style={{width:'90%', justifyContent:'flex-start', flexDirection:'row', flexWrap:'wrap', top: 10}}>
                        {
                            Items.length < 5 ?
                            Items.slice(0, 5).map((data, index) => {
                                    return (
                                        <View 
                                            key={index} 
                                            style={{
                                                    backgroundColor:'#e8e8e8',
                                                    padding: 5, 
                                                    margin:3, 
                                                    borderRadius:20,
                                                    alignSelf:'center',
                                                    justifyContent:'flex-start',
                                                    flexDirection:'row'
                                                }}
                                            >
                                            <TextSample 
                                                    Label={data} 
                                                    Color="#292929" 
                                                    Size={hp("1.2%")} 
                                                    TextAlign='left'
                                                    NumberOfLines={1} 
                                                    Font="Overpass-Bold"
                                                    TextDecorationLine='none'
                                                    TextTransform='none'
                                            />
                                        </View>
                                    )
                                }): <View style={{width:'90%', justifyContent:'flex-start', flexDirection:'row', flexWrap:'wrap'}} >
                                    {
                                        Items.slice(0, 5).map((data, index) => {
                                    return (
                                        <View 
                                            key={index} 
                                            style={{
                                                    backgroundColor:'#e8e8e8',
                                                    padding: 5, 
                                                    margin:3, 
                                                    borderRadius:20,
                                                    alignSelf:'center',
                                                    justifyContent:'flex-start',
                                                    flexDirection:'row'
                                                }}
                                        >
                                        <TextSample 
                                                Label={data} 
                                                Color="#292929" 
                                                Size={hp("1.2%")} 
                                                TextAlign='left'
                                                NumberOfLines={1} 
                                                Font="Overpass-Bold"
                                                TextDecorationLine='none'
                                                TextTransform='none'
                                            />
                                            </View>
                                        )
                                    })
                                }
                                    <TextSample 
                                        Label={'  more ...'} 
                                        Color="#292929" 
                                        Size={hp("1.2%")} 
                                        TextAlign='left'
                                        NumberOfLines={1} 
                                        Font="Overpass-Bold"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                                    />
                                </View>
                        }
                    </View>
                </View>
            </View>
                <View style={{height: 30, position: 'absolute', backgroundColor:'white', bottom: 0, width: "100%", zIndex: 999, elevation: 9,alignItems:'center', flexDirection:'row', justifyContent:'space-around', alignSelf:'center'  }}>
                        <View style={{ flexDirection:'row', alignSelf:'stretch', alignContent:'space-between', alignItems: 'center', justifyContent:'space-between', width: '100%', backgroundColor:'#f54749'}}>
                            <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row', left: 10}}>
                            <Ionicons name="ios-time-sharp" style={{}} size={20} color='white' />
                                <TextSample 
                                        Label={" "+ Time} 
                                        Color="white" 
                                        Size={hp("1.6%")} 
                                        TextAlign='left'
                                        NumberOfLines={1} 
                                        Font="Overpass-Bold"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                                    />
                            </View>
                            <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row', right:10}}>
                                <Ionicons name="md-pricetags" style={{}} size={20} color='white' />
                                <TextSample 
                                        Label={" "+ Price} 
                                        Color="white" 
                                        Size={hp("1.6%")} 
                                        TextAlign='left'
                                        NumberOfLines={1} 
                                        Font="Overpass-Bold"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                                />
                            </View>
                        </View>
                </View>
            </View>  
    )
}
export default Histories;