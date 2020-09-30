<template>
    <div>

		<a-page-header style="border: 1px solid rgb(235, 237, 240);margin-bottom:10px;" :title="'Add Category'">

		</a-page-header>

        <a-row>
            <a-col :lg="{span:6}">
    <a-form-item label="Name">
      <a-input
        v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
      />
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



    <a-button type="dashed"  icon="save">
save
    </a-button>


            </a-col>


            

        </a-row>


    </div>
</template>

<script>
    export default {
        layout: 'loggedLayoutNew',
    }
</script>

<style>
    html{
        overflow:scroll;
    }
</style>