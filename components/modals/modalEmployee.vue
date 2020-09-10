<template>
    <b-modal id="details" hide-footer>
        <form>
            <div class="form-group">
                <label>Name</label>
                <input :disabled="showOne" v-model="employee.name" @input="changeInput" class="form-control" name="name" placeholder="Enter name">
            </div>

            <div class="form-group">
                <label>Identification</label>
                <input :disabled="showOne" v-model="employee.indentification" class="form-control" name="identification" placeholder="Enter indentification">
            </div>

            <div class="form-group">
                <label>Email address</label>
                <input :disabled="showOne" v-model="employee.email" type="email" class="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email">
            </div>

            <div class="form-group">
                <label>Phone</label>
                <input :disabled="showOne" v-model="employee.phone" class="form-control" name="phone"  placeholder="Enter phone">
            </div>
            <b-button :hidden="showOne" block variant="outline-primary" @click="submit()">Submit</b-button>
        </form>
    </b-modal>
</template>

<script>
export default {
    props : [ 'employee', 'showOne' ],
    methods: {
        changeInput (event) {
            if (this.employee) {
                this.$emit('changeModel', this.employee)
            }
        },
        submit () {
            this.$emit('submit', this.employee)
            this.$root.$emit("bv::hide::modal", "details")
        }
    }
}
</script>
