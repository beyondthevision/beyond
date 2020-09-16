<template>
	<div>
        <loading :active.sync="isLoading" 
        :is-full-page="true"></loading>

		<a-page-header style="border: 1px solid rgb(235, 237, 240);margin-top:32px;" title="Webhooks" @back="() => null">

		</a-page-header>
		<div class="row">
			<div class="col-lg-7 col-md-12">
				<div class="input-icon invite-link-input">

                    <p style="margin-top:20px;">With our API you can model custom workflows from services like <a href="https://www.pipedream.com">pipedream.com</a> or <a href="https://n8n.io/">n8n.io</a>  and start automate your workflow in <b>jitto.io</b>.</p>


<p>
	With this webwooks you can extend <b>jitto.io </b>with features like:
	<br/>
	<ul style="margin-left:20px;">
		<li>- Create API with custom workflows.</li>
		<li>- Schedule leads creation.</li>
		<li>- Schedule calls and SMS.</li>
		<li>- Drain information of jitto to other system.</li>
		<li>- Connect to a datalake like google big query.</li>
		<li>- Send all jitto.io data to google data studio.</li>
		<li>- Connect all your jitto.io data to slack.</li>
		<li>- Create events and alerts for your data.</li>
	</ul>

	<p style="margin-top:10px;">Pipedream Documentation</p>
	<a href="">https://docs.pipedream.com/</a>
	


</p>
<hr>
<p>NOTE: Don't use your API in frontend code for security of your account.</p>


<el-switch 
  style="display: block; margin-top:20px;"
  :value="apiEnabled"
  @change="switchAPI"
  active-color="#13ce66"
  inactive-color="#ff4949"
  active-text="Enable API">
</el-switch>

		<a-input
						id="invite-url"
						style="margin-top:10px"
						type="text"
						v-model="API"
						readonly=""
					/>

                    <hr>

					<div style="margin-top:10px;">
						<span class="input-icon-addon"> <i class="fas fa-link"></i> ADD LEAD</span>
                        <p> <a style="font-weight:bold;" href="">VERB: POST</a>  </p>
						<code>
							{
								phone:'',
								email:'',
								additional:'',
								lastName:'',
								address:'',
								firstName:'',
								campaign: ''

							}
						</code>

<a>
<vh-copy class="btn btn-primary" data="{phone:'',email:'',additional:'',lastName:'',address:'',firstName:'',campaign: ''}" :label="'Copy'"></vh-copy>

</a>

<hr>
                     <input type="hidden" id="testing-code" value="{phone:'',email:'',lastName:'',address:'',firstName:'', campaign: ''}">



                        <p>Allow add a lead for send SMS or add queue to a campaign.</p>
					</div>

<div style="display:inline;">
					<a-input
						id="invite-url"
						type="text"
						style="display:inline;"
						:value="'https://jitto-backend.ketch.dev/api/add-lead?API=' + this.$auth.user.API"
						readonly=""
					/>

					<a>
					<vh-copy class="btn btn-primary" :data="'https://jitto-backend.ketch.dev/api/add-lead?API=' + this.$auth.user.API" :label="'Copy'"></vh-copy>

					</a>
</div>




					<div style="margin-top:20px;">
						<span class="input-icon-addon"> <i class="fas fa-link"></i> CONNECT LOG DRAINER (CALLS LOGS AND ANALYSIS)</span>
                    
                         <img src="/logflare.png" alt="" style="margin-bottom:10px;">

                        <p> <a style="font-weight:bold;color:red;margin-top:50px;" href="">CHANNEL LOGFLARE</a>  </p>
                        <p>Allow send all your logs and transcriptions to a free big query database and then to <b>google data studio</b>.</p>
					</div>

					<a-input
						id="invite-url"
						v-model="logflareChannel"
                        placeholder="DRAIN ID (CHANNEL)"
						type="text"
                        style="margin-bottom:10px;"
					/>

						<span style="margin-top:120px;" class="input-icon-addon"> <i class="fas fa-link"></i> API KEY LOGFLARE</span>
                        <p> <a style="font-weight:bold;color:red;" href="">API KEY LOGFLARE</a>  </p>

					<a-input
                        style="margin-top:10px"
						id="invite-url"
                        placeholder="INSERT API KEY"
						type="text"
						v-model="logflareAPI"
					/>

                    <button @click="updateUserData" style="margin-top:20px;margin-button:20px;" class="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">SAVE</button>

					<hr>
					<h3>Suggested Jitto serverless callcenter architecture.</h3>

					<img src="/diagram5.png" alt="">

				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { updateUser } from "../../utils/actions";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import logs from '../../api-front/logs';

export default {
	async mounted () {
	
		await this.$auth.fetchUser()
	this.logflareChannel = this.$auth.user.logflareChannel
		this.logflareAPI = this.$auth.user.logflareAPI
	this.apiEnabled = this.$auth.user.apiEnabled
	this.API = this.$auth.user.API

	},
  components: {
    Loading
  },
	methods: {
		async switchAPI (v) {
				this.apiEnabled = v
        await updateUser(this.$auth.user.id, {
			API: new Date().getTime() + 'K',
			apiEnabled: v
		
		});

if (v) {

			this.isLoading = true

				await this.$auth.fetchUser()
				this.isLoading = false

        this.$success({
			content: "Your API was activated.", 
			title: "Success"});

							} else {
				this.apiEnabled = false
			}
		},
		    copyTestingCode() {
      let testingCodeToCopy = document.getElementById("testing-code");
      testingCodeToCopy.setAttribute("type", "text");
	  testingCodeToCopy.select();
	  
	  console.log('1')
				
			},
		async updateUserData() {
			this.isLoading = true
        await updateUser(this.$auth.user.id, {
			logflareChannel:this.logflareChannel,
			logflareAPI:this.logflareAPI,
		
		});

				await this.$auth.fetchUser()
				this.isLoading = false
	this.logflareChannel = this.$auth.user.logflareChannel
		this.logflareAPI = this.$auth.user.logflareAPI
		this.API = this.$auth.user.API

        this.$success({
			content:"Your data was updated.", 
			title: "Success"
        });


		}
	},
	data () {
		return {
			isLoading:false,
			logflareChannel:'',
			logflareAPI: '',
			apiEnabled: false
		}
	}

};
</script>

<style>
.input-icon .form-control:not(:first-child) {
	padding-left: 2.5rem;
}
.form-control:disabled,
.form-control[readonly] {
	background-color: #f8f9fa;
	opacity: 1;
}

.form-control {
	display: block;
	width: 25%;
	height: 2.375rem;
	padding: 0.375rem 0.75rem;
	font-size: 0.9375rem;
	font-weight: 400;
	line-height: 1.6;
	color: #495057;
	background-color: #fff;
	background-clip: padding-box;
	border: 1px solid rgba(0, 40, 100, 0.12);
	border-radius: 3px;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
