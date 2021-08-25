import React, {useCallback} from 'react';
import {Alert, Text, Linking} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Foundation';
import {colorPrimary} from '../util/color';

const PrintButton = ({url, text}) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity style={styles.buttonPrint} onPress={handlePress}>
      <Icon name="print" style={{marginLeft: 5}} color={'#fff'} size={20} />
      <Text
        style={{
          color: '#fff',
          marginTop: -2,
          marginHorizontal: 5,
          fontSize: 16,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonPrint: {
    backgroundColor: colorPrimary,
    flexDirection: 'row',
    padding: 5,
    borderRadius: 3,
    marginRight: 8,
  },
};

export default PrintButton;
