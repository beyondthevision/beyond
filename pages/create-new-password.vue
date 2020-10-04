<template>
	<div>
		<div class="bg-white font-family-karla h-screen">
			<div class="w-full flex flex-wrap">
				<!-- Login Section -->
				<div class="w-full md:w-1/2 flex flex-col">
					<div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24"></div>

					<div class="flex flex-col justify-center md:justify-start my-auto md:pt-0 px-8 md:px-24 lg:px-32">
						<a href="/">
							<img style="filter: brightness(0.25);" width="100" src="/text1.png" alt="" />
						</a>


						<div class="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
							<div
								v-if="sended"
								class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
								role="alert"
							>
								<strong class="font-bold">Password changed</strong><br />
								<span class="block sm:inline"
									>Your password was changed.</span
								>
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

							<div class="flex flex-col pt-4">
								<label for="email" class="text-lg">Password</label>
								<input
									v-model="user.password"
									type="password"
									id="email"
									placeholder="Password"
									class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>

							<div class="flex flex-col pt-4">
								<label for="email" class="text-lg">Password Again</label>
								<input
									v-model="user.passwordConfirmation"
									type="password"
									id="email"
									placeholder="Password Again"
									class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>

							<button
								@click="resetPassword"
								class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
							>
								Reset
							</button>
						</div>
						<div class="text-center pt-12 pb-12">
							<p>
								Have an account?
								<a href="/login" class="underline font-semibold">Login</a>
							</p>
						</div>
					</div>
				</div>

				<!-- Image Section -->
				<div class="w-1/2 shadow-2xl" style="background: linear-gradient(90deg, #d53369 0%, #daae51 100%);">
					<img
						class="object-cover w-full h-screen hidden md:block"
						src="/bg4.jpg"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
	head: {
		link: [
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700',
			},
		],
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


		async resetPassword() {
			this.errors = [];


			if (!this.validatePassword()) {
				this.errors.push({
					message: 'The password is not strong.',
				});
				this.isLoading = false;

				return;
			}


			if (this.user.password == '') {
				this.errors.push({
					message: 'The password is empty.',
				});
				return;
			}

			if (this.user.passwordConfirmation == '') {
				this.errors.push({
					message: 'The password confirmation is empty.',
				});
				return;
			}

			this.isLoading = true;
			try {
				// Request API.
				this.$axios
					.post('/auth/reset-password', {
						code: this.$route.query.code,
						password: this.user.password,
						passwordConfirmation: this.user.passwordConfirmation,
					})
					.then((response) => {
                        // Handle success.
                        this.sended = true;
                        this.user.password = ""
						this.user.passwordConfirmation = ""
						this.isLoading = false
						console.log("Your user's password has been changed.");
					})
					.catch((error) => {
						// Handle error.
						this.isLoading = false
						console.log('An error occurred:', error.response);
					});

				
			} catch (error) {
				this.errors.push({
					messages: 'Can recover the password. Please try again later.',
				});
			}
		},
	},
	components: {
		Loading
	},
	data() {
		return {
			sended: false,
			user: {
				email: '',
			},
			messages: [],
			errors: [],
			error: false,
			isLoading: false,
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
