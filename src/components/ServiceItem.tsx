import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext, ThemeContextType} from '../context/ThemeProvider';
import {getScaleSize} from '../constant';
import Text from './Text';
import {FONTS, IMAGES} from '../assets';

export default function ServiceItem(props: any) {
  const {item, itemContainer, isSelected, onPress, isReview} = props;
  const {theme} = useContext<any>(ThemeContext);

  return (
    <TouchableOpacity
      onPress={() => {
        onPress(item);
      }}
      style={[styles(theme).container, itemContainer]}>
      <View
        style={isReview ? styles(theme).reviewIcon : styles(theme).iconView}
      />
      <Text
        style={styles(theme).nameView}
        size={getScaleSize(18)}
        font={FONTS.Lato.SemiBold}
        color={theme._323232}>
        {item.name}
      </Text>
      {isReview ? (
        <Image source={IMAGES.ic_delete} style={styles(theme).deleteIcon} />
      ) : (
        <>
          {isSelected ? (
            <Image
              source={IMAGES.ic_checkbox_select}
              style={styles(theme).icon}
            />
          ) : (
            <Image
              source={IMAGES.ic_checkBox_unSelect}
              style={styles(theme).icon}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      padding: getScaleSize(10),
      backgroundColor: theme._F2F2F2,
      borderRadius: getScaleSize(20),
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconView: {
      width: getScaleSize(100),
      height: getScaleSize(80),
      borderRadius: getScaleSize(12),
      overflow: 'hidden',
      backgroundColor: theme._D5D5D5,
    },
    reviewIcon: {
      width: getScaleSize(80),
      height: getScaleSize(70),
      borderRadius: getScaleSize(12),
      overflow: 'hidden',
      backgroundColor: theme._D5D5D5,
    },
    nameView: {
      flex: 1.0,
      marginLeft: getScaleSize(22),
    },
    icon: {
      width: getScaleSize(24),
      height: getScaleSize(24),
      marginHorizontal: getScaleSize(10),
    },
    deleteIcon: {
      width: getScaleSize(20),
      height: getScaleSize(20),
      marginHorizontal: getScaleSize(10),
    },
  });
