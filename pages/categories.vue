<template>
	<div>
    		<loading :active.sync="isLoading" :is-full-page="true"></loading>


		<a-page-header style="border: 1px solid rgb(235, 237, 240);margin-bottom:10px;" :title="'Categories'">
			<template slot="extra">
				<div class="extra">
					<a-button key="3" type="dark" size="large" @click="goToAdd()">
						<i class="fa fa-plus" style="margin-right:10px;"></i>
						Add Category
					</a-button>
          </div>
          </template>
		</a-page-header>
		<loading :active.sync="isLoading" :is-full-page="true"></loading>

<div class="flex flex-col">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">


        <div class="p-1">
              <a-input-search placeholder="Search..." enter-button @search="onSearch" />

        </div>

        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>

             <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Logo
              </th>

              <th class="px-6 py-3 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody >
            <!-- Odd row -->
            <tr class="bg-white" :key="category.id" v-for="category in categories">
              <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                 {{category.id}}
              </td>
           
              <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {{category.name}}

              </td>

       <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                    <img v-if="category.image" class="h-10 w-10 rounded-full" :src="category.image.url" alt="">


              </td>

			
              <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                <a-button type="primary" size="small" @click="goToEdit(category.id)" class="text-indigo-600 hover:text-indigo-900">Edit</a-button>
                <a-button @click="deleteCategory(category.id)" type="danger" size="small" class="text-indigo-600 hover:text-indigo-900">Delete</a-button>
              </td>
            </tr>


            <!-- More rows... -->
          </tbody>
        </table>

      <div class="mt-5 mb-5">
          <center>
          <a-button type="dashed" @click="getData()">
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
      layout: 'loggedLayoutNew',
  data () {
    return {
      categories: [],
      isLoading: false,
      offset: 0
    }
  },
  components: {
    Loading
  },
  methods: {
  goToEdit (id) {
        this.$router.push('/categories-add?id=' + id)

  },
  goToAdd () {

    this.$router.push('/categories-add')



  },
  onSearch  () {

  },
  async deleteCategory(id) {
    try {
          this.isLoading  = true
    await this.$axios.delete('/categories/' + id)
  this.categories = this.categories.filter(item => item.id !== id);

  
    this.isLoading  = false
    } catch (error) {
      this.isLoading = false
    }
  },



    formatDate (v) {
return moment
            .utc(v)
            .tz("Asia/Kolkata")
            .format("YYYY-MM-DD HH:mm A");
    },
        async getData () {
          this.isLoading = true
      var response = await this.$axios.get('/categories?_limit=5&_start=' + this.offset)
      this.categories.push.apply(this.categories, response.data);
      this.isLoading = false
    },
  },

  async mounted() {
    await this.getData();

  }
};
</script>

<style>


