<template>
	<div>
		<loading :active.sync="isLoading" :is-full-page="true"></loading>

		<main class="bg-white-300 flex-1">
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="Balance"
    @back="() => null"
  >
  <template slot="extra">
	          <div class="extra">

        <a-button key="3"
		size="large"
	

								@click="goToPayments()"
		>
          Payments History
        </a-button>
        <a-button key="2" type="danger"
		size="large"


					v-if="!pendingToCancel"
						@click="dialogVisibleCancel = true"
		
		>
          Cancel Account
        </a-button>


		<a-button
		size="large"


		style="margin-top:10px;"
						v-if="pendingToCancel"
						type="primary"
						@click="cancelCancelation()"
					>
						Cancel Plan cancelation
					</a-button>
        </div>


      </template>

  <div class="content">
        <div class="main">
          <a-descriptions size="small" :column="1">
            <a-descriptions-item label="SIP DOMAIN">
					<span v-if="this.$auth.user.sip_domain_name"> {{ this.$auth.user.sip_domain_name }} 					<vh-copy class="btn btn-primary" :data="$auth.user.sip_domain_name" :label="'Copy'"></vh-copy>
</span>
            </a-descriptions-item>
            <a-descriptions-item label="Actual Period">
              					{{ startPeriodDate }} - {{ endPeriodDate }}

            </a-descriptions-item>
            <a-descriptions-item label="Current Plan">
             {{ this.currentPlan }}
            </a-descriptions-item>
            
          </a-descriptions>
        </div>
</div>

	      </a-page-header>




			<div class="flex flex-wrap mt-1">
				<div class="w-full md:w-1/3 xl:w-1/3">
					<!--Metric Card-->
					<div class="bg-white border rounded shadow p-2">
						<center>
							<client-only>
								<apexchart
									width="250"
									type="radialBar"
									:options="optionsMinutes"
									:series="seriesBalance"
								></apexchart>
							</client-only>

							<button
								@click="goToAddCredit"
								class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3  rounded-full outline-none focus:outline-none mr-1 mb-1"
								type="button"
								style="transition: all .15s ease"
							>
								Buy credit
							</button>

							<button
								@click="goToBuy"
								class="text-blue-500 bg-transparent border border-solid border-blue-500 hover:bg-red-500 hover:text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3  rounded-full outline-none focus:outline-none mr-1 mb-1"
								type="button"
								style="transition: all .15s ease"
							>
								Buy numbers
							</button>
						</center>
					</div>

					<!--/Metric Card-->
				</div>

				<div class="w-full md:w-1/3 xl:w-1/3 ml-2">
					<ul class="flex flex-col bg-gray-300 p-4">
						<li class="border-gray-400 flex flex-row mb-2">
							<div
								class="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
							>
								<div
									class="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4"
								>
									📱
								</div>
								<div class="flex-1 pl-1 mr-16">
									<div class="font-medium">Max IVR</div>
									<div class="text-gray-600 text-sm">
										{{ plan.maxIVR }} IVR
										<nuxt-link :to="{ name: 'pricing', params: { upgrade: true } }">
											<a href="#">Upgrade plan</a>
										</nuxt-link>
									</div>
								</div>
							</div>
						</li>

						<li class="border-gray-400 flex flex-row mb-2">
							<div
								class="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
							>
								<div
									class="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4"
								>
									💳
								</div>
								<div class="flex-1 pl-1 mr-16">
									<div class="font-medium">Max Agents</div>

									<div class="text-gray-600 text-sm">
										{{ plan.maxAgents }} agents
										<nuxt-link :to="{ name: 'pricing', params: { upgrade: true } }">
											<a href="#">Upgrade plan</a>
										</nuxt-link>
									</div>
								</div>
							</div>
						</li>

						<li class="border-gray-400 flex flex-row mb-2">
							<div
								class="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
							>
								<div
									class="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4"
								>
									🧑‍💻
								</div>
								<div class="flex-1 pl-1 mr-16">
									<div class="font-medium">Max campaigns</div>
									<div class="text-gray-600 text-sm">
										{{ plan.maxCampaigns }} campaigns
										<nuxt-link :to="{ name: 'pricing', params: { upgrade: true } }">
											<a href="#">Upgrade plan</a>
										</nuxt-link>
									</div>
								</div>
							</div>
						</li>
					</ul>

					<!--/Metric Card-->
				</div>

			</div>

			<el-dialog title="Cancel Account" :visible.sync="dialogVisibleCancel" width="30%">
				we don't want you to go! Tell us why you are leaving!. By canceling you can continue using the service
				until the end of the period.
				<br />

				<textarea
					v-model="cancelDescription"
					class="form-textarea mt-1 block w-full mt-5 p-2 border-gray-400 border-black"
					rows="3"
					placeholder="Do you cancel due to service problems?"
				></textarea>

				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisibleCancel = false">Cancel</el-button>
					<el-button type="primary" @click="cancelPlan()">Confirm cancelation</el-button>
				</span>
			</el-dialog>
		</main>
	</div>
