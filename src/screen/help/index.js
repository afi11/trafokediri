import React from 'react';
import { View, Text } from 'react-native';
 
const Help = () => {
    return(
        <View style={styles.wrapper}>
            <Text>Help</Text>
        </View>
    )
}

const styles = {
    wrapper : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default Help;