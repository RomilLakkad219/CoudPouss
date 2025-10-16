import React, {useContext, useRef, useState} from 'react';
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
import {FONTS, IMAGES} from '../../assets';

//CONTEXT
import {ThemeContext, ThemeContextType} from '../../context';

//CONSTANT
import {getScaleSize, useString} from '../../constant';

//COMPONENT
import {
  AcceptBottomPopup,
  Header,
  PaymentBottomPopup,
  RejectBottomPopup,
  RequestItem,
  SearchComponent,
  Text,
} from '../../components';

//PACKAGES
import {useFocusEffect} from '@react-navigation/native';
import {SCREENS} from '..';

export default function RequestDetails(props: any) {
  const STRING = useString();
  const {theme} = useContext<any>(ThemeContext);

  const rejectRef = useRef<any>(null);
  const acceptRef = useRef<any>(null);
  const paymentRef = useRef<any>(null);

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
        screenName={STRING.ViewQuote}
      />
      <ScrollView
        style={styles(theme).scrolledContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles(theme).imageContainer}>
          <Image
            style={styles(theme).imageView}
            source={{uri: 'https://picsum.photos/id/1/200/300'}}
          />
          <Text
            style={{
              marginVertical: getScaleSize(12),
              marginLeft: getScaleSize(4),
            }}
            size={getScaleSize(24)}
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
                {marginTop: getScaleSize(12)},
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
        <Text
          style={{marginTop: getScaleSize(24)}}
          size={getScaleSize(18)}
          font={FONTS.Lato.SemiBold}
          color={theme._323232}>
          {STRING.QuoteAmount}
        </Text>
        <View style={styles(theme).amountContainer}>
          <Text
            style={{flex: 1.0, alignSelf: 'center'}}
            size={getScaleSize(27)}
            font={FONTS.Lato.Bold}
            color={theme._323232}>
            {'€499'}
          </Text>
          <TouchableOpacity
            style={styles(theme).negociateButton}
            activeOpacity={1}
            onPress={() => {
              props.navigation.navigate(SCREENS.ChatDetails.identifier);
            }}>
            <Text
              size={getScaleSize(14)}
              font={FONTS.Lato.Medium}
              color={theme.white}>
              {STRING.Negotiate}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles(theme).profileContainer}>
          <View style={styles(theme).horizontalView}>
            <Text
              style={{flex: 1.0}}
              size={getScaleSize(18)}
              font={FONTS.Lato.SemiBold}
              color={theme._323232}>
              {STRING.Aboutprofessional}
            </Text>
            <Image style={styles(theme).likeIcon} source={IMAGES.like_unfill} />
          </View>
          <View
            style={[
              styles(theme).horizontalView,
              {marginTop: getScaleSize(16)},
            ]}>
            <Image
              style={styles(theme).profilePicView}
              source={IMAGES.user_placeholder}
            />
            <Text
              style={{alignSelf: 'center', marginLeft: getScaleSize(16)}}
              size={getScaleSize(20)}
              font={FONTS.Lato.SemiBold}
              color={'#0F232F'}>
              {'Bessie Cooper'}
            </Text>
            <Image
              style={{
                height: getScaleSize(25),
                width: getScaleSize(25),
                alignSelf: 'center',
                marginLeft: getScaleSize(6),
              }}
              source={IMAGES.verify}
            />
          </View>
          <View
            style={[
              styles(theme).horizontalView,
              {marginTop: getScaleSize(16)},
            ]}>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles(theme).newButton, {marginRight: getScaleSize(6)}]}
              onPress={() => {
                props.navigation.navigate(SCREENS.ChatDetails.identifier);
              }}>
              <Text
                size={getScaleSize(14)}
                font={FONTS.Lato.Medium}
                color={theme.white}>
                {STRING.Chat}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles(theme).newButton, {marginLeft: getScaleSize(6)}]}
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
        <Text
          style={{marginTop: getScaleSize(24)}}
          size={getScaleSize(18)}
          font={FONTS.Lato.SemiBold}
          color={theme._323232}>
          {STRING.Personalizedshortmessage}
        </Text>
        <View style={styles(theme).serviceDescriptionView}>
          <Text
            size={getScaleSize(18)}
            font={FONTS.Lato.Regular}
            color={theme._555555}>
            {
              'Our skilled team will expertly assemble your furniture, ensuring every piece is put together with precision. We take pride in our attention to detail, so you can trust that your items will be ready for use in no time. Whether its a complex wardrobe or a simple table, we handle it all with care and professionalism. Enjoy a hassle-free experience as we transform your space with our assembly services.'
            }
          </Text>
        </View>
        <Text
          style={{marginTop: getScaleSize(24)}}
          size={getScaleSize(18)}
          font={FONTS.Lato.SemiBold}
          color={theme._323232}>
          {STRING.Supportingdocuments}
        </Text>
        <View style={styles(theme).imageUploadContent}>
          <TouchableOpacity
            style={[styles(theme).uploadButton, {marginRight: getScaleSize(9)}]}
            activeOpacity={1}
            onPress={() => {}}>
            <Image
              style={styles(theme).attachmentIcon}
              source={IMAGES.pdf_icon}
            />
            <Text
              style={{marginTop: getScaleSize(8)}}
              size={getScaleSize(15)}
              font={FONTS.Lato.Regular}
              color={theme._818285}>
              {STRING.ViewDocument}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles(theme).uploadButton, {marginLeft: getScaleSize(9)}]}
            activeOpacity={1}
            onPress={() => {}}>
            <Image
              style={styles(theme).attachmentIcon}
              source={IMAGES.pdf_icon}
            />
            <Text
              style={{marginTop: getScaleSize(8)}}
              size={getScaleSize(15)}
              font={FONTS.Lato.Regular}
              color={theme._818285}>
              {STRING.ViewDocument}
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{marginTop: getScaleSize(24)}}
          size={getScaleSize(18)}
          font={FONTS.Lato.SemiBold}
          color={theme._323232}>
          {STRING.Shortvideos}
        </Text>
        <FlatList
          data={['']}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={(item: any, index: number) => {
            return (
              <Image
                style={[styles(theme).photosView]}
                source={{uri: 'https://picsum.photos/id/1/200/300'}}
              />
            );
          }}
        />
      </ScrollView>
      <View style={styles(theme).buttonContainer}>
        <TouchableOpacity
          style={styles(theme).backButtonContainer}
          activeOpacity={1}
          onPress={() => {
            rejectRef.current.open();
          }}>
          <Text
            size={getScaleSize(19)}
            font={FONTS.Lato.Bold}
            color={theme.primary}
            style={{alignSelf: 'center'}}>
            {STRING.Reject}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(theme).nextButtonContainer}
          activeOpacity={1}
          onPress={() => {
            acceptRef.current.open();
          }}>
          <Text
            size={getScaleSize(19)}
            font={FONTS.Lato.Bold}
            color={theme.white}
            style={{alignSelf: 'center'}}>
            {STRING.Accept}
          </Text>
        </TouchableOpacity>
      </View>
      <RejectBottomPopup onRef={rejectRef} />
      <AcceptBottomPopup
        onRef={acceptRef}
        onClose={() => {
          acceptRef.current.close();
        }}
        onNavigate={() => {
          acceptRef.current.close();
          setTimeout(() => {
            paymentRef.current.open();
          }, 1000);
        }}
      />
      <PaymentBottomPopup
        onRef={paymentRef}
        onClose={() => {
          paymentRef.current.close();
        }}
        proceedToPay={() => {
          paymentRef.current.close();
          setTimeout(() => {
            props.navigation.navigate(SCREENS.ServiceConfirmed.identifier)
          }, 1000);
        }}
      />
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: theme.white},
    scrolledContainer: {
      marginTop: getScaleSize(19),
      marginHorizontal: getScaleSize(24),
    },
    imageContainer: {
      paddingVertical: getScaleSize(12),
      paddingHorizontal: getScaleSize(12),
      borderRadius: getScaleSize(20),
      backgroundColor: '#EAF0F3',
    },
    imageView: {
      height: getScaleSize(172),
      borderRadius: getScaleSize(20),
      flex: 1.0,
    },
    informationView: {
      paddingVertical: getScaleSize(16),
      backgroundColor: theme.white,
      borderRadius: getScaleSize(16),
      paddingHorizontal: getScaleSize(16),
    },
    horizontalView: {
      flexDirection: 'row',
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
    amountContainer: {
      marginTop: getScaleSize(12),
      paddingVertical: getScaleSize(9),
      borderWidth: 1,
      borderColor: '#D5D5D5',
      borderRadius: getScaleSize(16),
      flexDirection: 'row',
      paddingHorizontal: getScaleSize(16),
    },
    negociateButton: {
      paddingVertical: getScaleSize(10),
      paddingHorizontal: getScaleSize(20),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: getScaleSize(8),
      backgroundColor: theme.primary,
    },
    profileContainer: {
      borderColor: '#D5D5D5',
      paddingVertical: getScaleSize(13),
      paddingHorizontal: getScaleSize(16),
      borderWidth: 1,
      borderRadius: getScaleSize(16),
      marginTop: getScaleSize(16),
    },
    likeIcon: {
      height: getScaleSize(28),
      width: getScaleSize(28),
      alignSelf: 'center',
    },
    profilePicView: {
      height: getScaleSize(56),
      width: getScaleSize(56),
      borderRadius: getScaleSize(28),
    },
    newButton: {
      flex: 1.0,
      backgroundColor: theme.primary,
      borderRadius: 8,
      height: getScaleSize(38),
      justifyContent: 'center',
      alignItems: 'center',
    },
    serviceDescriptionView: {
      marginTop: getScaleSize(12),
      borderWidth: 1,
      borderColor: theme._D5D5D5,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 16,
    },
    imageUploadContent: {
      marginTop: getScaleSize(12),
      flexDirection: 'row',
    },
    uploadButton: {
      flex: 1.0,
      borderWidth: 1,
      borderColor: theme._818285,
      borderStyle: 'dashed',
      borderRadius: getScaleSize(8),
      justifyContent: 'center',
      alignItems: 'center',
      height: getScaleSize(160),
    },
    attachmentIcon: {
      height: getScaleSize(40),
      width: getScaleSize(40),
      alignSelf: 'center',
    },
    photosView: {
      height: getScaleSize(144),
      width: getScaleSize(180),
      borderRadius: 8,
      resizeMode: 'cover',
      marginTop: getScaleSize(18),
    },
    buttonContainer: {
      flexDirection: 'row',
      marginHorizontal: getScaleSize(22),
      marginBottom: getScaleSize(17),
    },
    backButtonContainer: {
      flex: 1.0,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.primary,
      borderRadius: getScaleSize(12),
      paddingVertical: getScaleSize(18),
      backgroundColor: theme.white,
      marginRight: getScaleSize(8),
    },
    nextButtonContainer: {
      flex: 1.0,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.primary,
      borderRadius: getScaleSize(12),
      paddingVertical: getScaleSize(18),
      backgroundColor: theme.primary,
      marginLeft: getScaleSize(8),
    },
  });
