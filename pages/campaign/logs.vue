<template>
  <div>
    <div class="py-8">
      <div>
		<a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Calls Logs" @back="() => null">

		</a-page-header>
      </div>
      <div class="my-2 flex sm:flex-row flex-col">
        <div class="flex flex-row mb-1 sm:mb-0"></div>
      </div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <grid
            :hidden-columns="hiddenColumns"
            :entity="entity"
            :searchTerms="searchTerms"
            :filters="filters"
            :hide-delete="true"
            :hide-edit="true"
          ></grid>

        <!-- <ejs-grid :dataSource="data"> </ejs-grid> -->

          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { GridPlugin } from '@syncfusion/ej2-vue-grids';

Vue.use(GridPlugin);




import grid from "@/components/grid";
export default {
  components: {
    grid,
  },
  data() {
    return {
 data: [
          { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
          { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 },
          { OrderID: 10250, CustomerID: 'HANAR', Freight: 65.83 },
          { OrderID: 10251, CustomerID: 'VICTE', Freight: 41.34 },
          { OrderID: 10252, CustomerID: 'SUPRD', Freight: 51.3 },
          { OrderID: 10253, CustomerID: 'HANAR', Freight: 58.17 },
          { OrderID: 10254, CustomerID: 'CHOPS', Freight: 22.98 },
          { OrderID: 10255, CustomerID: 'RICSU', Freight: 148.33 },
          { OrderID: 10256, CustomerID: 'WELLI', Freight: 13.97 }
      ],

      entity: "calls",
      searchTerms: [
        {
          searchEntity: 'searchwords'
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
        {
          value: null,
          required: false,
          column: "agent",
          name: "agent",
          label: "Agent",
          position: "left",
          type: "select-autocomplete",
          searchEntity: "agents",
          searchField: "identifier",
        },
      ],
      hiddenColumns: [
        "leads",
        "sid",
        "searchwords",
        "deleted_at",
        "id",
        "campaign",
        "calls",
        "active",
        "waitingtime",
        "canceled",
        "type",
        "startTime",
        "finishTime",
      ],
    };
  },
};
</script>

<style>
@import '../../node_modules/@syncfusion/ej2-base/styles/material.css';  
@import '../../node_modules/@syncfusion/ej2-buttons/styles/material.css';  
@import '../../node_modules/@syncfusion/ej2-calendars/styles/material.css';  
@import '../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';  
@import '../../node_modules/@syncfusion/ej2-inputs/styles/material.css';  
@import '../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import "../../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";

</style>
