<template>
  <div>
        		<loading :active.sync="isLoading" :is-full-page="true"></loading>

    <div>
      <div class="block relative ml-1" v-if="entity !== 'bulkdata'">
        <input
          v-model="searchTerm"
          @input="changeTerm"
          placeholder="Search"
          class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
        />
      </div>

      <div class="ml-1 mt-5" v-if="this.entity == 'calls'">
        <el-date-picker
          v-model="dateTime"
          type="daterange"
          start-placeholder="Start date"
          end-placeholder="End date"
        >
        </el-date-picker>
      </div>

      <div class="float-right ml-1 pull-right mt-5" v-for="filter in filters">
        <!-- <v-select
          :placeholder="'Select ' + filter.column"
          style="width:200px;"
          :options="getOptionsSelect(filter)"
        ></v-select> -->
        <search-autocomplete
          :view="view"
          v-model="filter.value"
          :field="filter"
        ></search-autocomplete>
      </div>
    </div>

        <table class="min-w-full divide-y divide-gray-200 mt-5">
      <thead>
        <tr>
          <th
            v-for="col in columnDefs"
 class="pl-6 py-6 bg-gray-50  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            {{ getTitle(col) }}
          </th>
          <th
 class="pl-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          @click="select(row)"
          class="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer"
          v-for="row in rowData"
        >
          <td
            class="pl-5 py-5 border-b border-gray-200 bg-white text-sm"
            v-for="col in columnDefs"
          >
            <div v-if="entity !== 'recordings' && entity !== 'bulkdata'">
              {{ getCell(row, col) }}
            </div>

            <div v-if="entity == 'recordings'">
              <div v-if="row[col.name] && col.name == 'url'">
                <audio :src="row[col.name]" controls>
                  <p>Tu navegador no implementa el elemento audio.</p>
                </audio>
              </div>

              <div v-if="row[col.name] && col.name !== 'url'">
                {{ getCell(row, col) }}
              </div>
            </div>

            <div v-if="entity == 'bulkdata'">
              <div v-if="row[col.name] && col.name == 'url'">
                <a-button
                  download
                  type="dashed"
                  :href="row[col.name]"
                >
                  Download
                </a-button>
              </div>

              <div v-if="row[col.name] && col.name !== 'url'">
                {{ getCell(row, col) }}
              </div>
            </div>
          </td>

          <td
            class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
            v-if="!hideButtons && view !== 'operator'"
          >


            <a-button
              style="margin-top:5px"

                          type="dashed"
              @click="goToEdit(row)"
              v-if="!hideEdit"
            >
              Config
            </a-button>


            <a-button
              type="danger"
              v-if="!hideDelete"
              @click="remove(row)"
              style="margin-top:5px"
            >
              Delete
            </a-button>

          </td>
        </tr>
      </tbody>
    </table>

    <el-pagination
      v-if="!loading && rowDataLength > 0"
      class="float-right"
      layout="prev, pager, next"
      :page-size="pagination.pageSize"
      :page-count="pagination.count"
      :current-page="pagination.currentPage"
      :total="nroRegister"
      @current-change="currentChange"
      @prev-click="prev"
      @next-click="next"
    >
    </el-pagination>
  </div>
</template>

<script>
import {
  getData,
  getCount,
  deleteEntity,
  deleteCampaign,
  deleteAgentsInTwilioByCampaign,
  deleteAgentsInTwilioByAgent,
} from "@/api-front/api";
import _ from "lodash";
import searchAutocomplete from "@/components/search-autocomplete";
import * as moment from "moment-timezone";

import config from "../nuxt.config";
import logs from '../api-front/logs'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const host = config.axios.baseURL;

