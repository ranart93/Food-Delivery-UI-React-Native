import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {ILogo} from '../../assets';

const Home = ({navigation}) => {
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    let data = await AsyncStorage.getItem('userData');
    if (data) {
      setUserDetails(JSON.parse(data));
      console.log('Data di Home', userDetails);
    }
  };

  return (
    <View style={style.container}>
      <Image source={ILogo} style={style.logo} />
      <View style={{height: 10}} />
      <Text style={style.text1}>Welcome</Text>
      <View style={{height: 10}} />
      <Text style={style.text2}>
        Success, welcome homepage you can logout by click link below!
      </Text>
      <View style={{height: 10}} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SplashScreen');
        }}>
        <Text style={style.text3}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  logo: {height: 85, width: 99},
  text1: {fontSize: 18, fontWeight: '800', color: '#3C3737'},
  text2: {fontSize: 18, fontWeight: '400', color: '#3F3F41'},
  text3: {fontSize: 18, fontWeight: '600', color: '#BF2427'},
});

export default Home;
