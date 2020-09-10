<template>
  <div>
    <nav id="header" class="fixed w-full z-30 top-0 text-white">
      <div
        class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2"
      >
        <div class="pl-4 flex items-center">
          <!-- <a
            href="#"
            class="toggleColour no-underline hover:no-underline font-bold text-2xl lg:text-4xl text-white"
            ><img src="text.png" alt="" style="filter: brightness(0.25);"
          /></a> -->
        </div>
        <div class="block lg:hidden pr-4">
          <button
            id="nav-toggle"
            class="flex items-center p-1 text-orange-800 hover:text-gray-900"
          >
            <svg
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              class="fill-current h-6 w-6"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <div
          id="nav-content"
          class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 lg:bg-transparent text-black p-4 lg:p-0 z-20 bg-gray-100"
        >
          <ul class="list-reset lg:flex justify-end flex-1 items-center">
          
          </ul>
          <button
            @click="logout"
            id="navAction"
            class="mx-auto lg:mx-0 hover:underline font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 bg-white text-gray-800"
          >
            Logout
          </button>
        </div>
      </div>
      <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
<div class="pt-24">

    <nuxt />
</div>
  </div>
</template>

<script>
import { login, header } from "../utils/textConfig";
import defaultAvatar from "../assets/media/avatars/profile.png";
import { Loading } from "element-ui";
import _ from "lodash";

export default {
  async mounted() {
    await this.$auth.fetchUser();
    this.loading = true;
    this.navFocus();


	var scrollpos = window.scrollY;
	var header = document.getElementById("header");
	var navcontent = document.getElementById("nav-content");
	var navaction = document.getElementById("navAction");
	var brandname = document.getElementById("brandname");
	var toToggle = document.querySelectorAll(".toggleColour");

	document.addEventListener('scroll', function() {

	/*Apply classes for slide in bar*/
	scrollpos = window.scrollY;

    if(scrollpos > 10){
      header.classList.add("bg-white");
	  navaction.classList.remove("bg-white");
	  navaction.classList.remove("text-gray-800");
	 // navaction.classList.add("text-white");
	  //Use to switch toggleColour colours
  	  for (var i = 0; i < toToggle.length; i++) {
	     toToggle[i].classList.add("text-gray-800");
		 //toToggle[i].classList.remove("text-white");
	  }
	  header.classList.add("shadow");
	  navcontent.classList.remove("bg-gray-100");
	  navcontent.classList.add("bg-white");
    }
    else {
	  header.classList.remove("bg-white");
	  navaction.classList.remove("gradient");
	  navaction.classList.add("bg-white");
	  navaction.classList.remove("text-white");
	  navaction.classList.add("text-gray-800");
	  //Use to switch toggleColour colours
  	  for (var i = 0; i < toToggle.length; i++) {
	    // toToggle[i].classList.add("text-white");
		 toToggle[i].classList.remove("text-gray-800");
	  }
	  
	  header.classList.remove("shadow");
	  navcontent.classList.remove("bg-white");
	  navcontent.classList.add("bg-gray-100");
	  
    }

	});

  },
  methods: {
    changeMenu(item) {
      if (item.label == "Overview") {
        this.$router.push({ name: "index" });
        //window.location.href = "/"
      }

      if (item.label == "Campaign") {
        this.$router.push({ name: "campaign" });
      }

      if (item.label == "Settings") {
        this.$router.push({ name: "user" });
      }
    },
    hideNav() {
      let pages = [
        "termsConditions",
        "payment",
        "pricing",
        "changePlan",
        "changeCreditCard",
      ];

      let show = true;

      pages.forEach((page) => {
        if (page === this.$route.name) show = false;
      });

      if ("setting-help" === this.$route.name) {
        this.activeTab = "settings";
      }

      return show;
    },
    resetStyle() {
      let body = document.getElementsByTagName("body")[0];
      body.className = "";
    },
    isActive(link) {
      let active = this.$route.name === link;
      return active;
    },
    logout() {
      this.$auth.logout().then(() => {
        this.$router.push({ name: "login" });
      });
    },
    navFocus() {
      switch (this.$route.name) {
        case "index":
          this.activeTab = "overview";
          break;

        case "campaign":
          this.activeTab = "campaign";
          break;

        case "user":
          this.activeTab = "settings";
          break;
        default:
          break;
      }
    },
  },
  watch: {
    $route: {
      handler(to, from) {},
      immediate: true,
    },
  },
  data() {
    return {
      loading: false,
      activeTab: "overview",
      imgProfile: "",
      companyName: login.title,
      headerConfig: header,
      hideSettings: true,
      username: "",
      message: "error",
      defaultAvatar,
      isZoho: false,
    };
  },
};
</script>

<style>
body {
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
}

.el-tabs__item.is-active {
  color: #000000 !important;
}

.el-tabs__active-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: #000000;
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  list-style: none;
}

.el-tabs__item:hover {
  color: #000000;
  cursor: pointer;
}

.setting-spacing {
  display: grid;
  grid-template-columns: 1fr 6fr;
}

.settings-forms {
  padding: 0px 30px;
}

.card {
  padding: 0px !important;
}

.profile-img {
  width: 35px;
  height: 35px;
  border-radius: 50px;

  object-fit: cover;
  object-position: center right;
}

.active {
  color: black !important;
  padding-bottom: 3px;
  border-bottom: 1px solid #000;
}

.active-latteral > li > a {
  color: black !important;
}

.title-nav > a > img {
  cursor: pointer;
  width: 50px;
  height: 30px;
  object-fit: cover;
  object-position: center;
}

.btn-dark {
  background-color: #000 !important;
}

.btn-dark:hover {
  background-color: #343a40 !important;
}

.title-nav > a {
  color: black;
}

.title-nav > a:hover {
  text-decoration: none;
  color: black;
}

.username {
  padding-right: 10px;
  text-transform: capitalize;
}

.row {
  margin: 0 !important;
}

.main-nav {
  padding-bottom: 20px !important;

  height: 48px;
  position: relative;
  overflow: hidden;
}

.profile-bar {
  padding-bottom: 0px !important;
}

.nav-items > * {
  text-align: center;
  color: #cccccc;
}

.max-width {
  display: flex;
  max-width: 1040px;
  margin: auto;
  padding: 0 20px;
}

.nav-width {
  margin: auto;
  max-width: 1024px;
  padding-top: 20px;
  align-items: center;
}

.nav-link {
  color: #666;
}

.nav-link:hover {
  color: black;
}

.nav-link:active {
  color: black;
  font-weight: bold;
}

.vertical {
  padding-left: 20px;
}

@media screen and (max-width: 765px) {
  .main-cont {
    padding-left: 20px;
    padding-right: 20px;
  }

  .username {
    display: none;
  }

  .dropdown-menu {
    position: absolute !important;
  }

  .setting-spacing {
    display: block;
  }
}
</style>
