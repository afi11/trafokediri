import React, {useEffect, useState, useRef, useCallback} from 'react';
import {View, Text, AsyncStorage, Picker} from 'react-native';
import axios from 'axios';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Autocomplete from 'react-native-autocomplete-input';
import RBSheet from 'react-native-raw-bottom-sheet';
import Image from 'react-native-image-progress';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import ActionButton from 'react-native-action-button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {PieChart} from 'react-native-svg-charts';
import {Text as TextSVG} from 'react-native-svg';
import url from '../../util/url';
import {styles} from './styles';
import {
  colorPrimary,
  colorBagus,
  colorSedang,
  colorRusak,
} from '../../util/color';

const Home = () => {
  // VC RATIO
  const [peta, setPeta] = useState([]);
  const [peta1, setPeta1] = useState([]);
  const [route, setRoute] = useState([]);
  // Rambu2
  const [rambu, setRambu] = useState([]);
  const [rambu2, setRambu2] = useState([]);
  // Apil
  const [apil, setApil] = useState([]);
  const [apil2, setApil2] = useState([]);
  const [query, setQuery] = useState('');
  const [detail, setDetail] = useState({});
  const [tipemap, setTipemap] = useState('standard');

  const [datamap, setDataMap] = useState('vcratio');

  const [INITIAL_REGION, SET_INITIAL_REGION] = useState({
    latitude: -7.8266872,
    longitude: 112.0088684,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });

  const changeDataMap = (data) => {
    setDataMap(data);
    if (data != 'vcratio') {
      showDetRusakOrNot.current.open();
    }
  };

  // VC RATIO
  const getAllLoc = () => {
    axios
      .get(url + 'api/peta_jalan')
      .then((res) => {
        setPeta(res.data);
        setPeta1(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRoute = () => {
    axios.get(`${url}api/peta_ruteline`).then((res) => {
      setRoute(res.data);
    });
  };

  // Rambu2
  const getAllRambu = () => {
    axios.get(url + 'api/peta_rambulalin').then((res) => {
      setRambu(res.data);
      console.log('n rambu : ' + rambu.length);
      setRambu2(res.data);
      console.log(res.data);
    });
  };

  // Apil
  const getAllApil = () => {
    axios.get(url + 'api/peta_apil').then((res) => {
      setApil(res.data);
      setApil2(res.data);
    });
  };

  // VC Ratio
  const findJalan = (search) => {
    if (search === '') {
      return [];
    } else {
      if (peta.length > 0) {
        const regex = new RegExp(`${search.trim()}`, 'i');
        return peta1.filter((jalan) => jalan.nama_jalan.search(regex) >= 0);
      } else {
        return [];
      }
    }
  };

  // Rambu2
  const findJalanRambu = (search) => {
    if (search === '') {
      return [];
    } else {
      if (rambu.length > 0) {
        const regex = new RegExp(`${search.trim()}`, 'i');
        return rambu2.filter((jalan) => jalan.nama_jalan.search(regex) >= 0);
      } else {
        return [];
      }
    }
  };

  // Apil
  const findApil = (search) => {
    if (search === '') {
      return [];
    } else {
      if (apil.length > 0) {
        const regex = new RegExp(`${search.trim()}`, 'i');
        return apil2.filter((jalan) => jalan.nama_jalan.search(regex) >= 0);
      } else {
        return [];
      }
    }
  };

  const dataSearchJalan = findJalan(query);
  const dataSearchRambu = findJalanRambu(query);
  const dataSearchApil = findApil(query);

  const _retrieveData = async () => {
    try {
      let value = await AsyncStorage.getItem('tipemap');
      console.log(value);
      if (value !== null) {
        setTipemap(value);
      } else {
        setTipemap('standard');
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      _retrieveData();
    }, [tipemap]),
  );

  useEffect(() => {
    getAllLoc();
    getAllRambu();
    getAllApil();
    getRoute();
  }, [isFocused]);

  const refRBSheet = useRef();
  const showDetRusakOrNot = useRef();

  const showDetail = (item) => {
    setDetail(item);
    refRBSheet.current.open();
  };

  const mapRef = useRef();

  const gotoPlace = (item) => {
    setQuery('');
    let region = {};
    if (datamap === 'vcratio') {
      region = {
        latitude: parseFloat(item.lat_jalan),
        longitude: parseFloat(item.long_jalan),
        latitudeDelta: 0.0,
        longitudeDelta: 0.0,
      };
    } else {
      region = {
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lang),
        latitudeDelta: 0.0,
        longitudeDelta: 0.0,
      };
    }
    mapRef.current.animateToRegion(region, 2000);
  };

  const defaultMap = () => {
    let region = {
      latitude: -7.8266872,
      longitude: 112.0088684,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };
    mapRef.current.animateToRegion(region, 2000);
  };

  // Statistik Rambu2 Lalin
  const nRambuBagus =
    rambu.length > 0
      ? rambu.filter((item) => item.kondisi === 'Bagus').length
      : 0;
  const nRambuBuruk =
    rambu.length > 0
      ? rambu.filter((item) => item.kondisi === 'Buruk').length
      : 0;
  const nRambuSedang =
    rambu.length > 0
      ? rambu.filter((item) => item.kondisi === 'Sedang').length
      : 0;

  // Statistik Apil
  const nApilBagus =
    apil.length > 0
      ? apil.filter((item) => item.kondisi === 'Bagus').length
      : 0;
  const nApilBuruk =
    apil.length > 0
      ? apil.filter((item) => item.kondisi === 'Buruk').length
      : 0;
  const nApilSedang =
    apil.length > 0
      ? apil.filter((item) => item.kondisi === 'Sedang').length
      : 0;

  const dataRambu2 = [
    {
      key: 1,
      amount: nRambuBagus,
      svg: {fill: colorBagus},
    },
    {
      key: 2,
      amount: nRambuSedang,
      svg: {fill: colorSedang},
    },
    {
      key: 3,
      amount: nRambuBuruk,
      svg: {fill: colorRusak},
    },
  ];

  const dataApil = [
    {
      key: 1,
      amount: nApilBagus,
      svg: {fill: colorBagus},
    },
    {
      key: 2,
      amount: nApilSedang,
      svg: {fill: colorSedang},
    },
    {
      key: 3,
      amount: nApilBuruk,
      svg: {fill: colorRusak},
    },
  ];

  const LabelRambu = ({slices, height, width}) => {
    return slices.map((slice, index) => {
      const {labelCentroid, pieCentroid, data} = slice;
      return (
        <TextSVG
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={'black'}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={20}
          stroke={'black'}
          strokeWidth={0.2}>
          {data.amount}
        </TextSVG>
      );
    });
  };

  const LabelApil = ({slices, height, width}) => {
    return slices.map((slice, index) => {
      const {labelCentroid, pieCentroid, data} = slice;
      return (
        <TextSVG
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={'black'}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={20}
          stroke={'black'}
          strokeWidth={0.2}>
          {data.amount}
        </TextSVG>
      );
    });
  };

  const ListViewItemSeparator = () => {
    return (
      <View style={{height: 1, width: '100%', backgroundColor: '#d8d8d8'}} />
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={INITIAL_REGION}
        mapType={tipemap}
        showsUserLocation={true}
        userLocationUpdateInterval={5000}
        showsMyLocationButton={true}>
        {datamap === 'rambu2' ? (
          rambu.length > 0 ? (
            rambu.map((rmblalin, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(rmblalin.lat),
                  longitude: parseFloat(rmblalin.lang),
                }}
                onPress={() => showDetail(rmblalin)}>
                <MaterialCommunityIcons
                  name="sign-direction"
                  color={
                    rmblalin.kondisi === 'Bagus'
                      ? colorBagus
                      : rmblalin.kondisi === 'Sedang'
                      ? colorSedang
                      : colorRusak
                  }
                  size={25}
                />
              </Marker>
            ))
          ) : (
            <></>
          )
        ) : datamap === 'vcratio' ? (
          peta.length > 0 ? (
            peta.map((loc, index) => (
              <>
                {route.length > 0 ? (
                  <Polyline
                    key={index}
                    coordinates={route
                      .filter((line) => line.id_kinerja === loc.id_kinerja)
                      .map((data) => ({
                        latitude: parseFloat(data.lat_rute),
                        longitude: parseFloat(data.long_rute),
                      }))}
                    strokeColor={
                      parseFloat(loc.vc_ratio) >= 0.0 &&
                      parseFloat(loc.vc_ratio) <= 0.2
                        ? '#07fc44'
                        : parseFloat(loc.vc_ratio) >= 0.21 &&
                          parseFloat(loc.vc_ratio) <= 0.44
                        ? '#2cc151'
                        : parseFloat(loc.vc_ratio) >= 0.45 &&
                          parseFloat(loc.vc_ratio) <= 0.74
                        ? '#ff8e16'
                        : parseFloat(loc.vc_ratio) >= 0.75 &&
                          parseFloat(loc.vc_ratio) <= 0.84
                        ? '#ff8c8c'
                        : parseFloat(loc.vc_ratio) >= 0.85 &&
                          parseFloat(loc.vc_ratio) <= 1
                        ? '#f20202'
                        : '#000'
                    }
                    strokeWidth={4}
                  />
                ) : (
                  <></>
                )}

                <Marker
                  key={index}
                  coordinate={{
                    latitude: parseFloat(loc.lat_jalan),
                    longitude: parseFloat(loc.long_jalan),
                  }}
                  onPress={() => showDetail(loc)}
                />
              </>
            ))
          ) : (
            <></>
          )
        ) : apil.length > 0 ? (
          apil.map((apilalin, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(apilalin.lat),
                longitude: parseFloat(apilalin.lang),
              }}
              onPress={() => showDetail(apilalin)}>
              <MaterialCommunityIcons
                name="traffic-light"
                color={
                  apilalin.kondisi === 'Bagus'
                    ? colorBagus
                    : apilalin.kondisi === 'Sedang'
                    ? colorSedang
                    : colorRusak
                }
                size={25}
              />
            </Marker>
          ))
        ) : (
          <></>
        )}
      </MapView>
      {/* <ActionButton
        buttonColor={colorPrimary}
        renderIcon={(active) =>
          active ? (
            <MaterialCommunityIcons
              name="map"
              style={styles.actionButtonIcon}
            />
          ) : (
            <MaterialCommunityIcons
              name="map"
              style={styles.actionButtonIcon}
            />
          )
        }
        onPress={() => defaultMap()}></ActionButton> */}
      <View style={styles.search}>
        <View style={styles.navsearch}>
          <Feather name="search" size={24} />
        </View>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={
            datamap === 'vcratio'
              ? dataSearchJalan
              : datamap === 'rambu2'
              ? dataSearchRambu
              : dataSearchApil
          }
          inputContainerStyle={styles.inputSearch}
          defaultValue={query}
          onChangeText={(text) => setQuery(text)}
          placeholder="Masukkan Nama Jalan...."
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => gotoPlace(item)}>
              <Text style={styles.itemText}>
                {datamap === 'vcratio'
                  ? item.nama_jalan + ' | ' + item.vc_ratio
                  : datamap === 'rambu2'
                  ? item.nama_jalan + ' | ' + item.jenis
                  : item.nama_jalan + ' | ' + item.jenis}
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  color: '#727272',
                  fontSize: 14,
                  marginTop: -7,
                }}>
                {item.status_jalan}
              </Text>
              <ListViewItemSeparator />
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.tipemap}>
        <View style={styles.tipemap.area}>
          <Text style={styles.tipemap.text}>Data Peta : </Text>
          <Picker
            selectedValue={datamap}
            style={{height: 40}}
            onValueChange={(itemValue) => changeDataMap(itemValue)}>
            <Picker.Item label="Kinerja Jalan" value="vcratio" />
            <Picker.Item label="Rambu-Rambu" value="rambu2" />
            <Picker.Item label="Apil" value="apil" />
          </Picker>
        </View>
      </View>
      {datamap != 'vcratio' ? (
        <View style={styles.statistik}>
          <TouchableOpacity
            style={styles.statistik.btn}
            onPress={() => showDetRusakOrNot.current.open()}>
            <Text style={styles.statistik.text}>Lihat Statistik</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      )}
      <RBSheet
        ref={showDetRusakOrNot}
        animationType="slide"
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        customStyles={{
          container: {
            flex: 1,
            flexDirection: 'column',
            borderRadius: 10,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        {datamap === 'rambu2' ? (
          <ScrollView horizontal={false}>
            <View style={styles.infosheet.container}>
              <View style={styles.infosheet.moredetail}>
                <Text style={styles.gridLayout.text}>
                  Data Statistik Kondisi Rambu :{' '}
                </Text>
                <PieChart
                  style={{height: 200}}
                  valueAccessor={({item}) => item.amount}
                  data={dataRambu2}
                  outerRadius={'100%'}
                  innerRadius={10}
                  spacing={0}>
                  <LabelRambu />
                </PieChart>
                <Text>Keterangan : </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                    marginTop: 5,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: colorBagus,
                        marginRight: 5,
                      }}></View>
                    <Text> Bagus</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: colorSedang,
                        marginRight: 5,
                      }}></View>
                    <Text> Sedang</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: colorRusak,
                        marginRight: 5,
                      }}></View>
                    <Text> Buruk</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        ) : (
          <ScrollView horizontal={false}>
            <View style={styles.infosheet.container}>
              <View style={styles.infosheet.moredetail}>
                <Text style={styles.gridLayout.text}>
                  Data Statistik Kondisi Apil :{' '}
                </Text>
                <PieChart
                  style={{height: 200}}
                  valueAccessor={({item}) => item.amount}
                  data={dataApil}
                  outerRadius={'100%'}
                  innerRadius={10}
                  spacing={0}>
                  <LabelApil />
                </PieChart>
                <Text>Keterangan : </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                    marginTop: 5,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: colorBagus,
                        marginRight: 5,
                      }}></View>
                    <Text> Bagus</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: colorSedang,
                        marginRight: 5,
                      }}></View>
                    <Text> Sedang</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: colorRusak,
                        marginRight: 5,
                      }}></View>
                    <Text> Buruk</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </RBSheet>
      <RBSheet
        ref={refRBSheet}
        animationType="slide"
        dragFromTopOnly={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        customStyles={{
          container: {
            flex: 1,
            flexDirection: 'column',
            borderRadius: 10,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <ScrollView horizontal={false}>
          {datamap === 'vcratio' ? (
            <View style={styles.infosheet.container}>
              <View style={styles.infosheet.header}>
                <View style={styles.infosheet.judulHeader}>
                  <Text style={styles.infosheet.text.nama_jalan}>
                    {detail.nama_jalan}
                  </Text>
                </View>
                <View style={styles.infosheet.vcratioHeader}>
                  <Text style={styles.infosheet.hdbiasa}>
                    Tingkat Pelayanan
                  </Text>
                  <Text style={styles.infosheet.skor}>
                    {parseFloat(detail.vc_ratio) >= 0.0 &&
                    parseFloat(detail.vc_ratio) <= 0.2
                      ? 'A'
                      : parseFloat(detail.vc_ratio) >= 0.21 &&
                        parseFloat(detail.vc_ratio) <= 0.44
                      ? 'B'
                      : parseFloat(detail.vc_ratio) >= 0.45 &&
                        parseFloat(detail.vc_ratio) <= 0.74
                      ? 'C'
                      : parseFloat(detail.vc_ratio) >= 0.75 &&
                        parseFloat(detail.vc_ratio) <= 0.84
                      ? 'D'
                      : parseFloat(detail.vc_ratio) >= 0.85 &&
                        parseFloat(detail.vc_ratio) <= 1
                      ? 'E'
                      : 'F'}
                  </Text>
                </View>
              </View>
              <View style={styles.gap} />
              <View style={styles.infosheet.moredetail}>
                <Text style={styles.gridLayout.text}>Detail Jalan : </Text>
                <View style={styles.gridLayout}>
                  <View style={styles.gridLayout.judul}>
                    <Text style={styles.infosheet.text.moredetail}>
                      Status Jalan
                    </Text>
                  </View>
                  <View style={styles.gridLayout.item}>
                    <Text style={styles.infosheet.text.moredetail}>
                      {detail.status_jalan}
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.gridLayout}>
                  <View style={styles.gridLayout.judul}>
                    <Text style={styles.infosheet.text.moredetail}>
                      Panjang Jalan
                    </Text>
                  </View>
                  <View style={styles.gridLayout.item}>
                    <Text style={styles.infosheet.text.moredetail}>
                      {detail.panjang_jalan} m
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.gridLayout}>
                  <View style={styles.gridLayout.judul}>
                    <Text style={styles.infosheet.text.moredetail}>
                      Lebar Jalan
                    </Text>
                  </View>
                  <View style={styles.gridLayout.item}>
                    <Text style={styles.infosheet.text.moredetail}>
                      {detail.lebar_jalan} m
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.gridLayout}>
                  <View style={styles.gridLayout.judul}>
                    <Text style={styles.infosheet.text.moredetail}>
                      Tipe Jalan
                    </Text>
                  </View>
                  <View style={styles.gridLayout.item}>
                    <Text style={styles.infosheet.text.moredetail}>
                      {detail.tipe_jalan}
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.gridLayout}>
                  <View style={styles.gridLayout.judul}>
                    <Text style={styles.infosheet.text.moredetail}>
                      Volume Lalin
                    </Text>
                  </View>
                  <View style={styles.gridLayout.item}>
                    <Text style={styles.infosheet.text.moredetail}>
                      {detail.volume} smp
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.gridLayout}>
                  <View style={styles.gridLayout.judul}>
                    <Text style={styles.infosheet.text.moredetail}>
                      Kapasitas Jalan
                    </Text>
                  </View>
                  <View style={styles.gridLayout.item}>
                    <Text style={styles.infosheet.text.moredetail}>
                      {detail.kapasitas_jalan} smp
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.gridLayout}>
                  <View style={styles.gridLayout.judul}>
                    <Text style={styles.infosheet.text.moredetail}>
                      VC Ratio
                    </Text>
                  </View>
                  <View style={styles.gridLayout.item}>
                    <Text style={styles.infosheet.text.moredetail}>
                      {detail.vc_ratio}
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.gridLayout}>
                  <View style={styles.gridLayout.judul}>
                    <Text style={styles.infosheet.text.moredetail}>
                      Kecepatan Ruas
                    </Text>
                  </View>
                  <View style={styles.gridLayout.item}>
                    <Text style={styles.infosheet.text.moredetail}>
                      {detail.kecepatan_ruas} km/jam
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.gridLayout}>
                  <View style={styles.gridLayout.judul}>
                    <Text style={styles.infosheet.text.moredetail}>
                      Hambatan Samping
                    </Text>
                  </View>
                  <View style={styles.gridLayout.item}>
                    <Text style={styles.infosheet.text.moredetail}>
                      {detail.hambatan_samping}
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.gridLayout}>
                  <View style={styles.gridLayout.judul}>
                    <Text style={styles.infosheet.text.moredetail}>
                      Arus Bebas
                    </Text>
                  </View>
                  <View style={styles.gridLayout.item}>
                    <Text style={styles.infosheet.text.moredetail}>
                      {detail.arus_bebas}
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.gridLayout}>
                  <View style={styles.gridLayout.judul}>
                    <Text style={styles.infosheet.text.moredetail}>
                      Waktu Tempuh
                    </Text>
                  </View>
                  <View style={styles.gridLayout.item}>
                    <Text style={styles.infosheet.text.moredetail}>
                      {detail.waktu_tempuh} menit
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.gridLayout}>
                  <View style={styles.gridLayout.judul}>
                    <Text style={styles.infosheet.text.moredetail}>
                      Kepadatan
                    </Text>
                  </View>
                  <View style={styles.gridLayout.item}>
                    <Text style={styles.infosheet.text.moredetail}>
                      {detail.kepadatan} smp.menit/km
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.gridLayout}>
                  <View style={styles.gridLayout.judul}>
                    <Text style={styles.infosheet.text.moredetail}>LHR</Text>
                  </View>
                  <View style={styles.gridLayout.item}>
                    <Text style={styles.infosheet.text.moredetail}>
                      {detail.lhr} smp
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.infosheet.bottomHeader}>
                <Image
                  key={detail.foto_jalan}
                  source={{uri: detail.foto_jalan}}
                  indicatorProps={{
                    size: 60,
                    borderWidth: 0,
                    color: 'rgb(170, 9, 239)',
                    unfilledColor: 'rgb(216, 145, 247)',
                  }}
                  style={{
                    width: '100%',
                    aspectRatio: 1.5,
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </View>
          ) : datamap === 'rambu2' ? (
            <View style={styles.infosheet.container}>
              <View style={styles.infosheet.header}>
                <View style={styles.infosheet.judulHeader}>
                  <Text style={{fontSize: 18}}>Jenis Rambu :</Text>
                  <Text style={styles.infosheet.text.nama_jalan}>
                    {detail.jenis}
                  </Text>
                </View>
                <View style={styles.infosheet.vcratioHeader}>
                  <Text style={styles.infosheet.hdbiasa}>Kondisi</Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 26,
                      color:
                        detail.kondisi === 'Bagus'
                          ? colorBagus
                          : detail.kondisi === 'Sedang'
                          ? colorSedang
                          : colorRusak,
                    }}>
                    {detail.kondisi}
                  </Text>
                </View>
              </View>
              <View style={styles.gap} />
              <View style={styles.infosheet.moredetail}>
                <Text style={styles.gridLayout.text}>Detail Rambu : </Text>
                <View style={styles.gridLayout}>
                  <View style={styles.gridLayout.judul}>
                    <Text style={styles.infosheet.text.moredetail}>Lokasi</Text>
                  </View>
                  <View style={styles.gridLayout.item}>
                    <Text style={styles.infosheet.text.moredetail}>
                      {detail.nama_jalan}
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.gridLayout}>
                  <View style={styles.gridLayout.judul}>
                    <Text style={styles.infosheet.text.moredetail}>
                      Titik Lokasi
                    </Text>
                  </View>
                  <View style={styles.gridLayout.item}>
                    <Text style={styles.infosheet.text.moredetail}>
                      {detail.titik_lokasi}
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.gridLayout}>
                  <View style={styles.gridLayout.judul}>
                    <Text style={styles.infosheet.text.moredetail}>
                      Kategori
                    </Text>
                  </View>
                  <View style={styles.gridLayout.item}>
                    <Text style={styles.infosheet.text.moredetail}>
                      {detail.kategori}
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.gridLayout}>
                  <View style={styles.gridLayout.judul}>
                    <Text style={styles.infosheet.text.moredetail}>Tahun</Text>
                  </View>
                  <View style={styles.gridLayout.item}>
                    <Text style={styles.infosheet.text.moredetail}>
                      {detail.tahun}
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
              </View>
              <View style={styles.infosheet.bottomHeader}>
                <Image
                  source={{uri: detail.foto_rambu}}
                  indicatorProps={{
                    size: 60,
                    borderWidth: 0,
                    color: 'rgb(170, 9, 239)',
                    unfilledColor: 'rgb(216, 145, 247)',
                  }}
                  style={{
                    width: '100%',
                    aspectRatio: 1.5,
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </View>
          ) : (
            <View style={styles.infosheet.container}>
              <View style={styles.infosheet.header}>
                <View style={styles.infosheet.judulHeader}>
                  <Text style={{fontSize: 18}}>Jenis Apil :</Text>
                  <Text style={styles.infosheet.text.nama_jalan}>
                    {detail.jenis}
                  </Text>
                </View>
                <View style={styles.infosheet.vcratioHeader}>
                  <Text style={styles.infosheet.hdbiasa}>Kondisi</Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 26,
                      color:
                        detail.kondisi === 'Bagus'
                          ? colorBagus
                          : detail.kondisi === 'Sedang'
                          ? colorSedang
                          : colorRusak,
                    }}>
                    {detail.kondisi}
                  </Text>
                </View>
              </View>
              <View style={styles.gap} />
              <View style={styles.infosheet.moredetail}>
                <Text style={styles.gridLayout.text}>Detail Apil : </Text>
                <View style={styles.gridLayout}>
                  <View style={styles.gridLayout.judul}>
                    <Text style={styles.infosheet.text.moredetail}>Lokasi</Text>
                  </View>
                  <View style={styles.gridLayout.item}>
                    <Text style={styles.infosheet.text.moredetail}>
                      {detail.nama_jalan}
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.gridLayout}>
                  <View style={styles.gridLayout.judul}>
                    <Text style={styles.infosheet.text.moredetail}>
                      Titik Lokasi
                    </Text>
                  </View>
                  <View style={styles.gridLayout.item}>
                    <Text style={styles.infosheet.text.moredetail}>
                      {detail.titik_lokasi}
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.gridLayout}>
                  <View style={styles.gridLayout.judul}>
                    <Text style={styles.infosheet.text.moredetail}>Tahun</Text>
                  </View>
                  <View style={styles.gridLayout.item}>
                    <Text style={styles.infosheet.text.moredetail}>
                      {detail.tahun}
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
              </View>
              <View style={styles.infosheet.bottomHeader}>
                <Image
                  source={{uri: detail.foto_apil}}
                  indicatorProps={{
                    size: 60,
                    borderWidth: 0,
                    color: 'rgb(170, 9, 239)',
                    unfilledColor: 'rgb(216, 145, 247)',
                  }}
                  style={{
                    width: '100%',
                    aspectRatio: 1.5,
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </RBSheet>
    </View>
  );
};

export default Home;
