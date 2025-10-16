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
  TextInput,
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
  Button,
  Header,
  Input,
  PaymentBottomPopup,
  RejectBottomPopup,
  RequestItem,
  SearchComponent,
  StatusItem,
  Text,
} from '../../components';

//PACKAGES
import {useFocusEffect} from '@react-navigation/native';
import {SCREENS} from '..';

export default function AddQuote(props: any) {
  const STRING = useString();
  const {theme} = useContext<any>(ThemeContext);

  const [amount, setAmount] = useState('');
  const [desctiption, setDescription] = useState('');

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
        screenName={STRING.Addquoteamount}
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
        <View style={styles(theme).profileContainer}>
          <View style={styles(theme).horizontalView}>
            <Text
              style={{flex: 1.0}}
              size={getScaleSize(18)}
              font={FONTS.Lato.SemiBold}
              color={theme._323232}>
              {STRING.Aboutclient}
            </Text>
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
        </View>
        <Input
          placeholder={STRING.enter_email_or_mobile_number}
          placeholderTextColor={theme._424242}
          inputTitle={STRING.EnterQuoteAmount}
          inputColor={true}
          continerStyle={{marginTop: getScaleSize(16)}}
          value={`${'€'}${amount}`}
          keyboardType="numeric"
          autoCapitalize="none"
          onChangeText={text => {
            const cleaned = text.replace(/[^0-9.]/g, '');
            const formatted = cleaned.replace(/^(\d*\.?\d{0,2}).*$/, '$1');
            setAmount(formatted);
          }}
        />
        <Text
          style={{marginTop: getScaleSize(12)}}
          size={getScaleSize(17)}
          font={FONTS.Lato.Medium}
          color={theme._424242}>
          {STRING.Addpersonalizedshortmessage}
        </Text>
        <View style={styles(theme).inputContainer}>
          <TextInput
            style={styles(theme).textInput}
            value={desctiption}
            onChangeText={setDescription}
            placeholder={STRING.Enterdescriptionhere}
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={8}
            textAlignVertical="top"
            blurOnSubmit={true}
            returnKeyType="default"
          />
        </View>
        <Text
          style={{marginTop: getScaleSize(20)}}
          size={getScaleSize(17)}
          font={FONTS.Lato.Medium}
          color={theme._424242}>
          {STRING.Attachsupportingdocuments}
        </Text>
        <View style={styles(theme).imageUploadContent}>
          <TouchableOpacity
            style={[styles(theme).uploadButton, {marginRight: getScaleSize(9)}]}
            activeOpacity={1}
            onPress={() => {}}>
            <Image
              style={styles(theme).attachmentIcon}
              source={IMAGES.upload_attachment}
            />
            <Text
              style={{marginTop: getScaleSize(8)}}
              size={getScaleSize(15)}
              font={FONTS.Lato.Regular}
              color={theme._818285}>
              {STRING.upload_from_device}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles(theme).uploadButton, {marginLeft: getScaleSize(9)}]}
            activeOpacity={1}
            onPress={() => {}}>
            <Image
              style={styles(theme).attachmentIcon}
              source={IMAGES.upload_attachment}
            />
            <Text
              style={{marginTop: getScaleSize(8)}}
              size={getScaleSize(15)}
              font={FONTS.Lato.Regular}
              color={theme._818285}>
              {STRING.upload_from_device}
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{marginTop: getScaleSize(20)}}
          size={getScaleSize(17)}
          font={FONTS.Lato.Medium}
          color={theme._424242}>
          {STRING.Uploadashortvideo}
        </Text>
        <TouchableOpacity
          style={[
            styles(theme).uploadButton,
            {marginRight: getScaleSize(0), marginTop: getScaleSize(12)},
          ]}
          activeOpacity={1}
          onPress={() => {}}>
          <Image
            style={styles(theme).attachmentIcon}
            source={IMAGES.upload_attachment}
          />
          <Text
            style={{marginTop: getScaleSize(8)}}
            size={getScaleSize(15)}
            font={FONTS.Lato.Regular}
            color={theme._818285}>
            {STRING.upload_from_device}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Button
        title={STRING.SubmitQuote}
        style={{
          marginVertical: getScaleSize(24),
          marginHorizontal: getScaleSize(24),
        }}
        onPress={() => {
          props.navigation.navigate(SCREENS.Success.identifier)
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
      marginTop: getScaleSize(32),
      paddingVertical: getScaleSize(9),
      borderWidth: 1,
      borderColor: '#D5D5D5',
      borderRadius: getScaleSize(16),
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
      marginTop: getScaleSize(24),
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
    securityItemContainer: {
      paddingVertical: getScaleSize(8),
      paddingHorizontal: getScaleSize(12),
      borderRadius: getScaleSize(12),
      borderColor: '#D5D5D5',
      borderWidth: 1,
      marginTop: getScaleSize(16),
    },
    devider: {
      backgroundColor: '#E6E6E6',
      height: 1,
      marginTop: getScaleSize(18),
    },
    dotView: {
      // flex:1.0,
      borderStyle: 'dashed',
      borderColor: theme.primary,
      borderWidth: 1,
      marginTop: getScaleSize(8),
    },
    informationContainer: {
      marginTop: getScaleSize(24),
      borderWidth: 1,
      borderColor: '#D5D5D5',
      borderRadius: getScaleSize(16),
      paddingHorizontal: getScaleSize(24),
      paddingVertical: getScaleSize(24),
    },
    newHorizontalView: {
      flexDirection: 'row',
      marginTop: getScaleSize(8),
    },
    quateContainer: {
      paddingVertical: getScaleSize(16),
      paddingHorizontal: getScaleSize(62),
      borderRadius: getScaleSize(12),
      backgroundColor: theme._214C65,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: theme._D5D5D5,
      borderRadius: getScaleSize(12),
      marginTop: getScaleSize(12),
    },
    textInput: {
      fontSize: getScaleSize(18),
      color: theme._323232,
      padding: getScaleSize(16),
      minHeight: getScaleSize(240),
      textAlignVertical: 'top',
      fontFamily: FONTS.Lato.Regular,
    },
  });
