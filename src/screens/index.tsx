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
import ChatDetails from './chat/ChatDetails';
import Thankyou from './request/Thankyou';
import RequestDetails from './request/RequestDetails';
import OtherUserProfile from './profile/OtherUserProfile';
import ServiceConfirmed from './request/ServiceConfirmed';
import Notification from './notification/Notification';
import TaskDetails from './task/TaskDetails';
import WriteReview from './review/WriteReview';
import TaskStatus from './task/TaskStatus';
import Assistance from './houseAssistance/Assistance';
import Transport from './houseAssistance/Transport';
import ServicePreview from './service/ServicePreview';
import AddQuote from './service/AddQuote';
import Success from './service/Success';
import ProfessionalTaskDetails from './task/ProfessionalTaskDetails';
import ProfessionalTaskStatus from './task/ProfessionalTaskStatus';

//BOTTOMBAR
import Home from './home/Home';
import Request from './request/Request';
import Chat from './chat/Chat';
import Profile from './profile/Profile';
import ProfessionalHome from './home/ProfessionalHome';
import Task from './task/Task';

//PROFILE
import MyProfile from './profile/MyProfile';
import RatingsReviews from './profile/RatingsReviews';
import Transactions from './profile/Transactions';
import Notifications from './profile/Notifications';

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
  MyProfile: {
    identifier: 'MyProfile',
    component: MyProfile,
  },
  RatingsReviews: {
    identifier: 'RatingsReviews',
    component: RatingsReviews,
  },
  Transactions: {
    identifier: 'Transactions',
    component: Transactions,
  },
  Notifications: {
    identifier: 'Notifications',
    component: Notifications,
  },
  ChatDetails: {
    identifier: 'ChatDetails',
    component: ChatDetails,
  },
  Thankyou: {
    identifier: 'Thankyou',
    component: Thankyou,
  },
  RequestDetails: {
    identifier: 'RequestDetails',
    component: RequestDetails,
  },
  OtherUserProfile: {
    identifier: 'OtherUserProfile',
    component: OtherUserProfile,
  },
  ServiceConfirmed: {
    identifier: 'ServiceConfirmed',
    component: ServiceConfirmed,
  },
  Notification: {
    identifier: 'Notification',
    component: Notification,
  },
  TaskDetails: {
    identifier: 'TaskDetails',
    component: TaskDetails,
  },
  WriteReview: {
    identifier: 'WriteReview',
    component: WriteReview,
  },
  TaskStatus: {
    identifier: 'TaskStatus',
    component: TaskStatus,
  },
  Assistance: {
    identifier: 'Assistance',
    component: Assistance,
  },
  Transport: {
    identifier: 'Transport',
    component: Transport,
  },
  ServicePreview: {
    identifier: 'ServicePreview',
    component: ServicePreview,
  },
  AddQuote: {
    identifier: 'AddQuote',
    component: AddQuote,
  },
  Success: {
    identifier: 'Success',
    component: Success,
  },
  ProfessionalTaskDetails: {
    identifier: 'ProfessionalTaskDetails',
    component: ProfessionalTaskDetails,
  },
  ProfessionalTaskStatus: {
    identifier: 'ProfessionalTaskStatus',
    component: ProfessionalTaskStatus,
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
  CreateRequest: {
    identifier: 'CreateRequest',
    component: CreateRequest,
  },
  Chat: {
    identifier: 'Chat',
    component: Chat,
  },
  Profile: {
    identifier: 'Profile',
    component: Profile,
  },
  ProfessionalHome: {
    identifier: 'ProfessionalHome',
    component: ProfessionalHome,
  },
  Task: {
    identifier: 'Task',
    component: Task,
  },
};
