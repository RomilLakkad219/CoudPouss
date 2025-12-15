import React, { useContext, useEffect } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  ImageSourcePropType,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

// CONSTANT & ASSETS
import { getScaleSize, useString, Storage } from '../constant';
import { IMAGES } from '../assets/images';
import { FONTS } from '../assets';
import { AuthContext, ThemeContext, ThemeContextType } from '../context';
import Text from './Text';
import { head } from 'lodash';
import { EventRegister } from 'react-native-event-listeners';
import { CommonActions } from '@react-navigation/native';
import { SCREENS } from '../screens';

function Tabbar(props: any) {
  const { theme } = useContext<any>(ThemeContext);

  const { userType, setUser, setUserType } = useContext<any>(AuthContext);

  useEffect(() => {
    EventRegister.addEventListener('onInvalidToken', () => {
      onLogout()
    });
    return () => {
      EventRegister.removeEventListener('onInvalidToken')
    }
  }, [])

  function onLogout() {
    Storage.clear();
    setUser(null);
    setUserType(null);
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: SCREENS.Login.identifier }],
      }),
    );
  }


  let images: any = [];
  let names: any = [];

  if (userType === 'service_provider') {
    images = [
      IMAGES.home_unselected,
      IMAGES.request_unselected,
      IMAGES.chat_unselected,
      IMAGES.profile_unselected,
    ];

    names = ['Home', 'Task', 'Chat', 'Profile'];
  } else {
    images = [
      IMAGES.home_unselected,
      IMAGES.request_unselected,
      IMAGES.plus,
      IMAGES.chat_unselected,
      IMAGES.profile_unselected,
    ];

    names = ['Home', 'Request', '', 'Chat', 'Profile'];
  }

  const STRING = useString();

  function onPress(name: string) {
    if (name === 'plus') {
      props.navigation.navigate(SCREENS.CreateRequest.identifier);
    } else {
      props.navigation.navigate(name);
    }
  }



  return (
    <View style={styles(theme).mainView}>
      <View style={styles(theme).tabContainer}>
        {props.state.routes.map((route: any, index: number) => {
          return (
            <Item
              key={index}
              onPress={() => onPress(route.name)}
              title={route.name}
              index={index}
              selected={props.state.index == index}
              image={images[index]}
            />
          );
        })}
      </View>
      <SafeAreaView />
    </View>
  );
}

const Item = (props: any) => {
  const { theme } = useContext<any>(ThemeContext);

  const { userType } = useContext<any>(AuthContext);

  let images: any = [];
  let names: any = [];

  if (userType === 'service_provider') {
    images = [
      IMAGES.home_unselected,
      IMAGES.request_unselected,
      IMAGES.chat_unselected,
      IMAGES.profile_unselected,
    ];

    names = ['Home', 'Task', 'Chat', 'Profile'];
  } else {
    images = [
      IMAGES.home_unselected,
      IMAGES.request_unselected,
      IMAGES.plus,
      IMAGES.chat_unselected,
      IMAGES.profile_unselected,
    ];

    names = ['Home', 'Request', '', 'Chat', 'Profile'];
  }

  const STRING = useString();
  if (userType === 'service_provider') {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={styles(theme).itemContainer}>
        <View>
          {/*  */}
          {props?.selected ? (
            <View style={{ alignSelf: 'center' }}>
              <Image
                style={
                  props.selected
                    ? styles(theme).itemImageSelected
                    : styles(theme).itemImage
                }
                resizeMode="contain"
                tintColor={theme.primary}
                source={images[props.index]}
              />
              <Text
                style={{ marginTop: getScaleSize(8) }}
                size={getScaleSize(14)}
                font={FONTS.Lato.Bold}
                color={theme.primary}
                align="center">
                {names[props.index]}
              </Text>
            </View>
          ) : (
            <View style={{ alignSelf: 'center' }}>
              <Image
                style={
                  props.selected
                    ? styles(theme).itemImageSelected
                    : styles(theme).itemImage
                }
                resizeMode="contain"
                source={images[props.index]}
              />
              <Text
                style={{ marginTop: getScaleSize(8) }}
                size={getScaleSize(12)}
                font={FONTS.Lato.Medium}
                color={'#E6E6E6'}
                align="center">
                {names[props.index]}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  } else {
    if (props?.index == 2) {
      return (
        <TouchableOpacity
          onPress={() => { props.onPress(SCREENS.CreateRequest.identifier) }}
          style={{ alignSelf: 'center', marginTop: getScaleSize(-80) }}>
          <Image
            style={{ height: getScaleSize(98), width: getScaleSize(98) }}
            resizeMode="contain"
            source={IMAGES.plus}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={props.onPress}
          style={styles(theme).itemContainer}>
          <View>
            {/*  */}
            {props?.selected ? (
              <View style={{ alignSelf: 'center' }}>
                <Image
                  style={
                    props.selected
                      ? styles(theme).itemImageSelected
                      : styles(theme).itemImage
                  }
                  resizeMode="contain"
                  tintColor={theme.primary}
                  source={images[props.index]}
                />
                <Text
                  style={{ marginTop: getScaleSize(8) }}
                  size={getScaleSize(14)}
                  font={FONTS.Lato.Bold}
                  color={theme.primary}
                  align="center">
                  {names[props.index]}
                </Text>
              </View>
            ) : (
              <View style={{ alignSelf: 'center' }}>
                <Image
                  style={
                    props.selected
                      ? styles(theme).itemImageSelected
                      : styles(theme).itemImage
                  }
                  resizeMode="contain"
                  source={images[props.index]}
                />
                <Text
                  style={{ marginTop: getScaleSize(8) }}
                  size={getScaleSize(12)}
                  font={FONTS.Lato.Medium}
                  color={'#E6E6E6'}
                  align="center">
                  {names[props.index]}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    }
  }
};

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    mainView: {
      backgroundColor: theme.white,
      borderTopLeftRadius: getScaleSize(20),
      borderTopRightRadius: getScaleSize(20),
      elevation: 2,
    },
    tabContainer: {
      flexDirection: 'row',
      height: getScaleSize(96),
    },
    itemContainer: {
      flex: 1.0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemImageSelected: {
      height: getScaleSize(32),
      width: getScaleSize(32),
      alignSelf: 'center',
    },
    itemImage: {
      height: getScaleSize(32),
      width: getScaleSize(32),
      alignSelf: 'center',
    },
    tabText: {
      marginTop: getScaleSize(7),
    },
    iconMessageContainer: {
      minHeight: getScaleSize(16),
      maxHeight: getScaleSize(18),
      paddingHorizontal: getScaleSize(5),
      borderRadius: getScaleSize(10),
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: -3,
      right: -3,
    },
  });

export default Tabbar;
