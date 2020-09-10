<template>
<div>
   <main class="bg-white-300 flex-1 p-3 pt-32">
      <div class="flex mb-4 mt-5" v-if="selectedCampaign">
         <div class="ml-20" v-if="campaigns.length > 1">
            <h3 style="font-weight: bold;">change campaign</h3>
            <el-select
               @change="changeCampaign"
               v-model="selectedCampaign"
               placeholder="Select campaign"
               clearable
               >
               <el-option
                  v-for="item in campaigns"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  >
               </el-option>
            </el-select>
         </div>
      </div>
      <div class="flex mb-4 mt-5">
         <div class="w-1/2">
            <div class="ml-2">
               <center>
                  <button
                     v-if="selectedCampaign && !activeCall"
                     class="text-blue-500 bg-transparent border border-solid border-blue-500 hover:bg-blue-500 active:bg-red-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
                     type="button"
                     style="transition: all .15s ease"
                     @click="nextLead"
                     >
                  <!-- <i class="fas fa-arrow-right"></i>--> ⏭️ &nbsp; Next lead 
                  </button>
                  <button
                     @click="call"
                     v-if="selectedLead && selectedLead.id && !activeCall"
                     class="text-green-500 bg-transparent border border-solid border-green-500 hover:bg-green-500 active:bg-red-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
                     type="button"
                     style="transition: all .15s ease"
                     >
                  <!-- <i class="fas fa-phone"></i>  -->
                  
                  📞 &nbsp; Call
                  </button>

                  <button
                     @click="markNoResponse"
                     v-if="selectedLead && selectedLead.id && !activeCall"
                     class="text-warning-500 bg-transparent border border-solid border-warning-500 hover:bg-black active:bg-red-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
                     type="button"
                     style="transition: all .15s ease"
                     >
                  <!-- <i class="fas fa-phone"></i>  -->
                  
                 🛑 &nbsp; MARK NO RESPONSE
                  </button>

                  <button
                     @click="recordCall"
                     v-if="selectedLead && selectedLead.id && activeCall && !recording && canRecord"
                     class="text-purple-500 bg-transparent border border-solid border-purple-500 hover:bg-purple-500 active:bg-purple-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
                     type="button"
                     style="transition: all .15s ease"
                     >
                  <!-- <i class="fas fa-microphone"></i>  -->
                  
                  🎙️&nbsp; Record Call
                  </button>
                  <button
                     v-if="selectedLead && selectedLead.id && activeCall"
                     @click="hangup"
                     class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 active:bg-red-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
                     type="button"
                     style="transition: all .15s ease"
                     >
                  
                  <!-- <i class="fa fa-window-close"></i> -->
                  
                  ✔️&nbsp; Hang Up
                  </button>
               </center>
               <div
                  v-if="selectedCampaign"
                  class="border-solid border-2 border-gray-200 mt-3"
                  ></div>
            </div>
            <div
               class="flex flex-wrap -mx-3 mb-6 mt-20 ml-10"
               v-if="!selectedLead && selectedCampaign && loaded"
               >
               <center>
                  <img width="20%" src="/diamond.png" alt="" />
                  <h3 class="mt-4 font-bold">
                     CONGRATS, NO LEADS PENDING FOR CALL <br />
                     IN THIS CAMPAIGN
                  </h3>
               </center>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6 mt-20" v-if="!selectedCampaign && loaded">
               <div class="md:w-1/4"></div>
               <div class="md:w-2/4 px-3 mb-6 md:mb-0">
                  <h3 class="mb-4 ml-20 font-bold">💼 &nbsp; SELECT CAMPAIGN</h3>
                  <el-select
                     class="ml-20"
                     @change="changeCampaign"
                     v-model="selectedCampaign"
                     placeholder="Select campaign"
                     clearable
                     >
                     <el-option
                        v-for="item in campaigns"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        >
                     </el-option>
                  </el-select>
               </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6 mt-5 " v-if="selectedLead">
               <div class="md:w-1/4"></div>
               <div class="md:w-4/4 px-3 mb-6 md:mb-0 justify-around">
                  <h3 class="mb-4">🧔 👩‍🦰 &nbsp; Lead information <b v-if="status">{{status}}</b></h3>
               </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6 mt-5 " v-if="selectedLead">
               <div class="md:w-1/4"></div>
               <div class="md:w-1/4 px-3 mb-6 md:mb-0 justify-around">
                  <label
                     class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                     for="grid-first-name"
                     >
                  First Name
                  </label>
                  <input
                     disabled
                     v-model="selectedLead.firstName"
                     class="appearance-none bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                     id="grid-first-name"
                     type="text"
                     placeholder=""
                     />
               </div>
               <div class="md:w-1/4 px-3 justify-around ml-10">
                  <label
                     class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                     for="grid-last-name"
                     >
                  Last Name
                  </label>
                  <input
                     disabled
                     v-model="selectedLead.lastName"
                     class="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                     id="grid-last-name"
                     type="text"
                     placeholder=""
                     />
               </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6 mt-5 " v-if="selectedLead">
               <div class="md:w-1/4"></div>
               <div class="md:w-1/4 px-3 mb-6 md:mb-0 justify-around">
                  <label
                     class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                     for="grid-first-name"
                     >
                  Phone
                  </label>
                  <input
                     disabled
                     v-model="selectedLead.phone"
                     class="appearance-none bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                     id="grid-first-name"
                     type="text"
                     placeholder=""
                     />
               </div>
               <div class="md:w-1/4 px-3 justify-around ml-10">
                  <label
                     class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                     for="grid-last-name"
                     >
                  Email
                  </label>
                  <input
                     disabled
                     v-model="selectedLead.email"
                     class="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                     id="grid-last-name"
                     type="text"
                     placeholder=""
                     />
               </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6 mt-5 " v-if="selectedLead">
               <div class="md:w-1/4"></div>
               <div class="md:w-1/4 px-3 mb-6 md:mb-0 justify-around">
                  <label
                     class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                     for="grid-first-name"
                     >
                  Address
                  </label>
                  <textarea
                     disabled
                     v-model="selectedLead.address"
                     class="t-textarea w-full t-textarea-size-default t-textarea-status-default border block rounded p-3 bg-white"
                     rows="3"
                     placeholder="Address"
                     ></textarea>
               </div>
               <div class="md:w-1/4 px-3 justify-around ml-10"></div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6 mt-5 " v-if="selectedLead">
               <div class="md:w-1/4"></div>
               <div class="md:w-1/4 px-3 mb-6 md:mb-0 justify-around">
                  <h3 class="mb-4" v-if="selectedLead.additional && selectedLead.additional.length > 0">Other fields</h3>
                  <div :key="field.label" v-for="field in selectedLead.additional">
                     <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                     {{ field.label }}
                     </label>
                     <input
                        v-model="field.value"
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        :placeholder="'add ' + field.label"
                        />
                  </div>
               </div>
            </div>
         </div>
         <div class="w-1/2">
            <div class="ml-2">
               <ul class="flex border-b mb-8">
                  <li class="-mb-px mr-1">
                     <a
                        @click="selectTab(0)"
                        class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                        >Leads Directory</a
                        >
                  </li>
                  <li class="mr-1">
                     <a
                        @click="selectTab(1)"
                        class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                        >Calls history</a
                        >
                  </li>
                  <li v-if="selectedLead" class="mr-1">
                     <a
                        @click="selectTab(3)"
                        class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                        >Add lead review</a
                        >
                  </li>
                  <li class="mr-1">
                     <a
                        @click="selectTab(4)"
                        class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                        >How to use</a
                        >
                  </li>
               </ul>
               <div v-if="tab == 0 && account">
                  <h2 class="text-2xl font-semibold leading-tight">
                     🗄️ Leads Directory
                  </h2>
                  <grid
                     :key="2"
                     view="operator"
                     :account="account"
                     @selected="onSelectLead"
                     :searchTerms="searchTerms"
                     searchTermColumn="phone"
                     :filters="filters"
                     :hidden-columns="hiddenColumns"
                     :entity="entity"
                     ></grid>
               </div>
               <div v-if="tab == 1 && account">
                  <h2 class="text-2xl font-semibold leading-tight">
                     🕘&nbsp;Call History
                  </h2>
                  <grid
                     :key="1"
                     view="operator"
                     :account="account"
                     :searchTerms="searchTerms"
                     searchTermColumn="phone"
                     :filters="filters"
                     :hidden-columns="hiddenColumnsCallHistory"
                     entity="calls"
                     ></grid>
               </div>
               <div v-if="tab == 3 && selectedLead">
                  <h2 class="text-2xl font-semibold leading-tight">
                     ⭐&nbsp;Lead Review
                  </h2>

              <h3 class="font-semibold leading-tight mt-5">Review {{getDate()}}</h3>
              <textarea
                     v-model="leadReview"
                     class="mt-2 t-textarea w-full t-textarea-size-default t-textarea-status-default border block rounded p-3 bg-white"
                     rows="3"
                     placeholder="Review"
                     ></textarea>
