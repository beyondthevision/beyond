<template>
  <div>
    		<loading :active.sync="isLoading" :is-full-page="true"></loading>

    <a-modal
      title="Add number"
	  on-ok="addNumberToList"
    on-cancel="handleCloseDialogVisibleAddNumber"
      :visible="dialogVisibleAddNumber"
	v-model="dialogVisibleAddNumber"
    >
    <!-- <el-dialog
      title="Add number"
      :visible.sync="dialogVisibleAddNumber"
      width="30%"
      :before-close="handleCloseDialogVisibleAddNumber"
    > -->
      <el-select v-model="numberToAdd" placeholder="Select number">
        <el-option
          v-for="item in numbers"
          :key="item.id"
          :label="item.number"
          :value="item.id"
        >
        </el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseDialogVisibleAddNumber">Cancel</el-button>
        <el-button type="primary" @click="addNumberToList()"
          >Add number</el-button
        >
      </span>
    <!-- </el-dialog> -->
</a-modal>
		<a-row>

			<a-col :lg="{ span: 8 }" :xs="{ span: 24, offset: 0 }">

          <div
            v-if="showValidationError"
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5"
            role="alert"
          >
            <strong class="font-bold">Warning!</strong>
            <span class="block sm:inline"
              >Validation errors, you need to complete all the form.</span
            >
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                class="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path
                  d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                />
              </svg>
            </span>
          </div>

          <div>
            <div>
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                First Name
              </label>
              <input
                v-model="name"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
              />
            </div>
            <div>
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Last Name
              </label>
              <input
                v-model="lastName"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <div>
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-5"
                for="grid-first-name"
              >
                Email
              </label>
              <input
                v-model="email"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
              />
            </div>
            <div>
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Identification number
              </label>
              <input
                :disabled="disabled"
                v-model="documentId"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Document Id"
              />
              <p class="text-gray-600 text-xs italic">
                This will be the SIP identifier (numeric)
              </p>
            </div>
          </div>

          <div>
            <div>
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-5"
                for="grid-password"
              >
                Password
              </label>
              <input
                v-model="password"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="password"
                placeholder="******************"
              />
              <p class="text-gray-600 text-xs italic">
                Your password must have a minimum length of 12 characters along
                with at least one number, uppercase character and lowercase
                character.
              </p>
            </div>

            <div>
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-5"
                for="grid-password"
              >
                Select numbers
              </label>
              <a
                @click="addNumber"
                class="mt-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <span>Select numbers</span>
              </a>

              <ul
                class="mt-2 list-inside sm:list-outside md:list-inside lg:list-outside xl:list-inside"
              >
                <li class="cursor-pointer" v-for="number in agentInfo.numbers">
                  📲 {{ number.number }}
                  <a @click="removeNumber(number)">Delete</a>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <el-checkbox v-model="blocked">Blocked</el-checkbox>
          </div>

          <hr class="border-0 bg-gray-500 text-gray-500 h-px" />

          <button
            @click="updateData"
            class="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            SAVE
          </button>

			</a-col>


		</a-row>


  </div>
</template>

