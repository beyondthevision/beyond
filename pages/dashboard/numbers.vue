<template>
  <div>
    <div>
      <div>
		<a-page-header style="border: 1px solid rgb(235, 237, 240);" title="Numbers" @back="() => null">
	<template slot="extra">
				<div class="extra">
                  <nuxt-link to="/dashboard/add-number">

					<a-button key="3" type="danger" size="large">
						<i class="fa fa-plus" style="margin-right:10px;"></i>
						Add Number
					</a-button>
					        </nuxt-link>

				</div>
			</template>
		</a-page-header>

      </div>
      <div class="my-2 flex sm:flex-row flex-col">
        <div class="flex flex-row mb-1 sm:mb-0"></div>
      </div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <grid
            :hidden-columns="hiddenColumns"
            :custom-columns="customColumns"
            :hideEdit="true"
            :hideDelete="true"
            :entity="entity"
          ></grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import grid from "@/components/grid";
export default {
  components: {
    grid,
  },
  data() {
    return {
      entity: "numbers",
      hiddenColumns: ['id', 'user', 'campaign', 'deleted_at', 'end', 'start', 'IVR'],
    };
  },
};
</script>

<style>
body {
  overflow-x:hidden;
}

</style>
