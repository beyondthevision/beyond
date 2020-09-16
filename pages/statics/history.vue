<template>
	<div>
		<main class="bg-white-300 flex-1 p-3">
			<a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Payments" @back="() => null">
				<template slot="extra">
					<div class="extra">

						<nuxt-link :to="{ name: 'pricing', params: { upgrade: true } }">
							<a-button key="4" type="primary" size="large">
								<i class="fa fa-plus" style="margin-right:10px;"></i>
								Upgrade
							</a-button>
						</nuxt-link>
					</div>
				</template>
			</a-page-header>

			<a-row>
				<a-col :lg="{ span: 11 }" :xs="{ span: 24, offset: 0 }" style="margin-top:20px;">
					<h3 class="text-2xl font-semibold leading-tight overflow-x-auto">
						Payments subscription
					</h3>
					<grid
						:hidden-columns="hiddenColumns"
						:hideEdit="true"
						:searchTerms="searchTermsPayments"
						searchTermColumn="description"
						:hideDelete="true"
						:entity="entityPayments"
					></grid>
				</a-col>

				<a-col :lg="{ span: 12 }" :xs="{ span: 24, offset: 0 }" style="margin-top:20px;">
					<h3 class="text-2xl font-semibold leading-tight overflow-x-auto">
						Balance detailed
					</h3>
					<grid
						:hidden-columns="hiddenColumns"
						:hideEdit="true"
						:searchTerms="searchTerms"
						searchTermColumn="description"
						:hideDelete="true"
						:entity="entityBalance"
					></grid>
				</a-col>
			</a-row>
		</main>
	</div>
</template>

<script>
import grid from '@/components/grid';
export default {
	layout: 'loggedLayoutNew',
	components: {
		grid,
	},
	methods: {
		goBack() {
			this.$router.back();
		},
		addCredit() {
			this.$router.push('/statics/add-credit');
		},
	},
	data() {
		return {
			searchTerms: [
				{
					searchEntity: 'description',
				},
			],
			searchTermsPayments: [
				{
					searchEntity: 'state',
				},
			],

			entityPayments: 'payments',
			entityBalance: 'accounts',
			entity: 'numbers',
			customColumns: [],
			hiddenColumns: ['automatic', 'user', 'campaign', 'deleted_at', 'id','funds_added'],
		};
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
