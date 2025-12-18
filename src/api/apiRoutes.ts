const API_BASE_URL = "http://163.227.92.122:4001/"

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
    uploadDocuments: 'userService/auth/provider/upload-documents',
    addYearsOfExperience: 'userService/auth/experience',
    onSelectPlan: "userService/auth/select-plan",
    allCategories: "home_module/all_categories",
    uploadServiceRequestImage: "service_request/upload",
    editProfile: "profile_module/profile",
    onServiceRequest: "service_request/service-requests",
    ratingAndReviews: "elderly_profile/profile?section=ratings_reviews",
    deleteProfile: "elderly_profile/profile?section=my_profile",
    getAllRequests: "service_confirmation/service_accept/get_services",
    onSelectedCategories: "userService/auth/select-categories",
    onSelectedServices: "userService/auth/select-sub-categories",
    getServiceDetails: "service_confirmation/service_accept/get_service",
    getFavoriteProfessionals: "service_confirmation/favorite-provider/fetch",
    onSendCategoryIds: "userService/auth/select-provider-services",
    fetchTransactions: "profile_module/user_profile",
}

export { API_ROUTES, API_BASE_URL, DISABLE_API_LOGS }