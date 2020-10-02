<template>
	<div>
		<a-page-header style="border: 1px solid rgb(235, 237, 240);margin-bottom:10px;" :title="'Add Category'">
		</a-page-header>

		<loading :active.sync="isLoading" :is-full-page="true"></loading>

		<a-row>
			<a-col :lg="{ span: 6 }">
				<a-form-item label="Name">
					<a-input
						placeholder="Insert category name"
						v-model="form.name"
						v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
					/>
				</a-form-item>

				<a-form-item label="Logo">
					<a-button v-if="selectedFile" type="danger" @click="removeSelected">Remove selected</a-button>
					<a-button v-if="selectedFileEdit" type="danger" @click="removeSelected">Remove selected</a-button>

					<img
						class="mt-5"
						width="50%"
						v-if="form.image && form.image.url"
						:src="form.image.url"
						alt="avatar"
					/>

					<a-upload
						v-if="!selectedFile && !selectedFileEdit"
						name="avatar"
						list-type="picture-card"
						class="avatar-uploader"
						:show-upload-list="false"
						:beforeUpload="handleChange"
					>
						<div>
							<a-icon :type="isLoading ? 'loading' : 'plus'" />
							<div class="ant-upload-text">
								Upload
							</div>
						</div>
					</a-upload>
				</a-form-item>


        <a-form-item label="Parent Category">


    <a-select v-model="form.parent" default-value="select" style="width: 120px" v-if="!isLoading && categories && categories.length > 0">
      <a-select-option :key="category.id" v-for="category in categories" :value="category.id">
        {{category.name}}
      </a-select-option>
    </a-select>

        </a-form-item>

				<a-button @click="save" type="dashed" icon="save">
					save
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
	async mounted() {
		this.selectedRegisterId = this.$route.query.id;
    var response = await this.$axios.get('/categories')
    this.categories = response.data

    console.log(this.categories)

		if (this.selectedRegisterId) {
			var response = await this.$axios.get('/categories/' + this.selectedRegisterId);
      this.form = response.data;
      if (response.data.parent && response.data.parent.id) {
          this.form.parent = response.data.parent.id
      }

			if (this.form.image) {
				this.selectedFileEdit = this.form.image;
			}
		}
	},
	data() {
		return {
      categories: [],
			selectedFileEdit: null,
			selectedFile: null,
			isLoading: false,
			form: {
				name: '',
			},
		};
	},
	components: {
		Loading,
	},
	methods: {
		removeSelected() {
			this.selectedFile = null;
			this.selectedFileEdit = null;
			this.form.image = null
		},
		async save() {
			if (!this.selectedRegisterId) {
				try {
					this.isLoading = true;
					var response = await this.$axios.post('/categories', this.form);
				} catch (error) {
					this.isLoading = false;
					this.$error({
						title: 'Error on create.',
						content: 'Please contact support.',
					});
				}

				if (this.selectedFile) {
					const data = new FormData();
					data.append('files', this.selectedFile);
					data.append('refId', response.data.id);
					data.append('ref', 'categories');
					data.append('field', 'image');

					try {
						await this.$axios.post('/upload', data);
						this.isLoading = true;
					} catch (error) {
						this.isLoading = flase;
						this.$error({
							title: 'Error on upload.',
							content: 'Please contact support.',
						});
					}

					this.$router.push('/categories');
				} else {
					this.$router.push('/categories');
					this.isLoading = false;
				}
			} else {
				try {
					this.isLoading = true;
					var response = await this.$axios.put('/categories/' + this.selectedRegisterId, this.form);
				} catch (error) {
					this.isLoading = false;
					this.$error({
						title: 'Error on create.',
						content: 'Please contact support.',
					});
				}

				if (this.selectedFile) {
					const data = new FormData();
					data.append('files', this.selectedFile);
					data.append('refId', response.data.id);
					data.append('ref', 'categories');
					data.append('field', 'image');

					try {
						await this.$axios.post('/upload', data);
						this.isLoading = true;
					} catch (error) {
						this.isLoading = flase;
						this.$error({
							title: 'Error on upload.',
							content: 'Please contact support.',
						});
					}

					this.$router.push('/categories');
				} else {
					this.$router.push('/categories');
					this.isLoading = false;
				}
			}
		},
		handleChange(file, fileList, event) {
			if (file) {
				this.selectedFile = file;
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
