import React, { useContext, useState } from 'react';
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
} from 'react-native';

//ASSETS
import { FONTS, IMAGES } from '../../assets';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT
import { getScaleSize, useString } from '../../constant';

//COMPONENT
import { Header, SearchComponent, Text } from '../../components';

//PACKAGES
import { useFocusEffect } from '@react-navigation/native';
import { SCREENS } from '..';

export default function Chat(props: any) {
  const STRING = useString();
  const { theme } = useContext<any>(ThemeContext);

  return (
    <View style={styles(theme).container}>
      <Header
        type='profile'
        screenName={STRING.Chat} />
      <View style={styles(theme).searchContainer}>
        <SearchComponent />
      </View>
      <ScrollView
        style={styles(theme).scrolledContainer}
        showsVerticalScrollIndicator={false}>

        {['', '', '', '', ''].map((item: any, index: number) => {
          return (
            <TouchableOpacity
              style={styles(theme).itemContainer}
              activeOpacity={1}
              onPress={() => {
                props.navigation.navigate(SCREENS.ChatDetails.identifier)
              }}>
              <Image
                style={styles(theme).userImage}
                source={IMAGES.user_placeholder}
              />
              <View style={{ alignSelf: 'center', marginLeft: getScaleSize(12), flex: 1.0 }}>
                <Text
                  size={getScaleSize(16)}
                  font={FONTS.Lato.Medium}
                  color={theme._2B2B2B}>
                  {'Emily Johnson'}
                </Text>
                <Text
                  size={getScaleSize(12)}
                  font={FONTS.Lato.Regular}
                  color={theme._ACADAD}>
                  {'I really appreciated your feedback on the project;'}
                </Text>
              </View>
              <View style={styles(theme).messageContainer}>
                <Text
                  size={getScaleSize(12)}
                  font={FONTS.Lato.Medium}
                  color={theme.white}>
                  {'1'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.white },
    scrolledContainer: {
      marginHorizontal: getScaleSize(22),
      flex: 1.0,
    },
    searchContainer: {
      marginHorizontal: getScaleSize(22),
      marginVertical: getScaleSize(24),
    },
    userImage: {
      height: getScaleSize(60),
      width: getScaleSize(60),
      borderRadius: getScaleSize(30),
    },
    itemContainer: {
      marginBottom: getScaleSize(24),
      flexDirection: 'row',
    },
    messageContainer: {
      height: getScaleSize(24),
      width: getScaleSize(24),
      borderRadius: getScaleSize(12),
      alignSelf: 'center',
      backgroundColor: theme._F0B52C,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: getScaleSize(2)
    }
  });
