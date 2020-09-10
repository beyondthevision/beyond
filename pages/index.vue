<template>
  <div>

        <loading :active.sync="isLoading" 
        :is-full-page="true"></loading>

    <div
      class="select-text leading-normal tracking-normal text-white gradient"
      style="font-family: 'Source Sans Pro', sans-serif;"
    >
      <!--Nav-->
      <nav id="header" class="fixed w-full z-30 top-0 text-white">
        <div
          class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2"
        >
          <div class="pl-4 flex items-center">
            <a
              class="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            >
              <img style="filter: brightness(0.25); cursor:pointer;" src="text.png" alt="" />
            </a>
          </div>

          <!-- <div class="block lg:hidden pr-4">
            <button
              id="nav-toggle"
              class="flex items-center p-1 text-orange-800 hover:text-gray-900"
            >
              <svg
                class="fill-current h-6 w-6"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div> -->

          <div
            class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
            id="nav-content"
          >
            <ul class="list-reset lg:flex justify-end flex-1 items-center">
              <li class="mr-3">
                <a
                  class="cursor-pointer inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                  @click="goToPricing"
                  >Pricing</a
                >
              </li>
              <li class="mr-3">
                <a
                  style="cursor:pointer;"
                  class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                  @click="goToFeatures"
                  >Features</a
                >
              </li>
              <li class="mr-3">
                <a
                  style="cursor:pointer;"
                  class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                  @click="goToRegister"
                  >Register</a
                >
              </li>
            </ul>
            <button
              @click="login"
              id="navAction"
              class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75"
            >
              Login
            </button>
          </div>
        </div>

        <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
      </nav>

      <!--Hero-->
      <div class="pt-24">
        <div
          class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center"
        >
          <!--Left Col-->
          <div
            class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left"
          >
            <p class="uppercase tracking-loose w-full">
              <vue-typer :repeat="0" text='The virtual business telephony that adapts to your business'></vue-typer>

            </p>
            <h1 style="color: white !important;" class="my-4 text-5xl font-bold leading-tight">
              Innovative phone system for modern business.!
            </h1>
            <p class="leading-normal text-2xl mb-2">
              Easy to setup, Easy to integrate cloud based phone system for
              calling and messaging.
            </p>

            <div             class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left" style="display:inline;">
         <button
              style="display:inline;"
              @click="goToRegister"
              class="mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full my-6 py-3 px-4 shadow-lg"
            >
              Join Us
            </button>

            <button
              style="display:inline;"
              @click="login"
              class="mx-auto lg:mx-0 bg-orange-200 text-gray-800 font-bold rounded-full my-6 py-3 px-4 shadow-lg"
            >
              or Login!
            </button>
            </div>
   

          </div>
          <!--Right Col-->
          <div class="w-full md:w-3/5 py-6 text-center">
            <img class="w-full md:w-4/5 z-50" src="untitled5.svg" />
          </div>
        </div>
      </div>

      <div class="relative -mt-12 lg:-mt-24">
        <svg
          viewBox="0 0 1428 174"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g
              transform="translate(-2.000000, 44.000000)"
              fill="#FFFFFF"
              fill-rule="nonzero"
            >
              <path
                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                opacity="0.100000001"
              ></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path
                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                id="Path-4"
                opacity="0.200000003"
              ></path>
            </g>
            <g
              transform="translate(-4.000000, 76.000000)"
              fill="#FFFFFF"
              fill-rule="nonzero"
            >
              <path
                d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"
              ></path>
            </g>
          </g>
        </svg>
      </div>

      <section class="bg-white border-b py-8">
        <div class="container max-w-5xl mx-auto m-8">
          <h1
            class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
          >
Get your cloud based phone system increasing your productivity
          </h1>
          <div class="w-full mb-4">
            <div
              class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"
            ></div>
          </div>

          <div class="flex flex-wrap">
            <div class="w-5/6 sm:w-1/2 p-6">
              <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3">
                Easy to set up
              </h3>
              <p class="text-gray-600 mb-8">
                Cloud call center solution that is ready to go, with sms enabled
                to make it easier to communicate with customers in a meaningful
                way. <br /><br />


