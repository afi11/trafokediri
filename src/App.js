import React, {useEffect, useState} from 'react';
import {AsyncStorage, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Router, LoginFirst} from './router';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const App = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUSEVfQ0xBSU0iLCJhdWQiOiJUSEVfQVVESUVOQ0UiLCJpYXQiOjE1OTQxMzA0NTksIm5iZiI6MTU5NDEzMDQ2OSwiZGF0YSI6eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIn19.EAX_keqUVy3WdNjAmQjmgS960-BRM4ZKEpGdnu8m3VA';

  const [iduser, setIdUser] = useState('');
  const [waiting, setWaiting] = useState(true);

  const _retrieveData = async () => {
    try {
      let id = await AsyncStorage.getItem('id');
      setIdUser(JSON.stringify(id));
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    SplashScreen.hide();
    _retrieveData();
    wait(1000).then(() => setWaiting(false));
  }, []);

  return (
    <>
      <NavigationContainer>
        {iduser === 'null' ? (
          <LoginFirst />
        ) : waiting ? (
          <View style={{backgroundColor: '#fff', flex: 1}}></View>
        ) : (
          <Router />
        )}
      </NavigationContainer>
    </>
  );
};

export default App;
