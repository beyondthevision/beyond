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
                <h3>Username and Email</h3>
                <el-input 
                    type="text"
                    name="username"
                    v-model="user.username"
                    @input="changeState"
                    :placeholder="texts.fieldTexts[0]"
                    @keyup.enter.native="save"
                />
            </div>
            <div class="form-group">
            
                <el-input type="email"
                    name="email"
                    v-model="user.email"
                    @input="changeEmail"
                    :placeholder="texts.fieldTexts[1]"
                    @keyup.enter.native="save"

                />
                <div v-if="isEdit && emailValid" class="valid-feedback" style="display:block">
                    Email valid!
                </div>
                <div v-if="isEdit && !emailValid" style="display:block" class="invalid-feedback">
                    Format email invalid!
                </div>
            </div>
        </div>

        <template v-slot:footer>
            <b-button class="button-setting" :disabled="!isEdit" :hidden="loading" @click="save">
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
  import { updateUser } from "../../utils/actions"
  import { registry, errors, msgCode } from '../../utils/textConfig'
  import { required, email } from "vuelidate/lib/validators"
  import { Loading } from "element-ui"
  import _ from 'lodash'

  export default {
    data () {
        return {
            isEdit: false,
            user: {
                id: '',
                username: null,
                email: null
            },
            usernameValid: true,
            emailValid: true,
            texts: registry,
            equalPass: true,
            loading: false,
            msgCode
        }
    },
    methods: {
      save () {
        let loadingInstance = Loading.service({})
        this.loading = true
        let validate = this.validate()
        if (validate.isValid) {
            updateUser(this.user.id, this.user).then(response => {
                loadingInstance.close()
                this.loading = false

                let msgObj = msgCode['200']
                
                this.$notify({
                    title: msgObj.title,
                    message: 'Your user data was changed correctly',
                    type: msgObj.variant
                })

                this.$auth.fetchUser()
                window.location.href = "/"
            }).catch ((err) => {
                const error = err.toString()
                const status =  error.replace( /^\D+/g, '')
                loadingInstance.close()

                let msgObj = msgCode[status]

                this.$notify.error({
                    title: msgObj.title,
                    message: msgObj.msg
                })

                this.loading = false
            })
        } else {
            loadingInstance.close()
            this.loading = false
            this.$notify({
                title: 'Validation',
                message: validate.message,
                type: 'warning'
            })
        }
      },
      changeState (input) {
          this.isEdit = true
      },
      changeEmail (e) {
        this.isEdit = true
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.emailValid =  re.test(e)
      },
      validate () {
        let isValid = true
        let message
        if (_.isNil(this.user.username) || this.user.username === '') {
            isValid = false
            message = 'Username is required'
        } else if (_.isNil(this.user.email) || this.user.email === '') {
            isValid = false
            message = 'Email is required'
        }

        return { 
            isValid,
            message
        }
      }
    },
    mounted () {
        this.user.username = this.$auth.user.username
        this.user.email = this.$auth.user.email
        this.user.id = this.$auth.user.id
    }
  }
</script>