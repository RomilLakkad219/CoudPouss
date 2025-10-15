import {
  FlexAlignType,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useContext} from 'react';

//CONTEXT
import {ThemeContext, ThemeContextType} from '../context';

//CONSTANTS & ASSETS
import {getScaleSize, useString} from '../constant';
import {FONTS, IMAGES} from '../assets';

//COMPONENTS
import Text from './Text';
import {flatMap, head} from 'lodash';

const HEADER_HEIGHT = 260;

const HomeHeader = (props: any) => {
  const STRING = useString();
  const {theme} = useContext(ThemeContext);

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).headerView}>
        <Text
          style={{flex: 1.0}}
          size={getScaleSize(16)}
          font={FONTS.Lato.Medium}
          color={theme.white}>
          {'Hello! James\n'}
          <Text
            size={getScaleSize(24)}
            font={FONTS.Lato.Bold}
            color={theme.white}>
            {STRING.welcome_to_coudpouss}
          </Text>
        </Text>
        <TouchableOpacity
          style={styles(theme).notificationContainer}
          activeOpacity={1}
          onPress={() => {
            props?.onPressNotification();
          }}>
          <Image
            style={styles(theme).notificationContainer}
            source={IMAGES.notification}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles(theme).placeholderImage,
            {marginLeft: getScaleSize(12)},
          ]}
          activeOpacity={1}
          onPress={() => {}}>
          <Image
            style={styles(theme).placeholderImage}
            source={IMAGES.user_placeholder}
          />
        </TouchableOpacity>
      </View>
      <View style={styles(theme).searchView}>
        <View style={styles(theme).searchBox}>
          <Image style={styles(theme).searchImage} source={IMAGES.search} />
          <TextInput
            style={styles(theme).searchInput}
            placeholderTextColor={'#939393'}
            placeholder={STRING.Search}
          />
        </View>
        <TouchableOpacity style={styles(theme).microPhoneContainer}>
          <Image
            style={styles(theme).microPhoneImage}
            source={IMAGES.microphone}
          />
        </TouchableOpacity>
      </View>
      <View style={styles(theme).bottomText}>
        <View style={styles(theme).userImage}>
          <Image style={styles(theme).workerImage} source={IMAGES.worker} />
        </View>
        <View style={styles(theme).textView}>
          <View style={{flexDirection: 'row'}}>
            <Text
              size={getScaleSize(48)}
              font={FONTS.Lato.Bold}
              color={theme.white}>
              {'10 '}
            </Text>
            <Text
              size={getScaleSize(20)}
              font={FONTS.Lato.SemiBold}
              color={theme.white}>
              {'Professionals\nConnected Today'}
            </Text>
          </View>
          <Text
            style={{marginTop: getScaleSize(8)}}
            size={getScaleSize(12)}
            font={FONTS.Lato.Regular}
            color={theme.white}>
            {
              'Lorem ipsum a pharetra mattis dilt\npulvinar tortor amet vulputate.'
            }
          </Text>
        </View>
      </View>      
    </View>
  );
};

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.primary,
      paddingTop: getScaleSize(15),
      // paddingHorizontal: getScaleSize(20),
      borderBottomLeftRadius: getScaleSize(60),
      borderBottomRightRadius: getScaleSize(60),
      overflow: 'hidden',
      height: getScaleSize(395),
    },
    headerView: {
      flexDirection: 'row',
      marginHorizontal: getScaleSize(21),
    },
    searchView: {
      flexDirection: 'row',
      marginHorizontal: getScaleSize(21),
    },
    searchBox: {
      flexDirection: 'row',
      flex: 1.0,
      alignItems: 'center' as FlexAlignType,
      backgroundColor: theme.white,
      borderRadius: getScaleSize(12),
      marginTop: getScaleSize(23),
      paddingHorizontal: getScaleSize(16),
      // paddingVertical: getScaleSize(4),
    },
    searchImage: {
      height: getScaleSize(24),
      width: getScaleSize(24),
      alignSelf: 'center' as FlexAlignType,
    },
    imgMicroPhone: {
      height: getScaleSize(56),
      width: getScaleSize(56),
      alignSelf: 'center' as FlexAlignType,
      marginLeft: getScaleSize(16),
    },
    searchInput: {
      fontFamily: FONTS.Lato.Regular,
      fontSize: getScaleSize(20),
      color: theme.black,
      marginLeft: getScaleSize(12),
    },
    microPhoneContainer: {
      backgroundColor: theme.white,
      borderRadius: getScaleSize(12),
      marginTop: getScaleSize(23),
      paddingHorizontal: getScaleSize(16),
      paddingVertical: getScaleSize(4),
      marginLeft: getScaleSize(16),
      justifyContent: 'center',
    },
    microPhoneImage: {
      height: getScaleSize(24),
      width: getScaleSize(24),
      alignSelf: 'center',
    },
    userImage: {
      overflow: 'visible',
      width: getScaleSize(240),
      height: getScaleSize(225),
      marginTop: getScaleSize(32),
      backgroundColor: '#1E4A5D',
      borderRadius: 112,
      left: -56,
      top: 26,
    },
    workerImage: {
      height: getScaleSize(250),
      width: getScaleSize(151),
      position: 'absolute',
      resizeMode: 'cover',
      left: 50,
      top: -45,
    },
    notificationContainer: {
      height: getScaleSize(24),
      width: getScaleSize(24),
      alignSelf:'center'
    },
    placeholderImage: {
      height: getScaleSize(34),
      width: getScaleSize(34),
      borderRadius: getScaleSize(17),
      alignSelf:'center'
    },
    bottomText: {
      flexDirection: 'row',
      marginLeft: getScaleSize(16),
    },
    textView: {
      justifyContent: 'center',
      marginTop: getScaleSize(32),
      marginLeft: getScaleSize(-40),
    },
  });
export default HomeHeader;
