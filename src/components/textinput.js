import React from 'react';
import {TextInput} from 'react-native';

const InputText = ({value, placeholder, error, onChangeText, keyboardType}) => {
  return (
    <TextInput
      style={{
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fafafa',
        borderColor: error != '' ? '#ff0000' : '#9b9b9b',
        paddingLeft: 15,
      }}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  );
};

export default InputText;
