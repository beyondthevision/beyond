<template>
  <div>
    
		<a-page-header style="border: 1px solid rgb(235, 237, 240);margin-top:33px;" title="My Numbers" @back="() => null">
	<template slot="extra">
				<div class="extra">
                  <nuxt-link to="/campaign/add-number">

					<a-button key="3" type="danger" size="large">
						<i class="fa fa-plus" style="margin-right:10px;"></i>
						Add Number
					</a-button>
					        </nuxt-link>

				</div>
			</template>
		</a-page-header>

      
      <div class="overflow-x-auto mt-10">
        <div>
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
