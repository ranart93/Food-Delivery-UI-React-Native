import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ILogo} from '../../assets';
import {Button, Input, Loading} from '../../components/atoms';

const SignIn = ({navigation}) => {
  const [inputs, setInputs] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (value, input) => {
    setInputs(prevState => ({...prevState, [input]: value}));
  };

  const handleError = (errMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errMessage}));
  };

  // Validate
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('invalid email', 'email');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Password must more than 5', 'password');
      isValid = false;
    }

    if (isValid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      let data = await AsyncStorage.getItem('userData');
      if (data) {
        let userData = JSON.parse(data);
        if (
          inputs.email == userData.email &&
          inputs.password == userData.password
        ) {
          setLoading(false);
          navigation.navigate('Home');
          AsyncStorage.setItem(
            'userData',
            JSON.stringify({...userData, loggidIn: true}),
          );
          console.log(inputs);
        } else {
          Alert.alert('Error', 'User data invalid');
        }
      } else {
        Alert.alert('Error', 'User data not found');
      }
    }, 3000);
  };

  return (
    <SafeAreaView style={style.container}>
      <Loading visible={loading} />
      <ScrollView>
        <View style={style.wrapper}>
          <Image source={ILogo} style={style.logo} />
          <Text style={style.name}>Sign in food delivery now!</Text>
        </View>

        <Input
          label="Email"
          placeholder="Masukan email"
          error={errors.email}
          onFocus={() => {
            handleError(null, 'email');
          }}
          onChangeText={value => handleChange(value, 'email')}
        />

        <View style={{marginBottom: 25}} />

        <Input
          label="Password"
          placeholder="Masukan password"
          password
          error={errors.password}
          onFocus={() => {
            handleError(null, 'password');
          }}
          onChangeText={value => handleChange(value, 'password')}
        />

        <View style={{marginBottom: 10}} />
        <Text style={style.forgotPassword}>Forgot password ?</Text>

        <Button label="Sign In" onPress={validate} />

        <View style={style.textBottom}>
          <Text style={style.text1}>Haven't an account ?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={style.text2}>Sign Up here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {flex: 1, padding: 25, backgroundColor: 'white'},
  wrapper: {alignItems: 'center', marginBottom: 50},
  logo: {height: 85, width: 99, marginTop: 20, marginBottom: 10},
  name: {fontSize: 18, fontWeight: '500', color: '#3C3737'},
  forgotPassword: {fontSize: 14, fontWeight: '500', color: '#FF5E03'},
  textBottom: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {color: '#8C8787'},
  text2: {color: '#FF5E03', marginLeft: 5},
});

export default SignIn;
