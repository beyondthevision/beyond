<template>
  <div>
    <div class="py-8">
      <div>
		<a-page-header style="border: 1px solid rgb(235, 237, 240)" title="SMS Incoming Inbox" @back="() => null">

		</a-page-header>
      </div>
      <div class="my-2 flex sm:flex-row flex-col">
        <div class="flex flex-row mb-1 sm:mb-0"></div>
      </div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <grid
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
      searchTerms: [
        {
          searchEntity: "searchwords",
        },
      ],
      entity: "sms-responses",
      hiddenColumns: ["deleted_at", "id", "campaign", "calls", "active", "searchwords"],
    };
  },
};
</script>

<style lang="scss" scoped></style>
