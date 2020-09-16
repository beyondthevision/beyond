<template>
  <div>
    <div class="py-8">
      <div>
		<a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Recordings" @back="() => null">

		</a-page-header>      </div>

      <div class="overflow-x-auto mt-10">
        <div>
          <grid
            :filters="filters"
            :searchTerms="searchTerms"
            :hidden-columns="hiddenColumns"
            :custom-columns="customColumns"
            :entity="entity"
            :hide-delete="true"
            :hide-edit="true"
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
      entity: "recordings",
      searchTerms: [
        {
          searchEntity: 'number'
        }
        // {
        //   searchEntity: 'toNumber'
        // }
      ],
      filters: [
        {
          column: "campaign",
          value: null,
          required: false,
          name: "campaign",
          label: "Campaign",
          position: "left",
          type: "select-autocomplete",
          searchEntity: "campaigns",
          searchField: "name",
        },
      ],
      hiddenColumns: ["deleted_at", "id", 'campaign'],
    };
  },
};
</script>

<style lang="scss" scoped></style>
