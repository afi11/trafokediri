import React, {useState, useEffect} from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import Axios from 'axios';
import url from '../../../util/url';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colorRusak} from '../../../util/color';
import RNRestart from 'react-native-restart';

const Akun = () => {
  const [akun, setAkun] = useState({
    username: '',
    tipeAkun: '',
  });

  const _retrieveData2 = async () => {
    try {
      let id = await AsyncStorage.getItem('id');
      console.log('id_user : ' + id);
      Axios.get(`${url}home/getuser/${id}`).then((res) => {
        setAkun({
          ...akun,
          ['username']: res.data.username,
          ['tipeAkun']: res.data.tipe_akun,
        });
      });
    } catch (error) {
      // Error retrieving data
    }
  };

  const handleToGo = () => {
    _removeData();
    RNRestart.Restart();
  };

  const _removeData = async () => {
    try {
      await AsyncStorage.removeItem('id');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('tipe_akun');
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    _retrieveData2();
  }, []);

  const ListViewItemSeparator = () => {
    return (
      <View style={{height: 1, width: '100%', backgroundColor: '#d8d8d8'}} />
    );
  };

  return (
    <View
      style={{
        marginTop: 5,
        flex: 1,
      }}>
      <View style={styles.container}>
        <Text style={styles.text}>Username</Text>
        <Text style={styles.text}>{akun.username}</Text>
      </View>
      <ListViewItemSeparator />
      <View style={styles.container}>
        <Text style={styles.text}>Login sebagai</Text>
        <Text style={styles.text}>
          {akun.tipeAkun === '2'
            ? 'Admin'
            : akun.tipeAkun === '1'
            ? 'Petugas'
            : akun.tipeAkun === '0'
            ? 'Supervisor'
            : ''}
        </Text>
      </View>
      <ListViewItemSeparator />
      <View style={styles.container}>
        <Text style={styles.text}>Ganti akun</Text>
        <TouchableOpacity
          onPress={() => handleToGo()}
          style={{flexDirection: 'row', marginHorizontal: 10}}>
          <Text style={styles.textExit}>Keluar</Text>
          <Icon
            name="exit-to-app"
            color={colorRusak}
            size={20}
            style={{marginTop: 10}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  text: {
    fontSize: 18,
    marginHorizontal: 10,
    marginVertical: 8,
  },
  textExit: {
    fontSize: 18,
    color: colorRusak,
    marginHorizontal: 10,
    marginVertical: 8,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

export default Akun;
