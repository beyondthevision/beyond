<template>
  <div>
    		<loading :active.sync="isLoading" :is-full-page="true"></loading>



          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-5"
            for="grid-first-name"
            style="margin-top:10px;"
          >
            IVR Name
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            v-model="name"
            placeholder="Name of IVR"
          />
          <p v-if="!isValidIVRName" class="text-red-500 text-xs italic">
            Please fill out this field.
          </p>

          <label
            v-if="!selectedRegisterId"
          style="margin-top:10px;"
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Type
          </label>
          <v-select
            v-if="!selectedRegisterId"
            v-model="type"
            :reduce="(type) => type.value"
            :options="optionsTypes"
            label="label"
          ></v-select>

          <p v-if="!isValidType" class="text-red-500 text-xs italic">
            Please fill out this field.
          </p>


 
          <label
          style="margin-top:10px;"
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Start hour
          </label>
          <el-time-select
            style="width:100%;"
            placeholder="Start time"
            value="HH"
            v-model="start_at"
            :picker-options="{
              start: '01:00',
              step: '00:15',
              end: '24:00',
            }"
          >
          </el-time-select>

          <p v-if="!isValidStartHour" class="text-red-500 text-xs italic">
            Please fill out this field.
          </p>
   

          <label
          style="margin-top:10px;"
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            End hour
          </label>

          <el-time-select
            style="width:100%;"
            placeholder="Start time"
            value="HH"
            v-model="end_at"
            :picker-options="{
              start: '01:00',
              step: '00:15',
              end: '24:00',
              format: 'HH:mm:ss.SSS',
            }"
          >
          </el-time-select>

          <p v-if="!isValidEndHour" class="text-red-500 text-xs italic">
            Please fill out this field.
          </p>



          <label
          style="margin-top:10px;"
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-5"
            for="grid-first-name"
          >
            Timezone
          </label>

          <v-select
            v-model="timezone"
            :reduce="(option) => option.label"
            :options="timezones"
            label="label"
          ></v-select>

          <p v-if="!isValidTimeZone" class="text-red-500 text-xs italic">
            Please fill out this field.
          </p>


        <div v-if="type === 'sms'" style="margin-top:10px;">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Phone
          </label>
          <el-select
            style="width:100% margin-top:0px!important;"
            v-model="number_sms"
            placeholder="Select number"
          >
            <el-option
              v-for="item in numbers"
              :key="item.id"
              :label="'+' + item.number"
              :value="item.id"
            >
            </el-option>
          </el-select>

        </div>
 



          <button
            @click="save"
            class="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            SAVE
          </button>


  
  </div>
</template>

<script>
import timezones from "../../../api-front/timezones";
import logs from '../../../api-front/logs'

import {
  saveCampaign,
  getById,
  getNumbersAllNoIVR,
  getNumbersNoIVR,
updateIVR,
saveIVR
} from "../../../api-front/api";

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: {
    Loading
  },
  async mounted() {
    this.selectedRegisterId = this.$route.query.id;

    this.getNumbers();

    if (this.selectedRegisterId) {
      var response = await getById("ivrs", this.selectedRegisterId);
      var data = response.data;

      console.log("data", data)

      this.name = data.name;
      this.type = data.type;
      this.start_at = data.start_at;
      this.end_at = data.end_at
      this.timezone = data.timezone;
      this.description = data.description
      this.order = data.order
    }
  },
  methods: {
    async getNumbers() {
      try {
        var response = await getNumbersAllNoIVR(this.$auth.user.id);
        this.numbers = response.data;
      } catch (error) {
        console.log("error", error);
      }
    },

    validate() {
      var isValid = true;

      this.isValidIVRName = true;

      if (this.name == "") {
        this.isValidIVRName = false;
        isValid = false;
      }

      this.isValidType = true;

      if (!this.type) {
        this.isValidType = false;
        isValid = false;
      }

      this.isValidStartHour = true;

      if (!this.start_at) {
        this.isValidStartHour = false;
        isValid = false;
      }

      this.isValidEndHour = true;

      if (!this.end_at) {
        this.isValidEndHour = false;
        isValid = false;
      }

      this.isValidTimeZone = true;

      if (!this.timezone) {
        this.isValidTimeZone = false;
        isValid = false;
      }

      return isValid;
    },
    async save() {
      var isValid = this.validate();

      if (isValid) {
        try {
          if (!this.selectedRegisterId) {
            this.isLoading = true
            var response = await saveIVR({
              name: this.name,
              type: this.type,
              description: this.description,
              start_at: this.start_at,
              end_at: this.end_at,
              timezone: this.timezone,
              account: this.$auth.user.id
            });

            logs.sendLogInfo('SAVED IVR', response)


            var id = response.data.id;
            if (this.type == "IVR_CALL") {
              this.$router.push("/ivr/add/modules?id=" + id);
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }

            this.$success({
              title: 'Your IVR was saved'
            });
          } else {

            this.isLoading = true

            var updateObj = {
              name: this.name,
              type: this.type,
              description: this.description,
              start_at: this.start_at,
              end_at: this.end_at,
              timezone: this.timezone,
              account: this.$auth.user.id
            }

            updateIVR(this.selectedRegisterId, updateObj);
            this.isLoading = false
            logs.sendLogInfo('UPDATED IVR', updateObj)

            if (this.type == "IVR_CALL") {
              this.$router.push(
                "/ivr/add/modules?id=" + this.selectedRegisterId
              );
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            } 

            this.$success({
              title: 'Your IVR was saved'
            });
          }
        } catch (error) {
          this.isLoading = false
          this.$error({
            title: 'Error on save IVR'
          });
        }
      }
    },
  },
  data() {
    return {
      selectedRegisterId:null,
      isLoading: false,
      defaultExtension: "+1",
      numbers: [],
      number_sms: null,
      isValidType: true,
      isValidIVRName: true,
      isValidEndHour: true,
      isValidStartHour: true,
      isValidTimeZone: true,
      timezone: "America/Los_Angeles",
      timezones: timezones,
      name: "",
      type: "IVR_CALL",
      start_at: "8:45",
      end_at: "22:00",
      optionsTypes: [
        {
          label: "Call",
          value: "IVR_CALL",
        },
      ],
    };
  },
};
</script>

<style lang="css">
.vs__selected-options {
  height: 2.5em;
}
.el-select {
  margin-top:5px !important;
}
</style>
