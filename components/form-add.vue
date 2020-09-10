<template>
  <div>
    <div v-for="(field, index) in form">
      <div
        v-if="field.type == 'string' && field.position == position"
        class="form-group"
      >
        <label
          >{{ getName(field) }}

          <b style="font-weight: bold;color: purple;" v-if="field.required"
            >*</b
          >
        </label>
        <input
          v-model="field.value"
          :placeholder="'ingrese ' + field.label"
          type="text"
          class="form-control"
        />
      </div>

      <div
        v-if="field.type == 'money' && field.position == position"
        class="form-group"
      >
        <label
          >{{ getName(field) }}

          <b style="font-weight: bold;color: purple;" v-if="field.required"
            >*</b
          >
        </label>
        <money
          prefix="$ "
          :precision="0"
          class="form-control"
          v-model="field.value"
        />
      </div>

      <div
        v-if="field.type == 'price-asign' && field.position == position"
        class="form-group"
      >
        <hr />

        <el-dialog
          title="Asignación de precios"
          :visible.sync="field.visible"
          width="30%"
        >
          <div class="row" :key="list.id" v-for="list in priceList">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{ list.nombre }}</label>
                <money
                  v-model="list.valor"
                  class="form-control"
                  v-bind="money"
                ></money>
              </div>
            </div>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="field.visible = false">Cancelar</el-button>
            <el-button
              type="primary"
              @click="saveAsignacionPrecios(priceList, field)"
              >Guardar</el-button
            >
          </span>
        </el-dialog>

        <button @click="field.visible = true" class="btn btn-primary">
          ASIGNACIÓN DE PRECIOS
        </button>
      </div>

      <div
        v-if="field.type == 'textarea' && field.position == position"
        class="form-group"
      >
        <label
          >{{ getName(field) }}
          <b style="font-weight: bold;color: purple;" v-if="field.required"
            >*</b
          >
        </label>
        <textarea
          v-model="field.value"
          :placeholder="'ingrese ' + field.label"
          type="text"
          class="form-control"
        >
        </textarea>
      </div>

      <div
        v-if="field.type == 'checkbox' && field.position == position"
        class="form-group"
      >
        <label
          >{{ getName(field) }}

          <b style="font-weight: bold;color: purple;" v-if="field.required"
            >*</b
          >
        </label>
        <br />

        <el-checkbox v-model="field.value" border></el-checkbox>
      </div>

      <div
        v-if="field.type == 'number' && field.position == position"
        class="form-group"
      >
        <label
          >{{ getName(field) }}

          <b style="font-weight: bold;color: purple;" v-if="field.required"
            >*</b
          >
        </label>
        <input
          v-model="field.value"
          :placeholder="'ingrese ' + field.label"
          type="number"
          class="form-control"
        />
      </div>

      <div
        v-if="field.type == 'select-autocomplete' && field.position == position"
        class="form-group"
      >
        <label
          >{{ getName(field) }}

          <b style="font-weight: bold;color: purple;" v-if="field.required"
            >*</b
          >
        </label>

        <search-autocomplete
          v-model="field.value"
          :field="field"
        ></search-autocomplete>

        <!-- <v-select :options="[{ label: 'Canada', code: 'ca' }]"></v-select> -->
      </div>

      <div
        v-if="field.type == 'json' && field.position == position"
        class="form-group"
      >
        <label>{{ field.label }}</label>

        <el-dialog
          title="Agregar"
          :visible.sync="field.dialogVisible"
          width="50%"
        >
          <div
            class="alert alert-danger"
            role="alert"
            v-if="field.modalErrors && field.modalErrors.length > 0"
          >
            <p class="mb-0" v-for="error in field.modalErrors">
              Advertencia: {{ error }}
            </p>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div
                v-if="formfield.position == 'left'"
                v-bind="formfield.id"
                v-for="formfield in field.fields"
              >
                <label>{{ formfield.id }}</label>
                <div class="form-group">
                  <input
                    v-model="formfield.value"
                    :placeholder="'Ingrese ' + formfield.label"
                    type="text"
                    class="form-control"
                  />
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div
                v-if="
                  formfield.position == 'right' && formfield.type == 'string'
                "
                v-bind="formfield.id"
                v-for="formfield in field.fields"
              >
                <label>{{ formfield.id }}</label>
                <div class="form-group">
                  <input
                    v-model="formfield.value"
                    :placeholder="'Ingrese ' + formfield.label"
                    type="text"
                    class="form-control"
                  />
                </div>
              </div>

              <div
                v-if="
                  formfield.position == 'right' &&
                    formfield.type == 'select-autocomplete'
                "
                v-bind="formfield.id"
                v-for="formfield in field.fields"
              >
                <label>{{ formfield.id }}</label>
                <search-autocomplete
                  v-model="formfield.value"
                  :field="formfield"
                ></search-autocomplete>
              </div>
            </div>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button
              @click="
                field.dialogVisible = false;
                dialogMode = 'create';
              "
              >Cancelar</el-button
            >

            <el-button type="primary" @click="addToList(field)"
              >Guardar</el-button
            >
          </span>
        </el-dialog>

        <div>
          <button
            style="margin-bottom:10px"
            @click="openModal(field)"
            class="btn btn-sm float-left btn-outline-primary"
          >
            Agregar
          </button>
        </div>

        <div
          class="col-md-10"
          style="margin-top:45px; margin-left:0px; padding-left:0px;"
        >
          <div
            class="nav flex-column nav-pills"
            role="tablist"
            aria-orientation="vertical"
          >
            <a
              style="margin-top:10px;"
              v-for="(item, i) in field.value"
              class="nav-link active"
              data-toggle="pill"
              role="tab"
              aria-controls="v-pills-home"
              aria-selected="true"
              >{{ item[0].value }}

              <i
                @click="deleteItemList(field.value, i)"
                class="fa fa-window-close float-right"
              ></i>
            </a>
          </div>
        </div>
      </div>

      <div
        v-if="!loading && field.type == 'percent' && field.position == position"
        class="form-group"
      >
        <label>{{ getName(field) }}</label>

        <percent-input
          :decimal-places="2"
          :integer-places="3"
          class="form-control"
          v-model="field.value"
        ></percent-input>
      </div>

      <div
        v-if="field.type == 'password' && field.position == position"
        class="form-group"
      >
        <label>{{ getName(field) }}</label>
        <input
          v-model="field.value"
          :placeholder="'ingrese contraseña'"
          type="password"
          class="form-control"
        />
      </div>

      <div
        v-if="field.type == 'files' && field.position == position"
        class="form-group"
      >
        <label>{{ getName(field) }}</label>
        <el-upload
          class="upload-demo"
          drag
          action=""
          :file-list="field.list"
          :ref="field.name"
          :on-preview="downloadFile"
          :on-change="
            ($file) => {
              changeUploads($file, field);
            }
          "
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            Suelta tu archivo aquí o <em>haz clic para cargar</em>
          </div>
        </el-upload>
      </div>

      <div
        v-if="field.type == 'file' && field.position == position"
        class="form-group"
      >
        <label>{{ getName(field) }}</label>

        <el-upload
          action=""
          :file-list="field.list"
          :ref="field.name"
          :on-preview="downloadFile"
          :on-change="
            ($file) => {
              changeUpload($file, field);
            }
          "
        >
          <el-button slot="trigger" type="primary"
            >Selecciona un archivo</el-button
          >
        </el-upload>
      </div>


      <div
        v-if="field.type == 'qr' && field.position == position && field.visible"
        class="form-group"
      >
        <label>{{ getName(field) }}</label
        ><br />
        <qrcode
          v-if="field.value"
          :value="field.value"
          :options="{ width: 200 }"
        ></qrcode>
      </div>


      <div
        v-if="field.type == 'days' && field.position == position"
        class="form-group"
      >
        <label for="">Días de la semana</label>

        <div class="row">
          <div class="col">
            <el-checkbox
              label="Lunes"
              v-model="field.value.lunes"
            ></el-checkbox>

            <el-checkbox
              label="Martes"
              v-model="field.value.martes"
            ></el-checkbox>

            <el-checkbox
              label="Miercoles"
              v-model="field.value.miercoles"
            ></el-checkbox>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <el-checkbox
              label="Jueves"
              v-model="field.value.jueves"
            ></el-checkbox>

            <el-checkbox
              label="Viernes"
              v-model="field.value.viernes"
            ></el-checkbox>

            <el-checkbox
              label="Sabado"
              v-model="field.value.sabados"
            ></el-checkbox>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <el-checkbox
              label="Domingo"
              v-model="field.value.domingos"
            ></el-checkbox>
          </div>
        </div>
      </div>

      <div
        v-if="field.type == 'buttonSave' && field.position == position"
        class="form-group"
      >
        <div>
          <button
            style="border: 1px solid black;margin-bottom:120px;"
            @click="save"
            class="btn  float-right btn-sm"
          >
            <i :class="field.icon"></i>

            {{ field.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  save,
  getById,
  update,
  getData,
  savePriceList,
  getPricesList,
  updatePriceList,
} from "@/api/api";
import _ from "lodash";
import Vue from "vue";
import { Money } from "v-money";
import searchAutocomplete from "@/components/search-autocomplete";
import VueQrcode from "@chenfengyuan/vue-qrcode";
Vue.component(VueQrcode.name, VueQrcode);
export default {
  props: ["form", "entity", "position"],
  components: {
    searchAutocomplete,
    money: Money,
  },
  async mounted() {
    if (this.$route.params.id) {
      await this.getData();
    } else {
      this.loading = false;
    }

    // this.preparePriceAssign();
  },
  data() {
    return {
      priceList: [],
      loading: true,
      options: [],
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "$ ",
        suffix: "",
        precision: 0,
        masked: false,
      },

      dialogMode: "create",
      dialogBanksVisible: false,
    };
  },
  methods: {
    checkIfVisible(form, field) {
      // buscamos el campo de tipo check
      var checkboxSelected = _.find(form, {
        type: "checkbox",
      });
      if (checkboxSelected) {
        if (checkboxSelected.enabled) {
          if (checkboxSelected.enabled.includes(field.name)) {
            if (checkboxSelected.value) {
              field.visible = true;
              return true;
            }
          } else {
            return true;
          }
        }
      } else {
        field.visible = true;
        return true;
      }
    },
    downloadFile(file) {
      const filename = file.name,
        dataUrl = file.url;

      // Construct the 'a' element
      var link = document.createElement("a");
      link.download = filename;
      link.target = "_blank";

      // Construct the URI
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();

      // Cleanup the DOM
      document.body.removeChild(link);
      // delete link;
    },

    formatFileList(field) {
      if (field.value !== "") {
        if (_.isObject(field.value) && field.value.name) {
          return [
            {
              name: field.value.name,
              url: field.value.url,
            },
          ];
        }
      }
    },
    formatFileListMultiple(file) {
      file.uid = file.hash;
      return file;
    },

    async getData() {
      this.loading = true;

      var response = await getById(this.entity, this.$route.params.id);
      this.loading = false;
      if (response.status == 200) {
        this.form.forEach((field) => {
          // asignamos los valores de la respuesta a los campos
          // definidos en el formulario
          // debe de coincidir. ;)
          Object.keys(response.data).forEach((v, k) => {
            if (v == field.name) {
              field.value = response.data[v];
            }

            if (field.type == "days" && !field.value) {
              field.value = {
                lunes: false,
                martes: false,
                miercoles: false,
                jueves: false,
                viernes: false,
                sabado: false,
                domingo: false,
              };
            }

            if (field.type == "days" && field.value) {
              field.value = response.data[v]
            }

            if (field.type == "money" && !field.value) {
              field.value = 0
            }


            if (field.type == "file") {
              var list = this.formatFileList(field);
              if (list && list.length > 0) {
                field.list = list;
              }
            }

            if (field.type == "files") {
              field.list = [];
              if (field.value) {
                field.value.forEach((file) => {
                  let element = this.formatFileListMultiple(file);
                  field.list.push(element);
                });
              }
            }
          });
        });
      }
    },
    deleteItemList(value, index) {
      value.splice(index, 1);
    },

    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },

    openModal(field) {
      field.fields.forEach((f) => {
        f.value = "";
      });
      field.dialogVisible = true;
    },

    addToList(field) {
      // validamos la data
      field.modalErrors = [];

      if (field.value == "" || _.isNil(field.value)) {
        field.value = [];
      }

      field.fields.forEach((f) => {
        if (f.value == "" && f.required) {
          field.modalErrors.push("El campo " + f.label + " es requerido");
        }

        if (f.name == "email") {
          let validEmail = this.validateEmail(f.value);
          if (!validEmail && field.required) {
            field.modalErrors.push(
              "El campo " + f.label + " debe de ser valido."
            );
          }
        }
      });

      if (field.modalErrors.length > 0) {
        field.modalErrors = field.modalErrors;
        this.$forceUpdate();
        return;
      }

      if (this.dialogMode == "create") {
        field.value.push(_.cloneDeep(field.fields));
      }
      field.dialogVisible = false;
    },
    changeUpload(file, field) {
      field.value = file;
    },
    changeUploads(file, field) {
      if (typeof field.value !== "object") {
        field.value = [];
      }

      field.value.push(file);
    },
    getName(field) {
      if (field.type == "password") return "Contraseña ";
      else return _.startCase(field.label);
    },
    validate() {
      var errors = [];
      this.form.forEach((item) => {
        if (item.required && (item.value == "" || _.isNil(item.value))) {
          errors.push('"' + item.label + '" es requerido.');
        }
      });
      return errors;
    },

    async save() {
      var data = {};
      this.errors = [];

      this.errors = this.validate();

      if (this.errors.length < 1) {
        if (this.$route.params.id) {
          let response = await update(
            this.entity,
            this.form,
            this.$route.params.id
          );
        } else {
          let response = await save(this.entity, this.form);
        }

        this.$Notice({
          type: "success",
          title: "Acción completada",
          content: `La acción se realizó correctamente.`,
        });

        if (this.entity == "productos" || this.entity == "clientes") {
          this.$router.push({
            path: "/" + this.entity,
          });
        } else {
          this.$router.push({
            path: "/maestros/" + this.entity,
          });
          return;
        }
      } else {
        this.$emit("onErrors", this.errors);
      }
    },
  },
};
</script>

<style lang="css">
input[type="text"],
input[type="password"],
input[type="search"],
input[type="number"],
input[type="tel"],
input[type="url"],
input.h-input {
  height: 40px;
}

.h-notice-container {
  position: fixed;
  top: 50px;
  z-index: 9999999;
}

input[type="text"] {
  background: white;
}

input[type="password"] {
  background: white;
}

</style>
