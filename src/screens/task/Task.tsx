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
  Animated,
} from 'react-native';

//ASSETS
import {FONTS, IMAGES} from '../../assets';

//CONTEXT
import {ThemeContext, ThemeContextType} from '../../context';

//CONSTANT
import {getScaleSize, useString} from '../../constant';

//COMPONENT
import {
  Header,
  RequestItem,
  SearchComponent,
  ServiceRequest,
  TaskItem,
  Text,
} from '../../components';

//PACKAGES
import {useFocusEffect} from '@react-navigation/native';
import {SCREENS} from '..';

export default function Task(props: any) {
  const STRING = useString();
  const {theme} = useContext<any>(ThemeContext);

  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Quote Sent', 'Accepted', 'Completed'];
  const translateX = new Animated.Value(activeTab * 120);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    Animated.spring(translateX, {
      toValue: index * 120,
      useNativeDriver: true,
    }).start();
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor(theme.white);
      StatusBar.setBarStyle('dark-content');
    }, []),
  );

  function getType() {
    if (selectedIndex === 0) {
      return 'quate_sent';
    } else if (selectedIndex === 1) {
      return 'quate_accepted';
    }
    else if (selectedIndex === 2) {
      return 'quate_completed';
    }
  }

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
          marginTop: getScaleSize(14),
          marginHorizontal: getScaleSize(22),
        }}>
        {'Task Management'}
      </Text>
      <View style={styles(theme).tabContainer}>
        <TouchableOpacity
          style={styles(theme).tabItem}
          activeOpacity={1}
          onPress={() => {
            setSelectedIndex(0);
          }}>
          <Text
            size={getScaleSize(18)}
            font={FONTS.Lato.Medium}
            color={selectedIndex === 0 ? theme._2C6587 : theme._595959}
            style={{}}>
            {'Quote Sent'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(theme).tabItem}
          activeOpacity={1}
          onPress={() => {
            setSelectedIndex(1);
          }}>
          <Text
            size={getScaleSize(18)}
            font={FONTS.Lato.Medium}
            color={selectedIndex === 1 ? theme._2C6587 : theme._595959}
            style={{}}>
            {'Accepted'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(theme).tabItem}
          activeOpacity={1}
          onPress={() => {
            setSelectedIndex(2);
          }}>
          <Text
            size={getScaleSize(18)}
            font={FONTS.Lato.Medium}
            color={selectedIndex === 2 ? theme._2C6587 : theme._595959}
            style={{}}>
            {'Completed'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles(theme).bottomStrip}></View> */}
      <View style={styles(theme).deviderView}></View>
      <View style={{marginHorizontal: getScaleSize(22)}}>
        {['', ''].map((item: any, index: number) => {
          return (
            <TaskItem
              key={index}
              onPressItem={() => {
                props.navigation.navigate(
                  SCREENS.ProfessionalTaskDetails.identifier,
                );
              }}
              type={getType()}
              onPressStatus={() => {
                props.navigation.navigate(SCREENS.TaskStatus.identifier);
              }}
              onPressChat={() => {
                props.navigation.navigate(SCREENS.ChatDetails.identifier);
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: theme.white},
    tabView: {
      marginTop: getScaleSize(24),
      flex: 1.0,
      flexDirection: 'row',
      marginHorizontal: getScaleSize(22),
    },
    itemView: {
      flex: 1.0,
      alignSelf: 'center',
    },
    tabContainer: {
      marginTop: getScaleSize(25),
      flexDirection: 'row',
    },
    tabItem: {
      flex: 1.0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deviderView: {
      height: 1,
      backgroundColor: '#EAF0F3',
      marginTop: getScaleSize(24),
    },
    bottomStrip: {
      height: getScaleSize(3),
      backgroundColor: theme._2C6587,
      width: 80,
      position: 'absolute',
      top: 85,
      alignSelf: 'center',
    },
  });
