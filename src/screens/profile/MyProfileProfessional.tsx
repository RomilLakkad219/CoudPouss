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
  RatingsReviewsItem,
  RattingControler,
  RequestItem,
  SearchComponent,
  Text,
} from '../../components';

//PACKAGES
import {useFocusEffect} from '@react-navigation/native';
import {SCREENS} from '..';

export default function MyProfileProfessional(props: any) {
  const STRING = useString();
  const {theme} = useContext<any>(ThemeContext);

  const [showMore, setShowMore] = useState(false);
  const [showMoreExperience, setShowMoreExperience] = useState(false);

  return (
    <View style={styles(theme).container}>
      <Header
        icon={IMAGES.ic_edit}
        onPress={() => {
          props.navigation.navigate(SCREENS.EditProfile.identifier);
        }}
        onBack={() => {
          props.navigation.goBack();
        }}
        screenName={STRING.my_profile}
      />
      <ScrollView
        style={styles(theme).scrolledContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles(theme).informationContainer}>
          <Image
            style={styles(theme).profilePic}
            source={IMAGES.user_placeholder}
          />
          <Text
            size={getScaleSize(22)}
            font={FONTS.Lato.SemiBold}
            color={theme._2B2B2B}
            style={{alignSelf: 'center'}}>
            {'Bessie Cooper'}
          </Text>
          <View style={styles(theme).horizontalContainer}>
            <View style={styles(theme).itemContainer}>
              <View>
                <Text
                  size={getScaleSize(16)}
                  font={FONTS.Lato.Bold}
                  color={'#1D7885'}
                  style={{alignSelf: 'center'}}>
                  {'4.6'}
                </Text>
                <Text
                  size={getScaleSize(12)}
                  font={FONTS.Lato.Medium}
                  color={'#214C65'}
                  style={{alignSelf: 'center', marginTop: getScaleSize(4)}}>
                  {STRING.Overallrating}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles(theme).itemContainer,
                {marginHorizontal: getScaleSize(16)},
              ]}>
              <View>
                {/* <Text
                  size={getScaleSize(16)}
                  font={FONTS.Lato.Bold}
                  color={'#1D7885'}
                  style={{alignSelf: 'center'}}>
                  {'4.6'}
                </Text> */}
                <Image
                  style={{
                    height: getScaleSize(24),
                    width: getScaleSize(24),
                    alignSelf: 'center',
                  }}
                  source={IMAGES.verify}
                />
                <Text
                  size={getScaleSize(12)}
                  font={FONTS.Lato.Medium}
                  color={'#214C65'}
                  style={{alignSelf: 'center', marginTop: getScaleSize(4)}}>
                  {STRING.Certified}
                </Text>
              </View>
            </View>
            <View style={styles(theme).itemContainer}>
              <View>
                <Text
                  size={getScaleSize(16)}
                  font={FONTS.Lato.Bold}
                  color={'#1D7885'}
                  style={{alignSelf: 'center'}}>
                  {'4.6'}
                </Text>
                <Text
                  size={getScaleSize(12)}
                  font={FONTS.Lato.Medium}
                  color={'#214C65'}
                  style={{alignSelf: 'center', marginTop: getScaleSize(4)}}>
                  {STRING.Clients}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles(theme).informationContainer}>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.Medium}
            color={'#2C6587'}>
            {STRING.about_me}
          </Text>
          <Text
            size={getScaleSize(14)}
            font={FONTS.Lato.Medium}
            style={{marginTop: getScaleSize(8)}}
            color={theme._323232}>
            {
              'With a passion for home improvement, I have dedicated over 8 years to perfecting my craft. My expertise spans from intricate plumbing tasks to seamless TV installations. I pride myself on delivering quality service with a personal touch, ensuring every client feels valued and satisfied.'
            }
          </Text>
        </View>
        <View style={styles(theme).informationContainer}>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.Medium}
            color={'#2C6587'}>
            {STRING.ExperienceSpecialities}
          </Text>
          <Text
            size={getScaleSize(14)}
            font={FONTS.Lato.Medium}
            numberOfLines={showMoreExperience ? undefined : 3}
            style={{marginTop: getScaleSize(8)}}
            color={theme._323232}>
            {
              'Hi, I’m Bessie — with over 6 years of experience in expert TV mounting and reliable plumbing solutions. I specialize in mounting TVs, shelves, mirrors with precision and care Mounting Expert You Can Trust Over 6 of experience in securely mounting TVs, shelves, mirrors, artwork, and more Reliable & On-Time I value your time and ready to get the job done right the first time Clean Work, Solid Results Every project is done with attention to detail, safety, and durability Respect for Your Space I treat your home like it’s my own. Friendly, professional, and focused on delivering quality you’ll love. Client Satisfaction First I’m proud of my 5-star service and happy clients '
            }
          </Text>
          <TouchableOpacity style={{marginTop: getScaleSize(8)}}
           onPress={() => setShowMoreExperience(!showMoreExperience)}>
            <Text
              size={getScaleSize(16)}
              font={FONTS.Lato.Medium}
              color={'#2C6587'}>
              {showMoreExperience ? STRING.show_less : STRING.read_more}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles(theme).informationContainer}>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.Medium}
            color={'#2C6587'}>
            {STRING.Achievements}
          </Text>
          <Text
            size={getScaleSize(14)}
            font={FONTS.Lato.Medium}
            style={{marginTop: getScaleSize(8)}}
            color={theme._323232}>
            {
              'Bessie Cooper has successfully completed over 150 projects, showcasing her expertise in TV mounting and plumbing. Her dedication to quality and customer satisfaction has earned her numerous accolades, including the "Best Service Provider" award in 2022. Clients consistently praise her attention to detail and professionalism, making her a top choice for home improvement services.'
            }
          </Text>
        </View>
        <View style={styles(theme).informationContainer}>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.Medium}
            color={'#2C6587'}>
            {STRING.Photosofpastwork}
          </Text>
          <FlatList
            data={['']}
            horizontal
            keyExtractor={(item: any, index: number) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <Image
                  style={[styles(theme).photosView]}
                  source={{uri: 'https://picsum.photos/id/1/200/300'}}
                />
              );
            }}
          />
        </View>
        <View style={styles(theme).informationContainer}>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.Medium}
            color={'#2C6587'}>
            {STRING.CustomerRatings}
          </Text>
          <View
            style={[
              styles(theme).horizontalContainer,
              {marginTop: getScaleSize(20)},
            ]}>
            <Text
              size={getScaleSize(24)}
              font={FONTS.Lato.SemiBold}
              color={theme._323232}>
              {'4.6'}
            </Text>
            <View
              style={{
                marginLeft: getScaleSize(16),
                alignSelf: 'center',
              }}>
              <View style={styles(theme).rowView}>
                {[...Array(5)].map((_, i) => (
                  <Image
                    source={IMAGES.star}
                    style={styles(theme).ratingimage}
                  />
                ))}
              </View>
              <Text
                size={getScaleSize(12)}
                style={{marginTop: getScaleSize(3)}}
                font={FONTS.Lato.Medium}
                color={theme._323232}>
                {'Based on 471 ratings'}
              </Text>
            </View>
          </View>
          <View style={{marginTop: getScaleSize(15)}}>
            <RattingControler
              title={'Work quality'}
              value={'4.6'}
              fillCount={4.6}
              totalCount={5}
            />
          </View>
          <View style={{marginTop: getScaleSize(15)}}>
            <RattingControler
              title={'Reliability'}
              value={'4.6'}
              fillCount={4.6}
              totalCount={5}
            />
          </View>
          <View style={{marginTop: getScaleSize(15)}}>
            <RattingControler
              title={'Punctunality'}
              value={'4.6'}
              fillCount={4.6}
              totalCount={5}
            />
          </View>
          <View style={{marginTop: getScaleSize(15)}}>
            <RattingControler
              title={'Soluction'}
              value={'4.6'}
              fillCount={4.6}
              totalCount={5}
            />
          </View>
          <View style={{marginTop: getScaleSize(15)}}>
            <RattingControler
              title={'Payout'}
              value={'4.6'}
              fillCount={3}
              totalCount={5}
            />
          </View>
        </View>
        <View style={styles(theme).informationContainer}>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.Medium}
            color={'#2C6587'}>
            {STRING.RecentWorksReviews}
          </Text>
          {['', ''].map((item: any, index: number) => {
            return (
                <RatingsReviewsItem
                itemContainer={{ marginTop: index === 0 ? getScaleSize(20) : getScaleSize(16) }}
                onPressShowMore={() => {
                    setShowMore(!showMore);
                }}
                showMore={showMore}
                />
            );
          })}
        </View>
        <View style={{height:getScaleSize(32)}}/>
      </ScrollView>      
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: theme.white},
    scrolledContainer: {
      marginHorizontal: getScaleSize(24),
    },
    informationContainer: {
      marginTop: getScaleSize(20),
      borderWidth: 1,
      borderColor: '#D5D5D5',
      borderRadius: getScaleSize(16),
      paddingHorizontal: getScaleSize(24),
      paddingVertical: getScaleSize(24),
    },
    profilePic: {
      height: getScaleSize(130),
      width: getScaleSize(130),
      borderRadius: getScaleSize(65),
      alignSelf: 'center',
    },
    horizontalContainer: {
      flexDirection: 'row',
    },
    itemContainer: {
      flex: 1.0,
      paddingVertical: getScaleSize(12),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#D5D5D5',
      borderRadius: getScaleSize(6),
      marginTop: getScaleSize(20),
    },
    photosView: {
      height: getScaleSize(144),
      width: getScaleSize(180),
      borderRadius: 8,
      resizeMode: 'cover',
      marginTop: getScaleSize(18),
    },
    ratingimage: {
      resizeMode: 'contain',
      width: getScaleSize(20),
      height: getScaleSize(20),
      marginLeft: getScaleSize(2),
    },
    rowView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
