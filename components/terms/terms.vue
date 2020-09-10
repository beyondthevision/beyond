<template>
    <div class="term-container">
        <div class="letters" v-html="this.text"></div>
    </div>
</template>

<script>
export default {
    async mounted() {
        let response =  await fetch('/terms.txt')
        this.text = await response.text()
        let body = document.getElementsByTagName('body')[0]
        body.className = 'invert-body '
        window.onbeforeunload = function() { 
            let body = document.getElementsByTagName('body')[0]
            body.className = ''
        };
    },
    data () {
        return {
            text: ''
        }
    }
}
</script>

<style>
    .invert-body {
         filter: invert(100%);
         background-color:black;
    }
    
    .invert-body .term-container {
        max-width: 1024px;
        margin: auto;

        padding-top: 20px;  
    }

    .invert-body .title-nav > a > img {
        filter: invert(100%) !important;
    }

    .invert-body .profile-img {
        filter: invert(100%) !important;
    }
</style>