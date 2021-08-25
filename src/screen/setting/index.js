import React from 'react';
import {View, Text, FlatList, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Setting = ({navigation}) => {
  const ListViewItemSeparator = () => {
    return (
      <View style={{height: 1, width: '100%', backgroundColor: '#d8d8d8'}} />
    );
  };

  const handleToGo = (screen) => {
    navigation.navigate(screen);
  };

  const _removeData = async () => {
    try {
      await AsyncStorage.removeItem('id');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('tipe_akun');
    } catch (error) {
      // Error retrieving data
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.main}></View>
      <FlatList
        ItemSeparatorComponent={ListViewItemSeparator}
        data={[
          {key: 'Akun', page: 'Akun'},
          {key: 'Tipe Map', page: 'TipeMap'},
        ]}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleToGo(item.page)}>
            <View style={styles.itemlist}>
              <Text style={styles.itemText}>{item.key}</Text>
              <Icon
                name="ios-arrow-forward"
                size={18}
                style={styles.iconlist}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = {
  wrapper: {
    flex: 1,
  },
  main: {
    marginBottom: 8,
  },
  itemlist: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 18,
  },
  iconlist: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
};

export default Setting;
