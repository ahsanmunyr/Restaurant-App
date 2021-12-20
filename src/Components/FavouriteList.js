import React, {useEffect, useState,useRef} from 'react';
import {
    View,Text, ImageBackground, TouchableOpacity,Image
} from 'react-native';

var favourites = []

const FavouriteList = ({Name, Value, Images, Id, Favourite}) => {
    const [items, setItems] = useState([]);
    const [check, setCheck] = useState(false)
    
    const SelectFavourite= (value, name) => {

        if(check == true){ 
            favourites = favourites.filter(function(e) { return e !== name })
            setCheck(false)
        }else{
            favourites.push(name)
            setCheck(true)
        }
        Favourite(favourites)
    }
    return(   
        <View style={{margin: 10,}}>
            <TouchableOpacity onPress={()=>  SelectFavourite(Value, Name)} >
                <ImageBackground style={{width: 170, height: 170,}} resizeMode='contain' source={Images}>
                    <View style={{ justifyContent:'flex-end',height: 170, alignItems:'flex-start', backgroundColor:"rgba(0, 0, 0, 0.35)" }}>
                    <View style={{flexDirection:'row', alignSelf:'flex-end', padding: 10, top:-50, height: 50}}>
                        {
                            Value != check ?
                                <View  style={{backgroundColor: '#B01125', width: 30, height: 30, borderRadius: 50, borderColor:'white', borderWidth:1}}>
                                    <Image 
                                        resizeMode='contain' 
                                        source={require('./../Assets/Images/Check.png')} 
                                        style={{width: 20, height: 20, margin: 4,}} 
                                    />
                                </View>: null
                        }
                    </View>
                    <View style={{width: 120, height: 60}}>
                            <Text style={{
                                    textAlign:'left',
                                    display:'flex',
                                    textAlignVertical: 'bottom',
                                    padding: 5,
                                    color: 'white',
                                    fontFamily: 'Overpass-Bold',
                                    fontSize: 18,
                                    left: 10,}}>
                                        {Name}
                            </Text>
                    </View>
                </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>     
    )
}
export default FavouriteList;