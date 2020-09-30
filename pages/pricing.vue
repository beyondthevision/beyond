<template>
	<div>
		<loading :active.sync="isLoading" :is-full-page="true"></loading>

		<div class="bg-gray-900" v-if="!isLoading">
			<div class="pt-12 px-4 sm:px-6 lg:px-8 lg:pt-20">
				<div class="text-center">
					<h2 class="text-lg leading-6 font-semibold text-gray-300 uppercase tracking-wider">
						Pricing
					</h2>
					<p
						class="mt- text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10 lg:text-5xl lg:leading-none"
					>
						A flexible voice solution for your business
					</p>
					<p class="mt-3 max-w-4xl mx-auto text-xl leading-7 text-gray-300 sm:mt-5 sm:text-2xl sm:leading-8">
						A flexible voice solution that’s easy to set up, integrate and manage
					</p>
				</div>
			</div>

			<div class="mt-16 bg-white pb-12 lg:mt-20 lg:pb-20">
				<div class="relative z-0">
					<div class="absolute inset-0 h-5/6 bg-gray-900 lg:h-2/3"></div>
					<div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
						<div class="relative lg:grid lg:grid-cols-7">
							<div
								class="mx-auto max-w-md lg:mx-0 lg:max-w-none lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3"
							>
								<div
									class="h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-l-lg"
								>
									<div class="flex-1 flex flex-col">
										<div class="bg-white px-6 py-10">
											<div v-if="plans[0]">
												<h3
													class="text-center text-2xl leading-8 font-medium text-gray-900"
													id="tier-hobby"
												>
													{{ plans[0].name }}
												</h3>
												<div class="mt-4 flex items-center justify-center">
													<span
														class="px-3 flex items-start text-6xl leading-none tracking-tight text-gray-900"
													>
														<span class="mt-2 mr-2 text-4xl font-medium">
															$
														</span>
														<span class="font-extrabold">
															{{ plans[0].price }}
														</span>
													</span>
													<span class="text-xl leading-7 font-medium text-gray-500">
														<span v-if="plans[0].priceIsPerUser">user</span>/mo
													</span>
												</div>
											</div>
										</div>
										<div
											class="flex-1 flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 sm:p-10 lg:p-6 xl:p-10"
										>
											<ul v-if="plans[0]">
												<li
													class="flex items-start"
													v-for="feature in plans[0].description.features"
												>
													<div class="flex-shrink-0">
														<svg
															class="h-6 w-6 text-green-500"
															stroke="currentColor"
															fill="none"
															viewBox="0 0 24 24"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M5 13l4 4L19 7"
															/>
														</svg>
													</div>
													<p class="ml-3 text-base leading-6 font-medium text-gray-500">
														{{ feature }}
													</p>
												</li>
											</ul>
											<div class="mt-8">
												<div class="rounded-lg shadow-md">
													<a
														@click="selectPlan(plans[0])"
														class="block w-full text-center hover:text-white rounded-lg border border-transparent bg-white px-6 py-3 text-base leading-6 font-medium text-red-600 hover:text-red-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150"
														aria-describedby="tier-hobby"
													>
														continue
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div
								class="mt-10 max-w-lg mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4"
							>
								<div class="relative z-10 rounded-lg shadow-xl">
									<div
										class="pointer-events-none absolute inset-0 rounded-lg border-2 border-red-600"
									></div>
									<div class="absolute inset-x-0 top-0 transform translate-y-px">
										<div class="flex justify-center transform -translate-y-1/2">
											<span
												class="inline-flex rounded-full bg-red-600 px-4 py-1 text-sm leading-5 font-semibold tracking-wider uppercase text-white"
											>
												Most popular
											</span>
										</div>
									</div>
									<div class="bg-white rounded-t-lg px-6 pt-12 pb-10">
										<div v-if="plans[1]">
											<h3
												class="text-center text-3xl leading-9 font-semibold text-gray-900 sm:-mx-6"
												id="tier-growth"
											>
												{{ plans[1].name }}
											</h3>
											<div class="mt-4 flex items-center justify-center">
												<span
													class="px-3 flex items-start text-6xl leading-none tracking-tight text-gray-900 sm:text-6xl"
												>
													<span class="mt-2 mr-2 text-4xl font-medium">
														$
													</span>
													<span class="font-extrabold">
														{{ plans[1].price }}
													</span>
												</span>
												<span class="text-2xl leading-8 font-medium text-gray-500">
													<span v-if="plans[1].priceIsPerUser">user</span>/mo
												</span>
											</div>
										</div>
									</div>
									<div
										class="border-t-2 border-gray-100 rounded-b-lg pt-10 pb-8 px-6 bg-gray-50 sm:px-10 sm:py-10"
									>
										<ul v-if="plans[1]">
											<li
												class="flex items-start"
												v-for="feature in plans[1].description.features"
											>
												<div class="flex-shrink-0">
													<svg
														class="h-6 w-6 text-green-500"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M5 13l4 4L19 7"
														/>
													</svg>
												</div>
												<p class="ml-3 text-base leading-6 font-medium text-gray-500">
													{{ feature }}
												</p>
											</li>
										</ul>
										<div class="mt-10">
											<div class="rounded-lg shadow-md">
												<a
													@click="selectPlan(plans[1])"
													class="block w-full text-center hover:text-white rounded-lg border border-transparent bg-red-600 px-6 py-4 text-xl leading-6 font-medium text-white hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150"
													aria-describedby="tier-growth"
												>
													continue
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div
								class="mt-10 mx-auto max-w-md lg:m-0 lg:max-w-none lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3"
							>
								<div
									class="h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-r-lg"
								>
									<div class="flex-1 flex flex-col">
										<div class="bg-white px-6 py-10">
											<div v-if="plans[2]">
												<h3
													class="text-center text-2xl leading-8 font-medium text-gray-900"
													id="tier-scale"
												>
													{{ plans[2].name }}
												</h3>
												<div class="mt-4 flex items-center justify-center">
													<span
														class="px-3 flex items-start text-6xl leading-none tracking-tight text-gray-900"
													>
														<span class="mt-2 mr-2 text-4xl font-medium">
															$
														</span>
														<span class="font-extrabold">
															{{ plans[2].price }}
														</span>
													</span>
													<span class="text-xl leading-7 font-medium text-gray-500">
														<span v-if="plans[2].priceIsPerUser">user</span>/mo
													</span>
												</div>
											</div>
										</div>
										<div
											class="flex-1 flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 sm:p-10 lg:p-6 xl:p-10"
										>
											<ul v-if="plans[2]">
												<li
													class="flex items-start"
													v-for="feature in plans[2].description.features"
												>
													<div class="flex-shrink-0">
														<svg
															class="h-6 w-6 text-green-500"
															stroke="currentColor"
															fill="none"
															viewBox="0 0 24 24"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M5 13l4 4L19 7"
															/>
														</svg>
													</div>
													<p class="ml-3 text-base leading-6 font-medium text-gray-500">
														{{ feature }}
													</p>
												</li>
											</ul>
											<div class="mt-8">
												<div class="rounded-lg shadow-md">
													<a
														@click="selectPlan(plans[2])"
														class="block w-full text-center hover:text-white rounded-lg border border-transparent bg-white px-6 py-3 text-base leading-6 font-medium text-red-600 hover:text-red-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150"
														aria-describedby="tier-scale"
													>
														continue
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getPlans } from '../utils/actions';
import Loading from 'vue-loading-overlay';

