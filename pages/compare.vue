<template>
  <div>
    <div class="mt-20">
      <nav id="header" class="fixed w-full z-30 top-0 text-white">
        <div
          class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2"
        >
          <div class="pl-4 flex items-center">
            <a
              class="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
              href="/"
            >
              <img style="filter: brightness(0.25);" src="text.png" alt="" />
            </a>
          </div>

          <div class="block lg:hidden pr-4">
            <button
              id="nav-toggle"
              class="flex items-center p-1 text-orange-800 hover:text-gray-900"
            >
              <svg
                class="fill-current h-6 w-6"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>

          <div
            class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
            id="nav-content"
          >
            <ul class="list-reset lg:flex justify-end flex-1 items-center">
              <li class="mr-3">
                <a
                  class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                  href="/#pricing"
                  >Pricing</a
                >
              </li>
              <li class="mr-3">
                <a
                  style="cursor:pointer;"
                  class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                  href="/#features"
                  >Features</a
                >
              </li>
              <li class="mr-3">
                <a
                  style="cursor:pointer;"
                  class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                  @click="goToRegister"
                  >Register</a
                >
              </li>
            </ul>
            <button
              @click="login"
              id="navAction"
              class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75"
            >
              Login
            </button>
          </div>
        </div>

        <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
      </nav>
    </div>




  <section>


<h1 class="my-4 text-3xl font-bold ml-5 py-8 px-8 mt-5 content-center" style="color: black;">
              Innovative phone system for modern business!
            </h1>

    <div class="container max-w-full mx-auto pl-8 content-center">


      <div class="media-block block--col f-1 content-center">

        <table class="table table--sm pricing-plan--table table--bordered__row">
          <tbody>
            <tr>
              <th class="plan-feature--detail">Portabilidad de números</th>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
            </tr>
            <tr>
              <th class="plan-feature--detail">Marcador web</th>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
            </tr>
            <tr>
              <th class="plan-feature--detail">Historial de llamadas</th>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
            </tr>
            <tr>
              <th class="plan-feature--detail">Horario de atención</th>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
            </tr>
            <tr>
              <th class="plan-feature--detail">Mensajes de bienvenida</th>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
            </tr>
            <tr>
              <th class="plan-feature--detail">Menús telefónicos (IVR)</th>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
            </tr>
            <tr>
              <th class="plan-feature--detail">Mensajes de texto (SMS)</th>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
            </tr>
            <tr>
              <th class="plan-feature--detail">Música de espera</th>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
            </tr>
 
            <tr>
              <th class="plan-feature--detail">Acceso a reportes básicos</th>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
            </tr>
            <tr>
              <th class="plan-feature--detail">Acceso a reportes completos</th>
              <td>
                <span class="block iconx--unchecked iconx--md iconx"></span>
              </td>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
              <td>
                <i style="color:#d53369;" class="fa fa-check"></i>
              </td>
            </tr>
            <tr>
              <th class="plan-feature--detail">Fax a email</th>
              <td class="center--text">US$ 0.02/página</td>
              <td class="center--text">Incluido</td>
              <td class="center--text">Incluido</td>
            </tr>
            <tr>
              <th class="plan-feature--detail">Marcador Automático</th>
              <td class="center--text">US$ 0.05/número marcado</td>
              <td class="center--text">Incluido</td>
              <td class="center--text">Incluido</td>
            </tr>

            <tr>
              <th class="plan-feature--detail">Grabaciones de llamadas</th>
              <td class="center--text">US$ 0.005/min</td>
              <td class="center--text">US$ 0.003/min</td>
              <td class="center--text">Incluido</td>
            </tr>
            <tr>
              <th class="plan-feature--detail">Buzón de voz</th>
              <td class="center--text">US$ 0.005/min</td>
              <td class="center--text">US$ 0.003/min</td>
              <td class="center--text">Incluido</td>
            </tr>
 

  
          </tbody>
        </table>
      </div>
    </div>
  </section>

<div class="mt-8">
      <foot></foot>
</div>

  </div>
</template>

<script>
import foot from '../components/landing/footer'

export default {
  components: {
    foot
  },


  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700",
      },
    ],
  },
  methods: {
    async getData() {
      let result = await getPlans();
      this.plans = result.data;
      this.plans.sort(this.setOrderPlan);
    },
    goPrivacy() {
      this.$router.push({
        path: "privacy",
      });
    },
    goToRegister() {
      this.$router.push({
        path: "register",
      });
    },
    login() {
      this.$router.push({
        path: "login",
      });
    }
  },
  async mounted() {
        await  this.$auth.fetchUser()


      $crisp.push(['do', 'chat:open'])


    this.getData();
    var scrollpos = window.scrollY;
    var header = document.getElementById("header");
    var navcontent = document.getElementById("nav-content");
    var navaction = document.getElementById("navAction");
    var brandname = document.getElementById("brandname");
    var toToggle = document.querySelectorAll(".toggleColour");

    document.addEventListener("scroll", function() {
      /*Apply classes for slide in bar*/
      scrollpos = window.scrollY;

      if (scrollpos > 10) {
        header.classList.add("bg-white");
        navaction.classList.remove("bg-white");
        navaction.classList.add("gradient");
        //Use to switch toggleColour colours
        for (var i = 0; i < toToggle.length; i++) {
          toToggle[i].classList.add("text-gray-800");
        }
        header.classList.add("shadow");
        navcontent.classList.remove("bg-gray-100");
        navcontent.classList.add("bg-white");
      } else {
        header.classList.remove("bg-white");
        navaction.classList.remove("gradient");
        navaction.classList.add("bg-white");
        //Use to switch toggleColour colours
        for (var i = 0; i < toToggle.length; i++) {
          toToggle[i].classList.remove("text-gray-800");
        }

        header.classList.remove("shadow");
        navcontent.classList.remove("bg-white");
        navcontent.classList.add("bg-gray-100");
      }
    });
  },

};
</script>

<style lang="css" scoped>
.pricing-plan--table td {
    width: 23%;
}

.table--bordered__row th+th, .table--bordered__row td+td, .table--bordered__row th+td, .table--bordered__row td+th {
    border-bottom: 2px solid #ECF2FC;
}

.table--sm th, .table--sm td {
    padding: calc(0.5 * 1rem) 0;
}

</style>
