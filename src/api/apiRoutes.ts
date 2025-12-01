const API_BASE_URL = "http://101.53.145.125:5000/"

const DISABLE_API_LOGS = false

const API_ROUTES = {
    login: 'userService/auth/login',
    signup: 'userService/auth/start',
    verifyOtp: 'userService/auth/verify',
    resendOtp: 'userService/auth/resend-otp',
    createPassword: 'userService/auth/password',
    addPersonalDetails: 'userService/auth/details',
    resetPassword: 'userService/auth/reset/start',
    verifyResetPassword: 'userService/auth/reset/verify',
    createNewPassword: 'userService/auth/reset/confirm',
    getUserDetails: 'userService/auth/get_user',
    uploadProfileImage: 'userService/auth/upload-profile-photo',
    getHomeData: "home_module/home",
    getAllPlans: "userService/auth/plans/all",
    getPlanDetails: "userService/auth/plans",
    uploadDocuments:'userService/auth/provider/upload-documents',
    addYearsOfExperience:'userService/auth/experience',
    onSelectPlan: "userService/auth/select-plan"
}

export { API_ROUTES, API_BASE_URL, DISABLE_API_LOGS }