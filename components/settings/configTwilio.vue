<template>
    <b-container>
        <b-card>
            <style>
                :root {
                    --buttonBgColor: {{ texts.buttonsText.backgroundColor }};
                    --buttonHvColor: {{ texts.buttonsText.hoverColor }};
                }
            </style>
            <div class="fields user-data-container">
                <div class="form-group">
                    <h3>Twilio Config</h3>
                    <el-input type="text"
                        name="account"
                        v-model="current.senderdata.account"
                        @input="change"
                        placeholder="ACCOUNT"
                        @keyup.enter.native="save"
                    />
                </div>
                <div class="form-group">
                    <el-input 
                        type="text"
                        name="number"
                        v-model="current.senderdata.number"
                        @input="change"
                        placeholder="NUMBER"
                    />
                </div>
                <div class="form-group">
                    <el-input type="text"
                        name="sid"
                        v-model="current.senderdata.sid"
                        @input="change"
                        placeholder="ACCOUNT SID"
                    />
                </div>

                <div class="form-group">
                    <el-input type="text"
                        name="token"
                        v-model="current.senderdata.token"
                        @input="change"
                        placeholder="ACCOUNT TOKEN"
                    />
                </div>



            </div>

            <template v-slot:footer>
                <!-- save -->
                <b-button class="button-setting" v-if="!isFormUpdate" :disabled="!isEdit" :hidden="loading" @click="save">
                    Save
                </b-button>
                <!-- ------------------ -->
                <!-- update -->
                <b-button class="button-setting" v-if="isFormUpdate" :disabled="!isEdit" :hidden="loading" @click="updateData">
                    Update
                </b-button>
                <!-- ------------------ -->

                <b-button class="button-setting" variant="secondary" :hidden="!loading" disabled>
                    <b-spinner small></b-spinner>
                    <span class="sr-only">Loading...</span>
                </b-button>
            </template>
        </b-card>

        <div class="container whatsappData" style="margin-top:30px;">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th style="text-align:center;" scope="col">Actions</th>
                        <th style="text-align:center;" scope="col">Name</th>
                        <th style="text-align:center;" scope="col">Api token</th>
                        <th style="text-align:center;" scope="col">Instance</th>
                    </tr>
                </thead>
                <draggable v-model="allData" tag="tbody" @update="moved">
                    <tr v-for="user in allData" :key="user.id">
                        <td>
                            <button class="btn-danger btn btn-sm" @click="edit(user)" type="danger" size="small"><i class="el-icon-edit"></i></button>
                            <el-popconfirm
                            @onConfirm="deleteData(user)"
                            confirmButtonText='OK'
                            cancelButtonText='No, Thanks'
                            icon="el-icon-info"
                            iconColor="red"
                            title="Are you sure to delete this?"
                            >
                                <el-button slot="reference" class="btn-danger btn btn-sm"  type="danger" size="small"><i class="el-icon-delete"></i></el-button>
                            </el-popconfirm>
                        </td>
                        <td>{{ user.account }}</td>
                        <td>{{ user.sid }}</td>
                        <td>{{ user.number }}</td>
                    </tr>
                </draggable>
            </table>
            <div style="text-align:center;">
                <el-pagination
                    v-if="allData.length > 0"
                    layout="prev, pager, next"
                    :page-size="pagination.pageSize"
                    :page-count="pagination.count"
                    :current-page="pagination.currentPage"
                    :total="allData.length"
                    @current-change="updatePagination"
                    @prev-click="updatePagination"
                    @next-click="updatePagination"
                >
                </el-pagination>
            </div>
        </div>
    </b-container>
</template>

<script>
import { 
    uploadWhatsappData, 
    saveTwilioData,
    deleteTwilioData,
    updateTwilioData,
    getAllTwilio,
    countTwilioNumbers
} from "../../utils/actions"

import { registry, errors, msgCode } from '../../utils/textConfig'
import { Loading } from "element-ui"
import _ from 'lodash'
import draggable from 'vuedraggable'

export default {
    components: {
        draggable
    },
    data () {
        return {
            isEdit: false,
            loading: false,
            texts: registry,
            current: {
                senderdata: {
                    id: null,
                    apitoken: '',
                    instance: '',
                    name: ''
                }
            },
            allData: [],
            pagination: {
                count: 2,
                pageSize: 10,
                currentPage: 1
            },
            isFormUpdate: false
        };
    },
    methods: {
        change () {
            this.isEdit = true;
        },
        async moved (data) {
           this.allData.forEach(async (register, item) => {
                register.order = item
                await updateTwilioData(register.id, register)
            });
            await this.setAllData();
        },
        edit (user) {
            this.current.senderdata = user;
            this.isFormUpdate = true;
        },
        updateData () {
            let data = this.current.senderdata;
            updateTwilioData(data.id, data)
            .then(response => {
                this.isFormUpdate = false;
                this.$notify({
                    title: 'Congratulations',
                    message: 'The data was saved correctly.',
                    type: 'success'
                });

                this.current.senderdata = {
                    id: null,
                    apitoken: '',
                    instance: '',
                    name: ''
                };
            })
            .catch(error => {
                this.$notify.error({
                    title: 'Error',
                    message: "The data wasn't saved correctly."
                });
                console.log('Error: ', error.message);
            });
        },
        deleteData (data) {
            deleteTwilioData(data)
            .then(this.setAllData)
            .then(() => {
                this.$notify({
                    title: 'Congratulations',
                    message: 'The data was deleted correctly.',
                    type: 'success'
                });
            })
            .catch(error => {
                 console.log('Error: ', error.message);
            });
        },
        init () {
            this.setAllData()
            .then(response => {
                return countTwilioNumbers(this.$auth.user.id)
            })
            .then(response => {
                let dataLength = response.data.length;

                let pageCount = Math.ceil(dataLength /this.pagination.pageSize);

                this.pagination.pageCount = pageCount;
            })
            .catch(error => {
                console.log('Error: ', error.message);
            });
        },
        setAllData () {
            return getAllTwilio(this.$auth.user.id, this.pagination)
            .then(response => {


                console.log("response.data", response.data)

                this.allData = response.data.sort((a, b) => {
                    if (a.order > b.order) {
                        return 1;
                    }

                    if (a.order < b.order) {
                        return -1;
                    }

                    if (a.order === b.order) {
                        return 0;
                    }
                });
            })
            .catch(error => {
                console.log('Error: ', error.message);
            });
        },
        save () {
            let data = this.current.senderdata;
            data.user = this.$auth.user.id
            saveTwilioData(this.$auth.user.id, data)
            .then(response => {
                this.$notify({
                    title: 'Congratulations',
                    message: "the configuration was saved.",
                    type: "success"
                });

                this.current.senderdata = {
                    id: null,
                    apitoken: '',
                    instance: '',
                    name: ''
                };

                this.setAllData();
            })
            .catch(error => {
                this.$notify.error({
                    title: 'Error',
                    message: "the configuration wasn't saved. try again later."
                })
                console.log('Error', error.message);
            })
        },
        updatePagination (e) {
            this.pagination.currentPage = e;
            this.setAllData();
        }
    },
    mounted() {
        this.init();
    }
}
</script>

<style>
    .whatsappData table thead tr th{
        text-align: center;
    }

    .whatsappData table tbody tr td {
        text-align: center;
    }
</style>