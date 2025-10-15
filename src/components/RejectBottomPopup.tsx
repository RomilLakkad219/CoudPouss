import React, {useContext, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import {ThemeContext, ThemeContextType} from '../context';
import {getScaleSize, useString} from '../constant';
import {FONTS, IMAGES} from '../assets';
import Text from './Text';
import {constant} from 'lodash';
import RBSheet from 'react-native-raw-bottom-sheet';

const RejectBottomPopup = (props: any) => {
  const STRING = useString();
  const {theme} = useContext<any>(ThemeContext);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const [selectedCategory, setSelectedCategory] = useState(1);

  const startOpenAnimations = () => {
    fadeAnim.setValue(0);
    slideAnim.setValue(100); // Start from further down for slower feel
    scaleAnim.setValue(0.7); // Start smaller for more dramatic scale

    // Ultra slow and smooth animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200, // 1.2 seconds
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const startCloseAnimations = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 300,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 300,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={{backgroundColor: 'rgba(0,0,0,0.3)'}}>
      <RBSheet
        ref={props.onRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType="slide"
        onOpen={startOpenAnimations}
        onClose={startCloseAnimations}
        customStyles={{
          container: {
            backgroundColor: '#FFF',
            height: getScaleSize(500),
            borderTopLeftRadius: getScaleSize(20),
            borderTopRightRadius: getScaleSize(20),
          },
        }}>
        <View style={styles(theme).content}>
          <Image style={styles(theme).icon} source={IMAGES.reject_icon} />
          <Text
            size={getScaleSize(22)}
            font={FONTS.Lato.Bold}
            color={theme.primary}
            style={{alignSelf: 'center', marginTop: getScaleSize(16)}}>
            {STRING.RejectServicerequest}
          </Text>

          <TouchableOpacity
            style={styles(theme).radioButtonContainer}
            activeOpacity={1}
            onPress={() => {
              setSelectedCategory(1);
            }}>
            <Text
              style={{flex: 1.0}}
              size={getScaleSize(18)}
              font={FONTS.Lato.Medium}
              color={'#424242'}>
              {STRING.Pricehigherthancompetitors}
            </Text>
            <Image
              style={styles(theme).radioButton}
              source={
                selectedCategory == 1 ? IMAGES.radio_fill : IMAGES.radio_unfill
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles(theme).radioButtonContainer}
            activeOpacity={1}
            onPress={() => {
              setSelectedCategory(2);
            }}>
            <Text
              style={{flex: 1.0}}
              size={getScaleSize(18)}
              font={FONTS.Lato.Medium}
              color={'#424242'}>
              {STRING.Lateresponse}
            </Text>
            <Image
              style={styles(theme).radioButton}
              source={
                selectedCategory == 2 ? IMAGES.radio_fill : IMAGES.radio_unfill
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles(theme).radioButtonContainer}
            activeOpacity={1}
            onPress={() => {
              setSelectedCategory(3);
            }}>
            <Text
              style={{flex: 1.0}}
              size={getScaleSize(18)}
              font={FONTS.Lato.Medium}
              color={'#424242'}>
              {STRING.Rejectedforanotherreason}
            </Text>
            <Image
              style={styles(theme).radioButton}
              source={
                selectedCategory == 3 ? IMAGES.radio_fill : IMAGES.radio_unfill
              }
            />
          </TouchableOpacity>

          <View style={styles(theme).buttonContainer}>
            <TouchableOpacity
              style={styles(theme).backButtonContainer}
              activeOpacity={1}
              onPress={() => {
                
              }}>
              <Text
                size={getScaleSize(19)}
                font={FONTS.Lato.Bold}
                color={theme.primary}
                style={{alignSelf: 'center'}}>
                { STRING.Cancel}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(theme).nextButtonContainer}
              activeOpacity={1}
              onPress={() => {
                
              }}>
              <Text
                size={getScaleSize(19)}
                font={FONTS.Lato.Bold}
                color={theme.white}
                style={{alignSelf: 'center'}}>
                {STRING.Reject}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      marginTop: getScaleSize(24),
    },
    content: {
      paddingVertical: getScaleSize(24),
    },
    icon: {
      height: getScaleSize(60),
      width: getScaleSize(60),
      alignSelf: 'center',
    },
    radioButtonContainer: {
      marginTop: getScaleSize(20),
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme._D5D5D5,
      paddingVertical: getScaleSize(17),
      paddingHorizontal: getScaleSize(17),
      borderRadius: getScaleSize(12),
      marginHorizontal: getScaleSize(22),
    },
    radioButton: {
      height: getScaleSize(24),
      width: getScaleSize(24),
      alignSelf: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      marginHorizontal: getScaleSize(22),
      marginTop:getScaleSize(24)
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

export default RejectBottomPopup;
