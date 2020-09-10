<template>
	<div>
		<a-row>
			<!--Sidebar-->
			<a-col :lg="{ span: 4 }" :xs="{ span: 24, offset: 0 }">
				<menu-Campaign></menu-Campaign>
			</a-col>

			<!--/Sidebar-->
			<!--Main-->
			<a-col :lg="{ span: 17 }" :xs="{ span: 24, offset: 0 }" style="margin-left:15px;">
				<nuxt></nuxt>
			</a-col>
			<!--/Main-->
		</a-row>
	</div>
</template>

<script>
import menuCampaign from '@/components/campaign/menuCampaign';
export default {
	layout: 'loggedLayoutNew',
	components: {
		menuCampaign,
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
		}
	},
	methods: {
		logout() {
			this.$auth.logout().then(() => {
				this.$router.push({ name: 'login' });
			});
		},
	},
};
</script>

<style lang="scss" scoped></style>
