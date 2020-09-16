<template>
  <div>

    <a-modal
      title="How to use"
	  on-ok="dialogModal = false"
      :visible="dialogModal"
	v-model="dialogModal"
    >
	 <template slot="footer">
		  </template>
			<center>
				<iframe
					width="100%"
					height="315"
					src="https://www.youtube.com/embed/5lrdYBLEk60"
					frameborder="0"
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			</center>
    </a-modal>
    <div class="py-8">
      <div>
        <!-- <h2 class="text-2xl font-semibold leading-tight">🕶 My campaigns</h2> -->
          <!-- <button
            @click="dialogModal = true"
            class="float-right ml-2 bg-red-700 mr-1 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full"
          >
          💁 &nbsp; How to use
          </button>
          
        <button
          @click="goToAdd"
          class="float-right bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          ➕ &nbsp;Add campaign
        </button> -->

		<a-page-header style="border: 1px solid rgb(235, 237, 240)" title="My Campaigns" @back="() => null">
			<template slot="extra">
				<div class="extra">
					<a-button key="3" type="danger" size="large" @click="goToAdd()">
						<i class="fa fa-plus" style="margin-right:10px;"></i>
						Add Campaign
					</a-button>
						<a-button
            @click="dialogModal = true"

             key="4" type="primary" size="large">
							<i class="fa fa-exclamation" style="margin-right:10px;"></i>
							How to use
						</a-button>
				</div>
			</template>
		</a-page-header>

      </div>
      <div class="overflow-x-auto mt-5">
        <div>
          <grid
            searchTermColumn="name"
            :hidden-columns="hiddenColumns"
            :entity="entity"
                        :searchTerms="searchTerms"

          ></grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import grid from "@/components/grid";
import { getPlan } from "../../utils/actions";
import { getCount } from "../../api-front/api";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  async mounted() {
    this.isLoading = true
    await this.checkIfCanCreate();
    this.isLoading = false
  },
  methods: {
    goToAdd() {
      if (this.totalRegisters < this.plan.maxCampaigns) {
        this.$router.push("/campaign/add");
      } else {
        this.$warning({
          content: "Your plan does not allow you to create more campaigns.",
          title: "Limit exceeded"
          }
        );
      }
    },
    async checkIfCanCreate() {
      this.getPlan();
      var request = await getCount("campaigns");
      this.totalRegisters = request.data;
    },
    async getPlan() {
      var request = await getPlan(this.$auth.user.plan);

      this.currentPlan = request.data[0].name;

      let maxOutboundCallsDaily = request.data[0].maxOutboundCallsDaily;
      let maxSMSDaily = request.data[0].maxSMSDaily;
      let maxCampaigns = request.data[0].maxCampaigns;

      if (maxOutboundCallsDaily && maxOutboundCallsDaily && maxCampaigns) {
        this.plan.maxCampaigns = maxCampaigns;
        this.plan.maxOutboundCallsDaily = maxOutboundCallsDaily;
        this.plan.maxSMSDaily = maxSMSDaily;
      }
    },
  },
  components: {
    grid,
    Loading
  },
  data() {
    return {
      isLoading: true,
      dialogModal: false,
      searchTerms: [
        {
          searchEntity: 'name'
        }
      ],
      totalRegisters: 0,
      plan: {
        maxCampaigns: 0,
      },
      entity: "campaigns",
      entityAddURL: "/campaigns/add",
      hiddenColumns: [
        "created_at",
        "id",
        "updated_at",
        "number_sms",
        "deleted_at",
        "sip_domain_name",
        "numbers",
        "sms_message",
        "defaultExtension",
        "timezone",
      ],
    };
  },
};
</script>

<style>
  @media (max-width: 576px) {
	.extra {
		width: 100%;
		margin-left: 0;
		text-align: left;
	}

	.extra button {
		margin-bottom: 10px;
	}
}
</style>