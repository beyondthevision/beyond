<template>
	<div>
		<div>
			<div>

		<a-page-header style="border: 1px solid rgb(235, 237, 240);margin-bottom:10px;" title="General Metrics" @back="() => null">

		</a-page-header>

				<el-select style="margin-top:2px;" @change="changeCampaign" v-model="selectedCampaign" placeholder="Select campaign" clearable>
					<el-option v-for="item in campaigns" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
				<el-select
					v-show="selectedCampaign"
					@change="changeAgent"
					clearable
					v-model="selectedAgent"
					placeholder="Select agent"
				>
					<el-option
						v-for="item in agents"
						:key="item.id"
						:label="item.user.name + ' ' + item.user.lastName"
						:value="item.id"
					>
					</el-option>
				</el-select>

				<el-date-picker
				style="margin-top:12px;"
					@input="changeDate"
					format="yyyy/MM/dd"
					value-format="yyyy/MM/dd"
					placeholder="Date"
					:value="selectedDateFormatted"
				></el-date-picker>

				<a 
								style="margin-top:12px;"

				v-if="!mainInterval" @click="registerIntervals" class="button-dead"
					><i class="fas fa-refresh"></i> Real Time</a
				>
				<a 
								style="margin-top:12px;"
				@click="removeIntervals" v-if="mainInterval" class="button-live"
					><i class="fas fa-refresh"></i> LIVE</a
				>
			</div>
		</div>

		<div class="flex flex-wrap mt-5">
			<div class="w-full md:w-4/4 xl:w-4/4 pl-3">
				<ejs-dashboardlayout id="defaultLayout" :cellSpacing="spacing" :columns="6">
					<div style="margin-top:5px;" id="one" class="e-panel" data-row="0" data-col="0" data-sizeX="1" data-sizeY="2">
						<div class="bg-white  rounded  p-2">
							<div class="flex flex-row items-center">
								<div class="flex-shrink pr-4">
									<div class="rounded p-3 bg-green-600">
										<i class="fa fa-phone fa-2x fa-fw fa-inverse"></i>
									</div>
								</div>
								<div class="flex-1 text-right md:text-center">
									<h5 class="font-bold uppercase text-gray-500">
										Calls Waiting
									</h5>
									<h3 class="font-bold text-3xl">
										{{ callsWaiting.length }}
										<span class="text-green-500"><i class="fas fa-caret-up"></i></span>
									</h3>
								</div>
							</div>
						</div>

						<div class="bg-white  rounded p-2">
							<div class="flex flex-row items-center">
								<div class="flex-shrink pr-4">
									<div class="rounded p-3 bg-yellow-600">
										<i class="fas fa-user-plus fa-2x fa-fw fa-inverse"></i>
									</div>
								</div>
								<div class="flex-1 text-right md:text-center">
									<h5 class="font-bold uppercase text-gray-500">
										Agents conected
									</h5>
									<h3 class="font-bold text-3xl">
										{{ agentsReady.length }}
										<span class="text-yellow-600"><i class="fas fa-caret-up"></i></span>
									</h3>
								</div>
							</div>
						</div>

						<div class="bg-white  rounded p-2 mt-1">
							<div class="flex flex-row items-center">
								<div class="flex-shrink pr-4">
									<div class="rounded p-3 bg-red-600">
										<i class="fas fa-users fa-2x fa-fw fa-inverse"></i>
									</div>
								</div>
								<div class="flex-1 text-right md:text-center mt-1">
									<h5 class="font-bold uppercase text-gray-500">
										Total calls
									</h5>
									<h3 class="font-bold text-3xl">
										{{ callsToday.length }}
										<span class="text-red-500"><i class="fas fa-exchange-alt"></i></span>
									</h3>
								</div>
							</div>
						</div>
					</div>

					<div
						id="three"
						style="height:392px;margin-top:5px;margin-bottom:15px;"
						class="e-panel"
						data-row="0"
						data-col="1"
						data-sizeX="2"
						data-sizeY="2"
					>
						<div class="e-panel-container">
							<div class="text-align">
								<a
									style="padding:10px;margin-top:10px; font-weight:bold; color:black;"
									v-show="isLoading"
									>Loading..</a
								>
								<apexchart
									ref="chartMonth"
									type="bar"
									v-show="!isLoading"
									:options="optionsMonth"
									:series="seriesMonth"
								></apexchart>
							</div>
						</div>
					</div>

					<div
						id="six"
						style="height:392px;margin-top:5px;"
						class="e-panel"
						data-row="0"
						data-col="3"
						data-sizeX="2"
						data-sizeY="2"
					>
						<div class="e-panel-container">
							<div class="text-align">
								<a
									style="padding:10px;margin-top:10px; font-weight:bold; color:black;"
									v-show="isLoading"
									>Loading..</a
								>
								<apexchart
									ref="chartDay"
									v-show="!isLoading"
									type="line"
									:options="optionsDay"
									:series="seriesDay"
								></apexchart>
							</div>
						</div>
					</div>

