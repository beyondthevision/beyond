<template>
  <div>
    <b-alert
      :show="configAlert.dismissCountDown"
      dismissible
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 2000; background-color: #e00; border-color: #e00; color: white;"
      :variant="configAlert.variant"
      @dismissed="configAlert.dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      {{ configAlert.msg }}
    </b-alert>
  </div>
</template>

<script>
  export default {
    props: [ 'configAlert' ],
    methods: {
      countDownChanged(dismissCountDown) {
        this.configAlert.dismissCountDown = this.configAlert.dismissCountDown
      }
    }
  }
</script>