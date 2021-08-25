import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  AsyncStorage,
  RefreshControl,
  PermissionsAndroid,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import url from '../../util/url';
import {useIsFocused} from '@react-navigation/native';
import {colorPrimary} from '../../util/color';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const KelolaData = ({navigation}) => {
  const [akun, setAkun] = useState({
    username: '',
    tipeAkun: '',
    loading: true,
  });
  const [njalan, setNjalan] = useState(0);
  const [nvcratio, setNvcratio] = useState(0);
  const [nrambu, setNrambu] = useState(0);
  const [napil, setNapil] = useState(0);
  const [nuser, setNuser] = useState(0);

  const handleToGo = (screen) => {
    navigation.navigate(screen);
  };

  const _retrieveData2 = async () => {
    try {
      let id = await AsyncStorage.getItem('id');
      axios.get(`${url}home/getuser/${id}`).then((res) => {
        setAkun({
          ...akun,
          ['username']: res.data.username,
          ['tipeAkun']: res.data.tipe_akun,
          ['loading']: false,
        });
      });
      if (id !== null) {
        requestLocationPermission();
      }
    } catch (error) {}
  };

  const getNdata = () => {
    axios.get(`${url}home/count_data`).then((res) => {
      setNjalan(res.data[0].n_jalan);
      setNvcratio(res.data[0].n_vcratio);
      setNrambu(res.data[0].n_rambu);
      setNapil(res.data[0].n_apil);
      setNuser(res.data[0].n_user);
    });
  };

  const isFocused = useIsFocused();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(5000).then(() => setRefreshing(false));
    _retrieveData2();
    getNdata();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Akses lokasi',
          message: 'Izinkan aplikasi untuk mengakses lokasi?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    _retrieveData2();
    getNdata();
  }, [isFocused]);

  return (
    <>
      <StatusBar backgroundColor={colorPrimary} />
      <LinearGradient
        start={{x: 1, y: 1}}
        end={{x: 0, y: 0}}
        colors={['#f7f7f7', '#e8e8e8', '#e8e8e8']}
        style={styles.wrapper}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={[colorPrimary]}
              onRefresh={onRefresh}
            />
          }>
          <View style={styles.main}>
            {akun.loading ? (
              <View style={{alignItems: 'center', marginTop: 10}}>
                <ActivityIndicator color={colorPrimary} size="large" />
              </View>
            ) : akun.tipeAkun === '1' || akun.tipeAkun === '2' ? (
              <>
                <Text
                  style={{
                    marginHorizontal: 10,
                    marginTop: 10,
                    fontSize: 16,
                    color: '#565656',
                    fontWeight: 'bold',
                  }}>
                  Tambah Data
                </Text>
                <View style={styles.main.areaTambah}>
                  <LinearGradient
                    colors={['#f97777', '#ef3737', '#d81111']}
                    style={styles.main.areaTambah.nav1}>
                    <TouchableOpacity
                      style={styles.main.areaTambah.touch}
                      onPress={() => handleToGo('createRambu')}>
                      <Icon name="sign-direction" size={60} color={'#fff'} />
                      <Text style={styles.main.areaTambah.text}>
                        Rambu Lalin
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  <LinearGradient
                    colors={['#fce46f', '#efd037', '#dbb706']}
                    style={styles.main.areaTambah.nav2}>
                    <TouchableOpacity
                      style={styles.main.areaTambah.touch}
                      onPress={() => handleToGo('createApil')}>
                      <Icon name="traffic-light" size={60} color={'#fff'} />
                      <Text style={styles.main.areaTambah.text}>Apil</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  <LinearGradient
                    colors={['#5cf9ad', '#33ea92', '#08cc6d']}
                    style={styles.main.areaTambah.nav3}>
                    <TouchableOpacity
                      style={styles.main.areaTambah.touch}
                      onPress={() => handleToGo('CreateKinerjaJalan')}>
                      <Icon name="road" size={60} color={'#fff'} />
                      <Text style={styles.main.areaTambah.text}>
                        Kinerja Jalan
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </>
            ) : (
              <></>
            )}
            <Text
              style={{
                marginHorizontal: 10,
                fontSize: 16,
                color: '#565656',
                marginTop: 25,
                fontWeight: 'bold',
              }}>
              Daftar Data
            </Text>
            <View style={styles.main.areaData}>
              {akun.tipeAkun === '2' ? (
                <TouchableOpacity onPress={() => handleToGo('User')}>
                  <View style={styles.main.areaData.nav}>
                    <View style={styles.main.areaData.nav.main}>
                      <Text style={{fontSize: 20, color: '#474747'}}>
                        Pengguna
                      </Text>
                      <Text style={{fontSize: 14, color: '#8c8c8c'}}>
                        Total Pengguna : {nuser}
                      </Text>
                    </View>
                    <Icon name="chevron-right" size={30} />
                  </View>
                </TouchableOpacity>
              ) : (
                <></>
              )}
              {akun.tipeAkun === '1' || akun.tipeAkun === '2' ? (
                <TouchableOpacity onPress={() => handleToGo('Jalan')}>
                  <View style={styles.main.areaData.nav}>
                    <View style={styles.main.areaData.nav.main}>
                      <Text style={{fontSize: 20, color: '#474747'}}>
                        Jalan Kota Kediri
                      </Text>
                      <Text style={{fontSize: 14, color: '#8c8c8c'}}>
                        Total Jalan : {njalan}
                      </Text>
                    </View>
                    <Icon name="chevron-right" size={30} />
                  </View>
                </TouchableOpacity>
              ) : (
                <></>
              )}
              <TouchableOpacity onPress={() => handleToGo('Rambu')}>
                <View style={styles.main.areaData.nav}>
                  <View style={styles.main.areaData.nav.main}>
                    <Text style={{fontSize: 20, color: '#474747'}}>
                      Rambu Lalin
                    </Text>
                    <Text style={{fontSize: 14, color: '#8c8c8c'}}>
                      Total Rambu Lalin : {nrambu}
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={30} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleToGo('Apil')}>
                <View style={styles.main.areaData.nav}>
                  <View style={styles.main.areaData.nav.main}>
                    <Text style={{fontSize: 20, color: '#474747'}}>Apil</Text>
                    <Text style={{fontSize: 14, color: '#8c8c8c'}}>
                      Total Apil : {napil}
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={30} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleToGo('Vcratio')}>
                <View style={styles.main.areaData.nav}>
                  <View style={styles.main.areaData.nav.main}>
                    <Text style={{fontSize: 20, color: '#474747'}}>
                      Kinerja Jalan
                    </Text>
                    <Text style={{fontSize: 14, color: '#8c8c8c'}}>
                      Total Data : {nvcratio}
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={30} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

