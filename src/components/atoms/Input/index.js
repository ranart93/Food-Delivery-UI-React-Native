import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const Input = ({label, password, error, onFocus, ...props}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <View style={style.container}>
      <Text style={style.label}>{label}</Text>

      <View
        style={[
          style.inputContainer,
          {borderColor: error ? 'red' : isFocus ? '#FFC103' : '#DCDCDC'},
        ]}>
        <TextInput
          secureTextEntry={hidePassword}
          {...props}
          style={style.textInput}
          onFocus={() => {
            onFocus();
            setIsFocus(true);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
        />
        {password && (
          <TouchableOpacity
            style={style.showHide}
            onPress={() => {
              setHidePassword(!hidePassword);
            }}>
            {hidePassword ? (
              <Text style={style.textShowHide}>Show</Text>
            ) : (
              <Text style={style.textShowHide}>Hide</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={{fontSize: 10, color: 'red'}}>{error}</Text>}
    </View>
  );
};

const style = StyleSheet.create({
  label: {marginVertical: 5, fontSize: 14, color: '#3C3737'},
  inputContainer: {
    borderRadius: 15,
    height: 55,
    backgroundColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  showHide: {marginRight: 10},
  textShowHide: {fontSize: 12, color: '#3C3737', fontWeight: '600'},
  textInput: {marginLeft: 10, color: '#C4C4C4', flex: 1},
});

export default Input;
