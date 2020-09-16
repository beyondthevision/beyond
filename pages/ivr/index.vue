<template>

<div>
  		<loading :active.sync="isLoading" :is-full-page="true"></loading>
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

  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="My IVR's"
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
      <a @click="goToEdit(item)" slot="actions">edit</a>

 <a-popconfirm slot="actions"
    title="Are you sure delete this?"
    ok-text="Yes"
    cancel-text="No"
    @confirm="confirm(item)"
    @cancel="cancel"
  >
      <a style="color:red;" >delete</a>
  </a-popconfirm>

      <a-list-item-meta
        :description="item.name"
      >
        <a slot="title">{{ item.description}}</a>
        <a-avatar
          slot="avatar"
          src="https://www.pngitem.com/pimgs/m/535-5353832_auto-attendant-and-ivr-ivr-icon-transparent-hd.png"
        />
      </a-list-item-meta>
    </a-list-item>
  </a-list>
  
</div>

</template>
<script>
import {
  deleteEntity
} from "../../api-front/api";
import axios from 'axios'
import { getPlan } from '../../utils/actions';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  data() {
    return {
      plan: {
        maxIVR: 0,
      },
      dialogModal: false,
      isLoading: true,
      start:0,
      limit: 10,
      totalRegisters: 0,
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
    };
  },
  components: {
    Loading
  },
  async mounted() {
        await this.checkIfCanCreate();
    this.getData(res => {
      this.loading = false;
      this.data = res;
      this.isLoading = false
    });
  },
  methods: {
    async confirm(e) {
      this.isLoading = true
      var response = await deleteEntity('ivrs', e.id)

    this.getData(res => {
      this.data = res;
      this.isLoading = false
    });


      this.$success({
        title: 'deleted',
        content: 'the register was deleted.'
      });
    },
    cancel(e) {
      console.log(e);
      this.$message.error('Click on No');
    },
    async checkIfCanCreate() {
      this.getPlan();
      this.count()
    },
    async goToAdd () {

      if (this.totalRegisters < this.plan.maxIVR) {
        this.$router.push("/ivr/add");
      } else {
        this.$warning({
          content: "Your plan does not allow you to create more IVR.",
          title: "Limit exceeded"
          }
        );
      }
    },
    async getPlan() {
      var request = await getPlan(this.$auth.user.plan);

      this.plan.maxIVR = request.data[0].maxIVR;

    },
    async getData(callback) {
      var response = await this.$axios.get(
      `/IVRS?_start=${this.start}&deleted_at_null=true&_limit=${this.limit}&account.email=${this.$auth.user.email}`
      );
      callback(response.data)

    },
    async count() {
      var response = await this.$axios.get(
      `/IVRS/count?account.email=${this.$auth.user.email}`
      );

      this.totalRegisters = response.data

    },
    goToEdit (row) {
        this.$router.push("/ivr/add?id=" + row.id);
    },
    onLoadMore() {
      this.loadingMore = true;
      this.isLoading = true
      this.start = this.start + this.limit
      this.getData(res => {
        this.data = this.data.concat(res);
        this.isLoading = false
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
