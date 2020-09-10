<template>
	<div>
		<loading :active.sync="isLoading" :is-full-page="true"></loading>

		<a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Profile" @back="() => null">
			<template slot="extra">
				<div class="extra">
					<a-button key="3" type="danger" size="large" @click="addCredit()">
						<i class="fa fa-plus" style="margin-right:10px;"></i>
						Add Credit
					</a-button>
					<nuxt-link :to="{ name: 'pricing', params: { upgrade: true } }">
						<a-button key="4" type="primary" size="large">
							<i class="fa fa-plus" style="margin-right:10px;"></i>
							Upgrade
						</a-button>
					</nuxt-link>
				</div>
			</template>
		</a-page-header>

		<a-row style="margin-top:20px;">
			<a-col :span="defaultSpan">
				<div
					v-if="showValidationError"
					class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5"
					role="alert"
				>
					<strong class="font-bold">Warning!</strong>
					<span class="block sm:inline">Validation errors, you need to complete all the form.</span>
					<span class="absolute top-0 bottom-0 right-0 px-4 py-3">
						<svg
							class="fill-current h-6 w-6 text-red-500"
							role="button"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<title>Close</title>
							<path
								d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
							/>
						</svg>
					</span>
				</div>

				<a-form :form="form" @submit="handleSubmit">
					<a-form-item v-bind="formItemLayout" label="First Name">
						<a-input
							v-decorator="[
								'name',
								{
									rules: [
										{
											required: true,
											message: 'Please input your name!',
										},
									],
								},
							]"
						/>
					</a-form-item>

					<a-form-item v-bind="formItemLayout" label="Last Name">
						<a-input
							v-decorator="[
								'lastName',
								{
									rules: [
										{
											required: true,
											message: 'Please input your last name!',
										},
									],
								},
							]"
						/>
					</a-form-item>

					<a-form-item v-bind="formItemLayout" label="E-mail">
						<a-input
							v-decorator="[
								'email',
								{
									rules: [
										{
											type: 'email',
											message: 'The input is not valid E-mail!',
										},
										{
											required: true,
											message: 'Please input your E-mail!',
										},
									],
								},
							]"
						/>
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="Password" has-feedback>
						<a-input
							v-decorator="[
								'password',
								{
									rules: [
										{
											required: true,
											message: 'Please input your password!',
										},
										{
											validator: validateToNextPassword,
										},
									],
								},
							]"
							type="password"
						/>
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="Confirm Password" has-feedback>
						<a-input
							v-decorator="[
								'passwordConfirm',
								{
									rules: [
										{
											required: true,
											message: 'Please confirm your password!',
										},
										{
											validator: compareToFirstPassword,
										},
									],
								},
							]"
							type="password"
							@blur="handleConfirmBlur"
						/>
					</a-form-item>
					<a-form-item v-bind="formItemLayout">
						<span slot="label">
							Document Id&nbsp;
							<a-tooltip title="Your DNI, passport or country identification number.">
								<a-icon type="question-circle-o" />
							</a-tooltip>
						</span>
						<a-input
							v-decorator="[
								'documentId',
								{
									rules: [
										{ required: true, message: 'Please input your documentId!', whitespace: true },
									],
								},
							]"
						/>
					</a-form-item>

					<a-form-item v-bind="formItemLayout" label="Company">
						<a-input
							v-decorator="[
								'company',
								{
									rules: [
										{
											required: true,
											message: 'Please input your company!',
										},
									],
								},
							]"
						/>
					</a-form-item>

					<a-form-item v-bind="formItemLayout" label="Country">
						<a-cascader
							:fieldNames="{ label: 'label', value: 'label', children: 'children' }"
							v-decorator="[
								'county',
								{
									initialValue: ['AndorrA'],
									rules: [
										{
											type: 'array',
											required: true,
											message: 'Please select your country!',
										},
									],
								},
							]"
							:options="countries"
						/>
					</a-form-item>

					<a-form-item v-bind="formItemLayout" label="State">
						<a-input
							v-decorator="[
								'state',
								{
									rules: [
										{
											required: true,
											message: 'Please input your state!',
										},
									],
								},
							]"
						/>
					</a-form-item>

					<a-form-item v-bind="formItemLayout" label="Zip">
						<a-input
							v-decorator="[
								'zip',
								{
									rules: [
										{
											required: true,
											message: 'Please input your zip!',
										},
									],
								},
							]"
						/>
					</a-form-item>

					<a-form-item v-bind="formItemLayout" label="Address">
						<a-textarea
							v-decorator="[
								'address',
								{
									rules: [
										{
											required: true,
											message: 'Please input your address!',
										},
									],
								},
							]"
						/>
					</a-form-item>

					<a-form-item v-bind="formItemLayout" label="Timezone">
						<a-cascader
							:fieldNames="{ label: 'label', value: 'label', children: 'children' }"
							v-decorator="[
								'timeZone',
								{
									initialValue: ['GMT0'],
									rules: [
										{
											type: 'array',
											required: true,
											message: 'Please select your timezone!',
										},
									],
								},
							]"
							:options="timezones"
						/>
					</a-form-item>

					<a-form-item v-bind="formItemLayout" label="Phone Number">
						<a-input
							v-decorator="[
								'phone',
								{
									rules: [{ required: true, message: 'Please input your phone number!' }],
								},
							]"
							style="width: 100%"
						>
						</a-input>
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="Website">
						<a-auto-complete
							v-decorator="['website', { rules: [{ required: true, message: 'Please input website!' }] }]"
							placeholder="website"
							@change="handleWebsiteChange"
						>
							<template slot="dataSource">
								<a-select-option v-for="website in autoCompleteResult" :key="website">
									{{ website }}
								</a-select-option>
							</template>
							<a-input />
						</a-auto-complete>
					</a-form-item>

					<a-form-item label="Profile image">
						<div class="dropbox">
							<a-upload-dragger
								v-decorator="[
									'dragger',
									{
										valuePropName: 'fileList',
									},
								]"
								name="files"
								action="/upload.do"
							>
								<p class="ant-upload-drag-icon">
									<a-icon type="inbox" />
								</p>
								<p class="ant-upload-text">
									Click or drag file to this area to upload
								</p>
								<p class="ant-upload-hint">
									Support for a single or bulk upload.
								</p>
							</a-upload-dragger>
						</div>
					</a-form-item>

					<a-form-item v-bind="tailFormItemLayout">
						<a-button type="primary" html-type="submit">
							Update
						</a-button>
					</a-form-item>
				</a-form>
			</a-col>
		</a-row>
	</div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueTimepicker from 'vue2-timepicker';
