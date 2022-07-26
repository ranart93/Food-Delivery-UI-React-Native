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
import {Button, Input, Loading} from '../../components';
import {IBack} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';

const SignUp = ({navigation}) => {
  const [inputs, setInputs] = useState({
    fullname: '',
    phone: '',
    email: '',
    password: '',
    repassword: '',
  });

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

    if (!inputs.fullname) {
      handleError('Please input fullname', 'fullname');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('Please input phone', 'phone');
      isValid = false;
    }

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

    if (!inputs.repassword) {
      handleError('Please input repassword', 'repassword');
      isValid = false;
    } else if (inputs.repassword.length < 5) {
      handleError('Repassword must more than 5', 'repassword');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        AsyncStorage.setItem('userData', JSON.stringify(inputs));
        navigation.navigate('SignIn');
        console.log(inputs);
      } catch (e) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 3000);
  };

  return (
    <SafeAreaView style={style.container}>
      <Loading visible={loading} />
      <View>
        <View style={style.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignIn');
            }}>
            <Image source={IBack} style={style.back} />
          </TouchableOpacity>
          <Text style={style.title}>Create an account</Text>
        </View>
        <ScrollView>
          <View style={style.form}>
            <Input
              label="Full Name"
              placeholder="Enter fullname"
              error={errors.fullname}
              onFocus={() => {
                handleError(null, 'fullname');
              }}
              onChangeText={value => handleChange(value, 'fullname')}
            />
            <View style={{height: 10}} />
            <Input
              label="Phone"
              placeholder="Enter phone"
              error={errors.phone}
              onFocus={() => {
                handleError(null, 'phone');
              }}
              onChangeText={value => handleChange(value, 'phone')}
            />
            <View style={{height: 10}} />
            <Input
              label="Email"
              placeholder="Enter email"
              error={errors.email}
              onFocus={() => {
                handleError(null, 'email');
              }}
              onChangeText={value => handleChange(value, 'email')}
            />
            <View style={{height: 10}} />
            <Input
              label="Password"
              placeholder="Enter password"
              password
              error={errors.password}
              onFocus={() => {
                handleError(null, 'password');
              }}
              onChangeText={value => handleChange(value, 'password')}
            />
            <View style={{height: 10}} />
            <Input
              label="Repassword"
              placeholder="Enter repassword"
              password
              error={errors.repassword}
              onFocus={() => {
                handleError(null, 'repassword');
              }}
              onChangeText={value => handleChange(value, 'repassword')}
            />

            <View style={{height: 50}} />

            <Button label="Create an account" onPress={validate} />

            <View style={style.textBottom}>
              <Text style={style.text1}>Have an account ?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignIn');
                }}>
                <Text style={style.text2}>Sign In here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 65,
    paddingHorizontal: 25,
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 1,
  },
  back: {height: 21, width: 11, marginRight: 10},
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3C3737',
    textAlign: 'center',
    flex: 1,
  },
  form: {paddingHorizontal: 25, flex: 1, paddingVertical: 25},
  textBottom: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {color: '#8C8787'},
  text2: {color: '#FF5E03', marginLeft: 5},
});

export default SignUp;
