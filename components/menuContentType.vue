<template>
  <div>
    <li class="nav-main-heading">Menú</li>

    <li
      class="nav-main-item"
      v-for="item in itemsConfig"
      v-if="isVisible(item)"
    >
      <nuxt-link :to="item.page">
        <a style="color:black;" class="nav-main-link">
          <i
            class="nav-main-link-icon"
            style="color: black;"
            :class="item.icon"
          ></i>
          <span class="nav-main-link-name">{{ item.label }}</span>
        </a>
      </nuxt-link>
    </li>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  async mounted() {
    await this.getData();
  },
  methods: {
    getLink(item) {
      var it = _.find(this.itemsConfig, {
        name: item.name
      });

      if (it) {
        return it.page;
      } else {
        return it.name;
      }
    },
    getClass(item) {
      var it = _.find(this.itemsConfig, {
        name: item.name
      });

      if (it) {
        return it.icon;
      } else {
        return "fa fa-circle";
      }
    },
    getName(item) {
      var it = _.find(this.itemsConfig, {
        name: item.name
      });

      if (it) {
        return it.label;
      } else {
        if (item.name) {
          return item.name;
        }
      }
    },
    isVisible(item) {
      var isHidden = this.hiddenContentTypes.includes(item.name);
      return !isHidden;
    },
    async getData() {
      var response = await this.$axios.get(
        "https://api-charricos.ketch.dev/content-manager/content-types"
      );
      this.items = response.data.data;
    }
  },
  data() {
    return {
      items: [],
      hiddenContentTypes: ["role", "user", "permission"],
      itemsConfig: [
        {
          name: "EmpresasEmisoras",
          label: "My operators",
          icon: "fa fa-headset",
          page: "/maestros/empresas-emisoras"
        },
        {
          name: "EmpresasEmisoras",
          label: "Recordings",
          icon: "fa fa-microphone",
          page: "/maestros/empresas-emisoras"
        },
        {
          name: "EmpresasEmisoras",
          label: "Agent Report",
          icon: "fas fa-chart-pie",
          page: "/maestros/empresas-emisoras"
        },
        {
          name: "EmpresasEmisoras",
          label: "Call Report",
          icon: "fas fa-chart-line",
          page: "/maestros/empresas-emisoras"
        },
        {
          name: "EmpresasEmisoras",
          label: "PBX Editor",
          icon: "fa fa-phone-square",
          page: "/maestros/empresas-emisoras"
        },
        {
          name: "EmpresasEmisoras",
          label: "Incoming Calls",
          icon: "fas fa-phone-volume",
          page: "/maestros/empresas-emisoras"
        },
        {
          name: "EmpresasEmisoras",
          label: "Outcoming Calls",
          icon: "fa fa-inbox",
          page: "/maestros/empresas-emisoras"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