<div
						id="seven"
						class="e-panel"
						data-row="3"
						data-col="0"
						data-sizeX="1"
						data-sizeY="1"
					>

								<div class="flex-1 text-right text-center" style="padding:20px;">
									<h5 class="font-bold uppercase text-black">
										HOUR {{$auth.user.timezone}}
									</h5>
									<h3 class="font-bold text-3xl text-black">
																{{hour}}

										<span class="text-green-500"><i class="fas fa-clock"></i></span>
									</h3>
								</div>


					</div>

				</ejs-dashboardlayout>

			</div>
		</div>
	</div>
</template>

<script>
import * as moment from 'moment-timezone';
import {
	getCalls,
	getCampaignsByUserEmail,
	getTotalCallsTodayByUserEmail,
	getTotalCallsWaitingByUserEmail,
	getAgentsReady,
	getAllAgentsByEmail,
	getTotalCallMonthByUserEmail,
} from '../../api-front/api';

import Vue from 'vue';
import { DashboardLayoutPlugin } from '@syncfusion/ej2-vue-layouts';
Vue.use(DashboardLayoutPlugin);

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import logs from '../../api-front/logs';

export default {
	components: {
		Loading,
	},
	async mounted() {
		await this.getCampaigns();
		this.isCurrentDateFn();
		this.mainInterval = null;
		//this.registerIntervals();
	},
	watch: {
		selectedDateFormatted(date) {
			if (!date) {
				location.reload();
			}
		},
	},
	beforeDestroy() {
		clearInterval(this.mainInterval);
	},
	methods: {
		removeIntervals() {
			clearInterval(this.mainInterval);
			this.mainInterval = null;
		},
		registerIntervals() {
			if (!this.mainInterval) {
				this.mainInterval = setInterval(() => {
					this.getAgentsReady();
					this.getCallsWaiting();
					this.getCallsToday();
				}, 10000);
			}
		},
		async formatMonthChart() {
			var currentMonth = moment().month() + 1;
			var columns = [];
			var monthsIndex = [];
			var months = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
			var data = [];
			for (let index = 0; index < currentMonth; index++) {
				columns.push(months[index]);
				monthsIndex.push(index);
			}

			this.$refs.chartMonth.updateOptions({
				xaxis: {
					categories: columns,
				},
			});

			columns.forEach((i, k) => {
				var ranges = this.getMonthDateRange(moment().year(), k + 1);
				var start = ranges.start;
				var end = ranges.end;

				this.callsYear.forEach((r) => {
					if (_.isNil(data[k])) {
						data[k] = {
							outgoing_call: [],
							incoming_call: [],
							canceled: [],
						};
					}

					if (new Date(r.datetime) >= start && new Date(r.datetime) <= end) {
						if (r.type == 'outgoing_call') {
							data[k].outgoing_call.push(r);
						}

						if (r.type == 'incoming_call') {
							data[k].incoming_call.push(r);
						}

						if (r.canceled) {
							data[k].canceled.push(r);
						}
					}
				});

				var seriesMonth = [
					{
						name: 'Inbound',
						data: [],
					},
					{
						name: 'Outbound',
						data: [],
					},
					{
						name: 'Not Answer',
						data: [],
					},
				];

				data.forEach((i) => {
					if (i.incoming_call) {
						seriesMonth[0].data.push(i.incoming_call.length);
					}

					if (i.outgoing_call) {
						seriesMonth[1].data.push(i.outgoing_call.length);
					}

					if (i.canceled) {
						seriesMonth[2].data.push(i.canceled.length);
					}
				});

				this.seriesMonth = seriesMonth;
			});
		},

		async changeDate(d) {
			if (d) {
				this.selectedDate = moment(d).tz(this.$auth.user.timezone);
				this.selectedDateFormatted = d;
				console.log(this.selectedDateFormatted);
				this.isCurrentDateFn();
				this.getCampaigns();
			}
		},

		async formatDayChart() {
			// get all registers of 5 days ago
			var today = moment(this.selectedDate)
				.tz(this.$auth.user.timezone)
				.add(1, 'days')
				.format('YYYY-MM-DD');
			var minDate = moment(this.selectedDate)
				.tz(this.$auth.user.timezone)
				.subtract(5, 'days')
				.format('YYYY-MM-DD');

			today = new Date(today).getTime();
			minDate = new Date(minDate).getTime();

			//calls five days after
			const calls5DaysAgo = [];
			this.callsMonth.forEach((r) => {
				if (new Date(r.datetime).getTime() >= minDate && new Date(r.datetime).getTime() <= today) {
					calls5DaysAgo.push(r);
				}
			});

			// Get 5 days after dates (Columns)
			var minDate1 = moment(this.selectedDate);
			var minDate1Formatted = minDate1.format('MM-DD');

			var minDate1Data = [];
			var minDate1OutGoing = [];
			var minDate1InGoing = [];
			var minDate1Canceled = [];

			calls5DaysAgo.forEach((r) => {
				if (r.datetime) {
					if (moment(r.datetime).isSame(minDate1, 'day')) {
						if (r.type == 'outgoing_call') {
							minDate1OutGoing.push(r);
						}

						if (r.type == 'incoming_call') {
							minDate1InGoing.push(r);
						}

						if (r.canceled) {
							minDate1Canceled.push(r);
						}
					}
				}
			});

			var minDate2 = moment(this.selectedDate).subtract(1, 'days');
			var minDate2Formatted = minDate2.format('MM-DD');
			var minDate2Data = [];

			var minDate2Data = [];
			var minDate2OutGoing = [];
			var minDate2InGoing = [];
			var minDate2Canceled = [];

			calls5DaysAgo.forEach((r) => {
				if (r.datetime) {
					if (moment(r.datetime).isSame(minDate2, 'day')) {
						if (r.type == 'outgoing_call') {
							minDate2OutGoing.push(r);
						}

						if (r.type == 'incoming_call') {
							minDate2InGoing.push(r);
						}

						if (r.canceled) {
							minDate2Canceled.push(r);
						}
					}
				}
			});

			var minDate3 = moment(this.selectedDate).subtract(2, 'days');
			var minDate3Formatted = minDate3.format('MM-DD');
			var minDate3Data = [];
			var minDate3OutGoing = [];
			var minDate3InGoing = [];
			var minDate3Canceled = [];

			calls5DaysAgo.forEach((r) => {
				if (r.datetime) {
					if (moment(r.datetime).isSame(minDate3, 'day')) {
						if (r.type == 'outgoing_call') {
							minDate3OutGoing.push(r);
						}

						if (r.type == 'incoming_call') {
							minDate3InGoing.push(r);
						}

						if (r.canceled) {
							minDate3Canceled.push(r);
						}
					}
				}
			});

			var minDate4 = moment(this.selectedDate).subtract(3, 'days');
			var minDate4Formatted = minDate4.format('MM-DD');
			var minDate4Data = [];
			var minDate4OutGoing = [];
			var minDate4InGoing = [];
			var minDate4Canceled = [];

			calls5DaysAgo.forEach((r) => {
				if (r.datetime) {
					if (moment(r.datetime).isSame(minDate4, 'day')) {
						if (r.type == 'outgoing_call') {
							minDate4OutGoing.push(r);
						}

						if (r.type == 'incoming_call') {
							minDate4InGoing.push(r);
						}

						if (r.canceled) {
							minDate4Canceled.push(r);
						}
					}
				}
			});

			var minDate5 = moment(this.selectedDate).subtract(4, 'days');
			var minDate5Formatted = minDate5.format('MM-DD');
			var minDate5Data = [];

			var minDate5OutGoing = [];

			var minDate5InGoing = [];

			var minDate5Canceled = [];

			calls5DaysAgo.forEach((r) => {
				if (r.datetime) {
					if (moment(r.datetime).isSame(minDate5, 'day')) {
						if (r.type == 'outgoing_call') {
							minDate5OutGoing.push(r);
						}

						if (r.type == 'incoming_call') {
							minDate5InGoing.push(r);
						}

						if (r.canceled) {
							minDate5Canceled.push(r);
						}
					}
				}
			});

			this.$refs.chartDay.updateOptions({
				xaxis: {
					categories: [
						minDate5Formatted,
						minDate4Formatted,
						minDate3Formatted,
						minDate2Formatted,
						minDate1Formatted,
					],
				},
			});

			this.seriesDay = [
				{
					name: 'Inbound',
					data: [
						minDate5InGoing.length,
						minDate4InGoing.length,
						minDate3InGoing.length,
						minDate2InGoing.length,
						minDate1InGoing.length,
					],
				},
				{
					name: 'Outbound',
					data: [
						minDate5OutGoing.length,
						minDate4OutGoing.length,
						minDate3OutGoing.length,
						minDate2OutGoing.length,
						minDate1OutGoing.length,
					],
				},
				{
					name: 'Not Answer',
					data: [
						minDate5Canceled.length,
						minDate4Canceled.length,
						minDate3Canceled.length,
						minDate2Canceled.length,
						minDate1Canceled.length,
					],
				},
			];
		},
		async changeCampaign(id) {
			this.selectedCampaign = id;
			await this.getCampaigns();
		},

		async changeAgent(agent) {
			this.selectedAgent = agent;
			this.getCampaigns();
		},

		async getCallsWaiting() {
			try {
				var callsWaiting = await getTotalCallsWaitingByUserEmail(
					this.$auth.user.email,
					this.selectedCampaign,
					this.selectedAgent
				);
				this.callsWaiting = callsWaiting.data;
			} catch (error) {
				console.log('Error to obtain calls waiting', error);
			}
		},

		async getCallsToday() {
			try {
				var callsToday = await getTotalCallsTodayByUserEmail(
					this.$auth.user.email,
					this.selectedCampaign,
					this.selectedAgent,
					this.selectedDate
				);

				this.callsToday = callsToday.data;
			} catch (error) {
				console.log('Error to obtain calls today', error);
			}
		},

		async getAgentsReady() {
			try {
				var agentsReady = await getAgentsReady(
					this.$auth.user.email,
					this.selectedCampaign,
					this.selectedAgent
				);

				this.agentsReady = agentsReady.data;
			} catch (error) {
				console.log('Error to get agents ready', agentsReady);
			}
		},

		getMonthDateRange(year, month) {
			// month in moment is 0 based, so 9 is actually october, subtract 1 to compensate
			// array is 'year', 'month', 'day', etc
			var startDate = moment([year, month - 1]);

			// Clone the value before .endOf()
			var endDate = moment(startDate).endOf('month');

			// make sure to call toDate() for plain JavaScript date type
			return { start: startDate, end: endDate };
		},
		isCurrentDateFn() {
			if (this.selectedDate) {
				this.selectedDate = moment(this.selectedDate).tz(this.$auth.user.timezone);
				this.isCurrentDate = false;
				if (this.selectedDate && this.selectedDate.isSame(new Date(), 'day')) {
					this.isCurrentDate = true;
				}
			}
		},
		async getCampaigns() {
			if (!this.selectedDate) {
				this.selectedDate = moment.tz(this.$auth.user.timezone);
			}

			try {
				this.isLoading = true;
				var campaigns = await getCampaignsByUserEmail(
					this.$auth.user.email,
					this.selectedCampaign,
					this.selectedAgent
				);
				this.campaigns = campaigns.data;
			} catch (error) {
				console.log('Error to obtain campaigns by user', error);
			}

			try {
				var callsMonth = await getTotalCallMonthByUserEmail(
					this.$auth.user.email,
					this.selectedCampaign,
					this.selectedAgent
				);

				this.callsMonth = callsMonth.data;
			} catch (error) {
				console.log('Error to obtain call months', error);
			}

			try {
				var callsYear = await getCalls(
					this.$auth.user.email,
					this.selectedCampaign,
					this.selectedAgent,
					this.selectedDate
				);
				this.callsYear = callsYear.data;
			} catch (error) {
				console.log('Error to obtain anual error', error);
			}

			this.getAgentsReady();

			this.getCallsWaiting();

			this.getCallsToday();

			try {
				var agents = await getAllAgentsByEmail(
					this.$auth.user.email,
					this.selectedCampaign,
					this.selectedAgent
				);

				this.agents = agents.data;
			} catch (error) {
				console.log('Error to obtain agents', error);
			}

			this.formatDayChart();
			this.formatMonthChart();
			this.isLoading = false;
		},
	},
	data() {
		return {
			hour: moment().tz(this.$auth.user.timezone).format('hh:mm a'),
			isLoading: true,
			count: 8,
			spacing: [10, 10],
			mainInterval: null,
			selectedDate: new Date(),
			selectedDateFormatted: new Date(),
			isCurrentDate: true,
			agents: [],
			callsYear: [],
			campaigns: [],
			callsToday: [],
			callsMonth: [],
			callsWaiting: [],
			agentsReady: [],
			selectedCampaign: null,
			selectedAgent: null,
			optionsMonth: {
				title: {
					text: 'Calls per month',
					align: 'left',
				},
				chart: {
					id: 'vuechart-example',
				},
				xaxis: {
					categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
				},
			},
			optionsDay: {
				title: {
					text: 'Calls per day',
					align: 'left',
				},
				chart: {
					id: 'vuechart-example',
				},
				xaxis: {
					categories: ['13/5', '14/5', '15/5', '16/5'],
				},
			},
			seriesDay: [
				{
					name: 'Inbound',
					data: [],
				},
				{
					name: 'Outbound',
					data: [],
				},
				{
					name: 'Lose',
					data: [],
				},
			],
			seriesMonth: [
				{
					name: 'Inbound',
					data: [],
				},
				{
					name: 'Outbound',
					data: [],
				},
				{
					name: 'Lose',
					data: [],
				},
			],
		};
	},
};
</script>

