<template>
	<div>


		<a-page-header style="border: 1px solid rgb(235, 237, 240);margin-bottom:10px;" :title="'Pay Request'">

		</a-page-header>
		<loading :active.sync="isLoading" :is-full-page="true"></loading>

<div class="flex flex-col">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">


        <div class="p-1">
              <a-input-search  v-model="searchInput" placeholder="Search by email." enter-button @search="onSearch" />

        </div>

        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Pay Amt
              </th>

          <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Pay Mode
              </th>

          <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Transfer
              </th>

          <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Transfer Time
              </th>

              <th class="px-6 py-3 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody >
            <!-- Odd row -->
            <tr class="bg-white" :key="payment.id" v-for="payment in payments">
              <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                 {{payment.id}}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                {{formatDate(payment.transferTime)}}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {{payment.email}}

              </td>
			  <td>                {{payment.phone}}</td>
			  <td>{{payment.payAmt}}</td>
              <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
               {{payment.payMode}}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
				  {{formatDate(payment.transferTime)}}
			  </td>
              <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                <a-button @click="goToTransfer(payment.id)" class="text-indigo-600 hover:text-indigo-900">Transfer</a-button>
              </td>
            </tr>


            <!-- More rows... -->
          </tbody>
        </table>

      <div class="mt-5 mb-5" v-if="showLoadMore">
          <center>
          <a-button  type="dashed" @click="loadMore">
            <i class="fa fa-plus" style="margin-right:10px;"></i> 
           
            Load More</a-button>

  </center>

      </div>

      </div>
    </div>
  </div>
</div>


	</div>
</template>

<script>
import * as moment from 'moment-timezone';


import Vue from 'vue';


import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';



export default {
  data () {
    return {
      showLoadMore: true,
      payments: [],
      isLoading: false,
      searchInput: '',
      offset: 0
    }
  },
  components: {
    Loading
  },
  methods: {
    goToTransfer (id) {
      this.$router.push('/add-transfer?id=' + id)
    },
    loadMore () {

      this.offset = this.offset + 5
      this.getData()      
    },
    onSearch () {
        this.payments = []
        this.getData()
    },
    formatDate (v) {
return moment
            .utc(v)
            .tz("Asia/Kolkata")
            .format("YYYY-MM-DD HH:mm A");
    },
        async getData () {
          this.isLoading = true
      var response = await this.$axios.get('/pay-requests?_limit=5&_start=' + this.offset + '&email_contains=' + this.searchInput)
      this.showLoadMore = false
      console.log(response.data)
      if (response.data.length > 0) {
        this.payments.push.apply(this.payments, response.data);
        this.showLoadMore = true
      }
      this.isLoading = false
    },
  },

  async mounted() {
    await this.getData();

  }
};
</script>

<style>


