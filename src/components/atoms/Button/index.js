import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Button = ({label, onPress}) => {
  return (
    <TouchableOpacity style={style.button} onPress={onPress}>
      <Text style={style.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    marginTop: 25,
    height: 55,
    width: '100%',
    backgroundColor: '#FFC103',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {fontSize: 18, fontWeight: '600', color: '#000'},
});

export default Button;
