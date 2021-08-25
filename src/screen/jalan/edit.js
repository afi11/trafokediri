import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import url from '../../util/url';
import {
  InputText,
  InputDropdown,
  ButtonSubmit,
  ButtonLoading,
} from '../../components';

const editJalan = ({navigation, route}) => {
  const [jalan, setJalan] = useState({
    nama_jalan: '',
    status_jalan: '',
  });

  const [loading, setLoading] = useState(false);

  const [empty, setEmpty] = useState({
    nama_jalan: '',
    status_jalan: '',
  });

  const inputValidate = () => {
    let nmjalan = '';
    let statusjalan = '';
    var valid = true;
    if (jalan.nama_jalan === '') {
      nmjalan = 'Nama Jalan Wajib diisi.';
    }
    if (jalan.status_jalan === '') {
      statusjalan = 'Status Jalan Wajib diisi.';
    }
    setEmpty({
      ...empty,
      ['nama_jalan']: nmjalan,
      ['status_jalan']: statusjalan,
    });
    if (jalan.nama_jalan === '' || jalan.status_jalan === '') {
      valid = false;
    }
    if (valid) {
      postData();
    }
  };

  const onInputChange = (value, input) => {
    setJalan({
      ...jalan,
      [input]: value,
    });
  };

  useEffect(() => {
    setJalan(route.params.item);
  }, []);

  const postData = () => {
    setLoading(true);
    axios.put(url + `api/update_jalan/${jalan.id_jalan}`, jalan).then((res) => {
      setLoading(false);
      if(res.data.data.message == 'SudahAda'){
        Snackbar.show({
          text: 'Data gagal disimpan, Karena Terjadi Duplikat Data!',
          duration: Snackbar.LENGTH_LONG,
          textColor: '#fc5f5f',
        });
      }else{
        Snackbar.show({
          text: 'Data berhasil disimpan!',
          duration: Snackbar.LENGTH_LONG,
          textColor: '#32e54a',
        });
        navigation.goBack();
      }
    });
  };

  return (
    <ScrollView horizontal={false}>
      <View style={styles.wrapper}>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Nama Jalan :{' '}
          </Text>
          <InputText
            value={jalan.nama_jalan}
            placeholder="Contoh : Jalan Mayor Bismo"
            onChangeText={(value) => onInputChange(value, 'nama_jalan')}
            error={empty.nama_jalan}
          />
        </View>
        <Text style={styles.inputEmpty}>{empty.nama_jalan}</Text>
        <View style={styles.container_form}>
          <Text style={{fontSize: 16, color: '#424242', marginBottom: 5}}>
            Status Jalan :{' '}
          </Text>
          <InputDropdown
            items={[
              {label: 'Nasional', value: 'Nasional'},
              {label: 'Provinsi', value: 'Provinsi'},
              {label: 'Kota', value: 'Kota'},
            ]}
            placeholder="Pilih salah status jalan"
            defaultValue={jalan.status_jalan}
            error={empty.status_jalan}
            onChangeItem={(item) => onInputChange(item.value, 'status_jalan')}
          />
        </View>
        <Text style={styles.inputEmpty}>{empty.status_jalan}</Text>
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
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fafafa',
    borderColor: '#9b9b9b',
    paddingLeft: 15,
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#2065f9',
    borderRadius: 5,
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 5,
  },
  inputEmpty: {
    color: '#ff0000',
    marginTop: -8,
    marginLeft: 5,
  },
};

export default editJalan;
