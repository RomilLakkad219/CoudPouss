import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  FlexAlignType,
  TouchableOpacity,
  Modal,
} from 'react-native';

//API
import { API } from '../../api';

//ASSETS
import { FONTS, IMAGES } from '../../assets';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANT
import { getScaleSize, SHOW_TOAST, useString } from '../../constant';

//COMPONENT
import {
  Header,
  ProgressView,
  ServiceRequest,
  TaskItem,
  Text,
} from '../../components';

//SCREENS
import { SCREENS } from '..';

export default function ExploreServiceRequest(props: any) {

  const STRING = useString();

  const { theme } = useContext<any>(ThemeContext);

  const { profile } = useContext(AuthContext)

  const [isLoading, setLoading] = useState(false);
  const [serviceList, setServiceList] = useState([]);
  const [filterModal, setFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('Filters');
  const [filterPosition, setFilterPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    getAllServices()
  }, [])

  const getCreatedTimeText = (date: string, time: string) => {
    const createdDateTime = new Date(`${date}T${time}:00`);
    const now = new Date();

    const diffMs = now.getTime() - createdDateTime.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffHours < 24) return `${diffHours} hrs ago`;
    if (diffDays === 1) return 'Yesterday';

    return `${diffDays} days ago`;
  };

  async function getAllServices() {
    try {

      setLoading(true)
      const result: any = await API.Instance.get(API.API_ROUTES.getProfessionalAllServices)
      setLoading(false)

      console.log('GET PROFESSIONAL SERVICES', JSON.stringify(result))

      if (result?.status) {
        const updatedList = result.data.data.map((item: any) => ({
          ...item,
          createdTimeText: getCreatedTimeText(item.date, item.time),
        }));
        setServiceList(updatedList)
        console.log(JSON.stringify(updatedList))
      }
      else {
        SHOW_TOAST(result?.data?.message, 'error')
      }
    }
    catch (error: any) {
      setLoading(false);
      SHOW_TOAST(error?.message ?? '', 'error');
    }
  }

  return (
    <View style={styles(theme).container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.white}
        translucent={false}
      />
      <Header
        onBack={() => {
          props.navigation.goBack();
        }}
        screenName={STRING.explore_all_service}
      />
      <View style={styles(theme).searchView}>
        <View style={styles(theme).searchBox}>
          <TextInput
            style={styles(theme).searchInput}
            placeholderTextColor={theme._555555}
            placeholder={STRING.what_are_you_looking_for}
            value={props.value}
            onChangeText={(text) => props.onChangeText(text)}
          />
          <Image
            style={styles(theme).searchImage}
            source={IMAGES.search_icon}
          />
        </View>
        <TouchableOpacity
          style={styles(theme).filterContainer}
          onLayout={(event) => {
            const { y, height } = event.nativeEvent.layout;
            setFilterPosition({
              top: y + height + getScaleSize(80),
              right: getScaleSize(22),
            });
          }}
          onPress={() => setFilterModal(true)}>
          <Text
            size={getScaleSize(14)}
            font={FONTS.Lato.Medium}
            color={theme._555555}>
            {selectedFilter}
          </Text>
          <Image
            style={styles(theme).arrowImage}
            source={IMAGES.arrow_left}
          />
        </TouchableOpacity>
        <Modal visible={filterModal} transparent animationType="fade">
          <TouchableOpacity
            style={styles(theme).modalOverlay}
            activeOpacity={1}
            onPress={() => setFilterModal(false)}
          >
            <View
              style={[
                styles(theme).dropdownModalBox,
                {
                  position: 'absolute',
                  top: filterPosition.top,
                  right: filterPosition.right,
                },
              ]}
            >
              {["Category", "Location"].map((type, index,arr) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles(theme).dropdownItem,
                    index === arr.length - 1 && { borderBottomWidth: 0 }
                  ]}
                  onPress={() => {
                    setSelectedFilter(type);
                    setFilterModal(false);
                  }}
                >
                  <Text
                    size={getScaleSize(13)}
                    font={FONTS.Lato.Medium}
                    color={theme._555555}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

      </View>
      <ScrollView
        style={styles(theme).scrolledContainer}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles(theme).bannerView}
          source={{ uri: 'https://picsum.photos/id/1/200/300' }}
        />
        {serviceList?.map((item, index) => (
          <ServiceRequest
            key={index}
            data={item}
            onPress={() => {
              props.navigation.navigate(SCREENS.ServicePreview.identifier, { serviceData: item });
            }}
            onPressView={() => {
              props.navigation.navigate(SCREENS.ServicePreview.identifier, { serviceData: item });
            }}
            onPressAccept={() => {
              props.navigation.navigate(SCREENS.AddQuote.identifier, {
                isItem: item,
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
      marginTop: getScaleSize(27),
      flexDirection: 'row',
    },
    directionView: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    searchView: {
      flexDirection: 'row',
      marginHorizontal: getScaleSize(22),
      marginTop: getScaleSize(16)
    },
    searchBox: {
      flexDirection: 'row',
      flex: 1.0,
      alignItems: 'center' as FlexAlignType,
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: '#BECFDA',
      borderRadius: getScaleSize(12),
      paddingHorizontal: getScaleSize(16),
      // paddingVertical: getScaleSize(4),
      height: getScaleSize(53),
    },
    searchImage: {
      height: getScaleSize(32),
      width: getScaleSize(32),
      alignSelf: 'center' as FlexAlignType,
    },
    imgMicroPhone: {
      height: getScaleSize(56),
      width: getScaleSize(56),
      alignSelf: 'center' as FlexAlignType,
      marginLeft: getScaleSize(16),
    },
    searchInput: {
      fontFamily: FONTS.Lato.Regular,
      fontSize: getScaleSize(18),
      color: theme.black,
      marginLeft: getScaleSize(12),
      flex: 1
    },
    filterContainer: {
      backgroundColor: theme.white,
      borderRadius: getScaleSize(12),
      paddingHorizontal: getScaleSize(16),
      marginLeft: getScaleSize(16),
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#BECFDA',
      height: getScaleSize(53),
      flexDirection: 'row',
      alignItems: 'center',
    },
    arrowImage: {
      height: getScaleSize(24),
      width: getScaleSize(24),
      alignSelf: 'center',
      marginLeft: getScaleSize(4)
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "transparent",
    },
    dropdownModalBox: {
      width: getScaleSize(160),
      backgroundColor: "#fff",
      borderRadius: getScaleSize(12),
      paddingVertical: getScaleSize(6),
      elevation: 8,
    },
    dropdownItem: {
      paddingVertical: getScaleSize(14),
      paddingHorizontal: getScaleSize(16),
      borderBottomWidth: 1,
      borderBottomColor: "#E5E5E5",
      backgroundColor: theme.white
    },
  });

