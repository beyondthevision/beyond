// import imgBackgroundLogin from '@/assets/media/photos/photo22@2x.jpg'
import imgBackgroundLogin from '@/assets/media/photos/container.jpeg'
import imgBackgroundRegistry from '@/assets/media/photos/triangle.png'
import imgBackgroundResetPassword from '@/assets/media/photos/girl.jpeg'
import LOGO from '@/assets/media/avatars/logo.png' // URL LOGO
import LOGO_DASHBOARD from '@/assets/media/avatars/logo-dashboard.png'

// import termsConditions from '@/assets/terms.txt'

const COMPANY_NAME = 'MassiveTexting'
const USE = 'logo' // company-name or logo
const BUTTON_COLOR_BACKGROUND = '#000000ca'
const BUTTON_COLOR_HOVER = '#404040'

export const header = {
    use: 'logo',
    logo: LOGO_DASHBOARD,
    companyName: COMPANY_NAME
};

export const accessPricing = true

/* export const terms = {
    file: termsConditions
}; */

export const login = {
    alertConfig: {
        dismissSecs: 3,
        dismissCountDown: 0,
        msg: 'Information required', // campo antes de este mensaje
        variant: 'danger'
    },
    use: USE,
    logo: LOGO,
    title: COMPANY_NAME,
    subtitle: 'SIGN IN',
    fieldTexts: [
        'Username',
        'Email',
        'Password'
    ],
    buttons: {
        signIn: 'Sign In',
        resetPassword: 'Forgot password',
        register: 'New Account',
        createAccount: 'Create',
        backgroundColor: BUTTON_COLOR_BACKGROUND,
        hoverColor: BUTTON_COLOR_HOVER
    },
    // Title space
    welcome: {
        backgroudColor: '#000000',
        title: 'Masive message delivery platform',
        subtitle: 'Copyright',
        year: '2019'
    },
    urlBackgroundImg: imgBackgroundLogin
}


export const registry = {
    alertConfig: {
        dismissSecs: 3,
        dismissCountDown: 0,
        msg: 'User registered', // campo antes de este mensaje
        variant: 'danger'
    },
    use: USE,
    logo: LOGO,
    title: COMPANY_NAME,
    subtitle: 'Create New Account',
    fieldTexts: [
        'Username',
        'Email',
        'Password',
        'Password Confirm'
    ],
    buttonsText: {
        signUp: 'Sign Up',
        signIn: 'Sign In',
        readTerms: 'Read Terms',
        backgroundColor: BUTTON_COLOR_BACKGROUND,
        hoverColor: BUTTON_COLOR_HOVER
    },
    agreeTerms: 'I agree to Terms And Conditions',
    urlBackgroundImg: imgBackgroundRegistry
}

export const resetPassword = {
    alertConfig: {
        dismissSecs: 3,
        dismissCountDown: 0,
        msg: 'Email send', // campo antes de este mensaje
        variant: 'danger'
    },
    use: USE,
    logo: LOGO,
    title: COMPANY_NAME,
    subtitle: 'PASSWORD REMINDER',
    fieldTexts: [
        'Username or Email'
    ],
    buttonsText: {
        passwordReset: 'Password Reminder',
        backgroundColor: BUTTON_COLOR_BACKGROUND,
        hoverColor: BUTTON_COLOR_HOVER
    },
    urlBackgroundImg: imgBackgroundResetPassword,
    bigMsg: {
        backgroudColor: '#000000ca',
        title: 'Find your account',
        subtitle: 'Enter your email, phone number or username.'
    }
}


export const errors = {
    emptyFields: 'Required fields',
    login: {
        authentication: 'Users or password incorrects'
    },
    registry: {
        samePassword: 'Password confirmation does not match',
        userNotValid: 'User not valid, try again'
    },
    resetPassword:{
        emailNotValid: 'Email does not exist',
        emptyEmail: 'Email required',
        emailNotSend: 'Email does not sending, try again'
    }
}

export const msgCode = {
    '400': {
        title: 'Error',
        msg: 'Invalid field in form.',
        variant: 'error'
    },
    '404': {
        title: 'Error',
        msg: 'Resource not found',
        variant: 'error'
    },
    '403': {
        title: 'Unauthorized',
        msg: "You can't to use the resources",
        variant: 'error'
    },
    '401': {
        title: 'Authentication', 
        msg: 'The authentication is required',
        variant: 'error'
    },
    '200': {
        title: 'Success', 
        msg: 'was created correctly.',
        variant: 'success'
    },
    '201': { 
        title: 'Success',
        msg: 'Created',
        variant: 'success'
    },
    '500': {
        title: 'Error', 
        msg: 'Server internal error',
        variant: 'error'
    },
    '511': {
        title: 'Authentication',
        msg: 'Network authentication required',
        variant: 'error'
    },
    '504': {
        title: 'Warning',
        msg: 'Reply late',
        variant: 'warning'
    }
}