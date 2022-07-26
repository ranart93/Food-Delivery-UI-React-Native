import React, {useEffect} from 'react';
import {Text, StyleSheet, Image, ImageBackground} from 'react-native';
import {ILogo, ILBackground} from '../../assets';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('SignIn');
    }, 2000);
  }, []);
  return (
    <ImageBackground source={ILBackground} style={style.container}>
      <Image source={ILogo} />
      <Text style={style.name}>Food Delivery</Text>
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#FFC103',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {fontSize: 24, fontWeight: 'bold', color: '#3C3737', marginTop: 10},
});

export default SplashScreen;
