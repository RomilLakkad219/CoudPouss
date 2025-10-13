import {useTranslation} from 'react-i18next';

export const useString = () => {
  return {
    welcome_back: 'Welcome Back!',
    enter_your_email_and_password_to_login:
      'Enter your email and password to login',
    email_or_mobile_number: 'Email/ Mobile No',
    enter_email_or_mobile_number: 'Enter Email/ Mobile No',
    password: 'Password',
    enter_password: 'Enter Password',
    forgot_password: 'Forgot Password?',
    login: 'Login',
    dont_have_an_account: "Don't have an account? ",
    sign_up: 'Sign Up',
    please_enter_your_email: 'Please enter your email',
    please_enter_your_password: 'Please enter your password',
    please_enter_your_name: 'Please enter your name',
    please_enter_your_mobile_number: 'Please enter your mobile number',
    create_account: 'Create Account',
    already_have_an_account: 'Already have an account? ',
    reset_password: 'Reset Password',
    welcome_to_coudpouss: 'Welcome to CoudPouss',
    Search: 'Search ',
    Valuation: 'Valuation',
    JobDate: 'Job Date',
    JobTime: 'Job Time ',
    Home: 'Home',
    Request: 'Request',
    Chat: 'Chat',
    Profile: 'Profile',
    explore_all_service: 'Explore All Services',
    Youhavenotcreatedanyrequest:
      'You have not created any request, please\ncreate a request',
    Requestaservice: 'Request a service',
    Back: 'Back',
    Next: 'Next',
    select_your_service_provider: 'Select Your Service Provider',
    service_provider_message:
      'To get started, please select a category. This will ensure we match you with the most suitable professional for your requirements.',
    Professional: 'Professional',
    Nonprofessional: 'Non-professional',
    SelectACategory  : 'Select A Category ',
    category_message:'Please pick a category to begin. This will help us connect you with the right professional for your needs.',
    Selectacategory : 'Select a category'

  };
};

export function getTranslation(str: string) {
  const {t} = useTranslation();
  return t(str);
}
