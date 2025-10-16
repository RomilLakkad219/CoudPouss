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
  PaymentBottomPopup,
  RejectBottomPopup,
  RequestItem,
  SearchComponent,
  StatusItem,
  Text,
} from '../../components';

//PACKAGES
import {useFocusEffect} from '@react-navigation/native';
import {Rating} from 'react-native-ratings';

import {SCREENS} from '..';

export default function WriteReview(props: any) {
  const STRING = useString();
  const {theme} = useContext<any>(ThemeContext);

  const [ratting, setRatting] = useState(0);
  const [review, setReview] = useState('');

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
        screenName={STRING.LeaveaReview}
      />
      <ScrollView style={{flex: 1.0}}>
        <View style={styles(theme).serviceProviderCotainer}>
          <Text
            size={getScaleSize(22)}
            font={FONTS.Lato.SemiBold}
            color={theme.primary}>
            {STRING.reviewMessage}
          </Text>
          <Text
            style={{marginTop: getScaleSize(8)}}
            size={getScaleSize(16)}
            font={FONTS.Lato.Medium}
            color={'#424242'}>
            {STRING.reviewQuestion}
          </Text>
          <View style={{flexDirection: 'row', marginTop: getScaleSize(16)}}>
            <Text
              style={{
                flex: 1.0,
                alignSelf: 'center',
                marginTop: getScaleSize(22),
              }}
              size={getScaleSize(18)}
              font={FONTS.Lato.Medium}
              color={'#424242'}>
              {STRING.OverallService}
            </Text>
            <Rating
              type="custom"
              ratingBackgroundColor="#EDEFF0"
              tintColor="#fff" // background color, useful for layout
              ratingCount={5}
              ratingColor={'#F0B52C'} // grey color
              startingValue={ratting}
              imageSize={getScaleSize(34)}
              onFinishRating={(value: any) => setRatting(value)}
              style={{
                marginTop: getScaleSize(26),
                paddingHorizontal: getScaleSize(16),
              }}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: getScaleSize(-8)}}>
            <Text
              style={{
                flex: 1.0,
                alignSelf: 'center',
                marginTop: getScaleSize(22),
              }}
              size={getScaleSize(18)}
              font={FONTS.Lato.Medium}
              color={'#424242'}>
              {STRING.Reliability}
            </Text>
            <Rating
              type="custom"
              ratingBackgroundColor="#EDEFF0"
              tintColor="#fff" // background color, useful for layout
              ratingCount={5}
              ratingColor={'#F0B52C'} // grey color
              startingValue={ratting}
              imageSize={getScaleSize(34)}
              onFinishRating={(value: any) => setRatting(value)}
              style={{
                marginTop: getScaleSize(26),
                paddingHorizontal: getScaleSize(16),
              }}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: getScaleSize(-8)}}>
            <Text
              style={{
                flex: 1.0,
                alignSelf: 'center',
                marginTop: getScaleSize(22),
              }}
              size={getScaleSize(18)}
              font={FONTS.Lato.Medium}
              color={'#424242'}>
              {STRING.Punctuality}
            </Text>
            <Rating
              type="custom"
              ratingBackgroundColor="#EDEFF0"
              tintColor="#fff" // background color, useful for layout
              ratingCount={5}
              ratingColor={'#F0B52C'} // grey color
              startingValue={ratting}
              imageSize={getScaleSize(34)}
              onFinishRating={(value: any) => setRatting(value)}
              style={{
                marginTop: getScaleSize(26),
                paddingHorizontal: getScaleSize(16),
              }}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: getScaleSize(-8)}}>
            <Text
              style={{
                flex: 1.0,
                alignSelf: 'center',
                marginTop: getScaleSize(22),
              }}
              size={getScaleSize(18)}
              font={FONTS.Lato.Medium}
              color={'#424242'}>
              {STRING.Solution}
            </Text>
            <Rating
              type="custom"
              ratingBackgroundColor="#EDEFF0"
              tintColor="#fff" // background color, useful for layout
              ratingCount={5}
              ratingColor={'#F0B52C'} // grey color
              startingValue={ratting}
              imageSize={getScaleSize(34)}
              onFinishRating={(value: any) => setRatting(value)}
              style={{
                marginTop: getScaleSize(26),
                paddingHorizontal: getScaleSize(16),
              }}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: getScaleSize(-8)}}>
            <Text
              style={{
                flex: 1.0,
                alignSelf: 'center',
                marginTop: getScaleSize(22),
              }}
              size={getScaleSize(18)}
              font={FONTS.Lato.Medium}
              color={'#424242'}>
              {STRING.Payout}
            </Text>
            <Rating
              type="custom"
              ratingBackgroundColor="#EDEFF0"
              tintColor="#fff" // background color, useful for layout
              ratingCount={5}
              ratingColor={'#F0B52C'} // grey color
              startingValue={ratting}
              imageSize={getScaleSize(34)}
              onFinishRating={(value: any) => setRatting(value)}
              style={{
                marginTop: getScaleSize(26),
                paddingHorizontal: getScaleSize(16),
              }}
            />
          </View>
          <Text
            style={{marginTop: getScaleSize(20)}}
            size={getScaleSize(18)}
            font={FONTS.Lato.SemiBold}
            color={'#323232'}>
            {STRING.Pleaseshareyourexperience}
          </Text>
          <View style={styles(theme).inputContainer}>
            <TextInput
              style={styles(theme).textInput}
              value={review}
              onChangeText={setReview}
              placeholder={STRING.Writeyourreviewhere}
              placeholderTextColor="#999"
              multiline={true}
              numberOfLines={8}
              textAlignVertical="top"
              blurOnSubmit={true}
              returnKeyType="default"
            />
          </View>
        </View>
      </ScrollView>
      <Button
        title={STRING.Submit}
        style={{
          marginHorizontal: getScaleSize(22),
          marginBottom: getScaleSize(16),
        }}
        onPress={() => {
        }}
      />
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: theme.white},
    serviceProviderCotainer: {
      marginTop: getScaleSize(24),
      flexDirection: 'column',
      marginHorizontal: getScaleSize(22),
    },
    textInput: {
      fontSize: getScaleSize(18),
      color: theme._323232,
      padding: getScaleSize(16),
      minHeight: getScaleSize(240),
      textAlignVertical: 'top',
      fontFamily: FONTS.Lato.Regular,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: theme._D5D5D5,
      borderRadius: getScaleSize(12),
      marginTop: getScaleSize(12),
    },
  });
