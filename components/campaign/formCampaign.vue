<template>
  <div class="card-container card-campaign shadow-lg p-3 mb-5 bg-white rounded">
    <b-card>
      <template
        style="height: 50px;background-color:#fff; font-weight:bold;"
        v-slot:header
      >
        <h5>
          <b>New Massive Campaign</b>
        </h5>
      </template>
      <b-list-group flush>
        <b-list-group-item>
          <h6>
            NAME OF YOUR CAMPAIGN.
            <el-tag size="mini">(Example: SMS for real state.)</el-tag>
          </h6>
          <b-form-group>
            <el-input placeholder="Insert here" v-model="campaign.name">
            </el-input>
          </b-form-group>
        </b-list-group-item>
        <!-- <b-list-group-item>
                    <h6>Prefix</h6>
                    <b-form-group>
                        <el-select v-model="prefix" placeholder="Select">
                        <el-option
                        v-for="prefix in prefixes"
                        :key="prefix.value"
                        :label="prefix.label"
                        :value="prefix.value">
                        </el-option>
                    </el-select>
                    </b-form-group>
                </b-list-group-item> -->

        <b-list-group-item>
          <h6>TYPE</h6>
          <el-select v-model="campaign.type" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </b-list-group-item>

        <b-list-group-item v-if="campaign.type === 'whatsapp'">
          <h6>Whatsapp Phone</h6>
          <el-tag style="margin-bottom:10px;" size="mini"
            >(You must to configure apitoken and instance in settings):
            <a href="/setting/whatsapp">here</a></el-tag
          >
          <el-select
            v-model="campaign.senderdata"
            v-if="whatsappPhones.length > 0"
            placeholder="Select"
          >
            <el-option
              v-for="whatsapp in whatsappPhones"
              :key="whatsapp.senderdata.id"
              :label="whatsapp.senderdata.name"
              :value="whatsapp.senderdata.id"
            >
            </el-option>
          </el-select>
        </b-list-group-item>

        <b-list-group-item v-if="campaign.type === 'sms-amazon'">
          <h6>PHONE NUMBER</h6>

          <el-select
            @input="changePhoneNumberAmazon"
            v-model="campaign.phoneNumber"
            v-if="phoneNumbersAmazon.length > 0"
            placeholder="Select"
          >
            <el-option
              v-for="phoneNumber in phoneNumbersAmazon"
              :key="phoneNumber.id"
              :label="phoneNumber.phone"
              :value="phoneNumber.phone"
            >
            </el-option>
          </el-select>

          <el-button
            v-else
            @click="
              () => {
                $router.push({ name: 'setting-numbers' });
              }
            "
            type="primary"
          >
            Get Phone Number
          </el-button>
        </b-list-group-item>

        <b-list-group-item v-if="campaign.type === 'sms-twilio'">
          <h6>PHONE NUMBER</h6>

          <el-select
            @input="changePhoneNumberTwilio"
            v-model="campaign.phoneNumber"
            v-if="phoneNumbersTwilio.length > 0"
            placeholder="Select"
          >
            <el-option
              v-for="phoneNumber in phoneNumbersTwilio"
              :key="phoneNumber.id"
              :label="phoneNumber.number"
              :value="phoneNumber.number"
            >
            </el-option>
          </el-select>

          <el-button
            v-else
            @click="
              () => {
                $router.push({ name: 'setting-numbers' });
              }
            "
            type="primary"
          >
            Get Phone Number
          </el-button>
        </b-list-group-item>
      </b-list-group>

      <template v-slot:footer>
        <b-button
          @click="save"
          :hidden="loading"
          style="float:right;"
          variant="primary"
        >
          Save
        </b-button>
        <b-button
          class="main-button"
          variant="secondary"
          style="float:right;"
          :hidden="!loading"
          disabled
        >
          <b-spinner small></b-spinner>
          <span class="sr-only">Loading...</span>
        </b-button>
      </template>
    </b-card>
  </div>
</template>

<script>
import {
  saveCampaign,
  getPhoneNumbersAmazon,
  getPhoneNumbersTwilio,
  updateUser,
  getAllWhatsapp
} from "../../utils/actions";
import { Loading } from "element-ui";
import { msgCode } from "../../utils/textConfig";

import _ from "lodash";

