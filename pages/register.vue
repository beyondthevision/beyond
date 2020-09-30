<template>
	<div class="bg-white font-family-karla h-screen">
		<loading :active.sync="isLoading" :is-full-page="true"></loading>

		<div class="w-full flex flex-wrap">
			<!-- Register Section -->
			<div class="w-full md:w-1/2 flex flex-col">
				<div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
					<a class="cursor-pointer" @click="goMain">
						<img style="    filter: brightness(0.25);" width="100" src="/text1.png" alt="" />
					</a>
				</div>

				<div
					class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32 mt-10"
				>
					<form class="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
						<small>
							<a class="text-blue-800 cursor-pointer" @click="goMain"
								><i class="fa fa-arrow-left"></i> back to main</a
							>
						</small>

						<div
							v-if="sended"
							class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
							role="alert"
						>
							<strong class="font-bold">Email confirmation required.</strong><br />
							<span class="block sm:inline">Please check your email address for continue.</span>
						</div>

						<div
							v-if="errors.length > 0"
							style="margin-top:50px;"
							class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
							role="alert"
						>
							<strong class="font-bold">Validation Errors!</strong>
							<div v-for="error in errors">
								<span class="block sm:inline">{{ error.message }}</span>
							</div>
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

						<div
							v-if="successMessages.length > 0"
							style="margin-top:50px;"
							class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
							role="success"
						>
							<strong class="font-bold">Excellent!</strong>
							<div v-for="register in successMessages">
								<span class="block sm:inline">{{ register.message }}</span>
							</div>
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

						<div class="flex flex-col pt-4">
							<label for="name" class="text-lg">Name</label>
							<input
								type="text"
								id="name"
								v-model="user.name"
								placeholder="John"
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
							/>
						</div>

						<div class="flex flex-col pt-4">
							<label for="lastname" class="text-lg">Last name</label>
							<input
								v-model="user.lastName"
								type="text"
								id="lastname"
								placeholder="Smith"
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
							/>
						</div>

						<div class="flex flex-col pt-4">
							<label for="email" class="text-lg">Email</label>
							<input
								v-model="user.email"
								type="email"
								id="email"
								placeholder="your@email.com"
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
							/>
						</div>

						<div class="flex flex-col pt-4">
							<label for="company" class="text-lg">Company</label>
							<input
								v-model="user.company"
								type="text"
								id="company"
								placeholder="Google"
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
							/>
						</div>

						<div class="flex flex-col pt-4">
							<label for="password" class="text-lg">Password</label>
							<input
								type="password"
								v-model="user.password"
								id="password"
								placeholder="Password"
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
							/>

							<p class="text-gray-600 text-xs italic">
								Your password must have a minimum length of 12 characters along with at least one
								number, uppercase character and lowercase character.
							</p>
						</div>

						<div class="flex flex-col pt-4">
							<label for="confirm-password" class="text-lg">Confirm Password</label>
							<input
								v-model="user.passwordConfirmation"
								type="password"
								id="confirm-password"
								placeholder="Password"
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
							/>
						</div>
						<div class="flex flex-col pt-4">
							<label for="email" class="text-lg">Avatar</label>

							<el-upload
								class="upload-demo"
								:on-change="addAttachment"
								ref="upload"
								action="https://jsonplaceholder.typicode.com/posts/"
								:auto-upload="false"
							>
								<img
									v-if="imgUrl"
									:src="imgUrl"
									class="avatar"
									style="width:100px;height:100px; margin-top:20px;"
								/>

								<el-button slot="trigger" size="small" type="dark">SELECT AVATAR</el-button>
							</el-upload>
						</div>

						<button
							:disabled="loading"
							@click="submit"
							v-on:keyup.enter="submit"
							type="submit"
							class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
						>
							Register
						</button>
					</form>
					<div class="text-center pt-12 pb-12">
						<p>
							Already have an account?
							<a href="/login" class="underline font-semibold">Log in here.</a>
						</p>

						<a @click="goMain" class="text-blue-600 visited:text-purple-600">Back to main page</a>
					</div>
				</div>
			</div>

			<!-- Image Section -->
			<div class="w-1/2 shadow-2xl">
				<img class="w-full h-full  hidden md:block" src="https://miro.medium.com/max/6936/1*Qd6XyPlotFCPj5bjASzC0Q.jpeg" />
			</div>
		</div>
	</div>
