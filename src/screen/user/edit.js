import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import url from '../../util/url';
import {
  InputText,
  InputDropdown,
  ButtonSubmit,
  ButtonLoading,
} from '../../components';

const editUser = ({navigation, route}) => {
  const [user, setUser] = useState([]);

  const [loading, setLoading] = useState(false);

  const [empty, setEmpty] = useState({
    username: '',
    tipe_akun: '',
    password: '',
  });

  const inputValidate = () => {
    let userName = '';
    let tipeAkun = '';
    let passWord = '';
    var valid = true;
    if (user.username === '') {
      userName = 'Username Wajib diisi.';
    }
    if (user.tipe_akun === '') {
      tipeAkun = 'Tipe Akun Wajib diisi.';
    }
    if (user.password === '') {
      passWord = 'Password Wajib diisi.';
    }
    setEmpty({
      ...empty,
      ['username']: userName,
      ['tipe_akun']: tipeAkun,
      ['password']: passWord,
    });
    if (user.username === '' || user.tipe_akun === '' || user.password === '') {
      valid = false;
    }
    if (valid) {
      postData();
    }
  };

  const onInputChange = (value, input) => {
    setUser({
      ...user,
      [input]: value,
    });
  };

  const postData = () => {
    setLoading(true);
    axios.put(`${url}api/update_user/${user.id}`, user).then((res) => {
      setLoading(false);
      if(res.data.data.message == 'SudahAda'){
        Snackbar.show({
          text: 'Data gagal disimpan, Akun Sudah Didaftarkan!',
          duration: Snackbar.LENGTH_LONG,
          textColor: '#fc5f5f',
        });
      }else{
        Snackbar.show({
          text: 'Data berhasil disimpan!',
          duration: Snackbar.LENGTH_LONG,
          textColor: '#32e54a',
        });
        navigation.goBack();
      }
    });
  };

  useEffect(() => {
    setUser(route.params.item);
  }, []);

  return (
    <ScrollView horizontal={false}>
      <View style={styles.wrapper}>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Username :{' '}
          </Text>
          <InputText
            value={user.username}
            onChangeText={(value) => onInputChange(value, 'username')}
            error={empty.username}
          />
        </View>
        <Text style={styles.inputEmpty}>{empty.username}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Tipe Akun :{' '}
          </Text>
          <InputDropdown
            items={[
              {label: 'Supervisor', value: '0'},
              {label: 'Petugas', value: '1'},
              {label: 'Admin', value: '2'},
            ]}
            placeholder="Pilih salah tipe akun"
            defaultValue={user.tipe_akun}
            error={empty.tipe_akun}
            onChangeItem={(item) => onInputChange(item.value, 'tipe_akun')}
          />
        </View>
        <Text style={styles.inputEmpty}>{empty.tipe_akun}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Password :{' '}
          </Text>
          <InputText
            value={user.password}
            onChangeText={(value) => onInputChange(value, 'password')}
            error={empty.password}
          />
        </View>
        <Text style={styles.inputEmpty}>{empty.password}</Text>
        <View style={styles.container_form}>
          {!loading ? (
            <ButtonSubmit onPress={inputValidate} />
          ) : (
            <ButtonLoading />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
    header: {
      fontSize: 18,
      fontWight: 'bold',
    },
  },
  container_form: {
    justifyContent: 'center',
    height: 70,
    flexDirection: 'column',
    marginVertical: 10,
    twoColumn: {
      flex: 1,
      flexDirection: 'row',
      div: {
        flex: 1,
        marginHorizontal: 5,
      },
    },
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fafafa',
    borderColor: '#9b9b9b',
    paddingLeft: 15,
  },
  img_preview: {
    flex: 1,
    alignItems: 'center',
    height: 300,
  },
  btnTKordinat: {
    width: 140,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ff8300',
    borderRadius: 5,
  },
  inputEmpty: {
    color: '#ff0000',
    marginTop: -8,
    marginLeft: 5,
  },
};

export default editUser;
