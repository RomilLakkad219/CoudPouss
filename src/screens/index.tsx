import Splash from "./Splash";
import Login from "./auth/Login";
import ResetPassword from "./auth/ResetPassword";
import Otp from "./auth/Otp";
import NewPassword from "./auth/NewPassword";
import SignupSelect from "./auth/SignupSelect";
import Signup from "./auth/Signup";
import CreatePassword from "./auth/CreatePassword";
import AddPersonalDetails from "./auth/AddPersonalDetails";

export const SCREENS = {
    Splash: {
        identifier: 'Splash',
        component: Splash
    },
    Login: {
        identifier: 'Login',
        component: Login
    },
    ResetPassword: {
        identifier: 'ResetPassword',
        component: ResetPassword
    },
    Otp: {
        identifier: 'Otp',
        component: Otp
    },
    NewPassword: {
        identifier: 'NewPassword',
        component: NewPassword
    },
    SignupSelect: {
        identifier: 'SignupSelect',
        component: SignupSelect
    },
    Signup: {
        identifier: 'Signup',
        component: Signup
    },
    CreatePassword: {
        identifier: 'CreatePassword',
        component: CreatePassword
    },
    AddPersonalDetails:{
        identifier: 'AddPersonalDetails',
        component: AddPersonalDetails
    }
}