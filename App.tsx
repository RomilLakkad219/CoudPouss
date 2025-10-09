import React, { ReactElement, useContext, useEffect, useRef } from 'react';
import { LogBox, Platform, StatusBar, StyleSheet, View } from 'react-native';

//CONTEXT
import { ThemeProvider, AuthProvider, ThemeContext } from './src/context'

//CONSTANT & ASSETS
import { getScaleSize } from './src/constant';
import { FONTS } from './src/assets';
import { ThemeName } from './src/context/ThemeProvider';

//SCREENS
import { SCREENS } from './src/screens';



//PACKAGES
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import _ from 'lodash'
import KeyboardManager from 'react-native-keyboard-manager';
import Toast, { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';

// const toastRef = useRef<Toast>(null);

LogBox.ignoreAllLogs(true);

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: '#FFFFFF', borderLeftColor: '#FF5959' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1NumberOfLines={3}
      text1Style={{
        fontSize: getScaleSize(12),
        color: '#000000',
        fontFamily: FONTS.Lato.Regular,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ backgroundColor: '#FFFFFF', borderLeftColor: '#FF5959' }}
      text1NumberOfLines={3}
      text1Style={{
        fontSize: getScaleSize(12),
        color: '#000000',
        fontFamily: FONTS.Lato.Regular,
      }}
    />
  ),
  info: (props: any) => (
    <InfoToast
      style={{ backgroundColor: '#FFFFFF', borderLeftColor: '#FF5959' }}
      {...props}
      text1NumberOfLines={3}
      text1Style={{
        fontSize: getScaleSize(12),
        color: '#000000',
        fontFamily: FONTS.Lato.Regular,
      }}
    />
  ),
};

const { Navigator, Screen } = createStackNavigator();

function App(): any {

  useEffect(() => {
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(true);
    }
  }, [])

  function AppWrraper(): ReactElement {
    const { currentTheme } = useContext(ThemeContext);

    return (
      <View style={styles.container}>
        <StatusBar barStyle={currentTheme === ThemeName.Light ? "dark-content" : "light-content"} />
        <NavigationContainer>
          <Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: false
            }}
            initialRouteName={SCREENS.Splash.identifier}
          >
            {_.toArray(SCREENS).map((item: any, index: number) => {
              return item.component ? (
                <Screen
                  key={item.identifier}
                  name={item.identifier}
                  component={item.component}
                />
              ) : null;
            })}
          </Navigator>
        </NavigationContainer>
        <Toast config={toastConfig}  />
      </View>
    )
  }

  return (
    <View style={{ flex: 1.0, }}>
      <ThemeProvider>
          <AuthProvider>
            {AppWrraper()}
          </AuthProvider>
      </ThemeProvider>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: 'Transparent',
  }
});

export default App;