<button @click="saveReview" class="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
  save
</button>

            <h2 class="text-2xl font-semibold leading-tight mt-5" v-if="this.selectedLead.reviews && this.selectedLead.reviews.length > 0">
                     ⭐&nbsp;History of reviews
                  </h2>
<div v-for="review in this.selectedLead.reviews" class="mt-5">
            <h3 class="font-semibold leading-tight mt-5">Review {{getDate(review.date)}}</h3>
              <textarea
              :disabled="true"
                     :value="review.review"
                     class="mt-2 t-textarea w-full t-textarea-size-default t-textarea-status-default border block rounded p-2 bg-white"
                     rows="2"                     ></textarea>
</div>



               </div>
               <div v-if="tab == 4">
                  <h2 class="text-2xl font-semibold leading-tight">
                     💁 How to Use
                  </h2>
                  <div class="mt-5">
                     <p>For call you need to download a SIP client. We recommend two:
                     <ul class="mt-5">
                        <li>🌟 Linphone <a target="_blank" href="https://www.linphone.org/">Website</a></li>
                        <li>🌟 Jitsi <a target="_blank" href="https://desktop.jitsi.org/Main/Download.html">Website</a></li>
                        <li>🌟 Zoiper <a target="_blank" href="https://www.zoiper.com/">Website</a></li>
                     </ul>
                     </p>
                  </div>
                  <div class="mt-5" v-if="agent && account">
                     <p>
                        Then you need to config the SIP with your credentials:
                     <ul class="mt-5">
                        <li class="select-text"><b>SIP Domain:</b> {{account.sip_domain_name}} <a @click="copyTestingCode">Copy</a></li>
                        <li class="select-text"><b>User: {{agent.identifier}} (*Internal number)</b></li>
                        <li><b>Password:</b> same as operator password.</li>
                     </ul>
                     </p>
                     <p class="text-gray-600 text-xs italic mt-2">
                        If your SIP client does not have the host option, <br> the user will be like this:
                        {{agent.identifier}}@{{account.sip_domain_name}}
                     </p>
                     <input type="hidden" id="testing-code" :value="account.sip_domain_name">
                  </div>
                  <div class="mt-2">
                     <p>
                        When you config your SIP client with the credentials you can start work.👨‍💻
                     </p>
                  </div>

                  <div class="mt-2" v-if="agent.numbers.length > 0">
                      <h3>Your numbers</h3>
                      <p>

                   <p>
                        This is your external number:
                     </p>

                    <ul class="mt-1">
                        <li v-for="number in agent.numbers" class="select-text	font-bold"> +{{number.number}}</li>
                     </ul>
                  </div>


               </div>
            </div>
         </div>
      </div> 
      <hr />
   </main>
