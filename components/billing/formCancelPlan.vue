<template>
     <b-card class="cancel-plan-card">
        <div class="main-container">
            <b-card-body>
                <div>
                    <span>
                        <h4>Cancel Plan</h4>
                    </span>
                    <p>This action will queue the removal of all your text massive plan.</p>
                </div>
                <div>
                    <p>
                        <input type="checkbox" v-model="cancel" name="cancel" value="cancel"> 
                        Confirm that I want to start the plan cancelation process 
                        <b>{{ $auth.user.username }}</b>
                    </p>
                </div>
            </b-card-body>
        </div>
        <template v-slot:footer>
            <div class="buttons right">
                <b-button :disabled="!cancel" variant="danger" :hidden="loading" @click="cancelPlan">
                   Cancel Plan
                </b-button>
            </div>
        </template>
    </b-card>
</template>

<script>
import { updatePlan, registryPayments } from '../../utils/actions'
import { msgCode } from '../../utils/textConfig'
import { Loading } from "element-ui"

export default {
    data () {
        return {
            loading: false,
            cancel: false
        }
    },
    methods: {
        cancelPlan () {
            let loadingInstance = Loading.service({})
            this.loading = true

            let currentUser = this.$auth.user
            let currentPlan = this.$auth.user.plan.name

            updatePlan(currentUser.id, null)
            .then(response => {
                this.cancel = false
                loadingInstance.close()
                this.loading = false

                let msgObj = msgCode['200']
                
                this.$notify({
                    title: msgObj.title,
                    message: 'Your plan was cancelled correctly.',
                    type: msgObj.variant
                })

                this.$auth.fetchUser()
                    
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000)
            })
            .catch(err => {
                const error = err.message
                const status =  error.replace( /^\D+/g, '')
                loadingInstance.close()
                this.loading = false

                let msgObj = msgCode[status]
                
                this.$notify.error({
                    title: msgObj.title,
                    message: msgObj.msg
                })
        

            })
        }   
    }
}
</script>

<style>
    .cancel-plan-card {
        margin-bottom: 15px;
    }

    .cancel-plan-card .card-footer h6 .left {
        text-transform: initial;
    }

    .cancel-plan-card .main-container .card-body div p {
        padding-top: 20px;
        color: inherit;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.6;
    }

    .cancel-plan-card .main-container .card-body div p input[type=checkbox]{
        transform: scale(2);
        margin-right: 5px;
     }

    .cancel-plan-card .main-container .card-body div span h4 {
        color: inherit;
        line-height: 1.5;
        font-size: 1.25rem;
        letter-spacing: -0.020625rem;
        font-weight: 600;
        margin: 0px;
    }

    .cancel-plan-card .footer-card {
        display: grid;

        grid-template-columns: 9fr 1fr;
    }
</style>