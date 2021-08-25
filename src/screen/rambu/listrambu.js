import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import url from '../../util/url';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Image from 'react-native-image-progress';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';
import PrintButton from '../../components/buttonprint';
import {colorThird} from '../../util/color';

const ListRambu = ({route, navigation}) => {
  const [tipeakun, setTipeakun] = useState('');

  const [rambu2, setRambu2] = useState([]);
  const [countRambut, setCountRambu] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const {idJalan} = route.params;
  const {namaJalan} = route.params;

  const isFocused = useIsFocused();

  const getRambu2 = () => {
    axios
      .get(`${url}api/get_rambulalin/${idJalan}`)
      .then((res) => {
        console.log(res.data);
        setError(false);
        setLoading(false);
        setRambu2(res.data);
        setCountRambu(res.data.length);
      })
      .catch((err) => {
        setError(true);
      });
  };

  const _retrieveData = async () => {
    try {
      let id = await AsyncStorage.getItem('id');
      axios.get(`${url}home/getuser/${id}`).then((res) => {
        setTipeakun(res.data.tipe_akun);
      });
    } catch (error) {
      // Error retrieving data
    }
  };

  const delData = (item) => {
    axios
      .delete(`${url}api/deleterambulalin/${item.id_rambu}/${item.foto_lama}`)
      .then((res) => {
        Snackbar.show({
          text: 'Data berhasil dihapus',
          duration: Snackbar.LENGTH_LONG,
          textColor: '#32e54a',
        });
        if (countRambut === 1) {
          setCountRambu(countRambut - 1);
          setRambu2(rambu2.filter((item) => item.id_rambu !== item.id_rambu));
        } else {
          getRambu2();
        }
      });
  };

  const konfirmData = (item) => {
    Alert.alert(
      'Hapus Data ',
      item.jenis,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => delData(item)},
      ],
      {cancelable: false},
    );
  };

  const urlPrintExcell =
    url + 'export/rambulalin/sjjsjwlslsljjjcudjddudd/' + idJalan;
  const urlPrintPDF = url + 'export/rambulalin/skslslw282js728293/' + idJalan;

  const ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#d8d8d8',
          marginVertical: 20,
        }}
      />
    );
  };

  useEffect(() => {
    _retrieveData();
  }, []);

  useEffect(() => {
    getRambu2();
  }, [isFocused]);

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={styles.container_list}>
          <View style={styles.container_list.header}>
            <View style={styles.container_list.header.side}>
              <Text style={styles.container_list.header.title1}>Lokasi</Text>
              <Text style={styles.container_list.header.title2}>
                {namaJalan}
              </Text>
            </View>
            <View style={styles.container_list.header.side}>
              <Text style={styles.container_list.header.title1}>
                Jumlah Rambu
              </Text>
              <Text style={styles.container_list.header.title2}>
                {countRambut}
              </Text>
            </View>
            <View style={styles.container_list.header.side}>
              <Text style={styles.container_list.header.title1}>
                Rekap Data
              </Text>
              <View style={{flexDirection: 'row'}}>
                <PrintButton url={urlPrintExcell} text="Excell" />
                <PrintButton url={urlPrintPDF} text="PDF" />
              </View>
            </View>
            <View style={styles.gap}></View>
          </View>
          <Text
            style={{
              fontSize: 19,
              marginTop: 10,
              marginBottom: 6,
              fontWeight: 'bold',
              color: '#4f4f4f',
              marginHorizontal: 15,
            }}>
            Daftar Rambu
          </Text>
          {error ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                height: 200,
              }}>
              <MaterialCommunityIcons name="folder-alert-outline" size={60} />
              <Text style={{fontSize: 20, marginTop: 5}}>Tidak Ada Data!</Text>
            </View>
          ) : (
            <View />
          )}
          {loading && !error ? (
            <ActivityIndicator size="large" color="rgb(170, 9, 239)" />
          ) : (
            <FlatList
              data={rambu2}
              renderItem={({item, index}) => (
                <View style={styles.listJalan.main}>
                  <View style={styles.listJalan.mainItem}>
                    <Text style={{marginBottom: 8, color: colorThird}}>
                      Diperbarui pada {item.created_at}
                    </Text>
                    <View style={styles.listJalan.mainItem.list_item}>
                      <Text style={styles.listJalan.no_urut}>{index + 1}</Text>
                      <Image
                        source={{uri: item.foto_rambu}}
                        style={styles.listJalan.img}
                        indicatorProps={{
                          size: 50,
                          borderWidth: 0,
                          color: 'rgb(170, 9, 239)',
                          unfilledColor: 'rgb(216, 145, 247)',
                        }}
                      />
                      <View style={styles.listJalan.itemText}>
                        <Text style={styles.listJalan.itemText.text}>
                          Titik Lokasi : {item.titik_lokasi}
                        </Text>
                        <Text style={styles.listJalan.itemText.text}>
                          Jenis : {item.jenis}
                        </Text>
                        <Text style={styles.listJalan.itemText.text}>
                          Kategori : {item.kategori}
                        </Text>
                        <Text style={styles.listJalan.itemText.text}>
                          Tahun : {item.tahun}
                        </Text>
                        <Text style={styles.listJalan.itemText.text}>
                          Kondisi : {item.kondisi}
                        </Text>
                      </View>
                    </View>
                    <ListViewItemSeparator />
                    {tipeakun !== '0' ? (
                      <View style={styles.listJalan.itemButtonAction}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('editRambu', {item})
                          }
                          style={
                            styles.listJalan.itemButtonAction.buttonAction
                          }>
                          <Icon name="edit" size={26} color="#152bef" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => konfirmData(item)}
                          style={
                            styles.listJalan.itemButtonAction.buttonAction
                          }>
                          <Icon name="trash" size={26} color="#ff1e1e" />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View></View>
                    )}
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  wrapper: {
    flex: 1,
  },
  gap: {
    height: 20,
  },
  container_list: {
    flex: 1,
    header: {
      backgroundColor: '#fff',
      borderRadius: 5,
      height: 110,
      flexDirection: 'column',
      marginHorizontal: 10,
      marginTop: 20,
      padding: 10,
      marginBottom: 5,
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.89,
      shadowRadius: 2.65,
      elevation: 2,
      side: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      title1: {
        fontSize: 19,
        marginBottom: 6,
        fontWeight: 'bold',
        color: '#4f4f4f',
        marginRight: 20,
      },
      title2: {
        fontSize: 19,
        marginBottom: 6,
        color: '#4f4f4f',
      },
    },
  },
  listJalan: {
    main: {
      marginHorizontal: 10,
      padding: 5,
      flex: 1,
      position: 'relative',
    },
    no_urut: {
      fontSize: 25,
      fontWeight: 'bold',
      marginRight: 5,
      color: '#4f4f4f',
    },
    mainItem: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 5,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.89,
      shadowRadius: 2.65,
      elevation: 2,
      list_item: {
        flexDirection: 'row',
      },
    },
    img: {
      width: 120,
    },
    itemText: {
      flex: 2,
      marginLeft: 10,
      text: {
        fontSize: 16,
        marginVertical: 5,
      },
    },
    itemButtonAction: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginTop: -10,
      buttonAction: {
        alignSelf: 'flex-end',
        marginHorizontal: 15,
      },
    },
  },
};

export default ListRambu;
