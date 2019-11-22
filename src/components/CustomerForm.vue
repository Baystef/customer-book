<template>
  <div id="customer-form" class="container-fluid">
    <h3 class="form-title">Add Customer</h3>

    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="name">Full Name</label>
        <input
          ref="first"
          v-model="customer.name"
          type="text"
          :class="{ 'has-error': submitting && invalidName }"
          class="form-control"
          id="name"
          placeholder="Enter Full Name"
          @focus="clearStatus"
          @keypress="clearStatus"
        />
      </div>
      <div class="form-group">
        <label for="email">Email Address</label>
        <input
          v-model="customer.email"
          type="text"
          :class="{ 'has-error': submitting && invalidEmail }"
          class="form-control"
          id="email"
          placeholder="Enter Email"
          @focus="clearStatus"
        />
      </div>
      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input
          v-model="customer.phone"
          type="text"
          :class="{ 'has-error': submitting && invalidPhone }"
          class="form-control"
          id="phone"
          placeholder="Enter Phone Number"
          @focus="clearStatus"
        />
      </div>
      <div class="form-group">
        <label for="address">House Address</label>
        <input
          v-model="customer.address.street"
          type="text"
          :class="{ 'has-error': submitting && invalidAddress }"
          class="form-control"
          id="address"
          placeholder="Enter Address"
          @focus="clearStatus"
        />
      </div>
      <p v-if="error && submitting" class="alert alert-danger">Please all required fields must be filled</p>
      <p v-if="success" class="alert alert-success">Customer Added Successfully</p>
      <button class="btn btn-secondary">Add New Customer</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "customer-form",
  data() {
    return {
      error: false,
      submitting: false,
      success: false,
      customer: {
        name: "",
        email: "",
        phone: "",
        address: {
          street: ""
        }
      }
    };
  },
  computed: {
    invalidName() {
      return this.customer.name === "";
    },

    invalidEmail() {
      return this.customer.email === "";
    },

    invalidPhone() {
      return this.customer.phone === "";
    },

    invalidAddress() {
      return this.customer.address.street === "";
    }
  },
  methods: {
    /**
     * @method onSubmit Emits an event that triggers the addCustomer method
     */
    onSubmit() {
      this.clearStatus();
      this.submitting = true;

      if (
        this.invalidName ||
        this.invalidEmail ||
        this.invalidPhone ||
        this.invalidAddress
      ) {
        this.error = true;
        return;
      }

      this.$emit("add:customer", this.customer);
      this.$refs.first.focus();
      this.customer = {
        name: "",
        email: "",
        phone: "",
        address: {
          street: ""
        }
      };
      this.clearStatus();
      this.submitting = false;
    },

    clearStatus() {
      this.success = false;
      this.error = false;
    }
  }
};
</script>

<style scoped>
form {
  margin-bottom: 3rem;
}

.form-title {
  text-align: left;
  padding: 0 0 0px 8px;
  margin-bottom: 0.8rem;
  border-left: 5px solid rgb(110, 216, 198);
}

input::placeholder {
  color: rgb(233, 233, 233)
}
</style>