import config from "../nuxt.config";
const SERVER = config.axios.baseURL;
const BASE_URL = config.axios.baseURL;

const REGISTER_URL = `${BASE_URL}/auth/local/register`
const RESET_PASSWORD_URL = `${BASE_URL}/reset-password`
const USER_URL = `${BASE_URL}/users/`
const CURRENT_USER_URL = `${BASE_URL}/users/me`

// go to whatsapp client
const WAPP_URL = `${SERVER}:3001`
const WEBHOOK_URL = "http://01b6e470.ngrok.io/wapphook"; // production BASE_URL

// Campaigns
const AVATAR_URL = `${BASE_URL}/upload`
const CAMPAING_URL = `${BASE_URL}/campaigns`
const CAMPAINGS_REGISTERS_URL = `${BASE_URL}/campaignusers?campaign=`
const CAMPAINGS_REGISTERS_URL_POST = `${BASE_URL}/campaignusers`
const CAMPAINGS_REGISTERS_URL_PUT = `${BASE_URL}/campaignusers/`
const CAMPAINGS_USER_URL = `${BASE_URL}/campaigns?user=`

const CAMPAINGS_USER_PHONE_URL = `${BASE_URL}/userphones?user=`

// generate number

const GENERATE_NUMBER_URL = `${BASE_URL}/generate-number`

// percentage
const GET_PERCENTAGE_URL = `${BASE_URL}/count-response?campaign=`

// SMS
const SMS_URL_AMAZON = `${BASE_URL}/sendMessageAmazon`


// SMS
const SMS_URL_TWILIO = `${BASE_URL}/sendMessageTwilio`


// payment
const STRIPE_KEY_URL = `${BASE_URL}/stripe-key`
const STRIPE_PAY_URL = `${BASE_URL}/pay`

// plans

const PLAN_ONE = `${BASE_URL}/plans?id=`
const PLANS_URL = `${BASE_URL}/plans`

// Subscribers
const CAMPAINGS_SUBSCRIBERS_COUNT_URL = `${BASE_URL}/campaignusers/count?campaign=`

const PUBLISH_MESSAGE = `${BASE_URL}/publishMessageToTopic`

//history payments
const HISTORY_PAYMENT_URL = `${BASE_URL}/historypayments`

//bulkdata
const BULK_DATA_URL = `${BASE_URL}/bulkdata`

// whatsapp data
const WHATSAPP_SENDER_DATA = `${BASE_URL}/senderdata`


//twilio
const TWILIO_SENDER_DATA = `${BASE_URL}/twilioconfigs`


const WHATSAPP_USER_SENDER = `${BASE_URL}/usersenders`
const TWILIO_USER_SENDER = `${BASE_URL}/twilioconfigs`


const WHATSAPP_MESSAGE_URL = `${BASE_URL}/sendmessages`
const WHATSAPP_PHONES_URL = `${BASE_URL}/phoneswhatsapps`


// whatsapp chat
const WHATSAPP_GET_INSTANCE = 'https://api.mercury.chat/sdk/v1/whatsapp/instance_whatsapp'

const WHATSAPP_GET_CHATS = 'https://api.mercury.chat/sdk/whatsapp/chat'

const WHATSAPP_SEND_MESSAGE = 'https://api.mercury.chat/sdk/v1/whatsapp/sendMessage'

const WHATSAPP_GET_MESSAGES = 'https://api.mercury.chat/sdk/whatsapp/messages/'

const WHATSAPP_GET_ONE_MESSAGE = 'https://api.mercury.chat/sdk/v1/whatsapp/message/'

const WHATSAPP_READ_CHAT = "https://api.mercury.chat/sdk/v1/whatsapp/readChat/"

const WHATSAPP_GET_STATUS = "https://api.mercury.chat/sdk/v1/whatsapp/instance_whatsapp/status"

// messages Queue
const WHATSAPP_GET_MESSAGES_QUEUE = 'https://api.mercury.chat/sdk/v1/whatsapp/showMessagesQueue'

export {
    AVATAR_URL,
    REGISTER_URL,
    BASE_URL,
    RESET_PASSWORD_URL,
    USER_URL,

    BULK_DATA_URL,

    CURRENT_USER_URL,
    CAMPAINGS_USER_URL,
    CAMPAING_URL,
    CAMPAINGS_REGISTERS_URL,
    CAMPAINGS_REGISTERS_URL_POST,
    CAMPAINGS_REGISTERS_URL_PUT,
    CAMPAINGS_SUBSCRIBERS_COUNT_URL,

    CAMPAINGS_USER_PHONE_URL,

    GET_PERCENTAGE_URL,
    GENERATE_NUMBER_URL,

    PUBLISH_MESSAGE,
    STRIPE_KEY_URL,
    STRIPE_PAY_URL,

    HISTORY_PAYMENT_URL,

    SMS_URL_TWILIO,
    SMS_URL_AMAZON,

    PLAN_ONE,
    PLANS_URL,

    WAPP_URL,

    WHATSAPP_SENDER_DATA,
    WHATSAPP_USER_SENDER,

    TWILIO_USER_SENDER,

    WHATSAPP_MESSAGE_URL,
    WHATSAPP_PHONES_URL,

    WHATSAPP_GET_INSTANCE,
    WHATSAPP_GET_CHATS,
    WHATSAPP_SEND_MESSAGE,
    WHATSAPP_GET_MESSAGES,
    WHATSAPP_GET_ONE_MESSAGE,
    WHATSAPP_READ_CHAT,
    WHATSAPP_GET_STATUS,
    WHATSAPP_GET_MESSAGES_QUEUE,

    WEBHOOK_URL,


    TWILIO_SENDER_DATA

}