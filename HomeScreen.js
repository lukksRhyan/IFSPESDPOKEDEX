import React from 'react';
import {TouchableOpacity, View, ScrollView, Image } from 'react-native';
import GenCard from './GenCard';

function HomeScreen({ navigation }) {
  return (
    <ScrollView
      style={{
        flexDirection: 'column',
        backgroundColor: '#30a7d7',
        flex: 1,
        justifyContent: 'flex-start',
      }}
    >
    <View>
      <Image
        style={{
          width: '100%',
          height: 150,
        }}
        source={require('./Assets/Pokemon-Logo.png')}
      />
      <GenCard navigation={navigation} generation="I" />
      <GenCard navigation={navigation} generation="II" />
      <GenCard navigation={navigation} generation="III" />
      <GenCard navigation={navigation} generation="IV" />
      <GenCard navigation={navigation} generation="V" />
      <GenCard navigation={navigation} generation="VI" />
      <GenCard navigation={navigation} generation="VII" />
      <GenCard navigation={navigation} generation="VIII" />
      <GenCard navigation={navigation} generation="IX" />
    </View>
    <TouchableOpacity>
    
    </TouchableOpacity>
    </ScrollView>
  );
}

export default HomeScreen;
