<template>
    <div>
        <el-tabs class="navigation-setting" :tab-position="tabPosition" v-model="activeName" @tab-click="goPage($event)">
            <el-tab-pane label="User Information" name="user"></el-tab-pane>
            <el-tab-pane label="Whatsapp Config" name="setting-whatsapp"></el-tab-pane>
             <el-tab-pane label="Twilio Config" name="setting-twilio"></el-tab-pane>
            <el-tab-pane label="Numbers" name="setting-numbers"></el-tab-pane>
            <el-tab-pane label="Billing" name="setting-billing"></el-tab-pane>
            <el-tab-pane label="Help" name="setting-help"></el-tab-pane>
            <el-tab-pane label="History Payment" name="historyPayment"></el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>

export default {
    data () {
        return {
            activeName: this.$route.name,
            tabPosition: 'right',
            navigationStyle: 'navigation-setting'
        }
    },
    methods: {
        goPage (e) {
           this.$router.push({ name: e.name })
        },
        changeResize (event) {
            let width = event ? event.target.innerWidth : window.innerWidth

            if ( width <= '765') {
                this.tabPosition = 'top'
                this.navigationStyle = ''
            } else {
                this.tabPosition = 'right' 
                this.navigationStyle = 'navigationStyle'
            }
        }
    },
     mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.changeResize);
            this.changeResize()
        });
    }
}
</script>

<style>
    .navigation-setting {
        float: left;
    }

    @media screen and (max-width: 765px) {
        .navigation-setting {
            float:none;
        }
    }
</style>