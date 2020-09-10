<template>
    <div>
      <b-alert
        :show="dismissCountDown"
        dismissible
        :variant="typeAlert"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >
        <p> {{ response }} </p>
      </b-alert>
    </div>
</template>

<script>
export default {
    data () {
        return {
            typeAlert: 'info',
            dismissSecs: 5,
            dismissCountDown: 0,
            showDismissibleAlert: false
        }
    },
    props: [ 'response' ],
    methods: {
        countDownChanged(dismissCountDown) {
          this.dismissCountDown = dismissCountDown
        },
        showAlert() {
          this.dismissCountDown = this.dismissSecs
        }
    }
}
</script>