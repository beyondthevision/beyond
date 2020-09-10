<template>
    <b-card-text>
        <alertToast :configAlert="configAlert" />
        <form class="registry-form">
            <div class="fields">
                <div class="form-group">
                    <input 
                        type="text" 
                        v-model="user.username" 
                        @input="changeInput" 
                        class="form-control form-control-lg form-control-alt" 
                        :class="{
                            'is-valid': $v.user.username.required
                        }"
                        :placeholder="texts.fieldTexts[0]"
                    />
                    <div  v-if="$v.user.username.required" class="valid-feedback">
                        Username valid!
                    </div>
                </div>
                <div class="form-group">
                    <input type="email"
                        v-model="user.email" 
                        @input="changeInput" 
                        class="form-control form-control-lg form-control-alt" 
                        :placeholder="texts.fieldTexts[1]"
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
                <div class="form-group">
                    <input 
                        type="password" 
                        v-model="user.password" 
                        @input="changeInput" 
                        class="form-control form-control-lg form-control-alt" 
                        :placeholder="texts.fieldTexts[2]"
                        :class="{
                            'is-valid': $v.user.password.required,
                            'is-invalid': ($v.user.password.required && !$v.user.password.minLength)
                        }"
                    />
                    <div  v-if="$v.user.password.required && $v.user.password.minLength" class="valid-feedback">
                        password valid!
                    </div>
                    <div  v-if="($v.user.password.required && !$v.user.password.minLength)" class="invalid-feedback">
                        little password
                    </div>
                </div>
                <div class="form-group">
                    <input 
                        type="password" 
                        v-model="user.passwordConfirmation" 
                        @input="changeInput" 
                        class="form-control form-control-lg form-control-alt"
                        :placeholder="texts.fieldTexts[3]"
                            v-on:keyup.enter="submit"
                        :class="{
                            'is-valid': $v.user.passwordConfirmation.required,
                            'is-invalid': $v.user.passwordConfirmation.required,
                            'is-invalid': !equalPass && $v.user.passwordConfirmation.required
                        }"
                    />
                    <div  v-if="$v.user.passwordConfirmation.required && equalPass" class="valid-feedback">
                        password valid!
                    </div>
                    <div  v-if="($v.user.passwordConfirmation.required)" class="invalid-feedback">
                        Password confirmation incorrect
                    </div>
                </div>
                <div class="form-group avatar-container">
                    <div>
                        <p>Click on the avatar to upload a custom one from your files.</p>
                    </div>
                    <div>
                        <el-upload
                            class="avatar-uploader"
                            action=""
                            :on-change="addAttachment"
                            :show-file-list="false">
                            <img v-if="imgUrl" :src="imgUrl" class="avatar"/>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </div>
            </div>
            <br>
            <div class="form-group">
                <b-button class="main-button" :hidden="loading" @click="submit()" block>
                    <i class="fa fa-fw fa-plus mr-1"></i> {{ texts.buttonsText.signUp }}
                </b-button>
                <b-button class="main-button" variant="secondary" :hidden="!loading" block disabled>
                    <b-spinner small></b-spinner>
                    <span class="sr-only">Loading...</span>
                </b-button>
                <div class="mt-3 mb-0 d-lg-flex justify-content-lg-between">
                    <a @click="goLogin()" class="btn btn-sm btn-light d-block d-lg-inline-block mb-1">
                       <i class="fas fa-sign-in-alt"></i> {{ texts.buttonsText.signIn }}
                    </a>
                    <a @click="goTerms()" class="btn btn-sm btn-light d-block d-lg-inline-block mb-1">
                        <i class="fa fa-book text-muted mr-1"></i> {{ texts.buttonsText.readTerms }}
                    </a>
                </div>
            </div>
        </form>
    </b-card-text>
</template>

<script>
import { registry, errors } from '../../utils/textConfig'
import { required, email, minLength } from "vuelidate/lib/validators"
import alertToast from '../modals/alertToast'

export default {
    props: [ 'user', 'configAlert', 'loading', 'imgUrl' ],
    components: {
        alertToast
    },
    validations: {
        user: {
            username: { required },
            email: { required, email },
            password: { required,  minLength: minLength(4) },
            passwordConfirmation: { required,  minLength: minLength(4) }
        }
    },
    methods: {
       changeInput () {

            if (this.user.passwordConfirmation !== this.user.password) {
                this.equalPass = false
            } else {
                this.equalPass = true
            }

            if (this.user) {
                this.$emit('changeInput', this.user)
            }
        },
        checkForm () {
            let valid = true

            if (!this.$v.user.username.required ||
                !this.$v.user.email.required ||
                !this.$v.user.password.required ||
                !this.$v.user.passwordConfirmation.required
                ) {
                this.configAlert.msg = errors.emptyFields
                valid = false
            }

            if (this.user.passwordConfirmation !== this.user.password) {
                this.configAlert.msg = errors.registry.samePassword
                valid = false
            }

            if (!valid) {
                this.configAlert.dismissCountDown = this.configAlert.dismissSecs
            }        

            return valid
        },
        submit () {
            if (this.user && this.checkForm()) {
                this.$emit('submit')
            }
        },
        goLogin () {
            this.$router.push('/login')
        },
        goTerms () {
            this.$router.push({ name: 'termsConditions' })
        },
        addAttachment (file) {
            this.$emit('addAttachment', file)
        }
    },
    data () {
        return {
            texts: registry,
            equalPass: true
        }
    }
}
</script>

<style>
    .form-grid {
        display: grid;
        grid-template-columns: 1fr;
    }

    .form-grid > div {
        padding-left: 20%;
        padding-right: 20%;
    }

    .fields {
        padding-top: 8%;
    }

    .registry-form .fields .avatar-container {
        display: block;
        width: 100%;
        height: 100%;

        text-align: center;
    }


    .registry-form .fields .avatar-container .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 50%;

        object-fit: cover;
        object-position: center right;

        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    
    .registry-form .fields .avatar-container .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .registry-form .fields .avatar-container .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

    .registry-form .fields .avatar-container .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }

    @media only screen and (min-width: 770px) {
        form {
            padding-left: 10vh;
            padding-right: 10vh;
        }
    }
</style>