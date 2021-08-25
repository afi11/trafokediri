import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import url from '../../util/url';
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Snackbar from 'react-native-snackbar';

const KelolaData = ({navigation: {navigate}}) => {
  const [jalan2, setJalan2] = useState([]);
  const [jalan22, setJalan22] = useState([]);
  const [query, setQuery] = useState('');

  const isFocused = useIsFocused();

  const getAllJalan = () => {
    axios.get(url).then((res) => {
      setJalan2(res.data);
      setJalan22(res.data);
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

  const delData = (id) => {
    axios.delete(url + 'crud_jalan.php?mode=remove&id=' + id).then((res) => {
      console.log(res);
      getAllJalan();
      Snackbar.show({
        text: 'Data berhasil dihapus',
        duration: Snackbar.LENGTH_SHORT,
      });
    });
  };

  const konfirmData = (item) => {
    Alert.alert(
      'Hapus Data',
      item.nama_jalan,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => delData(item.id)},
      ],
      {cancelable: false},
    );
  };

  const ListViewItemSeparator = () => {
    return (
      <View style={{height: 1, width: '100%', backgroundColor: '#d8d8d8'}} />
    );
  };

  useEffect(() => {
    getAllJalan();
    findJalan(query);
  }, [isFocused]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.searchArea}>
        <View style={styles.iconSearch}>
          <Icon name="search" style={styles.iconSearch.itemIcon} size={18} />
        </View>
        <TextInput
          style={styles.textSearch}
          placeholder="Masukan Nama Jalan...."
          onChangeText={(text) => setQuery(text)}
        />
      </View>
      <View style={styles.container_list}>
        <View style={styles.container_list.header}>
          <Text style={styles.container_list.header.title}>Nama Jalan</Text>
          <Text style={styles.container_list.header.title}>Aksi</Text>
        </View>
        <FlatList
          ItemSeparatorComponent={ListViewItemSeparator}
          data={dataSearch}
          renderItem={({item}) => (
            <View style={styles.listJalan.main}>
              <View style={styles.listJalan.itemText}>
                <Text style={styles.listJalan.itemText.text}>
                  {item.nama_jalan}
                </Text>
              </View>
              <View style={styles.listJalan.itemButtonAction}>
                <TouchableOpacity
                  onPress={() => navigate('EditData', {item})}
                  style={styles.listJalan.itemButtonAction.buttonAction}>
                  <Icon name="edit" size={24} color="#152bef" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => konfirmData(item)}
                  style={styles.listJalan.itemButtonAction.buttonAction}>
                  <Icon name="trash-alt" size={24} color="#ff1e1e" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
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
  textSearch: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#4f4f4f',
    height: 37,
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
      padding: 5,
      flex: 1,
      flexDirection: 'row',
    },
    itemText: {
      flex: 2,
      text: {
        fontSize: 16,
      },
    },
    itemButtonAction: {
      posititon: 'absolute',
      right: 0,
      flexDirection: 'row',
      buttonAction: {
        marginRight: 10,
      },
    },
  },
};

export default KelolaData;
