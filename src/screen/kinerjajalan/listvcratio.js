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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';
import PrintButton from '../../components/buttonprint';
import {colorThird} from '../../util/color';

const ListVCRatio = ({route, navigation}) => {
  const [tipeakun, setTipeakun] = useState('');
  const [vcratio, setVcratio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [countData, setCountData] = useState(0);

  const {idJalan} = route.params;
  const {namaJalan} = route.params;
  const isFocused = useIsFocused();

  const getKinerjaJalan = () => {
    axios
      .get(`${url}api/kinerja_jalan/${idJalan}`)
      .then((res) => {
        setError(false);
        setLoading(false);
        setVcratio(res.data);
        setCountData(res.data.length);
      })
      .catch((err) => {
        setError(true);
      });
  };

  const _retrieveData = async () => {
    try {
      let id = await AsyncStorage.getItem('id');
      console.log('id_user : ' + id);
      axios.get(`${url}home/getuser/${id}`).then((res) => {
        setTipeakun(res.data.tipe_akun);
      });
    } catch (error) {
      // Error retrieving data
    }
  };

  const delData = (id) => {
    axios.delete(`${url}api/delete_kinerja_jalan/` + id).then((res) => {
      Snackbar.show({
        text: 'Data berhasil dihapus',
        duration: Snackbar.LENGTH_LONG,
        textColor: '#32e54a',
      });
      if (countData === 1) {
        setCountData(countData - 1);
        setVcratio(
          vcratio.filter((item) => item.id_kinerja !== item.id_kinerja),
        );
      } else {
        getKinerjaJalan();
      }
    });
  };

  const konfirmData = (item) => {
    Alert.alert(
      'Hapus Data ',
      item.vc_ratio,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => delData(item.id_kinerja)},
      ],
      {cancelable: false},
    );
    console.log(item);
  };

  useEffect(() => {
    console.log(route.params);
  }, []);

  useEffect(() => {
    _retrieveData();
  }, []);

  useEffect(() => {
    getKinerjaJalan();
  }, [isFocused]);

  const urlPrintExcell =
    url + 'export/kinerjajalanbyjalan/kjdjjdkkdko022kkskdjaj/' + idJalan;
  const urlPrintPDF = url + 'export/kinerjajalan/dkllalkkoowowpe/' + idJalan;

  const ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#d8d8d8',
          marginVertical: 10,
        }}
      />
    );
  };

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
                Satuan V & C
              </Text>
              <Text style={styles.container_list.header.title2}>SMP/JAM</Text>
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
          </View>
          <Text
            style={{
              fontSize: 19,
              marginBottom: 8,
              fontWeight: 'bold',
              color: '#4f4f4f',
              marginHorizontal: 10,
            }}>
            Daftar Kinerja Jalan
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
              data={vcratio}
              renderItem={({item, index}) => (
                <View style={styles.listJalan}>
                  <Text style={{marginBottom: 8, color: colorThird}}>
                    Diperbarui pada {item.created_at}
                  </Text>
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <Text
                      style={{
                        color: '#4f4f4f',
                        fontSize: 25,
                        fontWeight: 'bold',
                        marginRight: 5,
                      }}>
                      {index + 1}
                    </Text>
                    <View style={{flexDirection: 'column', flex: 1}}>
                      <View style={styles.listJalan.main}>
                        <View style={styles.listJalan.itemText}>
                          <Text style={styles.listJalan.itemText.text}>
                            Volume (V)
                          </Text>
                        </View>
                        <View style={styles.listJalan.itemText2}>
                          <Text style={styles.listJalan.itemText2.text}>
                            {item.volume}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.listJalan.main}>
                        <View style={styles.listJalan.itemText}>
                          <Text style={styles.listJalan.itemText.text}>
                            Kapasitas Jalan (C)
                          </Text>
                        </View>
                        <View style={styles.listJalan.itemText2}>
                          <Text style={styles.listJalan.itemText2.text}>
                            {item.kapasitas_jalan}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.listJalan.main}>
                        <View style={styles.listJalan.itemText}>
                          <Text style={styles.listJalan.itemText.text}>
                            VC Ratio
                          </Text>
                        </View>
                        <View style={styles.listJalan.itemText2}>
                          <Text style={styles.listJalan.itemText2.text}>
                            {item.vc_ratio}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <ListViewItemSeparator />

                  <View style={styles.listJalan.itemButtonAction}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('DetailKinerjaJalan', {item})
                      }
                      style={styles.listJalan.itemButtonAction.buttonAction}>
                      <View
                        style={{
                          backgroundColor: '#1ab266',
                          padding: 5,
                          borderRadius: 3,
                        }}>
                        <Text style={{color: '#fff', fontSize: 16}}>
                          Lihat Detail
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {tipeakun !== '0' ? (
                      <>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('EditKinerjaJalan', {item})
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
                      </>
                    ) : (
                      <></>
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
    marginHorizontal: 10,
  },
  searchArea: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  iconSearch: {
    width: 40,
    height: 37,
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
    },
  },
  container_list: {
    flex: 1,
    header: {
      backgroundColor: '#fff',
      borderRadius: 5,
      height: 110,
      flexDirection: 'column',
      marginTop: 20,
      padding: 10,
      marginBottom: 20,
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
    main: {
      marginHorizontal: 10,
      padding: 5,
      flex: 1,
      flexDirection: 'row',
    },
    itemText: {
      flex: 1,
      text: {
        fontSize: 18,
        fontWeight: 'bold',
      },
    },
    itemText2: {
      flex: 1,
      text: {
        fontSize: 18,
        textAlign: 'right',
      },
    },
    itemButtonAction: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      buttonAction: {
        alignSelf: 'flex-end',
        marginHorizontal: 15,
      },
    },
  },
};

export default ListVCRatio;
