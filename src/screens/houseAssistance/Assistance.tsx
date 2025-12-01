import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  
} from 'react-native';

//ASSETS
import { FONTS } from '../../assets';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT
import { getScaleSize, SHOW_TOAST, useString } from '../../constant';

//COMPONENT
import {
  Header,
  SearchComponent,
  Text,
} from '../../components';

//API
import { API } from '../../api';

const { width } = Dimensions.get('window');
const cellSize = (width - 30) / 7;

export default function Assistance(props: any) {

  const service = props.route.params?.service;
  const STRING = useString();
  const { theme } = useContext<any>(ThemeContext);

  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [bannerData, setBannerData] = useState<any>(null);

  useEffect(() => {
    getCategoryData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      getSubCategoryData(selectedCategory?.id);
    }
  }, [selectedCategory]);

  async function getCategoryData() {
    try {
      setLoading(true);
      const result = await API.Instance.get(API.API_ROUTES.getHomeData + `?service_name=${service?.name}`);
      setLoading(false);
      console.log('result', result.status, result)
      if (result.status) {
        console.log('categoryList==', result?.data?.data)
        setCategoryList(result?.data?.data?.categories ?? []);
        if (result?.data?.data?.categories?.[0]?.id) {
          setSelectedCategory(result?.data?.data?.categories?.[0]);
          getSubCategoryData(result?.data?.data?.categories?.[0]?.id);
        }
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

  async function getSubCategoryData(id: string) {
    try {
      setLoading(true);
      const result = await API.Instance.get(API.API_ROUTES.getHomeData + `/${id}`);
      setLoading(false);
      console.log('result', result.status, result)
      if (result.status) {
        console.log('subcategoryList==', result?.data?.data)
        setBannerData(result?.data?.data?.Banner ?? null);
        setSubCategoryList(result?.data?.data?.subcategories ?? []);
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

  const patterns = ['small', 'large', 'large', 'small'];

  return (
    <View style={styles(theme).container}>
      <Header
        onBack={() => {
          props.navigation.goBack();
        }}
        screenName={selectedCategory ? selectedCategory?.name : service?.name}
      />
      <View
        style={{
          marginTop: getScaleSize(16),
          marginHorizontal: getScaleSize(24),
        }}>
        <SearchComponent />
      </View>
      <View style={styles(theme).deviderView}></View>
      {bannerData ? (
        <Image
          style={styles(theme).bannerContainer}
          source={{ uri: bannerData?.image }}
        />
      ):(
        <View style={styles(theme).bannerContainer} />
      )}
      {categoryList.length > 1 && (
        <View style={{ marginBottom: getScaleSize(40), marginTop: getScaleSize(20) }}>
          <FlatList
            data={categoryList}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item: any, index: number) => index.toString()}
            ListHeaderComponent={() => {
              return <View style={{ width: getScaleSize(22) }} />;
            }}
            ListFooterComponent={() => {
              return <View style={{ width: getScaleSize(16) }} />;
            }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={[
                    styles(theme).itemContainer,
                    {
                      marginLeft: index === 0 ? 0 : 8,
                      backgroundColor:
                        selectedCategory?.id === item?.id
                          ? theme.primary
                          : theme.white,
                    },
                  ]}
                  activeOpacity={1}
                  onPress={() => {
                    setSelectedCategory(item);
                  }}>
                  <Image
                    style={styles(theme).categoryImage}
                    source={{ uri: item?.image }}
                  />
                  <Text
                    style={{
                      marginLeft: getScaleSize(14),
                      alignSelf: 'center',
                    }}
                    size={getScaleSize(16)}
                    font={FONTS.Lato.Regular}
                    color={
                      selectedCategory?.id === item?.id
                        ? theme.white
                        : theme._999999
                    }>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      <FlatList
        data={subCategoryList}
        numColumns={2}
        contentContainerStyle={{ marginTop: getScaleSize(-20) }}
        keyExtractor={(item: any, index: number) => index.toString()}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ paddingLeft: getScaleSize(8) }}
        ListFooterComponent={() => {
          return <View style={{ height: getScaleSize(50) }} />;
        }}
        renderItem={({ item, index }) => {
          const type = patterns[index % 4];
          return (
            <View
              style={[
                styles(theme).cardContainer,
                {
                  height: type === 'small' ? getScaleSize(188) : getScaleSize(233),
                  marginTop: type === 'large' && index % 2 == 0 ? getScaleSize(-25) : getScaleSize(20),
                }
              ]}>
              <Image
                style={styles(theme).imageView}
                resizeMode='cover'
                source={{ uri: 'https://picsum.photos/id/1/200/300' }}
              />

              <Text
                style={{
                  marginVertical: getScaleSize(14),
                  marginHorizontal: getScaleSize(14),
                }}
                size={getScaleSize(16)}
                font={FONTS.Lato.Bold}
                color={theme.primary}>
                {item?.title}
              </Text>
            </View>
          )
        }}
      />
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.white },
    deviderView: {
      marginTop: getScaleSize(30),
      height: getScaleSize(6),
      backgroundColor: '#F8F8F8',
    },
    bannerContainer: {
      height: getScaleSize(182),
      borderRadius: getScaleSize(20),
      marginVertical: getScaleSize(20),
      marginHorizontal: getScaleSize(24),
      backgroundColor: theme._EAF0F3,
    },
    itemContainer: {
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
    cardContainer: {
      borderRadius: getScaleSize(20),
      backgroundColor: theme._EAF0F3,
      width: (Dimensions.get('window').width - getScaleSize(64)) / 2,
      marginLeft: getScaleSize(16),
    },
    imageView: {
      flex: 1.0,
      borderRadius: getScaleSize(20),
    }
  });
