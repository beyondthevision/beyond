<template>
    <b-modal id="notification" hide-footer hide-header>
       {{ response }}
    </b-modal>
</template>

<script>
export default {
    props : [ 'response' ],
}
</script>
