<template>
	<div>
		<a-row>
			<a-col>
				<a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Create IVR" @back="() => null">
					<template slot="extra">
						<div class="extra">
							<a-button key="3" type="danger" size="large" @click="goToAdd()">
								<i class="fa fa-plus" style="margin-right:10px;"></i>
								Create IVR
							</a-button>
						</div>
					</template>
				</a-page-header>
			</a-col>
		</a-row>

        <a-row class="mt-5">
            <a-col>
<template>
  <a-breadcrumb>
    <a-breadcrumb-item href="">
      <a-icon type="home" />
    </a-breadcrumb-item>
    <a-breadcrumb-item href="">
      <a-icon type="user" />
      <span>IVR Creation</span>
    </a-breadcrumb-item>
    <a-breadcrumb-item>
     General Parameters
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>


            </a-col>
        </a-row>

		<a-row class="mt-5">
			<a-col :lg="{ span: 4 }" :xs="{ span: 24 }">
				<menuIVR></menuIVR>
			</a-col>

			<!--/Sidebar-->
			<!--Main-->
			<a-col :lg="{ span: 12 }" :xs="{ span: 24, offset: 0 }" style="margin-left:15px;">
				<nuxt></nuxt>
			</a-col>
			<!--/Main-->
		</a-row>
	</div>
</template>

<script>
import menuIVR from '@/components/ivr/menuIVR';

export default {
	components: {
		menuIVR,
	},
};
</script>

<style lang="scss" scoped></style>