export default {
	auth: true,
	components: {
		Loading
	},
	data() {
		return {
			isLoading:true,
			plans: [],
		};
	},
	methods: {
		selectPlan(plan) {
      console.log(plan)	
			var stripe = Stripe('pk_test_51HRTnfIjDR27xqglrfSntw1G6CuU1smajYU2vkjMgCRkg26e3oTS9T3qMI2ldNcvxuFYDJYZWlkMvSPcH4pWd3xp00AGyXN9Bs');
      stripe
				.redirectToCheckout({
					mode: 'subscription',
					lineItems: [
						{
							price: plan.stripe_code,
							quantity: 1,
						},
					],
					successUrl: process.env.frontendURL + '/success-payment',
					cancelUrl: process.env.frontendURL + '/error-payment',
				})
		},
		setOrderPlan(prev, next) {
			if (prev.order > next.order) {
				return 1;
			}

			if (prev.order < next.order) {
				return -1;
			}

			return 0;
		},
	},
	async mounted() {
		await this.$auth.fetchUser();

		if (this.$auth.user.agent) {
			this.$router.push({
				name: 'login',
			});
			return;
		}

		if (this.$auth.user.plan && !this.$route.params.upgrade) {
			this.$router.push({
				name: 'dashboard',
			});
	return
		} 

		let result = await getPlans();
		this.plans = result.data;

		this.plans.sort(this.setOrderPlan);

		this.isLoading = false

	},
};
</script>

<style>
body {
	background: #1a202c;
}

.pricing .row-title {
	padding: 5%;
}

.pricing .row-content {
	margin-top: 20%;
}

.pricing .row-content .col .card {
	height: 460px;
	max-width: 320px;
}

.pricing .row-title .col .title {
	color: inherit;
	text-align: center;
	line-height: 1.1em;
	font-weight: 700;
	letter-spacing: -0.049375rem;
	text-transform: none;
	font-size: 50px;
}

.pricing .row-title .col .subtitle {
	color: #666;
	text-align: center;
	letter-spacing: -0.01125rem;
	font-weight: 400;
	text-transform: none;
	margin: 0px;

	font-size: 30px;
}

@media screen and (max-width: 765px) {
	.pricing .row-title {
		padding-left: 1%;
		padding-right: 1%;

		padding-bottom: 30px;
	}
}
</style>
