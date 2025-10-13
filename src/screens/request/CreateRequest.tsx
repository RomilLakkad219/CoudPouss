import React, {useContext, useState} from 'react';
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
} from 'react-native';

//ASSETS
import {FONTS, IMAGES} from '../../assets';

//CONTEXT
import {ThemeContext, ThemeContextType} from '../../context';

//CONSTANT
import {getScaleSize, useString} from '../../constant';

//COMPONENT
import {Header, ProgressSlider, SearchComponent, Text} from '../../components';

//PACKAGES
import {useFocusEffect} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

export default function CreateRequest(props: any) {
  const STRING = useString();
  const {theme} = useContext<any>(ThemeContext);

  const [selectedProgress, setSelectedProgress] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(1);

  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(theme.white);
        StatusBar.setBarStyle('dark-content');
      }
    }, []),
  );

  function onNext() {
    if (selectedProgress === 1) {
      setSelectedProgress(2);
    } else if (selectedProgress === 2) {
      setSelectedProgress(3);
    }
  }

  function onBack() {
     if (selectedProgress === 1) {
      props.navigation.goBack()
    } else if (selectedProgress === 2) {
      setSelectedProgress(1)
    }
  }

  function renderView() {
    if (selectedProgress === 1) {
      return renderServiceProviderView();
    } else if (selectedProgress === 2) {
      return renderCategoryView();
    }
  }

  function renderCategoryView() {
    return (
      <View style={styles(theme).serviceProviderCotainer}>
        <Text
          size={getScaleSize(24)}
          font={FONTS.Lato.Bold}
          color={theme.primary}>
          {STRING.SelectACategory}
        </Text>
        <Text
          style={{marginTop: getScaleSize(12)}}
          size={getScaleSize(16)}
          font={FONTS.Lato.SemiBold}
          color={theme._939393}>
          {STRING.category_message}
        </Text>
         <Text
          style={{marginTop: getScaleSize(12)}}
          size={getScaleSize(17)}
          font={FONTS.Lato.Medium}
          color={theme._424242}>
          {STRING.Selectacategory}
        </Text>
      </View>
    );
  }

  function renderServiceProviderView() {
    return (
      <View style={styles(theme).serviceProviderCotainer}>
        <Text
          size={getScaleSize(24)}
          font={FONTS.Lato.Bold}
          color={theme.primary}>
          {STRING.select_your_service_provider}
        </Text>
        <Text
          style={{marginTop: getScaleSize(12)}}
          size={getScaleSize(16)}
          font={FONTS.Lato.SemiBold}
          color={theme._939393}>
          {STRING.service_provider_message}
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
            color={theme.primary}>
            {STRING.Professional}
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
            color={theme.primary}>
            {STRING.Nonprofessional}
          </Text>
          <Image
            style={styles(theme).radioButton}
            source={
              selectedCategory == 2 ? IMAGES.radio_fill : IMAGES.radio_unfill
            }
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles(theme).container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.white}
        translucent={false}
      />
      <SafeAreaView />
      <View style={{flexDirection: 'row', marginRight: getScaleSize(22)}}>
        <View style={styles(theme).progressSlider}>
          <ProgressSlider fillCount={selectedProgress} totalCount={6} />
        </View>
        <Text
          size={getScaleSize(12)}
          font={FONTS.Lato.Medium}
          color={theme.primary}
          style={{alignSelf: 'center', marginTop: getScaleSize(9)}}>
          {`${((selectedProgress * 100) / 6).toFixed(2)}%`}
        </Text>
      </View>
      <ScrollView
        style={[styles(theme).container, {marginHorizontal: getScaleSize(22)}]}
        showsVerticalScrollIndicator={false}>
        <>{renderView()}</>
      </ScrollView>
      <View style={styles(theme).buttonContainer}>
        <TouchableOpacity
          style={styles(theme).backButtonContainer}
          activeOpacity={1}
          onPress={() => {
            onBack()
          }}>
          <Text
            size={getScaleSize(19)}
            font={FONTS.Lato.Bold}
            color={theme.primary}
            style={{alignSelf: 'center'}}>
            {STRING.Back}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(theme).nextButtonContainer}
          activeOpacity={1}
          onPress={() => {
            onNext();
          }}>
          <Text
            size={getScaleSize(19)}
            font={FONTS.Lato.Bold}
            color={theme.white}
            style={{alignSelf: 'center'}}>
            {STRING.Next}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: theme.white},
    progressSlider: {
      marginTop: getScaleSize(16),
      marginHorizontal: getScaleSize(22),
      flex: 1.0,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginHorizontal: getScaleSize(22),
      marginBottom: getScaleSize(17),
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
    serviceProviderCotainer: {
      marginTop: getScaleSize(32),
      flexDirection: 'column',
    },
    radioButtonContainer: {
      marginTop: getScaleSize(20),
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme._D5D5D5,
      paddingVertical: getScaleSize(17),
      paddingHorizontal: getScaleSize(17),
      borderRadius: getScaleSize(12),
    },
    radioButton: {
      height: getScaleSize(24),
      width: getScaleSize(24),
      alignSelf: 'center',
    },
  });
