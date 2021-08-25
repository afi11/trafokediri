import React, {useEffect, useState, useRef} from 'react';
import {View, AsyncStorage, Text, Image} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Toast, {DURATION} from 'react-native-easy-toast';
import {colorPrimary} from '../../../util/color';

const SetTipeMap = () => {
  const [tipe, setTipe] = useState('');
  const toastRef = useRef();

  const cekList = (tipe) => {
    if (tipe == 'standard') {
      setTipe('standard');
      _storeData('standard');
    }
    if (tipe == 'hybrid') {
      setTipe('hybrid');
      _storeData('hybrid');
    }
    if (tipe == 'satellite') {
      setTipe('satellite');
      _storeData('satellite');
    }
    if (tipe == 'terrain') {
      setTipe('terrain');
      _storeData('terrain');
    }
    toastRef.current.show('Berhasil Mengubah Tipe Map', DURATION.LENGTH_LONG);
  };

  const _storeData = async (value) => {
    try {
      await AsyncStorage.setItem('tipemap', value);
    } catch (error) {
      // Error saving data
    }
  };

  const _retrieveData = async () => {
    try {
      let value = await AsyncStorage.getItem('tipemap');
      setTipe(value);
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    _retrieveData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Pilih salah satu tipe peta.</Text>
        <View style={styles.area_tipe}>
          <View style={styles.div_img}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => cekList('standard')}>
              <View style={styles.circle}>
                {tipe == 'standard' || tipe == null ? (
                  <View style={styles.checkedCircle} />
                ) : (
                  <Text></Text>
                )}
              </View>
              <Text style={styles.tipe}> Standard</Text>
            </TouchableOpacity>
            <Image
              style={styles.img}
              source={require('../../../assets/images/standard.png')}
            />
          </View>
          <View style={styles.div_img}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => cekList('satellite')}>
              <View style={styles.circle}>
                {tipe == 'satellite' ? (
                  <View style={styles.checkedCircle} />
                ) : (
                  <Text></Text>
                )}
              </View>
              <Text style={styles.tipe}> Satellite</Text>
            </TouchableOpacity>
            <Image
              style={styles.img}
              source={require('../../../assets/images/satellite.png')}
            />
          </View>
        </View>
        <View style={styles.area_tipe}>
          <View style={styles.div_img}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => cekList('hybrid')}>
              <View style={styles.circle}>
                {tipe == 'hybrid' ? (
                  <View style={styles.checkedCircle} />
                ) : (
                  <Text></Text>
                )}
              </View>
              <Text style={styles.tipe}> Hybrid</Text>
            </TouchableOpacity>
            <Image
              style={styles.img}
              source={require('../../../assets/images/hybrid.png')}
            />
          </View>
          <View style={styles.div_img}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => cekList('terrain')}>
              <View style={styles.circle}>
                {tipe == 'terrain' ? (
                  <View style={styles.checkedCircle} />
                ) : (
                  <Text></Text>
                )}
              </View>
              <Text style={styles.tipe}> Terrain</Text>
            </TouchableOpacity>
            <Image
              style={styles.img}
              source={require('../../../assets/images/terrain.png')}
            />
          </View>
        </View>
        <Toast
          ref={toastRef}
          style={{backgroundColor: '#4f4f4f'}}
          position="bottom"
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={1}
          textStyle={{color: '#fff'}}
        />
      </View>
    </ScrollView>
  );
};

const styles = {
  wrapper: {
    padding: 7,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  tipe: {
    fontSize: 20,
  },
  area_tipe: {
    flexDirection: 'row',
  },
  div_img: {
    flex: 1,
    marginBottom: 10,
  },
  img: {
    width: 150,
    height: 150,
    alignItems: 'center',
    marginBottom: 10,
  },
  hr: {
    height: 1,
    width: '100%',
    backgroundColor: '#939393',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colorPrimary,
  },
};

export default SetTipeMap;
