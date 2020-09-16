<template>
	<div>
		<loading :active.sync="isLoading" :is-full-page="true"></loading>

		<a-row style="margin-top:10px;">
			<a-col :lg="{ span: 12 }" :xs="{ span: 24, offset: 0 }">
				<div>
					<div class="p-4 m-5 bg-white rounded shadow-xl">
						<a href="/"> <img style="filter: brightness(0.25);" width="100" src="/text.png" alt=""/></a>
						<p class="text-gray-800 font-bold mt-4">💳 &nbsp; Customer information</p>

						<p class="mt-4 text-gray-800 font-medium">Please enter your card's details:</p>
						<div class="">
							<label class="block text-sm text-gray-600" for="cus_name">Card</label>

							<Card
								class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
								stripe="pk_test_wVUeie2EhLpRHg689dHmZeYc00PvJYzGwp"
								:options="stripeOptions"
								@change="complete = $event.complete"
							/>
						</div>

						<div class="mt-4">
							<button
								@click="pay"
								class="px-4 py-1 text-black font-light tracking-wider bg-green-300 rounded"
								type="submit"
							>
								💲 Checkout
							</button>
						</div>
					</div>
				</div>
			</a-col>

			<a-col :lg="{ span: 12 }" :xs="{ span: 24, offset: 0 }">
				
					<div class="p-4 m-5 bg-white rounded shadow-xl">
					<div class="block text-left text-sm sm:text-md max-w-sm mx-auto mt-2 text-black px-8 lg:px-6">
						<h1
							style="font-size:30px; font-weight:bold; color:black;"
							class="text-lg font-medium uppercase p-3 pb-0 text-center tracking-wide"
						>
							{{ plan }}
						</h1>
						<h2 style="font-weight:bold; font-size:24px;" class="text-center pb-6">
							${{ price }} <span v-if="priceIsPerUser">/user per</span>
							<span style="color:black;text-decoration:underline;">month</span>
						</h2>
					</div>

					<b>🚰 &nbsp; With this plan you have access to:</b>

					<div class="flex flex-wrap mt-3 px-6" v-if="features">
						<ul>
							<li class="flex items-center" v-for="feature in features">
								<div class=" rounded-full p-2 fill-current text-green-700">
									<svg
										class="w-6 h-6 align-middle"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
										<polyline points="22 4 12 14.01 9 11.01"></polyline>
									</svg>
								</div>
								<span style="font-weight:bold;" class="text-gray-700 text-lg ml-3">{{ feature }}</span>
							</li>
						</ul>
					</div>
					<br />
					<div class="flex flex-wrap mt-3 px-6" v-if="features" style="padding-bottom:30px;">
						<center>
							<img
								width="200"
								src="https://bookmesolid.com/wp-content/uploads/2018/12/powered-by-stripe-300x141.png"
								alt=""
							/>
						</center>
					</div>
				</div>
			</a-col>
		</a-row>
	</div>
</template>

<script>
import formPayment from '../../components/payment/formPayment';
import { Card, createToken } from 'vue-stripe-elements-plus';
import { getPlan, payPlan, registryPayments, updateUser } from '../../utils/actions';
import { msgCode } from '../../utils/textConfig';
import logs from '../../api-front/logs';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import _ from 'lodash';




