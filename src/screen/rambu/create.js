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
  LoadingPost,
  ButtonSubmit,
  ButtonLoading,
} from '../../components';

const CreateRambu = ({navigation}) => {
  const [rambu, setRambu] = useState({
    id_jalan: '',
    titik_lokasi: '',
    jenis: '',
    kategori: '',
    tahun: '',
    lat: '',
    lang: '',
    kondisi: '',
    nama_foto: '',
    foto_rambu: '',
    id_user: '',
  });

  const [empty, setEmpty] = useState({
    id_jalan: '',
    titik_lokasi: '',
    jenis: '',
    kategori: '',
    tahun: '',
    lat: '',
    lang: '',
    kondisi: '',
    nama_foto: '',
  });

  const inputValidate = () => {
    let idjalan = '';
    let titiklokasi = '';
    let jenisrambu = '';
    let katrambu = '';
    let tahunrambu = '';
    let latrambu = '';
    let langrambu = '';
    let kondisirambu = '';
    let fotorambu = '';
    var valid = true;
    if (rambu.id_jalan === '') {
      idjalan = 'Lokasi Jalan Wajib diisi.';
    }
    if (rambu.titik_lokasi === '') {
      titiklokasi = 'Titik Lokasi Wajib diisi.';
    }
    if (rambu.jenis === '') {
      jenisrambu = 'Jenis Rambu Wajib diisi.';
    }
    if (rambu.kategori === '') {
      katrambu = 'Kategori Rambu Wajib diisi.';
    }
    if (rambu.tahun === '') {
      tahunrambu = 'Tahun Rambu Wajib diisi.';
    }
    if (rambu.kondisi === '') {
      kondisirambu = 'Kondisi Rambu Wajib diisi.';
    }
    if (rambu.lat === '') {
      latrambu = 'Latitude Rambu Wajib diisi.';
    }
    if (rambu.lang === '') {
      langrambu = 'Logitude Rambu Wajib diisi.';
    }
    if (rambu.nama_foto === '') {
      fotorambu = 'Foto Rambu Wajib diambil';
    }
    setEmpty({
      ...empty,
      ['id_jalan']: idjalan,
      ['titik_lokasi']: titiklokasi,
      ['jenis']: jenisrambu,
      ['kategori']: katrambu,
      ['tahun']: tahunrambu,
      ['kondisi']: kondisirambu,
      ['lat']: latrambu,
      ['lang']: langrambu,
      ['nama_foto']: fotorambu,
    });
    if (
      rambu.id_jalan === '' ||
      rambu.titik_lokasi === '' ||
      rambu.jenis === '' ||
      rambu.kategori === '' ||
      rambu.tahun === '' ||
      rambu.kondisi === '' ||
      rambu.lat === '' ||
      rambu.lang === '' ||
      rambu.nama_foto === ''
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

  const getJalan = () => {
    axios.get(`${url}jalan`).then((res) => {
      setJalan2(res.data);
    });
  };

  const addKordinat = () => {
    setRambu({
      ...rambu,
      ['lat']: lat,
      ['lang']: lang,
    });
  };

  const onInputChange = (value, input) => {
    setRambu({
      ...rambu,
      [input]: value,
    });
    console.log(rambu);
  };

  const _retrieveData = async () => {
    try {
      let id = await AsyncStorage.getItem('id');
      setRambu({
        ...rambu,
        ['id_user']: id,
      });
    } catch (error) {
      // Error retrieving data
    }
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
        skipBackup: true,
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
        setRambu({
          ...rambu,
          ['nama_foto']: source.fileName,
          ['foto_rambu']: source.data,
        });
      }
    });
  };

  const postData = () => {
    setLoading(true);
    axios.post(`${url}api/create_rambulalin`, rambu).then((res) => {
      setLoading(false);
      Snackbar.show({
        text: 'Data berhasil disimpan!',
        duration: Snackbar.LENGTH_LONG,
        textColor: '#32e54a',
      });
      navigation.goBack();
    });
  };

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

  useEffect(() => {
    getJalan();
    _retrieveData();
  }, []);

  return (
    <ScrollView horizontal={false}>
      <View style={styles.wrapper}>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Lokasi Jalan :{' '}
          </Text>
          <InputDropdown
            items={jalan2.map((jalan) => ({
              label:
                jalan.nama_jalan +
                ' | ' +
                (jalan.status_jalan == null
                  ? 'Status Jalan belum diatur'
                  : jalan.status_jalan),
              value: jalan.id_jalan,
            }))}
            placeholder="Pilih salah satu jalan"
            searchable={true}
            error={empty.id_jalan}
            onChangeItem={(item) => onInputChange(item.value, 'id_jalan')}
          />
        </View>
        <Text style={styles.inputEmpty}>{empty.id_jalan}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Titik Lokasi :{' '}
          </Text>
          <InputText
            value={rambu.titik_lokasi}
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
              {label: 'Rambu-Rambu', value: 'Rambu-Rambu'},
              {label: 'RPPJ', value: 'RPPJ'},
              {label: 'Rambu Elektrik', value: 'Rambu Elektrik'},
            ]}
            placeholder="Pilih salah satu jenis rambu"
            error={empty.jenis}
            onChangeItem={(item) => onInputChange(item.value, 'jenis')}
          />
        </View>
        <Text style={styles.inputEmpty}>{empty.jenis}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Kategori :{' '}
          </Text>
          <InputDropdown
            items={[
              {label: 'Larangan', value: 'Larangan'},
              {label: 'Peringatan', value: 'Peringatan'},
              {label: 'Perintah', value: 'Perintah'},
              {label: 'Petunjuk', value: 'Petunjuk'},
            ]}
            error={empty.kategori}
            placeholder="Pilih satu kategori rambu"
            onChangeItem={(item) => onInputChange(item.value, 'kategori')}
          />
        </View>
        <Text style={styles.inputEmpty}>{empty.kategori}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Tahun :{' '}
          </Text>
          <InputText
            value={rambu.tahun}
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
            error={empty.kondisi}
            placeholder="Pilih satu kondisi rambu"
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
                value={rambu.lat}
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
                value={rambu.lang}
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
            Ambil Foto Rambu :{' '}
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
        <Text style={styles.inputEmpty}>{empty.nama_foto}</Text>
        <View style={styles.img_preview}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Preview Gambar
          </Text>
          {filepath.uri != null ? (
            <Image
              source={{uri: filepath.uri}}
              style={{width: 250, height: 250}}
            />
          ) : (
            <Image
              style={{width: 250, height: 250}}
              source={require('../../assets/images/preview_img.png')}
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
      fontSize: 18,
      fontWight: 'bold',
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
  img_preview: {
    flex: 1,
    alignItems: 'center',
    height: 300,
  },
  btnTKordinat: {
    width: 150,
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

export default CreateRambu;
