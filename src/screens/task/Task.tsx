import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';

//ASSETS
import { FONTS, IMAGES } from '../../assets';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT
import { getScaleSize, SHOW_TOAST, useString } from '../../constant';

//COMPONENT
import {
  TaskItem,
  Text,
} from '../../components';

//PACKAGES
import { SCREENS } from '..';
import { API } from '../../api';
import { useIsFocused } from '@react-navigation/native';

export default function Task(props: any) {

  const STRING = useString();
  const { theme } = useContext<any>(ThemeContext);

  const PAGE_SIZE = 10;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quateList, setQuateList] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  function getStatus() {
    if (selectedIndex === 0) {
      return 'send';
    } else if (selectedIndex === 1) {
      return 'accepted';
    } else if (selectedIndex === 2) {
      return 'complete';
    }
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getQuateList();
    }
  }, [selectedIndex, page, isFocused]);

  async function getQuateList() {
    try {
      setLoading(true);
      const result = await API.Instance.get(API.API_ROUTES.getQuateList + `?status=${getStatus()}&page=${page}&limit=${PAGE_SIZE}`);
      if (result.status) {
        const newData = result?.data?.data?.results ?? [];
        console.log('newData==>', newData)
        if (newData.length < PAGE_SIZE) {
          setHasMore(false);
          setQuateList((prev: any) => [...prev, ...newData]);
        } else {
          setQuateList((prev: any) => [...prev, ...newData]);
        }
      } else {
        SHOW_TOAST(result?.data?.message ?? '', 'error')
      }
    } catch (error: any) {
      SHOW_TOAST(error?.message ?? '', 'error');
    } finally {
      setLoading(false);
    }
  }

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage(page + 1);
      getQuateList();
    }
  };

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
            setPage(1);
            setQuateList([]);
          }}>
          <View style={[styles(theme).tabItemContainer, { borderBottomWidth: selectedIndex === 0 ? 2 : 0 }]}>
            <Text
              size={getScaleSize(14)}
              font={FONTS.Lato.Medium}
              color={selectedIndex === 0 ? theme._2C6587 : theme._595959}
              style={{}}>
              {'Quote Sent'}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(theme).tabItem}
          activeOpacity={1}
          onPress={() => {
            setSelectedIndex(1);
            setPage(1);
            setQuateList([]);
          }}>
          <View style={[styles(theme).tabItemContainer, { borderBottomWidth: selectedIndex === 1 ? 2 : 0 }]}>
            <Text
              size={getScaleSize(14)}
              font={FONTS.Lato.Medium}
              color={selectedIndex === 1 ? theme._2C6587 : theme._595959}
              style={{}}>
              {'Accepted'}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(theme).tabItem}
          activeOpacity={1}
          onPress={() => {
            setSelectedIndex(2);
            setPage(1);
            setQuateList([]);
          }}>
          <View style={[styles(theme).tabItemContainer, { borderBottomWidth: selectedIndex === 2 ? 2 : 0 }]}>
            <Text
              size={getScaleSize(14)}
              font={FONTS.Lato.Medium}
              color={selectedIndex === 2 ? theme._2C6587 : theme._595959}
              style={{}}>
              {'Completed'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: getScaleSize(20) }} />
      ) : (
        quateList.length > 0 ? (
          <FlatList
            data={quateList}
            contentContainerStyle={{ paddingBottom: getScaleSize(50), marginHorizontal: getScaleSize(22) }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: any, index: number) => index.toString()}
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              isLoading ? <ActivityIndicator size="large" color={theme.primary} style={{ margin: 20 }} /> : null
            }
            renderItem={({ item, index }) => {
              return (
                <TaskItem
                  key={index}
                  item={item}
                  onPressItem={() => {
                    props.navigation.navigate(SCREENS.ProfessionalTaskDetails.identifier, {
                      item: item
                    });
                  }}
                  onPressStatus={() => {
                    props.navigation.navigate(SCREENS.TaskStatus.identifier);
                  }}
                  onPressChat={() => {
                    props.navigation.navigate(SCREENS.ChatDetails.identifier);
                  }}
                />
              );
            }}
          />
        ) : (
          <View style={styles(theme).emptyView}>
            <Image style={styles(theme).emptyImage} source={IMAGES.empty} />
            <Text
              size={getScaleSize(16)}
              font={FONTS.Lato.SemiBold}
              align="center"
              color={theme._939393}
              style={{
                marginTop: getScaleSize(20),
              }}>
              {STRING.you_have_not_sent_any_quote_please_sent_a_quotes_to_the_service_request}
            </Text>
          </View>
        )
      )}
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.white },
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
      borderBottomColor: '#EAF0F3',
      borderBottomWidth: 1,
    },
    tabItem: {
      flex: 1.0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabItemContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: theme._2C6587,
      paddingBottom: getScaleSize(14),
    },
    emptyView: {
      flex: 1.0,
      alignSelf: 'center',
      justifyContent: 'center',
      marginTop: getScaleSize(26),
    },
    emptyImage: {
      height: getScaleSize(217),
      width: getScaleSize(184),
      alignSelf: 'center',
    },
  });
