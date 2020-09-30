<template>
    <div>

    </div>
</template>

<script>
    export default {
        async mounted () {
            console.log(this.$route)
          // this.$auth.setUser(customUser)

            var response = await this.$axios.get('/connect/facebook/callback?access_token=' + this.$route.query.access_token)

        }
    }
</script>34hs

<style lang="scss" scoped>

</style>