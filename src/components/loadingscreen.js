import React from 'react';
import {Image, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ScreenLoading = () => {
  return (
    <LinearGradient
      start={{x: 1, y: 1}}
      end={{x: 0, y: 0}}
      colors={['#bcffcc', '#ffeebc', '#ffbcbc']}
      style={styles.wrapper}>
      <Image
        source={require('../assets/images/logo_login.png')}
        style={{width: '100%', aspectRatio: 1.5, resizeMode: 'contain'}}
      />
      <Text
        style={{
          color: '#58595b',
          letterSpacing: 2,
          fontWeight: 'bold',
        }}>
        TRAFFIC INFORMATION KEDIRI
      </Text>
      <View style={{marginTop: 20, alignItems: 'center'}}>
        <Text style={{color: '#58595b', letterSpacing: 2}}>
          POWERED BY DISHUB KOTA KEDIRI
        </Text>
        <Text style={{color: '#58595b', letterSpacing: 2}}>2020</Text>
      </View>
    </LinearGradient>
  );
};

const styles = {
  wrapper: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    justifyContent: 'center',
    alignItems: 'center',
    logo: {
      width: 150,
      height: 150,
      backgroundColor: '#522568',
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
    },
  },
};

export default ScreenLoading;
