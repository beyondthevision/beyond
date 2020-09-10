<template>
  <div>
        <loading :active.sync="isLoading" 
        :is-full-page="true"></loading>

    <main class="bg-white-300 flex-1 p-3">


      <div class="flex flex-wrap mt-5">
        <div class="w-full md:w-1/3 xl:w-1/3 pl-3">
          <!--Metric Card-->
          <div class="bg-white border rounded shadow p-2">
            <center>
              <h3 class="font-semibold">Your current balance is:</h3>
              <client-only>
                <apexchart
                  width="250"
                  type="radialBar"
                  :options="optionsMinutes"
                  :series="seriesBalance"
                ></apexchart>
              </client-only>
            </center>
          </div>
        </div>

        <div class="w-full md:w-1/3 xl:w-1/3 pl-3">
          <div class="bg-white border rounded shadow p-2">
            <h3 class="font-semibold">Add Balance in JITTO</h3>

 

            <label
              class="block tracking-wide text-gray-700 text-xs font-bold mb-2 mt-5"
              for="grid-first-name"
            >
              Ammount to Add
            </label>
            <input
              v-model="amount"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="$"
            />

            <button
              @click="pay"
              class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded mt-5"
              type="submit"
            >
              Checkout
            </button>
          </div>
        </div>

        <div class="w-full md:w-1/3 xl:w-1/3 pl-3">
          <div class="bg-white border rounded shadow p-2">
            <h3 class="font-semibold">¿What can I do with this balance?</h3>
            <div class="text-center py-2"></div>

            <ol class="list-disc list-inside">
              <li>Buy numbers</li>
              <li>Make calls</li>
              <li>Receive calls</li>
              <li>Send SMS</li>
            </ol>

            <p>
              We want you to have full control of your expenses. We will notify
              you when you have no balance.
            </p>
            <div class="text-center py-2"></div>

            <button
              @click="goMain()"
              class="text-blue-500 bg-transparent border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1"
              type="button"
              style="transition: all .15s ease"
            >
              See our prices
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { getBalance, addBalance } from "../../api-front/api";
import { Card, createToken } from "vue-stripe-elements-plus";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import logs from '../../api-front/logs';

export default {
    layout: 'loggedLayoutNew',
  async mounted() {
    await this.getBalance();
  },
  components: {
    Card,
    Loading
  },
  methods: {
    async getBalance() {
      const balance = await getBalance(this.$auth.user.id);
      this.balance = balance.data.balance;
      this.seriesBalance = [this.balance];
    },
    goMain () {

      this.$router.push("/")
    },
    async pay() {

      this.isLoading = true

      try {
       // const response = await createToken();
        //var token = response.token.id;

        let data = {
          //token: token,
          email: this.$auth.user.email,
          amount: parseInt(this.amount),
        };

        try {
          var resp = await addBalance(data);

          if (resp.data.status == "success") {

      			logs.sendLogInfo('ADDED BALANCE ' + this.$auth.user.email, data);

            this.isLoading = false
            this.$alert("Your balance was added to your account.", "Completed", {
              confirmButtonText: "CONTINUE",
              type: "success",
              center: true,
            });

            this.$router.push("/statics");
          }
        } catch (error) {

          console.log("error", error)
          this.isLoading = false

            this.$alert("Error on create the payment. Please check your credit card.", "ERROR", {
              confirmButtonText: "CONTINUE",
              type: "error",
              center: true,
            });

          console.log("error", error)

        }
      } catch (error) {
        this.isLoading = false
        console.log("error", error);
      }

    },
  },
  data() {
    return {
      isLoading:false,
      amount: 0,
      complete: false,
      stripeOptions: {
        style: {
          base: {
            fontFamily: "arial",
          },
        },
        // see https://stripe.com/docs/stripe.js#element-options for details
      },
      seriesBalance: [0],
      seriesSMS: [10],
      optionsMinutes: {
        chart: {
          height: 350,
          type: "radialBar",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24,
              },
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35,
              },
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: "#888",
                fontSize: "17px",
              },
              value: {
                formatter: function(val) {
                  return parseInt(val);
                },
                color: "#111",
                fontSize: "36px",
                show: true,
              },
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#ABE5A1"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: "round",
        },
        labels: ["USD"],
      },
    };
  },
};
</script>
