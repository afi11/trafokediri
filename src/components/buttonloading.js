import React from 'react';
import {Text, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ButtonLoading = () => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        backgroundColor: '#848484',
        borderRadius: 5,
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      <ActivityIndicator color="#fff"  />
      <Text
        style={{
          textAlign: 'center',
          color: '#fff',
          fontSize: 14,
          textTransform: 'uppercase',
          letterSpacing: 2,
          marginHorizontal: 5,
        }}>
        Tunggu Sebentar
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonLoading;
