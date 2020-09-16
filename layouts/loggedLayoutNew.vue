<template style="heigth:100%;">
<div style="heigth:100%;">

  <a-layout id="components-layout-demo-responsive">
    <a-layout-sider
      breakpoint="lg"
      v-model="collapsed"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <img style="padding:10px;filter: invert(1);" width="50%" src="https://jitto.io/text.png" alt="">
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1"  @click="goTo('dashboard')">
          <a-icon type="coffee" />
          <span class="nav-text">Dashboard</span>
        </a-menu-item>
        <a-menu-item key="2"  @click="goTo('campaign')">
          <a-icon type="video-camera" />
          <span class="nav-text">Campaigns</span>
        </a-menu-item>
        <a-menu-item v-if="IVR" key="3"  @click="goTo('ivr')">
          <a-icon type="menu" />
          <span class="nav-text">IVR</span>
        </a-menu-item>
        <a-menu-item key="4"  @click="goTo('statics')">
          <a-icon type="dollar" />
          <span class="nav-text">Balance</span>
        </a-menu-item>



                <a-menu-item key="6"                      @click="goTo('profile')"
>
          <a-icon type="user" />
          <span class="nav-text">   
             
 Profile <a-avatar v-if="$auth.user" style="margin-left:10px;margin-top:-3px;" size="small" :src="$auth.user.photo.url" /> </span>
        </a-menu-item>

                <a-menu-item key="5"                       @click="logout"
>
          <a-icon type="logout" />
          <span class="nav-text">Logout</span>
        </a-menu-item>

      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <keep-alive>
          <nuxt />
          </keep-alive>
        </div>
      </a-layout-content>
      <!-- <a-layout-footer style="textAlign: center">
        jitto.io ©2020
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
  </div>
</template>


<script>
import { getUserById } from "@/api-front/api";
import foot from "../components/landing/footer";
import { getPlan } from "../utils/actions";

export default {
  auth: true,
  components: {
    foot,
  },
  head: {
    link: [
      {
        rel: "stylesheet",
        defer: true,
        href: "https://use.fontawesome.com/releases/v5.5.0/css/all.css",
      },
    ],
  },
  async mounted() {
    if (!this.$auth.user) {
      this.$router.push("/login");
      return;
    }

    await this.$auth.fetchUser();

    if (!this.$auth.user.plan) {
      this.$router.push({ name: "pricing" });
      return;
    }
    await this.getUser();
    await this.getPlan();


  },
  data() {
    return {
      collapsed: false,
      IVR: false,
      voiceCalls: false,
      SMS: false,
      recordings: false,
      open: true,
      loading: true,
      imageUrl: null,
      dropdownVisible: 0,
    };
  },
  methods: {
    // isActive () {
    //   console.log("acceidendo")
    //   return  'hover:border-red-600'

    // },
    goTo(path) {

      this.$router.push({
        name: path,
      });
    },
    goToProfile() {
      this.$router.push({
        name: "profile",
      });
    },

    async getPlan() {
      var request = await getPlan(this.$auth.user.plan);
      var data = request.data[0];

      this.IVR = data.IVR;
      this.SMS = data.SMS;
      this.recordings = data.recordings;
      this.voiceCalls = data.voiceCalls;
    },

    isActive(toRoute) {
      if (this.$route.path.includes(toRoute)) {
        return true;
      } else {
        return false;
      }
    },
    onCollapse(collapsed, type) {

    },
    onBreakpoint(broken) {
      console.log(broken);
    },
    async getUser() {
      var response = await getUserById(this.$auth.user.id);
      if (response.status == 200) {
        this.form = response.data;
        if (response.data.avatar) {
          this.imageUrl = response.data.avatar.url;
        }
      }
    },
    logout() {
      this.$auth.logout()
    },
  },
};
</script>



<style>
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

#__nuxt {
  height:100%;
}

#__layout {
    height:100%;

}

#components-layout-demo-responsive {
  height:100%;
}

.anticon {
vertical-align: 0%;
}

</style>
