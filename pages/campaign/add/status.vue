<template>
  <div>
    <div class="bg-white shadow p-4 rounded lg:w-64 mt-5">
      <div class="text-center mt-4">
        <p class="text-gray-600 font-bold">{{ this.name.toUpperCase() }}</p>
      </div>
      <div class="mt-6 flex justify-between text-center">
        <div>
          <p class="text-gray-700 font-bold">{{this.countLeadsPerCampaign.data}}</p>
          <p class="text-xs mt-2 text-gray-600 font-hairline">ALL LEADS</p>
        </div>
        <div>
          <p class="text-gray-700 font-bold">{{this.countLeadsPerCampaign.data - countLeadsPerCampaignFinished.data}}</p>
          <p class="text-xs mt-2 text-gray-600 font-hairline">PENDING</p>
        </div>
        <div>
          <p class="text-gray-700 font-bold">{{countLeadsPerCampaignFinished.data}}</p>
          <p class="text-xs mt-2 text-gray-700 font-hairline">FINISHED</p>
        </div>
      </div>
      <div class="mt-6">
        <button
          v-if="state && state !== 'terminated'"
          @click="finishCampaign"
          class="rounded shadow-md w-full items-center shadow bg-black px-4 py-2 text-white hover:bg-black"
        >
          FINISH CAMPAIGN
        </button>

        <button
          v-if="state && state == 'terminated'"
          class="rounded shadow-md w-full items-center shadow bg-red-300 px-4 py-2 text-white hover:bg-red-300"
        >
          FINISHED
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAgents,
  getById,
  updateCampaign,
  updateNumber,
  addAgentInTwilio,
  deleteAgentInTwilio,
  getNumbersNoIVR,
  countLeadsPerCampaign,
  countLeadsPerCampaignFinished
} from "../../../api-front/api";
export default {
  data() {
    return {
      name: "",
      type: "",
      state: null,
      selectedRegisterId: null,
      countLeadsPerCampaignFinished: {
        data: 0
      },
      countLeadsPerCampaign: {
        data:0
      }
    };
  },
  methods: {
    async getData() {
    if (this.selectedRegisterId) {
      var response = await getById("campaigns", this.selectedRegisterId);
      var data = response.data;
      this.name = data.name;
      this.type = data.type;
      this.start_at = data.start_at;
      this.start_end = data.start_end;
      this.timezone = data.timezone;
      this.state = data.state
    }

    this.countLeadsPerCampaignFinished =  await countLeadsPerCampaignFinished(this.selectedRegisterId);
    this.countLeadsPerCampaign =  await countLeadsPerCampaign(this.selectedRegisterId);

    

    console.log("countLeadsPerCampaignFinished",this.countLeadsPerCampaignFinished)
    console.log("countLeadsPerCampaign", this.countLeadsPerCampaign)

    },
    async finishCampaign() {
      updateCampaign(this.selectedRegisterId, {
        state: "terminated",
      });
      this.$alert("Your campaign was saved", "Success", {
        confirmButtonText: "CONTINUE",
        type: "success",
        center: true,
      });

      await this.getData()

    },
  },
  async mounted() {
    this.selectedRegisterId = this.$route.query.id;
    this.getData()
  },
};
</script>

<style lang="scss" scoped></style>
