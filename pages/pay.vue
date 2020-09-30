<template>
	<div>
		<a-page-header style="border: 1px solid rgb(235, 237, 240);margin-bottom:10px;" :title="'Add Store'">
		</a-page-header>

		<a-row>
			<a-col :lg="{ span: 6 }">
				<a-form-item label="Store Name">
					<a-input
						v-model="form.name"
						v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
					/>
				</a-form-item>

				<a-form-item label="Store Website">
					<div style="margin-bottom: 16px">
						<a-input v-model="website" addon-before="http://" default-value="mysite" />
					</div>
				</a-form-item>

				<a-form-item label="Logo">
					<a-upload
						name="avatar"
						list-type="picture-card"
						class="avatar-uploader"
						:show-upload-list="false"
						action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
						:before-upload="beforeUpload"
						@change="handleChange"
					>
						<img v-if="imageUrl" :src="imageUrl" alt="avatar" />
						<div v-else>
							<a-icon :type="loading ? 'loading' : 'plus'" />
							<div class="ant-upload-text">
								Upload
							</div>
						</div>
					</a-upload>
				</a-form-item>

				<a-form-item label="Categories">
					<a-tree-select
						v-model="form.categoryId"
						style="width: 100%"
						:tree-data="treeData"
						tree-checkable
						:show-checked-strategy="SHOW_PARENT"
						search-placeholder="Please select"
					/>
				</a-form-item>

				<a-form-item label="Offer">
					<a-input
						v-model="form.offer"
						placeholder="offer"
						v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
					/>
				</a-form-item>

				<a-button @click="save" type="dashed" icon="save">
					save
				</a-button>
			</a-col>
		</a-row>
	</div>
</template>

<script>
import { TreeSelect } from 'ant-design-vue';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const treeData = [
	{
		title: 'Node1',
		value: '0-0',
		key: '0-0',
		children: [
			{
				title: 'Child Node1',
				value: '0-0-0',
				key: '0-0-0',
			},
		],
	},
	{
		title: 'Node2',
		value: '0-1',
		key: '0-1',
		children: [
			{
				title: 'Child Node3',
				value: '1',
				key: '1',
				disabled: true,
			},
			{
				title: 'Child Node4',
				value: '2',
				key: '2',
			},
			{
				title: 'Child Node5',
				value: '3',
				key: '3',
			},
		],
	},
];
export default {
	mounted() {},

	layout: 'loggedLayoutNew',
	data() {
		return {
			form: {
				name: '',
			},

			value: ['0-0-0'],
			treeData,
			SHOW_PARENT,
		};
	},
	methods: {
		async save() {
			try {
				console.log(this.form);
				this.isLoading = true;
				await this.$axios.post('/stores', this.form);
        this.isLoading = false;
        this.$router.push('/stores')
			} catch (error) {
        console.log(error)
      }
		},
	},
};
</script>

<style>
html {
	overflow: scroll;
}
</style>
