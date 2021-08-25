import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import axios from 'axios';
import url from '../../util/url';
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PrintButton from '../../components/buttonprint';

const urlPrintExcell = url + 'export/kinerjajalan/39dddjsm83iksksdiddjjd';
const urlPrintPDF = url + 'export/kinerjajalan/lspwokwssjjei';

const CountKinerjaByJalan = ({id}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get(`${url}api/count_kinerjajalan/${id}`)
      .then((res) => {
        setCount(res.data);
      })
      .catch((err) => {});
  }, []);

  return <Text style={{marginTop: 5}}>Jumlah Kinerja Jalan {count}</Text>;
};

const Vcratio = ({navigation}) => {
  const [jalan2, setJalan2] = useState([]);
  const [jalan22, setJalan22] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const getJalan = () => {
    axios
      .get(`${url}jalan`)
      .then((res) => {
        setJalan2(res.data);
        setJalan22(res.data);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  };

  const gotoVcratio = (id_jalan, nmjalan) => {
    navigation.navigate('ListVcRatio', {
      idJalan: id_jalan,
      namaJalan: nmjalan,
    });
  };

  const findJalan = (search) => {
    if (search === '') {
      return jalan2;
    }
    const regex = new RegExp(`${search.trim()}`, 'i');
    return jalan22.filter((jalan) => jalan.nama_jalan.search(regex) >= 0);
  };

  const dataSearch = findJalan(query);

  useEffect(() => {
    getJalan();
  }, []);

  return (
    <View style={styles.wrapper}>
      {!error ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginVertical: 15,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Rekap Data</Text>
            <View style={{flexDirection: 'row'}}>
              <PrintButton url={urlPrintExcell} text="Excell" />
              <PrintButton url={urlPrintPDF} text="PDF" />
            </View>
          </View>
          <View style={styles.searchArea}>
            <View style={styles.iconSearch}>
              <Icon
                name="search"
                style={styles.iconSearch.itemIcon}
                size={18}
              />
            </View>
            <TextInput
              style={styles.textSearch}
              placeholder="Masukan Nama Jalan...."
              onChangeText={(text) => setQuery(text)}
            />
          </View>
        </>
      ) : (
        <></>
      )}
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
                  Daftar Jalan
                </Text>
              </View>
            )}
            <FlatList
              data={dataSearch}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    gotoVcratio(item.id_jalan, item.nama_jalan);
                  }}>
                  <View style={styles.listJalan.main}>
                    <View style={styles.listJalan.itemText}>
                      <Text style={styles.listJalan.itemText.text}>
                        {item.nama_jalan}
                      </Text>
                      <Text style={styles.listJalan.itemText.text2}>
                        {item.status_jalan == null
                          ? 'Status Jalan belum diatur'
                          : item.status_jalan}
                      </Text>
                      <CountKinerjaByJalan id={item.id_jalan} />
                    </View>
                    <View style={styles.listJalan.itemButtonAction}>
                      <Icon name="angle-right" />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
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
    marginTop: 5,
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
      marginTop: 3,
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
      marginTop: 15,
      buttonAction: {
        marginRight: 10,
      },
    },
  },
};

export default Vcratio;
