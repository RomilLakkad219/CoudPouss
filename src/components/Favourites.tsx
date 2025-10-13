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

function Favourites(props: any) {
  const STRING = useString();
  const {theme} = useContext(ThemeContext);

  return (
    <View style={styles(theme).container}>
      <Image style={styles(theme).userImage} source={IMAGES.user_placeholder} />
      <Image style={styles(theme).likeImage} source={IMAGES.like} />
      <Text
        size={getScaleSize(18)}
        font={FONTS.Lato.SemiBold}
        color={theme._323232}>
        {'Wade Warren'}
      </Text>
       <Text
        size={getScaleSize(17)}
        font={FONTS.Lato.Medium}
        color={theme._6D6D6D}>
        {'4.2'}
      </Text>
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: getScaleSize(14),
      paddingVertical: getScaleSize(8),
      borderRadius: getScaleSize(18),
      borderWidth: 1,
      borderColor: theme._DFE8ED,
      marginLeft: getScaleSize(16),
      width: getScaleSize(183),
    },
    userImage: {
      height: getScaleSize(92),
      width: getScaleSize(92),
      borderRadius: getScaleSize(46),
      alignSelf: 'center',
    },
    likeImage: {
      position: 'absolute',
      height: getScaleSize(20),
      width: getScaleSize(20),
      right: getScaleSize(14),
      top: getScaleSize(16),
    },
  });

export default Favourites;
