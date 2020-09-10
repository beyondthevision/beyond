<template>
    <!-- Reminder Form -->
    <div class="row no-gutters justify-content-center">
        <alertToast :configAlert="configAlert" />
        <div class="col-sm-8 col-xl-6">
            <div>
                <div class="form-group py-3">
                    <input type="email"
                    v-model="user.email" 
                    @input="changeInput" 
                    class="form-control form-control-lg form-control-alt" 
                    :placeholder="texts.fieldTexts[0]"
                    v-on:keyup.enter="submit"
                    :class="{
                        'is-valid': ($v.user.email.email && $v.user.email.required),
                        'is-invalid': !$v.user.email.email,
                    }"
                    />
                    <div  v-if="($v.user.email.email && $v.user.email.required)" class="valid-feedback">
                        Email valid!
                    </div>
                    <div  v-if="!$v.user.email.email" class="invalid-feedback">
                        Format email invalid!
                    </div>
                </div>
                <div class="form-group text-center">
                    <b-button class="main-button" @click="submit()" :hidden="loading" block>
                        <i class="fa fa-fw fa-reply mr-1"></i> {{ texts.buttonsText.passwordReset }}
                    </b-button>
                    <b-button class="main-button" variant="secondary" :hidden="!loading" block disabled>
                        <b-spinner small></b-spinner>
                        <span class="sr-only">Loading...</span>
                    </b-button>
                    <p class="mt-3 mb-0 d-lg-flex justify-content-lg-between">
                        <a @click="goLogin()" class="btn btn-sm btn-light d-block d-lg-inline-block mb-1">
                           <i class="fas fa-sign-in-alt"></i> {{ loginTexts.buttons.signIn }}
                        </a>
                        <a @click="goRegistrer()" class="btn btn-sm btn-light d-block d-lg-inline-block mb-1">
                            <i class="fa fa-plus text-muted mr-1"></i> {{ registryTexts.buttonsText.signUp  }}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { email, required } from "vuelidate/lib/validators"
import { errors } from "../../utils/textConfig"
import alertToast from "../modals/alertToast" 

export default {
    props: [ 'user', 'texts', 'loginTexts', 'registryTexts', 'configAlert', 'loading' ],
    components: {
        alertToast
    },
    validations: {
        user: {
            email: { required, email }
        }
    },
    methods: {
        changeInput (event) {
            this.$emit('changeInput', this.user)
        },
        checkForm () {
            let valid = true
            if (!this.$v.user.email.required) {
                this.configAlert.dismissCountDown = this.configAlert.dismissSecs
                this.configAlert.msg = errors.resetPassword.emptyEmail
                valid = false
            }

            return valid
        },
        submit () {            
            if (this.checkForm()) {
                this.$emit('resetPassword')
            }
        },
        goLogin () {
            this.$router.push('/login')
        },
        goRegistrer () {
            this.$router.push('/register')
        }
    }
}
</script>
