import React, { useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, useString } from '../../constant';

//COMPONENTS
import { Text, HomeHeader, SearchComponent, Header } from '../../components';
import { SCREENS } from '..';


export default function Profile(props: any) {

  const STRING = useString();
  const { theme } = useContext<any>(ThemeContext);

  const profileItem = [
    { id: 1, title: STRING.my_profile, icon: IMAGES.ic_my_profile, onPress: SCREENS.MyProfile.identifier },
    { id: 2, title: STRING.transactions, icon: IMAGES.ic_transactions, onPress: SCREENS.Transactions.identifier },
    { id: 3, title: STRING.ratings_reviews, icon: IMAGES.ic_ratings_reviews, onPress: SCREENS.RatingsReviews.identifier },
    { id: 4, title: STRING.notifications, icon: IMAGES.ic_notifications, onPress: SCREENS.Notifications.identifier },
  ]

  const profieItemsProfessional = [
    { id: 1, title: STRING.my_profile, icon: IMAGES.ic_my_profile, onPress: SCREENS.MyProfile.identifier },
    { id: 2, title: STRING.my_earnings, icon: IMAGES.ic_transactions, onPress: SCREENS.Transactions.identifier },
    { id: 3, title: STRING.ratings_reviews, icon: IMAGES.ic_ratings_reviews, onPress: SCREENS.RatingsReviews.identifier },
    { id: 4, title: STRING.notifications, icon: IMAGES.ic_notifications, onPress: SCREENS.Notifications.identifier },
  ]


  return (
    <View style={styles(theme).container}>
      <Header
        type="profile"
        rightIcon={{ icon: IMAGES.ic_logout, title: STRING.logout }}
        onPress={() => { }}
        screenName={STRING.my_account}
      />
      <View style={styles(theme).mainContainer}>
        <View style={styles(theme).profileContainer} />
        <Text
          size={getScaleSize(22)}
          font={FONTS.Lato.SemiBold}
          align="center"
          color={theme._2B2B2B}>
          {'Bessie Cooper'}
        </Text>
        <View style={styles(theme).itemsContainer}>
          {profileItem.map((item: any, index: number) => {
            return (
              <TouchableOpacity key={index}
                onPress={() => { props.navigation.navigate(item.onPress) }}
                style={styles(theme).profileItemContainer}>
                <Image
                  source={item.icon}
                  style={styles(theme).profileItemIcon}
                />
                <Text
                  style={{ flex: 1.0 }}
                  size={getScaleSize(22)}
                  font={FONTS.Lato.SemiBold}
                  color={theme._2C6587}>
                  {item.title}
                </Text>
                <Image source={IMAGES.ic_right} style={styles(theme).profileItemRightIcon} />
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white
    },
    mainContainer: {
      flex: 1,
      marginHorizontal: getScaleSize(24),
      marginTop: getScaleSize(42),
    },
    profileContainer: {
      width: getScaleSize(126),
      height: getScaleSize(126),
      backgroundColor: theme._F0EFF0,
      borderRadius: getScaleSize(126),
      alignSelf: 'center',
      marginBottom: getScaleSize(12),
    },
    profileItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: getScaleSize(16),
    },
    profileItemIcon: {
      width: getScaleSize(56),
      height: getScaleSize(56),
      marginRight: getScaleSize(20),
    },
    profileItemRightIcon: {
      width: getScaleSize(24),
      height: getScaleSize(24),
      marginHorizontal: getScaleSize(12),
    },
    itemsContainer: {
      marginTop: getScaleSize(40),
    },
  });
