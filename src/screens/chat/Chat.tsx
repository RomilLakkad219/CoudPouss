import React, {useContext, useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
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

const HEADER_HEIGHT = 500;

export default function Chat(props: any) {
  const STRING = useString();
  const {theme} = useContext<any>(ThemeContext);
  const scrollY = useSharedValue(0);
  const showNewHeader = useSharedValue(0);

  const [showNextView, setShowNextView] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [layoutHeight, setLayoutHeight] = useState(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;

      if (event.contentOffset.y > HEADER_HEIGHT - 80) {
        showNewHeader.value = withTiming(1);
      } else {
        showNewHeader.value = withTiming(0);
      }

      // Check if reached bottom
      const scrollEnd =
        event.contentOffset.y + layoutHeight >= contentHeight - 50;
      if (scrollEnd) {
        runOnJS(setShowNextView)(true);
      }
    },
  });

  // Old Header animation
  const oldHeaderAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT / 2, HEADER_HEIGHT - 80],
      [1, 0.5, 0],
      Extrapolate.CLAMP,
    );
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT - 80],
      [0, -100],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      transform: [{translateY}],
    };
  });

  // New Header animation
  const newHeaderAnimatedStyle = useAnimatedStyle(() => ({
    opacity: showNewHeader.value,
    transform: [
      {
        translateY: interpolate(showNewHeader.value, [0, 1], [-50, 0]),
      },
    ],
  }));

  // Fade out current scroll content when near bottom
  const contentFadeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, contentHeight - layoutHeight - 100, contentHeight - layoutHeight],
      [1, 0.3, 0],
      Extrapolate.CLAMP,
    );
    return {opacity};
  });

  return (
    <View style={styles(theme).container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.primary}
        translucent
      />

      {/* HEADER */}
      <Animated.View
        style={[styles(theme).headerContainer, oldHeaderAnimatedStyle]}>
        <HomeHeader />
      </Animated.View>

      {/* STICKY HEADER */}
      <Animated.View style={[styles(theme).stickyView, newHeaderAnimatedStyle]}>
        <SearchComponent />
      </Animated.View>

      {/* SCROLL CONTENT */}
      <Animated.ScrollView
        onScroll={scrollHandler}        
        // style={{paddingTop: HEADER_HEIGHT}}
        onContentSizeChange={(w, h) => setContentHeight(h)}
        onLayout={e => setLayoutHeight(e.nativeEvent.layout.height)}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop:HEADER_HEIGHT,
          // paddingTop: Dimensions.get('window').height / 50,
        }}>
        <Animated.View style={contentFadeStyle}>
          {[...Array(33)].map((_, i) => (
            <Text
              key={i}
              style={{
                alignSelf: 'center',
                flex: 1.0,
                marginTop: getScaleSize(50),
              }}
              size={getScaleSize(16)}
              font={FONTS.Lato.Medium}
              color={'green'}>
              {'Hello! James\n'}
              <Text
                size={getScaleSize(24)}
                font={FONTS.Lato.Bold}
                color={'green'}>
                {STRING.welcome_to_coudpouss}
              </Text>
            </Text>
          ))}
        </Animated.View>
      </Animated.ScrollView>
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
