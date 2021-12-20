import React, {useEffect, useState,useRef, useMemo} from 'react';
import {
   TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,FlatList,Dimensions,
   Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView
 } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TextSample from '../../Components/Text';
import TouchableOpacityBtn from '../../Components/TouchableOpacity';
import {connect} from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, {PROVIDER_GOOGLE,Marker} from "react-native-maps";
import Slider from '@react-native-community/slider';
import * as actions from '../../Store/Actions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GoogleMapKey} from './../../Config/Apis.json'

const MapScreen = ({navigation, userLatitudeLongitude, userLocations, LocationSearchApply, UserLatLong, userSearchApply,UserLocation,getRestaurant}) => {
const {width, height} = Dimensions.get('window')
const _map = React.useRef(null);
const [ zoomlevel, onChangeZoomLevel ] = useState(0.01)
const [placeName, onChangePlaceName] = useState('');
const [address, onChangeAddress] = useState('');
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.05
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const [state, setState] = React.useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });
useEffect(()=>{
        onChangePlaceName(userLocations.PlaceName)
}, [])

useEffect(()=>{
        if(userSearchApply.testing != "abc"){
            UserLatLong(userSearchApply.LatLong.lat, userSearchApply.LatLong.lng)
            UserLocation(userSearchApply.LatLong.lat, userSearchApply.LatLong.lng)
            const kilometer = (zoomlevel*100).toFixed(0)
            getRestaurant(userSearchApply.LatLong.lat, userSearchApply.LatLong.lng, kilometer)
            setState({
                latitude: userSearchApply.LatLong.lat,
                longitude: userSearchApply.LatLong.lng,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            })
        }else{
            console.log(userLocations.PlaceName,"change")
            onChangeAddress(userLocations.PlaceName)
            UserLatLong(userLatitudeLongitude.lat, userLatitudeLongitude.long)
            setState({
                latitude: userLatitudeLongitude.lat,
                longitude: userLatitudeLongitude.long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            })
        }
        
},[userSearchApply])

const zoomlocation = (z) =>{
    console.log(z)
    var currntlat = state.latitude;
    var currntlgn = state.longitude;
    onChangeZoomLevel(z)
    setState({
        latitude: currntlat,
        longitude: currntlgn,
        latitudeDelta: z*2.5,
        longitudeDelta: z*2.5,
    })
}
const onRegionChange = (mark) => {
        const Delta = 0.025
        console.log(mark.nativeEvent.coordinate)
        console.log(mark)
        setState({
            latitude: mark.nativeEvent.coordinate.latitude,
            longitude: mark.nativeEvent.coordinate.longitude,
            latitudeDelta: Delta,
            longitudeDelta: Delta
        })
    }
const filter = () => {
        const kilometer = (zoomlevel*100).toFixed(0);
        getRestaurant( state.latitude, state.longitude, kilometer);
        navigation.navigate('Home');
    }
return(
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="#f54749" />
                <View style={{position:'absolute', top: 60, width: '100%', flexDirection:'column',   zIndex: 999}}>
                <View style={{justifyContent:'space-between', flexDirection:'row', alignItems:'flex-start', width: '90%',alignSelf:'center' }}>
                    <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
                        <View style={{zIndex: 99999, elevation: 9, backgroundColor: '#f54749', width: 45, height: 45, borderRadius: 50, justifyContent: 'center', alignItems:'center', }}>
                            <Ionicons name="chevron-back" style={{}} size={20} color='white' />
                        </View>
                    </TouchableOpacity>
                    <View style={{width: '80%', top: 2}}>
                        <GooglePlacesAutocomplete
                                placeholder={placeName}
                                autoFocus = {true}
                                placeholderTextColor="#888"
                                onPress={(data, details = null) => {
                                onChangePlaceName(details.description)
                                LocationSearchApply(data.place_id, details.description)
                                onChangeAddress(data.description)
                                }}
                                query={{
                                key: GoogleMapKey,
                                language: 'en',
                                }}
                                GooglePlacesDetailsQuery={{ fields: 'geometry', }}
                        /> 
                    </View>
                </View>
                </View>
                <MapView
                    initialRegion={state}
                    onMarkerDragEnd={onRegionChange}
                    region={state}
                    ref={_map}
                    initialRegion={state}
                    style={{flex: 1}}
                    provider={PROVIDER_GOOGLE}
                >
                        <Marker
                            stopPropagation={false}
                            style={{position:'absolute'}}
                            onMarkerDragEnd={onRegionChange}
                            coordinate={{
                                        "latitude": state.latitude,
                                        "longitude": state.longitude
                                        }}
                            title={"Your Location"} 
                        />
                        <MapView.Circle
                            key = {(state).toString()}
                            center = {state}
                            radius = {zoomlevel*100000}
                            strokeWidth = {1}
                            strokeColor = {'#f54749'}
                            fillColor = {'rgba(96,28,29,0.1)'}
                            />
                </MapView>
                <View style={{ 
                    position: 'absolute', 
                    bottom: 20,
                    padding: 20,
                    backgroundColor:'white', 
                    zIndex: 9999, elevation: 7, 
                    justifyContent:'center', 
                    alignSelf:'center', 
                    borderRadius: 12,
                    alignItems:'center'
                    }}>
                <Slider
                        style={{width:'85%', height: 40}}
                        minimumValue={0.02}
                        maximumValue={0.3}
                        onSlidingComplete={(value)=> zoomlocation(value)}
                        minimumTrackTintColor="#f0535c"
                        maximumTrackTintColor="#000000"
                    />
                <TextSample 
                                        Label={(zoomlevel*100).toFixed(0)+ ' Km'} 
                                        Color="#f54749" 
                                        Size={hp("2%")} 
                                        TextAlign='left'
                                        NumberOfLines={1} 
                                        Font="Overpass-Bold"
                                        TextDecorationLine='none'
                                        TextTransform='none'
                />
                    <View style={{alignItems:'center', top: 10}}>
                        <TouchableOpacityBtn title={"Filter"} onPress={filter} />
                    </View>
                </View>
        </View>
    )
}

const mapStatetoProps = ({userLatitudeLongitude,userLocations,userSearchApply}) =>
{
    return {userLatitudeLongitude,userLocations,userSearchApply}
}

export default connect(mapStatetoProps,actions)(MapScreen)
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        height: hp('103%'),
        backgroundColor: 'white'
    }
})