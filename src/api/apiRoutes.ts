
const API_BASE_URL = "http://101.53.145.125:5000/"

const DISABLE_API_LOGS = false

const API_ROUTES = {
    login: 'userService/auth/login',
    signup: 'userService/auth/start',
    verifyOtp: 'userService/auth/verify',
    resendOtp: 'userService/auth/resend-otp',
}

export { API_ROUTES, API_BASE_URL, DISABLE_API_LOGS }