<template>
	<div>
		<loading :active.sync="isLoading" :is-full-page="true"></loading>

		<div class="min-h-screen bg-white flex">
			<div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
				<div class="mx-auto w-full max-w-sm lg:w-96">
					<div>
						<img class="h-12 w-auto" src="/text1.png" alt="Workflow" />
						<h2 class="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
							Sign in to your account
						</h2>
						<p class="mt-2 text-sm leading-5 text-gray-600 max-w">
							Or
							<a
								href="/"
								class="font-medium text-red-600 hover:text-red-500 focus:outline-none focus:underline transition ease-in-out duration-150"
							>
								Go To Main
							</a>
						</p>
					</div>

					<div class="mt-8">
						<div>
							<div>
								<p class="text-sm leading-5 font-medium text-gray-700">
									Sign in with
								</p>

								<div class="mt-1 grid grid-cols-3 gap-3"></div>
							</div>
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

						<div class="mt-6">
							<div action="#" method="POST" class="space-y-6">
								<div>
									<label for="email" class="block text-sm font-medium leading-5 text-gray-700">
										Email address
									</label>
									<div class="mt-1 rounded-md shadow-sm">
										<input
											v-model="user.identifier"
											id="email"
											type="email"
											required
											class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
										/>
									</div>
								</div>

								<div>
									<label for="password" class="block text-sm font-medium leading-5 text-gray-700">
										Password
									</label>
									<div class="mt-1 rounded-md shadow-sm">
										<input
											v-model="user.password"
											v-on:keyup.enter="login"
											id="password"
											type="password"
											required
											class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
										/>
									</div>
								</div>

								<div class="flex items-center justify-between">
									<div class="flex items-center">
										<input
											id="remember_me"
											type="checkbox"
											class="form-checkbox h-4 w-4 text-red-600 transition duration-150 ease-in-out"
										/>
										<label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-900">
											Remember me
										</label>
									</div>

									<div class="text-sm leading-5">
										<nuxt-link to="/reset">
											<a
												href="#"
												class="font-medium text-red-600 hover:text-red-500 focus:outline-none focus:underline transition ease-in-out duration-150"
											>
												Forgot your password?
											</a>
										</nuxt-link>
									</div>
								</div>

								<div>
									<span class="block w-full rounded-md shadow-sm">
										<button
											v-on:keyup.enter="login"
											@click="login"
											type="submit"
											class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out"
										>
											Sign in
										</button>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="hidden lg:block relative w-0 flex-1">
				<img
					class="absolute inset-0 h-full w-full object-cover"
					src="https://htmlcolorcodes.com/assets/images/html-color-codes-color-tutorials-903ea3cb.jpg"
					alt=""
				/>
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
				this.$auth.logout();

				this.$error({
					title: 'Error on login as administrator.',
					content: "You don't have administrator permissions.",
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

					logs.sendLogInfo('INVALID CREDENTIALS', err.response.data);

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

<style lang="scss" scoped></style>
