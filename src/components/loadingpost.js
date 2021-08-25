import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import { colorPrimary } from '../util/color';

const LoadingPost = ({show, message}) => {
  return (
    <AwesomeAlert
      show={show}
      showProgress={true}
      title={message}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      progressSize={50}
      progressColor={colorPrimary}
      alertContainerStyle={{flex:1}}
    />
  );
};

export default LoadingPost;
