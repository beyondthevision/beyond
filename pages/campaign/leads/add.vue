<template>
	<div>
		<loading :active.sync="isLoading" :is-full-page="true"></loading>

		<a-modal title="Add Field" :visible.sync="dialogAddField"  :before-close="handleClose">
			<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
				Label Name
			</label>
			<input
				v-model="nameFieldToPopulate"
				class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
				type="text"
				placeholder="Name of the field to populate"
			/>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogAddField = false">Cancel</el-button>
				<el-button type="primary" @click="addFieldToPopulate">Add field</el-button>
			</span>
		</a-modal>

		<div>


		<a-page-header v-if="selectedRegisterId && selectedCampaign" style="border: 1px solid rgb(235, 237, 240);margin-bottom:10px;" :title="'Update Lead for Campaign: ' + selectedCampaign.name" @back="() => null">

		</a-page-header>

		<a-page-header v-if="!selectedRegisterId" style="border: 1px solid rgb(235, 237, 240);margin-bottom:10px;" title="Create lead" @back="() => null">

		</a-page-header>
				
		</div>

		<div v-if="!single && !multiple">
			<div>
				<div class="mb-5">
					<h3 class="font-bold leading-tight color-black">Select campaign</h3>
				</div>

				<el-select v-model="selectedCampaign" placeholder="Select campaign" clearable>
					<el-option v-for="item in campaigns" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>

				<p v-if="!isValidCampaign" class="text-red-500 text-xs italic mt-1 mb-1">
					Please fill out this field.
				</p>
			</div>
		</div>

		<div>
			<div v-if="!single && !multiple && !selectedRegisterId">
				<div class="md:w-3/3 sm:w-full rounded-lg shadow-lg bg-white my-3">
					<div class="flex justify-between border-b border-gray-100 px-5 py-4">
						<div>
							<i class="fas fa-exclamation-circle text-blue-500"></i>
							<span class="font-bold text-gray-700 text-lg">¿What do you prefer? </span>
						</div>
					</div>

					<div class="px-10 py-5 text-gray-600">
						The system support batch processing (Load big data files with leads) or if you prefer you can
						upload only one. ¿What do you prefer?
					</div>

					<div class="px-5 py-4 flex justify-end">
						<button
							@click="selectMode('multiple')"
							class="bg-orange-500 mr-1 rounded text-sm py-2 px-3 text-white hover:bg-orange-600 transition duration-150"
						>
							🧷&nbsp; Upload a file
						</button>
						<button
							@click="selectMode('single')"
							class="text-sm py-2 px-3 text-white hover:text-white transition bg-red-600 duration-150"
						>
							🍃 &nbsp;Upload only one
						</button>

						<button
							@click="selectMode('api')"
							class="ml-1 text-sm py-2 px-3 text-black hover:text-white transition bg-yellow-400 duration-150"
						>
							🍃 &nbsp; Ingest API <i class="fa fa-star" style="color:orange;"></i> 
						</button>
					</div>
				</div>
			</div>

			<div  v-if="single && selectedCampaign">
				<div class="mb-5" style="margin-top:10px;">
					<h3 class="font-bold leading-tight color-black">Manual creation</h3>
				</div>

				<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
					First Name
				</label>
				<input
					v-model="name"
					class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					type="text"
					placeholder="Name"
				/>

				<p v-if="!isValidName" class="text-red-500 text-xs italic mt-1 mb-1">
					Please fill out this field.
				</p>

				<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
					Last Name
				</label>
				<input
					v-model="lastName"
					class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					type="text"
					placeholder="Last Name"
				/>

				<p v-if="!isValidLastName" class="text-red-500 text-xs italic mt-1 mb-1">
					Please fill out this field.
				</p>

				<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
					Phone
				</label>
				<input
					v-model="phone"
					class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					type="text"
					placeholder="phone"
				/>

				<p v-if="!isValidPhone" class="text-red-500 text-xs italic mt-1 mb-1">
					Please fill out this field.
				</p>

				<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
					Email
				</label>
				<input
					v-model="email"
					class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					type="text"
					placeholder="email@company.com"
				/>

				<p v-if="!isValidEmail" class="text-red-500 text-xs italic mt-1 mb-1">
					Please fill out this field.
				</p>

				<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
					Address
				</label>
				<textarea
					rows="2"
					v-model="address"
					placeholder="Address"
					class="form-textarea mt-1 block w-full mt-5 p-2 border-gray-400 border-black"
				></textarea>

				<p v-if="!isValidAddress" class="text-red-500 text-xs italic mt-1 mb-1">
					Please fill out this field.
				</p>

				<hr />

				<div v-for="field in customFields">
					<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
						{{ field.label }}
					</label>

					<input
						v-model="field.value"
						class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
						type="text"
						:placeholder="'add ' + field.label"
					/>
				</div>

				<button
					@click="addField"
					class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
				>
					ADD FIELD
				</button>

				<button
					@click="addLead"
					class="pull-right bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
				>
					SAVE
				</button>

				<div class="mb-5" style="margin-top:50px;" v-if="lead">
					<h3 class="font-bold leading-tight color-black">JSON PAYLOAD</h3>
				</div>
				<code>{{ lead }}</code>

									<input
									v-if="lead && lead.id"
						type="text"
						class="w-100"
						:value="'https://jitto-backend.ketch.dev/api/add-lead?API=' + this.$auth.user.API"
						readonly=""
					/>

			</div>

			<div v-if="multiple">
				<div class="mb-8">
					<h3 class="font-bold leading-tight color-black">Bulk import</h3>
				</div>

				<div
					role="alert"
					class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
				>
					<span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
					<span class="font-semibold mr-2 text-left flex-auto"
						>Now you can upload bulk data! > 1'000.000 leads per upload!!
					</span>
				</div>

				<el-upload
					style="width:200px;"
					class="upload-demo mt-5"
					drag
					:disabled="!selectedCampaign"
					:action="endpointUpload"
					multiple
					name="files"
					:headers="getHeaders()"
					:on-success="successUpload"
				>
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">Upload here your file <em>click to load</em></div>
					<div slot="tip" class="el-upload__tip">
						Can upload excel files <b>5GB</b>. Remember include a column called phone.
					</div>
				</el-upload>

				<p class="el-upload__tip" style="font-weight:bold;">
					Required columns: firstname, lastname, phone, email, address.
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import logs from '../../../api-front/logs';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import {
	getCalls,
	addLeads,
	updateLead,
	getLead,
	getCampaignsByUserEmail,
	getTotalCallsTodayByUserEmail,
	getTotalCallsWaitingByUserEmail,
	getAgentsReady,
	getAllAgentsByEmail,
	getTotalCallMonthByUserEmail,
} from '../../../api-front/api';

