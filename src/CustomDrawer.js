import React, {useEffect,useState} from 'react';
import {
  StatusBar,
  Animated,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import TextSample from './Components/Text';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TouchableOpacityBtnSmall from './Components/TouchableOpacityBtnSmall'
import {
  Avatar,TouchableRipple
} from 'react-native-paper';
// import Feather from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Polygon } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { AuthContext } from './AuthContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actions from './Store/Actions'
import {connect} from "react-redux";
import { colors, links } from './Utils/utils';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import { useIsDrawerOpen } from '@react-navigation/drawer';
import { useDrawerStatus } from '@react-navigation/drawer';
import MaskedView from '@react-native-community/masked-view';


const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);
const AnimatedMaskedView = Animated.createAnimatedComponent(MaskedView);

const { width, height } = Dimensions.get('window');
const fromCoords = { x: 0, y: height };
const toCoords = { x: width, y: 0 };

const Button = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Text style={style}>{title}</Text>
    </TouchableOpacity>
  );
};

const routes = [
  {id: 1 ,name: "Home", routeName: 'homes', iconName:'home'},
  {id: 2 ,name: "Map", routeName: 'Map', iconName:'ios-location-sharp'},
  {id: 3 ,name: "Edit Profile", routeName: 'searchStack', iconName:'home'},
  {id: 4 ,name: "Card Details", routeName: 'Home', iconName:'card'}
]

