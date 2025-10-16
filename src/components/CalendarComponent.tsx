import React, {useContext, useState} from 'react';
import {
  View,
  // Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {FONTS, IMAGES} from '../assets';
import {getScaleSize, useString} from '../constant';
import {ThemeContext, ThemeContextType} from '../context';
import Text from './Text';

const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const STRING = useString();
  const {theme} = useContext<any>(ThemeContext);

  // Generate calendar data for given month
  const generateCalendar = date => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const weeks = [];
    let currentWeek = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);

      // Start new week when we reach Sunday or end of month
      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    }

    // Add remaining empty cells for last week
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const navigateMonth = direction => {
    const newDate = new Date(currentDate);
    if (direction === 'next') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const isToday = day => {
    const today = new Date();
    return (
      day !== null &&
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const calendarData = generateCalendar(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const monthYear = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <View style={styles(theme).container}>
      {/* Header with navigation */}
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateMonth('prev')} style={styles.navButton}>
          <Text style={styles.navButtonText}>‹</Text>
        </TouchableOpacity>
        
        <Text style={styles.monthYear}>{monthYear}</Text>
        
        <TouchableOpacity onPress={() => navigateMonth('next')} style={styles.navButton}>
          <Text style={styles.navButtonText}>›</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles(theme).calenderHeader}>
        <TouchableOpacity
          style={styles(theme).nextImage}
          activeOpacity={1}
          onPress={() => {
            navigateMonth('prev');
          }}>
          <Image style={styles(theme).nextImage} source={IMAGES.backword} />
        </TouchableOpacity>
        <Text
          style={{alignSelf: 'center', flex: 1.0, textAlign: 'center'}}
          size={getScaleSize(14)}
          align="center"
          font={FONTS.Lato.Medium}
          color={theme.primary}>
          {monthYear}
        </Text>
        <TouchableOpacity
          style={styles(theme).nextImage}
          activeOpacity={1}
          onPress={() => {
            navigateMonth('next');
          }}>
          <Image style={styles(theme).nextImage} source={IMAGES.foreword} />
        </TouchableOpacity>
      </View>

      <View style={styles(theme).newCalenderContainer}>
        {/* Week Days Header */}
        <View style={styles(theme).weekDaysContainer}>
          {weekDays.map((day, index) => (
            <Text
              size={getScaleSize(14)}
              align="center"
              font={FONTS.Lato.Medium}
              color={theme.primary}>
              {day}
            </Text>
            // <Text key={index} style={styles(theme).weekDayText}>
            //   {day}
            // </Text>
          ))}
        </View>

        {/* Calendar Grid */}
        <ScrollView style={styles(theme).calendarContainer}>
          {calendarData.map((week, weekIndex) => (
            <View key={weekIndex} style={styles(theme).weekRow}>
              {week.map((day, dayIndex) => (
                <View key={dayIndex} style={styles(theme).dayCell}>
                  {day ? (
                    <View
                      style={[
                        styles(theme).dayContainer,
                        isToday(day) && styles(theme).todayContainer,
                      ]}>
                      <Text
                        size={getScaleSize(14)}
                        align="center"
                        font={FONTS.Lato.Medium}
                        color={theme._323232}>
                        {day}
                      </Text>                      
                    </View>
                  ) : (
                    <Text
                        size={getScaleSize(14)}
                        align="center"
                        font={FONTS.Lato.Medium}
                        color={theme._323232}>
                        {day}
                      </Text>
                    // <Text style={styles(theme).emptyDay}></Text>
                  )}
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    monthYear: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
    },
    navButton: {
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    navButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    weekDaysContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
      paddingBottom: 10,
    },
    weekDayText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#666',
      width: 40,
      textAlign: 'center',
    },
    calendarContainer: {
      flex: 1,
    },
    weekRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 8,
    },
    dayCell: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 2,
    },
    dayContainer: {
      width: 36,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 18,
    },
    todayContainer: {
      backgroundColor: theme.primary,
    },
    dayText: {
      fontSize: 16,
      color: '#333',
    },
    todayText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    emptyDay: {
      width: 36,
      height: 36,
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
    newCalenderContainer: {
      marginTop: getScaleSize(18),
      paddingVertical: getScaleSize(16),
      // paddingHorizontal: getScaleSize(16),
      borderRadius: getScaleSize(18),
      backgroundColor: '#FBFBFB',
    },
  });

export default CalendarComponent;
