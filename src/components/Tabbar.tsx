import React from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

// CONSTANT & ASSETS
import {getScaleSize} from '../constant';
import {IMAGES} from '../assets/images';
import {FONTS} from '../assets';

function Tabbar(props: any) {
  
  const images = [
    IMAGES.home_unselected,
    IMAGES.request_unselected,
    IMAGES.plus,
    IMAGES.chat_unselected,
    IMAGES.profile_unselected,
  ];
}
