<template>
  <div class="mt-20" v-if="!loading">
    <nav id="header" class="fixed w-full z-30 top-0 text-white">
      <div
        class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2  bg-white"
      >
        <div class="pl-4 flex items-center">
          <a
            href="/"
            class="toggleColour no-underline hover:no-underline font-bold text-2xl lg:text-4xl text-white"
            ><img src="text.png" alt="" style="filter: brightness(0.25);"
          /></a>
        </div>

        <div
          id="nav-content"
          class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 lg:bg-transparent text-black p-4 lg:p-0 z-20 bg-gray-100"
        >
          <ul class="list-reset lg:flex justify-end flex-1 items-center"></ul>
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

    <div>
      <section>
        <div class="container max-w-full mx-auto py-6 px-6">
          <h1
            class="text-center text-4xl text-black font-medium leading-snug tracking-wider"
          >
            A flexible voice solution for your business
          </h1>
          <p class="text-center text-lg text-gray-700 mt-2 px-6">
            A flexible voice solution for your business
          </p>

          <div
            class="h-1 mx-auto bg-indigo-200 w-24 opacity-75 mt-4 rounded"
          ></div>

          <div class="max-w-full md:max-w-6xl mx-auto my-3 md:px-8">
            <div class="relative block flex flex-col md:flex-row items-center">
              <div
                v-if="plans[0]"
                class="w-11/12 max-w-sm sm:w-3/5 lg:w-1/3 sm:my-5 my-8 relative z-0 rounded-lg shadow-lg md:-mr-4"
              >
                <div
                  class="bg-white text-black rounded-lg shadow-inner shadow-lg overflow-hidden"
                >
                  <div
                    class="block text-left text-sm sm:text-md max-w-sm mx-auto mt-2 text-black px-8 lg:px-6"
                  >
                    <h1
                      class="text-lg font-medium uppercase p-3 pb-0 text-center tracking-wide"
                    >
                      {{ plans[0].name }}
                    </h1>
                    <h2 class="text-sm text-gray-500 text-center pb-6">
                      ${{ plans[0].price }}/user
                    </h2>

                    A flexible voice solution that’s easy to set up, integrate
                    and manage
                  </div>

                  <div class="flex flex-wrap mt-3 px-6">
                    <ul>
                      <li
                        class="flex items-center"
                        v-for="feature in plans[0].description.features"
                      >
                        <div
                          class=" rounded-full p-2 fill-current text-green-700"
                        >
                          <svg
                            class="w-6 h-6 align-middle"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        </div>
                        <span class="text-gray-700 text-lg ml-3">{{
                          feature
                        }}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="block flex items-center p-8  uppercase">
                    <button
                      @click="selectPlan(plans[0].id)"
                      class="mt-3 text-lg font-semibold 
	bg-black w-full text-white rounded-lg 
	px-6 py-3 block shadow-xl hover:bg-gray-700"
                    >
                      Start here
                    </button>
                  </div>
                </div>
              </div>
              <div
                v-if="plans[1]"
                class="w-full max-w-md sm:w-2/3 lg:w-1/3 sm:my-5 my-8 relative z-10 bg-white rounded-lg shadow-lg"
              >
                <div
                  class="text-sm leading-none rounded-t-lg bg-gray-200 text-black font-semibold uppercase py-4 text-center tracking-wide"
                >
                  Most Popular
                </div>
                <div
                  class="block text-left text-sm sm:text-md max-w-sm mx-auto mt-2 text-black px-8 lg:px-6"
                >
                  <h1
                    class="text-lg font-medium uppercase p-3 pb-0 text-center tracking-wide"
                  >
                    {{ plans[1].name }}
                  </h1>
                  <h2 class="text-sm text-gray-500 text-center pb-6">
                    <span class="text-3xl">${{ plans[1].price }}</span
                    >/user
                  </h2>
                  Advanced solution to help boost productivity and performance.
                </div>
                <div class="flex pl-12 justify-start sm:justify-start mt-3">
                  <ul>
                    <li
                      class="flex items-center"
                      v-for="feature in plans[1].description.features"
                    >
                      <div class="rounded-full p-2 fill-current text-green-700">
                        <svg
                          class="w-6 h-6 align-middle"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <span class="text-gray-700 text-lg ml-3">{{
                        feature
                      }}</span>
                    </li>
                  </ul>
                </div>

                <div class="block flex items-center p-8  uppercase">
                  <button
                    class="mt-3 text-lg font-semibold 
	bg-black w-full text-white rounded-lg 
	px-6 py-3 block shadow-xl hover:bg-gray-700"
                    @click="selectPlan(plans[1].id)"
                  >
                    Start here
                  </button>
                </div>
              </div>
              <div
                v-if="plans[2]"
                class="w-11/12 max-w-sm sm:w-3/5 lg:w-1/3 sm:my-5 my-8 relative z-0 rounded-lg shadow-lg md:-ml-4"
              >
                <div
                  class="bg-white text-black rounded-lg shadow-inner shadow-lg overflow-hidden"
                >
                  <div
                    class="block text-left text-sm sm:text-md max-w-sm mx-auto mt-2 text-black px-8 lg:px-6"
                  >
                    <h1
                      class="text-lg font-medium uppercase p-3 pb-0 text-center tracking-wide"
                    >
                      {{ plans[2].name }}
                    </h1>
                    <h2 class="text-sm text-gray-500 text-center pb-6">
                      ${{ plans[1].price }} /mo
                    </h2>

                    Customized package aligned with your business needs
                  </div>
                  <div class="flex flex-wrap mt-3 px-6">
                    <ul>
                      <li
                        class="flex items-center"
                        v-for="feature in plans[2].description.features"
                      >
                        <div
                          class="rounded-full p-2 fill-current text-green-700"
                        >
                          <svg
                            class="w-6 h-6 align-middle"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        </div>
                        <span class="text-gray-700 text-lg ml-3">{{
                          feature
                        }}</span>
                      </li>
                    </ul>
                  </div>

                  <div class="block flex items-center p-8  uppercase">
                    <button
                      onclick="$crisp.push(['do', 'chat:open'])"
                      class="mt-3 text-lg font-semibold 
	bg-black w-full text-white rounded-lg 
	px-6 py-3 block shadow-xl hover:bg-gray-700"
                    >
                      Contact us
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { getPlans } from "../utils/actions";