<h2>Get the cloud-based phone system that remote teams use to stay connected and seamlessly work from home or anywhere.</h2>


              </p>
            </div>
            <div class="w-full sm:w-1/2 p-6">
              <img class="w-full md:w-4/5 z-50" src="work.jpg" alt="">

            </div>
          </div>

          <div class="flex flex-wrap flex-col-reverse sm:flex-row">
            <div class="w-full sm:w-1/2 p-6 mt-6">
               <img class="w-full md:w-5/5 z-50" src="salesforce2.png" alt="">
            </div>
            <div class="w-full sm:w-1/2 p-6 mt-6">
              <div class="align-middle">
                <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3">
                  Connect to your favorite tools
                </h3>
                <p class="text-gray-600 mb-8">
                  Integrate Jitto with your best loved CRM systems to enable all
                  call logs and messaging to be stored in your CRM. <br /><br />
                  The system have webhooks and templates for connect and integrate 
                  with other services. Your IVR have supper powers!
                  You can create custom dashboards in datastudio with your data and have your own metrics. <br>
                  Also you can for example create your own IVR bot.

Calls go better when all the right info is tied together in the cloud. Integrate Aircall with CRM systems, Helpdesk solutions, and other essential apps.
<br>
<h2>"For a business development team, fast and easy dials are absolutely necessary. It directly impacts our velocity, and the volume of business we create and close. "</h2><b>
</b>


                </p>
              </div>
            </div>
          </div>
          <div id="features"></div>
        </div>
      </section>

      <section class="bg-white border-b py-8">
        <div class="container mx-auto flex flex-wrap pt-4 pb-12">
          <h1
            class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
          >
            Enable productivity
          </h1>
          <div class="w-full mb-4">
            <div
              class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"
            ></div>
          </div>

          <div class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div
              class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow"
            >
              <a

                class="flex flex-wrap no-underline hover:no-underline"
              >
                <p class="w-full text-gray-600 text-xs md:text-sm px-6">
                  GETTING STARTED
                </p>
                <div class="w-full font-bold text-xl text-gray-800 px-6">
                  Modern interactive IVR system
                </div>
                <p class="text-gray-800 text-base px-6 mb-5">
                  Build a personalized customer experience by smart call routing
                  to reduce operational costs and increase customer
                  satisfaction.
                </p>
              </a>
            </div>
            <div
              class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6"
            >
              <div class="flex items-center justify-start">
                <button
                  @click="dialogModal1 = true"
                  class="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg"
                >
                  Show tutorial
                </button>
              </div>
            </div>
          </div>

          <div class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div
              class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow"
            >
              <a

                class="flex flex-wrap no-underline hover:no-underline"
              >
                <p class="w-full text-gray-600 text-xs md:text-sm px-6">
                  GETTING STARTED
                </p>
                <div class="w-full font-bold text-xl text-gray-800 px-6">
                  Increase your sales
                </div>
                <p class="text-gray-800 text-base px-6 mb-5">
                  Increase your sales using Jitto power dialer and click to dial
                  capabilities to increase business volume and velocity.
                </p>
              </a>
            </div>
            <div
              class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6"
            >
              <div class="flex items-center justify-center">
                <button
                  @click="dialogModal2 = true"
                  class="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg"
                >
                  Show tutorial
                </button>
              </div>
            </div>
          </div>

          <div class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div
              class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow"
            >
              <a

                class="flex flex-wrap no-underline hover:no-underline"
              >
                <p class="w-full text-gray-600 text-xs md:text-sm px-6">
                  GETTING STARTED
                </p>
                <div class="w-full font-bold text-xl text-gray-800 px-6">
                  Programmable SMS
                </div>
                <p class="text-gray-800 text-base px-6 mb-5">
                  Send and receive texts to enable you teams to communicate with
                  customers in a way they want to be reached.
                </p>
              </a>
            </div>
            <div
              class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6"
            >
              <div class="flex items-center justify-end">
                <button
                  @click="dialogModal3 = true"
                  class="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg"
                >
                  Show tutorial
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-gray-100 py-8" v-if="plans.length > 0">
        <div
          id="pricing"
          class="container mx-auto px-2 pt-4 pb-12 text-gray-800"
        >
          <h1
            class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
          >
            Pricing
          </h1>


          <div class="w-full mb-4">
            <div
              class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"
            ></div>
          </div>

          <div
            class="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4"
          >
            <div
              class="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4"
            >
              <div
                class="flex-1 bg-white text-gray-600 rounded-t rounded-b-none overflow-hidden shadow"
              >
                <div class="p-8 text-3xl font-bold text-center border-b-4">
                  {{ plans[0].name }}


                </div>
                <ul class="w-full text-center text-sm">
                  <li v-for="feature in plans[0].description.features" class="border-b py-4">{{feature}}</li>

                  <li style="color:black;font-weight:bold;" class="py-4">
                    <h2><a href="/compare">Compare!</a></h2></li>


                </ul>
              </div>
              <div
                class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6"
              >
                <div
                  class="w-full pt-6 text-3xl text-gray-600 font-bold text-center"
                >
                  Always $ {{ plans[0].price }}! <span class="text-base"></span>
                </div>
                <div class="flex items-center justify-center">
                  <button
                    @click="goToRegister"
                    class="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg"
                  >
                    Sign Up
                  </button>


                  
                </div>
              </div>
            </div>

            <div
              class="flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-lg bg-white mt-4 sm:-mt-6 shadow-lg z-10"
            >
              <div
                class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow"
              >
                <div class="w-full p-8 text-3xl font-bold text-center">
                  {{ plans[1].name }}
                </div>
                <div class="h-1 w-full gradient my-0 py-0 rounded-t"></div>
                <ul class="w-full text-center text-base font-bold">
                  <li  v-for="feature in plans[1].description.features" class="border-b py-4">{{
                      feature
                    }}</li>

              <li style="color:black;font-weight:bold;" class="py-4">
                    <h2><a href="/compare">Compare!</a></h2></li>

                </ul>
              </div>
              <div
                class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6"
              >
                <div class="w-full pt-6 text-4xl font-bold text-center">
                  ${{ plans[1].price }} <span class="text-base">/ per user</span>
                </div>
                <div class="flex items-center justify-center">
                  <button
                                    @click="goToRegister"

                    class="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>

            <div
              class="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4"
            >
              <div
                class="flex-1 bg-white text-gray-600 rounded-t rounded-b-none overflow-hidden shadow"
              >
                <div class="p-8 text-3xl font-bold text-center border-b-4">
                   {{ plans[2].name }}
                </div>
                <ul class="w-full text-center text-sm">
                  <li                     v-for="feature in plans[2].description.features"
 class="border-b py-4">{{
                      feature
                    }}</li>


              <li style="color:black;font-weight:bold;" class="py-4">
                    <h2><a href="/compare">Compare!</a></h2></li>

                </ul>
              </div>
              <div
                class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6"
              >
                <div
                  class="w-full pt-6 text-3xl text-gray-600 font-bold text-center"
                >
                   Custom features</span>
                </div>
                <div class="flex items-center justify-center">
                  <button
                    class="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg"
                  >
                    Contact us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Change the colour #f8fafc to match the previous section colour -->
      <svg
        class="wave-top"
        viewBox="0 0 1439 147"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-1.000000, -14.000000)" fill-rule="nonzero">
            <g class="wave" fill="#f8fafc">
              <path
                d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"
              ></path>
            </g>
            <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
              <g
                transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) "
              >
                <path
                  d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                  opacity="0.100000001"
                ></path>
                <path
                  d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                  opacity="0.100000001"
                ></path>
                <path
                  d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                  opacity="0.200000003"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>

      <section class="container mx-auto text-center py-6 mb-12">
        <h1 
          style="color: white !important;"
          class="w-full my-2 text-5xl font-bold leading-tight text-center text-white"
        >
          Innovative phone system for modern business.
        </h1>
        <div class="w-full mb-4">
          <div
            class="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"
          ></div>
        </div>

        <h3 class="my-4 text-3xl leading-tight" style="padding:5px;">
          Innovative phone system for modern business.!
        </h3>

        <button
                          @click="goToRegister"

          class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg"
        >
          Sign up!
        </button>
      </section>





    <a-modal
      title="How to use"
	  on-ok="dialogModal1 = false"
      :visible="dialogModal1"
	v-model="dialogModal1"
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

    <a-modal
      title="How to use"
	  on-ok="dialogModal2 = false"
      :visible="dialogModal2"
	v-model="dialogModal2"
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

    <a-modal
      title="How to use"
	  on-ok="dialogModal3 = false"
      :visible="dialogModal3"
	v-model="dialogModal3"
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







     
      <foot></foot>

    </div>
  </div>