</div>
</template>

<script>
import grid from "@/components/grid";
import * as moment from "moment-timezone";
import {
  setConnected,
  getCampaignsByOperator,
  getNextLead,
  getAgentByUserId,
  getUserById,
  call,
  hangup,
  recordCall,
  callById,
  updateLead
} from "../../api-front/api";

export default {
  async mounted() {
    this.setConnected();
    await this.getCampaigns();
    await this.getParentAccount();
    await this.getAgentByUserId();
    this.loaded = true;
  },
  layout: "operatorLayout",
  components: {
    grid,
  },
  watch: {
    selectedCampaign() {
      if (!this.selectedCampaign) {
        this.selectedLead = null;
      }
    },
  },
  methods: {
    async saveReview () {

      if (this.leadReview == "") {
                  this.$alert(
            "The review is empty.",
            "Error on create lead",
            {
              confirmButtonText: "OK",
              type: "warning",
              center: true,
            }
          );
      }


      if (!this.selectedLead.reviews) this.selectedLead.reviews = []

      var reviews = this.selectedLead.reviews

      reviews.push({
        date: new Date(),
        review: this.leadReview
      })

      this.selectedLead.reviews = reviews

      await updateLead(this.selectedLead.id, this.selectedLead)

     // console.log("review", this.leadReview)
    },
    onSelectLead (lead) {
       
      this.selectedLead = lead
    },
    async markNoResponse () {
      this.selectedLead.notAnswerDate = new Date()
      this.selectedLead.notAnswer = true
            await updateLead(this.selectedLead.id, this.selectedLead)
            this.nextLead()

    },
    copyTestingCode() {
      let testingCodeToCopy = document.querySelector("#testing-code");
      testingCodeToCopy.setAttribute("type", "text");
      testingCodeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
      } catch (err) {}

      /* unselect the range */
      testingCodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
    async getParentAccount() {
      var response = await getUserById(this.$auth.user.account);
      this.account = response.data;
    },
    async getAgentByUserId() {
      var response = await getAgentByUserId(this.$auth.user.id);
      this.agent = response.data[0];
    },
    selectTab(tab) {
      this.tab = tab;
      this.$forceUpdate();
    },
    async call() {

       try {
      
       var response = await call({
          userId: this.$auth.user.id,
          selectedLead:this.selectedLead,
          category: this.selectedCampaign
       })

      this.callInfo = response.data

      this.intervalCall = setInterval(async () => {
         var callResponse = await callById(this.callInfo.call.id)

         this.callInfo.call = callResponse.data

         var callInfo = this.callInfo.call

         this.status = callInfo.status

         console.log(callInfo, "callInfo")

         if (callInfo.status == "initiated") {

         }

         if (callInfo.status == "ringing") {

         }

         if (callInfo.status == "answered") {
            this.canRecord = true
         }

         if (callInfo.status == "completed") {
            this.hangup()

         }

         if (callInfo.status == "failed") {
            this.hangup()
         }

         if (callInfo.status == "no_answer") {
            this.hangup()

         }

         if (callInfo.status == "busy") {
            this.hangup()

         }
         
      }, 5000)

      // console.log(this.callInfo, "callInfo")    
      this.activeCall = true;
   
       } catch (error) {
         this.$alert("Error on call. Please try again.", "Error on call", {
            confirmButtonText: "CONTINUE",
            type: "error",
            center: true,
         });
       }

    },
    async hangup() {
       this.status = null
       this.canRecord = false
       clearInterval(this.intervalCall)
       var response = await hangup({
          callId: this.callInfo.call.id,
          sid: this.callInfo.call.sid
       })

      this.callInfo = {
         call: null
      }

      this.recording = false
      this.activeCall = false;
    },
    async stopRecording () {

    },
    async recordCall() {


      console.log("la llamada a hacer es", this.callInfo)
      try {
             var response = await recordCall({
          callId: this.callInfo.call.id,
          sid: this.callInfo.call.sid
       })   

this.recording = true

      } catch (error) {
                  this.$alert("Error on record. Please try again during call.", "Error on record", {
            confirmButtonText: "CONTINUE",
            type: "error",
            center: true,
         });
      }

         
    },
    async nextLead() {
      // vamos ala tabla leads y traemos que no este finished
      var response = await getNextLead(this.selectedCampaign);
      this.selectedLead = response.data[0];
    },
    async changeCampaign(id) {
      this.selectedCampaign = id;
      if (id) {
        await this.nextLead();
      }
    },
    async getCampaigns() {
      var response = await getCampaignsByOperator(this.$auth.user.id);
      this.campaigns = response.data;
      if (this.campaigns.length == 1) {
        this.selectedCampaign = this.campaigns[0].id;
        this.nextLead();
      }
    },
    getDate (date) {
                  var timezone = this.account.timezone;
if (!date) {
      date = new Date()
}
return moment
            .utc(date)
            .tz(timezone)
            .format("YYYY-MM-DD HH:mm A");
    },
    async setConnected() {
      await setConnected({
        connected: true,
        userId: this.$auth.user.id,
      });
    },
  },
  data() {
    return {
       status: null,
              iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'] // same as { 2: 'icon-rate-face-1', 4: { value: 'icon-rate-face-2', excluded: true }, 5: 'icon-rate-face-3' }
,
rateLead: null,
canRecord: false,
recording: false,
leadReview: "",
      loaded: false,
      account: null,
      agent: null,
      tab: 0,
      selectedLead: null,
      activeCall: false,
      single: true,
      dialogModal: false,
      isValidCampaign: true,
      isValidName: true,
      isValidLastName: true,
      isValidEmail: true,
      isValidPhone: true,
      isValidAddress: true,
      dialogAddField: false,
      selectedCampaign: null,
      selectedAgent: null,
      campaigns: [],
      nameFieldToPopulate: "",
      customFields: [],
      name: "",
      lastName: "",
      address: "",
      phone: "",
      email: "",
      searchTerms: [
        {
          searchEntity: "searchwords",
        },
        // {
        //   searchEntity: 'toNumber'
        // }
      ],
      entity: "leads",
      entityAddURL: "/campaigns/add-lead",
      customFields: [],
      filters: [
        {
          column: "campaign",
          value: null,
          required: false,
          name: "campaign",
          label: "Campaign",
          position: "left",
          type: "select-autocomplete",
          searchEntity: "campaigns",
          searchField: "name",
        },
      ],

      hiddenColumns: [
        "created_at",
        "added",
        "created",
        "notAnswer",
        "notAnswerDate",
        "email",
        "inLine",
        "address",
        "campaign",
        "updated_at",
        "id",
        "deleted_at",
        "searchwords",
      ],
      hiddenColumnsCallHistory: [
        "leads",
        "toNumber",
        "sid",
        "searchwords",
        "deleted_at",
        "id",
        "campaign",
        "calls",
        "active",
        "waitingtime",
        "canceled",
        "fromNumber",
        "callDuration",
        "status",
        "agent",
        "type",
        "startTime",
        "finishTime",
      ],
    };
  },
};
</script>

<style lang="css" scoped>
button:hover {
  color: white;
}
</style>
