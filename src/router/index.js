import React from 'react';
import {Text, Image, View, AsyncStorage} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Login,
  Home,
  KelolaData,
  Setting,
  SetTipeMap,
  Help,
  Jalan,
  createJalan,
  editJalan,
  Rambu,
  CreateRambu,
  EditRambu,
  ListRambu,
  Apil,
  ListApil,
  CreateApil,
  EditApil,
  Vcratio,
  ListVCRatio,
  CreateKinerjaJalan,
  EditKinerjaJalan,
  DetailKinerjaJalan,
  User,
  createUser,
  editUser,
  Akun,
} from '../screen';
import {colorPrimary, colorAppBar} from '../util/color';
import Axios from 'axios';

const LoginPg = createStackNavigator();
const HmPg = createStackNavigator();
const KelolaPg = createStackNavigator();
const SettPg = createStackNavigator();
const HelpPg = createStackNavigator();

const Tab = createBottomTabNavigator();

const HeaderTitle = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image source={require('../assets/images/ic_launcher.png')} />
      <Text
        style={{
          fontFamily: 'Roboto',
          fontSize: 18,
          color: '#fff',
          letterSpacing: 1,
          marginTop: 5,
        }}>
        TRAFO KEDIRI
      </Text>
    </View>
  );
};

const pgHome = () => {
  return (
    <HmPg.Navigator>
      <HmPg.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}></HmPg.Screen>
    </HmPg.Navigator>
  );
};

const pgKelolaDt = () => {
  return (
    <KelolaPg.Navigator>
      <KelolaPg.Screen
        name="KelolaData"
        component={KelolaData}
        options={{
          title: 'Trafo Kediri',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        }}></KelolaPg.Screen>
      <KelolaPg.Screen
        name="User"
        component={User}
        options={{
          title: 'Data User',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        }}
      />
      <KelolaPg.Screen
        name="CreateUser"
        component={createUser}
        options={{
          title: 'Tambah User',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        }}
      />
      <KelolaPg.Screen
        name="editUser"
        component={editUser}
        options={{
          title: 'Edit Data User',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        }}
      />
      <KelolaPg.Screen
        name="Jalan"
        component={Jalan}
        options={({navigation, route}) => ({
          headerTitle: 'Data Jalan',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        })}
      />
      <KelolaPg.Screen
        name="createJalan"
        component={createJalan}
        options={{
          title: 'Tambah Data Jalan',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        }}
      />
      <KelolaPg.Screen
        name="editJalan"
        component={editJalan}
        options={{
          title: 'Edit Data Jalan',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        }}
      />
      <KelolaPg.Screen
        name="Rambu"
        component={Rambu}
        options={() => ({
          headerTitle: 'Data Rambu Lalin',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        })}
      />
      <KelolaPg.Screen
        name="ListRambu"
        component={ListRambu}
        options={({}) => ({
          headerTitle: 'Daftar Rambu Lalin',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        })}
      />
      <KelolaPg.Screen
        name="createRambu"
        component={CreateRambu}
        options={{
          title: 'Tambah Data Rambu',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        }}
      />
      <KelolaPg.Screen
        name="editRambu"
        component={EditRambu}
        options={{
          title: 'Edit Data Rambu',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        }}
      />
      <KelolaPg.Screen
        name="Apil"
        component={Apil}
        options={{
          title: 'Data Apil',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        }}
      />
      <KelolaPg.Screen
        name="ListApil"
        component={ListApil}
        options={({}) => ({
          headerTitle: 'Daftar Apil',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        })}
      />
      <KelolaPg.Screen
        name="createApil"
        component={CreateApil}
        options={{
          title: 'Tambah Data Apil',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        }}
      />
      <KelolaPg.Screen
        name="editApil"
        component={EditApil}
        options={{
          title: 'Edit Data Apil',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        }}
      />
      <KelolaPg.Screen
        name="Vcratio"
        component={Vcratio}
        options={{
          title: 'Data Kinerja Jalan',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        }}
      />
      <KelolaPg.Screen
        name="ListVcRatio"
        component={ListVCRatio}
        options={{
          title: 'Daftar Kinerja Jalan',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        }}
      />
      <KelolaPg.Screen
        name="CreateKinerjaJalan"
        component={CreateKinerjaJalan}
        options={{
          title: 'Tambah Kinerja Jalan',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        }}
      />
      <KelolaPg.Screen
        name="EditKinerjaJalan"
        component={EditKinerjaJalan}
        options={{
          title: 'Edit Kinerja Jalan',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        }}
      />
      <KelolaPg.Screen
        name="DetailKinerjaJalan"
        component={DetailKinerjaJalan}
        options={({route}) => ({
          title: route.params.item.nama_jalan,
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        })}
      />
    </KelolaPg.Navigator>
  );
};

const pgSetting = () => {
  return (
    <SettPg.Navigator>
      <SettPg.Screen
        name="Setting"
        component={Setting}
        options={{
          title: 'Pengaturan',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        }}></SettPg.Screen>
      <SettPg.Screen
        name="TipeMap"
        component={SetTipeMap}
        options={{
          title: 'Tipe Map',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        }}></SettPg.Screen>
      <SettPg.Screen
        name="Akun"
        component={Akun}
        options={{
          title: 'Info Akun',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorAppBar,
          },
        }}></SettPg.Screen>
    </SettPg.Navigator>
  );
};

const pgHelp = () => {
  return (
    <HelpPg.Navigator>
      <HelpPg.Screen
        name="Help"
        component={Help}
        options={{
          headerShown: false,
        }}></HelpPg.Screen>
    </HelpPg.Navigator>
  );
};

const LoginFirst = () => {
  return (
    <LoginPg.Navigator>
      <LoginPg.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}></LoginPg.Screen>
    </LoginPg.Navigator>
  );
};

const Router = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#fff',
        activeBackgroundColor: colorPrimary,
        inactiveTintColor: colorPrimary,
        tabStyle: {
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          borderTopColor: 'transparent',
        },
        style: {
          backgroundColor: colorAppBar,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          borderTopColor: 'transparent',
        },
      }}>
      <Tab.Screen
        name="KelolaPG"
        component={pgKelolaDt}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="HomePG"
        component={pgHome}
        options={{
          tabBarLabel: 'Peta',
          tabBarIcon: ({color, size}) => (
            <Icon name="map" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingPG"
        component={pgSetting}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({color, size}) => (
            <Icon name="settings" size={30} color={color} />
          ),
          tabBarOptions: {
            style: {
              backgroundColor: 'blue',
            },
          },
        }}
      />
    </Tab.Navigator>
  );
};

export {LoginFirst, Router};
