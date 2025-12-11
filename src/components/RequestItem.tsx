import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';

//CONTEXT
import {ThemeContext, ThemeContextType} from '../context';

//CONSTANTS & ASSETS
import {getScaleSize, useString} from '../constant';
import {FONTS, IMAGES} from '../assets';

//COMPONENTS
import Text from './Text';
import moment from 'moment';

function RequestItem(props: any) {
  const STRING = useString();
  const {theme} = useContext(ThemeContext);

  const { item } = props;

  return (
    <TouchableOpacity style={styles(theme).container} onPress={()=>{
      props.onPress()
    }}>
      <View style={styles(theme).horizontalContainer}>
        <Image
          source={IMAGES.service_icon}
          style={styles(theme).imageIcon}
          resizeMode="contain"
        />
        <Text
          style={{marginLeft: getScaleSize(16), alignSelf: 'center'}}
          size={getScaleSize(24)}
          font={FONTS.Lato.Bold}
          color={theme.primary}>
          {`${item?.category_name} Service`}
        </Text>
      </View>
      <Text
        style={{marginTop: getScaleSize(12)}}
        size={getScaleSize(20)}
        font={FONTS.Lato.SemiBold}
        color={theme.primary}>
        {item?.sub_category_name}
      </Text>
      <View style={styles(theme).detailsView}>
        <View style={styles(theme).horizontalContainer}>
          <Text
            style={{flex: 1.0}}
            size={getScaleSize(18)}
            font={FONTS.Lato.SemiBold}
            color={theme._989898}>
            {STRING.Valuation}
          </Text>
           <Text
            size={getScaleSize(20)}
            font={FONTS.Lato.SemiBold}
            color={theme.primary}>
            {`€${item?.amount}`}
          </Text>
        </View>
        <View style={[styles(theme).horizontalContainer, {marginTop: getScaleSize(3)}]}>
          <Text
            style={{flex: 1.0}}
            size={getScaleSize(18)}
            font={FONTS.Lato.SemiBold}
            color={theme._989898}>
            {STRING.JobDate}
          </Text>
           <Text
            size={getScaleSize(20)}
            font={FONTS.Lato.SemiBold}
            color={theme.primary}>
            {moment(item?.chossen_time).format('DD MMM')}
          </Text>
        </View>
        <View style={[styles(theme).horizontalContainer, {marginTop: getScaleSize(3)}]}>
          <Text
            style={{flex: 1.0}}
            size={getScaleSize(18)}
            font={FONTS.Lato.SemiBold}
            color={theme._989898}>
            {STRING.JobTime}
          </Text>
           <Text
            size={getScaleSize(20)}
            font={FONTS.Lato.SemiBold}
            color={theme.primary}>
            {moment(item?.chossen_time).format('hh:mm A')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      marginHorizontal: getScaleSize(24),
      marginTop: getScaleSize(18),
      borderRadius: getScaleSize(16),
      backgroundColor: theme._EAF0F3,
      paddingHorizontal: getScaleSize(16),
      paddingVertical: getScaleSize(16),
    },
    horizontalContainer: {
      flexDirection: 'row',
    },
    imageIcon: {
      width: getScaleSize(48),
      height: getScaleSize(44),
    },
    detailsView: {
      backgroundColor: theme.white,
      borderRadius: getScaleSize(12),
      paddingVertical: getScaleSize(16),
      paddingHorizontal: getScaleSize(16),
      marginTop: getScaleSize(16),
    },
  });

export default RequestItem;
