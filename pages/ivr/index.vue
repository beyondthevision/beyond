<template>

<div>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="My IVR's"
    sub-title="You can create a IVR in minutes here."
    @back="() => null"
  >
  <template slot="extra">
	          <div class="extra">

        <a-button key="3"
        type="danger"
		size="large"
	

								@click="goToAdd()"
		>
    <i class="fa fa-plus" style="margin-right:10px;"></i>
          Create IVR
        </a-button>
      </div>


      </template>
	      </a-page-header>

  <a-list
    class="demo-loadmore-list"
    :loading="loading"
    item-layout="horizontal"
    :data-source="data"
  >
    <div
      v-if="showLoadingMore"
      slot="loadMore"
      :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
    >
      <a-spin v-if="loadingMore" />
      <a-button v-else @click="onLoadMore">
         <i class="fa fa-plus" style="margin-right:9px;"></i>Loading more
      </a-button>
    </div>
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a slot="actions">edit</a>
      <a slot="actions">more</a>
      <a-list-item-meta
        description="Ant Design, a "
      >
        <a slot="title" href="https://www.antdv.com/">{{ item.name.last }}</a>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </a-list-item-meta>
    </a-list-item>
  </a-list>
  
</div>

</template>
<script>

import axios from 'axios'
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

export default {
  data() {
    return {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
    };
  },
  mounted() {
    this.getData(res => {
      this.loading = false;
      this.data = res.results;
    });
  },
  methods: {
    async goToAdd () {

    },
    async getData(callback) {
      var response = await axios.get(
      fakeDataUrl
      );

      callback(response.data)

    },
    onLoadMore() {
      this.loadingMore = true;
      this.getData(res => {
        this.data = this.data.concat(res.results);
        this.loadingMore = false;
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'));
        });
      });
    },
  },
};
</script>
<style>
.demo-loadmore-list {
  min-height: 350px;
}
</style>
