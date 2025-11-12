import React, {useContext} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {ThemeContext, ThemeContextType} from '../context';
import {getScaleSize} from '../constant';
import {FONTS, IMAGES} from '../assets';

const StatusItem = (props: any) => {
  const {theme} = useContext<any>(ThemeContext);

  function getImage() {
    if (props?.item?.serviceRunning) {
      return IMAGES.service_running;
    } else {
      if (props?.item?.completed) {
        return IMAGES.status_green;
      } else {
        return IMAGES.empty_view;
      }
    }
  }

  return (
    <View style={[styles(theme).statusItem, {}]}>
      {/* Timeline line */}
      <View style={styles(theme).timelineContainer}>
        {/* <View
          style={[
            styles(theme).timelineDot,
            props?.item?.completed ? styles(theme).completedDot : styles(theme).pendingDot,
          ]}>
          {props?.item?.completed && <View style={styles(theme).innerDot} />}
        </View> */}
        <Image
          style={{
            height: getScaleSize(24),
            width: getScaleSize(24),
            resizeMode: 'contain',
          }}
          source={getImage()}
        />
        {!props?.isLast && (
          <View
            style={[
              styles(theme).timelineLine,
              {
                backgroundColor: props?.item?.completed ? '#2E7D32' : '#424242',
              },
            ]}
          />
        )}
      </View>

      {/* Content */}
      <View style={styles(theme).content}>
        <Text
          style={[
            styles(theme).title,
            props?.item?.completed
              ? styles(theme).completedTitle
              : styles(theme).pendingTitle,
          ]}>
          {props?.item?.title}
        </Text>
        <Text style={styles(theme).date}>{props?.item?.date}</Text>
        {props?.item?.serviceRunning && (
          <>
            <Text style={[styles(theme).date, {marginTop: getScaleSize(8)}]}>
              {
                'Please keep this security code safe — it will be required to confirm completion and release payment.'
              }
            </Text>
            <View style={styles(theme).informationView}>
              <Text
                style={[
                  styles(theme).date,
                  {
                    fontFamily: FONTS.Lato.Medium,
                    fontSize: 16,
                    color: '#2C6587',
                  },
                ]}>
                {'Security Code'}
              </Text>
              <Text
                style={[
                  styles(theme).date,
                  {
                    fontFamily: FONTS.Lato.Bold,
                    fontSize: 24,
                    color: '#2C6587',
                    marginTop: getScaleSize(2),
                    textAlign: 'center',
                    alignSelf: 'center',
                  },
                ]}>
                {'7    9    6'}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 24,
      textAlign: 'center',
    },
    scrollView: {
      flex: 1,
    },
    timeline: {
      paddingLeft: 8,
    },
    statusItem: {
      flexDirection: 'row',
      marginBottom: 24,
    },
    timelineContainer: {
      alignItems: 'center',
      marginRight: 16,
      width: 24,
    },
    timelineDot: {
      width: 20,
      height: 20,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    completedDot: {
      backgroundColor: '#4CAF50',
      borderWidth: 3,
      borderColor: '#E8F5E8',
    },
    pendingDot: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#E0E0E0',
    },
    innerDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#fff',
    },
    timelineLine: {
      width: 2,
      flex: 1,
      marginTop: 0,
      marginBottom: -24,
    },
    content: {
      flex: 1,
      paddingBottom: 8,
    },
    title: {
      fontSize: getScaleSize(16),
      fontFamily: FONTS.Lato.SemiBold,
      marginBottom: 4,
      color: '#2B2B2B',
    },
    completedTitle: {
      fontFamily: FONTS.Lato.SemiBold,
      marginBottom: 4,
      color: '#2B2B2B',
      fontSize: 16,
      marginTop: -5,
    },
    pendingTitle: {
      fontFamily: FONTS.Lato.SemiBold,
      marginBottom: 4,
      color: '#2B2B2B',
      fontSize: 16,
      marginTop: -5,
    },
    date: {
      fontSize: 12,
      color: '#737373',
      fontFamily: FONTS.Lato.Regular,
    },
    informationView: {
      marginTop: getScaleSize(12),
      borderWidth: 1,
      borderColor: '#D5D5D5',
      borderRadius: getScaleSize(16),
      paddingHorizontal: getScaleSize(12),
      paddingVertical: getScaleSize(12),
    },
  });

export default StatusItem;
