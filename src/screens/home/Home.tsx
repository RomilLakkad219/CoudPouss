import React, {useContext, useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {ThemeContext, ThemeContextType} from '../../context';
import {FONTS, IMAGES} from '../../assets';
import {getScaleSize, useString} from '../../constant';
import {Text, HomeHeader, SearchComponent} from '../../components';
import {useFocusEffect} from '@react-navigation/native';
import {SCREENS} from '..';

const HEADER_HEIGHT = 500;

export default function Home(props: any) {
  const STRING = useString();
  const {theme} = useContext<any>(ThemeContext);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor(theme.primary);
      StatusBar.setBarStyle('light-content');
    }, []),
  );

  return (
    <View style={styles(theme).container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.primary}
        translucent={false}
      />

      {/* HEADER */}
      <Animated.View style={[styles(theme).headerContainer]}>
        <HomeHeader
          onPressNotification={() => {
            props.navigation.navigate(SCREENS.Notification.identifier);
          }}
        />
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          styles(theme).container,
          {paddingTop: getScaleSize(395), marginHorizontal: getScaleSize(22)},
        ]}>
        <Text
          size={getScaleSize(20)}
          font={FONTS.Lato.SemiBold}
          style={{marginTop: getScaleSize(31)}}
          color={theme._323232}>
          {STRING.explore_all_service}
        </Text>
        <View style={styles(theme).bannerContainer}>
          <Text
            style={{flex:1.0, alignSelf:'center'}}
            size={getScaleSize(24)}
            font={FONTS.Lato.Bold}            
            color={theme._323232}>
            {'Home Assistance'}
          </Text>
          <Image style={styles(theme).bannerImage} source={IMAGES.home_assitance}/>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: theme.white},
    headerContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
    bannerContainer: {
      height: getScaleSize(105),
      flex: 1.0,
      backgroundColor: '#FDBE12',
      borderBottomLeftRadius: getScaleSize(40),
      borderTopRightRadius: getScaleSize(40),
      borderBottomRightRadius: getScaleSize(12),
      borderTopLeftRadius: getScaleSize(12),
      marginTop: getScaleSize(26),
      paddingHorizontal:getScaleSize(22),
      justifyContent:'center',
      flexDirection:'row'
    },
    bannerImage:{
      height:getScaleSize(74),
      width:getScaleSize(86),
      alignSelf:'center'
    }
  });
