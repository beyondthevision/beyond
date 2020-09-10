<template>
        <b-container>
            <div class="center-form">
                <b-card class="change-plan-container">
                    <b-card-text>
                        <b-list-group>
                            <b-form-group style="text-align: center;">
                                <h2 style="font-weight: bold;">Change Plan</h2>
                                    <img class="change-plan-img" :src="changeIMG" />
                                <div>
                                    <p>Change your <b>personal account’s</b> plan.</p>
                                    <a href="/pricing">Learn More</a>
                                </div>
                            </b-form-group>

                            <b-form-group class="selected-input">
                                <b-form-radio v-for="plan in plans" :key="plan.id" v-model="selected" :name="plan.name" :value="plan.id">
                                    <div style="text-transform:capitalize;" class="left">{{ plan.name }}</div>

                                    <div v-if="plan.price !== 0" class="right">${{ plan.price }} /{{ plan.description.frecuency }}</div>
                                    <div v-else class="right">{{ plan.description.frecuency }}</div>
                                </b-form-radio>
                            </b-form-group>

                        </b-list-group>
                    </b-card-text>
                    <template v-slot:footer>
                        <b-row>
                            <b-col md="6" sm="6">
                                <b-button @click="cancel" class="buttons-form" block :hidden="loading" variant="light">
                                    CANCEL
                                </b-button>
                            </b-col>
                            <b-col md="6" sm="6">
                                <b-button @click="change" class="buttons-form" block :hidden="loading" variant="light">
                                   CONTINUE
                                </b-button>
                                <b-button class="buttons-form" block :hidden="!loading" disabled variant="light">
                                    <b-spinner small></b-spinner>
                                    <span class="sr-only">Loading...</span>
                                </b-button>
                            </b-col>
                        </b-row>
                    </template>
                </b-card>
            </div>
        </b-container>
</template>

<script>
import changeIMG from '../assets/media/photos/changePlan.jpg'
import { getPlans } from '../utils/actions'

export default {
    auth: true,
    layout: "header",
    data () {
        return {
            changeIMG,
            plans: [],
            loading: false,
            selected: ''
        }
    },
    async mounted () {
        let plansObj = await getPlans()
        
        this.plans = plansObj.data

        this.selected = this.$auth.user.plan ? this.$auth.user.plan.id : 1
    },
    methods: {
        cancel () {
            this.$router.push({ name: 'setting-billing' })
        },
        change () {
            this.$router.push({ path: '/payment/' + this.selected })
        }
    }
}
</script>

<style>
    .custom-control .label {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
    }

    .custom-control .custom-control-label {
        width: 100%;
    }

    .change-plan-container {
        min-width: 500px;
    }

    .change-plan-container .card-footer {
        padding: 0px;
    }

    .buttons-form {
        width:100%;
        height: 60px;
    }

    .center-form {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .change-plan-container .card-footer .row div {
        padding: 0px;
    }

    .change-plan-img {
        width: 100px;
        height: 100px;
        border-radius: 50px;
        object-fit: cover;
        object-position: center right;
        margin: auto;
    }
    
    .card-container {
        padding: 0px !important;

        margin: auto;

        margin-top: 50px;
    }

    .change-plan-card .card-footer {
        padding: 0px;
    }

    .card {
        padding: 0;
        margin: 0;
        border-radius: 0px;
        margin-top:0px;
    }

    .card-body > h5 {
        font-weight: bold;

        color: inherit;
        line-height: 1.5;
        font-size: 1.25rem;
        letter-spacing: -0.020625rem;
        font-weight: 600;
        margin: 0px;
    }

    .custom-radio {
        padding: 20px;
        padding-left: 40px;

        border: solid #f2f2f2 0.5px;
    }

    .left {
        float: left;
    }

    .right {
        float: right;
    }

    .space {
        display: inline-block;
        width: 1px;
        height: 1px;
        margin-left: calc(239.3333px);
        margin-top: 0px;
    }

    .custom-radio .custom-control-input:checked ~ .custom-control-label::after {
        background-image: none;
        background-color: #000;

        border-radius: 50%;
    }

    .custom-radio .custom-control-input:checked~.custom-control-label::after {
        background-image: none;
        background-color: #000;

        border-radius: 50%;
    }

    .custom-radio .custom-control-input:checked~.custom-control-label::before {
        background-color: gray;
    }
    .custom-control-input:checked ~ .custom-control-label::before {
        color: #fff;
        border-color: gray;
        background-color: gray;
    }
    .custom-control-input:checked~.custom-control-label::before {
        color: #fff;
        background-color: gray;
    }
    .custom-radio .custom-control-label::before {
        border-radius: 50%;
    }
</style>