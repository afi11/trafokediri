import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Image,
  TextInput,
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

const EditKinerjaJalan = ({route, navigation}) => {
  const [kinerjaJalan, setKinerjaJalan] = useState({});

  const [empty, setEmpty] = useState({
    id_jalan: '',
    panjang_jalan: '',
    lebar_jalan: '',
    tipe_jalan: '',
    volume: '',
    kapasitas_jalan: '',
    vc_ratio: '',
    kecepatan_ruas: '',
    hambatan_samping: '',
    arus_bebas: '',
    waktu_tempuh: '',
    kepadatan: '',
    lhr: '',
    nm_foto: '',
    file_foto: '',
    lat_jalan: '',
    long_jalan: '',
    id_user: '',
  });

  const inputValidate = () => {
    let idjalan = '';
    let panjangjalan = '';
    let lebarjalan = '';
    let tipejalan = '';
    let volumejalan = '';
    let kapasitasjalan = '';
    let vcratiojalan = '';
    let kecepatanruas = '';
    let hamb_samping = '';
    let arusbebas = '';
    let waktutempuh = '';
    let kepadatanjalan = '';
    let lhrjalan = '';
    let latjalan = '';
    let longjalan = '';
    var valid = true;
    if (kinerjaJalan.id_jalan === '') {
      idjalan = 'Lokasi Jalan Wajib diisi.';
    }
    if (kinerjaJalan.panjang_jalan === '') {
      panjangjalan = 'Panjang Jalan Wajib diisi.';
    }
    if (kinerjaJalan.lebar_jalan === '') {
      lebarjalan = 'Lebar Jalan Wajib diisi.';
    }
    if (kinerjaJalan.tipe_jalan === '') {
      tipejalan = 'Tipe Jalan Wajib diisi.';
    }
    if (kinerjaJalan.volume === '') {
      volumejalan = 'Volume Lalu Lintas Wajib diisi.';
    }
    if (kinerjaJalan.kapasitas_jalan === '') {
      kapasitasjalan = 'Kapasitas Jalan Wajib diisi.';
    }
    if (kinerjaJalan.vc_ratio === '') {
      vcratiojalan = 'VC Ratio Jalan Wajib diisi.';
    }
    if (kinerjaJalan.kecepatan_ruas === '') {
      kecepatanruas = 'Kecepatan Ruas Jalan Wajib diisi.';
    }
    if (kinerjaJalan.hambatan_samping === '') {
      hamb_samping = 'Hambatan Samping Wajib diisi.';
    }
    if (kinerjaJalan.arus_bebas === '') {
      arusbebas = 'Arus Bebas Wajib diisi.';
    }
    if (kinerjaJalan.waktu_tempuh === '') {
      waktutempuh = 'Waktu Tempuh Wajib diisi.';
    }
    if (kinerjaJalan.kepadatan === '') {
      kepadatanjalan = 'Kepadatan Wajib diisi.';
    }
    if (kinerjaJalan.lhr === '') {
      lhrjalan = 'LHR Wajib diisi.';
    }
    if (kinerjaJalan.lat_jalan === '') {
      latjalan = 'Latitude Wajib diisi.';
    }
    if (kinerjaJalan.long_jalan === '') {
      longjalan = 'Longitude Wajib diisi.';
    }
    setEmpty({
      ...empty,
      ['id_jalan']: idjalan,
      ['panjang_jalan']: panjangjalan,
      ['lebar_jalan']: lebarjalan,
      ['tipe_jalan']: tipejalan,
      ['volume']: volumejalan,
      ['kapasitas_jalan']: kapasitasjalan,
      ['vc_ratio']: vcratiojalan,
      ['kecepatan_ruas']: kecepatanruas,
      ['hambatan_samping']: hamb_samping,
      ['arus_bebas']: arusbebas,
      ['waktu_tempuh']: waktutempuh,
      ['kepadatan']: kepadatanjalan,
      ['lhr']: lhrjalan,
      ['lat_jalan']: latjalan,
      ['long_jalan']: longjalan,
    });
    if (
      kinerjaJalan.id_jalan === '' ||
      kinerjaJalan.panjang_jalan === '' ||
      kinerjaJalan.lebar_jalan === '' ||
      kinerjaJalan.tipe_jalan === '' ||
      kinerjaJalan.volume === '' ||
      kinerjaJalan.kapasitas_jalan === '' ||
      kinerjaJalan.vc_ratio === '' ||
      kinerjaJalan.kecepatan_ruas === '' ||
      kinerjaJalan.hambatan_samping === '' ||
      kinerjaJalan.arus_bebas === '' ||
      kinerjaJalan.waktu_tempuh === '' ||
      kinerjaJalan.kepadatan === '' ||
      kinerjaJalan.lhr === '' ||
      kinerjaJalan.lat_jalan === '' ||
      kinerjaJalan.long_jalan === ''
    ) {
      valid = false;
      Snackbar.show({
        text: 'Data gagal disimpan, Periksa inputan form anda!',
        duration: Snackbar.LENGTH_LONG,
        textColor: '#fc5f5f',
      });
    }
    if (valid) {
      if (kinerjaJalan.vc_ratio === 'NaN') {
        setEmpty({
          ...empty,
          ['vc_ratio']:
            'VC Ratio Salah Periksa Inputan Kapasitas dan Volume Jalan, Gunakan titik sebagai pengganti koma',
        });
        Snackbar.show({
          text: 'Data gagal disimpan, Periksa inputan form anda!',
          duration: Snackbar.LENGTH_LONG,
          textColor: '#fc5f5f',
        });
      } else {
        postData();
      }
    }
  };

  const [jalan2, setJalan2] = useState([]);
  const [inlain, setInlain] = useState(false);
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
    setKinerjaJalan({
      ...kinerjaJalan,
      ['lat_jalan']: lat,
      ['long_jalan']: lang,
    });
  };

  const onInputChange = (value, input) => {
    if (input === 'tipe_jalan') {
      if (value === 'Lainnya') {
        hideInpLain(true);
      }
    }
    if (input === 'kapasitas_jalan') {
      hitungSkorVcratio(value);
    } else {
      setKinerjaJalan({
        ...kinerjaJalan,
        [input]: value,
      });
      console.log(kinerjaJalan);
    }
  };

  const hitungSkorVcratio = (value) => {
    if (value === '') {
      setKinerjaJalan({
        ...kinerjaJalan,
        ['kapasitas_jalan']: value,
        ['vc_ratio']: value,
      });
    } else {
      let skor_vcratio = kinerjaJalan.volume / value;
      setKinerjaJalan({
        ...kinerjaJalan,
        ['kapasitas_jalan']: value,
        ['vc_ratio']: skor_vcratio.toFixed(3),
      });
    }
  };

  const _retrieveData = async () => {
    try {
      let id = await AsyncStorage.getItem('id');
      setKinerjaJalan({
        ...kinerjaJalan,
        ['id_kinerja']: route.params.item.id_kinerja,
        ['id_jalan']: route.params.item.id_jalan,
        ['panjang_jalan']: route.params.item.panjang_jalan,
        ['nama_jalan']: route.params.item.nama_jalan,
        ['lebar_jalan']: route.params.item.lebar_jalan,
        ['tipe_jalan']: route.params.item.tipe_jalan,
        ['volume']: route.params.item.volume,
        ['kapasitas_jalan']: route.params.item.kapasitas_jalan,
        ['vc_ratio']: route.params.item.vc_ratio,
        ['kecepatan_ruas']: route.params.item.kecepatan_ruas,
        ['hambatan_samping']: route.params.item.hambatan_samping,
        ['arus_bebas']: route.params.item.arus_bebas,
        ['waktu_tempuh']: route.params.item.waktu_tempuh,
        ['kepadatan']: route.params.item.kepadatan,
        ['lhr']: route.params.item.lhr,
        ['nm_foto']: route.params.item.nm_foto,
        ['lat_jalan']: route.params.item.lat_jalan,
        ['long_jalan']: route.params.item.long_jalan,
        ['foto_jalan']: route.params.item.foto_jalan,
        ['id_user']: id,
      });
    } catch (error) {
      // Error retrieving data
    }
  };

  const postData = () => {
    setLoading(true);
    axios
      .put(
        `${url}api/update_kinerja_jalan/${kinerjaJalan.id_kinerja}`,
        kinerjaJalan,
      )
      .then((res) => {
        setLoading(false);
        console.log(kinerjaJalan);
        Snackbar.show({
          text: 'Data berhasil diperbaruhi!',
          duration: Snackbar.LENGTH_LONG,
          textColor: '#32e54a',
        });
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hideInpLain = (kond) => {
    setInlain(kond);
    if (kond) {
      setKinerjaJalan({
        ...kinerjaJalan,
        ['tipe_jalan']: '',
      });
    } else {
      setKinerjaJalan({
        ...kinerjaJalan,
        ['tipe_jalan']: '2/1 UD',
      });
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
        setFilepath(source);
        setKinerjaJalan({
          ...kinerjaJalan,
          ['nm_foto']: source.fileName,
          ['file_foto']: source.data,
        });
      }
    });
  };

  useEffect(() => {
    setKinerjaJalan(route.params.item);
    console.log(route.params.item);
  }, []);

  useEffect(() => {
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
        <Text style={styles.wrapper.header}>
          Lokasi Jalan Saat Ini : {kinerjaJalan.nama_jalan}
        </Text>
        <Text style={styles.inputEmpty}>{empty.id_jalan}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Panjang Jalan :{' '}
          </Text>
          <View style={styles.frmGroup}>
            <InputText
              value={kinerjaJalan.panjang_jalan}
              keyboardType="numeric"
              error={empty.panjang_jalan}
              onChangeText={(value) => onInputChange(value, 'panjang_jalan')}
              placeholder="Contoh : 100"
            />
            <View style={styles.frmGroup.text}>
              <Text style={styles.frmGroup.text.size}>meter</Text>
            </View>
          </View>
        </View>
        <Text style={styles.inputEmpty}>{empty.panjang_jalan}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Lebar Jalan :{' '}
          </Text>
          <View style={styles.frmGroup}>
            <InputText
              value={kinerjaJalan.lebar_jalan}
              keyboardType="numeric"
              error={empty.lebar_jalan}
              onChangeText={(value) => onInputChange(value, 'lebar_jalan')}
              placeholder="Contoh : 70"
            />
            <View style={styles.frmGroup.text}>
              <Text style={styles.frmGroup.text.size}>meter</Text>
            </View>
          </View>
        </View>
        <Text style={styles.inputEmpty}>{empty.lebar_jalan}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Tipe Jalan :{' '}
          </Text>
          {(!inlain && kinerjaJalan.tipe_jalan === '2/1 UD') ||
          kinerjaJalan.tipe_jalan === '2/2 UD' ||
          kinerjaJalan.tipe_jalan === '4/2 UD' ||
          kinerjaJalan.tipe_jalan === '4/2 D' ? (
            <InputDropdown
              items={[
                {label: '2/1 UD', value: '2/1 UD'},
                {label: '2/2 UD', value: '2/2 UD'},
                {label: '4/2 UD', value: '4/2 UD'},
                {label: '4/2 D', value: '4/2 D'},
                {label: 'Lainnya', value: 'Lainnya'},
              ]}
              defaultValue={kinerjaJalan.tipe_jalan}
              error={empty.tipe_jalan}
              placeholder="Pilih satu tipe jalan"
              onChangeItem={(item) => onInputChange(item.value, 'tipe_jalan')}
            />
          ) : (
            <View />
          )}
          {inlain ||
          (kinerjaJalan.tipe_jalan !== '2/1 UD' &&
            kinerjaJalan.tipe_jalan !== '2/2 UD' &&
            kinerjaJalan.tipe_jalan !== '4/2 UD' &&
            kinerjaJalan.tipe_jalan !== '4/2 D') ? (
            <View style={styles.frmGroup}>
              <InputText
                value={kinerjaJalan.tipe_jalan}
                error={empty.tipe_jalan}
                onChangeText={(value) => onInputChange(value, 'tipe_jalan')}
                placeholder="Contoh : 4/2 UD"
              />
              <View style={styles.frmGroup.text}>
                <TouchableOpacity onPress={() => hideInpLain(false)}>
                  <Icon name="refresh" size={24} color={'#ea0e0e'} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View />
          )}
        </View>
        <Text style={styles.inputEmpty}>{empty.tipe_jalan}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Volume Lalu Lintas :{' '}
          </Text>
          <View style={styles.frmGroup}>
            <InputText
              value={kinerjaJalan.volume}
              keyboardType="numeric"
              error={empty.volume}
              onChangeText={(value) => onInputChange(value, 'volume')}
              placeholder="Contoh : 829.5875"
            />
            <View style={styles.frmGroup.text}>
              <Text style={styles.frmGroup.text.size}>SMP</Text>
            </View>
          </View>
        </View>
        <Text style={styles.inputEmpty}>{empty.volume}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Kapasitas Jalan :{' '}
          </Text>
          <View style={styles.frmGroup}>
            <InputText
              value={kinerjaJalan.kapasitas_jalan}
              keyboardType="numeric"
              error={empty.kapasitas_jalan}
              onChangeText={(value) => onInputChange(value, 'kapasitas_jalan')}
              placeholder="Contoh : 4520.880"
            />
            <View style={styles.frmGroup.text}>
              <Text style={styles.frmGroup.text.size}>SMP</Text>
            </View>
          </View>
        </View>
        <Text style={styles.inputEmpty}>{empty.kapasitas_jalan}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            VC Ratio :{' '}
          </Text>
          <TextInput
            style={styles.textInputReadOnly}
            value={kinerjaJalan.vc_ratio}
            placeholder="0"
            editable={false}
          />
        </View>
        <Text style={styles.inputEmpty}>{empty.vc_ratio}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Kecepatan Ruas :{' '}
          </Text>
          <View style={styles.frmGroup}>
            <InputText
              value={kinerjaJalan.kecepatan_ruas}
              keyboardType="numeric"
              error={empty.kecepatan_ruas}
              onChangeText={(value) => onInputChange(value, 'kecepatan_ruas')}
              placeholder="Contoh : 100"
            />
            <View style={styles.frmGroup.text}>
              <Text style={styles.frmGroup.text.size}>Km/jam</Text>
            </View>
          </View>
        </View>
        <Text style={styles.inputEmpty}>{empty.kecepatan_ruas}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Hambatan Samping :{' '}
          </Text>
          <InputText
            value={kinerjaJalan.hambatan_samping}
            keyboardType="numeric"
            error={empty.hambatan_samping}
            onChangeText={(value) => onInputChange(value, 'hambatan_samping')}
            placeholder="Contoh : 100"
          />
        </View>
        <Text style={styles.inputEmpty}>{empty.hambatan_samping}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Arus Bebas :{' '}
          </Text>
          <InputText
            value={kinerjaJalan.arus_bebas}
            keyboardType="numeric"
            error={empty.arus_bebas}
            onChangeText={(value) => onInputChange(value, 'arus_bebas')}
            placeholder="Contoh : 100"
          />
        </View>
        <Text style={styles.inputEmpty}>{empty.arus_bebas}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Waktu Tempuh :{' '}
          </Text>
          <View style={styles.frmGroup}>
            <InputText
              value={kinerjaJalan.waktu_tempuh}
              keyboardType="numeric"
              error={empty.waktu_tempuh}
              onChangeText={(value) => onInputChange(value, 'waktu_tempuh')}
              placeholder="Contoh : 100"
            />
            <View style={styles.frmGroup.text}>
              <Text style={styles.frmGroup.text.size}>menit</Text>
            </View>
          </View>
        </View>
        <Text style={styles.inputEmpty}>{empty.waktu_tempuh}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Kepadatan :{' '}
          </Text>
          <View style={styles.frmGroup}>
            <InputText
              value={kinerjaJalan.kepadatan}
              keyboardType="numeric"
              error={empty.kepadatan}
              onChangeText={(value) => onInputChange(value, 'kepadatan')}
              placeholder="Contoh : 100"
            />
            <View style={styles.frmGroup.text}>
              <Text style={styles.frmGroup.text.size}>smp.menit/km</Text>
            </View>
          </View>
        </View>
        <Text style={styles.inputEmpty}>{empty.kepadatan}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            LHR :{' '}
          </Text>
          <View style={styles.frmGroup}>
            <InputText
              value={kinerjaJalan.lhr}
              keyboardType="numeric"
              error={empty.waktu_tempuh}
              onChangeText={(value) => onInputChange(value, 'lhr')}
              placeholder="Contoh : 100"
            />
            <View style={styles.frmGroup.text}>
              <Text style={styles.frmGroup.text.size}>SMP</Text>
            </View>
          </View>
        </View>
        <Text style={styles.inputEmpty}>{empty.lhr}</Text>
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
                value={kinerjaJalan.lat_jalan}
                onChangeText={(value) => onInputChange(value, 'lat')}
                placeholder="-7.7931332"
                error={empty.lat_jalan}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.container_form.twoColumn.div}>
              <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
                Longitude :{' '}
              </Text>
              <InputText
                value={kinerjaJalan.long_jalan}
                onChangeText={(value) => onInputChange(value, 'lang')}
                placeholder="112.0078079"
                error={empty.long_jalan}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
        <Text style={styles.inputEmpty}>
          {empty.lat_jalan + ' ' + empty.long_jalan}
        </Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Ambil Foto :{' '}
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
              source={{uri: kinerjaJalan.foto_jalan}}
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
  textInputReadOnly: {
    backgroundColor: '#d6d6d6',
    color: '#000',
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingLeft: 15,
  },
  frmGroup: {
    flexDirection: 'row',
    text: {
      position: 'absolute',
      right: 10,
      top: 15,
      fontSize: 20,
      size: {
        fontSize: 16,
      },
    },
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

export default EditKinerjaJalan;
