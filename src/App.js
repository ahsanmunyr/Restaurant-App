
import React, { useState,useEffect } from 'react';
import Main from "./Main"
import { Provider, connect} from 'react-redux';
import {Text,View, ActivityIndicator} from 'react-native';
import store from './Store/index'
import FlashMessage from "react-native-flash-message";
import { SafeAreaProvider } from 'react-native-safe-area-context';
const App = () => {
  const [loginState, onChangeLoginState] = React.useState(false);
  if (Text.defaultProps == null) Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;

    return(
      <Provider store={store}>
        <SafeAreaProvider>
          <Main />
          </SafeAreaProvider>
          <FlashMessage
            position='top'  
            statusBarHeight='10' 
            
            style={{
              position: 'absolute',
              zIndex: 9999,
              borderRadius: 12,
              top: 30,
              width: '96%',
              alignSelf:'center',
              marginTop: 20
            }} 
            />
      </Provider>
    )
}

export default App;
