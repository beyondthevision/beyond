<template>
  <div>
    <form>
		<a-row>

			<a-col :lg="{ span: 12 }" :xs="{ span: 24, offset: 0 }">

          <ul class="flex mb-0 list-none">
            <li v-if="selectedRegisterId" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <nuxt-link class="link-format" :to="'/campaign/add?id=' + selectedRegisterId">
                <a
                  class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-red-600 hover:text-black bg-white"
                >
                  <i class="fas fa-space-shuttle text-base mr-1"></i> General
                </a>
              </nuxt-link>
            </li>
            <li v-if="selectedRegisterId && type == 'sms'" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <nuxt-link class="link-format" :to="'/campaign/add/sms?id='+selectedRegisterId">
                <a
                  class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-red-600 hover:text-black bg-white"
                >
                  <i class="fas fa-cog text-base mr-1"></i> SMS Config
                </a>
              </nuxt-link>
            </li>
            <li v-if="selectedRegisterId && type == 'call'" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <nuxt-link class="link-format" :to="'/campaign/add/add-agents?id=' + selectedRegisterId">
                <a
                  class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-red-600 hover:text-black bg-white"
                >
                  <i class="fas fa-briefcase text-base mr-1"></i> Agents
                </a>
              </nuxt-link>
            </li>

            <li v-if="selectedRegisterId" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <nuxt-link class="link-format" :to="'/campaign/add/status?id=' + selectedRegisterId">
                <a
                  class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-red-600 hover:text-black bg-white"
                >
                  <i class="fas fa-info text-base mr-1"></i> Status
                </a>
              </nuxt-link>
            </li>


          </ul>
			</a-col>
		</a-row>
    </form>

    <nuxt></nuxt>
  </div>
</template>

<script>
import VueTimepicker from "vue2-timepicker";
import { saveCampaign, getById, updateCampaign } from "../../api-front/api";

export default {
  data () {
    return {
      // type: 'sms',
      type: 'call',
      selectedRegisterId: null
    }
  },
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
      this.defaultExtension = data.defaultExtension
    }

    // for get the pending get all leads from the campaign with finished off
    // for finished get all the pending leads from the campaign with finished on
    // for all leads get all leads per campaign

  },

};
</script>

<style lang="scss" scoped></style>