export default {
	head: {
		link: [
			{
				rel: 'stylesheet',
				href: 'https://unpkg.com/tailwindcss@1.3.5/dist/tailwind.min.css',
			},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700',
			},
		],
	},
	auth: true,
	components: {
		formPayment,
		Loading,
		Card,
	},
	data() {
		return {
			priceIsPerUser: false,
			isLoading: false,
			plan: 'test',
			price: '0.05',
			cardColor: '#000',
			card: '',
			frecuency: 'record',
			features: [],
			complete: false,
			email: null,
			billingAddress: null,
			phone: null,
			loading: false,
			stripeOptions: {
				style: {
					base: {
						fontFamily: 'arial',
					},
				},
				// see https://stripe.com/docs/stripe.js#element-options for details
			},
			currentCardBackground: Math.floor(Math.random() * 25 + 1), // just for fun :D
			isCardFlipped: false,
			focusElementStyle: null,
			isInputFocused: false,
		};
	},
	methods: {
		async pay() {
			let token;
			this.isLoading = true;
			let validation = {
				isValid: true,
			};
			if (validation.isValid) {
				try {
					const response = await createToken();
					token = response.token.id;

					// await payPlan({
					// 	idPlan: this.$route.params.id,
					// 	userId: this.$auth.user.id,
					// 	email: this.email,
					// 	token: token,
					// });




					// let currentDate = new Date();
					// let endDate = currentDate.setDate(currentDate.getDate() + 30);

					// let history = {
					// 	user: this.$auth.user.id,
					// 	currentPlan: this.plan,
					// 	date: new Date(),
					// 	dateStart: new Date(),
					// 	dateEnd: new Date(endDate),

					// 	email: this.email,
					// 	phone: this.phone,
					// 	billingAddress: this.billingAddress,
					// 	price: this.price,
					// };

					// await updateUser(this.$auth.user.id, {
					// 	plan: this.$route.params.id,
					// });

					// registryPayments(history);

					// logs.sendLogInfo('NEW PAYMENT: ' + this.email, history);

					// let msgObj = msgCode['200'];

					// this.isLoading = false;

					// this.$router.push({
					// 	name: 'dashboard',
					// });
				} catch (err) {
					logs.sendLogInfo('ERROR ON PAYMENT: ' + this.email, err);

					this.$error({
						title: 'Error on create the payment', 
						content: 'Please verify your credit card.'
					});

					this.isLoading = false;
					let msgObj = msgCode[status];
				}
			} else {
				this.isLoading = false;
			}
		},
	},
	async mounted() {
		this.isLoading = true;
		this.plan = 'test';
		let id = this.$route.params.id;

		let planPromise = await getPlan(id);
		let plan = planPromise.data[0];

		this.email = this.$auth.user.email;

		if (plan) {
			this.plan = plan.name;
			this.price = plan.price;
			this.priceIsPerUser = plan.priceIsPerUser;

			this.frecuency = plan.description.frecuency ? plan.description.frecuency : '';
			this.cardColor = plan.description.color ? plan.description.color : '#000';
			this.features = plan.description.features ? plan.description.features : '';
			this.isLoading = false;
		}
	},
};
</script>

<style>
body {
	font-family: 'Lato', sans-serif !important;
}

.payment-credit-card {
	padding: 20px 10px;
}

.payment-plan-container {
	padding: 0px 10px;

	display: flex;
	align-items: center;
	justify-content: center;
}

.payment-container .row div .card {
	width: 100%;
}

.payment-container .row div .card .card-header {
	background-color: #fff;
	text-align: center;
	border: none;

	padding: 25px 0px;
}

.payment-container .row div .card .card-header {
	text-transform: capitalize;
}

.payment-container .row div .card .card-footer p {
	color: inherit;
	line-height: 1.5;
	font-size: 2.25rem;
	letter-spacing: -0.049375rem;
	font-weight: 600;

	padding-top: 0px;
}

.payment-container .row div .card .card-footer .tag {
	color: #f2f2f2;
	padding-left: 3px;
	font-size: 70%;
	font-weight: 400;
}

.payment-container .row div .card .card-footer {
	text-align: center;
	background-color: var(--backgroundCardColor);
	color: white;
}

.payment-container .row div .card .card-body ul li::before {
	content: '\f058';

	font-family: FontAwesome;
	display: inline-block;
	font-size: 20px;

	margin-right: 7px;
}

.payment-container .row div .card .card-body ul {
	list-style: none;
	padding: 0;
}

.payment-container .row .payment-credit-card .button-pay {
	background-color: var(--backgroundCardColor) !important;
	margin-top: 20px;
	margin-left: 20px;
}

.payment-container .row .payment-credit-card .card-body .text-mail {
	margin-bottom: 20px;
}

@media screen and (max-width: 765px) {
	.payment-plan-container {
		padding: 0px 10px;
		margin-top: 100px;
	}
}

.ElementsApp,
.ElementsApp .InputElement {
	font-family: 'Lato', sans-serif !important;
}
</style>
