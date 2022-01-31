import React, { useReducer } from 'react'
import { StyleSheet, Image, Pressable,View } from 'react-native'
import { MotiView } from 'moti'
import * as actions from '../Store/Actions';
import {connect} from 'react-redux';

function Shape({nav}) {
  return (
    <MotiView

      from={{
        width: 110, height: 110,
        borderRadius: 50,
        borderWidth: 0.5,
        // shadowOpacity: 0.5,
        
      }}
      animate={{
        width: 60,
        height: 60,
        // borderRadius: 50,
        // borderWidth: 4,
        // shadowOpacity: 1,
        // shadowOffset: { width: 0, height: 0 },
        // shadowRadius: 10,
        
      }}
      transition={{
        type: 'timing',
        duration: 1000,
        loop: true
        // type: ,
        // duration: 1500,
        // delay: 100,
      }}
      style={styles.shape}
    >
      <Pressable 
        onPress={()=> nav.navigation.navigate('ProcessStack')}
      > 
          <Image style={{ height: 100, width: 100 }} resizeMode='contain' source={require('./../Assets/Images/logo.png')} />
      </Pressable>
    </MotiView>
  )
}

const Loop = ({navigationApp}) => {
  return (
    <MotiView  style={styles.container}>
      {/* <Pressable onPress={()=> alert("SAD")}>  */}
      <Shape nav={navigationApp}  />
      {/* </Pressable> */}
    </MotiView>
  )
}
function mapStateToProps({
  navigationApp
}) {
  return {
    navigationApp
  };
}
export default connect(mapStateToProps, actions)(Loop);

const styles = StyleSheet.create({
  shape: {
    justifyContent: 'center',
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    // marginRight: 10,
    backgroundColor: 'white',
    borderColor: '#f54749',
    shadowColor: '#f54749',
    // shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    elevation: 7
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // backgroundColor: '#9c1aff',
  },
})