import countriesAll from '../api-front/countriesAll';
import { updateUser } from '../utils/actions';
import { getUserById } from '@/api-front/api';
import timezones from '../api-front/timezones';
export default {
	layout: 'loggedLayoutNew',
	components: {
		Loading,
	},
	async mounted() {
		await this.getUser();

		var isMobile = {
			Android: function() {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera: function() {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function() {
				return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
			},
			any: function() {
				return (
					isMobile.Android() ||
					isMobile.BlackBerry() ||
					isMobile.iOS() ||
					isMobile.Opera() ||
					isMobile.Windows()
				);
			},
		};

		if (isMobile.any()) {
			this.defaultSpan = 24;
		}
	},
	data() {
		return {
			website: '',
			isLoading: false,
			timezones: timezones,
			showValidationError: false,
			countries: countriesAll,
			name: '',
			lastName: '',
			password: '',
			email: '',
			countrySelected: '',
			documentId: '',
			state: '',
			timezone: 'America/Los_Angeles',
			zip: '',
			address: '',

			defaultSpan: 8,
			confirmDirty: false,
			autoCompleteResult: [],
			formItemLayout: {
				labelCol: {
					xs: { span: 24 },
					sm: { span: 8 },
				},
				wrapperCol: {
					xs: { span: 24 },
					sm: { span: 16 },
				},
			},
			tailFormItemLayout: {
				wrapperCol: {
					xs: {
						span: 24,
						offset: 0,
					},
					sm: {
						span: 16,
						offset: 8,
					},
				},
			},
		};
	},
	beforeCreate() {
		this.form = this.$form.createForm(this, { name: 'register' });
	},
	methods: {
		async getUser() {
			var response = await getUserById(this.$auth.user.id);
			if (response.status == 200) {
				var data = response.data;
				this.email = data.email;
				this.name = data.name;
				this.lastName = data.lastName;
				this.documentId = data.documentId;
				this.countrySelected = data.country;
				this.state = data.state;
				this.zip = data.zip;
				this.address = data.address;
				this.company = data.company;
				this.timezone = data.timezone;
				this.website = data.website;
				this.phone = data.phone;

				this.form.setFieldsValue({
					email: data.email,
					name: data.name,
					lastName: data.lastName,
					documentId: data.documentId,
					countrySelected: this.countrySelected,
					state: data.state,
					zip: data.zip,
					address: data.address,
					company: data.company,
					timezone: data.timezone,
					phone: data.phone,
					website: data.website,
					country: data.country,
				});
			}
    },
        addCredit() {
      this.$router.push("/statics/add-credit");
    },
		handleSubmit(e) {
			e.preventDefault();
			this.form.validateFieldsAndScroll((err, values) => {
				if (!err) {
					console.log('Received values of form: ', values);

					this.email = values.email;
					this.name = values.name;
					this.lastName = values.lastName;
					this.documentId = values.documentId;
					this.country = values.county[0];
					this.state = values.state;
					this.zip = values.zip;
					this.address = values.address;
					this.company = values.company;
					this.timezone = values.timeZone[0];
					this.website = values.website;
					this.phone = values.phone;
					this.password = values.password;

					console.log('hah', this);

					this.updateData();
				}
			});
		},
		async updateData() {
			if (
				this.name == '' ||
				this.lastName == '' ||
				this.address == '' ||
				this.password == '' ||
				this.email == '' ||
				this.documentId == '' ||
				this.state == '' ||
				this.zip == '' ||
				this.company == '' ||
				this.country == '' ||
				this.timezone == '' ||
				!this.timezone
			) {
				this.showValidationError = true;
				window.scrollTo(500, 0);
			} else {
				this.showValidationError = false;
				this.isLoading = true;
				await updateUser(this.$auth.user.id, {
					name: this.name,
					lastName: this.lastName,
					address: this.address,
					password: this.password,
					email: this.email,
					documentId: this.documentId,
					state: this.state,
					zip: this.zip,
					country: this.county,
					company: this.company,
					timezone: this.timezone,
					website: this.website,
					phone: this.phone,
				});

				this.isLoading = false;

				this.$auth.fetchUser();

				this.$alert('Your profile was updated.', 'Success', {
					confirmButtonText: 'CONTINUE',
					type: 'success',
					center: true,
				});

				this.$router.push('/statics');
			}
		},
		handleConfirmBlur(e) {
			const value = e.target.value;
			this.confirmDirty = this.confirmDirty || !!value;
		},
		compareToFirstPassword(rule, value, callback) {
			const form = this.form;
			if (value && value !== form.getFieldValue('password')) {
				callback('Two passwords that you enter is inconsistent!');
			} else {
				callback();
			}
		},
		validateToNextPassword(rule, value, callback) {
			const form = this.form;
			if (value && this.confirmDirty) {
				form.validateFields(['confirm'], { force: true });
			}
			callback();
		},
		handleWebsiteChange(value) {
			let autoCompleteResult;
			if (!value) {
				autoCompleteResult = [];
			} else {
				autoCompleteResult = ['.com', '.org', '.net'].map((domain) => `${value}${domain}`);
			}
			this.autoCompleteResult = autoCompleteResult;
		},
	},
};
</script>

<style>
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