const styles = {
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#e5e5e5',
  },
  main: {
    marginBottom: 8,
    header: {
      marginVertical: 10,
      marginHorizontal: 10,
      height: 40,
      backgroundColor: '#fff',
      borderRadius: 5,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.89,
      shadowRadius: 2.65,
      elevation: 2,
      akunInfo: {
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    areaTambah: {
      flexDirection: 'row',
      marginHorizontal: 5,
      marginTop: 7,
      flex: 1,
      touch: {
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      nav1: {
        flex: 1,
        height: 100,
        borderRadius: 5,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 4,
      },
      nav2: {
        flex: 1,
        height: 100,
        borderRadius: 5,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 4,
      },
      nav3: {
        flex: 1,
        height: 100,
        borderRadius: 5,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 4,
      },
      text: {
        marginTop: 0,
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 2,
        color: '#fff',
        textAlign: 'center',
      },
    },
    areaData: {
      flexDirection: 'column',
      marginHorizontal: 5,
      marginTop: 10,
      flex: 1,
      nav: {
        height: 70,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginHorizontal: 5,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 2,
        main: {
          flexDirection: 'column',
          marginLeft: 8,
        },
      },
    },
  },
  itemlist: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 18,
  },
  iconlist: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  akunInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default KelolaData;
