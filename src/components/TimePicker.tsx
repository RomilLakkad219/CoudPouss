import React, {useContext, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert, Image} from 'react-native';
import {ThemeContext, ThemeContextType} from '../context';
import {getScaleSize} from '../constant';
import {FONTS, IMAGES} from '../assets';
import Text from './Text';

const TimePicker = () => {
  const {theme} = useContext<any>(ThemeContext);

  const [selectedHour, setSelectedHour] = useState(10);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [isAM, setIsAM] = useState(true);

  // Handle hour increment
  const incrementHour = () => {
    setSelectedHour(prev => {
      const newHour = prev === 12 ? 1 : prev + 1;
      return newHour;
    });
  };

  // Handle hour decrement
  const decrementHour = () => {
    setSelectedHour(prev => {
      const newHour = prev === 1 ? 12 : prev - 1;
      return newHour;
    });
  };

  // Handle minute increment
  const incrementMinute = () => {
    setSelectedMinute(prev => {
      const newMinute = prev === 59 ? 0 : prev + 1;
      return newMinute;
    });
  };

  // Handle minute decrement
  const decrementMinute = () => {
    setSelectedMinute(prev => {
      const newMinute = prev === 0 ? 59 : prev - 1;
      return newMinute;
    });
  };

  // Toggle AM/PM
  const toggleAmPm = () => {
    setIsAM(prev => !prev);
  };

  // Handle time confirmation
  const confirmTime = () => {
    Alert.alert(
      'Time Selected',
      `You selected: ${selectedHour}:${selectedMinute
        .toString()
        .padStart(2, '0')} ${isAM ? 'AM' : 'PM'}`,
      [{text: 'OK'}],
    );
  };

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).timeSelection}>
        <View style={styles(theme).verticalView}>
          <TouchableOpacity
            style={styles(theme).backwardIcon}
            onPress={incrementHour}>
            <Image
              style={styles(theme).backwardIcon}
              source={IMAGES.upward_time}
            />
          </TouchableOpacity>
          <Text
            style={{marginVertical: getScaleSize(20)}}
            size={getScaleSize(24)}
            align="center"
            font={FONTS.Lato.Bold}
            color={theme.primary}>
            {selectedHour}
          </Text>
          <TouchableOpacity
            style={styles(theme).backwardIcon}
            onPress={incrementHour}>
            <Image
              style={styles(theme).backwardIcon}
              source={IMAGES.backward_time}
            />
          </TouchableOpacity>
        </View>
        <Image style={styles(theme).dotIcon} source={IMAGES.dot_icon}/>
         <View style={styles(theme).verticalView}>
          <TouchableOpacity
            style={styles(theme).backwardIcon}
            onPress={incrementMinute}>
            <Image
              style={styles(theme).backwardIcon}
              source={IMAGES.upward_time}
            />
          </TouchableOpacity>
          <Text
            style={{marginVertical: getScaleSize(20)}}
            size={getScaleSize(24)}
            align="center"
            font={FONTS.Lato.Bold}
            color={theme.primary}>
             {selectedMinute.toString().padStart(2, '0')}
          </Text>
          <TouchableOpacity
            style={styles(theme).backwardIcon}
            onPress={decrementMinute}>
            <Image
              style={styles(theme).backwardIcon}
              source={IMAGES.backward_time}
            />
          </TouchableOpacity>
        </View>
        <Text
            style={{alignSelf:'center', marginHorizontal:getScaleSize(52)}}
            size={getScaleSize(24)}
            font={FONTS.Lato.Bold}
            color={theme.primary}>
             {'AM'}
          </Text>
           <Text
            style={{alignSelf:'center'}}
            size={getScaleSize(24)}
            font={FONTS.Lato.Bold}
            color={theme._D5D5D5}>
             {'PM'}
          </Text>
      </View>
      {/* <View style={styles.timeSelector}>        
        <View style={styles.timeSection}>
          <TouchableOpacity 
            style={styles.arrowButton} 
            onPress={incrementHour}
          >
            <Text style={styles.arrowText}>▲</Text>
          </TouchableOpacity>
          
          <View style={styles.timeDisplay}>
            <Text style={styles.timeNumber}>
              {selectedHour}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.arrowButton} 
            onPress={decrementHour}
          >
            <Text style={styles.arrowText}>▼</Text>
          </TouchableOpacity>
          
          <Text style={styles.timeLabel}>HOURS</Text>
        </View>

        <Text style={styles.separator}>:</Text>

        <View style={styles.timeSection}>
          <TouchableOpacity 
            style={styles.arrowButton} 
            onPress={incrementMinute}
          >
            <Text style={styles.arrowText}>▲</Text>
          </TouchableOpacity>
          
          <View style={styles.timeDisplay}>
            <Text style={styles.timeNumber}>
              {selectedMinute.toString().padStart(2, '0')}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.arrowButton} 
            onPress={decrementMinute}
          >
            <Text style={styles.arrowText}>▼</Text>
          </TouchableOpacity>
          
          <Text style={styles.timeLabel}>MINUTES</Text>
        </View>

        <View style={styles.ampmSection}>
          <TouchableOpacity 
            style={styles.arrowButton} 
            onPress={toggleAmPm}
          >
            <Text style={styles.arrowText}>▲</Text>
          </TouchableOpacity>
          
          <View style={styles.ampmDisplay}>
            <Text style={[
              styles.ampmText,
              isAM && styles.activeAmPm
            ]}>
              AM
            </Text>
            <Text style={[
              styles.ampmText,
              !isAM && styles.activeAmPm
            ]}>
              PM
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.arrowButton} 
            onPress={toggleAmPm}
          >
            <Text style={styles.arrowText}>▼</Text>
          </TouchableOpacity>
          
          <Text style={styles.timeLabel}>AM/PM</Text>
        </View>
      </View> */}

      {/* <View style={styles.selectedTimeContainer}>
        <Text style={styles.selectedTimeText}>
          {selectedHour}:{selectedMinute.toString().padStart(2, '0')} {isAM ? 'AM' : 'PM'}
        </Text>
      </View> */}

      {/* <TouchableOpacity style={styles.confirmButton} onPress={confirmTime}>
        <Text style={styles.confirmButtonText}>CONFIRM TIME</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      marginTop: getScaleSize(18),
      paddingVertical: getScaleSize(16),
      paddingHorizontal: getScaleSize(43),
      borderRadius: getScaleSize(18),
      backgroundColor: '#FBFBFB',
      alignItems:'center'
    },
    timeSelection: {
      flexDirection: 'row',
    },
    verticalView: {
      flexDirection: 'column',
    },
    backwardIcon: {
      height: 20,
      width: 20,
      alignSelf: 'center',
    },
    dotIcon:{
      width:7,
      height:27,
      alignSelf:'center',
      resizeMode:'contain',
      marginHorizontal:getScaleSize(42)
    }
  });

export default TimePicker;
