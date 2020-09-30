<template>
    <div>

		<a-page-header style="border: 1px solid rgb(235, 237, 240);margin-bottom:10px;" :title="'Stores'">

		</a-page-header>


<div class="flex flex-col">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Stores
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Logo
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Website
              </th>

          <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Pay Mode
              </th>

          <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>

          <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
               Action
              </th>

          <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
               Offer
              </th>

         <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
               Time
              </th>

              <th class="px-6 py-3 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody>
            <!-- Odd row -->
            <tr v-for="store in stores" class="bg-white">
              <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                {{store.id}}
              </td>
  
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
              {{store.name}}
              </td>

                          <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                {{store.website}}
              </td>


                          <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                               {{store.payMode}}

              </td>

                          <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                               {{store.categoryId}}

              </td>

            </tr>


            <!-- More rows... -->
          </tbody>
        </table>
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
    layout: 'loggedLayoutNew',
  data () {
    return {
      stores: [],
      isLoading: false,
    }
  },
  methods: {
        async getData () {
          this.isLoading = true
      var response = await this.$axios.get('/stores')
      this.stores = response.data
      this.isLoading = false
    },
  },
  mounted() {
    this.getData();
  }
};
</script>

<style>
