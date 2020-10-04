<template>
	<div>
		<a-page-header style="border: 1px solid rgb(235, 237, 240);margin-bottom:10px;" :title="'Pay Request'">
		</a-page-header>

		<loading :active.sync="isLoading" :is-full-page="true"></loading>


		<a-row>
			<a-col :lg="{ span: 3 }">
				<a-steps progress-dot :current="1" direction="vertical">
					<a-step title="Finished" description="" />
					<a-step title="In Progress" description="" />
					<a-step title="Waiting" description="" />
				</a-steps>
			</a-col>

			<a-col :lg="{ span: 6 }">
				<a-menu style="width: 256px" mode="vertical" @click="changeState">
					<a-sub-menu key="sub2">
						<span slot="title"><a-icon type="setting" /><span>change state</span></span>
						<a-menu-item key="7">
							Finished
						</a-menu-item>
						<a-menu-item key="8">
							In Progress
						</a-menu-item>
						<a-menu-item key="9">
							Waiting
						</a-menu-item>
					</a-sub-menu>
				</a-menu>



				<a-form-item label="Email">
					<a-input
						placeholder="Email"
						v-model="form.email"
						v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
					/>
				</a-form-item>

				<a-form-item label="Pay Amt">
					<a-input
						placeholder="Pay Amt"
						v-model="form.payAmt"
						v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
					/>
				</a-form-item>


				<a-form-item label="Transfer">
					<a-input
						placeholder="Transfer"
						v-model="form.transfer"
						v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
					/>
				</a-form-item>


                <a-button @click="save" type="danger">
                    SAVE
                </a-button>


			</a-col>
		</a-row>
	</div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
    layout: 'loggedLayoutNew',
    data () {
        return {
            isLoading: false,
            form: {
                email: ''
            }
        }
    },
    components: {
        Loading
    },
	async mounted() {
		this.selectedRegisterId = this.$route.query.id;


		if (this.selectedRegisterId) {
            this.isLoading = true
			var response = await this.$axios.get('/pay-requests/' + this.selectedRegisterId);
      this.form = response.data;
      this.isLoading = false

		}
	},
	methods: {
        changeState () {

        },
        async save() {
				try {
					this.isLoading = true;
					var response = await this.$axios.put('/pay-requests/' + this.selectedRegisterId, {
                        email: this.form.email,
                        payMode: this.form.payMode,
                        payAmt: this.form.payAmt,
                        transfer: this.form.transfer,
                        phone: this.form.phone,
                        firstName: this.form.firstName
                    });
                    this.isLoading = false
				} catch (error) {
					this.isLoading = false;
					this.$error({
						title: 'Error on create.',
						content: 'Please contact support.',
					});
				}
        },
		getPaymentInfo() {},
	},
};
</script>

<style lang="scss" scoped></style>
