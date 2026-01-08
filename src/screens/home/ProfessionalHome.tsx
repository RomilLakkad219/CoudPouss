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
  SafeAreaView,
} from 'react-native';

//ASSETS
import { FONTS, IMAGES } from '../../assets';

//API
import { API } from '../../api';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANT
import { getScaleSize, SHOW_TOAST, useString } from '../../constant';

//COMPONENT
import {
  Header,
  ProgressView,
  RequestItem,
  SearchComponent,
  ServiceRequest,
  TaskItem,
  Text,
} from '../../components';

//PACKAGES
import { useFocusEffect } from '@react-navigation/native';

//SCREENS
import { SCREENS } from '..';

export default function ProfessionalHome(props: any) {

  const STRING = useString();

  const { theme } = useContext<any>(ThemeContext);

  const { profile } = useContext(AuthContext)

  console.log('profile==', profile)

  const [isLoading, setLoading] = useState(false);
  const [serviceList, setServiceList] = useState([])

  useEffect(() => {
    getAllServices()
  }, [])

  async function getAllServices() {
    try {
      const page = 1;
      const limit = 2;
      setLoading(true);
      const result: any = await API.Instance.get(`${API.API_ROUTES.getProfessionalAllServices}?page=${page}&limit=${limit}`);
      if (result?.status) {
        setServiceList(result.data.data ?? [])
      }
      else {
        SHOW_TOAST(result?.data?.message, 'error')
      }
    }
    catch (error: any) {
      SHOW_TOAST(error?.message ?? '', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles(theme).container}>
      <StatusBar
        translucent={true}
        backgroundColor={theme.white}
        barStyle={'dark-content'} />
      <View style={styles(theme).headerContainer}>
        <View style={styles(theme).verticalView}>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.Medium}
            color={theme._6D6D6D}
            style={{}}>
            {`Hello! ${profile?.user?.first_name + " " + profile?.user?.last_name}`}
          </Text>
          <Text
            size={getScaleSize(24)}
            font={FONTS.Lato.Bold}
            color={theme._2C6587}
            style={{}}>
            {'Welcome to CoudPouss'}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles(theme).notifiationIcon,
            { marginRight: getScaleSize(8) },
          ]}
          activeOpacity={1}
          onPress={() => {
            props.navigation.navigate(SCREENS.Notification.identifier);
          }}>
          <Image
            style={styles(theme).notifiationIcon}
            source={IMAGES.notification_professional}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(theme).profilePic}
          activeOpacity={1}
          onPress={() => {
            props.navigation.navigate(SCREENS.MyProfileProfessional.identifier)
          }}>
          {profile?.user?.profile_photo_url ?
            <Image
              style={styles(theme).profilePic}
              source={{ uri: profile?.user?.profile_photo_url }}
            />
            :
            <Image
              style={styles(theme).profilePic}
              source={IMAGES.user_placeholder}
            />
          }
        </TouchableOpacity>
      </View>
      <View style={styles(theme).searchView}>
        <SearchComponent />
      </View>
      <ScrollView
        style={styles(theme).scrolledContainer}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles(theme).bannerView}
          source={IMAGES.homeBanner}
        />
        <View style={[styles(theme).directionView,{marginBottom: getScaleSize(24)}]}>
          <Text
            size={getScaleSize(20)}
            font={FONTS.Lato.SemiBold}
            color={theme._323232}
            style={{
              marginTop: getScaleSize(28),
            }}>
            {STRING.ExploreServiceRequests}
          </Text>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity onPress={() => {
            props.navigation.navigate(SCREENS.ExploreServiceRequest.identifier)
          }}>
            <Text
              size={getScaleSize(14)}
              font={FONTS.Lato.Medium}
              align='center'
              color={theme._2C6587}
              style={{
                marginTop: getScaleSize(28),
              }}>
              {STRING.ViewAll}
            </Text>
          </TouchableOpacity>
        </View>
        {serviceList?.map((item, index) => (
          <ServiceRequest
            key={index}
            data={item}
            onPress={() => {
              props.navigation.navigate(SCREENS.ServicePreview.identifier, { 
                serviceData: item,
                isFromHome: true,
              });
            }}
            onPressAccept={() => {
              props.navigation.navigate(SCREENS.AddQuote.identifier, {
                isItem: item,
                isFromHome: true,
              });
            }}
          />
        ))}
        <View style={styles(theme).horizontalContainer}>
          <Text
            size={getScaleSize(20)}
            font={FONTS.Lato.SemiBold}
            color={theme._323232}
            style={{
              flex: 1.0,
            }}>
            {STRING.RecentTasks}
          </Text>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.Regular}
            onPress={() => { }}
            style={{ alignSelf: 'center' }}
            color={theme._999999}>
            {STRING.ViewAll}
          </Text>
        </View>
        {['', ''].map(item => {
          return (
            <TaskItem
              onPressItem={() => {
                props.navigation.navigate(SCREENS.ProfessionalTaskDetails.identifier);
              }}
              onPressStatus={() => {
                props.navigation.navigate(SCREENS.TaskStatus.identifier);
              }}
              onPressChat={() => {
                props.navigation.navigate(SCREENS.ChatDetails.identifier);
              }}
            />
          );
        })}
      </ScrollView>
      {isLoading && <ProgressView />}
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.white },
    headerContainer: {
      flexDirection: 'row',
      marginHorizontal: getScaleSize(22),
      marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + getScaleSize(10) : getScaleSize(20),
    },
    verticalView: {
      alignSelf: 'center',
      flexDirection: 'column',
      flex: 1.0,
    },
    notifiationIcon: {
      height: getScaleSize(24),
      width: getScaleSize(24),
      alignSelf: 'center',
    },
    profilePic: {
      height: getScaleSize(34),
      width: getScaleSize(34),
      borderRadius: getScaleSize(17),
      alignSelf: 'center',
    },
    searchView: {
      marginTop: getScaleSize(23),
      marginHorizontal: getScaleSize(22),
    },
    scrolledContainer: {
      marginTop: getScaleSize(28),
      marginHorizontal: getScaleSize(22),
    },
    bannerView: {
      borderRadius: getScaleSize(25),
      height: getScaleSize(150),
      alignSelf: 'center',
      width: '100%',
    },
    horizontalContainer: {
      marginTop: getScaleSize(3),
      flexDirection: 'row',
    },
    directionView: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  });