export default function CustomDrawer({ navigation, selectedRoute }) {
  console.log(routes,"Routes")
  const isDrawerOpen = useDrawerStatus() === 'open';
  const polygonRef = React.useRef();
  const animatedWidth = React.useRef(new Animated.Value(0)).current;
  const animation = React.useRef(new Animated.ValueXY(fromCoords)).current;
  const animate = (toValue) => {
    const animations = [
      Animated.spring(animation, {
        toValue: toValue === 1 ? toCoords : fromCoords,
        useNativeDriver: true,
        bounciness: 10,
        speed: 1,
      }),
      Animated.timing(animatedWidth, {
        toValue: toValue === 1 ? width : 0,
        duration: 0,
        useNativeDriver: false,
      }),
    ];

    return Animated.sequence(toValue === 1 ? animations.reverse() : animations);
  };

  React.useEffect(() => {
    const listener = animation.addListener((v) => {
      if (polygonRef?.current) {
        polygonRef.current.setNativeProps({
          points: `0,0 ${v.x}, ${v.y} ${width}, ${height} 0, ${height}`,
        });
      }
    });

    return () => {
      animation.removeListener(listener);
    };
  });

  React.useEffect(() => {
    animate(isDrawerOpen ? 1 : 0).start();
  }, [isDrawerOpen]);

  const opacity = animation.x.interpolate({
    inputRange: [0, width],
    outputRange: [0, 1],
  });

  const translateX = animation.x.interpolate({
    inputRange: [0, width],
    outputRange: [-50, 0],
  });

  const onRoutePress = React.useCallback((route) => {
    navigation.navigate(route);
  }, []);

  const onCloseDrawer = React.useCallback((route) => {
    navigation.closeDrawer();
  }, []);

  return (
    <AnimatedMaskedView
      style={[styles.maskedContainer, { width: animatedWidth }]}
    
      maskElement={
        <Svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ backgroundColor: 'transparent', bottom: 0, position: 'absolute' }}
        >
       
          <AnimatedPolygon
            ref={polygonRef}
            points={`0,0 ${fromCoords.x}, ${fromCoords.y} ${width}, ${height} 0, ${height}`}
            // points={`0,0 ${toCoords.x}, ${toCoords.y} ${width}, ${height} 0, ${height}`}
            fill='blue'
          />
        </Svg>
      }
    >
             <StatusBar translucent backgroundColor="#f54749" />
      <View style={styles.menuContainer}>
      {/* <View style={{position:'absolute', top:50, justifyContent:, alignItems:'center', flexDirection:'row', width: '95%', alignSelf:'center'}}> */}
                {/* <TextSample 
                                    Label="Profile" 
                                    Color="white" 
                                    Size={hp("4%")} 
                                    TextAlign='left'
                                    NumberOfLines={1} 
                                    Font="Overpass-BoldItalic"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                /> */}
        <Ionicons
          onPress={onCloseDrawer}
          name='close'
          size={32}
          color='white'
          style={{ position: 'absolute', top: 40, right: 30 }}
        />
        {/* </View> */}
        <Animated.View
          style={[styles.menu, { opacity, transform: [{ translateX }] }]}
        >
          <View style={{height: 500,  width: '98%', alignSelf:'center', top: 20}}>
           <View style={{justifyContent:'space-around', width: '100%', height: 130, alignItems:'center', flexDirection:'row'}}>
            <Avatar.Image
              source={{uri: 'https://avatars.githubusercontent.com/u/28112558?v=4'}}
              style={{paddingLeft: 15, backgroundColor:'#f87e7f'}}
              size={100}
            /> 
             <View style={{justifyContent:'space-around', flexDirection:'column', height: 80, width: 150}}>
             <TextSample 
                                    Label="Muhammad Ahsan Muneer" 
                                    Color="white" 
                                    Size={hp("2%")} 
                                    TextAlign='left'
                                    NumberOfLines={2} 
                                    Font="Overpass-BoldItalic"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                />

             </View>
            </View>
            <View style={{justifyContent:'flex-start', flexDirection:'column', width:'100%', left: 20}}>
                {/* <TextSample 
                                    Label="Muhammad Ahsan Muneer" 
                                    Color="white" 
                                    Size={hp("2%")} 
                                    TextAlign='left'
                                    NumberOfLines={1} 
                                    Font="Overpass-Bold"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                /> */}
                {routes.map((route, index) => {
              return (
                <TouchableOpacity
                  key={route.id}
              
                  onPress={()=> navigation.navigate(route.routeName)}
                  style={{
                    justifyContent:'flex-start', 
                    flexDirection:'row', width:'100%', 
                    alignItems:'center' ,
                    alignSelf:'flex-start', 
                    // backgroundColor:'blue', 
                    margin: 10
                  }}
                  // style={[
                  //   styles.button,
                  //   {
                  //     textDecorationLine:
                  //       route === selectedRoute ? 'line-through' : 'none',
                  //       color: colors[index],
                  //   },
                  // ]}
                >
                  <Ionicons
               
                  name={route.iconName}
                  size={20}
                  color='white'
                  style={{  }}
                />
          
                  <TextSample 
                                    Label={"    "+route.name}
                                    Color="white" 
                                    Size={hp("3%")} 
                                    TextAlign='left'
                                    NumberOfLines={1} 
                                    Font="Overpass-Bold"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                />
                </TouchableOpacity>
              );
            })}
            </View>
            
          </View>

          <View>
           
          <TouchableOpacity

                  style={{
                    justifyContent:'flex-start', 
                    flexDirection:'row', width:'100%', 
                    alignItems:'center' ,
                    alignSelf:'flex-start', 
                    margin: 10
                  }}
                >
                  <Ionicons
               
                  name='return-down-back-sharp'
                  size={20}
                  color='white'
                />
          
                  <TextSample 
                                    Label={"   Sign Out"}
                                    Color="white" 
                                    Size={hp("3%")} 
                                    TextAlign='left'
                                    NumberOfLines={1} 
                                    Font="Overpass-Bold"
                                    TextDecorationLine='none'
                                    TextTransform='none'
                />
                </TouchableOpacity>
              
           
          </View>
        </Animated.View>
      </View>
    </AnimatedMaskedView>
  );
}

const styles = StyleSheet.create({
  maskedContainer: {
    height: '100%'
  },
  menuContainer: {
    flex: 1,
    backgroundColor: "#f54749",
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  menu: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  button: {
    fontSize: 32,
    color: '#fdfdfd',
    lineHeight: 32 * 1.5,
  },
  buttonSmall: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fdfdfd',
  },
});

// <Button
// key={route}
// title={route}
// style={[
//   styles.button,
//   {
//     textDecorationLine:
//       route === selectedRoute ? 'line-through' : 'none',
//     // color: colors[index],
//   },
// ]}
// onPress={() => onRoutePress(route)}
// />
// function mapStateToProps({userGets}){
//   return {userGets}
// }
// export default connect(null,actions)(DrawerContent)

  