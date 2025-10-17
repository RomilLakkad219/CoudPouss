import React, { useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, useString } from '../../constant';

//COMPONENTS
import { Text, HomeHeader, SearchComponent, Header, Button } from '../../components';
import { SCREENS } from '..';


export default function Profile(props: any) {

  const STRING = useString();
  const { theme } = useContext<any>(ThemeContext);
  const { userType } = useContext<any>(AuthContext);

  const profileItemsElder = [
    { id: 1, title: STRING.my_profile, icon: IMAGES.ic_my_profile, onPress: SCREENS.MyProfile.identifier },
    { id: 2, title: STRING.transactions, icon: IMAGES.ic_transactions, onPress: SCREENS.Transactions.identifier },
    { id: 3, title: STRING.ratings_reviews, icon: IMAGES.ic_ratings_reviews, onPress: SCREENS.RatingsReviews.identifier },
    { id: 4, title: STRING.notifications, icon: IMAGES.ic_notifications, onPress: SCREENS.Notifications.identifier },
  ]

  const profieItemsProfessional = [
    { id: 1, title: STRING.my_profile, icon: IMAGES.ic_my_profile, onPress: SCREENS.MyProfileProfessional.identifier },
    { id: 2, title: STRING.my_earnings, icon: IMAGES.ic_my_earnings, onPress: SCREENS.MyEarnings.identifier },
    { id: 3, title: STRING.manage_services, icon: IMAGES.ic_manage_services, onPress: SCREENS.ManageServices.identifier },
    { id: 4, title: STRING.manage_subscription, icon: IMAGES.ic_manage_subscription, onPress: SCREENS.ManageSubscription.identifier },
    { id: 5, title: STRING.ratings_reviews, icon: IMAGES.ic_ratings_reviews, onPress: SCREENS.RatingsReviews.identifier },
    { id: 6, title: STRING.notifications, icon: IMAGES.ic_notifications, onPress: SCREENS.Notifications.identifier },
  ]

  function getProfileItems() {
    if (userType === 'professional') {
      return profieItemsProfessional;
    } else {
      return profileItemsElder;
    }
  }


  return (
    <View style={styles(theme).container}>
      <Header
        type="profile"
        rightIcon={{ icon: IMAGES.ic_logout, title: STRING.logout }}
        onPress={() => { }}
        screenName={STRING.my_account}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles(theme).mainContainer}>
          <View style={styles(theme).profileContainer} />
          <Text
            size={getScaleSize(22)}
            font={FONTS.Lato.SemiBold}
            align="center"
            color={theme._2B2B2B}>
            {'Bessie Cooper'}
          </Text>
          {userType === 'professional' && (
            <View style={styles(theme).checkStatusContainer}>
              <Image source={IMAGES.ic_alart} style={styles(theme).alartIcon} />
              <Text
                size={getScaleSize(19)}
                font={FONTS.Lato.Bold}
                align="center"
                color={theme._214C65}>
                {STRING.account_under_verification}
              </Text>
              <TouchableOpacity
               onPress={() => { 
                props.navigation.navigate(SCREENS.ApplicationStatus.identifier);
               }}
               style={styles(theme).checkStatusButton}>
                <Text
                  size={getScaleSize(16)}
                  font={FONTS.Lato.SemiBold}
                  align="center"
                  color={theme.white}>
                  {STRING.check_status}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={{ marginTop: userType === 'professional' ? getScaleSize(20) : getScaleSize(40) }}>
            {getProfileItems().map((item: any, index: number) => {
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
      </ScrollView>
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
      marginBottom: getScaleSize(20),
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
    checkStatusContainer: {
      borderWidth: 1,
      borderColor: theme._2C6587,
      borderRadius: getScaleSize(12),
      paddingHorizontal: getScaleSize(66),
      paddingVertical: getScaleSize(24),
      marginTop: getScaleSize(10),
    },
    alartIcon: {
      width: getScaleSize(60),
      height: getScaleSize(60),
      alignSelf: 'center',
      marginBottom: getScaleSize(12),
    },
    checkStatusButton: {
      backgroundColor: theme._214C65,
      borderRadius: getScaleSize(12),
      alignItems: 'center',
      paddingVertical: getScaleSize(10),
      marginTop: getScaleSize(20),
    }
  });
