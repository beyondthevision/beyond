<template>
  <div>
    <v-select
      :value="field.value"
      @input="setSelected"
      :label="field.label"
      placeholder="Select an option"
      :filterable="false"
      :options="options"
      @search="onSearch"
      style="width:200px;"
    >
      <template slot="no-options">
        Write for search {{ this.field.label }}/s
      </template>
      <template slot="option" slot-scope="option">
        <div class="d-center" v-if="option">
          {{ option[selectedKey] }}
        </div>
      </template>
      <template slot="selected-option" slot-scope="option">
        <div class="selected d-center" v-if="selectedValue">
          {{ selectedValue }}
        </div>
      </template>
    </v-select>
  </div>
</template>

<script>
import _ from "lodash";

import config from "../nuxt.config";

const host = config.axios.baseURL;

export default {
  props: ["field", "view"],
  mounted() {
    if (process.browser) {
      this.getInitialData();
      if (this.field.value !== "") {
        this.getName();
      }
    }
  },
  watch: {
    "field.value"(val) {
      // my new value in val. Perform your
      // select update methods here
      this.getInitialData();
      this.getName();
    },
  },
  data() {
    return {
      selectedKey: this.field["searchField"],
      selectedValue: "",
      options: [],
      dialogBanksVisible: false,
    };
  },
  methods: {
    async getInitialData() {

      var account = null;

      if (this.view !== "operator") {
        account = this.$auth.user.id;
      } else {
        account = this.$auth.user.account;
      }    

      var otherQuery = ""

      if (this.view == "operator" && this.field.searchEntity == "campaigns") {
          otherQuery += "&agents.user.id_in=" + this.$auth.user.id
      } 

      console.log("otherquery", otherQuery)

      var data = await fetch(
        `${host}/${this.field.searchEntity}?account.id=${account}&deleted_at_null=true` + otherQuery,
        {
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("auth._token.local")}`,
          },
        }
      );

      data = await data.json();

      this.options = data;
    },
    async getName() {


      var account = null;
   
      if (this.view !== "operator") {
        account = this.$auth.user.id;
      } else {
        account = this.$auth.user.account;
      }


      if (!_.isNil(this.field.value)) {
        var data = await fetch(
          `${host}/${this.field.searchEntity}?id=${escape(this.field.value)}&account.id=${account}&deleted_at_null=true`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `${localStorage.getItem("auth._token.local")}`,
            },
          }
        );

        data = await data.json();

        if (data && data.length > 0) {
          this.selectedValue = data[0][this.field.searchField];
        } else {
          this.selectedValue = "The register was deleted.";
        }
      }
    },
    setSelected(v) {
      if (v) {
        this.selectedValue = v[this.field.searchField];
        this.$emit("input", v.id);
      } else {
        this.$emit("input", "");
      }
    },
    onSearch(search, loading) {
      loading(true);
      this.search(loading, search, this);
    },
    search: _.debounce((loading, search, vm) => {


      var account = null;
   
      if (this.view !== "operator") {
        account = this.$auth.user.id;
      } else {
        account = this.$auth.user.account;
      }

      
      fetch(
        `${host}/${vm.field.searchEntity}?${
          vm.field.searchField}_containss=${escape(search)}&account.id=${
          account
        }&deleted_at_null=true`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth._token.local")}`,
          },
        }
      ).then((res) => {
        res.json().then((json) => (vm.options = json));
        loading(false);
      });
    }, 350),
  },
};
</script>
