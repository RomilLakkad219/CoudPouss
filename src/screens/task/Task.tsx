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
      <View style={{marginHorizontal: getScaleSize(22)}}>
        {['', ''].map(item => {
          return (
            <TaskItem
              onPressItem={() => {
                props.navigation.navigate(SCREENS.ProfessionalTaskDetails.identifier);
              }}
              type={'quate_sent'}
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
  });
