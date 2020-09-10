<template>
    <b-card :class="[
        'pricing-plan-' + this.plan.name,
        'pricing-card',
        'shadow',
        'mb-5',
        'bg-white',
        'rounded',
    ]">
        <template v-slot:header>
            <h2>{{ plan.name }}</h2>
        </template>

        <b-card-body>
            <ul>
                <li v-for="feature in features" :key="features.indexOf(feature)">
                    {{ feature }}
                </li>
            </ul>
        </b-card-body>

        <template v-slot:footer>
            <p v-if="plan.price !== 0">
                <span>${{ plan.price }} </span>
                <span class="tag"> /{{ plan.description.frecuency }}</span>
            </p>

            <p v-if="plan.price === 0">
                <span style="text-transform:capitalize;" class="tag"> {{ plan.description.frecuency }}</span>
            </p>
            <b-button @click="setPlan" name="test" variant="dark" block>Get Started</b-button>
        </template>

    </b-card>
</template>

<script>
    export default {
        props: [ 'plan' ],
        data () {
            return {
                cardColor: this.plan.description.color,
                features:  this.plan.description.features,
                colorClass: 'pricing-plan-' + this.plan.id + ' pricing-card shadow mb-5 bg-white rounded'
            }
        },
        methods: {
            setPlan(event) {
                this.$router.push({ path: '/payment/' + this.plan.id })
                this.$emit('setPlan', event)
            }
        },
        mounted () { }
    }
</script>

<style>
    .pricing-card .card-header {
        background-color:#fff;
        border: none;
        text-align: center;

        padding: 25px 0px;
    }

    .pricing-card .card-header {
        text-transform: capitalize;
    }

    /* first element */
    .pricing-plan-test ul li::before {
        color: #000 !important;
    }

    .pricing-plan-test .card-footer .btn {
        background-color: #000 !important;
        border-color: #000;
    }

    .pricing-plan-test .card-footer .btn:hover {
        background-color: #333333;
        border-color: #333333;
    } 
    /*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>><< */

     /* second element */
    .pricing-plan-business ul li::before {
        color: #0070f3 !important;
    }

    .pricing-plan-business .card-footer .btn {
        background-color: #0070f3 !important;
        border-color: #0070f3;
    }

    .pricing-plan-bussiness .card-footer .btn:hover {
        background-color: #3392ff;
        border-color: #3392ff;
    } 
    /*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>><< */


     /* first element */
    .pricing-plan-enterprise ul li::before {
        color: #ff0080 !important;
    }

    .pricing-plan-enterprise .card-footer .btn {
        background-color: #ff0080 !important;
        border-color: #ff0080;
    }

    .pricing-plan-enterprise .card-footer .btn:hover {
        background-color: #ff80bf;
        border-color: #ff80bf;
    } 
    /*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>><< */

    .pricing-card .card-header h2 {
        color: inherit;
        font-size: 2.25rem;
        font-weight: 600;
        margin: auto;
    }

    .pricing-card .card-footer button {
        font-weight: 400;
        height: 50px !important;
    }

    .pricing-card .card-footer p {
        color: inherit;
        line-height: 1.5;
        font-size: 2.25rem;
        letter-spacing: -0.049375rem;
        font-weight: 600;
        margin: 0px;

        padding-bottom: 10px;
    }
    
    .pricing-card .card-footer .tag {
        color: #666;
        padding-left: 3px;
        font-size: 70%;
        font-weight: 400;
    }

    .pricing-card .card-footer {
        text-align: center;
    }

    .pricing-card .card-body ul li::before {
        content: "\f058";

        font-family: FontAwesome;
        display: inline-block;
        font-size: 20px;

        margin-right: 7px;
    }

    .pricing-card .card-body ul {
        list-style: none;
        padding: 0;
    }

</style>