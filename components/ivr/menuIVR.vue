<template>
  <div>
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['sub1']"
      mode="inline"
      theme="light"
      :inline-collapsed="collapsed"
    >
      <a-menu-item key="1">

    <nuxt-link  to="/ivr/add">
        <a-icon type="pie-chart" />
        <span>General Parameters</span>
    </nuxt-link>
      </a-menu-item>

      <a-menu-item :disabled="!selectedRegisterId" key="2">
    <nuxt-link to="/ivr/add/modules">

        <a-icon type="desktop" />
        <span>IVR Modules</span>
    </nuxt-link>

      </a-menu-item>
      <a-menu-item key="3"  :disabled="!selectedRegisterId">

    <nuxt-link to="/ivr/add/numbers">
        <a-icon type="inbox" />
        <span>Numbers</span>

  </nuxt-link>
      </a-menu-item>


    </a-menu>
  </div>
</template>

<script>
export default {
  mounted () {
    this.selectedRegisterId = this.$route.query.id;

  },
  data() {
    return {
      collapsed: false,
      selectedRegisterId: null
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>
