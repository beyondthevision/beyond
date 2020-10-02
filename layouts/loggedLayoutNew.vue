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
      <img style="padding:10px;filter: invert(1);"  src="/text1.png" alt="">
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1"  @click="goTo('dashboard')">
          <a-icon type="coffee" />
          <span class="nav-text">Dashboard</span>
        </a-menu-item>
        <a-menu-item key="2"  @click="goTo('add-store')">
          <a-icon type="plus" />
          <span class="nav-text">Add store</span>
        </a-menu-item>
        <a-menu-item  key="3"  @click="goTo('stores')">
          <a-icon type="shop" />
          <span class="nav-text">Stores</span>
        </a-menu-item>
        
        <a-menu-item  key="4"  @click="goTo('categories')">
          <a-icon type="menu" />
          <span class="nav-text">Categories</span>
        </a-menu-item>

        <a-menu-item  key="5"  @click="goTo('categories-add')">
          <a-icon type="menu" />
          <span class="nav-text">Add Category</span>
        </a-menu-item>

        <a-menu-item key="6"  @click="goTo('users')">
          <a-icon type="dollar" />
          <span class="nav-text">Users</span>
        </a-menu-item>




                <a-menu-item key="7"                       @click="logout"
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


    await this.getUser();


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

.ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
    background-color: #000000;
}

</style>
