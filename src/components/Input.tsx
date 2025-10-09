import {
  Image,
  ImageSourcePropType,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import React, { memo, useContext } from 'react';

//ASSETS & CONSTANT
import { FONTS, IMAGES } from '../assets';
import { getScaleSize } from '../constant';

//CONTEXT
import Text from './Text';
import { ThemeContext, ThemeContextType } from '../context';

interface InputProps {
  continerStyle?: StyleProp<ViewStyle>;
  value?: any;
  icon?: any;
  onChnageIcon?: () => void;
  onPress?: () => void;
  passwordIcon?: boolean;
  secureTextEntry?: boolean;
  searchBox?: any;
  inputContainer?: StyleProp<ViewStyle>;
  isError?: string;
  inputTitle?: string;
  inputColor?: boolean;
}

function Input(props: InputProps & TextInputProps) {
  const {
    onChnageIcon,
    icon,
    continerStyle,
    passwordIcon,
    secureTextEntry,
    inputContainer,
    placeholderTextColor,
    searchBox,
    isError,
    inputTitle,
    inputColor
  } = props;

  const { theme } = useContext<any>(ThemeContext);

  return (
    <View style={continerStyle}>
      {inputTitle && (
        <Text
          size={getScaleSize(17)}
          font={FONTS.Lato.Medium}
          color={inputColor ? theme._424242 : theme.primary}
          style={{ marginBottom: getScaleSize(8) }}>
          {inputTitle}
        </Text>
      )}
      <Pressable
        onPress={props.onPress}
        style={[
          styles(theme).container,
          { borderColor: isError ? theme._EF5350 : theme._D5D5D5 },
        ]}>
        {searchBox && (
          <View>
            <Image
              source={searchBox}
              style={styles(theme).leftIcon}
              resizeMode={'contain'}
            />
          </View>
        )}
        <TextInput
          {...props}
          style={[styles(theme).input, inputContainer]}
          placeholderTextColor={
            isError
              ? theme._EF5350
              : placeholderTextColor
                ? placeholderTextColor
                : theme._939393
          }
          multiline={props?.multiline ?? false}
          numberOfLines={props?.numberOfLines ?? 1}
          value={props.value}
          secureTextEntry={secureTextEntry}
        />
        {icon && (
          <View>
            <Image
              source={icon}
              style={[styles(theme).rightIcon]}
              resizeMode={'contain'}
            />
          </View>
        )}
        {passwordIcon && (
          <Pressable onPress={onChnageIcon}>
            <Image
              source={secureTextEntry ? IMAGES.ic_hide : IMAGES.ic_show}
              style={[
                styles(theme).rightIcon,
                { tintColor: isError ? theme._EF5350 : theme._2C6587 },
              ]}
              resizeMode={'contain'}
            />
          </Pressable>
        )}
      </Pressable>
      {isError && (
        <Text
          style={{ marginTop: getScaleSize(4) }}
          size={getScaleSize(16)}
          font={FONTS.Lato.SemiBold}
          color={theme._EF5350}>
          {isError ? isError : ''}
        </Text>
      )}
    </View>
  );
}

export default memo(Input);

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: getScaleSize(16),
      borderWidth: 1,
      borderRadius: getScaleSize(12),
    },
    input: {
      fontSize: getScaleSize(16),
      fontFamily: FONTS.Lato.Medium,
      color: theme._31302F,
      flex: 1.0,
      height: Platform.OS == 'ios' ? getScaleSize(56) : getScaleSize(56),
    },
    rightIcon: {
      width: getScaleSize(20),
      height: getScaleSize(20),
    },
    leftIcon: {
      width: getScaleSize(16),
      height: getScaleSize(16),
      marginRight: getScaleSize(10),
    },
  });
