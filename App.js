import * as React from 'react';
import { Button, View, Text, ScrollView,TouchableOpacity, Image,ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <ScrollView
      style={{
        flexDirection:'column',
        backgroundColor:'#21385E',
        flex:1,
        justifyContent:"flex-start",
        
        }}
    >
      <Image
        style={{
          width:'100%',
          height:150,
        }}
        source={require('./Assets/Pokemon-Logo.png')}
        />
      <GenCard navigation={navigation} generation='I'/>
      <GenCard navigation={navigation} generation='II'/>
      <GenCard navigation={navigation} generation='III'/>
      <GenCard navigation={navigation} generation='IV'/>
      <GenCard navigation={navigation} generation='V'/>
      <GenCard navigation={navigation} generation='VI'/>
      <GenCard navigation={navigation} generation='VII'/>
      <GenCard navigation={navigation} generation='VIII'/>
      <GenCard navigation={navigation} generation='IX'/>
    </ScrollView>
  );
}

function GenCard({navigation, generation}){
    let BackgroundImageSource;
 switch (generation) {
    case 'I':
      BackgroundImageSource = require('./Assets/GenBackground/I.jpg');
      break;
    case 'II':BackgroundImageSource = require('./Assets/GenBackground/II.jpg');break;
    case 'III':BackgroundImageSource = require('./Assets/GenBackground/III.jpg');break;
    case 'IV':BackgroundImageSource = require('./Assets/GenBackground/IV.jpg');break;
    case 'V':BackgroundImageSource = require('./Assets/GenBackground/V.jpg');break;
    case 'VI':BackgroundImageSource = require('./Assets/GenBackground/VI.jpg');break;
    case 'VII':BackgroundImageSource = require('./Assets/GenBackground/VII.jpg');break;
    case 'VIII':BackgroundImageSource = require('./Assets/GenBackground/VIII.jpg');break;
    case 'IX':BackgroundImageSource = require('./Assets/GenBackground/IX.jpg');
 }
 return(
    <View>
      <ImageBackground
        source={BackgroundImageSource}
        resizeMode=''
        style={{
          height:'100%',
          width:'100%',
          flex: 1,
          justifyContent: 'center',
          alignItems:'center',
          margin:5
        }}
      >
      <TouchableOpacity
        onPress={()=> navigation.navigate('Gen',{generation})}
      >

        <Text
        style={{
          fontSize:32,
          color:'#ffcb05',
          textShadowColor:'#1d2c5e',
          textShadowOffset:{width:2,height:2},
          textShadowRadius:5
        }}
        >Geração {generation}</Text>
      </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

function GenScreen({ route }){
  const {generation} = route.params;
  return (
    <ScrollView>
      <Text>
        {generation}
      </Text>
    </ScrollView>
  )
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="Gen" component={GenScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
