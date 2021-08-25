import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, PermissionsAndroid} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import url from '../../../util/url';

const TambahJalan = ({navigation}) => {
  const [jalan2, setJalan2] = useState({
    node_awal: '',
    node_akhir: '',
    kode_link: '',
    nama_jalan: '',
    tipe_jalan: '',
    volume: '',
    kapasitas_jalan: '',
    vc_ratio: '',
    rangking: '',
    latitude: '',
    longititude: '',
  });
  const [lat, setLat] = useState('');
  const [lang, setLang] = useState('');

  const postData = () => {
    axios.post(url + 'crud_jalan.php?mode=post', jalan2).then((res) => {
      Snackbar.show({
        text: 'Data berhasil disimpan!',
        duration: Snackbar.LENGTH_SHORT,
      });
      navigation.goBack();
    });
  };

  const addKordinat = () => {
    setJalan2({
      ...jalan2,
      ['latitude']: lat,
      ['longititude']: lang,
    });
  };

  const onInputChange = (value, input) => {
    setJalan2({
      ...jalan2,
      [input]: value,
    });
    console.log(jalan2);
  };

  useEffect(() => {
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          callLocation();
        } else {
          alert('Permission Denied');
        }
      } catch (err) {
        alert('err', err);
        console.warn(err);
      }
    }
    requestLocationPermission();
    const callLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setLat(JSON.stringify(position.coords.latitude));
          setLang(JSON.stringify(position.coords.longitude));
          console.log(lat);
          console.log(lang);
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
      const watchID = Geolocation.watchPosition((position) => {
        console.log(position);
        setLat(JSON.stringify(position.coords.latitude));
        setLang(JSON.stringify(position.coords.longitude));
        console.log(lat);
        console.log(lang);
      });
      return () => {
        Geolocation.clearWatch(watchID);
      };
    };
  }, [0]);

  return (
    <ScrollView horizontal={false}>
      <View style={styles.wrapper}>
        <View style={styles.container_form}>
          <Text>Node Awal : </Text>
          <TextInput
            style={styles.textInput}
            value={jalan2.node_awal}
            onChangeText={(value) => onInputChange(value, 'node_awal')}
            placeholder="Contoh : 402"
          />
        </View>
        <View style={styles.container_form}>
          <Text>Node Akhir : </Text>
          <TextInput
            style={styles.textInput}
            value={jalan2.node_akhir}
            onChangeText={(value) => onInputChange(value, 'node_akhir')}
            placeholder="Contoh : 404"
          />
        </View>
        <View style={styles.container_form}>
          <Text>Kode Link : </Text>
          <TextInput
            style={styles.textInput}
            value={jalan2.kode_link}
            onChangeText={(value) => onInputChange(value, 'kode_link')}
            placeholder="Contoh : 035"
          />
        </View>
        <View style={styles.container_form}>
          <Text>Nama Jalan : </Text>
          <TextInput
            style={styles.textInput}
            value={jalan2.nama_jalan}
            onChangeText={(value) => onInputChange(value, 'nama_jalan')}
            placeholder="Contoh : Jalan Mayor Bismo"
          />
        </View>
        <View style={styles.container_form}>
          <Text>Fungsi Jalan : </Text>
          <TextInput
            style={styles.textInput}
            value={jalan2.fungsi_jalan}
            onChangeText={(value) => onInputChange(value, 'fungsi_jalan')}
            placeholder="Contoh : Arteri Primer / Kolektor Primer / Kolektor Sekunder / Lokal"
          />
        </View>
        <View style={styles.container_form}>
          <Text>Tipe Jalan : </Text>
          <TextInput
            style={styles.textInput}
            value={jalan2.tipe_jalan}
            onChangeText={(value) => onInputChange(value, 'tipe_jalan')}
            placeholder="Contoh : 4/2 UD"
          />
        </View>
        <View style={styles.container_form}>
          <Text>Volume : </Text>
          <TextInput
            style={styles.textInput}
            value={jalan2.volume}
            onChangeText={(value) => onInputChange(value, 'volume')}
            placeholder="Contoh : 1557,3833"
          />
        </View>
        <View style={styles.container_form}>
          <Text>Kapasitas Jalan : </Text>
          <TextInput
            style={styles.textInput}
            value={jalan2.kapasitas_jalan}
            onChangeText={(value) => onInputChange(value, 'kapasitas_jalan')}
            placeholder="Contoh : 4.619,160"
          />
        </View>
        <View style={styles.container_form}>
          <Text>V/C Ratio : </Text>
          <TextInput
            style={styles.textInput}
            value={jalan2.vc_ratio}
            onChangeText={(value) => onInputChange(value, 'vc_ratio')}
            placeholder="Contoh : 0,337"
          />
        </View>
        <View style={styles.container_form}>
          <Text>Rangking : </Text>
          <TextInput
            style={styles.textInput}
            value={jalan2.rangking}
            onChangeText={(value) => onInputChange(value, 'rangking')}
            placeholder="Contoh : 29"
          />
        </View>
        <View style={styles.container_form}>
          <Text>
            Isikan koordinat jalan secara manual atau dengan klik tombol
            koordinat saat ini!
          </Text>
          <TouchableOpacity style={styles.btnTKordinat} onPress={addKordinat}>
            <Text style={styles.fontButton}>Ambil Koordinat</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container_form}>
          <Text>Koordinat Jalan (Latitude) : </Text>
          <TextInput
            style={styles.textInput}
            value={jalan2.latitude}
            onChangeText={(value) => onInputChange(value, 'latitude')}
            placeholder="Contoh Latitude : -7.7931332"
          />
        </View>
        <View style={styles.container_form}>
          <Text>Koordinat Jalan (Longitude) : </Text>
          <TextInput
            style={styles.textInput}
            value={jalan2.longititude}
            onChangeText={(value) => onInputChange(value, 'longititude')}
            placeholder="Contoh Longitude : 112.0078079"
          />
        </View>
        <View style={styles.container_form}>
          <TouchableOpacity style={styles.btnSubmit} onPress={postData}>
            <Text style={styles.fontButton}>Simpan</Text>
          </TouchableOpacity>
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
  },
  container_form: {
    justifyContent: 'center',
    height: 60,
    flexDirection: 'column',
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#2065f9',
    borderRadius: 5,
  },
  btnTKordinat: {
    width: 140,
    padding: 10,
    backgroundColor: '#ff8300',
    borderRadius: 5,
  },
  fontButton: {
    textAlign: 'center',
    color: '#fff',
  },
};

export default TambahJalan;