</template>

<script>
import { VueTyper } from 'vue-typer'
import { getPlans } from "../utils/actions";
import foot from '../components/landing/footer'
import logs from '../api-front/logs'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  data() {
    return {
      isLoading: true,
      dialogModal1: false,
      dialogModal2: false,
      dialogModal3: false,
      plans: [],
    };
  },
  components: {
    foot,
    VueTyper,
    Loading
  },
  methods: {
    async getData() {
      let result = await getPlans();
      this.plans = result.data;
      this.plans.sort(this.setOrderPlan);
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
    goToFeatures () {
  var i = 1800;
  var int = setInterval(function() {
    window.scrollTo(0, i);
    i += 10;
    if (i >= 200) clearInterval(int);
  }, 20);
    },
    goToPricing () {
    
  var i = 2200;
  var int = setInterval(function() {
    window.scrollTo(0, i);
    i += 10;
    if (i >= 200) clearInterval(int);
  }, 20);

    },
    goPrivacy() {
      this.$router.push({
        path: "privacy",
      });
    },
    goToRegister() {

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

      logs.sendLogInfo('CLICK IN JOIN US', {
        vw,
        vh
      })

      this.$router.push({
        path: "register",
      });
    },
    login() {
      this.$router.push({
        path: "login",
      });
    },
  },
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700",
      },
    ],
  },

  async mounted() {
     //await  this.$auth.fetchUser()
    setTimeout(() => {
      this.isLoading = false
    },1000)

    // setTimeout(() => {
    //   $crisp.push(['do', 'chat:open'])
    // }, 10000)


    this.getData();
    var scrollpos = window.scrollY;
    var header = document.getElementById("header");
    var navcontent = document.getElementById("nav-content");
    var navaction = document.getElementById("navAction");
    var brandname = document.getElementById("brandname");
    var toToggle = document.querySelectorAll(".toggleColour");

    document.addEventListener("scroll", function() {
      /*Apply classes for slide in bar*/
      scrollpos = window.scrollY;

      if (scrollpos > 10) {
        header.classList.add("bg-white");
        navaction.classList.remove("bg-white");
        navaction.classList.add("gradient");
        navaction.classList.remove("text-gray-800");
        navaction.classList.add("text-white");
        //Use to switch toggleColour colours
        for (var i = 0; i < toToggle.length; i++) {
          toToggle[i].classList.add("text-gray-800");
          toToggle[i].classList.remove("text-white");
        }
        header.classList.add("shadow");
        navcontent.classList.remove("bg-gray-100");
        navcontent.classList.add("bg-white");
      } else {
        header.classList.remove("bg-white");
        navaction.classList.remove("gradient");
        navaction.classList.add("bg-white");
        navaction.classList.remove("text-white");
        navaction.classList.add("text-gray-800");
        //Use to switch toggleColour colours
        for (var i = 0; i < toToggle.length; i++) {
          toToggle[i].classList.add("text-white");
          toToggle[i].classList.remove("text-gray-800");
        }

        header.classList.remove("shadow");
        navcontent.classList.remove("bg-white");
        navcontent.classList.add("bg-gray-100");
      }
    });
  },
};
</script>

<style>
.gradient {
  background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
}
/* html {
  background-color: #edf2f7;
} */
</style>
