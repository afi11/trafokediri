import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import url from '../../util/url';
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ActionButton from 'react-native-action-button';
import {colorPrimary} from '../../util/color';
import Snackbar from 'react-native-snackbar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const User = ({navigation}) => {
  const [user, setUser] = useState([]);
  const [iduser, setIduser] = useState('');
  const [user2, setUser2] = useState([]);
  const [query, setQuery] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isFocused = useIsFocused();

  const _retrieveData = async () => {
    try {
      let id = await AsyncStorage.getItem('id');
      setIduser(id);
    } catch (error) {
      // Error retrieving data
    }
  };

  const getUser = () => {
    axios
      .get(`${url}api/user`)
      .then((res) => {
        setLoading(false);
        setError(false);
        setUser(res.data);
        setUser2(res.data);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  };

  const delData = (id) => {
    axios.delete(`${url}api/delete_user/` + id).then((res) => {
      Snackbar.show({
        text: 'Data berhasil dihapus',
        duration: Snackbar.LENGTH_SHORT,
        textColor: '#32e54a',
      });
      setQuery('');
      setUser2(user2.filter((item) => item.id !== id));
    });
  };

  const gotoPage = (page) => {
    navigation.navigate(page);
  };

  const findJalan = (search) => {
    if (search === '') {
      return user2;
    }
    const regex = new RegExp(`${search.trim()}`, 'i');
    return user2.filter((user) => user.username.search(regex) >= 0);
  };

  const konfirmData = (item) => {
    Alert.alert(
      'Hapus Data ',
      item.nama_jalan,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => delData(item.id)},
      ],
      {cancelable: false},
    );
  };

  const dataSearch = findJalan(query);

  useEffect(() => {
    getUser();
    _retrieveData();
    console.log(iduser);
  }, [isFocused]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.searchArea}>
        <View style={styles.iconSearch}>
          <Fontisto
            name="search"
            style={styles.iconSearch.itemIcon}
            size={18}
          />
        </View>
        <TextInput
          style={styles.textSearch}
          placeholder="Username...."
          onChangeText={(text) => setQuery(text)}
        />
      </View>
      <View style={styles.container_list}>
        {error ? (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <MaterialIcons name="error-outline" size={40} />
            <Text>Periksa Jaringan Internet Anda!</Text>
          </View>
        ) : (
          <View />
        )}
        {loading && !error ? (
          <ActivityIndicator size="large" color="rgb(170, 9, 239)" />
        ) : (
          <>
            {error ? (
              <View />
            ) : (
              <View style={styles.container_list.header}>
                <Text style={styles.container_list.header.title}>
                  Daftar Pengguna
                </Text>
              </View>
            )}
            <FlatList
              data={dataSearch}
              renderItem={({item}) => (
                <View style={styles.listJalan.main}>
                  <View style={styles.listJalan.itemText}>
                    <Text style={styles.listJalan.itemText.text}>
                      {item.username}
                    </Text>
                    <Text style={styles.listJalan.itemText.text2}>
                      {item.tipe_akun === '0'
                        ? 'Supervisor'
                        : item.tipe_akun === '1'
                        ? 'Petugas'
                        : item.tipe_akun === '2'
                        ? 'Admin'
                        : ''}
                    </Text>
                  </View>
                  <View style={styles.listJalan.itemButtonAction}>
                    {iduser != item.id ? (
                      <>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('editUser', {item})
                          }
                          style={
                            styles.listJalan.itemButtonAction.buttonAction
                          }>
                          <Icon name="edit" size={24} color="#152bef" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => konfirmData(item)}
                          style={
                            styles.listJalan.itemButtonAction.buttonAction
                          }>
                          <Icon name="trash" size={24} color="#ff1e1e" />
                        </TouchableOpacity>
                      </>
                    ) : (
                      <></>
                    )}
                  </View>
                </View>
              )}
            />
            <ActionButton
              buttonColor={colorPrimary}
              onPress={() => {
                gotoPage('CreateUser');
              }}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = {
  wrapper: {
    flex: 1,
  },
  searchArea: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  iconSearch: {
    width: 40,
    height: 40,
    padding: 7.7,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#4f4f4f',
    backgroundColor: '#fff',
    itemIcon: {
      marginLeft: 4,
      marginTop: 2,
    },
  },
  textSearch: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#4f4f4f',
    height: 40,
  },
  container_list: {
    flex: 1,
    header: {
      flexDirection: 'row',
      marginHorizontal: 10,
      marginBottom: 5,
      justifyContent: 'space-between',
      title: {
        fontWeight: 'bold',
        fontSize: 16,
      },
    },
  },
  listJalan: {
    main: {
      marginHorizontal: 10,
      padding: 8,
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      marginBottom: 5,
    },
    itemText: {
      flex: 2,
      text: {
        fontSize: 18,
      },
      text2: {
        fontSize: 16,
        color: '#7a7a7a',
      },
    },
    itemButtonAction: {
      posititon: 'absolute',
      right: 0,
      flexDirection: 'row',
      buttonAction: {
        marginHorizontal: 10,
        marginTop: 10,
      },
    },
  },
};

export default User;
