import axios from 'axios'

import {
    PUBLISH_MESSAGE,
    AVATAR_URL,
    TWILIO_SENDER_DATA,
    BULK_DATA_URL,

    CAMPAINGS_REGISTERS_URL_PUT,
    CAMPAINGS_REGISTERS_URL_POST,
    CAMPAINGS_REGISTERS_URL,

    CAMPAINGS_USER_PHONE_URL,

    REGISTER_URL,
    RESET_PASSWORD_URL,
    USER_URL,
    CURRENT_USER_URL,
    CAMPAINGS_USER_URL,
    CAMPAING_URL,
    CAMPAINGS_SUBSCRIBERS_COUNT_URL,

    GET_PERCENTAGE_URL,
    GENERATE_NUMBER_URL,

    STRIPE_PAY_URL,

    HISTORY_PAYMENT_URL,

    SMS_URL_AMAZON,
    SMS_URL_TWILIO,

    PLAN_ONE,
    PLANS_URL,

    WHATSAPP_SENDER_DATA,
    WHATSAPP_USER_SENDER,

    TWILIO_USER_SENDER,

    WHATSAPP_MESSAGE_URL,

    WHATSAPP_GET_STATUS,
    WHATSAPP_GET_CHATS,
    WHATSAPP_SEND_MESSAGE,
    WHATSAPP_GET_MESSAGES,
    WHATSAPP_GET_ONE_MESSAGE,

    WEBHOOK_URL
} from './endpoints'


export function getCampaigns(userId, pagination) {
    let start = (pagination.currentPage * pagination.pageSize) - pagination.pageSize
    let limit = pagination.pageSize

    let url = CAMPAINGS_USER_URL + userId + '&_start=' + start + '&_limit=' + limit

    return axios({
        method: 'GET',
        url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}

export function generateNumber(userId) {
    return axios({
        method: 'POST',
        url: GENERATE_NUMBER_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        },
        data: {
            userId
        }
    })
}

export function setBulkData(data) {
    return axios({
        method: 'POST',
        url: BULK_DATA_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        },
        data
    })
}

