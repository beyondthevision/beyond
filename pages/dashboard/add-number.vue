<template>
	<div>
		<loading :active.sync="isLoading" :is-full-page="true"></loading>
		<div class="ml-2">
			<a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Add Number" @back="() => null">
			</a-page-header>
		</div>

		<a-row style="margin-top:10px;">
			<a-col :lg="{ span: 4 }" :xs="{ span: 24, offset: 0 }">
				<input
					v-model="search"
					@change="changeSearch"
					v-if="selectedCode"
					placeholder="search number"
					type="text"
					class="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
				/>

				<button
					v-if="selectedCode"
					class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 mb-5"
				>
					search
				</button>

				<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-5" for="grid-password">
					Select country
				</label>

				<el-select @change="changeCode" v-model="selectedCode" placeholder="Select country code" clearable>
					<el-option v-for="item in countries" :key="item.code" :label="item.name" :value="item.code">
					</el-option>
				</el-select>

				<p class="text-gray-600 text-xs italic">Select a number</p>
			</a-col>
		</a-row>

		<a-row style="margin-top:10px;">
			<a-col :lg="{ span: 12 }" :xs="{ span: 24, offset: 0 }">
				<div :key="number.id" class="max-w-sm rounded overflow-hidden shadow-lg" v-for="number in numbers">
					<div class="px-6 py-4">
						<div class="font-bold text-xl mb-2">
							<i class="fa fa-phone"></i>
							{{ number.friendlyName }}
						</div>
						<button
							@click="purchaseNumber(number)"
							class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
						>
							BUY NOW FOR {{ priceLocal.toFixed(2) }} {{ pricingUnit }} OR {{ priceUSD.toFixed(2) }} USD!
						</button>
					</div>
					<div class="px-6 py-4">
						<span
							v-if="number.locality"
							class="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-1"
							>{{ number.locality }}</span
						>
						<span
							class="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-1"
							>SMS</span
						>
						<span
							class="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-1"
							>VOICE</span
						>
					</div>
				</div>

				<button
					v-if="numbers.length > 0"
					@click="changeCode"
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
				>
					Generate Again
				</button>
			</a-col>

			<a-col :lg="{ span: 12 }" :xs="{ span: 24, offset: 0 }">
				<h1 class="mb-5" style="color: black;margin-top:10px;">
					Configure your system in 5 minutes!
				</h1>

				<section class="text-gray-700 body-font">
					<div class="container px-5  mx-auto flex flex-wrap">
						<div class="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
							<div class="h-full w-6 absolute inset-0 flex items-center justify-center">
								<div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
							</div>
							<div
								class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm"
							>
								1
							</div>
							<div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
								<div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
									<h2 class="font-medium title-font text-gray-900 mb-1 text-xl">
										Select a number
									</h2>
									<p class="leading-relaxed">
										First you need to select your number. This number can be used for config a IVR,
										call clients or send SMS campaigns.
									</p>
								</div>
							</div>
						</div>
						<div class="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
							<div class="h-full w-6 absolute inset-0 flex items-center justify-center">
								<div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
							</div>
							<div
								class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm"
							>
								2
							</div>
							<div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
								<div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
									<h2 class="font-medium title-font text-gray-900 mb-1 text-xl">
										Create a campaign
									</h2>
									<p class="leading-relaxed">
										For create the campaign you need to add the schedule, select the number and the
										timezone.
									</p>
								</div>
							</div>
						</div>
						<div class="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
							<div class="h-full w-6 absolute inset-0 flex items-center justify-center">
								<div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
							</div>
							<div
								class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm"
							>
								3
							</div>
							<div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
								<div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
									<h2 class="font-medium title-font text-gray-900 mb-1 text-xl">
										Create Agents
									</h2>
									<p class="leading-relaxed">
										You can create agents for call responses and for the IVR solution.
									</p>
								</div>
							</div>
						</div>
						<div class="flex relative pb-10 sm:items-center md:w-2/3 mx-auto">
							<div class="h-full w-6 absolute inset-0 flex items-center justify-center">
								<div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
							</div>
							<div
								class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm"
							>
								4
							</div>
							<div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
								<div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
									<h2 class="font-medium title-font text-gray-900 mb-1 text-xl">
										Config IVR or add leads
									</h2>
									<p class="leading-relaxed">
										If you have agents in the system you can add leads data for start the campaign
										or you can config a IVR system!
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</a-col>
		</a-row>
	</div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker';
import countries from '../../api-front/countries';

import { getNumbersFromCountryCode, getExchanges, purchaseNumber } from '../../api-front/api';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import logs from '../../api-front/logs';

export default {
	components: {
		Loading,
	},
	methods: {
		changeSearch() {
			this.changeCode();
		},
		percentage(a, b) {
			var c = (parseFloat(a) * parseFloat(b)) / 100;
			return parseFloat(c);
		},
		async purchaseNumber(number) {
			if (number.addressRequirements == 'none') {
				var data = {
					userId: this.$auth.user.id,
					numberToBuy: number.phoneNumber,
					numberPrice: this.priceUSD,
				};

				try {
					var response = await purchaseNumber(data);

					logs.sendLogInfo('ADDED NUMBER ' + this.$auth.user.email, data);

					this.$alert('Your number was added to your account.', 'Completed', {
						confirmButtonText: 'CONTINUE',
						type: 'success',
						center: true,
					});

					this.$router.push('/dashboard/numbers');
				} catch (error) {
					logs.sendLogInfo('ERROR ON BUY NUMBER ' + this.$auth.user.email, error);

					this.$alert(error.response.data.message, 'Error', {
						confirmButtonText: 'Ok',
						type: 'error',
						center: true,
					});
				}
			} else {
				this.$alert('That number requires additional information. Please contact us.', 'Error on process', {
					confirmButtonText: 'OK.',
					type: 'success',
					center: true,
				});
			}
		},
		async changeCode() {
			try {
				this.pricingUnit = null;
				this.isLoading = true;

				var data = await getNumbersFromCountryCode(this.selectedCode, this.search);
				this.numbers = data.data.twilioResponse;
				var pricing = data.data.pricing;

				this.pricingUnit = pricing.priceUnit;

				var exchanges = await getExchanges(this.pricingUnit);
				this.exchanges = exchanges.data;

				var formatted = parseFloat(pricing.phoneNumberPrices[0].base_price);
				var priceToAdd = this.percentage(formatted, 20);
				// console.log(formatted, "price twilio");
				// console.log(priceToAdd, "price to add");

				this.priceLocal = formatted + priceToAdd;

				// console.log(this.priceLocal, "priceLocal");

				var rateUSD = this.exchanges.rates['USD'];

				// console.log("rateUSD", rateUSD, "* priceLocal", this.priceLocal);
				this.priceUSD = rateUSD * this.priceLocal;

				// console.log(this.priceUSD, "priceUSD");
				this.isLoading = false;
				window.scrollTo(500, 0);
			} catch (error) {
				this.isLoading = false;
				console.log(error, 'error');
			}

			// console.log("data", this.pricing);
		},
	},
	data() {
		return {
			search: '',
			isLoading: false,
			exchanges: {},
			numbers: [],
			priceLocal: 0,
			priceUSD: 0,
			pricingUnit: null,
			selectedCode: null,
			countries: countries,
		};
	},
};
</script>

<style lang="scss" scoped></style>
