<template>
  <div>
    <ul class="list-reset flex flex-col">
      <li
        class=" w-full h-full py-3 px-2 border-b border-light-border bg-white"
      >
        <nuxt-link to="/dashboard">
          <a
            class="cursor-pointer font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline text-black hover:text-red-600"
          >
            <i class="fas fa-tachometer-alt float-left mx-2"></i>
            General
            <span><i class="fas fa-angle-right float-right"></i></span>
          </a>
        </nuxt-link>
      </li>

      <nuxt-link to="/dashboard/agents">
        <li class="w-full h-full py-3 px-2 border-b border-light-border">
          <a
            class="cursor-pointer font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline text-black hover:text-red-600"
          >
            <i class="fab fa-wpforms float-left mx-2"></i>
            Agents
            <span><i class="fa fa-angle-right float-right"></i></span>
          </a>
        </li>
      </nuxt-link>

      <nuxt-link to="/dashboard/numbers">
        <li class="w-full h-full py-3 px-2 border-b border-light-border">
          <a
            class="cursor-pointer font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline text-black hover:text-red-600"
          >
            <i class="fa fa-phone float-left mx-2"></i>
            My Numbers
            <span><i class="fa fa-angle-right float-right"></i></span>
          </a>
        </li>
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
