<template>
	<div>
		<loading :active.sync="isLoading" :is-full-page="true"></loading>

		<a-modal title="Add number" :visible.sync="dialogVisibleAdd" :before-close="handleClose">
			<el-select v-model="numberToAdd" placeholder="Select number">
				<el-option v-for="item in agents" :key="item.id" :label="item.user.name" :value="item.id"> </el-option>
			</el-select>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisibleAdd = false">Cancel</el-button>
				<el-button type="primary" @click="saveAgent">Confirm</el-button>
			</span>
		</a-modal>

		<a-row style="margin-top:20px;">
			<a-col :lg="{ span: 12 }" :xs="{ span: 24, offset: 0 }">
				<h3 class="font-bold">List of Numbers</h3>
				<button
					@click="addAgent"
					class="float-right bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
				>
					➕ Add
				</button>
			</a-col>
		</a-row>

		<a-row style="margin-top:20px;">
			<a-col :lg="{ span: 12 }" :xs="{ span: 24, offset: 0 }">
				<ul class="flex flex-col bg-gray-300 p-4" v-if="selectedAgents.length > 0">
					<li class="border-gray-400 mb-2" v-for="agent in campaign.agents">
						<div
							class="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
						>
							<div class="flex-1 pl-1 mr-16">
								<div class="font-medium">{{ agent.identifier }}</div>
								<div class="text-gray-600 text-sm">
									{{ agent.user.phone }}
								</div>
							</div>
							<div @click="deleteNumber(agent)" class="text-gray-600 text-xs">
								Delete
							</div>
						</div>
					</li>
				</ul>
			</a-col>
		</a-row>
	</div>
</template>

<script>
import logs from '../../../api-front/logs';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import {
	getAgents,
	getById,
	updateCampaign,
	updateNumber,
	addAgentInTwilio,
	deleteNumberInTwilio,
	getNumbersNoIVR,
} from '../../../api-front/api';
import _ from 'lodash';
export default {
	data() {
		return {
			isLoading: false,
			numberToAdd: null,
			show: true,
			loaded: false,
			selectedRegisterId: null,
			selectedAgents: [],
			agents: [],
			campaign: {},
			dialogVisibleAdd: false,
		};
	},
	methods: {
		async deleteNumber(agent) {
			this.isLoading = true;
			this.selectedAgents = this.selectedAgents.filter(function(item) {
				return item !== agent.id;
			});
			await updateCampaign(this.selectedRegisterId, {
				agents: this.selectedAgents,
			});

			this.isLoading = false;

			await this.getData();
		},
		handleClose() {
			this.dialogVisibleAdd = false;
		},
		addAgent() {
			this.dialogVisibleAdd = true;
		},
		async saveAgent() {
			this.isLoading = true;
			this.selectedAgents.push(this.numberToAdd);
			await updateCampaign(this.selectedRegisterId, {
				agents: this.selectedAgents,
			});
			this.isLoading = false;
			await this.getData();
			this.dialogVisibleAdd = false;
			this.numberToAdd = null;
		},
		async getAgents() {
			this.isLoading = true;
			var agents = await getAgents(this.$auth.user.id);
			this.isLoading = false;
			const arr = agents.data.filter((i) => !this.selectedAgents.includes(i.id));
			this.agents = arr;
		},
		async getNumbersNoIVR() {
			try {
				const response = await getNumbersNoIVR(this.$auth.user.id);
				this.numbers = response.data;
			} catch (error) {
				console.log('error', error);
			}
		},
		async getCampaigns() {
			try {
				var response = await getById('campaigns', this.selectedRegisterId);
				this.campaign = response.data;
				this.selectedAgents = this.campaign.agents.map((agent) => {
					return agent.id;
				});
			} catch (error) {
				console.log('error', error);
			}
		},
		async getData() {
			await this.getCampaigns();
			await this.getAgents();
			this.loaded = true;
		},
	},
	components: {
		Loading,
	},
	async mounted() {
		this.selectedRegisterId = this.$route.query.id;
		this.getData();
	},
};
</script>

<style lang="scss" scoped></style>
