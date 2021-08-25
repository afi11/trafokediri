import React from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ButtonSubmit = ({onPress}) => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        backgroundColor: '#2065f9',
        borderRadius: 5,
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}>
      <Text
        style={{
          textAlign: 'center',
          color: '#fff',
          fontSize: 18,
          textTransform: 'uppercase',
          letterSpacing: 5,
        }}>
        Simpan
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonSubmit;
