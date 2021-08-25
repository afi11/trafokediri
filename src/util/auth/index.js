import {AsyncStorage} from 'react-native';

const setToken = async (token, id) => {
  try {
    await AsyncStorage.setItem('id', id);
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    // Error retrieving data
  }
};

const getToken = async () => {
  let token = "";
  try {
   token = await AsyncStorage.getItem('token');
  } catch (error) {
    // Error retrieving data
  }
  return token;
};

const getIdUser = async () => {
  try {
    let id = await AsyncStorage.getItem('id');
    return id;
  } catch (error) {
    // Error retrieving data
  }
};

const destroyToken = async () => {
  try {
    await AsyncStorage.removeItem('id');
    await AsyncStorage.removeItem('token');
  } catch (error) {
    // Error retrieving data
  }
};

const Auth = {
  setToken,
  destroyToken,
  getToken,
  getIdUser,
};

export default Auth;
