import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  View,
} from 'react-native';
import React, { useContext } from 'react';

//COMPONENTS
import Text from './Text';

//ASSETS & CONSTANT
import { FONTS } from '../assets';
import { getScaleSize } from '../constant';
import { ThemeContext, ThemeContextType } from '../context';


interface ButtonProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const Button = (props: ButtonProps) => {
  const { theme } = useContext<any>(ThemeContext)
  const { style, title, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles(theme).gradient, style]} activeOpacity={0.8}>
      <Text
        align="center"
        font={FONTS.Lato.Bold}
        size={getScaleSize(19)}
        color={theme.white}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = (theme: ThemeContextType['theme']) => StyleSheet.create({
  gradient: {
    borderRadius: getScaleSize(12),
    paddingVertical: getScaleSize(18),
    backgroundColor: theme._214C65,
  }
});

export default Button;