export default {
  async mounted() {
    this.campaign.user = this.$auth.user;
  },
  data() {
    return {
      phoneNumbersAmazon: [],
      phoneNumbersTwilio: [],
      options: [
        {
          value: "sms-amazon",
          label: "SMS AMAZON"
        },
        {
          value: "sms-twilio",
          label: "SMS TWILIO"
        },
        {
          value: "whatsapp",
          label: "WHATSAPP"
        }
      ],
      campaign: {
        name: null,
        type: null,
        user: "",
        phoneNumber: "",
        senderdata: ""
      },
      whatsappPhones: [],
      prefix: "1",
      code: "",
      loading: false,
      prefixes: [
        {
          value: "1",
          label: "+1 - USA"
        }
      ],
      msgError: null
    };
  },
  methods: {
    validate() {
      let isValid = true;
      let message;

      if (_.isNil(this.campaign.name)) {
        isValid = false;
        message = "Field name is required";
      }

      if (this.campaign === "sms") {
        if (
          _.isNil(this.campaign.phoneNumber) ||
          this.campaign.phoneNumber === ""
        ) {
          isValid = false;
          message = "Field Phone Number is required";
        }
      }

      return {
        isValid,
        message
      };
    },
    getWhatsapps() {
      getAllWhatsapp(this.$auth.user.id)
        .then(response => {
          this.whatsappPhones = response.data;
        })
        .catch(error => {
          console.log("Error", error.message);
        });
    },
    changePhoneNumberAmazon(value) {
      let phone = this.phoneNumbersAmazon.find(phone => phone.phone === value);
      this.campaign.prefix = phone.prefix;
    },
    changePhoneNumberTwilio(value) {
      let phone = this.phoneNumbersTwilio.find(
        number => number.number === value
      );
      this.campaign.prefix = phone.prefix;
    },
    async getPhoneNumbersAmazon() {
      try {
        let response = await getPhoneNumbersAmazon(this.$auth.user.id);
        this.phoneNumbersAmazon = response.data.numbers;
      } catch (err) {
        const error = err.toString();
        const status = error.replace(/^\D+/g, "");

        let msgObj = msgCode[status];

        this.$notify.error({
          title: msgObj.title,
          message: msgObj.msg
        });
      }
    },
    async getPhoneNumbersTwilio() {
      try {
        let response = await getPhoneNumbersTwilio(this.$auth.user.id);

        this.phoneNumbersTwilio = response.data;
      } catch (err) {
        const error = err.toString();
        const status = error.replace(/^\D+/g, "");

        let msgObj = msgCode[status];

        this.$notify.error({
          title: msgObj.title,
          message: msgObj.msg
        });
      }
    },
    save() {
      let validation = this.validate();
      if (validation.isValid) {
        let loadingInstance = Loading.service({});
        this.loading = true;

        if (this.campaign.type !== "whatsapp") {
          this.campaign.senderdata = null;
        }

        saveCampaign(this.campaign)
          .then(async () => {
            await updateUser(this.$auth.user.id);

            loadingInstance.close();

            let msgObj = msgCode["200"];

            this.$notify({
              title: msgObj.title,
              message: "Your campaign " + msgObj.msg,
              type: msgObj.variant
            });

            this.loading = false;
            window.location.href = "/";
          })
          .catch(err => {
            loadingInstance.close();
            const error = err.toString();
            const status = error.replace(/^\D+/g, "");

            let msgObj = msgCode[status];

            this.$notify.error({
              title: msgObj.title,
              message: msgObj.msg
            });

            this.loading = false;
          });
      } else {
        this.$notify({
          title: "Warning",
          message: validation.message,
          type: "warning"
        });
      }
    }
  },
  mounted() {
    this.getPhoneNumbersAmazon();
    this.getPhoneNumbersTwilio();
    this.getWhatsapps();
    this.campaign.user = this.$auth.user.id;
  }
};
</script>

<style>
.card-container {
  width: 480px;
  max-width: 100%;

  padding: 0px !important;

  margin: auto;
}

.card-campaign .card {
  padding: 0;
  margin: 0;
  border-radius: 0px;
  margin-top: 0px;
}
.card-campaign .card-body > h5 {
  font-weight: bold;

  color: inherit;
  line-height: 1.5;
  font-size: 1.25rem;
  letter-spacing: -0.020625rem;
  font-weight: 600;
  margin: 0px;
}

h6 {
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
  margin-top: 0px;
  margin-bottom: 16px;
  color: #444;
}

.card-campaign .card .card-header {
  background-color: white;
}
</style>