export default {
  props: [
    "entity",
    "account",
    "view",
    "searchTermColumn",
    "searchTerms",
    "hiddenColumns",
    "customColumns",
    "hideButtons",
    "hideDelete",
    "hideEdit",
    "filters",
  ],
  watch: {
    dateTime() {
      this.getData();
    },
    filters: {
      deep: true,
      handler() {
        this.getData();
      },
    },
  },
  async mounted() {
    await this.getData();
    this.isLoading = false
    
    },
  data() {
    return {
      nroRegister:0,
      isLoading:false,
      dateTime: null,
      searchTerm: "",
      loading: true,
      noRowsTemplate: "",
      pagination: {
        count: 0,
        pageSize: 5,
        currentPage: 1,
      },
      overlayLoadingTemplate: "",
      columnDefs: [],
      rowData: [],
      rowDataLength: 0
    };
  },
  components: {
    searchAutocomplete,
        Loading

  },
  methods: {
    seconds2time(seconds) {
      var hours = Math.floor(seconds / 3600);
      var minutes = Math.floor((seconds - hours * 3600) / 60);
      var seconds = seconds - hours * 3600 - minutes * 60;
      var time = "";

      if (hours != 0) {
        time = hours + ":";
      }
      if (minutes != 0 || time !== "") {
        minutes = minutes < 10 && time !== "" ? "0" + minutes : String(minutes);
        time += minutes + ":";
      }
      if (time === "") {
        time = seconds + " seconds";
      } else {
        time += seconds < 10 ? "0" + seconds : String(seconds);
      }
      return time;
    },
    update(value) {
      if (this.entity == "productos" || this.entity == "clientes") {
        this.$router.push({
          path: "/" + this.entity + "/" + value.id,
        });
        return;
      }

      this.$router.push({
        path: "/maestros/" + this.entity + "/" + value.id,
      });
    },
    async remove(data) {
      var response = await this.$success(
        {
          title: "Are you sure?",
                  content: "This action can't be undone.",
        okText: 'Destroy',
        okType: 'danger',
        confirmLoading:true,
        closable:true,
                cancelText: 'No',

          onOk: async () => {
        if (this.entity == "agents") {
          this.isLoading = true
          var response = await deleteAgentsInTwilioByAgent(data);
          logs.sendLogInfo('DELETED AGENTS IN TWILIO BY AGENT', response.data)
          this.getData();
          // await deleteEntity(this.entity, data.id);
        } else if (this.entity == "campaigns") {
          this.isLoading = true
          var response = await deleteAgentsInTwilioByCampaign(data);

          logs.sendLogInfo('DELETED AGENTS IN TWILIO BY CAMPAIGN', response.data)

          var response = await deleteCampaign(data.id);

          logs.sendLogInfo('DELETED CAMPAIGN', response.data)

          this.isLoading = false

          this.getData();
        } else {
          this.isLoading = true
          var response = await deleteEntity(this.entity, data.id);

          logs.sendLogInfo('DELETED ENTITY ' + this.entity, response.data)


          this.getData();
        }
      }
      })



// .then(async () => {
//         if (this.entity == "agents") {
//           this.isLoading = true
//           var response = await deleteAgentsInTwilioByAgent(data);
//           logs.sendLogInfo('DELETED AGENTS IN TWILIO BY AGENT', response.data)
//           this.getData();
//           // await deleteEntity(this.entity, data.id);
//         } else if (this.entity == "campaigns") {
//           this.isLoading = true
//           var response = await deleteAgentsInTwilioByCampaign(data);

//           logs.sendLogInfo('DELETED AGENTS IN TWILIO BY CAMPAIGN', response.data)

//           var response = await deleteCampaign(data.id);

//           logs.sendLogInfo('DELETED CAMPAIGN', response.data)

//           this.isLoading = false

//           this.getData();
//         } else {
//           this.isLoading = true
//           var response = await deleteEntity(this.entity, data.id);

//           logs.sendLogInfo('DELETED ENTITY ' + this.entity, response.data)


//           this.getData();
//         }
//       });




    },
    select (row) {
      if (this.view == "operator" && this.entity == 'leads') {
        this.$emit("selected", row)
      }
    },
    goToEdit(row) {
      if (this.entity == "campaigns") {
        this.$router.push("/campaign/add?id=" + row.id);
        return;
      }

      if (this.entity == "leads") {
        this.$router.push("/campaign/leads/add?id=" + row.id);
        return;
      } else if (this.entity == "agents") {
        this.$router.push("/campaign/add-agent?id=" + row.user.id);
        return;
      } else {
        this.$router.push("/" + this.entity + "?id=" + row.id);
      }
    },
    changePagination(v) {
      this.getData();
    },
    changeTerm() {
      this.getData();
    },
    getTitle(col) {
      if (
        col.entity.type == "string" ||
        col.entity.type == "text" ||
        col.entity.type == "email" ||
        col.entity.type == "enumeration" ||
        col.entity.type == "integer" ||
        col.entity.type == "biginteger" ||
        col.entity.type == "datetime" ||
        col.entity.type == "date" ||
        (col.entity.type == "float" && col.name !== "numbers")
      ) {
        return col.label;
      }

      if (
        col.entity.type == "relation" &&
        col.entity.relationType == "oneWay" &&
        col.entity.model !== "user" &&
        col.entity.model !== "leads"
      ) {
        return col.entity.model;
      }

      if (col.entity.type == "boolean") {
        return col.label;
      }
    },
    getCell(data, col) {
      if (
        col.entity.type == "string" ||
        col.entity.type == "text" ||
        col.entity.type == "email" ||
        col.entity.type == "enumeration" ||
        (col.entity.type == "integer" && col.name !== "numbers")
      ) {
        if (data[col.name]) {
          if (col.name == "callDuration") {
            return this.seconds2time(data[col.name]);
          }

          return data[col.name];
        } else {
          return "-";
        }
      }

      if (col.entity.type == "biginteger" && col.name == "number") {
        return "+" + data[col.name];
      }

      if (col.entity.type == "float") {
        if (data[col.name]) {
          return parseFloat(data[col.name]);
        } else {
          return "-";
        }
      }

      if (col.entity.type == "datetime") {
        if (data[col.name]) {
          var timezone = null;
          if (this.view == "operator") {
            timezone = this.account.timezone;
          } else {
            timezone = this.$auth.user.timezone;
          }

          return moment
            .utc(data[col.name])
            .tz(timezone)
            .format("YYYY-MM-DD HH:mm A");
        } else return "-";
      }

      if (col.entity.type == "date") {
        if (data[col.name]) {
          var timezone = null;
          if (this.view == "operator") {
            timezone = this.account.timezone;
          } else {
            timezone = this.$auth.user.timezone;
          }

          return moment
            .utc(data[col.name])
            .tz(timezone)
            .format("YYYY-MM-DD");
        }
      }

      if (col.entity.type == "boolean") {
        if (data[col.name]) {
          return "YES";
        } else {
          return "-";
        }
      }

      if (
        col.entity.type == "relation" &&
        col.entity.relationType == "oneWay" &&
        col.entity.model !== "user"
      ) {
        if (col.entity.model == "campaign") {
          if (!_.isNil(data[col.name])) {
            return data[col.name].name;
          }
        }

        if (col.entity.model == "agent") {
          if (!_.isNil(data[col.name])) {
            return data[col.name].identifier;
          }

          if (_.isNil(data[col.name])) {
            return "-";
          }
        }

        if (col.entity.model == "leads") {
          if (!_.isNil(data[col.name])) {
            return data[col.name].phone;
          }
        }

        if (col.entity.model == "agent") {
          if (!_.isNil(data[col.name])) {
            return data[col.name].identifier;
          }
        }

        if (col.entity.model == "user") {
          if (!_.isNil(data[col.name])) {
            return data[col.name].nombre;
          }
        }

        if (col.entity.model == "numbers") {
          if (!_.isNil(data[col.name])) {
            return "+" + data[col.name].number;
          }
        }

        if (col.entity.model == "campaign") {
          if (!_.isNil(data[col.name])) {
            return data[col.name].name;
          }
        }
      }
    },
    prev(e) {
      this.pagination.currentPage = e;
      this.getData();
    },
    next(e) {
      this.pagination.currentPage = e;
      this.getData();
    },
    currentChange(e) {
      this.pagination.currentPage = e;
      this.getData();
    },
    getOptionsSelect(filter) {
      return [];
    },
    async countRegisters() {

      if (!this.$auth.user.email) return

      let response = await getCount(this.entity, this.$auth.user.email);

      if (this.entity !== "users") {
        this.nroRegister = response.data;
      } else {
        this.nroRegister = response.data.count;
      }

      this.pagination.count = Math.ceil(
        this.nroRegister / this.pagination.pageSize
      );

      console.log(this.pagination, "123")
    },

    async getData() {
      var response = await this.$axios.get(
        host + "/content-manager/content-types"
      );
      // this.countRegisters();

      var entity = "";

      if (this.entity == "users") {
        entity = "users-permissions_user";
      } else {
        entity = this.entity.split("-").join("_");
      }

      this.selectedContentType = _.find(response.data.data, (v) => {
        return v.schema.collectionName == entity;
      });

      if (this.selectedContentType) {
        var schema = this.selectedContentType.schema;

        if (_.isNil(this.customColumns)) {
          var columns = Object.keys(schema.attributes);
          this.columnDefs = [];
          columns.forEach((element, i) => {
            if (!this.hiddenColumns.includes(element)) {
              if (schema.attributes[element].type !== "media") {
                this.columnDefs.push({
                  label: _.startCase(element),
                  name: element,
                  entity: schema.attributes[element],
                });
              }
            }
          });
        }
      }

      var account = null;
   
      if (this.view !== "operator") {
        account = this.$auth.user.id;
      } else {
        account = this.$auth.user.account;
      }

   
      var responseEntity = await getData(
        this.entity,
        this.pagination,
        account,
        {
          term: this.searchTerm,
          searchTermColumn: this.searchTermColumn,
          searchTerms: this.searchTerms,
          dateTime: this.dateTime,
        },
        this.filters,
        this.view,
        this.$auth.user.id
      );


      if (this.entity == 'accounts') {
        responseEntity.data.forEach((v) => {
          if (v.spend) {
          v.spend = v.spend.toFixed(4)

          }
        })
      }



      this.rowData = responseEntity.data;
      this.rowDataLength = this.rowData.length
      this.isLoading = false
    },
  },
};
</script>

<style lang="css">
.white {
  color: white;
}
.white:hover {
  color: white !important;
}
*:focus {
  outline: none !important;
}
.h-table-content-empty {
  color: #999999;
  text-align: center;
  box-sizing: border-box;
  padding: 20px;
  height: 200px;
}

.vs--searchable .vs__dropdown-toggle {
  cursor: text;
  height: 38px;
}
.vs__search {
  color: #4a556852;
}

.el-date-editor.el-input__inner {
  height: 38px;
}
</style>
