<template>
    <div>

    </div>
</template>

<script>
    export default {
        async mounted () {
            console.log(this.$route)
          // this.$auth.setUser(customUser)

            try {
                 var response = await this.$axios.get('/auth/google/callback?access_token=' + this.$route.query.access_token)
                      await this.$auth.setUser(response.data.user)
            await this.$auth.setUserToken(response.data.jwt)
            this.$router.push('/dashboard')
          

            } catch (error) {
                if (error.response.data.message[0].messages[0].id === "Auth.form.error.email.taken") {
                this.$error({
                    title: 'Error on Login',
                    content: 'That email is taken with other auth provider.',
                });
                this.$router.push('/login')
                }
            }




        }
    }
</script>34hs

<style lang="scss" scoped>

</style>