<script>
import VueTimepicker from "vue2-timepicker";
import countriesAll from "../../api-front/countriesAll";
import { setRegistry } from "../../utils/actions";
import _ from "lodash";
import {
  getUserById,
  saveAgent,
  updateAgent,
  updateNumber,
  disableNumber,
  updateUser,
  getNumbersNoIVR,
  getAgentByUserId,
} from "@/api-front/api";
import logs from '../../api-front/logs'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  layout: "loggedLayout",
  async mounted() {
    this.selectedRegisterId = this.$route.query.id;
    if (this.selectedRegisterId) {
      await this.getUser();
    } else {
      this.disabled = false;
    }
    await this.getNumbersNoIVR();
  },
  methods: {
    async removeNumber(n) {
      // search the number to delete
      var find = _.find(this.agentInfo.numbers, {
        id: n.id,
      });

      // filter the number of selected to remove
      this.selectedNumbers = this.selectedNumbers.filter(function(item) {
        return item !== n.id;
      });

      //this.agentInfo.numbers = [];
      this.agentInfo.numbers = this.agentInfo.numbers.filter(function(number) {
        return number.id !== n.id;
      });

      this.numbersToDelete.push(n.id);

      console.log(
        "numbertoadd to numbers",
        n,
        this.numbers,
        this.agentInfo.numbers
      );

      this.numbers.push(n);
    },
    addNumber() {
      this.numberToAdd = null;
      this.dialogVisibleAddNumber = true;
    },
    addNumberToList() {
      if (!this.numberToAdd) return;

      // console.log(this.numberToAdd, "this.numberToAdd");
      // console.log(this.agentInfo.numbers, "a");
      // console.log(this.numbersAll, "all");

      var n = _.find(this.numbersAll, {
        id: this.numberToAdd,
      });

      this.selectedNumbers.push(this.numberToAdd);

      if (!this.agentInfo.numbers) {
        this.agentInfo.numbers = [];
      }

      this.agentInfo.numbers.push(n);

      this.numbers = this.numbers.filter(function(number) {
        return number.id !== n.id;
      });

      this.dialogVisibleAddNumber = false;
    },
    validatePassword() {
      var strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})"
      );
      var isValid = true;

      if (!strongRegex.test(this.password)) {
        isValid = false;
      }
      return isValid;
    },
    async getNumbersNoIVR() {
      var numbers = await getNumbersNoIVR(this.$auth.user.id);
      const arr = numbers.data.filter(
        (i) => !this.selectedNumbers.includes(i.id)
      );
      this.numbers = arr;
      this.numbersAll = _.clone(numbers.data, true);
    },
    handleCloseDialogVisibleAddNumber() {
      this.dialogVisibleAddNumber = false;
    },
    async getUser() {
      var response = await getUserById(this.selectedRegisterId);
      if (response.status == 200) {
        var data = response.data;
        this.email = data.email;
        this.name = data.name;
        this.lastName = data.lastName;
        this.documentId = data.documentId;
        this.blocked = data.blocked;
      }

      var responseAgent = await getAgentByUserId(this.selectedRegisterId);
      this.agentInfo = responseAgent.data[0];

      // get al the numbers of the agent and copy the id
      this.selectedNumbers = this.agentInfo.numbers.map((agent) => {
        return agent.id;
      });
    },
    async updateData() {

      
      if (!this.selectedRegisterId || this.password !== "") {
        if (!this.validatePassword()) {
          this.$warning({
            content: "The password is not valid. Your password must have a minimum length of 12 characters along with at least one number, uppercase character and lowercase character.",
            title: "Error on create agent"
            }
          );
          return;
        }
      }

      if (this.selectedNumbers.length < 1) {
        this.$warning({
          content: "You need to select a number for this user.",
          title: "Error on create agent"
          }
        );

        return;
      }

      if (isNaN(this.documentId)) {

				this.$error({
          title: 'Error on create agent',
          content: "The Identification number is not numeric."
				});

        return;
      }

      if (
        this.name == "" ||
        this.lastName == "" ||
        this.email == "" ||
        this.documentId == ""
      ) {
        this.showValidationError = true;
        window.scrollTo(500, 0);
      } else {
        this.showValidationError = false;
            this.isLoading = true

        if (this.selectedRegisterId) {
          try {
            var resp = await updateAgent(this.agentInfo.id, {
              numbers: this.selectedNumbers,
            });

            var userData = {
              email: this.email,
              lastName: this.lastName,
              name: this.name,
              blocked: this.blocked,
            };

            if (this.password !== "") {
              userData.password = this.password;
            }


            this.selectedNumbers.forEach(async (v) => {
              await updateNumber(v, {
                active: true,
                agent: this.agentInfo.id,
                campaign: this.selectedRegisterId,
              });


            });

            this.numbersToDelete.forEach(async (n) => {
              var exist = this.selectedNumbers.find((x) => x == n);
              if (!exist) {
                try {
                  await disableNumber({
                    id: n,
                    agent: null,
                    active: false,
                    campaign: null,
                  });


                } catch (error) {

                this.isLoading = false

                  console.log("error", error);
                }
              }
            });

            // look the initial numbers in this campaign
            // see what of this numbers are not in

            var respUser = updateUser(this.selectedRegisterId, userData);
            this.isLoading = true
            this.$router.push("/campaign/agents");
          } catch (error) {
            console.log("error", error);
          }

          this.$success( {
            title: 'The agent was updated.'
          });
        } else {
          try {
            var response = await setRegistry({
              username: this.documentId,
              name: this.name,
              lastName: this.lastName,
              password: this.password,
              issue: this.password,
              email: this.email,
              agent: true,
              account: this.$auth.user.id,
              documentId: this.documentId,
              blocked: this.blocked,
            });

            this.isLoading = true

            var resp = await saveAgent({
              identifier: this.documentId,
              account: this.$auth.user.id,
              user: response.data.user.id,
              numbers: this.selectedNumbers,
              //user:1
            });
            this.isLoading = false

            var agent = resp.data;

            // numbersToAdd
            console.log(this.selectedNumbers, "numbers")
            this.selectedNumbers.forEach(async (v) => {
              console.log("modificando numero", v)
              await updateNumber(v, {
                active: true,
                agent: agent.id,
                campaign: this.selectedRegisterId,
              });
            });

            this.numbersToDelete.forEach(async (n) => {
              var exist = this.selectedNumbers.find((x) => x == n);
              if (!exist) {
                try {

                  this.isLoading = true

                  await updateNumber(n, {
                    agent: null,
                    active: false,
                    campaign: null,
                  });

                  this.isLoading = false

                } catch (error) {
                  console.log("error");
                }
              }
            });

         this.$success( {
            title: 'The agent was created.'
          });

            this.$router.push("/campaign/agents");
          } catch (error) {
            console.log("error", error);
            this.isLoading = false
            this.$error({
              title: "The email or the identification number is taken",
              content: "Error on create agent"
            });
          }
        }
      }
    },
  },
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      disabled: true,
      blocked: false,
      selectedRegisterId: null,
      agentInfo: {},
      numberToAdd: null,
      numbersToDelete: [],
      numbers: [],
      numbersAll: [],
      selectedNumbers: [],
      dialogVisibleAddNumber: false,
      showValidationError: false,
      country: null,
      countries: countriesAll,
      name: "",
      lastName: "",
      password: "",
      email: "",
      documentId: "",
    };
  },
};
</script>

<style lang="scss" scoped></style>