import generalCard from "../components/payment/generalCard";

export default {
  auth: true,
  data() {
    return {
      loading: true,
      plans: [],
    };
  },
  components: {
    generalCard,
  },
  methods: {
    logout() {
      this.$auth.logout().then(() => {
        this.$router.push({ name: "login" });
      });
    },
    selectPlan(plan) {
      console.log("plan", plan);
      this.$router.push({
        path: "payment/" + plan,
      });
    },
    setOrderPlan(prev, next) {
      if (prev.order > next.order) {
        return 1;
      }

      if (prev.order < next.order) {
        return -1;
      }

      return 0;
    },
  },
  async mounted() {
    await this.$auth.fetchUser();

    if (this.$auth.user.agent) {
      this.$router.push({
        name: "operator",
      });
      return      
    }


    if (this.$auth.user.plan && !this.$route.params.upgrade) {
      this.$router.push({
        name: "dashboard",
      });
    } else {
      this.loading = false;
    }

    let result = await getPlans();
    this.plans = result.data;

    this.plans.sort(this.setOrderPlan);

    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
};
</script>

<style>
.pricing .row-title {
  padding: 5%;
}

.pricing .row-content {
  margin-top: 20%;
}

.pricing .row-content .col .card {
  height: 460px;
  max-width: 320px;
}

.pricing .row-title .col .title {
  color: inherit;
  text-align: center;
  line-height: 1.1em;
  font-weight: 700;
  letter-spacing: -0.049375rem;
  text-transform: none;
  font-size: 50px;
}

.pricing .row-title .col .subtitle {
  color: #666;
  text-align: center;
  letter-spacing: -0.01125rem;
  font-weight: 400;
  text-transform: none;
  margin: 0px;

  font-size: 30px;
}

@media screen and (max-width: 765px) {
  .pricing .row-title {
    padding-left: 1%;
    padding-right: 1%;

    padding-bottom: 30px;
  }
}
</style>
