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
import {ThemeContext, ThemeContextType, AuthContext} from '../../context';

//CONSTANT
import {getScaleSize, useString, getPeerUser} from '../../constant';

//COMPONENT
import {
  AcceptBottomPopup,
  Button,
  Header,
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

export default function ProfessionalTaskDetails(props: any) {
  const STRING = useString();
  const {theme} = useContext<any>(ThemeContext);
  const {user} = useContext<any>(AuthContext);

  const [isStatus, setIsStatus] = useState(false);
  const [visibleTaskDetails, setVisibleTaskDetails] = useState(false);

  const statusData = [
    {
      id: 1,
      title: 'Service request placed',
      date: "Fri, 20 Jan' 2025 - 3:15pm",
      completed: true,
    },
    {
      id: 2,
      title: 'Quote Received',
      date: "Fri, 20 Jan' 2025 - 3:15pm",
      completed: true,
    },
    {
      id: 3,
      title: 'Quote Approved',
      date: "Fri, 20 Jan' 2025 - 3:15pm",
      completed: true,
    },
    {
      id: 4,
      title: 'Payment Processed',
      date: "Fri, 20 Jan' 2025 - 3:15pm",
      completed: true,
    },
    {
      id: 5,
      title: 'Service Confirmed with expert',
      date: "Wed, 18 Jan' 2025 - 7:07pm",
      completed: true,
    },
    {
      id: 6,
      title: 'Expert out for service',
      date: "Scheduled on Fri, 20 Jan' 2025 - 3:15pm",
      completed: false,
    },
    {
      id: 7,
      title: 'Service Started',
      date: "Scheduled on Fri, 20 Jan' 2025 - 3:15pm",
      completed: false,
    },
    {
      id: 8,
      title: 'Service Completed',
      date: "Scheduled on Fri, 20 Jan' 2025 - 3:15pm",
      completed: false,
    },
  ];

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
        screenName={STRING.TaskDetails}
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
        <View style={styles(theme).amountContainer}>
          <Text
            style={{flex: 1.0}}
            size={getScaleSize(18)}
            font={FONTS.Lato.Medium}
            color={theme._323232}>
            {STRING.FinalizedQuoteAmount}
          </Text>
          <Text
            style={{flex: 1.0, marginTop: getScaleSize(8)}}
            size={getScaleSize(27)}
            font={FONTS.Lato.Bold}
            color={theme._323232}>
            {'€499'}
          </Text>
        </View>
        <View style={styles(theme).amountContainer}>
          <Text
            style={{flex: 1.0}}
            size={getScaleSize(18)}
            font={FONTS.Lato.Medium}
            color={theme._323232}>
            {STRING.SecurityCode}
          </Text>
          <FlatList
            data={['1', '2', '3', '4', '5', '6', '.', '.', '.']}
            horizontal
            renderItem={({item, index}) => {
              return (
                <View
                  style={[
                    styles(theme).securityItemContainer,
                    {marginLeft: index === 0 ? 0 : 6},
                  ]}>
                  <Text
                    style={{flex: 1.0}}
                    size={getScaleSize(18)}
                    font={FONTS.Lato.Medium}
                    color={theme._323232}>
                    {item}
                  </Text>
                </View>
              );
            }}
          />
          <Text
            style={{flex: 1.0, marginTop: getScaleSize(12)}}
            size={getScaleSize(11)}
            font={FONTS.Lato.Regular}
            color={'#424242'}>
            {STRING.security_note}
          </Text>
        </View>
        <View style={styles(theme).profileContainer}>
          <View style={styles(theme).horizontalView}>
            <Text
              style={{flex: 1.0}}
              size={getScaleSize(18)}
              font={FONTS.Lato.SemiBold}
              color={theme._323232}>
              {'About client'}
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
            <View>
              <Text
                style={{alignSelf: 'center', marginLeft: getScaleSize(16)}}
                size={getScaleSize(20)}
                font={FONTS.Lato.SemiBold}
                color={'#0F232F'}>
                {'Bessie Cooper'}
              </Text>
              <Text
                style={{marginLeft: getScaleSize(16)}}
                size={getScaleSize(12)}
                font={FONTS.Lato.Medium}
                color={'#595959'}>
                {'9988332233'}
              </Text>
            </View>
            {/* <Image
              style={{
                height: getScaleSize(25),
                width: getScaleSize(25),
                alignSelf: 'center',
                marginLeft: getScaleSize(6),
              }}
              source={IMAGES.verify}
            /> */}
            <View style={{flex: 1.0}} />
            <TouchableOpacity
              activeOpacity={1}
              style={[
                styles(theme).newButton,
                {marginRight: getScaleSize(6), width: getScaleSize(86)},
              ]}
              onPress={() => {
                const peerUser = getPeerUser(user?.user_id);
                props.navigation.navigate(SCREENS.ChatDetails.identifier, {
                  peerUser,
                });
              }}>
              <Text
                size={getScaleSize(14)}
                font={FONTS.Lato.Medium}
                color={theme.white}>
                {STRING.Chat}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles(theme).profileContainer}>
          <Text
            style={{flex: 1.0}}
            size={getScaleSize(18)}
            font={FONTS.Lato.Medium}
            color={theme._323232}>
            {'Address'}
          </Text>
          <View style={{flexDirection: 'row', marginTop: getScaleSize(12)}}>
            <Image
              style={{height: getScaleSize(24), width: getScaleSize(24)}}
              source={IMAGES.map_pin}
            />
            <Text
              style={{flex: 1.0, marginLeft: getScaleSize(4)}}
              size={getScaleSize(14)}
              font={FONTS.Lato.SemiBold}
              color={'#595959'}>
              {'4517 Washington Ave. Manchester, Kentucky 39495'}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles(theme).profileContainer,
            {paddingVertical: getScaleSize(26)},
          ]}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            activeOpacity={1}
            onPress={() => {
              setIsStatus(!isStatus);
            }}>
            <Text
              style={{flex: 1.0}}
              size={getScaleSize(18)}
              font={FONTS.Lato.Medium}
              color={theme._323232}>
              {STRING.CheckStatus}
            </Text>
            <TouchableOpacity
              style={{height: getScaleSize(25), width: getScaleSize(24)}}
              activeOpacity={1}
              onPress={() => {
                setIsStatus(!isStatus);
              }}>
              <Image
                style={{height: getScaleSize(25), width: getScaleSize(24)}}
                source={isStatus ? IMAGES.up : IMAGES.down}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          {isStatus && (
            <>
              <View style={styles(theme).devider}></View>
              <View style={{marginTop: getScaleSize(32)}}>
                {statusData.map((item, index) => (
                  <StatusItem
                    key={item.id}
                    item={item}
                    index={index}
                    isLast={index === statusData.length - 1}
                  />
                ))}
              </View>
            </>
          )}
        </View>
        <View
          style={[
            styles(theme).profileContainer,
            {paddingVertical: getScaleSize(26)},
          ]}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            activeOpacity={1}
            onPress={() => {
              setVisibleTaskDetails(!visibleTaskDetails);
            }}>
            <Text
              style={{flex: 1.0}}
              size={getScaleSize(18)}
              font={FONTS.Lato.SemiBold}
              color={theme._323232}>
              {STRING.TaskDetails}
            </Text>
            <TouchableOpacity
              style={{height: getScaleSize(25), width: getScaleSize(24)}}
              activeOpacity={1}
              onPress={() => {
                setVisibleTaskDetails(!visibleTaskDetails);
              }}>
              <Image
                style={{height: getScaleSize(25), width: getScaleSize(24)}}
                source={isStatus ? IMAGES.up : IMAGES.down}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          {visibleTaskDetails && (
            <>
              <View style={styles(theme).devider}></View>
              <Text
                style={{flex: 1.0, marginTop: getScaleSize(20)}}
                size={getScaleSize(18)}
                font={FONTS.Lato.SemiBold}
                color={'#424242'}>
                {STRING.Servicedescription}
              </Text>
              <Text
                style={{flex: 1.0, marginTop: getScaleSize(16)}}
                size={getScaleSize(14)}
                font={FONTS.Lato.Medium}
                color={theme._939393}>
                {
                  'Transform your space with our expert furniture assembly services. Our skilled team will handle everything from unpacking to setup, ensuring your new pieces are perfectly assembled and ready for use. We specialize in a wide range of furniture types, including flat-pack items, complex modular systems, and custom installations. Enjoy a hassle-free experience as we take care of the details, allowing you to focus on enjoying your newly furnished area. Schedule your assembly today and let us help you create the perfect environment!'
                }
              </Text>
              <Text
                style={{flex: 1.0, marginTop: getScaleSize(20)}}
                size={getScaleSize(18)}
                font={FONTS.Lato.SemiBold}
                color={'#424242'}>
                {STRING.Jobphotos}
              </Text>
              <FlatList
                data={['']}
                horizontal
                keyExtractor={(item: any, index: number) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <Image
                      style={[styles(theme).photosView]}
                      source={{uri: 'https://picsum.photos/id/1/200/300'}}
                    />
                  );
                }}
              />
            </>
          )}
        </View>
        <View style={styles(theme).informationContainer}>
          <Text
            size={getScaleSize(18)}
            font={FONTS.Lato.SemiBold}
            color={theme._323232}>
            {STRING.FinalPaymentBreakdown}
          </Text>
          <View style={styles(theme).newHorizontalView}>
            <Text
              style={{flex: 1.0}}
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
          <View style={styles(theme).newHorizontalView}>
            <Text
              style={{flex: 1.0}}
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
          <View style={styles(theme).newHorizontalView}>
            <Text
              style={{flex: 1.0}}
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
          <View style={styles(theme).newHorizontalView}>
            <Text
              style={{flex: 1.0}}
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
      </ScrollView>
      {/* <Button
        title={STRING.WriteaReview}
        style={{
          marginHorizontal: getScaleSize(22),
          marginBottom: getScaleSize(16),
        }}
        onPress={() => {
          props.navigation.navigate(SCREENS.WriteReview.identifier);
        }}
      /> */}
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
      width: 86,
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
  });
