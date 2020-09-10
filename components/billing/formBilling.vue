<template>
   <b-card class="billign-container">
        <template class="form-header-billing" v-slot:header>
            <h3>Plan</h3>
        </template>

        <b-list-group flush>
            <b-list-group-item>
                <b-form-group>
                    <span style="text-transform:capitalize;" class="left"><b>{{ plan }}</b></span>
                    <span class="right" ><b>$ {{ price }}</b></span>
                </b-form-group>
            </b-list-group-item>
            <div>
                
            </div>
            <b-list-group-item>
                <b-form-group>
                    <span class="left">Custom messages</span>
                </b-form-group>
            </b-list-group-item>
            <b-list-group-item>
                <b-form-group>
                    <span class="left">Available SMS</span>
                    <span class="right" >2500</span>
                </b-form-group>
            </b-list-group-item>


        </b-list-group>

        <template v-slot:footer>
            <div class="left" style="display: table-cell;">
                <span>$0.00 / month</span>
                |
                <span> <a href="/pricing">Plans</a> </span>
                |
                <span>Custom Needs</span>
            </div>
            <div class="buttons right">
                <b-button to="/changePlan" class="billing-buttons button-setting" variant="dark" :hidden="loading" @click="save">
                Change Plan
                </b-button>
                <b-button class="billing-buttons button-setting" variant="secondary" :hidden="!loading" disabled>
                    <b-spinner small></b-spinner>
                    <span class="sr-only">Loading...</span>
                </b-button>
            </div>
        </template>
    </b-card>
</template>

<script>
export default {
    data () {
        return {
            code: '',
            plan: 'test',
            price: '0',
            loading: false
        }
    },
    methods: {
        save () {

        }
    },
    mounted () {
        if (this.$auth.user.plan) {
            this.plan = this.$auth.user.plan.name
            this.price = this.$auth.user.plan.price
        }
    }
}
</script>

<style>
    .right {
        display: block;
        float: right;
    }

    .left {
        display: block;
        float: left;
    }

    .form-group {
        font-size: 15px;
    }

    .form-header-billing {
        height:50px;
        font-weight:bold;
    }

    .card-header {
        background-color: white;
    }
</style>