<style>
@import '../../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-vue-layouts/styles/material.css';

.el-select {
	width:220px !important;
}

.button-live {
	-webkit-border-radius: 10px;
	border-radius: 10px;
	border: none;
	color: #ffffff;
	cursor: pointer;
	display: inline-block;
	font-family: Arial;
	font-size: 12px;
	padding: 5px 10px;
	text-align: center;
	text-decoration: none;
	-webkit-animation: glowing 1500ms infinite;
	-moz-animation: glowing 1500ms infinite;
	-o-animation: glowing 1500ms infinite;
	animation: glowing 1500ms infinite;
}

.button-dead {
	-webkit-border-radius: 10px;
	border-radius: 10px;
	border: none;
	color: #ffffff;
	cursor: pointer;
	display: inline-block;
	font-family: Arial;
	font-size: 12px;
	background: black;
	padding: 5px 10px;
	text-align: center;
	text-decoration: none;
}

@-webkit-keyframes glowing {
	0% {
		background-color: #b20000;
		-webkit-box-shadow: 0 0 3px #b20000;
	}
	50% {
		background-color: #ff0000;
		-webkit-box-shadow: 0 0 40px #ff0000;
	}
	100% {
		background-color: #b20000;
		-webkit-box-shadow: 0 0 3px #b20000;
	}
}

@-moz-keyframes glowing {
	0% {
		background-color: #b20000;
		-moz-box-shadow: 0 0 3px #b20000;
	}
	50% {
		background-color: #ff0000;
		-moz-box-shadow: 0 0 40px #ff0000;
	}
	100% {
		background-color: #b20000;
		-moz-box-shadow: 0 0 3px #b20000;
	}
}

@-o-keyframes glowing {
	0% {
		background-color: #b20000;
		box-shadow: 0 0 3px #b20000;
	}
	50% {
		background-color: #ff0000;
		box-shadow: 0 0 40px #ff0000;
	}
	100% {
		background-color: #b20000;
		box-shadow: 0 0 3px #b20000;
	}
}

@keyframes glowing {
	0% {
		background-color: #b20000;
		box-shadow: 0 0 3px #b20000;
	}
	50% {
		background-color: #ff0000;
		box-shadow: 0 0 40px #ff0000;
	}
	100% {
		background-color: #b20000;
		box-shadow: 0 0 3px #b20000;
	}
}

.button-live:hover {
	color: white;
}
</style>
