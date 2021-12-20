import React, {useEffect, useState,useRef} from 'react';
import {
    View,Text, ImageBackground, TouchableOpacity,Image
 } from 'react-native';

 var interests = []

 const InterestList = ({Name, Value, Images, Id, Interest}) => {
    const [items, setItems] = useState([]);
    const [check, setCheck] = useState(false)
    
    const SelectInterest = (value, name) => {

        if(check == true){ 
            interests = interests.filter(function(e) { return e !== name })
            setCheck(false)
        }else{
            interests.push(name)
            setCheck(true)
            // const Array = name   
            // let interestName = name
            // console.log('push', name)
          
            // setItems([...Array, name]);
            // setItems.push(interestName)
            // console.log(name)
            // setItems((pS)=>{
            //     return [
            //         ...pS,
            //         name
            //     ]
            // })
        }
        Interest(interests)
        // console.log(interests)
        
    }
    return(   
        <View style={{margin: 10,}}>
          
            <TouchableOpacity onPress={()=>  SelectInterest(Value, Name)} >
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
 export default InterestList;