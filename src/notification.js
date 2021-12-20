function Routes({theme,user,setUserOnload}){
    const navigation=useRef(null)
    const [loading,setLoading]=useState(true)
    const [initialRoute, setInitialRoute] = useState('home');
    useEffect(()=>{
      getId()
  
      messaging()
        .subscribeToTopic('ecomerce')
        .then(() => console.log('Subscribed to topic!'));
  
        messaging().onNotificationOpenedApp(remoteMessage => {
          console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
          );
          if(navigation.current){
            navigation.current.navigate("notification")
          }
        });
    
        // Check whether an initial notification is available
        messaging()
          .getInitialNotification()
          .then(remoteMessage => {
            if (remoteMessage) {
              console.log(
                'Notification caused app to open from quit state:',
                remoteMessage.notification,
              );
              setInitialRoute("notification"); // e.g. "Settings"
            }
          });
  
          const unsubscribe = messaging().onMessage(async remoteMessage => {
            PushNotification.localNotification({
              channelId: "channel-id",
              channelName: "My channel",
              message:remoteMessage.notification.body,
              playSound:true,
              title:remoteMessage.notification.title,
              priority:'high',
              soundName:'default',
              
            })
          });
          return unsubscribe;
    },[])
  
   async function getId(){
      const id=await AsyncStorage.getItem('id');
      setLoading(false)
      id?setUserOnload(id):null
    }
    if(loading){
      return <Loader/>
    }else{
      return(
        <NavigationContainer 
        ref={navigation}
        theme={theme=="dark"?darkTheme:MyTheme}>
          {user.success?Tabs(initialRoute):AuthRoutes()}
        </NavigationContainer>
      )
    }
  }
  
  function mapStateToProps({theme,user}){
    return {theme,user}
  }
  
  export default connect(mapStateToProps,actions)(Routes);