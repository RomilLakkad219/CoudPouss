import React, {useContext, useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Alert,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

//ASSETS
import {FONTS, IMAGES} from '../../assets';

//CONTEXT
import {ThemeContext, ThemeContextType} from '../../context';

//CONSTANT
import {getScaleSize, useString} from '../../constant';

//COMPONENT
import {
  Header,
  RequestItem,
  SearchComponent,
  ServiceRequest,
  TaskItem,
  Text,
} from '../../components';

//PACKAGES
import {useFocusEffect} from '@react-navigation/native';
import {SCREENS} from '..';

export default function ProfessionalHome(props: any) {
  const STRING = useString();
  const {theme} = useContext<any>(ThemeContext);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor(theme.white);
      StatusBar.setBarStyle('dark-content');
    }, []),
  );

  return (
    <View style={styles(theme).container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.white}
        translucent={false}
      />
      <View style={styles(theme).headerContainer}>
        <View style={styles(theme).verticalView}>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.Medium}
            color={theme._6D6D6D}
            style={{}}>
            {'Hello! James'}
          </Text>
          <Text
            size={getScaleSize(24)}
            font={FONTS.Lato.Bold}
            color={theme._2C6587}
            style={{}}>
            {'Welcome to CoudPouss'}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles(theme).notifiationIcon,
            {marginRight: getScaleSize(8)},
          ]}
          activeOpacity={1}
          onPress={() => {
            props.navigation.navigate(SCREENS.Notification.identifier);
          }}>
          <Image
            style={styles(theme).notifiationIcon}
            source={IMAGES.notification_professional}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(theme).profilePic}
          activeOpacity={1}
          onPress={() => {}}>
          <Image
            style={styles(theme).profilePic}
            source={IMAGES.user_placeholder}
          />
        </TouchableOpacity>
      </View>
      <View style={styles(theme).searchView}>
        <SearchComponent />
      </View>
      <ScrollView
        style={styles(theme).scrolledContainer}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles(theme).bannerView}
          source={{uri: 'https://picsum.photos/id/1/200/300'}}
        />
        <Text
          size={getScaleSize(20)}
          font={FONTS.Lato.SemiBold}
          color={theme._323232}
          style={{
            marginTop: getScaleSize(28),
          }}>
          {STRING.ExploreServiceRequests}
        </Text>
        {['', ''].map(item => {
          return (
            <ServiceRequest
              onPress={() => {
                props.navigation.navigate(SCREENS.ServicePreview.identifier);
              }}
            />
          );
        })}
        <View style={styles(theme).horizontalContainer}>
          <Text
            size={getScaleSize(20)}
            font={FONTS.Lato.SemiBold}
            color={theme._323232}
            style={{
              flex: 1.0,
            }}>
            {STRING.RecentTasks}
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
        {['', ''].map(item => {
          return (
            <TaskItem
              onPressStatus={() => {
                props.navigation.navigate(SCREENS.TaskStatus.identifier);
              }}
              onPressChat={() => {
                props.navigation.navigate(SCREENS.ChatDetails.identifier);
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: theme.white},
    headerContainer: {
      flexDirection: 'row',
      marginHorizontal: getScaleSize(22),
      marginTop: getScaleSize(8),
    },
    verticalView: {
      alignSelf: 'center',
      flexDirection: 'column',
      flex: 1.0,
    },
    notifiationIcon: {
      height: getScaleSize(24),
      width: getScaleSize(24),
      alignSelf: 'center',
    },
    profilePic: {
      height: getScaleSize(34),
      width: getScaleSize(34),
      borderRadius: getScaleSize(17),
      alignSelf: 'center',
    },
    searchView: {
      marginTop: getScaleSize(23),
      marginHorizontal: getScaleSize(22),
    },
    scrolledContainer: {
      marginTop: getScaleSize(28),
      marginHorizontal: getScaleSize(22),
    },
    bannerView: {
      borderRadius: getScaleSize(25),
      height: getScaleSize(150),
      alignSelf: 'center',
      width: '100%',
    },
    horizontalContainer: {
      marginTop: getScaleSize(27),
      flexDirection: 'row',
    },
  });
