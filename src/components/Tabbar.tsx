import React, {useContext} from 'react';
import {
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
import {getScaleSize, useString} from '../constant';
import {IMAGES} from '../assets/images';
import {FONTS} from '../assets';
import {ThemeContext, ThemeContextType} from '../context';
import Text from './Text';
import { head } from 'lodash';

const images = [
  IMAGES.home_unselected,
  IMAGES.request_unselected,
  IMAGES.plus,
  IMAGES.chat_unselected,
  IMAGES.profile_unselected,
];

const names = ['Home', 'Request', '', 'Chat', 'Profile'];

function Tabbar(props: any) {
  const {theme} = useContext<any>(ThemeContext);

  const STRING = useString();

  function onPress(name: string) {
    props.navigation.navigate(name);
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
  const {theme} = useContext<any>(ThemeContext);

  const STRING = useString();

  if (props?.index == 2) {
    return (
      <View style={{alignSelf: 'center'}}>
        <Image
          style={
           {height:66, width:66, marginTop:-62}
          }
          resizeMode="contain"          
          source={IMAGES.plus}
        />
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={styles(theme).itemContainer}>
        <View>
          {/*  */}
          {props?.selected ? (
            <View style={{alignSelf: 'center'}}>
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
                style={{marginTop: getScaleSize(8)}}
                size={getScaleSize(14)}
                font={FONTS.Lato.Bold}
                color={theme.primary}
                align="center">
                {names[props.index]}
              </Text>
            </View>
          ) : (
            <View style={{alignSelf: 'center'}}>
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
                style={{marginTop: getScaleSize(8)}}
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
