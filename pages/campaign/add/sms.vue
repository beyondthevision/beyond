<template>
  <div>
    <div class="w-full">
      <div class="py-4 lg:px-4">
        <div
          class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
          role="alert"
        >
          <span
            class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3"
            >New</span
          >
          <span class="font-semibold mr-2 text-left flex-auto"
            >You can use data columns properties for dynamic messages!</span
          >
        </div>
      </div>

      <div class="flex mb-4">
        <div class="w-4/4">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
            for="grid-first-name"
          >
            SMS Content
          </label>

          <el-tag
            style="cursor:pointer;margin-top:2px;"
            @click="addNameToMessage()"
            type="warning"
            >##name##</el-tag
          >
          <el-tag
            style="cursor:pointer;margin-top:2px;"
            @click="addAddressToMessage()"
            type="danger"
            >##address##</el-tag
          >
          <el-tag
            style="cursor:pointer;margin-top:2px;"
            @click="addPhoneNumberToMessage()"
            type="info"
            >##phoneNumber##</el-tag
          >

          <hr />

          <textarea
            rows="3"
            class="form-textarea mt-1 block w-full mt-5 p-2 border-gray-400 border-black"
            type="textarea"
            placeholder="Please input your SMS content."
            v-model="sms_message"
          >
          </textarea>

          <div class="flex mb-4 mt-5">
            <div class="w-1/4">
              <button
              @click="save"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                SAVE
              </button>
            </div>
            <div class="w-1/4 ml-20"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { saveCampaign, getById, updateCampaign } from "../../../api-front/api";
import _ from "lodash";
export default {
  async mounted() {
    this.selectedRegisterId = this.$route.query.id;

    if (this.selectedRegisterId) {
      var response = await getById("campaigns", this.selectedRegisterId);
      var data = response.data;
      this.name = data.name;
      this.type = data.type;
      this.start_at = data.start_at;
      this.start_end = data.start_end;
      this.timezone = data.timezone;
      this.sms_message = data.sms_message;
    }
  },
  methods: {
    validate() {
      var isValid = true;
      if (this.sms_message == "") {
        isValid = false;

        this.$error({
          content: "Message can not be empty",
          title: "Error",
        });
      } 

      return isValid;
    },
    async save() {
      var isValid = this.validate();

      if (isValid) {
        try {
          if (!this.selectedRegisterId) {
            var response = await saveCampaign({
              sms_message: this.sms_message,
            });

            this.$success({
              content: "Your campaign was saved", 
              title:"Success"
            });


          } else {
            updateCampaign(this.selectedRegisterId, {
              sms_message: this.sms_message,
            });

            this.$success({
              content: "Your campaign was saved",
              title: "success",
              center: true,
            });

          }
        } catch (e) {}
      }
    },

    addNameToMessage() {
      if (!_.isNil(this.sms_message)) {
        this.sms_message += "##name##";
      } else {
        this.sms_message = "##name##";
      }
    },

    addAddressToMessage() {
      if (!_.isNil(this.sms_message)) {
        this.sms_message += "##address##";
      } else {
        this.sms_message = "##address##";
      }
    },

    addPhoneNumberToMessage() {
      if (!_.isNil(this.sms_message)) {
        this.sms_message += "##phoneNumber##";
      } else {
        this.sms_message = "##phoneNumber##";
      }
    },
  },
  data() {
    return {
      sms_message: "",
    };
  },
};
</script>

<style lang="css" scoped>
textarea {
  border: 1px solid #dcdfe6;
}
</style>
