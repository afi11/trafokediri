import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Image,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {colorPrimary, colorThird} from '../../util/color';
import AwesomeAlert from 'react-native-awesome-alerts';
import RNRestart from 'react-native-restart';
import url from '../../util/url';

const Login = () => {
  const [user, setUser] = useState({
    password: '',
    username: '',
  });

  const [loading, setLoading] = useState(false);
  const [gagal, setGagal] = useState(false);

  const onInputChange = (value, input) => {
    setUser({
      ...user,
      [input]: value,
    });
    console.log(user);
  };

  const _saveData = async (id, token, tipe) => {
    try {
      await AsyncStorage.setItem('id', id);
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('tipe_akun', tipe);
    } catch (error) {
      // Error retrieving data
    }
  };

  const loginUser = () => {
    if (user.username === '' || user.password === '') {
      setGagal(true);
    } else {
      setLoading(true);
      axios
        .post(`${url}auth/login`, user)
        .then((res) => {
          _saveData(res.data.id, res.data.token, res.data.tipe_akun);
          setLoading(false);
          RNRestart.Restart();
        })
        .catch((err) => {
          setLoading(false);
          setGagal(true);
        });
    }
  };

  return (
    <>
      <AwesomeAlert
        show={gagal}
        title="LOGIN GAGAL"
        message="Periksa kembali username & password anda!"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        titleStyle={{color: '#ff0101', fontWeight: 'bold', fontSize: 20}}
        messageStyle={{textAlign: 'center', fontSize: 16}}
        showConfirmButton={true}
        confirmText="Ya Saya Mengerti"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setGagal(false);
          setLoading(false);
        }}
      />
      <StatusBar backgroundColor={colorPrimary} />
      <View style={styles.wrapper}>
        <Image
          source={require('../../assets/images/logo_login.png')}
          style={{width: '100%', aspectRatio: 1.5, resizeMode: 'contain'}}
        />
        <Text
          style={{
            color: '#58595b',
            letterSpacing: 2,
            fontWeight: 'bold',
            marginBottom: 30,
          }}>
          TRAFFIC INFORMATION KEDIRI
        </Text>
        <View style={styles.form.inputGroup}>
          <TextInput
            style={styles.form.inputForm}
            placeholder="Username...."
            onChangeText={(value) => onInputChange(value, 'username')}
          />
          <Icon
            name="user"
            size={24}
            style={styles.form.iconForm}
            color={colorThird}
          />
        </View>
        <View style={styles.form.inputGroup}>
          <TextInput
            style={styles.form.inputForm}
            placeholder="Password...."
            onChangeText={(value) => onInputChange(value, 'password')}
            secureTextEntry={true}
          />
          <Icon
            name="lock"
            size={24}
            style={styles.form.iconForm}
            color={colorThird}
          />
        </View>
        <View style={styles.form.inputBtnGroup}>
          {!loading ? (
            <TouchableOpacity style={styles.form.btnGroup} onPress={loginUser}>
              <Text style={styles.form.textBtn}>LOGIN</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.form.btnLoading}>
              <ActivityIndicator color="#fff" />
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
          )}
        </View>
        <View style={{marginTop: 50, alignItems: 'center'}}>
          <Text style={{color: '#58595b', letterSpacing: 2}}>
            POWERED BY DISHUB KOTA KEDIRI
          </Text>
          <Text style={{color: '#58595b', letterSpacing: 2}}>2020</Text>
        </View>
      </View>
    </>
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
  form: {
    inputGroup: {
      position: 'relative',
      flexDirection: 'row',
      marginHorizontal: 15,
      marginVertical: 10,
    },
    iconForm: {
      position: 'absolute',
      left: 13,
      top: 12,
    },
    inputForm: {
      flex: 1,
      position: 'relative',
      backgroundColor: '#fff',
      fontSize: 18,
      paddingHorizontal: 45,
      borderWidth: 0.5,
      borderRadius: 30,
      borderColor: colorThird,
    },
    inputBtnGroup: {
      flexDirection: 'row',
      marginHorizontal: 15,
      marginVertical: 20,
    },
    btnGroup: {
      flex: 1,
      borderRadius: 30,
      backgroundColor: colorPrimary,
      padding: 15,
    },
    btnLoading: {
      flex: 1,
      borderRadius: 30,
      backgroundColor: '#848484',
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    textBtn: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 18,
      letterSpacing: 3,
    },
  },
};

export default Login;
