import React, { useContext, useEffect, useRef } from 'react';

//COMPONENTS
import { Tabbar } from '../components';

//PACKAGES
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//PACKAGES
import { TABS } from '.';
import { AuthContext } from '../context';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

function BottomBar() {
  const { userType } = useContext<any>(AuthContext);

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
          initialRouteName={TABS.Home.identifier}
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
            name={'plus'}
            component={() => <View />}
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