</template>

<script>
import { getBalance, getLastPlan, getLastCancelation, cancelCancelation, cancelPlan } from '../../api-front/api';
import logs from '../../api-front/logs';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import { getPlan } from '../../utils/actions';
import moment from 'moment';
export default {
    layout: 'loggedLayoutNew',
	async mounted() {
		await this.getBalance();
		await this.getPlan();
		await this.getLastPayment();
		await this.getLastCancelation();
	},
	components: {
		Loading,
	},
	methods: {
		async cancelCancelation() {
			this.isLoading = true;
			await cancelCancelation(this.cancelObj.id);
			this.pendingToCancel = false;
			this.isLoading = false;
		},
		async cancelPlan() {
			const date = new Date();
			const endPeriodDate = moment(date)
				.add(1, 'months')
				.toDate();
			this.isLoading = true;
			var data = {
				account: this.$auth.user.id,
				date: date,
				DateOfCancelation: endPeriodDate,
				description: this.cancelDescription,
			};
			await cancelPlan(data);
			logs.sendLogInfo('PLAN CANCELED ' + this.$auth.user.email, data);

			this.isLoading = false;
			await this.getLastCancelation();
			this.pendingToCancel = true;
			this.dialogVisibleCancel = false;
		},
		goToPayments() {
			logs.sendLogInfo('GO TO PAYMENTS ' + this.$auth.user.email, {
				date: new Date(),
			});
			this.$router.push('/statics/history');
		},
		goToBuy() {
			this.$router.push('/dashboard/add-number');
		},
		goToAddCredit() {
			this.$router.push('/statics/add-credit');
		},
		async getBalance() {
			const balance = await getBalance(this.$auth.user.id);
			this.balance = balance.data.balance;
			this.seriesBalance = [this.balance];
		},
		async getLastCancelation() {
			var request = await getLastCancelation(this.$auth.user.id);
			var data = request.data;
			if (data.length > 0) {
				this.cancelObj = data[0];
				this.pendingToCancel = true;
			}
		},
		async getLastPayment() {
			var request = await getLastPlan(this.$auth.user.id);
			var data = request.data;

			if (data.length > 0) {
				this.lastPayment = data[0];

				const startDate = moment(this.lastPayment.startDate);
				const endPeriodDate = moment(startDate).add(1, 'months');

				console.log('endPeriodDate', endPeriodDate);
				this.endPeriodDate = endPeriodDate.format('YYYY-MM-DD');
				this.startPeriodDate = startDate.format('YYYY-MM-DD');
			}
		},
		async getPlan() {
			var request = await getPlan(this.$auth.user.plan);

			this.currentPlan = request.data[0].name;

			let maxOutboundCallsDaily = request.data[0].maxOutboundCallsDaily;
			let maxSMSDaily = request.data[0].maxSMSDaily;
			let maxCampaigns = request.data[0].maxCampaigns;
			let maxAgents = request.data[0].maxAgents;
			let maxIVR = request.data[0].maxIVR;

			if (maxOutboundCallsDaily && maxOutboundCallsDaily && maxCampaigns) {
				this.plan.maxAgents = maxAgents;
				this.plan.maxCampaigns = maxCampaigns;
				this.plan.maxOutboundCallsDaily = maxOutboundCallsDaily;
				this.plan.maxSMSDaily = maxSMSDaily;
				this.plan.maxIVR = maxIVR;

			}
		},
	},
	data() {
		{
			return {
				isLoading: false,
				currentPlan: null,
				cancelObj: {},
				pendingToCancel: false,
				cancelDescription: '',
				dialogVisibleCancel: false,
				lastPayment: {},
				startPeriodDate: null,
				endPeriodDate: null,
				plan: {
					maxOutboundCallsDaily: 0,
					maxSMSDaily: 0,
					maxCampaigns: 0,
				},
				seriesBalance: [0],
				seriesSMS: [10],
				optionsMinutes: {
					chart: {
						height: 350,
						type: 'radialBar',
						toolbar: {
							show: false,
						},
					},
					plotOptions: {
						radialBar: {
							startAngle: -135,
							endAngle: 225,
							hollow: {
								margin: 0,
								size: '70%',
								background: '#fff',
								image: undefined,
								imageOffsetX: 0,
								imageOffsetY: 0,
								position: 'front',
								dropShadow: {
									enabled: true,
									top: 3,
									left: 0,
									blur: 4,
									opacity: 0.24,
								},
							},
							track: {
								background: '#fff',
								strokeWidth: '67%',
								margin: 0, // margin is in pixels
								dropShadow: {
									enabled: true,
									top: -3,
									left: 0,
									blur: 4,
									opacity: 0.35,
								},
							},

							dataLabels: {
								show: true,
								name: {
									offsetY: -10,
									show: true,
									color: '#888',
									fontSize: '17px',
								},
								value: {
									formatter: function(val) {
										return parseInt(val);
									},
									color: '#111',
									fontSize: '36px',
									show: true,
								},
							},
						},
					},
					fill: {
						type: 'gradient',
						gradient: {
							shade: 'dark',
							type: 'horizontal',
							shadeIntensity: 0.5,
							gradientToColors: ['#ABE5A1'],
							inverseColors: true,
							opacityFrom: 1,
							opacityTo: 1,
							stops: [0, 100],
						},
					},
					stroke: {
						lineCap: 'round',
					},
					labels: ['USD'],
				},
				optionsSMS: {
					chart: {
						height: 350,
						type: 'radialBar',
						toolbar: {
							show: false,
						},
					},
					plotOptions: {
						radialBar: {
							startAngle: -135,
							endAngle: 225,
							hollow: {
								margin: 0,
								size: '70%',
								background: '#fff',
								image: undefined,
								imageOffsetX: 0,
								imageOffsetY: 0,
								position: 'front',
								dropShadow: {
									enabled: true,
									top: 3,
									left: 0,
									blur: 4,
									opacity: 0.24,
								},
							},
							track: {
								background: '#fff',
								strokeWidth: '67%',
								margin: 0, // margin is in pixels
								dropShadow: {
									enabled: true,
									top: -3,
									left: 0,
									blur: 4,
									opacity: 0.35,
								},
							},

							dataLabels: {
								show: true,
								name: {
									offsetY: -10,
									show: true,
									color: '#888',
									fontSize: '17px',
								},
								value: {
									formatter: function(val) {
										return parseInt(val);
									},
									color: '#111',
									fontSize: '36px',
									show: true,
								},
							},
						},
					},
					fill: {
						type: 'gradient',
						gradient: {
							shade: 'dark',
							type: 'horizontal',
							shadeIntensity: 0.5,
							gradientToColors: ['#ABE5A1'],
							inverseColors: true,
							opacityFrom: 1,
							opacityTo: 1,
							stops: [0, 100],
						},
					},
					stroke: {
						lineCap: 'round',
					},
					labels: ['SMS'],
				},
			};
		}
	},
};
</script>

<style>
textarea {
	border: 1px solid #dcdfe6;
}


@media (max-width: 576px) {


   .extra {
    width: 100%;
    margin-left: 0;
    text-align: left;
  }

	.extra button {
		margin-bottom: 10px;
	}

}
</style>
