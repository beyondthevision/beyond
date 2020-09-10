<template>
    <b-card>
        <style>
            :root {
                --buttonBgColor: {{ texts.buttonsText.backgroundColor }};
                --buttonHvColor: {{ texts.buttonsText.hoverColor }};
            }
        </style>
        <div class="fields user-data-container">
            <div class="form-group">
                <h3>Security</h3>
                <el-input 
                    placeholder="Insert password"
                    type="password" 
                    v-model="password"
                    @keyup.enter.native="save"
                />
            </div>
            <div class="form-group">
                <el-input 
                    placeholder="Confirm password"
                    type="password" 
                    v-model="passwordConfirmation"
                    @input="changeInput"
                    @keyup.enter.native="save"
                />
                <div  v-if="isEdit && equalPass" style="display:block" class="valid-feedback">
                    password valid!
                </div>
                <div  v-if="isEdit && !equalPass"  style="display:block" class="invalid-feedback">
                    Password confirmation incorrect
                </div>
            </div>
        </div>

        <template v-slot:footer>
             <b-button class="button-setting" :hidden="loading" :disabled="!equalPass"  @click="save">
                    Save
            </b-button>
            <b-button class="button-setting" variant="secondary" :hidden="!loading" disabled>
                <b-spinner small></b-spinner>
                <span class="sr-only">Loading...</span>
            </b-button>
        </template>
    </b-card>
</template>

<script>
import { registry, errors, msgCode } from '../../utils/textConfig'
import { required, email, minLength } from "vuelidate/lib/validators"
import { getCurrentUser, updateUser } from "../../utils/actions"
import { Loading } from "element-ui"
import _ from 'lodash'

export default {
    auth: true,
    layout: 'header',
    validations: {
        password: { required,  minLength: minLength(4) },
        passwordConfirmation: { required,  minLength: minLength(4) }
    },
    data () {
        return {
            loading: false,
            password: '',
            passwordConfirmation: '',
            texts: registry,
            equalPass: false,
            isEdit: false,
            empty: true
        }
    },
    methods: {
        changeInput () {
            let validation = this.validate()
            this.isEdit = true

            if (this.passwordConfirmation !== this.password) {
                this.equalPass = false
            } else {
                this.equalPass = true
            }


            if (validation.isValid) {
                this.empty = false
            }
        },
        async save () {
            let validation = this.validate()

            if (this.equalPass && validation.isValid) {

                let loadingInstance = Loading.service({})
                let response = await getCurrentUser()
                let user = response.data
                user.password = this.password
                this.loading = true

                updateUser(user.id, user).then(response => {
                    loadingInstance.close()
                    let msgObj = msgCode['200']
                
                    this.$notify({
                        title: msgObj.title,
                        message: 'Your password was changed correctly.',
                        type: msgObj.variant
                    })

                    this.loading = false
                    window.location.href = "/"
                }).catch(err => {
                    const error = err.toString()
                    const status =  error.replace( /^\D+/g, '')
                    loadingInstance.close()

                    let msgObj = msgCode[status]
                
                    this.$notify.error({
                        title: msgObj.title,
                        message: msgObj.msg
                    })
                })
            }
        },
        validate (){
            let isValid = true
            let message

            if (this.password === '') {
                isValid = false
                message = 'Empty password'
            } else if (this.password === '') {
                isValid = false
                message = 'Empty confirmation password'
            }

            return { 
                isValid,
                message
            }
        }
    }
}
</script>