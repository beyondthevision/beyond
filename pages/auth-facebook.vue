<template>
	<div></div>
</template>

<script>
export default {
	async mounted() {
		console.log(this.$route);
		// this.$auth.setUser(customUser)
		try {
			var response = await this.$axios.get(
				'/auth/facebook/callback?access_token=' + this.$route.query.access_token
			);
			await this.$auth.setUserToken(response.data.jwt);

			await this.$auth.setUser(response.data.user);
			this.$router.push('/dashboard');
		} catch (error) {
			if (
				error.response.data.message[0].messages &&
				error.response.data.message[0].messages[0].id === 'Auth.form.error.email.taken'
			) {
				this.$error({
					title: 'Error on Login',
					content: 'That email is taken with other auth provider.',
				});
				this.$router.push('/login');
			}

			if (
				error.response.data.message.error &&
				error.response.data.message.error.message === 'Invalid OAuth access token.'
			) {
				this.$error({
					title: 'Error on Login',
					content: 'Our developers are working in this. Sorry.',
				});
				this.$router.push('/login');
			}
		}
	},
};
</script>
34hs

<style lang="scss" scoped></style>
