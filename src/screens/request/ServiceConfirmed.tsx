import React, { useContext, useRef, useState } from 'react';
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
  Platform,
} from 'react-native';

//ASSETS
import { FONTS, IMAGES } from '../../assets';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT
import { getScaleSize, useString } from '../../constant';

//COMPONENT
import {
  AcceptBottomPopup,
  Button,
  Header,
  PaymentBottomPopup,
  RejectBottomPopup,
  RequestItem,
  SearchComponent,
  Text,
} from '../../components';

//PACKAGES
import { useFocusEffect } from '@react-navigation/native';
import { SCREENS } from '..';

export default function ServiceConfirmed(props: any) {
  const STRING = useString();
  const { theme } = useContext<any>(ThemeContext);

  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(theme.white);
        StatusBar.setBarStyle('dark-content');
      }
    }, []),
  );

  return (
    <View style={styles(theme).container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.white}
        translucent={false}
      />
      <Header
        onBack={() => {
          props.navigation.goBack();
        }}
        screenName={STRING.ServiceConfirmed}
      />
      <ScrollView
        style={styles(theme).scrolledContainer}
        showsVerticalScrollIndicator={false}>
        <Image style={styles(theme).doneIcon} source={IMAGES.confirmed_icon} />
        <Text
          style={{ marginTop: getScaleSize(24) }}
          size={getScaleSize(19)}
          align="center"
          font={FONTS.Lato.Medium}
          color={theme._424242}>
          {STRING.service_confirmed_message}
        </Text>
        <View style={styles(theme).informationContainer}>
          <Text
            style={{}}
            size={getScaleSize(16)}
            font={FONTS.Lato.Bold}
            color={theme.primary}>
            {'Furniture Assembly'}
          </Text>
          <View style={styles(theme).informationView}>
            <View style={styles(theme).horizontalView}>
              <View style={styles(theme).itemView}>
                <Image
                  style={styles(theme).informationIcon}
                  source={IMAGES.calender}
                />
                <Text
                  style={{
                    marginHorizontal: getScaleSize(8),
                    alignSelf: 'center',
                  }}
                  size={getScaleSize(12)}
                  font={FONTS.Lato.Medium}
                  color={theme.primary}>
                  {'16 Aug, 2025'}
                </Text>
              </View>
              <View style={styles(theme).itemView}>
                <Image
                  style={styles(theme).informationIcon}
                  source={IMAGES.clock}
                />
                <Text
                  style={{
                    marginHorizontal: getScaleSize(8),
                    alignSelf: 'center',
                  }}
                  size={getScaleSize(12)}
                  font={FONTS.Lato.Medium}
                  color={theme.primary}>
                  {'10:00 am'}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles(theme).horizontalView,
                { marginTop: getScaleSize(12) },
              ]}>
              <View style={styles(theme).itemView}>
                <Image
                  style={styles(theme).informationIcon}
                  source={IMAGES.service}
                />
                <Text
                  style={{
                    marginHorizontal: getScaleSize(8),
                    alignSelf: 'center',
                  }}
                  size={getScaleSize(12)}
                  font={FONTS.Lato.Medium}
                  color={theme.primary}>
                  {'DIY Services'}
                </Text>
              </View>
              <View style={styles(theme).itemView}>
                <Image
                  style={styles(theme).informationIcon}
                  source={IMAGES.pin}
                />
                <Text
                  style={{
                    marginHorizontal: getScaleSize(8),
                    alignSelf: 'center',
                  }}
                  size={getScaleSize(12)}
                  font={FONTS.Lato.Medium}
                  color={theme.primary}>
                  {'Paris, 75001'}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles(theme).informationContainer}>
          <Text
            size={getScaleSize(18)}
            font={FONTS.Lato.SemiBold}
            color={theme._323232}>
            {STRING.FinalPaymentBreakdown}
          </Text>
          <View style={styles(theme).newhorizontalView}>
            <Text
              style={{ flex: 1.0 }}
              size={getScaleSize(14)}
              font={FONTS.Lato.SemiBold}
              color={'#595959'}>
              {STRING.FinalizedQuoteAmount}
            </Text>
            <Text
              size={getScaleSize(14)}
              font={FONTS.Lato.SemiBold}
              color={'#595959'}>
              {'€499'}
            </Text>
          </View>
          <View style={styles(theme).newhorizontalView}>
            <Text
              style={{ flex: 1.0 }}
              size={getScaleSize(14)}
              font={FONTS.Lato.SemiBold}
              color={'#595959'}>
              {STRING.PlatformFee}
            </Text>
            <Text
              size={getScaleSize(14)}
              font={FONTS.Lato.SemiBold}
              color={'#595959'}>
              {'€4'}
            </Text>
          </View>
          <View style={styles(theme).newhorizontalView}>
            <Text
              style={{ flex: 1.0 }}
              size={getScaleSize(14)}
              font={FONTS.Lato.SemiBold}
              color={'#595959'}>
              {STRING.Taxes}
            </Text>
            <Text
              size={getScaleSize(14)}
              font={FONTS.Lato.SemiBold}
              color={'#595959'}>
              {'€12'}
            </Text>
          </View>
          <View style={styles(theme).dotView} />
          <View style={styles(theme).newhorizontalView}>
            <Text
              style={{ flex: 1.0 }}
              size={getScaleSize(20)}
              font={FONTS.Lato.SemiBold}
              color={'#0F232F'}>
              {STRING.Total}
            </Text>
            <Text
              size={getScaleSize(20)}
              font={FONTS.Lato.SemiBold}
              color={theme.primary}>
              {'€560.9'}
            </Text>
          </View>
        </View>
        <View style={styles(theme).informationContainer}>
          <Text
            style={{}}
            size={getScaleSize(16)}
            font={FONTS.Lato.Bold}
            color={theme.primary}>
            {STRING.Aboutprofessional}
          </Text>

          <View
            style={[
              styles(theme).horizontalView,
              { marginTop: getScaleSize(16) },
            ]}>
            <Image
              style={styles(theme).profilePicView}
              source={IMAGES.user_placeholder}
            />
            <View style={{ flex: 1.0 }}>
              <View style={styles(theme).flexRow}>
                <Text
                  style={{ alignSelf: 'center', marginLeft: getScaleSize(16) }}
                  size={getScaleSize(20)}
                  font={FONTS.Lato.SemiBold}
                  color={'#0F232F'}>
                  {'Bessie Cooper'}
                </Text>
                <Image
                  style={{
                    height: getScaleSize(25),
                    width: getScaleSize(25),
                    marginLeft: getScaleSize(6),
                  }}
                  source={IMAGES.verify}
                />
              </View>
              <View style={[styles(theme).flexRow, { marginLeft: getScaleSize(16), marginTop: getScaleSize(6) }]}>
                <Image source={IMAGES.ic_phone} style={styles(theme).phoneIcon} />
                <Text
                  style={{}}
                  size={getScaleSize(12)}
                  font={FONTS.Lato.Medium}
                  color={'#0F232F'}>
                  {'+91751111111'}
                </Text>
              </View>

            </View>
            <View style={{ flex: 1.0 }} />
            <TouchableOpacity
              activeOpacity={1}
              style={[styles(theme).newButton, { marginLeft: getScaleSize(6) }]}
              onPress={() => {
                props.navigation.navigate(SCREENS.OtherUserProfile.identifier);
              }}>
              <Text
                size={getScaleSize(14)}
                font={FONTS.Lato.Medium}
                color={theme.white}>
                {STRING.ViewProfile}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: getScaleSize(32) }}></View>
      </ScrollView>
      <Button
        title={STRING.Trackservice}
        style={{ marginHorizontal: getScaleSize(22), marginBottom: getScaleSize(16) }}
        onPress={() => {
          props.navigation.navigate(SCREENS.Otp.identifier, {
            isFromSignup: true,
          });
        }}
      />
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.white },
    scrolledContainer: {
      marginTop: getScaleSize(19),
      marginHorizontal: getScaleSize(24),
    },
    doneIcon: {
      height: getScaleSize(58),
      width: getScaleSize(58),
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    informationContainer: {
      marginTop: getScaleSize(20),
      borderWidth: 1,
      borderColor: '#D5D5D5',
      borderRadius: getScaleSize(16),
      paddingHorizontal: getScaleSize(16),
      paddingVertical: getScaleSize(20),
    },
    informationView: {
      paddingVertical: getScaleSize(16),
      backgroundColor: '#EAF0F3',
      borderRadius: getScaleSize(16),
      paddingHorizontal: getScaleSize(16),
      marginTop: getScaleSize(16),
    },
    horizontalView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemView: {
      flexDirection: 'row',
      flex: 1.0,
    },
    informationIcon: {
      height: getScaleSize(25),
      width: getScaleSize(25),
      alignSelf: 'center',
    },
    dotView: {
      // flex:1.0,
      borderStyle: 'dashed',
      borderColor: theme.primary,
      borderWidth: 1,
      marginTop: getScaleSize(8),
    },
    newhorizontalView: {
      flexDirection: 'row',
      marginTop: getScaleSize(16),
    },
    profilePicView: {
      height: getScaleSize(56),
      width: getScaleSize(56),
      borderRadius: getScaleSize(28),
    },
    newButton: {
      // flex: 1.0,
      backgroundColor: theme.primary,
      borderRadius: 8,
      height: getScaleSize(38),
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: getScaleSize(24),
    },
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    phoneIcon: {
      height: getScaleSize(20),
      width: getScaleSize(20),
      marginRight: getScaleSize(6),
    }
  });
