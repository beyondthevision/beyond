<template>
	<div>
		<div>
			<div>

		<a-page-header style="border: 1px solid rgb(235, 237, 240);margin-bottom:10px;" title="Agents Metrics" @back="() => null">

		</a-page-header>

<a-row class="mt-4 ml-4">

			<a-col :lg="{ span: 12 }" :xs="{ span: 24, offset: 0 }">

<div class="border-b border-gray-200">
  <div class="space-y-4 sm:flex sm:items-baseline sm:space-y-0 sm:space-x-10">
    <div>
      <nav class="-mb-px flex space-x-8">

	        <a  class="whitespace-no-wrap pb-4 px-1 border-b-2  font-medium text-sm leading-5 text-indigo-600 focus:outline-none focus:text-indigo-800 focus:border-indigo-700" aria-current="page">
		  <nuxt-link to="/dashboard">
          General Metrics
		  </nuxt-link>
        </a>	  

        <a class="whitespace-no-wrap pb-4 px-1 border-b-2 border-indigo-500 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">

		<nuxt-link to="/dashboard/agents">
          Agent Metrics
		</nuxt-link>
        </a>		


      </nav>
    </div>
  </div>
</div>


	</a-col>

</a-row>

<div>
  <div class="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow md:grid-cols-3">
    <div>
      <div class="px-4 py-5 sm:p-6">
        <dl>
          <dt class="text-base leading-6 font-normal text-gray-900">
           Average call length
          </dt>
          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div class="flex items-baseline text-2xl leading-8 font-semibold text-indigo-600">
             										{{ averageCallLength }}

    
            </div>
          </dd>
        </dl>
      </div>
    </div>
    <div class="border-t border-gray-200 md:border-0 md:border-l">
      <div class="px-4 py-5 sm:p-6">
        <dl>
          <dt class="text-base leading-6 font-normal text-gray-900">
            ASA
          </dt>
          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div class="flex items-baseline text-2xl leading-8 font-semibold text-indigo-600">
										{{ asa }}

            </div>
          </dd>
        </dl>
      </div>
    </div>
    <div class="border-t border-gray-200 md:border-0 md:border-l">
      <div class="px-4 py-5 sm:p-6">
        <dl>
          <dt class="text-base leading-6 font-normal text-gray-900">
										Longest Call Hold
          </dt>
          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div class="flex items-baseline text-2xl leading-8 font-semibold text-indigo-600">
										{{ longestCallHold }}
            </div>
     
          </dd>
        </dl>
      </div>
    </div>
  </div>
</div>

<a-row class="mt-4">

				<el-select @change="changeCampaign" v-model="selectedCampaign" placeholder="Select campaign" clearable>
					<el-option v-for="item in campaigns" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>

				<el-select
					style="margin-top:15px;"
					v-if="selectedCampaign"
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
					style="margin-top:10px;"
					@input="changeDate"
					format="yyyy/MM/dd"
					value-format="yyyy/MM/dd"
					placeholder="Date"
					:value="selectedDateFormatted"
				></el-date-picker>

				<a 
									style="margin-top:10px;"

				@click="removeIntervals" v-if="mainInterval" class="button-live"
					><i class="fas fa-refresh"></i> LIVE</a
				>
				<a 
									style="margin-top:10px;"

				v-if="!mainInterval" @click="registerIntervals" class="button-dead"
					><i class="fas fa-refresh"></i> Real Time</a
				>
</a-col>
</a-row>

<a-row class="mt-4">

			<a-col :lg="{ span: 12 }" :xs="{ span: 24, offset: 0 }">
  <a-card>
	  	        <a-spin v-if="isLoading" />

						<apexchart 
									:height="300"

						v-show="!isLoading" ref="chartDay" type="line" :options="optionsDay" :series="seriesDay"></apexchart>

  </a-card>
		
	</a-col>

			<a-col :lg="{ span: 12 }" :xs="{ span: 24, offset: 0 }">
				  <a-card>
	        <a-spin v-if="isLoading" />

					<apexchart
						v-if="!isLoading"
							ref="chartMonth"
							type="bar"
									:height="300"
							:options="optionsMonth"
							:series="seriesMonth"
						></apexchart>
								  </a-card>

	</a-col>

