<template>
    <div>

		<a-page-header style="border: 1px solid rgb(235, 237, 240);margin-bottom:10px;" :title="'Categories'">

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
                Name
              </th>


              <th class="px-6 py-3 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody>
            <!-- Odd row -->
            <tr class="bg-white">
              <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                1
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
    export default {
         layout: 'loggedLayoutNew',
   
    }
</script>

<style lang="scss" scoped>

</style>