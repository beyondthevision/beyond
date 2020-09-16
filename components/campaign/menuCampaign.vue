<template>
  <div>
    <ul class="list-reset flex flex-col">

      <li
        class=" w-full h-full py-3 px-2 border-b border-light-border bg-white"
      >
      <nuxt-link to="/campaign/numbers">
          <a
            class="cursor-pointer font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline text-black hover:text-red-600"
          >
            <i class="fas fa-phone float-left mx-2"></i>
            Numbers
            <span><i class="fas fa-angle-right float-right"></i></span>
          </a>
        </nuxt-link>
      </li>


      <li
        class=" w-full h-full py-3 px-2 border-b border-light-border bg-white"
      >
        <nuxt-link to="/campaign/">
          <a
            class="cursor-pointer font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline text-black hover:text-red-600"
          >
            <i class="fas fa-list-alt float-left mx-2"></i>
            Campaigns
            <span><i class="fas fa-angle-right float-right"></i></span>
          </a>
        </nuxt-link>
      </li>

      <li
      v-if="VoiceCalls"
        class=" w-full h-full py-3 px-2 border-b border-light-border bg-white"
      >
        <nuxt-link to="/campaign/agents">
          <a
            class="cursor-pointer font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline text-black hover:text-red-600"
          >
            <i class="fas fa-tachometer-alt float-left mx-2"></i>
            Agents
            <span><i class="fas fa-angle-right float-right"></i></span>
          </a>
        </nuxt-link>
      </li>

      <nuxt-link to="/campaign/leads">
        <li class="w-full h-full py-3 px-2 border-b border-light-border">
          <a
            class="cursor-pointer font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline text-black hover:text-red-600"
          >
            <i class="fab fa-wpforms float-left mx-2"></i>
            Leads
            <span><i class="fa fa-angle-right float-right"></i></span>
          </a>
        </li>
      </nuxt-link>

      <nuxt-link v-if="SMS" to="/campaign/sms-inbox">
        <li class="w-full h-full py-3 px-2 border-b border-light-border">
          <a
            class="cursor-pointer font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline text-black hover:text-red-600"
          >
            <i class="fa fa-list float-left pr-2 mt-1 pl-2"></i>
            SMS Inbox
            <span><i class="fa fa-angle-right float-right"></i></span>
          </a>
        </li>
      </nuxt-link>

      <li
        v-if="VoiceCalls"
        class="w-full h-full py-3 px-2 border-b border-light-border"
      >
        <nuxt-link to="/campaign/logs">
          <a
            class="cursor-pointer font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline text-black hover:text-red-600"
          >
            <i class="fas fa-grip-horizontal float-left mx-2"></i>
            Call Logs
            <span><i class="fa fa-angle-right float-right"></i></span>
          </a>
        </nuxt-link>
      </li>
      <li
        v-if="recordings"
        class="w-full h-full py-3 px-2 border-b border-light-border"
      >
        <nuxt-link to="/campaign/recordings">
          <a
            class="cursor-pointer font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline text-black hover:text-red-600"
          >
            <i class="fas fa-table float-left mx-2"></i>
            Recordings
            <span><i class="fa fa-angle-right float-right"></i></span>
          </a>
        </nuxt-link>
      </li>

      <li
        v-if="webhooks"
        class="w-full h-full py-3 px-2 border-b border-light-border"
      >
        <nuxt-link to="/campaign/webhooks">
          <a
            class="cursor-pointer font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline text-black hover:text-red-600"
          >
            <i class="fas fa-code float-left mx-2"></i>
            API webhooks
            <span><i class="fa fa-angle-right float-right"></i></span>
          </a>
        </nuxt-link>
      </li>


    </ul>
  </div>
</template>

<script>
import { getPlan } from "../../utils/actions";
export default {
  async mounted() {
    await this.getPlan();
  },
  data () {
    return {
      IVR: false,
      webhooks: false,
      SMS: false,
      recordings: false,
      VoiceCalls: false
    }
  },
  methods: {
    async getPlan() {
      var request = await getPlan(this.$auth.user.plan);
      var data = request.data[0];

      this.IVR = data.IVR;
      this.SMS = data.SMS;
      this.webhooks = data.webhooks
      this.recordings = data.recordings;
      this.VoiceCalls = data.VoiceCalls;
    },
  },
};
</script>

<style lang="scss" scoped></style>
