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
		<a-page-header style="border: 1px solid rgb(235, 237, 240)" title="My Agents" @back="() => null">
			<template slot="extra">
				<div class="extra">
					<a-button key="3" type="danger" size="large" @click="goToAdd()">
						<i class="fa fa-plus" style="margin-right:10px;"></i>
						Add Agent
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
      <div class="my-2 flex sm:flex-row flex-col">
        <div class="flex flex-row mb-1 sm:mb-0"></div>
      </div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <grid
                                  :searchTerms="searchTerms"
            searchTermColumn="identifier"
            :hidden-columns="hiddenColumns"
            :entity="entity"
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
export default {
  components: {
    grid,
  },
  async mounted() {
    await this.checkIfCanCreate();
  },
  methods: {
    goToAdd() {

      if (this.totalRegisters < this.plan.maxAgents) {
        this.$router.push("/campaign/add-agent");
      } else {
        this.$alert(
          "Your plan does not allow you to create more agents.",
          "Limit exceeded",
          {
            confirmButtonText: "Ok, understand.",
            type: "warning",
            center: true,
          }
        );
      }
    },
    async checkIfCanCreate() {
      this.getPlan();
      var request = await getCount("agents");
      this.totalRegisters = request.data;
    },
    async getPlan() {
      var request = await getPlan(this.$auth.user.plan);

      this.currentPlan = request.data[0].name;
      var maxOutboundCallsDaily = request.data[0].maxOutboundCallsDaily;
      var maxSMSDaily = request.data[0].maxSMSDaily;
      var maxCampaigns = request.data[0].maxCampaigns;
      var maxAgents = request.data[0].maxAgents
      this.plan.maxAgents = maxAgents
      this.plan.maxCampaigns = maxCampaigns;
      this.plan.maxOutboundCallsDaily = maxOutboundCallsDaily;
      this.plan.maxSMSDaily = maxSMSDaily;
    },
  },
  data() {
    return {
      dialogModal: false,
      searchTerms: [
        {
          searchEntity: "identifier",
        }],
      totalRegisters: 0,
      plan: {
        maxAgents: 0,
      },
      entity: "agents",
      entityAddURL: "/campaigns/add-agent",
      hiddenColumns: [
        "created_at",
        "created",
        "updated_at",
        "id",
        'agent',
        "deleted_at"]
    }
  }
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
