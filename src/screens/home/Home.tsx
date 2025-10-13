import React, {useContext, useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
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
import {FONTS} from '../../assets';
import {getScaleSize, useString} from '../../constant';
import {Text, HomeHeader, SearchComponent} from '../../components';
import {useFocusEffect} from '@react-navigation/native';

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
        translucent
      />

      {/* HEADER */}
      <Animated.View style={[styles(theme).headerContainer]}>
        <HomeHeader />
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles(theme).container}>
        <Text
          size={getScaleSize(20)}
          font={FONTS.Lato.SemiBold}
          color={theme._323232}>
          {STRING.explore_all_service}
        </Text>
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
    stickyView: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      // backgroundColor: '#2B5D73',
      // paddingVertical: 15,
      // alignItems: 'center',
      // justifyContent: 'center',
      zIndex: 20,
    },
  });