import { setBulkData } from '@/utils/actions';

export default {
	components: {
		Loading,
	},
	async mounted() {
		await this.getCampaigns();

		if (!_.isNil(this.$route.query.id)) {
			this.selectedRegisterId = this.$route.query.id;
		}

		if (this.selectedRegisterId) {
			this.single = true;
			await this.getLead();
			this.isLoading = false;
		} else {
			this.isLoading = false;
		}
	},
	data() {
		return {
			API:'',
			lead: null,
			isLoading: true,
			multiple: false,
			single: false,
			endpointUpload: process.env.baseURL + '/upload',
			selectedRegisterId: null,
			isValidCampaign: true,
			isValidName: true,
			isValidLastName: true,
			isValidEmail: true,
			isValidPhone: true,
			isValidAddress: true,
			dialogAddField: false,
			selectedCampaign: null,
			selectedAgent: null,
			campaigns: [],
			nameFieldToPopulate: '',
			customFields: [],
			name: '',
			lastName: '',
			address: '',
			phone: '',
			email: '',
		};
	},
	methods: {
		selectMode(mode) {
			if (mode == 'api') {
				this.$router.push('/campaign/webhooks');
				return;
			}

			if (!this.selectedCampaign) {
				this.$alert('Select campaign to assign the leads.', 'Validation error', {
					confirmButtonText: 'Ok, understand.',
					type: 'warning',
					center: true,
				});

				return;
			}

			if (mode == 'single') {
				this.single = true;
			}

			if (mode == 'multiple') {
				this.multiple = true;
			}
		},
		getHeaders() {
			if (!process.server) {
				return {
					Authorization: `${localStorage.getItem('auth._token.local')}`,
				};
			}
		},

		handleClose() {
			this.dialogAddField = false;
		},

		validate() {
			var isValid = true;

			this.isValidCampaign = true;
			this.isValidName = true;
			this.isValidLastName = true;
			this.isValidEmail = true;
			this.isValidPhone = true;
			this.isValidAddress = true;

			if (!this.selectedCampaign) {
				isValid = false;
				this.isValidCampaign = false;
			}




	

			if (this.phone == '') {
				isValid = false;
				this.isValidPhone = false;
			}



			return isValid;
		},
		async addLead() {
			var isValid = this.validate();

			if (isValid) {
				this.isLoading = true;
				try {
					if (!this.selectedRegisterId) {
						var additional = '';
						this.customFields.forEach((v) => {
							additional += v.value + ',';
						});

						var response = await addLeads({
							firstName: this.name,
							lastName: this.lastName,
							address: this.address,
							phone: this.phone,
							finished: false,
							email: this.email,
							campaign: this.selectedCampaign,
							account: this.$auth.user.id,
							notAnswer: false,
							inLine: false,
							additional: JSON.stringify(this.customFields),
							added: new Date(),
							searchwords:
								this.name + ',' + this.lastName + ',' + this.phone + this.email + ',' + additional,
						});

						logs.sendLogInfo('ADDED LEADS ', {
							info: response.data,
						});

						this.isLoading = false;

						this.$alert('Your lead was saved!', 'Success', {
							confirmButtonText: 'Ok',
							type: 'success',
							center: true,
						});
					} else {
						var additional = '';
						this.customFields.forEach((v) => {
							additional += v.value + ',';
						});

						this.isLoading = true;

						var response = await updateLead(this.selectedRegisterId, {
							firstName: this.name,
							lastName: this.lastName,
							address: this.address,
							phone: this.phone,
							email: this.email,
							notAnswer: false,
							inLine: false,
							finished: this.finished,
							campaign: this.selectedCampaign,
							account: this.$auth.user.id,
							additional: this.customFields,
							searchwords:
								this.name + ',' + this.lastName + ',' + this.phone + this.email + ',' + additional,
						});

						logs.sendLogInfo('UPDATED LEAD', {
							info: response.data,
						});

						this.isLoading = false;

						this.$alert('Your lead was updated!', 'Success', {
							confirmButtonText: 'Ok',
							type: 'success',
							center: true,
						});
					}

					this.$router.push('/campaign/leads');
				} catch (error) {
					logs.sendLogInfo('ERROR ON UPDATE LEAD ', {
						error:error
					});
				}
			}
		},
		addField() {
			this.dialogAddField = true;
		},
		async getLead(id) {
			try {
				var response = await getLead(this.selectedRegisterId);
				var data = response.data;
				this.lead = {
					firstName: response.data.firstName,
					lastName: response.data.lastName,
					address: response.data.address,
					phone: response.data.phone,
					email: response.data.email,
				};
				this.name = data.firstName;
				this.lastName = data.lastName;
				this.address = data.address;
				this.phone = data.phone;
				this.finished = data.finished;
				this.email = data.email;
				this.selectedCampaign = data.campaign;

if (data.additional && data.additional.length > 0) {
this.customFields = JSON.parse(data.additional);
} else {
	this.customFields = []
}
			} catch (error) {
				console.log('error', error);
			}
		},
		addFieldToPopulate() {
			this.customFields.push({
				label: this.nameFieldToPopulate,
				value: '',
			});

			this.nameFieldToPopulate = null;

			this.dialogAddField = false;
		},
		async getCampaigns() {
			try {
				var response = await getCampaignsByUserEmail(
					this.$auth.user.email,
					this.selectedCampaign,
					this.selectedAgent
				);

				this.campaigns = response.data;
			} catch (e) {
				console.log('e', e);
			}
		},
		addPhone() {},
		async successUpload(event) {
			let response = event[0];
			try {
				this.isLoading = true;

				var info = {
					url: response.url,
					campaign: this.selectedCampaign,
					start: new Date(),
					processed: false,
					account: this.$auth.user.id,
				};

				await setBulkData(info);

				logs.sendLogInfo('ADDED BULKDATA', {
					info: response.data,
				});

				this.isLoading = false;

				this.$router.push('/campaign/leads/bulk');

				// this.getBulkData();
			} catch (err) {
				console.log('err', err);
			}
		},
	},
};
</script>

<style lang="css">
textarea {
	border: 1px solid grey;
}
.form-control {
	width:75% !important;
}

</style>
