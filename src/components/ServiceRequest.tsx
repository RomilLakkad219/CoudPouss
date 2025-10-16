import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext, ThemeContextType} from '../context/ThemeProvider';
import {getScaleSize, useString} from '../constant';
import Text from './Text';
import {FONTS, IMAGES} from '../assets';

export default function ServiceRequest(props: any) {
  const {theme} = useContext<any>(ThemeContext);
  const STRING = useString();

  return (
    <TouchableOpacity
      style={styles(theme).container}
      activeOpacity={1}
      onPress={() => {
        props?.onPress()
      }}>
      <Image
        style={styles(theme).imageContainer}
        source={{uri: 'https://picsum.photos/id/2/200/300'}}
      />
      <View style={styles(theme).horizontalView}>
        <Text
          style={{flex: 1.0}}
          size={getScaleSize(24)}
          font={FONTS.Lato.Bold}
          color={theme._2C6587}>
          {'Furniture Assembly'}
        </Text>
        <Text
          style={{alignSelf: 'center'}}
          size={getScaleSize(14)}
          font={FONTS.Lato.Medium}
          color={theme._737373}>
          {'2 hours ago'}
        </Text>
      </View>
      <View style={styles(theme).verticalView}>
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
              size={getScaleSize(14)}
              font={FONTS.Lato.Medium}
              color={theme._424242}>
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
              size={getScaleSize(14)}
              font={FONTS.Lato.Medium}
              color={theme._424242}>
              {'10:00 am'}
            </Text>
          </View>
        </View>
        <View
          style={[styles(theme).horizontalView, {marginTop: getScaleSize(12)}]}>
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
              size={getScaleSize(14)}
              font={FONTS.Lato.Medium}
              color={theme._424242}>
              {'DIY Services'}
            </Text>
          </View>
          <View style={styles(theme).itemView}>
            <Image style={styles(theme).informationIcon} source={IMAGES.pin} />
            <Text
              style={{
                marginHorizontal: getScaleSize(8),
                alignSelf: 'center',
              }}
              size={getScaleSize(14)}
              font={FONTS.Lato.Medium}
              color={theme._424242}>
              {'Paris, 75001'}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={[styles(theme).horizontalView, {marginTop: getScaleSize(24)}]}>
        <View style={{flex: 1.0}}>
          <Text
            size={getScaleSize(14)}
            font={FONTS.Lato.Medium}
            color={'#424242'}>
            {STRING.EstimatedCost}
          </Text>
          <Text
            style={{marginTop: getScaleSize(2)}}
            size={getScaleSize(27)}
            font={FONTS.Lato.ExtraBold}
            color={theme._2C6587}>
            {'€499'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles(theme).quateContainer}
          activeOpacity={1}
          onPress={() => {}}>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.SemiBold}
            color={theme.white}>
            {STRING.Quote}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      marginTop: getScaleSize(24),
      paddingHorizontal: getScaleSize(16),
      paddingVertical: getScaleSize(16),
      backgroundColor: '#EAF0F3',
      borderRadius: getScaleSize(20),
    },
    imageContainer: {
      height: getScaleSize(163),
      borderRadius: getScaleSize(20),
      width: '100%',
    },
    horizontalView: {
      flexDirection: 'row',
      marginTop: getScaleSize(16),
    },
    verticalView: {
      marginTop: getScaleSize(7),
    },
    informationIcon: {
      height: getScaleSize(25),
      width: getScaleSize(25),
      alignSelf: 'center',
    },
    itemView: {
      flexDirection: 'row',
      flex: 1.0,
    },
    quateContainer: {
      paddingVertical: getScaleSize(16),
      paddingHorizontal: getScaleSize(62),
      borderRadius: getScaleSize(12),
      backgroundColor: theme._214C65,
    },
  });
