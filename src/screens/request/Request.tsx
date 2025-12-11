import React, { useContext, useEffect, useState } from 'react';
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
import { FONTS, IMAGES } from '../../assets';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT
import { getScaleSize, SHOW_TOAST, useString } from '../../constant';

//COMPONENT
import { Header, RequestItem, SearchComponent, Text } from '../../components';

//PACKAGES
import { useFocusEffect } from '@react-navigation/native';
import { SCREENS } from '..';
import { API } from '../../api';

export default function Request(props: any) {
  const STRING = useString();
  const { theme } = useContext<any>(ThemeContext);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [allRequests, setAllRequests] = useState([]);

  const data = [
    { id: '1', title: 'All' },
    { id: '2', title: 'Open Proposal' },
    { id: '3', title: 'Responses' },
    { id: '4', title: 'Validation' },
  ];

  useEffect(() => {
    getAllRequests();
  }, []);

  async function getAllRequests() {
    try {
      setLoading(true);
      const result = await API.Instance.get(API.API_ROUTES.allRequests + `?page=1&limit=5`);
      setLoading(false);
      console.log('result', result.status, result)
      if (result.status) {
        console.log('allRequests==', result?.data?.data)
        setAllRequests(result?.data?.data?.services ?? []);
      } else {
        SHOW_TOAST(result?.data?.message ?? '', 'error')
        console.log('error==>', result?.data?.message)
      }
    } catch (error: any) {
      setLoading(false);
      SHOW_TOAST(error?.message ?? '', 'error');
      console.log(error?.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles(theme).container}>
      <Header
        type='profile'
        screenName={STRING.Request} />
      <View style={{ marginTop: getScaleSize(16), marginHorizontal: getScaleSize(22) }}>
        <SearchComponent />
      </View>
      <View style={{ marginTop: getScaleSize(18) }}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          ListHeaderComponent={() => {
            return <View style={{ width: getScaleSize(22) }} />;
          }}
          ListFooterComponent={() => {
            return <View style={{ width: getScaleSize(22) }} />;
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
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
      </View>
      {allRequests?.length > 0 ?
        <ScrollView
          style={styles(theme).scrolledContainer}
          showsVerticalScrollIndicator={false}>
          {allRequests?.length > 0 && allRequests?.map((item: any) => {
            return (
              <RequestItem key={item?.id} 
              onPress={() => {
                props.navigation.navigate(SCREENS.RequestDetails.identifier, {
                  item: item
                })
              }} 
              item={item} />
            )
          })}
        </ScrollView>
        :
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
      }

    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.white },
    scrolledContainer: {
      // marginHorizontal: getScaleSize(22),
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
