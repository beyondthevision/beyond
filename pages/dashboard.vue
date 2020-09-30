<template>
	<div>
		<a-row>
			<!--Sidebar
			<a-col :lg="{ span: 4 }" :xs="{ span: 24, offset: 0 }">
				<menu-dashboard></menu-dashboard>
			</a-col>
      -->


			<!--/Sidebar-->
			<!--Main-->
				<nuxt></nuxt>
			<!--/Main-->
		</a-row>
	</div>
</template>

<script>
import menuDashboard from '@/components/dashboard/menu-dashboard'

import {
  configAccount
} from "@/api-front/api";


export default {
  name: 'dashboard',
    layout: 'loggedLayoutNew',
  components: {
     menuDashboard
  },
  data() {
    return {
      loaded: false,
    };
  },
  async mounted() {
  },
  methods: {

    logout() {
      this.$auth.logout().then(() => {
        this.$router.push({ name: "login" });
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
