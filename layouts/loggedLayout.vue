<template>
  <div>
    <nav id="header" class="bg-white fixed w-full z-10 top-0 shadow">
      <div
        class="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0"
      >
        <div class="w-1/2 pl-2 md:pl-0">
          <a
            class="text-gray-900 text-base xl:text-xl no-underline hover:no-underline font-bold"
            href="#"
          >
            <img width="90" src="/text.png" alt="" />
          </a>
        </div>
        <div class="w-1/2 pr-0">
          <div class="flex relative inline-block float-right">
            <div class="relative text-sm">
              <button
                id="userButton"
                class="flex items-center focus:outline-none mr-3"
              >
                                <img @click="goToProfile" style="width:30px;height:30px;margin-right:10px;border-radius:20px;" :src="$auth.user.photo.url" alt="">

                <span style="display:inline;" class="hidden md:inline-block" v-if="$auth.user"
                  >
                   Hi, {{ $auth.user.username }}
                </span>
                <svg
                  class="pl-2 h-2"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 129 129"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  enable-background="new 0 0 129 129"
                >
                  <g>
                    <path
                      d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"
                    />
                  </g>
                </svg>
              </button>
              <div
                id="userMenu"
                class="bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 invisible"
              >
                <ul class="list-reset">
                  <li>
                    <a
                      @click="goToProfile"
                      class="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline cursor-pointer"
                      >My account</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      @click="logout"
                      class="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                      >Logout</a
                    >
                  </li>
                </ul>
              </div>
            </div>

            <div class="block lg:hidden pr-4">
              <button
                id="nav-toggle"
                class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-teal-500 appearance-none focus:outline-none"
              >
                <svg
                  class="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white z-20"
          id="nav-content"
        >
          <ul class="list-reset lg:flex flex-1 items-center px-4 md:px-0">
            <li class="mr-6 my-2 md:my-0">
              <a
                @click="goTo('dashboard')"
                href="#"
                v-bind:class="{ 'border-red-600': isActive('dashboard') }"
                class="block py-1 md:py-3 pl-1 align-middle text-red-600 no-underline hover:text-gray-900 border-b-2"
              >
                <i class="fas fa-home fa-fw mr-3 text-red-600"></i
                ><span class="pb-1 md:pb-0 text-sm">Dashboard</span>
              </a>
            </li>
            <li class="mr-6 my-2 md:my-0">
              <a
                @click="goTo('campaign')"
                href="#"
                v-bind:class="{ 'border-pink-600': isActive('campaign') }"
                class="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-pink-500"
              >
                <i class="fas fa-list-ol fa-fw mr-3"></i
                ><span class="pb-1 md:pb-0 text-sm">Campaigns</span>
              </a>
            </li>
            <li v-if="IVR" class="mr-6 my-2 md:my-0">
              <a
                @click="goTo('ivr')"
                href="#"
                v-bind:class="{ 'border-purple-600': isActive('ivr') }"
                class="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-purple-500"
              >
                <i class="fas fa-phone fa-fw mr-3"></i
                ><span class="pb-1 md:pb-0 text-sm">IVR</span>
              </a>
            </li>
            <li class="mr-6 my-2 md:my-0">
              <a
                @click="goTo('statics')"
                href="#"
                v-bind:class="{ 'border-green-600': isActive('statics') }"
                class="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-green-500"
              >
                <i class="fas fa-city mr-3"></i
                ><span class="pb-1 md:pb-0 text-sm">Use statics</span>
              </a>
            </li>
          </ul>

          <div class="relative pull-right pl-4 pr-4 md:pr-0"></div>
        </div>
      </div>
    </nav>

    <div class=" h-full">
      <nuxt />
    </div>
    <!--
    <div class="bg-white border-t border-gray-400 shadow">
      <foot> </foot>
    </div>
    -->
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
        href: "https://use.fontawesome.com/releases/v5.3.1/css/all.css",
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

    var userMenuDiv = document.getElementById("userMenu");
    var userMenu = document.getElementById("userButton");

    var navMenuDiv = document.getElementById("nav-content");
    var navMenu = document.getElementById("nav-toggle");

    document.onclick = check;

    function check(e) {
      var target = (e && e.target) || (event && event.srcElement);

      //User Menu
      if (!checkParent(target, userMenuDiv)) {
        // click NOT on the menu
        if (checkParent(target, userMenu)) {
          // click on the link
          if (userMenuDiv.classList.contains("invisible")) {
            userMenuDiv.classList.remove("invisible");
          } else {
            userMenuDiv.classList.add("invisible");
          }
        } else {
          // click both outside link and outside menu, hide menu
          userMenuDiv.classList.add("invisible");
        }
      }

      //Nav Menu
      if (!checkParent(target, navMenuDiv)) {
        // click NOT on the menu
        if (checkParent(target, navMenu)) {
          // click on the link
          if (navMenuDiv.classList.contains("hidden")) {
            navMenuDiv.classList.remove("hidden");
          } else {
            navMenuDiv.classList.add("hidden");
          }
        } else {
          // click both outside link and outside menu, hide menu
          navMenuDiv.classList.add("hidden");
        }
      }
    }

    function checkParent(t, elm) {
      while (t.parentNode) {
        if (t == elm) {
          return true;
        }
        t = t.parentNode;
      }
      return false;
    }
  },
  data() {
    return {
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
