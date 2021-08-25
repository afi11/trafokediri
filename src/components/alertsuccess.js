import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

const AlertSuccess = ({show, title, message, confirm}) => {
  return (
    <AwesomeAlert
      show={show}
      title={title}
      message={message}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      titleStyle={{color: '#ff0101', fontWeight: 'bold', fontSize: 20}}
      messageStyle={{textAlign: 'center', fontSize: 16}}
      showConfirmButton={true}
      confirmText="OK"
      confirmButtonColor="#206bff"
      onConfirmPressed={confirm}
    />
  );
};

export default AlertSuccess;
