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
import {SCREENS} from '..';
import {ASSITANCEDATA} from '../../constant/utils';

const {width} = Dimensions.get('window');
const cellSize = (width - 30) / 7;

export default function Assistance(props: any) {
  const STRING = useString();
  const {theme} = useContext<any>(ThemeContext);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const servicesData = [
    {
      id: '1',
      title: 'Furniture Assembly',
      image: 'https://picsum.photos/id/1/200/300',
    },
    {
      id: '2',
      title: 'Interior Painting',
      image: 'https://picsum.photos/id/1/200/300',
    },
  ];

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
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.white}
        translucent={false}
      />
      {/* <SafeAreaView /> */}
      <Header
        onBack={() => {
          props.navigation.goBack();
        }}
        screenName={ASSITANCEDATA[selectedIndex]?.label}
      />
      <FlatList
        data={servicesData}
        ListHeaderComponent={() => {
          return (
            <>
              <View
                style={{
                  marginTop: getScaleSize(16),
                  marginHorizontal: getScaleSize(22),
                }}>
                <SearchComponent />
              </View>
              <View style={styles(theme).deviderView}></View>
              <Image
                style={styles(theme).bannerContainer}
                source={{uri: 'https://picsum.photos/id/1/200/300'}}
              />
              <View>
                <FlatList
                  data={ASSITANCEDATA}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ListHeaderComponent={() => {
                    return <View style={{width: getScaleSize(22)}} />;
                  }}
                  ListFooterComponent={() => {
                    return <View style={{width: getScaleSize(16)}} />;
                  }}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        style={[
                          styles(theme).itemContainer,
                          {
                            marginLeft: index === 0 ? 0 : 8,
                            backgroundColor:
                              selectedIndex === index
                                ? theme.primary
                                : theme.white,
                          },
                        ]}
                        activeOpacity={1}
                        onPress={() => {
                          setSelectedIndex(index);
                        }}>
                        <Image
                          style={styles(theme).categoryImage}
                          source={item?.icon}
                        />
                        <Text
                          style={{
                            marginLeft: getScaleSize(14),
                            alignSelf: 'center',
                          }}
                          size={getScaleSize(16)}
                          font={FONTS.Lato.Regular}
                          color={
                            selectedIndex === index
                              ? theme.white
                              : theme._999999
                          }>
                          {item?.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </>
          );
        }}
        renderItem={({item, index}) => (
          <View style={{marginHorizontal: getScaleSize(22)}}>
            <AssistanceItems item={item} index={index} />
          </View>
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => {
          return <View style={{height: 16}} />;
        }}
      />
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: getScaleSize(40),
          marginHorizontal: getScaleSize(22),
        }}>
        {['',''].map((item)=>{
              return (
                <AssistanceItems />
              )
            })}
      </ScrollView> */}
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: theme.white},
    deviderView: {
      marginTop: getScaleSize(30),
      height: getScaleSize(6),
      backgroundColor: '#F8F8F8',
    },
    bannerContainer: {
      height: getScaleSize(182),
      borderRadius: getScaleSize(20),
      marginTop: getScaleSize(20),
      marginHorizontal: getScaleSize(24),
    },
    itemContainer: {
      marginTop: getScaleSize(42),
      height: getScaleSize(44),
      paddingHorizontal: getScaleSize(20),
      borderRadius: getScaleSize(32),
      borderWidth: 1,
      borderColor: '#F1F1F1',
      flexDirection: 'row',
    },
    categoryImage: {
      height: getScaleSize(24),
      width: getScaleSize(24),
      alignSelf: 'center',
    },
  });
