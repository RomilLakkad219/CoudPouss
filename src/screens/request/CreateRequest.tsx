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
import { SCREENS } from '..';

const {width} = Dimensions.get('window');
const cellSize = (width - 30) / 7;

export default function CreateRequest(props: any) {
  const STRING = useString();
  const {theme} = useContext<any>(ThemeContext);

  const [selectedProgress, setSelectedProgress] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedCategoryItem, setSelectedCategoryItem] = useState<any>(null);
  const [description, setDescription] = useState('');
  const [valuation, setValuation] = useState('');

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

  function onNext() {
    if (selectedProgress === 1) {
      setSelectedProgress(2);
    } else if (selectedProgress === 2) {
      setSelectedProgress(3);
    } else if (selectedProgress === 3) {
      setSelectedProgress(4);
    } else if (selectedProgress === 4) {
      setSelectedProgress(5);
    } else if (selectedProgress == 5) {
      setSelectedProgress(6);
    } else if (selectedProgress == 6) {
      props.navigation.replace(SCREENS.Thankyou.identifier)
    }
  }

  function onBack() {
    if (selectedProgress === 1) {
      props.navigation.goBack();
    } else if (selectedProgress === 2) {
      setSelectedProgress(1);
    } else if (selectedProgress === 3) {
      setSelectedProgress(2);
    } else if (selectedProgress === 4) {
      setSelectedProgress(3);
    } else if (selectedProgress == 5) {
      setSelectedProgress(4);
    } else if (selectedProgress === 6) {
      setSelectedProgress(5);
    } else if (selectedProgress === 7) {
      setSelectedProgress(5);
    }
  }

  function renderView() {
    if (selectedProgress === 1) {
      return renderServiceProviderView();
    } else if (selectedProgress === 2) {
      return renderCategoryView();
    } else if (selectedProgress === 3) {
      return renderServiceView();
    } else if (selectedProgress === 4) {
      return renderDescriptionView();
    } else if (selectedProgress === 5) {
      return renderValuationOfJOB();
    } else if (selectedProgress === 6) {
      return renderPreview();
    }
  }

  function renderPreview() {
    return (
      <View style={styles(theme).serviceProviderCotainer}>
        <Text
          size={getScaleSize(24)}
          font={FONTS.Lato.Bold}
          color={theme.primary}>
          {STRING.Preview}
        </Text>
        <Text
          style={{marginTop: getScaleSize(12)}}
          size={getScaleSize(16)}
          font={FONTS.Lato.SemiBold}
          color={theme._939393}>
          {STRING.Preview_message}
        </Text>
        <Text
          style={{marginTop: getScaleSize(16)}}
          size={getScaleSize(24)}
          font={FONTS.Lato.Bold}
          color={theme.primary}>
          {'DIY Service'}
        </Text>
        <View style={styles(theme).categoryView}>
          <Image
            style={styles(theme).imageView}
            source={{uri: 'https://picsum.photos/id/1/200/300'}}
          />
          <Text
            style={{
              marginTop: getScaleSize(16),
              marginHorizontal: getScaleSize(12),
            }}
            size={getScaleSize(20)}
            font={FONTS.Lato.SemiBold}
            color={theme.primary}>
            {'Furniture Assembly'}
          </Text>
        </View>
        <Text
          style={{marginTop: getScaleSize(24)}}
          size={getScaleSize(18)}
          font={FONTS.Lato.SemiBold}
          color={theme._323232}>
          {STRING.JobDetails}
        </Text>
        <View style={styles(theme).detailsView}>
          <View style={styles(theme).itemView}>
            <Text
              size={getScaleSize(18)}
              font={FONTS.Lato.SemiBold}
              color={theme._989898}>
              {STRING.Valuation}
            </Text>
            <Text
              style={{marginTop: getScaleSize(6)}}
              size={getScaleSize(20)}
              font={FONTS.Lato.SemiBold}
              color={theme.primary}>
              {'€449.20'}
            </Text>
          </View>
          <View style={styles(theme).deviderView} />
          <View style={styles(theme).itemView}>
            <Text
              size={getScaleSize(18)}
              font={FONTS.Lato.SemiBold}
              color={theme._989898}>
              {STRING.JobDate}
            </Text>
            <Text
              style={{marginTop: getScaleSize(6)}}
              size={getScaleSize(20)}
              font={FONTS.Lato.SemiBold}
              color={theme.primary}>
              {'16 Aug'}
            </Text>
          </View>
          <View style={styles(theme).deviderView} />
          <View style={styles(theme).itemView}>
            <Text
              size={getScaleSize(18)}
              font={FONTS.Lato.SemiBold}
              color={theme._989898}>
              {STRING.JobTime}
            </Text>
            <Text
              style={{marginTop: getScaleSize(6)}}
              size={getScaleSize(20)}
              font={FONTS.Lato.SemiBold}
              color={theme.primary}>
              {'10:00 Am'}
            </Text>
          </View>
        </View>
        <Text
          style={{marginTop: getScaleSize(24)}}
          size={getScaleSize(18)}
          font={FONTS.Lato.SemiBold}
          color={theme._323232}>
          {STRING.Servicedescription}
        </Text>
        <View style={styles(theme).serviceDescriptionView}>
          <Text
            size={getScaleSize(18)}
            font={FONTS.Lato.Regular}
            color={theme._555555}>
            {
              'Transform your space with our expert furniture assembly services. Our skilled team will handle everything from unpacking to setup, ensuring your new pieces are perfectly assembled and ready for use. We specialize in a wide range of furniture types, including flat-pack items, complex modular systems, and custom installations. Enjoy a hassle-free experience as we take care of the details, allowing you to focus on enjoying your newly furnished area. Schedule your assembly today and let us help you create the perfect environment!'
            }
          </Text>
        </View>
        <Text
          style={{marginTop: getScaleSize(24)}}
          size={getScaleSize(18)}
          font={FONTS.Lato.SemiBold}
          color={theme._323232}>
          {STRING.Jobphotos}
        </Text>
        <FlatList
          data={['']}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={(item: any, index: number) => {
            return (
              <Image
                style={[
                  styles(theme).photosView,
                  
                ]}
                source={{uri: 'https://picsum.photos/id/1/200/300'}}
              />
            );
          }}
        />
        <View style={{height:16}}/>
      </View>
    );
  }

  function renderValuationOfJOB() {
    return (
      <View style={styles(theme).serviceProviderCotainer}>
        <Text
          size={getScaleSize(24)}
          font={FONTS.Lato.Bold}
          color={theme.primary}>
          {STRING.ValuationofJob}
        </Text>
        <Text
          style={{marginTop: getScaleSize(12)}}
          size={getScaleSize(16)}
          font={FONTS.Lato.SemiBold}
          color={theme._939393}>
          {STRING.valuation_message}
        </Text>
        <View style={styles(theme).textInputContainer}>
          <Input
            placeholder={STRING.EnterValuation}
            placeholderTextColor={theme._939393}
            inputTitle={STRING.EnterValuation}
            inputColor={theme._555555}
            value={`${'€'}${valuation}`}
            keyboardType="numeric"
            autoCapitalize="none"
            onChangeText={text => {
              const cleaned = text.replace(/[^0-9.]/g, '');
              const formatted = cleaned.replace(/^(\d*\.?\d{0,2}).*$/, '$1');
              setValuation(formatted);
            }}
          />
        </View>
        <Text
          style={{marginTop: getScaleSize(12)}}
          size={getScaleSize(16)}
          font={FONTS.Lato.SemiBold}
          color={theme._555555}>
          {STRING.ChooseDate}
        </Text>
        <CalendarComponent />
        <Text
          style={{marginTop: getScaleSize(12)}}
          size={getScaleSize(16)}
          font={FONTS.Lato.SemiBold}
          color={theme._555555}>
          {STRING.ChooseTime}
        </Text>
        <TimePicker />
        <View style={{height: 16}} />
      </View>
    );
  }

  function renderDescriptionView() {
    return (
      <View style={styles(theme).serviceProviderCotainer}>
        <Text
          size={getScaleSize(24)}
          font={FONTS.Lato.Bold}
          color={theme.primary}>
          {STRING.DescribeAboutService}
        </Text>
        <Text
          style={{marginTop: getScaleSize(12)}}
          size={getScaleSize(16)}
          font={FONTS.Lato.SemiBold}
          color={theme._939393}>
          {STRING.descriptionMessage}
        </Text>
        <Text
          style={{marginTop: getScaleSize(12)}}
          size={getScaleSize(17)}
          font={FONTS.Lato.Medium}
          color={theme._424242}>
          {STRING.EnterServicedescription}
        </Text>
        <View style={styles(theme).inputContainer}>
          <TextInput
            style={styles(theme).textInput}
            value={description}
            onChangeText={setDescription}
            placeholder={STRING.Enterdescriptionhere}
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={8}
            textAlignVertical="top"
            blurOnSubmit={true}
            returnKeyType="default"
          />
        </View>
        <Text
          style={{marginTop: getScaleSize(20)}}
          size={getScaleSize(17)}
          font={FONTS.Lato.Medium}
          color={theme._424242}>
          {STRING.UploadPhotosofaJob}
        </Text>
        <View style={styles(theme).imageUploadContent}>
          <TouchableOpacity
            style={[styles(theme).uploadButton, {marginRight: getScaleSize(9)}]}
            activeOpacity={1}
            onPress={() => {}}>
            <Image
              style={styles(theme).attachmentIcon}
              source={IMAGES.upload_attachment}
            />
            <Text
              style={{marginTop: getScaleSize(8)}}
              size={getScaleSize(15)}
              font={FONTS.Lato.Regular}
              color={theme._818285}>
              {STRING.upload_from_device}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles(theme).uploadButton, {marginLeft: getScaleSize(9)}]}
            activeOpacity={1}
            onPress={() => {}}>
            <Image
              style={styles(theme).attachmentIcon}
              source={IMAGES.upload_attachment}
            />
            <Text
              style={{marginTop: getScaleSize(8)}}
              size={getScaleSize(15)}
              font={FONTS.Lato.Regular}
              color={theme._818285}>
              {STRING.upload_from_device}
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{marginTop: getScaleSize(8)}}
          size={getScaleSize(18)}
          font={FONTS.Lato.SemiBold}
          color={theme._939393}>
          {STRING.upload_message}
        </Text>
      </View>
    );
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
        <View style={{marginTop: getScaleSize(8)}}>
          <CategoryDropdown
            onChange={item => {
              setSelectedCategoryItem(item);
            }}
            selectedItem={selectedCategoryItem}
            container={{}}
            data={CATEGORY_DATA}
          />
        </View>
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

  function renderServiceView() {
    return (
      <View style={styles(theme).serviceProviderCotainer}>
        <Text
          size={getScaleSize(24)}
          font={FONTS.Lato.Bold}
          color={theme.primary}>
          {STRING.SelectAService}
        </Text>
        <Text
          style={{marginTop: getScaleSize(12)}}
          size={getScaleSize(16)}
          font={FONTS.Lato.SemiBold}
          color={theme._939393}>
          {STRING.serviceMessage}
        </Text>
        <Text
          style={{marginTop: getScaleSize(12)}}
          size={getScaleSize(17)}
          font={FONTS.Lato.Medium}
          color={theme._555555}>
          {STRING.Choose_a_Service}
        </Text>
        <View style={{marginTop: getScaleSize(18)}}>
          <SearchComponent />
        </View>
        <FlatList
          data={servicesData}
          renderItem={({item, index}) => (
            <AssistanceItems item={item} index={index} />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => {
            return <View style={{height: 16}} />;
          }}
        />
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
            onBack();
          }}>
          <Text
            size={getScaleSize(19)}
            font={FONTS.Lato.Bold}
            color={theme.primary}
            style={{alignSelf: 'center'}}>
            {selectedProgress === 6 ? 'Edit' : STRING.Back}
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
            {selectedProgress === 6 ? 'Submit' : STRING.Next}
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
    listContainer: {
      marginTop: getScaleSize(16),
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: theme._D5D5D5,
      borderRadius: getScaleSize(12),
      marginTop: getScaleSize(12),
    },
    textInput: {
      fontSize: getScaleSize(18),
      color: theme._323232,
      padding: getScaleSize(16),
      minHeight: getScaleSize(240),
      textAlignVertical: 'top',
      fontFamily: FONTS.Lato.Regular,
    },
    imageUploadContent: {
      marginTop: getScaleSize(12),
      flexDirection: 'row',
    },
    uploadButton: {
      flex: 1.0,
      borderWidth: 1,
      borderColor: theme._818285,
      borderStyle: 'dashed',
      borderRadius: getScaleSize(8),
      justifyContent: 'center',
      alignItems: 'center',
      height: getScaleSize(160),
    },
    attachmentIcon: {
      height: getScaleSize(24),
      width: getScaleSize(24),
      alignSelf: 'center',
    },
    textInputContainer: {
      marginTop: getScaleSize(12),
    },
    calenderHeader: {
      marginTop: getScaleSize(12),
      paddingVertical: getScaleSize(8),
      paddingHorizontal: getScaleSize(12),
      borderRadius: getScaleSize(18),
      backgroundColor: '#FBFBFB',
      flexDirection: 'row',
    },
    nextImage: {
      height: getScaleSize(24),
      width: getScaleSize(24),
    },
    categoryView: {
      height: getScaleSize(228),
      backgroundColor: '#EAF0F3',
      borderRadius: getScaleSize(20),
      marginTop: getScaleSize(18),
    },
    imageView: {
      height: getScaleSize(172),
      borderRadius: getScaleSize(20),
    },
    detailsView: {
      paddingVertical: getScaleSize(21),
      flexDirection: 'row',
      borderRadius: getScaleSize(16),
      backgroundColor: '#FBFBFB',
      marginTop: getScaleSize(18),
    },
    itemView: {
      flex: 1.0,
      alignSelf: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
    deviderView: {
      width: 1,
      backgroundColor: '#D6D6D6',
    },
    serviceDescriptionView: {
      marginTop: getScaleSize(18),
      borderWidth: 1,
      borderColor: theme._D5D5D5,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 16,
    },
    photosView: {
      height: getScaleSize(144),
      width: getScaleSize(180),
      borderRadius: 8,
      resizeMode: 'cover',
      marginTop: getScaleSize(18),
    },
  });
