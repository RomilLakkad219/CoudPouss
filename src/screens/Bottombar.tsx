import React, {useContext, useEffect, useRef} from 'react';

//COMPONENTS
import {Tabbar} from '../components';

//PACKAGES
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//PACKAGES
import {TABS} from '.';
import {AuthContext} from '../context';
import {PermissionsAndroid, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

const Tab = createBottomTabNavigator();

function BottomBar(props: any) {
  const {userType} = useContext<any>(AuthContext);

  useEffect(() => {
    // Configure the notification service
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token: any) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification: any) {
        console.log('NOTIFICATION:', notification);
        notification.finish();
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err: any) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - false: it will not be called on iOS when the app is opened from a notification
       */
      requestPermissions: Platform.OS === 'ios',
    });
  }, []);

  async function requestPermission() {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  }
  const isProfile = props?.route?.params?.isProfile ?? false;
  function getInitialRouteName() {
    if (isProfile) {
      return TABS.Profile.identifier;
    } else {
      return TABS.Home.identifier;
    }
  }
  useEffect(() => {
    (async () => {
      await requestPermission();

      // Get FCM token
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
    })();
  }, []);

  if (userType === 'service_provider') {
    return (
      <>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={TABS.ProfessionalHome.identifier}
          tabBar={props => {
            return <Tabbar {...props} />;
          }}>
          <Tab.Screen
            name={TABS.ProfessionalHome.identifier}
            component={TABS.ProfessionalHome.component}
          />
          <Tab.Screen
            name={TABS.Task.identifier}
            component={TABS.Task.component}
          />
          <Tab.Screen
            name={TABS.Chat.identifier}
            component={TABS.Chat.component}
          />
          <Tab.Screen
            name={TABS.Profile.identifier}
            component={TABS.Profile.component}
          />
        </Tab.Navigator>
      </>
    );
  } else {
    return (
      <>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={getInitialRouteName()}
          tabBar={props => {
            return <Tabbar {...props} />;
          }}>
          <Tab.Screen
            name={TABS.Home.identifier}
            component={TABS.Home.component}
          />
          <Tab.Screen
            name={TABS.Request.identifier}
            component={TABS.Request.component}
          />
          <Tab.Screen
            name={TABS.CreateRequest.identifier}
            component={TABS.CreateRequest.component}
          />
          <Tab.Screen
            name={TABS.Chat.identifier}
            component={TABS.Chat.component}
          />
          <Tab.Screen
            name={TABS.Profile.identifier}
            component={TABS.Profile.component}
          />
        </Tab.Navigator>
      </>
    );
  }
}

export default BottomBar;
