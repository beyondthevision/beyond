import axios from "axios";

import moment from "moment";

import config from "../nuxt.config";

const host = config.axios.baseURL;

console.log("host", host)

export async function getData(
    entity,
    pagination,
    account,
    searchTerm,
    filters,
    view,
    agent
) {
    let start =
        pagination.currentPage * pagination.pageSize - pagination.pageSize;
    let limit = pagination.pageSize;

    var pthTerms = "";
    if (searchTerm.term) {
        if (searchTerm.searchTerms) {
            searchTerm.searchTerms.forEach((term) => {
                console.log("term", term, searchTerm.term, term.searchEntity);
                if (term.searchEntity && searchTerm.term !== "") {
                    pthTerms += "&" + term.searchEntity + "_contains=" + searchTerm.term;
                    console.log("pthTerms", pthTerms);
                }
            });
        }
    }

    var extra = "";

    if (searchTerm.dateTime && searchTerm.dateTime.length > 0) {
        var first = moment(searchTerm.dateTime[0]).format("YYYY-MM-DD");
        var second = moment(searchTerm.dateTime[1]).add(1, "days");
        format("YYYY-MM-DD");

        extra = "&datetime_gt=" + first + "&datetime_lt=" + second;
    }

    var filtersPth = "";

    if (!pthTerms) {
        if (filters && filters.length > 0) {
            filters.forEach((filter) => {
                if (filter.value) {
                    filtersPth += "&" + filter.column + ".id=" + filter.value;
                }
            });
        }
    }

    if (view == "operator" && entity == "calls") {
        extra += "&agent.user.id_in=" + agent;
    }

    return await axios({
        method: "GET",
        url: `${host}/` +
            entity +
            "?_start=" +
            start +
            "&_limit=" +
            limit +
            "&deleted_at_null=true" +
            "&account.id=" +
            account +
            filtersPth +
            pthTerms +
            extra,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function getUserById(userId) {
    return axios({
        method: "GET",
        url: `${host}` + "/users/" + userId,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function updateNumber(id, data) {
    return axios({
        method: "PUT",
        url: `${host}` + "/numbers/" + id,
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function disableNumber(data) {
    return axios({
        method: "POST",
        url: `${host}` + "/disableNumber",
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function getCount(entity, email) {
    return axios({
        method: "GET",
        url: `${host}` + "/" + entity + "/count?deleted_at_null=true&account.email=" +
            email,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function updateIVR(id, data) {
    return axios({
        method: "PUT",
        url: `${host}` + "/ivrs/" + id,
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function saveIVR(data) {
    return axios({
        method: "POST",
        url: `${host}` + "/ivrs",
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function deleteEntity(entity, id) {
    var data = { deleted_at: new Date() };
    return axios.put(`${host}` + "/" + entity + "/" + id, data, {
        headers: {
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function deleteCampaign(id) {
    var data = { deleted_at: new Date(), id: id };
    return axios.put(`${host}` + "/delete-campaign/", data, {
        headers: {
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function getById(entity, id) {
    return axios.get(`${host}` + "/" + entity + "/" + id, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function getCampaignsByUserEmail(email, selectedCampaign) {
    return axios.get(
        `${host}` +
        "/campaigns?state=active&account.email=" +
        email +
        "&deleted_at_null=true", {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `${localStorage.getItem("auth._token.local")}`,
            },
        }
    );
}

export function getTotalCallsTodayByUserEmail(
    email,
    selectedCampaign,
    selectedAgent,
    date
) {
    if (!date) {
        date = new Date();
    }

    var tomorrowDate = moment(date)
        .add(1, "days")
        .format("YYYY-MM-DD");

    // var todayDate = moment(date)
    //   .subtract(1, "days")
    //   .format("YYYY-MM-DD");

    var todayDate = moment(date).format("YYYY-MM-DD");

    var pth =
        `${host}` +
        "/calls?account.email=" +
        email +
        "&datetime_gt=" +
        todayDate +
        "&datetime_lt=" +
        tomorrowDate;

    if (selectedCampaign) {
        pth += "&campaign=" + selectedCampaign;
    }

    if (selectedAgent) {
        pth += "&agent=" + selectedAgent;
    }

    return axios.get(pth, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function getTotalCallsWaitingByUserEmail(
    email,
    selectedCampaign,
    selectedAgent
) {
    const fiveMinutesAgo = moment().subtract(1, "minutes");

    const now = moment();

    var pth =
        `${host}` +
        "/calls?account.email=" +
        email +
        "&canceled=false" +
        "&datetime_gt=" +
        fiveMinutesAgo +
        "&datetime_lt=" +
        now;

    if (selectedCampaign) {
        pth += "&campaign=" + selectedCampaign;
    }

    if (selectedAgent) {
        pth += "&agent=" + selectedAgent;
    }

    return axios.get(pth, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function getCalls(email, selectedCampaign, selectedAgent, date) {
    var startOfMonth = null;
    if (date) {
        startOfMonth = moment(date).startOf("month");
    } else {
        startOfMonth = moment().startOf("month");
    }

    var pth =
        `${host}` +
        "/calls?account.email=" +
        email +
        "&datetime_gt=" +
        startOfMonth;

    if (selectedCampaign) {
        pth += "&campaign=" + selectedCampaign;
    }

    if (selectedAgent) {
        pth += "&agent=" + selectedAgent;
    }

    return axios.get(pth, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function getTotalCallMonthByUserEmail(
    email,
    selectedCampaign,
    selectedAgent
) {
    var startOfMonth = moment()
        .startOf("month")
        .valueOf();

    var endOfMonth = moment()
        .endOf("month")
        .valueOf();


    var pth =
        `${host}` +
        "/calls?account.email=" +
        email +
        "&datetime_gt=" +
        startOfMonth +
        "&datetime_lt=" +
        endOfMonth;

    if (selectedCampaign) {
        pth += "&campaign=" + selectedCampaign;
    }

    if (selectedAgent) {
        pth += "&agent=" + selectedAgent;
    }

    return axios.get(pth, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function getAgentsReady(email, selectedCampaign, selectedAgent) {
    var pth = `${host}` + "/agents?connected=true&account.email=" + email;

    if (selectedCampaign) {
        pth += "&campaigns=" + selectedCampaign;
    }

    if (selectedAgent) {
        pth += "&id=" + selectedAgent;
    }

    return axios.get(pth, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function getAllAgentsByEmail(email, selectedCampaign, selectedAgent) {
    var pth = `${host}` + "/agents?account.email=" + email;

    if (selectedCampaign) {
        pth += "&campaigns=" + selectedCampaign;
    }

    if (selectedAgent) {
        pth += "&id=" + selectedAgent;
    }

    return axios.get(pth, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function save(entity, data) {
    var formData = new FormData();

    var inputsToUpload = [];

    data.forEach((input) => {
        if (
            input.type == "string" ||
            input.type == "textarea" ||
            input.type == "number" ||
            input.type == "password" ||
            input.type == "percent"
        ) {
            var inputToUpload = {
                [input.name]: input.value,
            };
            inputsToUpload = {...inputsToUpload, ...inputToUpload };
        }

        if (input.type == "select-autocomplete" && input.value !== "") {
            var inputToUpload = {
                [input.name]: input.value,
            };
            inputsToUpload = {...inputsToUpload, ...inputToUpload };
        }

        if (input.type == "money" && input.value !== "") {
            var inputToUpload = {
                [input.name]: input.value,
            };
            inputsToUpload = {...inputsToUpload, ...inputToUpload };
        }

        if (input.type == "checkbox") {
            var inputToUpload = {
                [input.name]: input.value ? "true" : "false",
            };
            inputsToUpload = {...inputsToUpload, ...inputToUpload };
        }

        if (input.type == "json" && !_.isNil(input.value)) {
            var inputToUpload = {
                [input.name]: input.value,
            };
            inputsToUpload = {...inputsToUpload, ...inputToUpload };
        }

        if (input.type == "file" && !_.isNil(input.value.raw)) {
            formData.append("files." + input.name, input.value.raw);
        }

        if (input.type == "files") {
            input.value = _.uniqBy(input.value, function(e) {
                return e.name;
            });

            input.value.forEach((i, k) => {
                if (!_.isNil(i.raw)) {
                    formData.append("files." + input.name, i.raw);
                }
            });
        }
    });

    formData.append("data", JSON.stringify(inputsToUpload));
    return axios.post(`${host}` + "/" + entity, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function update(entity, data, id) {
    var formData = new FormData();
    var inputsToUpload = [];

    data.forEach((input) => {
        if (
            input.type == "string" ||
            input.type == "textarea" ||
            input.type == "number" ||
            input.type == "password" ||
            input.type == "percent"
        ) {
            var inputToUpload = {
                [input.name]: input.value,
            };
            inputsToUpload = {...inputsToUpload, ...inputToUpload };
        }

        if (input.type == "select-autocomplete" && input.value !== "") {
            var inputToUpload = {
                [input.name]: input.value,
            };
            inputsToUpload = {...inputsToUpload, ...inputToUpload };
        }

        if (input.type == "money" && input.value !== "") {
            var inputToUpload = {
                [input.name]: input.value,
            };
            inputsToUpload = {...inputsToUpload, ...inputToUpload };
        }

        if (input.type == "checkbox") {
            var inputToUpload = {
                [input.name]: input.value ? "true" : "false",
            };
            inputsToUpload = {...inputsToUpload, ...inputToUpload };
        }

        if (input.type == "json" && !_.isNil(input.value)) {
            var inputToUpload = {
                [input.name]: input.value,
            };
            inputsToUpload = {...inputsToUpload, ...inputToUpload };
        }

        // debemos de hacer tambien la validación
        // para cuando no es un objeto
        if (_.isObject(input.value)) {
            if (input.type == "file" && !_.isNil(input.value.raw)) {
                formData.append("files." + input.name, input.value.raw);
            }

            if (input.type == "files") {
                // eliminamos duplicados
                input.value = _.uniqBy(input.value, function(e) {
                    return e.name;
                });

                input.value.forEach((i, k) => {
                    if (!_.isNil(i.raw)) {
                        formData.append("files." + input.name, i.raw);
                    }
                });
            }
        }
    });

    formData.append("data", JSON.stringify(inputsToUpload));
    return axios.put(`${host}` + "/" + entity + "/" + id, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function updateUser(id, data) {
    var formData = new FormData();

    return axios.put(`${host}` + "/users/" + id, data, {
        headers: {
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function updateUserAvatar(data, file) {
    var formData = new FormData();
    formData.append("files", file.raw);
    formData.append("refId", data.refId);
    formData.append("ref", data.ref);
    formData.append("field", data.field);
    formData.append("source", data.source);
    return axios.post(`${host}` + "/upload/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function getNumbersFromCountryCode(code, contains) {
    return axios({
        method: "GET",
        url: `${host}` + "/search-numbers/" + code.toUpperCase() + '?contains=' + contains,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function getExchanges(code) {
    return axios({
        method: "GET",
        url: "https://api.exchangeratesapi.io/latest?base=" + code,
    });
}

export function getLastPlan(userId) {
    return axios({
        method: "GET",
        url: `${host}` +
            "/payments?account=" +
            userId +
            "&_sort=startDate:desc&_limit=1",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function getLastCancelation(userId) {
    return axios({
        method: "GET",
        url: `${host}` +
            "/cancelations?account=" +
            userId +
            "&_sort=date:desc&_limit=1",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function getBalance(userId) {
    return axios({
        method: "GET",
        url: `${host}` + "/balance/" + userId,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function getCampaignsByOperator(userId) {
    return axios({
        method: "GET",
        url: `${host}` + "/campaigns?state=active&agents.user.id_in=" + userId,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function callById(id) {
    return axios({
        method: "GET",
        url: `${host}` + "/calls/" + id,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function getNextLead(campaign) {
    return axios({
        method: "GET",
        url: `${host}` +
            "/leads?campaign=" +
            campaign +
            "&finished=false&notAnswer=false",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function purchaseNumber(data) {
    // console.log(data, "data")
    return axios({
        method: "POST",
        url: `${host}` + "/buy-numbers",
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function addBalance(data) {
    return axios({
        method: "POST",
        url: `${host}` + "/recharge",
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function cancelPlan(data) {
    return axios({
        method: "POST",
        url: `${host}` + "/cancelations",
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function cancelCancelation(id) {
    return axios({
        method: "DELETE",
        url: `${host}` + "/cancelations/" + id,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function saveCampaign(data) {
    return axios({
        method: "POST",
        url: `${host}` + "/campaigns",
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function saveCampaignWithDomain(data) {
    return axios({
        method: "POST",
        url: `${host}` + "/create-campaign",
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function updateCampaign(id, data) {
    return axios({
        method: "PUT",
        url: `${host}` + "/campaigns/" + id,
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function getAgents(user) {
    return axios({
        method: "GET",
        url: `${host}` + "/agents?account=" + user + "&deleted_at_null=true",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function saveAgent(data) {
    return axios({
        method: "POST",
        url: `${host}` + "/add-agent-initial",
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function configAccount(data) {
    return axios({
        method: "POST",
        url: `${host}` + "/config-account",
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function updateAgent(id, data) {
    return axios({
        method: "PUT",
        url: `${host}` + "/agents/" + id,
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function getNumbersNoIVR(account) {
    return axios({
        method: "GET",
        url: `${host}` + "/numbers?IVR=false&account=" + account + "&agent_null=true",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function getNumbersAllNoIVR(account) {
    return axios({
        method: "GET",
        url: `${host}` + "/numbers?IVR=false&account=" + account,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function addLeads(data) {
    return axios({
        method: "POST",
        url: `${host}` + "/leads",
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function setConnected(data) {
    return axios({
        method: "POST",
        url: `${host}` + "/setConnected",
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function updateLead(id, data) {
    return axios({
        method: "PUT",
        url: `${host}` + "/leads/" + id,
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function getLead(id) {
    return axios({
        method: "GET",
        url: `${host}` + "/leads/" + id,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function deleteAgentInTwilio(data) {
    return axios({
        method: "POST",
        url: `${host}` + "/delete-agent-twilio/",
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function getAgentByUserId(id) {
    return axios({
        method: "GET",
        url: `${host}` + "/agents?user=" + id,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function deleteAgentsInTwilioByAgent(data) {
    return axios({
        method: "POST",
        url: `${host}` + "/deleteAgentsInTwilioByAgent",
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function deleteAgentsInTwilioByCampaign(data) {
    return axios({
        method: "POST",
        url: `${host}` + "/deleteAgentsInTwilioByCampaign",
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function countLeadsPerCampaign(campaign) {
    return axios({
        method: "GET",
        url: `${host}/leads/count?campaign.id=${campaign}`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}

export function countLeadsPerCampaignFinished(campaign) {
    return axios({
        method: "GET",
        url: `${host}/leads/count?campaign.id=${campaign}&finished=true`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}


export function call(data) {
    return axios({
        method: "POST",
        url: `${host}/call`,
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}
export function hangup(data) {
    return axios({
        method: "POST",
        url: `${host}/hangup`,
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}
export function recordCall(data) {
    return axios({
        method: "POST",
        url: `${host}/record`,
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
        },
    });
}