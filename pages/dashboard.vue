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
			<a-col :lg="{ span: 29 }" :xs="{ span: 24, offset: 0 }" style="margin-left:15px;">
				<nuxt></nuxt>
			</a-col>
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
    if (!this.$auth.user.plan) {
    } else {
      this.loaded = true;

      if (this.$auth.user.firstAccess) {
        console.log("Es su primer acceso")
        await configAccount({
          userId: this.$auth.user.id
        })
      }


    }
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
