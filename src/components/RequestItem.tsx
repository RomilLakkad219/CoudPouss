import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';

//CONTEXT
import {ThemeContext, ThemeContextType} from '../context';

//CONSTANTS & ASSETS
import {getScaleSize, useString} from '../constant';
import {FONTS, IMAGES} from '../assets';

//COMPONENTS
import Text from './Text';

function RequestItem(props: any) {
  const STRING = useString();
  const {theme} = useContext(ThemeContext);

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).horizontalContainer}>
        <Image
          source={IMAGES.service_icon}
          style={styles(theme).imageIcon}
          resizeMode="contain"
        />
        <Text
          style={{marginLeft: getScaleSize(16), alignSelf: 'center'}}
          size={getScaleSize(24)}
          font={FONTS.Lato.Bold}
          color={theme.primary}>
          {'DIY Service'}
        </Text>
      </View>
      <Text
        style={{marginTop: getScaleSize(12)}}
        size={getScaleSize(20)}
        font={FONTS.Lato.SemiBold}
        color={theme.primary}>
        {'Furniture Assembly'}
      </Text>
      <View style={styles(theme).detailsView}>
        <View style={styles(theme).horizontalContainer}>
          <Text
            style={{flex: 1.0}}
            size={getScaleSize(18)}
            font={FONTS.Lato.SemiBold}
            color={theme._989898}>
            {STRING.Valuation}
          </Text>
           <Text
            size={getScaleSize(20)}
            font={FONTS.Lato.SemiBold}
            color={theme.primary}>
            {'€449.20'}
          </Text>
        </View>
        <View style={[styles(theme).horizontalContainer, {marginTop: getScaleSize(3)}]}>
          <Text
            style={{flex: 1.0}}
            size={getScaleSize(18)}
            font={FONTS.Lato.SemiBold}
            color={theme._989898}>
            {STRING.JobDate}
          </Text>
           <Text
            size={getScaleSize(20)}
            font={FONTS.Lato.SemiBold}
            color={theme.primary}>
            {'16 Aug'}
          </Text>
        </View>
        <View style={[styles(theme).horizontalContainer, {marginTop: getScaleSize(3)}]}>
          <Text
            style={{flex: 1.0}}
            size={getScaleSize(18)}
            font={FONTS.Lato.SemiBold}
            color={theme._989898}>
            {STRING.JobTime}
          </Text>
           <Text
            size={getScaleSize(20)}
            font={FONTS.Lato.SemiBold}
            color={theme.primary}>
            {'10:00 Am'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      marginHorizontal: getScaleSize(24),
      marginTop: getScaleSize(18),
      borderRadius: getScaleSize(16),
      backgroundColor: theme._EAF0F3,
      paddingHorizontal: getScaleSize(16),
      paddingVertical: getScaleSize(16),
    },
    horizontalContainer: {
      flexDirection: 'row',
    },
    imageIcon: {
      width: getScaleSize(48),
      height: getScaleSize(44),
    },
    detailsView: {
      backgroundColor: theme.white,
      borderRadius: getScaleSize(12),
      paddingVertical: getScaleSize(16),
      paddingHorizontal: getScaleSize(16),
      marginTop: getScaleSize(16),
    },
  });

export default RequestItem;
