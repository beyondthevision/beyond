<template>
  <div>
    <!--Footer-->
    <footer class="bg-white">
      <div class="container mx-auto  px-8">
        <div class="w-full flex flex-col md:flex-row py-6">
          <div class="flex-1 mb-6">
            <a
              class="text-orange-600 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            >
              <img src="/text.png" alt="" />
            </a>
          </div>

          <div class="flex-1">
            <!-- <p class="uppercase text-gray-500 md:mb-6">Links</p>
                <ul class="list-reset mb-6">
                    <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                        <a href="#" class="no-underline hover:underline text-gray-800 hover:text-orange-500">FAQ</a>
                    </li>
                    <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                        <a href="#" class="no-underline hover:underline text-gray-800 hover:text-orange-500">Help</a>
                    </li>
                    <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                        <a href="#" class="no-underline hover:underline text-gray-800 hover:text-orange-500">Support</a>
                    </li>
                </ul> -->
          </div>
          <div class="flex-1">
            <p class="uppercase text-gray-500 md:mb-6">Legal</p>
            <ul class="list-reset mb-6">
              <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                        <a href="#" class="no-underline hover:underline text-gray-800 hover:text-orange-500">Terms</a>
                    </li>
              <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                <a
                  @click="goPrivacy"
                  class="no-underline hover:underline text-gray-800 hover:text-orange-500 cursor-pointer"
                  >Privacy</a
                >
              </li>
            </ul>
          </div>
          <div class="flex-1">
            <p class="uppercase text-gray-500 md:mb-6">Social</p>
            <ul class="list-reset mb-6">
              <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                <a
                  target="_blank"
                  href="https://www.facebook.com/Jitto-107057954290036/?modal=admin_todo_tour"
                  class="no-underline hover:underline text-gray-800 hover:text-orange-500"
                  >Facebook</a
                >
              </li>
              <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                <a
                  target="_blank"
                  href="https://www.instagram.com/jitto.io/"
                  class="no-underline hover:underline text-gray-800 hover:text-orange-500"
                  >Instagram</a
                >
              </li>
              <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                <a
                  target="_blank"
                  href="https://twitter.com/JittoI"
                  class="no-underline hover:underline text-gray-800 hover:text-orange-500"
                  >Twitter</a
                >
              </li>
            </ul>
          </div>
          <div class="flex-1">
            <p class="uppercase text-gray-500 md:mb-6">Company</p>
            <ul class="list-reset mb-6">
              <!-- <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="#"
                    class="no-underline hover:underline text-gray-800 hover:text-orange-500"
                    >About Us</a
                  >
                </li> -->
              <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                <a
                  onclick="$crisp.push(['do', 'chat:open'])"
                  href="#"
                  class="no-underline hover:underline text-gray-800 hover:text-orange-500"
                  >Contact</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    goPrivacy() {
      this.$router.push({
        path: "privacy",
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
