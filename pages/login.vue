<template>
	<div>
		<loading :active.sync="isLoading" :is-full-page="true"></loading>

		<div class="bg-white font-family-karla h-screen">
			<div class="w-full flex flex-wrap">
				<!-- Login Section -->
				<div class="w-full md:w-1/2 flex flex-col">
					<div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24"></div>

					<div class="flex flex-col justify-center md:justify-start my-auto md:pt-0 px-8 md:px-24 lg:px-32">
						<a @click="goMain" class="cursor-pointer">
							<img style="filter: brightness(0.25);" width="100" src="/text.png" alt="" />
						</a>

						<div class="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
							<small>
								<a class="text-blue-800 cursor-pointer" @click="goMain"
									><i class="fa fa-arrow-left"></i> back to main</a
								>
							</small>

							<div
								v-if="errors.length > 0"
								class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
								role="alert"
							>
								<strong class="font-bold">System Error!</strong>
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
								class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
								role="success"
							>
								<strong class="font-bold">Email is not confirmed!</strong>
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
								<label for="email" class="text-lg">Email</label>
								<input
									v-model="user.identifier"
									type="email"
									id="email"
									v-on:keyup.enter="login"
									placeholder="your@email.com"
									class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>

							<div class="flex flex-col pt-4">
								<label for="password" class="text-lg">Password</label>
								<input
									v-model="user.password"
									type="password"
									v-on:keyup.enter="login"
									id="password"
									placeholder="Password"
									class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>

							<button
								v-on:keyup.enter="login"
								@click="login"
								class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
							>
								Log In
							</button>
						</div>
						<div class="text-center pt-12 pb-12">
							<p>
								Don't have an account?
								<a href="/register" class="underline font-semibold">Register here.</a>
							</p>

							<a style="font-weight:bold;" href="/reset">¿Forgot password? </a>
							or
							<a href="/" class="text-blue-600 visited:text-purple-600">Back to main page</a>
						</div>
					</div>
				</div>

				<!-- Image Section -->
				<div class="w-1/2 shadow-2xl">
					<img class="w-full h-full  hidden md:block" src="/bg4.jpg" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import logs from '../api-front/logs';

export default {
	mounted() {
		if (this.$auth.user) {
			if (this.$auth.user.agent) {
				this.$router.push({
					name: 'operator',
				});
				return;
			} else {
				this.$router.push({ name: 'dashboard' });
			}
		}
	},
	components: {
		Loading,
	},

	head: {
		link: [
			{
				rel: 'stylesheet',
				defer: true,
				href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
			},
		],
	},
	methods: {
		goMain() {
			this.$router.push({
				name: 'index',
			});
		},
		login() {
			let user = this.user;
			let response = this.$auth;

			if (user.identifier == '' || user.password == '') {
				this.errors = [{ message: 'Email and password are required.' }];
				return;
			}

			this.isLoading = true;

			this.$auth
				.loginWith('local', {
					data: user,
				})
				.then((response) => {
					logs.sendLogInfo('NEW LOGIN ' + user.identifier, {});

					this.$router.push({ name: 'pricing' });
					this.isLoading = true;
				})
				.catch((err) => {
					this.isLoading = false;

					if (
						err &&
						err.response &&
						err.response.data &&
						err.response.data.message &&
						err.response.data.message[0].messages &&
						err.response.data.message[0].messages[0].message == 'Your account email is not confirmed'
					) {
						this.successMessages.push({
							message:
								'Your account email is not confirmed. Please check your email address for continue.',
						});

						return;
					}
	
					logs.sendLogInfo('INVALID CREDENTIALS', err.response.data)

					this.error = true;
					this.errors = [{ message: 'Email or password invalid.' }];
				});
		},
	},
	data() {
		return {
			successMessages: [],
			errors: [],
			error: false,
			isLoading: false,
			user: {
				identifier: '',
				password: '',
			},
		};
	},
};
</script>

<style scoped>
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
