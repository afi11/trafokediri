import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Image,
  AsyncStorage,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';
import Geolocation from '@react-native-community/geolocation';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import url from '../../util/url';
import {
  InputText,
  InputDropdown,
  ButtonSubmit,
  ButtonLoading,
} from '../../components';
import {colorRusak} from '../../util/color';

const EditApil = ({route, navigation}) => {
  const [apil, setApil] = useState([]);

  const [empty, setEmpty] = useState({
    id_jalan: '',
    titik_lokasi: '',
    jenis: '',
    tahun: '',
    lat: '',
    lang: '',
    kondisi: '',
    id_user: '',
  });

  const inputValidate = () => {
    let idjalan = '';
    let titiklokasi = '';
    let jenisapil = '';
    let tahunapil = '';
    let latapil = '';
    let langapil = '';
    let kondisiapil = '';
    var valid = true;
    if (apil.id_jalan === '') {
      idjalan = 'Lokasi Jalan Wajib diisi.';
    }
    if (apil.titik_lokasi === '') {
      titiklokasi = 'Titik Lokasi Wajib diisi.';
    }
    if (apil.jenis === '') {
      jenisapil = 'Jenis Apil Wajib diisi.';
    }
    if (apil.tahun === '') {
      tahunapil = 'Tahun Apil Wajib diisi.';
    }
    if (apil.kondisi === '') {
      kondisiapil = 'Kondisi Apil Wajib diisi.';
    }
    if (apil.lat === '') {
      latapil = 'Latitude Apil Wajib diisi.';
    }
    if (apil.lang === '') {
      langapil = 'Logitude Apil Wajib diisi.';
    }
    setEmpty({
      ...empty,
      ['id_jalan']: idjalan,
      ['titik_lokasi']: titiklokasi,
      ['jenis']: jenisapil,
      ['tahun']: tahunapil,
      ['kondisi']: kondisiapil,
      ['lat']: latapil,
      ['lang']: langapil,
    });
    if (
      apil.id_jalan === '' ||
      apil.titik_lokasi === '' ||
      apil.jenis === '' ||
      apil.tahun === '' ||
      apil.kondisi === '' ||
      apil.lat === '' ||
      apil.lang === ''
    ) {
      valid = false;
    }
    if (valid) {
      postData();
    } else {
      Snackbar.show({
        text: 'Data gagal disimpan, Periksa inputan form anda!',
        duration: Snackbar.LENGTH_LONG,
        textColor: '#fc5f5f',
      });
    }
  };

  const [jalan2, setJalan2] = useState([]);
  const [lat, setLat] = useState('');
  const [lang, setLang] = useState('');
  const [filepath, setFilepath] = useState({});
  const [loading, setLoading] = useState(false);
  const namaJalan = route.params.item.nama_jalan;

  const addKordinat = () => {
    setApil({
      ...apil,
      ['lat']: lat,
      ['lang']: lang,
    });
  };

  const getJalan = () => {
    axios.get(`${url}jalan`).then((res) => {
      setJalan2(res.data);
    });
  };

  const onInputChange = (value, input) => {
    setApil({
      ...apil,
      [input]: value,
    });
    console.log(apil);
  };

  const chooseFile = () => {
    var options = {
      title: 'Select Image',
      quality: 1,
      maxWidth: 480,
      maxHeight: 720,
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: false,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        setFilepath(source);
        setApil({
          ...apil,
          ['nama_foto']: source.fileName,
          ['foto']: source.data,
        });
      }
    });
  };

  const postData = () => {
    setLoading(true);
    axios.put(`${url}api/updateapil/${apil.id_apil}`, apil).then((res) => {
      setLoading(false);
      Snackbar.show({
        text: 'Data berhasil disimpan!',
        duration: Snackbar.LENGTH_LONG,
        textColor: '#32e54a',
      });
      navigation.goBack();
    });
  };

  const _retrieveData = async () => {
    try {
      let id = await AsyncStorage.getItem('id');
      setApil({
        ...apil,
        ['id_apil']: route.params.item.id_apil,
        ['id_jalan']: route.params.item.id_jalan,
        ['jenis']: route.params.item.jenis,
        ['titik_lokasi']: route.params.item.titik_lokasi,
        ['tahun']: route.params.item.tahun,
        ['kondisi']: route.params.item.kondisi,
        ['nama_foto']: route.params.item.nama_foto,
        ['foto_lama']: route.params.item.foto_lama,
        ['foto_apil']: route.params.item.foto_apil,
        ['lat']: route.params.item.lat,
        ['lang']: route.params.item.lang,
        ['id_user']: id,
      });
    } catch (err) {}
  };

  useEffect(() => {
    console.log(route.params.item);
    getJalan();
    _retrieveData();
  }, []);

  const callLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLat(JSON.stringify(position.coords.latitude));
        setLang(JSON.stringify(position.coords.longitude));
        console.log(lat);
        console.log(lang);
      },
      (error) => console.warn(error.message),
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

  useEffect(() => {
    callLocation();
  }, [0]);

  return (
    <ScrollView horizontal={false}>
      <View style={styles.wrapper}>
        <Text style={styles.wrapper.header}>Lokasi : {namaJalan}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Titik Lokasi :{' '}
          </Text>
          <InputText
            value={apil.titik_lokasi}
            placeholder="Contoh : Kiri Jalan"
            onChangeText={(value) => onInputChange(value, 'titik_lokasi')}
            error={empty.titik_lokasi}
          />
        </View>
        <Text style={styles.inputEmpty}>{empty.titik_lokasi}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Jenis :{' '}
          </Text>
          <InputDropdown
            items={[
              {label: 'Traffic Light', value: 'Traffic Light'},
              {label: 'Warning Light', value: 'Warning Light'},
              {label: 'Pelican Crossing', value: 'Pelican Crossing'},
            ]}
            defaultValue={apil.jenis}
            placeholder="Pilih salah satu jenis apil"
            error={empty.jenis}
            onChangeItem={(item) => onInputChange(item.value, 'jenis')}
          />
        </View>
        <Text style={styles.inputEmpty}>{empty.jenis}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Tahun :{' '}
          </Text>
          <InputText
            value={apil.tahun}
            placeholder="Contoh : 2020"
            onChangeText={(value) => onInputChange(value, 'tahun')}
            error={empty.tahun}
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.inputEmpty}>{empty.tahun}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Kondisi :{' '}
          </Text>
          <InputDropdown
            items={[
              {label: 'Bagus', value: 'Bagus'},
              {label: 'Sedang', value: 'Sedang'},
              {label: 'Buruk', value: 'Buruk'},
            ]}
            defaultValue={apil.kondisi}
            error={empty.kondisi}
            placeholder="Pilih satu kondisi apil"
            onChangeItem={(item) => onInputChange(item.value, 'kondisi')}
          />
        </View>
        <Text style={styles.inputEmpty}>{empty.kondisi}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Isikan koordinat jalan secara manual atau otomatis dengan klik
            tombol koordinat saat ini!
          </Text>
          <TouchableOpacity style={styles.btnTKordinat} onPress={addKordinat}>
            <Icon
              name="map-marker"
              color={'#fff'}
              size={18}
              style={{marginRight: 5}}
            />
            <Text style={styles.fontButton}>Ambil Koordinat</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container_form}>
          <View style={styles.container_form.twoColumn}>
            <View style={styles.container_form.twoColumn.div}>
              <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
                Latitude :{' '}
              </Text>
              <InputText
                value={apil.lat}
                onChangeText={(value) => onInputChange(value, 'lat')}
                placeholder="-7.7931332"
                error={empty.lat}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.container_form.twoColumn.div}>
              <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
                Longitude :{' '}
              </Text>
              <InputText
                value={apil.lang}
                onChangeText={(value) => onInputChange(value, 'lang')}
                placeholder="112.0078079"
                error={empty.lang}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
        <Text style={styles.inputEmpty}>{empty.lat + ' ' + empty.lang}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Ambil Foto Apil :{' '}
          </Text>
          <TouchableOpacity style={styles.btnTKordinat} onPress={chooseFile}>
            <Icon
              name="camera"
              color={'#fff'}
              size={18}
              style={{marginRight: 5}}
            />
            <Text style={styles.fontButton}>Klik disini</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.img_preview}>
          <Text>Preview Gambar</Text>
          {filepath.uri != null ? (
            <Image
              source={{uri: filepath.uri}}
              style={{width: 250, height: 250}}
            />
          ) : (
            <Image
              style={{width: 250, height: 250}}
              source={{uri: apil.foto_apil}}
            />
          )}
        </View>
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
      fontSize: 20,
      fontWight: 'bold',
      marginVertical: 10,
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
  fontButton: {
    textAlign: 'center',
    color: '#fff',
  },
  inputEmpty: {
    color: '#ff0000',
    marginTop: -8,
    marginLeft: 5,
  },
};

export default EditApil;