</template>

<script>
import { setRegistry, updateAvatar } from '../utils/actions';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import logs from '../api-front/logs'

export default {
	components: {
		Loading,
	},
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
			{
				rel: 'stylesheet',
				href: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
			},
		],
	},
	data() {
		return {
			sended: false,
			isLoading: false,
			successMessages: [],
			imgUrl: '',
			loading: false,
			user: {
				email: '',
				name: '',
				lastName: '',
				password: '',
				passwordConfirmation: '',
			},
			errors: [],
		};
	},
	methods: {
		validatePassword() {
			var strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})');
			var isValid = true;

			if (!strongRegex.test(this.user.password)) {
				isValid = false;
			}
			return isValid;
		},
		goMain() {
			this.$router.push({
				name: 'index',
			});
		},
		addAttachment(file) {
			this.imgUrl = URL.createObjectURL(file.raw);

			this.finalImage = file;
		},
		async submit() {
			this.errors = [];
			this.isLoading = true;
			let user = this.user;
			user.firstAccess = true;
			let file = this.finalImage;
			user.username = user.email;

			if (this.imgUrl == '' || this.user.email == '') {
				window.scrollTo(0, 0);

				this.errors.push({
					message: 'Validation errors. All the inputs fields are required.',
				});
				this.isLoading = false;

				return;
			}

			if (this.user.password == '' || this.user.passwordConfirmation == '') {
				window.scrollTo(0, 0);

				this.errors.push({
					message: 'Password and confirmation is required.',
				});
				this.isLoading = false;

				return;
			}

			if (this.user.company == '') {
				window.scrollTo(0, 0);

				this.errors.push({
					message: 'The company name is required',
				});
				this.isLoading = false;

				return;
			}

			if (this.user.password !== this.user.passwordConfirmation) {
				window.scrollTo(0, 0);

				this.errors.push({
					message: 'The password and the confirmation is different.',
				});
				this.isLoading = false;

				return;
			}



			user.timezone = 'Europe/London';

			try {

				logs.sendLogInfo('NEW REGISTER', user)

				let response = await setRegistry(user);

				window.scrollTo(0, 0);

				let formData = new FormData();

				formData.append('files', file.raw);
				formData.set('ref', 'user');
				formData.set('source', 'users-permissions');
				formData.set('refId', response.data.user._id);
				formData.set('field', 'photo');

				await updateAvatar(formData);

				this.isLoading = false;
				this.sended = true;

				this.user = {
					email: '',
					name: '',
					lastName: '',
					password: '',
					passwordConfirmation: '',
				};
			} catch (error) {
				logs.sendLogInfo('ERROR ON CREATE NEW USER IN THE FRONTEND', error)
				this.isLoading = false;
				window.scrollTo(0, 0);

				if (
					error &&
					error.response &&
					error.response.data &&
					error.response.data.message &&
					error.response.data.message[0].messages &&
					error.response.data.message[0].messages[0].message == 'Your account email is not confirmed'
				) {
					this.successMessages.push({
						message: 'Your account email is not confirmed. Please check your email address for continue.',
					});

					return;
				}

				this.errors.push({
					message: 'Error on create account. The email exist in our database.',
				});
				console.log('error', error);
			}
		},
	},
};
</script>

<style lang="css">
.page-enter-active,
.page-leave-active {
	transition: all 0.3s ease-out;
}
.page-enter,
.page-leave-active {
	opacity: 0;
	transform-origin: 50% 50%;
}
</style>
