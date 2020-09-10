
<template>
    <b-toast id="msg-notification" 
        :title="title"
        @change="changeMsg"
        :variant="variant">
        {{ msg }}
    </b-toast>
</template>

<script>
import { msgCode } from '../../utils/textConfig'
export default {
    props: [ 'code', 'msgError' ],
    methods: {
        changeMsg () {
            if (this.code) {
                if (msgCode[this.code]) {
                    this.title = msgCode[this.code].title
                    this.msg = msgCode[this.code].msg
                    this.variant = msgCode[this.code].variant
                }
            } else {
                if (this.msgError) {
                    this.title = ''
                    this.msg = this.msgError
                }
            }
        }
    },
    data () {
        return {
            title: 'Error',
            msg: 'Reply later',
            variant: 'danger'   
        }
    }
}
</script>