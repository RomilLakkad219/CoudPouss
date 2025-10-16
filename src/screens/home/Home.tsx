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
  TouchableOpacity,
  FlatList,
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
import {
  Text,
  HomeHeader,
  SearchComponent,
  RequestItem,
  Favourites,
} from '../../components';
import {useFocusEffect} from '@react-navigation/native';
import {SCREENS, TABS} from '..';

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

      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        style={[styles(theme).container]}>
        <View>
          <HomeHeader
            onPressNotification={() => {
              props.navigation.navigate(SCREENS.Notification.identifier);
            }}
          />
        </View>

        <Text
          size={getScaleSize(20)}
          font={FONTS.Lato.SemiBold}
          style={{
            marginTop: getScaleSize(31),
            marginHorizontal: getScaleSize(22),
          }}
          color={theme._323232}>
          {STRING.explore_all_service}
        </Text>
        <TouchableOpacity style={styles(theme).bannerContainer}
        activeOpacity={1}
        onPress={()=>{
            props.navigation.navigate(SCREENS.Assistance.identifier)
        }}>
          <Text
            style={{flex: 1.0, alignSelf: 'center'}}
            size={getScaleSize(24)}
            font={FONTS.Lato.Bold}
            color={theme._323232}>
            {'Home Assistance'}
          </Text>
          <Image
            style={styles(theme).bannerImage}
            source={IMAGES.home_assitance}
          />
        </TouchableOpacity>
        <View style={styles(theme).optionView}>
          <TouchableOpacity
            style={[
              styles(theme).imageContainer,
              {borderTopLeftRadius: getScaleSize(40)},
            ]}
            activeOpacity={1}
            onPress={() => {
              props.navigation.navigate(SCREENS.Transport.identifier)
            }}>
            <Image style={styles(theme).iconImage} source={IMAGES.transport} />
            <Text
              size={getScaleSize(16)}
              font={FONTS.Lato.Medium}
              style={{marginTop: getScaleSize(8)}}
              color={theme._787878}>
              {STRING.Transport}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles(theme).imageContainer,
              {marginHorizontal: getScaleSize(12)},
            ]}
            activeOpacity={1}
            onPress={() => {
              props.navigation.navigate(SCREENS.Transport.identifier)
            }}>
            <Image
              style={styles(theme).iconImage}
              source={IMAGES.personal_care}
            />
            <Text
              size={getScaleSize(16)}
              font={FONTS.Lato.Medium}
              style={{marginTop: getScaleSize(8)}}
              color={theme._787878}>
              {STRING.PersonalCare}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles(theme).imageContainer,
              {borderTopRightRadius: getScaleSize(40)},
            ]}
            activeOpacity={1}
            onPress={() => {
              props.navigation.navigate(SCREENS.Transport.identifier)
            }}>
            <Image
              style={styles(theme).iconImage}
              source={IMAGES.tech_support}
            />
            <Text
              size={getScaleSize(16)}
              font={FONTS.Lato.Medium}
              style={{marginTop: getScaleSize(8)}}
              color={theme._787878}>
              {STRING.TechSupport}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles(theme).deviderView} />
        <View
          style={{
            flexDirection: 'row',
            marginTop: getScaleSize(31),
            marginHorizontal: getScaleSize(22),
          }}>
          <Text
            size={getScaleSize(20)}
            font={FONTS.Lato.SemiBold}
            style={{flex: 1.0}}
            color={theme._323232}>
            {STRING.ResentRequests}
          </Text>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.Regular}
            onPress={() => {
              props.navigation.navigate(TABS.Request.identifier);
            }}
            style={{alignSelf: 'center'}}
            color={theme._999999}>
            {STRING.ViewAll}
          </Text>
        </View>
        {['', ''].map((item: any) => {
          return (
            <RequestItem
              onPress={() => {
                props.navigation.navigate(SCREENS.RequestDetails.identifier);
              }}
            />
          );
        })}
        <View
          style={{
            flexDirection: 'row',
            marginTop: getScaleSize(31),
            marginHorizontal: getScaleSize(22),
          }}>
          <Text
            size={getScaleSize(20)}
            font={FONTS.Lato.SemiBold}
            style={{flex: 1.0}}
            color={theme._323232}>
            {STRING.FavoriteProfessionals}
          </Text>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.Regular}
            onPress={() => {}}
            style={{alignSelf: 'center'}}
            color={theme._999999}>
            {STRING.ViewAll}
          </Text>
        </View>
        <FlatList
          data={['','']}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={(item: any, index: number) => {
            return (
              <View style={{marginTop:getScaleSize(26)}}>
                <Favourites />
              </View>
            );
          }}
        />
        <View style={{height: 32}}></View>
      </ScrollView>
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: theme.white},
    bannerContainer: {
      height: getScaleSize(105),
      flex: 1.0,
      backgroundColor: '#FDBE12',
      borderBottomLeftRadius: getScaleSize(40),
      borderTopRightRadius: getScaleSize(40),
      borderBottomRightRadius: getScaleSize(12),
      borderTopLeftRadius: getScaleSize(12),
      marginTop: getScaleSize(26),
      paddingHorizontal: getScaleSize(22),
      justifyContent: 'center',
      flexDirection: 'row',
      marginHorizontal: getScaleSize(22),
    },
    bannerImage: {
      height: getScaleSize(74),
      width: getScaleSize(86),
      alignSelf: 'center',
    },
    optionView: {
      marginHorizontal: getScaleSize(16),
      flexDirection: 'row',
      marginTop: getScaleSize(16),
    },
    imageContainer: {
      flex: 1.0,
      backgroundColor: '#F8F8F8',
      borderRadius: getScaleSize(12),
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: getScaleSize(16),
    },
    iconImage: {
      height: getScaleSize(60),
      width: getScaleSize(60),
    },
    deviderView: {
      marginTop: getScaleSize(35),
      height: getScaleSize(6),
      backgroundColor: '#F8F8F8',
    },
  });