export function getPercentage(campaign) {
    return axios({
        method: 'GET',
        url: GET_PERCENTAGE_URL + campaign,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}

export function getBulkData(campaign) {
    return axios({
        method: 'GET',
        url: BULK_DATA_URL + '?campaign=' + campaign,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}

export function getCampaignsCount(userId) {
    return axios({
        method: 'GET',
        url: CAMPAING_URL + '/count?user=' + userId,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}


export function getAllHistoryPayments(userId, pagination) {
    let start = (pagination.currentPage * pagination.pageSize) - pagination.pageSize
    let limit = pagination.pageSize

    let url = HISTORY_PAYMENT_URL + '?user=' + userId + '&_start=' + start + '&_limit=' + limit

    return axios({
        method: 'GET',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}

export function getHistoryPayment(userId) {
    return axios({
        method: 'GET',
        url: HISTORY_PAYMENT_URL + '/count?user=' + userId,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}

export function getNumbers(userId, pagination) {
    let start = (pagination.currentPage * pagination.pageSize) - pagination.pageSize
    let limit = pagination.pageSize

    let url = CAMPAINGS_USER_PHONE_URL + userId + '&_start=' + start + '&_limit=' + limit

    return axios({
        method: 'GET',
        url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}

export async function getCampaignById(id) {
    return await axios({
        method: 'GET',
        url: CAMPAING_URL + '/' + id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}

export async function registryPayments(data) {
    return await axios({
        method: 'POST',
        url: HISTORY_PAYMENT_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        },
        data
    })
}

export function updateAvatar(data) {
    return axios({
        method: 'POST',
        url: AVATAR_URL,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

export async function saveCampaign(data, userId) {
    return await axios({
        method: 'POST',
        url: CAMPAING_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        },
        data
    })
}


export function getPlans() {
    return axios({
        method: 'GET',
        url: PLANS_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
                // 'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}


export function getPlan(id) {
    return axios({
        method: 'GET',
        url: PLAN_ONE + id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}

export function updatePlan(idUser, idPlan) {
    return axios({
        method: 'PUT',
        url: USER_URL + idUser,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        },
        data: {
            plan: idPlan
        }
    })
}

export async function getNumbersById(id, pagination) {
    let start = (pagination.currentPage * pagination.pageSize) - pagination.pageSize
    let limit = pagination.pageSize

    return await axios({
        method: 'GET',
        url: CAMPAINGS_REGISTERS_URL + id + '&_start=' + start + '&_limit=' + limit,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}

export function getNumbersCount(id) {
    return axios({
        method: 'GET',
        url: CAMPAINGS_REGISTERS_URL_POST + '/count?campaign=' + id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}


export function getNumber(idCampaignUser) {
    return axios({
        method: 'GET',
        url: CAMPAINGS_REGISTERS_URL_POST + '/' + idCampaignUser,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}


export async function addPhone(data) {
    return await axios({
        method: 'POST',
        url: CAMPAINGS_REGISTERS_URL_POST,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        },
        data
    })
}

export async function runBatch(topic, message) {
    return await axios({
        method: 'POST',
        url: PUBLISH_MESSAGE,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        },
        data: {
            topic,
            message
        }
    })
}

export async function deletePhone(id) {
    return await axios({
        method: 'DELETE',
        url: CAMPAINGS_REGISTERS_URL_PUT + id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}

export function updatePhoneSend(id, numberShipments) {
    return axios({
        method: 'PUT',
        url: CAMPAINGS_REGISTERS_URL_PUT + id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        },
        data: {
            numberShipments
        }
    })
}


export async function updateCampaign(id, data) {
    return await axios({
        method: 'PUT',
        url: CAMPAING_URL + '/' + id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        },
        data
    })
}


export async function deleteCampaign(id) {
    return await axios({
        method: 'DELETE',
        url: CAMPAING_URL + '/' + id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}


export async function getCurrentUser() {
    return await axios({
        method: 'GET',
        url: CURRENT_USER_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}

export function updateUser(id, data) {
    return axios({
        method: 'PUT',
        url: USER_URL + id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        },
        data
    })
}

export async function setRegistry(data) {
    return await axios({
        method: 'POST',
        url: REGISTER_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: data
    })
}


export async function setResetPassword(email) {
    return await axios({
        method: 'POST',
        url: RESET_PASSWORD_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
            email
        }
    })
}

export async function countSubscribersByCampaign(idCampaign) {
    return await axios({
        method: 'GET',
        url: CAMPAINGS_SUBSCRIBERS_COUNT_URL + idCampaign,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}


export async function getPhoneNumbersAmazon(idUser) {
    return await axios({
        method: 'GET',
        url: CAMPAINGS_USER_PHONE_URL + idUser,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}


export async function getPhoneNumbersTwilio(idUser) {
    return await axios({
        method: 'GET',
        url: TWILIO_SENDER_DATA + '?user=' + idUser,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}


export async function payPlan(data) {
    return await axios({
        method: 'POST',
        url: STRIPE_PAY_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        },
        data
    })
}

export function sendSMSAmazon(data) {
    return axios({
        method: 'POST',
        url: SMS_URL_AMAZON,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        },
        data
    })
}

export function sendSMSTwilio(data) {
    return axios({
        method: 'POST',
        url: SMS_URL_TWILIO,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        },
        data
    })
}



// functions whatsapp config
let API_TOKEN = '';
let INSTANCE = '';

export function setWhatsappData(token, instance) {
    API_TOKEN = token;
    INSTANCE = instance;
}


export function getStatus() {
    return axios({
        method: 'GET',
        url: WHATSAPP_GET_STATUS,
        params: {
            api_token: API_TOKEN,
            instance: INSTANCE
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}

export function updateWhatsappData(id, data) {
    return axios({
        method: 'PUT',
        url: WHATSAPP_SENDER_DATA + '/' + id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        },
        data
    })
}


export function updateTwilioData(id, data) {
    return axios({
        method: 'PUT',
        url: TWILIO_SENDER_DATA + '/' + id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        },
        data
    })
}


export function saveWhatsappData(idUser, data) {
    return axios({
            method: 'POST',
            url: WHATSAPP_SENDER_DATA,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('auth._token.local')}`
            },
            data
        })
        .then(response => saveUserSender(idUser, response.data));
}


export function saveTwilioData(idUser, data) {
    return axios({
            method: 'POST',
            url: TWILIO_SENDER_DATA,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('auth._token.local')}`
            },
            data
        })
        .then(response => saveUserSender(idUser, response.data));
}



function saveUserSender(idUser, response) {
    const data = {
        user: idUser,
        senderdata: response.id
    };

    return axios({
        method: 'POST',
        url: WHATSAPP_USER_SENDER,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        },
        data
    })
}

export function deleteWhatsappData(data) {
    return axios({
            method: 'DELETE',
            url: WHATSAPP_USER_SENDER + '/' + data.id,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('auth._token.local')}`
            }
        })
        .then(() => {
            axios({
                method: 'DELETE',
                url: WHATSAPP_SENDER_DATA + '/' + data.senderdata.id,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('auth._token.local')}`
                }
            })
        })
}



export function deleteTwilioData(data) {
    return axios({
            method: 'DELETE',
            url: TWILIO_USER_SENDER + '/' + data.id,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('auth._token.local')}`
            }
        })
        .then(() => {
            // axios({
            //   method: 'DELETE',
            //   url: WHATSAPP_SENDER_DATA + '/' + data.senderdata.id,
            //   headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json',
            //     'Authorization': `${localStorage.getItem('auth._token.local')}`
            //   }
            // })
        })
}



export function getAllTwilio(idUser, pagination) {
    let start = '';
    let limit = '';
    let url = '';

    if (pagination) {
        start = (pagination.currentPage * pagination.pageSize) - pagination.pageSize;
        limit = pagination.pageSize;

        url = TWILIO_USER_SENDER + '?user=' + idUser + '&_start=' + start + '&_limit=' + limit;
    } else {
        url = TWILIO_USER_SENDER + '?user=' + idUser;
    }

    return axios({
        method: 'GET',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}

export function getAllWhatsapp(idUser, pagination) {
    let start = '';
    let limit = '';
    let url = '';

    if (pagination) {
        start = (pagination.currentPage * pagination.pageSize) - pagination.pageSize;
        limit = pagination.pageSize;

        url = WHATSAPP_USER_SENDER + '?user=' + idUser + '&_start=' + start + '&_limit=' + limit;
    } else {
        url = WHATSAPP_USER_SENDER + '?user=' + idUser;
    }

    return axios({
        method: 'GET',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}

export function getWhatsappSender(idUser) {
    return axios({
            method: 'GET',
            url: WHATSAPP_USER_SENDER + '?senderdata=' + idUser,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('auth._token.local')}`
            }
        })
        .then(response => {
            return response.data[0].senderdata;
        });
}

export function countWhatsappNumbers(idUser) {
    return axios({
        method: 'GET',
        url: WHATSAPP_USER_SENDER + '/count?user=' + idUser,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}


export function countTwilioNumbers(idUser) {
    return axios({
        method: 'GET',
        url: TWILIO_USER_SENDER + '/count?user=' + idUser,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('auth._token.local')}`
        }
    })
}


export function sendMessage(data) {
    return axios({
        method: 'POST',
        url: WHATSAPP_MESSAGE_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data
    })
}

export function getChats() {
    return axios({
        method: "GET",
        url: WHATSAPP_GET_CHATS,
        params: {
            api_token: API_TOKEN,
            instance: INSTANCE
        },
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
}

export function getChatsByPhone(chatId, token, instance) {
    return axios({
        method: "GET",
        url: WHATSAPP_GET_CHATS + '/' + chatId,
        params: {
            api_token: API_TOKEN,
            instance: INSTANCE
        },
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
}

export function getOneMessage(messageID) {
    return axios({
        method: "GET",
        url: WHATSAPP_GET_ONE_MESSAGE + messageID,
        params: {
            api_token: API_TOKEN,
            instance: INSTANCE
        },
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
}

export function loadInfoChat(chatId) {
    return axios({
        method: "GET",
        url: WHATSAPP_GET_MESSAGES + chatId,
        params: {
            api_token: API_TOKEN,
            instance: INSTANCE
        },
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
}

export function sendWhatsappMessage(body, chatId) {
    return axios({
        method: "POST",
        url: WHATSAPP_SEND_MESSAGE,
        params: {
            api_token: API_TOKEN,
            instance: INSTANCE
        },
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        data: {
            chatId,
            body
        }
    })
}

export function readChat(chatId) {
    return axios({
        method: "PATCH",
        url: "https://api.mercury.chat/sdk/v1/whatsapp/readChat/" + chatId,
        params: {
            api_token: API_TOKEN,
            instance: INSTANCE
        },
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
}

export function setWebHook() {
    return axios({
        method: "POST",
        url: "https://api.mercury.chat/sdk/v1/whatsapp/webhook",
        params: {
            api_token: API_TOKEN,
            instance: INSTANCE
        },
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        data: {
            webhook_url: WEBHOOK_URL,
            "is_webhook_enable": true
        }
    });
}