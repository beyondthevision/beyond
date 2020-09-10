<template>
    <b-card>
        <div class="main-container">
            <div class="avatar-container">
                <span>
                    <h3>Your Avatar</h3>
                </span>
                <p>This is your avatar. <br>
                Click on the avatar to upload a custom one from your files.</p>
            </div>
            <div>
                <el-upload
                    class="avatar-uploader"
                    action=""
                    :on-change="addAttachment"
                    :show-file-list="false">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
        </div>
        <template v-slot:footer>
            <h6>An avatar is optional but strongly recommended.</h6>
        </template>
    </b-card>
</template>

<script>
    import defaultAvatar from '../../assets/media/avatars/profile.png'
    import { updateAvatar, getAvatar } from '../../utils/actions'
    import { Loading } from 'element-ui'

    import { msgCode } from '../../utils/textConfig'

    export default {
        props: [ 'user', 'imageUrl' ],
        data() {
            return {
                code: '200'
            }
        },
        methods: {
            addAttachment (file) {
                let loadingInstance = Loading.service({})
                let formData = new FormData()
                formData.append('files', file.raw)
                formData.set('ref', "user")
                formData.set('source', "users-permissions")
                formData.set('refId', this.$auth.user.id)
                formData.set('field', 'photo')
                
                updateAvatar(formData)
                .then((response) => {
                    loadingInstance.close()

                    let msgObj = msgCode['200']
                
                    this.$notify({
                        title: msgObj.title,
                        message: 'Your avatar was changed correctly.',
                        type: msgObj.variant
                    })

                    this.$auth.fetchUser()

                    window.location.href = "/"
                })
                .catch(err => {
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
        }
  }
</script>

<style>
    .card h6 {
        text-transform: initial;
    }

    p {
        padding-top: 20px;
        color: inherit;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.6;
    }

    h4 {
        color: inherit;
        line-height: 1.5;
        font-size: 1.25rem;
        letter-spacing: -0.020625rem;
        font-weight: 600;
        margin: 0px;
    }

    .avatar-container span h3 {
        color: inherit;
        line-height: 1.5;
        font-size: 1.5rem;
        letter-spacing: -0.029375rem;
        font-weight: 600;
        margin: 0px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 50%;

        object-fit: cover;
        object-position: center right;

        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }

    .main-container {
        display: grid;

        grid-template-columns: 6fr 1fr;
        grid-template-rows: 1fr;
    }

    .footer-card {
        display: grid;

        grid-template-columns: 9fr 1fr;
    }
</style>