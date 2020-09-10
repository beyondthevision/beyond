<template>
	<div>

    <a-modal
      title="How to use"
	  on-ok="dialogModal = false"
      :visible="dialogModal"
	v-model="dialogModal"
    >
	 <template slot="footer">
		  </template>
			<center>
				<iframe
					width="100%"
					height="315"
					src="https://www.youtube.com/embed/5lrdYBLEk60"
					frameborder="0"
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			</center>
    </a-modal>

		<div class="py-8">
			<a-page-header style="border: 1px solid rgb(235, 237, 240)" title="My Leads" @back="() => null">
				<template slot="extra">
					<div class="extra">
						<nuxt-link to="/campaign/leads/add">
							<a-button key="3" type="danger" size="large">
								<i class="fa fa-plus" style="margin-right:10px;"></i>
								Add
							</a-button>
						</nuxt-link>

						<nuxt-link to="/campaign/leads/bulk">
							<a-button key="5" type="dashed" size="large">
								<i class="fa fa-plus" style="margin-right:10px;"></i>
								Bulk
							</a-button>
						</nuxt-link>

						<a-button @click="dialogModal = true" key="4" type="primary" size="large">
							<i class="fa fa-exclamation" style="margin-right:10px;"></i>
							How to use
						</a-button>
					</div>
				</template>
			</a-page-header>

			<div class="my-2 flex sm:flex-row flex-col">
				<div class="flex flex-row mb-1 sm:mb-0"></div>
			</div>
			<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10">
				<div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<grid
						:searchTerms="searchTerms"
						searchTermColumn="phone"
						:filters="filters"
						:hidden-columns="hiddenColumns"
						:entity="entity"
					></grid>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import grid from '@/components/grid';
export default {
	components: {
		grid,
	},
	data() {
		return {
			dialogModal: false,
			searchTerms: [
				{
					searchEntity: 'searchwords',
				},
				// {
				//   searchEntity: 'toNumber'
				// }
			],
			entity: 'leads',
			entityAddURL: '/campaigns/add-lead',
			filters: [
				{
					column: 'campaign',
					value: null,
					required: false,
					name: 'campaign',
					label: 'Campaign',
					position: 'left',
					type: 'select-autocomplete',
					searchEntity: 'campaigns',
					searchField: 'name',
				},
			],

			hiddenColumns: [
				'created_at',
				'added',
				'created',

				'email',
				'address',
				'campaign',
				'updated_at',
				'id',
				'deleted_at',
				'searchwords',
				'inLine',
				'notAnswer',
				'notAnswerDate',
			],
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
