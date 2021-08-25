import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Image from 'react-native-image-progress';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import url from '../../util/url';

const DetailKinerjaJalan = ({route, navigation}) => {
  const [detail, setDetail] = useState([]);
  const [routeline, setRoute] = useState([]);

  const [initialRegion, setInitialRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const getRoute = () => {
    axios.get(`${url}api/peta_ruteline`).then((res) => {
      setRoute(res.data);
    });
  };

  useEffect(() => {
    setInitialRegion({
      ...initialRegion,
      ['latitude']: parseFloat(route.params.item.lat_jalan),
      ['longitude']: parseFloat(route.params.item.long_jalan),
    });
    setDetail(route.params.item);
    getRoute();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {routeline.length > 0 ? (
          <Polyline
            coordinates={routeline
              .filter((line) => line.id_kinerja === detail.id_kinerja)
              .map((data) => ({
                latitude: parseFloat(data.lat_rute),
                longitude: parseFloat(data.long_rute),
              }))}
            strokeColor={
              parseFloat(detail.vc_ratio) >= 0.0 &&
              parseFloat(detail.vc_ratio) <= 0.2
                ? '#07fc44'
                : parseFloat(detail.vc_ratio) >= 0.21 &&
                  parseFloat(detail.vc_ratio) <= 0.44
                ? '#2cc151'
                : parseFloat(detail.vc_ratio) >= 0.45 &&
                  parseFloat(detail.vc_ratio) <= 0.74
                ? '#ff8e16'
                : parseFloat(detail.vc_ratio) >= 0.75 &&
                  parseFloat(detail.vc_ratio) <= 0.84
                ? '#ff8c8c'
                : parseFloat(detail.vc_ratio) >= 0.85 &&
                  parseFloat(detail.vc_ratio) <= 1
                ? '#f20202'
                : '#000'
            }
            strokeWidth={4}
          />
        ) : (
          <></>
        )}

        <Marker
          coordinate={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
          }}
        />
      </MapView>
      <ScrollView style={styles.info_container}>
        <Image
          source={{uri: detail.foto_jalan}}
          indicatorProps={{
            size: 50,
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
        <>
          <View style={styles.info_container.two_column}>
            <View style={styles.info_container.two_column.column_one}>
              <Text style={styles.info_container.text}>Panjang Jalan</Text>
            </View>
            <View style={styles.info_container.two_column.column_two}>
              <Text style={styles.info_container.text}>
                {detail.panjang_jalan} m
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.info_container.two_column}>
            <View style={styles.info_container.two_column.column_one}>
              <Text style={styles.info_container.text}>Lebar Jalan</Text>
            </View>
            <View style={styles.info_container.two_column.column_two}>
              <Text style={styles.info_container.text}>
                {detail.lebar_jalan} m
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.info_container.two_column}>
            <View style={styles.info_container.two_column.column_one}>
              <Text style={styles.info_container.text}>Tipe Jalan</Text>
            </View>
            <View style={styles.info_container.two_column.column_two}>
              <Text style={styles.info_container.text}>
                {detail.tipe_jalan}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.info_container.two_column}>
            <View style={styles.info_container.two_column.column_one}>
              <Text style={styles.info_container.text}>Status Jalan</Text>
            </View>
            <View style={styles.info_container.two_column.column_two}>
              <Text style={styles.info_container.text}>
                {detail.status_jalan}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.info_container.two_column}>
            <View style={styles.info_container.two_column.column_one}>
              <Text style={styles.info_container.text}>Volume Lalu Lintas</Text>
            </View>
            <View style={styles.info_container.two_column.column_two}>
              <Text style={styles.info_container.text}>
                {detail.volume} smp
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.info_container.two_column}>
            <View style={styles.info_container.two_column.column_one}>
              <Text style={styles.info_container.text}>Kapasitas Jalan</Text>
            </View>
            <View style={styles.info_container.two_column.column_two}>
              <Text style={styles.info_container.text}>
                {detail.kapasitas_jalan} smp
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.info_container.two_column}>
            <View style={styles.info_container.two_column.column_one}>
              <Text style={styles.info_container.text}>VC Ratio</Text>
            </View>
            <View style={styles.info_container.two_column.column_two}>
              <Text style={styles.info_container.text}>{detail.vc_ratio}</Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.info_container.two_column}>
            <View style={styles.info_container.two_column.column_one}>
              <Text style={styles.info_container.text}>Kecepatan Ruas</Text>
            </View>
            <View style={styles.info_container.two_column.column_two}>
              <Text style={styles.info_container.text}>
                {detail.kecepatan_ruas} km/jam
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.info_container.two_column}>
            <View style={styles.info_container.two_column.column_one}>
              <Text style={styles.info_container.text}>Hambatan Samping</Text>
            </View>
            <View style={styles.info_container.two_column.column_two}>
              <Text style={styles.info_container.text}>
                {detail.hambatan_samping}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.info_container.two_column}>
            <View style={styles.info_container.two_column.column_one}>
              <Text style={styles.info_container.text}>Arus Bebas</Text>
            </View>
            <View style={styles.info_container.two_column.column_two}>
              <Text style={styles.info_container.text}>
                {detail.arus_bebas}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.info_container.two_column}>
            <View style={styles.info_container.two_column.column_one}>
              <Text style={styles.info_container.text}>Waktu Tempuh</Text>
            </View>
            <View style={styles.info_container.two_column.column_two}>
              <Text style={styles.info_container.text}>
                {detail.waktu_tempuh} menit
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.info_container.two_column}>
            <View style={styles.info_container.two_column.column_one}>
              <Text style={styles.info_container.text}>Kepadatan</Text>
            </View>
            <View style={styles.info_container.two_column.column_two}>
              <Text style={styles.info_container.text}>
                {detail.kepadatan} smp.menit/km
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.info_container.two_column}>
            <View style={styles.info_container.two_column.column_one}>
              <Text style={styles.info_container.text}>LHR</Text>
            </View>
            <View style={styles.info_container.two_column.column_two}>
              <Text style={styles.info_container.text}>
                <Text style={styles.info_container.text}>{detail.lhr} smp</Text>
              </Text>
            </View>
          </View>
          <View style={styles.gap} />
        </>
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  info_container: {
    backgroundColor: '#fff',
    top: 210,
    left: 5,
    right: 5,
    height: 370,
    position: 'absolute',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 2,
    padding: 8,
    two_column: {
      flexDirection: 'row',
      column_one: {
        flex: 1,
      },
      column_two: {
        flex: 1,
        alignItems: 'flex-end',
      },
    },
    text: {
      fontSize: 18,
      marginVertical: 5,
      color: '#474747',
    },
  },
  line: {
    backgroundColor: '#b7b7b7',
    height: 1,
  },
  gap: {
    height: 20,
  },
};

export default DetailKinerjaJalan;
