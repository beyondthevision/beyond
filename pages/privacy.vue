<template>
  <div>
    <div
      class="leading-normal tracking-normal text-white gradient"
      style="font-family: 'Source Sans Pro', sans-serif;"
    >
      <!--Nav-->
      <nav id="header" class="fixed w-full z-30 top-0 text-white">
        <div
          class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2"
        >
          <div class="pl-4 flex items-center">
            <a 
            @click="goMain"
              class="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
              href="#"
            >
              <img style="filter: brightness(0.25);" src="text.png" alt="" />
            </a>
          </div>



 
        </div>

        <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
      </nav>

      <section class="bg-grey border-b py-8 mt-20 p-2">
        <div class="container terms">
          <h3 class="font-extrabold">1. Terms</h3>
          <p>
            By accessing the website at
            <a href="http://jitto.io">http://jitto.io</a>, you are
            agreeing to be bound by these terms of service, all applicable laws
            and regulations, and agree that you are responsible for compliance
            with any applicable local laws. If you do not agree with any of
            these terms, you are prohibited from using or accessing this site.
            The materials contained in this website are protected by applicable
            copyright and trademark law.
          </p>
          <h3  class="font-extrabold">2. Use License</h3>
          <ol class="alpha">
            <li>
              Permission is granted to temporarily download one copy of the
              materials (information or software) on JobHuntBuddy's website for
              personal, non-commercial transitory viewing only. This is the
              grant of a license, not a transfer of title, and under this
              license you may not:
              <ol class="roman">
                <li>modify or copy the materials;</li>
                <li>
                  use the materials for any commercial purpose, or for any
                  public display (commercial or non-commercial);
                </li>
                <li>
                  attempt to decompile or reverse engineer any software
                  contained on JobHuntBuddy's website;
                </li>
                <li>
                  remove any copyright or other proprietary notations from the
                  materials; or
                </li>
                <li>
                  transfer the materials to another person or "mirror" the
                  materials on any other server.
                </li>
              </ol>
            </li>
            <li>
              This license shall automatically terminate if you violate any of
              these restrictions and may be terminated by JobHuntBuddy at any
              time. Upon terminating your viewing of these materials or upon the
              termination of this license, you must destroy any downloaded
              materials in your possession whether in electronic or printed
              format.
            </li>
          </ol>
          <h3 class="font-extrabold">3. Disclaimer</h3>
          <ol class="alpha">
            <li>
              The materials on JobHuntBuddy's website are provided on an 'as is'
              basis. JobHuntBuddy makes no warranties, expressed or implied, and
              hereby disclaims and negates all other warranties including,
              without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </li>
            <li>
              Further, JobHuntBuddy does not warrant or make any representations
              concerning the accuracy, likely results, or reliability of the use
              of the materials on its website or otherwise relating to such
              materials or on any sites linked to this site.
            </li>
          </ol>
          <h3 class="font-extrabold">4. Limitations</h3>
          <p>
            In no event shall JobHuntBuddy or its suppliers be liable for any
            damages (including, without limitation, damages for loss of data or
            profit, or due to business interruption) arising out of the use or
            inability to use the materials on JobHuntBuddy's website, even if
            JobHuntBuddy or a JobHuntBuddy authorized representative has been
            notified orally or in writing of the possibility of such damage.
            Because some jurisdictions do not allow limitations on implied
            warranties, or limitations of liability for consequential or
            incidental damages, these limitations may not apply to you.
          </p>
          <h3 class="font-extrabold">5. Accuracy of materials</h3>
          <p>
            The materials appearing on JobHuntBuddy's website could include
            technical, typographical, or photographic errors. JobHuntBuddy does
            not warrant that any of the materials on its website are accurate,
            complete or current. JobHuntBuddy may make changes to the materials
            contained on its website at any time without notice. However
            JobHuntBuddy does not make any commitment to update the materials.
          </p>
          <h3 class="font-extrabold">6. Links</h3>
          <p>
            JobHuntBuddy has not reviewed all of the sites linked to its website
            and is not responsible for the contents of any such linked site. The
            inclusion of any link does not imply endorsement by JobHuntBuddy of
            the site. Use of any such linked website is at the user's own risk.
          </p>
          <h3>7. Modifications</h3>
          <p>
            JobHuntBuddy may revise these terms of service for its website at
            any time without notice. By using this website you are agreeing to
            be bound by the then current version of these terms of service.
          </p>
          <h3 class="font-extrabold">8. Governing Law</h3>
          <p>
            These terms and conditions are governed by and construed in
            accordance with the laws of United States and you irrevocably submit
            to the exclusive jurisdiction of the courts in that State or
            location.
          </p>
          <p>
            Generated by
            <a
              title="Terms of Service Template Generator"
              href="https://getterms.io/"
              >GetTerms.io</a
            >
          </p>
        </div>
      </section>

      <section class="container mx-auto text-center py-6 mb-12">
        <h1
          class="w-full my-2 text-5xl font-bold leading-tight text-center text-white"
        >
          Innovative phone system for modern business.
        </h1>
        <div class="w-full mb-4">
          <div
            class="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"
          ></div>
        </div>

        <h3 class="my-4 text-3xl leading-tight">
          Innovative phone system for modern business.!
        </h3>

        <button
          class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg"
        >
          Sign up!
        </button>
      </section>

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

  methods: {


    goToRegister() {
      this.$router.push({
        path: "register",
      });
    },
    goMain() {
      this.$router.push({
        path: "/",
      });
    },
    login() {
      this.$router.push({
        path: "login",
      });
    },
  },
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700",
      },
    ],
  },

  mounted() {
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
        navaction.classList.remove("text-gray-800");
        navaction.classList.add("text-white");
        //Use to switch toggleColour colours
        for (var i = 0; i < toToggle.length; i++) {
          toToggle[i].classList.add("text-gray-800");
          toToggle[i].classList.remove("text-white");
        }
        header.classList.add("shadow");
        navcontent.classList.remove("bg-gray-100");
        navcontent.classList.add("bg-white");
      } else {
        header.classList.remove("bg-white");
        navaction.classList.remove("gradient");
        navaction.classList.add("bg-white");
        navaction.classList.remove("text-white");
        navaction.classList.add("text-gray-800");
        //Use to switch toggleColour colours
        for (var i = 0; i < toToggle.length; i++) {
          toToggle[i].classList.add("text-white");
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

<style>
.gradient {
  background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
}
.terms {
  color: #4a5568;
}
.container {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
}
.bg-grey {
    background-color: #edf2f7;
}

</style>
