import Splash from './Splash';
import Login from './auth/Login';
import BottomBar from './Bottombar';
import CreateRequest from './request/CreateRequest';
import ResetPassword from './auth/ResetPassword';
import Otp from './auth/Otp';
import NewPassword from './auth/NewPassword';
import SignupSelect from './auth/SignupSelect';
import Signup from './auth/Signup';
import CreatePassword from './auth/CreatePassword';
import AddPersonalDetails from './auth/AddPersonalDetails';
import ChooseYourSubscription from './subscription/ChooseYourSubscription';
import SelectedPlanDetails from './subscription/SelectedPlanDetails';
import PaymentMethod from './subscription/PaymentMethod';
import SubscriptionSuccessful from './subscription/SubscriptionSuccessful';
import AdditionalDetails from './subscription/AdditionalDetails';
import YearsOfExperience from './subscription/YearsOfExperience';
import AddServices from './subscription/AddServices';
import AddBankDetails from './subscription/AddBankDetails';
import ReviewServices from './subscription/ReviewServices';
import AccountCreatedSuccessfully from './subscription/AccountCreatedSuccessfully';

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
  ResetPassword: {
    identifier: 'ResetPassword',
    component: ResetPassword,
  },
  Otp: {
    identifier: 'Otp',
    component: Otp,
  },
  NewPassword: {
    identifier: 'NewPassword',
    component: NewPassword,
  },
  SignupSelect: {
    identifier: 'SignupSelect',
    component: SignupSelect,
  },
  Signup: {
    identifier: 'Signup',
    component: Signup,
  },
  CreatePassword: {
    identifier: 'CreatePassword',
    component: CreatePassword,
  },
  AddPersonalDetails: {
    identifier: 'AddPersonalDetails',
    component: AddPersonalDetails,
  },
  ChooseYourSubscription: {
    identifier: 'ChooseYourSubscription',
    component: ChooseYourSubscription,
  },
  SelectedPlanDetails: {
    identifier: 'SelectedPlanDetails',
    component: SelectedPlanDetails,
  },
  PaymentMethod: {
    identifier: 'PaymentMethod',
    component: PaymentMethod,
  },
  SubscriptionSuccessful: {
    identifier: 'SubscriptionSuccessful',
    component: SubscriptionSuccessful,
  },
  AdditionalDetails: {
    identifier: 'AdditionalDetails',
    component: AdditionalDetails,
  },
  YearsOfExperience: {
    identifier: 'YearsOfExperience',
    component: YearsOfExperience,
  },
  AddServices: {
    identifier: 'AddServices',
    component: AddServices,
  },
  AddBankDetails: {
    identifier: 'AddBankDetails',
    component: AddBankDetails,
  },
  ReviewServices: {
    identifier: 'ReviewServices',
    component: ReviewServices,
  },
  AccountCreatedSuccessfully: {
    identifier: 'AccountCreatedSuccessfully',
    component: AccountCreatedSuccessfully,
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
