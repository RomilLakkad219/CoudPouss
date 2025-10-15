import React, {useContext, useEffect, useState} from 'react';
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
  SafeAreaView,
  TextInput,
} from 'react-native';

//ASSETS
import {FONTS, IMAGES} from '../../assets';

//CONTEXT
import {ThemeContext, ThemeContextType} from '../../context';

//CONSTANT
import {CATEGORY_DATA, getScaleSize, useString} from '../../constant';

//COMPONENT
import {
  AssistanceItems,
  CalendarComponent,
  CategoryDropdown,
  Header,
  Input,
  ProgressSlider,
  SearchComponent,
  ServiceItem,
  Text,
  TimePicker,
} from '../../components';

//PACKAGES
import {useFocusEffect} from '@react-navigation/native';

export default function Thankyou(props: any) {
  const {theme} = useContext<any>(ThemeContext);

  useEffect(()=>{
    setTimeout(() => {
      props.navigation.goBack()
    }, 4000);
  },[])

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
      <Image style={styles(theme).imageView} source={IMAGES.request_submitteed}/>
     </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
      justifyContent: 'center',
    },
    imageView:{
      width:Dimensions.get('window').width - getScaleSize(58),
      height:getScaleSize(500),
      resizeMode:'contain',
      alignSelf:'center'
    }
  });
