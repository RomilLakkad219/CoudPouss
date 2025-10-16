import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext, ThemeContextType} from '../context/ThemeProvider';
import {getScaleSize, useString} from '../constant';
import Text from './Text';
import {FONTS, IMAGES} from '../assets';

export default function TaskItem(props: any) {
  const {theme} = useContext<any>(ThemeContext);
  const STRING = useString();

  function getMessage() {
    if (props?.type === 'quate_sent') {
      return 'Quote Submitted';
    } else {
      return 'Quote Submitted';
    }
  }

  return (
    <TouchableOpacity
      style={styles(theme).container}
      activeOpacity={1}
      onPress={() => {props?.onPressItem()}}>
      <View style={styles(theme).headerContainer}>
        <Text
          size={getScaleSize(16)}
          font={FONTS.Lato.Bold}
          color={theme._214C65}
          style={{}}>
          {getMessage()}
        </Text>
      </View>
      <View style={styles(theme).horizontalContainer}>
        <View style={{flex: 1.0}}>
          <Text
            style={{flex: 1.0}}
            size={getScaleSize(24)}
            font={FONTS.Lato.Bold}
            color={theme._2C6587}>
            {'Furniture Assembly'}
          </Text>
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
              color={theme._2C6587}>
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
              color={theme._2C6587}>
              {'10:00 am'}
            </Text>
          </View>
        </View>
        <Image
          style={styles(theme).imageView}
          source={{uri: 'https://picsum.photos/id/1/200/300'}}
        />
      </View>
      <View style={styles(theme).deviderView} />
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles(theme).buttonView}
          activeOpacity={1}
          onPress={() => {
            props?.onPressStatus();
          }}>
          <Text
            style={{}}
            size={getScaleSize(14)}
            font={FONTS.Lato.SemiBold}
            color={theme._2C6587}>
            {STRING.TaskStatus}
          </Text>
        </TouchableOpacity>
        <View style={styles(theme).verticalDevicer} />
        <TouchableOpacity
          style={styles(theme).buttonView}
          activeOpacity={1}
          onPress={() => {
            props?.onPressChat();
          }}>
          <Text
            style={{}}
            size={getScaleSize(14)}
            font={FONTS.Lato.SemiBold}
            color={theme._2C6587}>
            {STRING.Chat}
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
      borderTopLeftRadius: getScaleSize(24),
      borderTopRightRadius: getScaleSize(24),
      borderBottomRightRadius: getScaleSize(24),
      borderBottomLeftRadius: getScaleSize(24),
      borderColor: '#F2F2F2',
      borderWidth: 1,
    },
    headerContainer: {
      borderTopLeftRadius: getScaleSize(24),
      borderTopRightRadius: getScaleSize(24),
      paddingVertical: getScaleSize(10),
      alignItems: 'center',
      backgroundColor: '#EAF0F3',
    },
    horizontalContainer: {
      flexDirection: 'row',
      paddingVertical: getScaleSize(16),
      paddingHorizontal: getScaleSize(16),
    },
    itemView: {
      flexDirection: 'row',
      flex: 1.0,
      marginTop: getScaleSize(14),
    },
    informationIcon: {
      height: getScaleSize(25),
      width: getScaleSize(25),
      alignSelf: 'center',
    },
    imageView: {
      height: getScaleSize(113),
      width: getScaleSize(118),
      alignSelf: 'center',
      borderRadius: getScaleSize(12),
    },
    deviderView: {
      height: 1,
      flex: 1.0,
      backgroundColor: '#F2F2F2',
      marginTop: getScaleSize(16),
    },
    buttonView: {
      flex: 1.0,
      alignItems: 'center',
      paddingVertical: getScaleSize(16),
    },
    verticalDevicer: {
      width: 1,
      backgroundColor: '#F2F2F2',
    },
  });
