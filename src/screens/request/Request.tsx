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
} from 'react-native';

//ASSETS
import {FONTS, IMAGES} from '../../assets';

//CONTEXT
import {ThemeContext, ThemeContextType} from '../../context';

//CONSTANT
import {getScaleSize, useString} from '../../constant';

//COMPONENT
import {Header, SearchComponent, Text} from '../../components';

//PACKAGES
import {useFocusEffect} from '@react-navigation/native';
import {SCREENS} from '..';

export default function Request(props: any) {
  const STRING = useString();
  const {theme} = useContext<any>(ThemeContext);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const data = [
    {id: '1', title: 'All'},
    {id: '2', title: 'Open Proposal'},
    {id: '3', title: 'Responses'},
    {id: '4', title: 'Validation'},
  ];

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor(theme.white);
      StatusBar.setBarStyle('dark-content');
    }, []),
  );

  return (
    <View style={styles(theme).container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.white}
        translucent={false}
      />
      <Text
        size={getScaleSize(24)}
        font={FONTS.Lato.Bold}
        color={theme.primary}
        style={{
          marginTop: getScaleSize(8),
          marginHorizontal: getScaleSize(22),
        }}>
        {STRING.Request}
      </Text>
      <ScrollView
        style={styles(theme).scrolledContainer}
        showsVerticalScrollIndicator={false}>
        <SearchComponent />
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: getScaleSize(18),
          }}
          // ListHeaderComponent={() => {
          //   return <View style={{width: getScaleSize(22)}} />;
          // }}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[
                styles(theme).unselectedContainer,
                {
                  marginLeft: index === 0 ? 0 : getScaleSize(16),
                  backgroundColor:
                    selectedIndex === index ? theme.primary : '#F7F7F7',
                },
              ]}
              activeOpacity={1}
              onPress={() => {
                setSelectedIndex(index);
              }}>
              <Text
                size={getScaleSize(16)}
                font={FONTS.Lato.Regular}
                color={selectedIndex === index ? theme.white : theme._818285}>
                {item?.title}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles(theme).emptyView}>
          <Image style={styles(theme).emptyImage} source={IMAGES.empty} />
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.SemiBold}
            align="center"
            color={theme._939393}
            style={{
              marginTop: getScaleSize(42),
              textAlign: 'center',
              alignSelf: 'center',
            }}>
            {STRING.Youhavenotcreatedanyrequest}
          </Text>
          <TouchableOpacity
            style={styles(theme).btnRequestService}
            activeOpacity={1}
            onPress={() => {
              props.navigation.navigate(SCREENS.CreateRequest.identifier);
            }}>
            <Text
              size={getScaleSize(19)}
              font={FONTS.Lato.Bold}
              color={theme.white}>
              {STRING.Requestaservice}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: theme.white},
    scrolledContainer: {
      marginHorizontal: getScaleSize(22),
      marginTop: getScaleSize(24),
      flex: 1.0,
    },
    unselectedContainer: {
      paddingVertical: getScaleSize(18),
      paddingHorizontal: getScaleSize(18),
      borderRadius: getScaleSize(10),
      backgroundColor: '#F7F7F7',
    },
    emptyView: {
      flex: 1.0,
      alignSelf: 'center',
      marginTop: getScaleSize(41),
    },
    emptyImage: {
      height: getScaleSize(217),
      width: getScaleSize(184),
      alignSelf: 'center',
    },
    btnRequestService: {
      marginTop: getScaleSize(40),
      paddingVertical: getScaleSize(18),
      paddingHorizontal: getScaleSize(20),
      backgroundColor: theme.primary,
      borderRadius: getScaleSize(12),
      alignItems: 'center',
      alignSelf: 'center',
    },
  });
