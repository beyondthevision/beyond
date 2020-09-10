<template>
    <b-container>
        <div class="setting-spacing">
            <navigationSetting />
            <div class="setting-forms forms-billing">
                <formUserData />
                <changePassword />
                <formAvatar v-if="imageUrl" :imageUrl="imageUrl" />
            </div>
        </div>
    </b-container>
</template>

<script>
  import formUserData from "../components/settings/formUserData"
  import formAvatar from "../components/settings/formAvatar"
  import changePassword from "../components/settings/changePassword"

  import navigationSetting from "../components/settings/navigationSetting"

  import { Loading } from 'element-ui'
  import defaultAvatar from '../assets/media/avatars/profile.png'
  import _ from 'lodash'

  export default {
    auth: true,
    layout: 'header',
    components: {
        formUserData,
        formAvatar,
        changePassword,
        navigationSetting
    },
    data () {
        return {
            user: {
                email: '',
                username: ''
            },
            imageUrl: '',
            activeName: 'user'
        }
    },
    mounted () {
        let validation = this.validate(this.$auth.user)

        if (validation.isValid) {
            this.imageUrl = this.$auth.user.photo.url
        } else {
            this.imageUrl = defaultAvatar
        }
    },
    methods: {
        validate (user) {
            let isValid = true
            let message

            if (_.isNil(user.photo)) {
                isValid = false
                message = 'Empty photo'
            }

            if (user.username === '') {
                isValid = false
                message = 'Empty user name'
            }

             if (user.email === '') {
                isValid = false
                message = 'Empty email'
            }

            return { 
                isValid,
                message
            }
        }
    }
  }
</script>

<style>
    .button-setting {
        background-color: var(--buttonBgColor);
        border-color: var(--buttonBgColor);

        float: right !important;
    }

    .button-setting:hover {
        background-color: var(--buttonHvColor);
        border-color: var(--buttonHvColor);
    }

    .button-setting:active {
        background-color: var(--buttonHvColor) !important;
        border-color: var(--buttonHvColor) !important;
    }

    .forms-billing .card {
        margin-bottom: 30px !important;
        margin: 20px;
    }

    .user-data-container .form-group h3 {
        color: inherit;
        line-height: 1.5;
        font-size: 1.5rem;
        letter-spacing: -0.029375rem;
        font-weight: 600;
        margin: 0px;

        padding-bottom: 20px;
    }
</style>