</a-row>







			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import _ from 'lodash';
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
	name: 'agents',
	async created() {
		  if(process.client){

		await this.getCampaigns();
		  }
	},
	components: {
		Loading,
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

			if (this.$refs.chartMonth) {
				this.$refs.chartMonth.updateOptions({
					xaxis: {
						categories: columns,
					},
				});
			}

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
							data[k].outgoing_call.push(r);
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
						name: 'Canceled',
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

		async changeAgent(agent) {
			if (agent) {
				this.selectedAgent = agent;
				this.getCampaigns();
			}
		},

		async formatDayChart() {
			// get all registers of 5 days ago
			var today = moment(this.selectedDate)
				.add(1, 'days')
				.format('YYYY-MM-DD');
			var minDate = moment(this.selectedDate)
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
					name: 'Canceled',
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
			this.selectedAgent = null;
			await this.getCampaigns();
		},

		seconds2time(seconds) {
			var hours = Math.floor(seconds / 3600);
			var minutes = Math.floor((seconds - hours * 3600) / 60);
			var seconds = seconds - hours * 3600 - minutes * 60;
			var time = '';

			if (hours != 0) {
				time = hours + ':';
			}
			if (minutes != 0 || time !== '') {
				minutes = minutes < 10 && time !== '' ? '0' + minutes : String(minutes);
				time += minutes + ':';
			}
			if (time === '') {
				time = seconds.toFixed(2) + 's';
			} else {
				time += seconds < 10 ? '0' + seconds : String(seconds);
			}
			return time;
		},
		removeIntervals() {
			clearInterval(this.mainInterval);
			this.mainInterval = null;
		},
		async makeAverages() {
			// if not exists calls today
			if (this.callsToday.length < 1) {
				this.asa = 0;
				this.averageCallLength = 0;
				this.longestCallHold = 0;
				return;
			}

			// init sumatory variables
			var waitingTimeSumatory = 0;
			var callDurationSecondsSumatory = 0;

			this.callsToday.forEach((r) => {
				// acumulate the waiting time of every call
				if (r.waitingtime) {
					waitingTimeSumatory += r.waitingtime;
				}
				// acumulate the call duration of every call

				if (r.callDuration) {
					callDurationSecondsSumatory += r.callDuration;
				}
			});

			// get all the call durations and divide over number calls
			var asa = waitingTimeSumatory / this.callsToday.length;

			// convert to seconds, minutes
			this.asa = this.seconds2time(asa);

			// sumatory of call durations over number of calls
			var averageCallLength = callDurationSecondsSumatory / this.callsToday.length;

			// convert to seconds, minutes
			this.averageCallLength = this.seconds2time(averageCallLength);

			// Get the call Duration of Max call duration of all calls
			var longestCallHold = _.maxBy(this.callsToday, 'callDuration');
			if (longestCallHold) {
				this.longestCallHold = this.seconds2time(longestCallHold.callDuration);
			}
		},

		async changeDate(d) {
			this.selectedDate = moment(d);
			this.selectedDateFormatted = d;
			this.isCurrentDateFn();
			this.getCampaigns();
		},
		isCurrentDateFn() {
			if (this.selectedDate) {
				this.selectedDate = moment(this.selectedDate);
				this.isCurrentDate = false;
				if (this.selectedDate && this.selectedDate.isSame(new Date(), 'day')) {
					this.isCurrentDate = true;
				}
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

		async getCampaigns() {
			this.isLoading = true;

			try {
				var campaigns = await getCampaignsByUserEmail(
					this.$auth.user.email,
					this.selectedCampaign,
					this.selectedAgent
				);

				this.campaigns = campaigns.data;

				var callsToday = await getTotalCallsTodayByUserEmail(
					this.$auth.user.email,
					this.selectedCampaign,
					this.selectedAgent,
					this.selectedDate
				);

				this.callsToday = callsToday.data;

				var callsMonth = await getTotalCallMonthByUserEmail(
					this.$auth.user.email,
					this.selectedCampaign,
					this.selectedAgent
				);

				this.callsMonth = callsMonth.data;

				var callsYear = await getCalls(this.$auth.user.email, this.selectedCampaign, this.selectedAgent);

				this.callsYear = callsYear.data;

				var agentsReady = await getAgentsReady(
					this.$auth.user.email,
					this.selectedCampaign,
					this.selectedAgent
				);

				this.agentsReady = agentsReady.data;

				var callsWaiting = await getTotalCallsWaitingByUserEmail(
					this.$auth.user.email,
					this.selectedCampaign,
					this.selectedAgent
				);
				this.callsWaiting = callsWaiting.data;

				var agents = await getAllAgentsByEmail(
					this.$auth.user.email,
					this.selectedCampaign,
					this.selectedAgent
				);

				this.agents = agents.data;
				this.isLoading = false;

				this.formatDayChart();
				this.formatMonthChart();
				this.makeAverages();
			} catch (error) {
				this.isLoading = false;
				console.log('error', error);
			}
		},
	},
	data() {
		return {
			mainInterval: null,
			isLoading: true,
			spacing: [10, 10],
			selectedDate: new Date(),
			selectedDateFormatted: new Date(),
			longestCallHold: 0,
			minWaitingTime: 0,
			maxWaitingTime: 0,
			averageCallLength: 0,
			asa: 0,
			callDuration: 0,
			isCurrentDate: true,
			callsYear: [],
			campaigns: [],
			callsToday: [],
			callsMonth: [],
			callsWaiting: [],
			agentsReady: [],
			selectedCampaign: null,
			selectedAgent: null,
			optionsMonth: {
				tooltip: {
					y: {
						formatter: function(val) {
							return val;
						},
					},
					x: {
						formatter: function(val) {
							return val;
						},
					},
				},

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
				tooltip: {
					y: {
						formatter: function(val) {
							return val;
						},
					},
				},

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
					name: 'Canceled',
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
					name: 'Canceled',
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
	margin-top:15px;
}
</style>
