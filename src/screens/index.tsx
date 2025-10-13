import Splash from './Splash';
import Login from './auth/Login';
import BottomBar from './Bottombar';
import CreateRequest from './request/CreateRequest';

//BOTTOMBAR
import Home from './home/Home';
import Request from './request/Request';
import Chat from './chat/Chat';
import Profile from './profile/Profile';

export const SCREENS = {
  Splash: {
    identifier: 'Splash',
    component: Splash,
  },
  Login: {
    identifier: 'Login',
    component: Login,
  },
  BottomBar: {
    identifier: 'BottomBar',
    component: BottomBar,
  },
  CreateRequest: {
    identifier: 'CreateRequest',
    component: CreateRequest,
  },
};

export const TABS = {
  Home: {
    identifier: 'Home',
    component: Home,
  },
  Request: {
    identifier: 'Request',
    component: Request,
  },
  Chat: {
    identifier: 'Chat',
    component: Chat,
  },
  Profile: {
    identifier: 'Profile',
    component: Profile,
  },
};
