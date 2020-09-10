<template>
    <div>
        <formCampaign />
    </div>
</template>

<script>
import formCampaign from '../components/campaign/formCampaign'
export default {
    auth: true,
    layout: 'header',
    components: {
        formCampaign
    }
}
</script>

<style>
    
</style>