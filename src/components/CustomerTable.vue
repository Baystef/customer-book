<template>
  <div id="customer-table" class="container-fluid">
    <h3 class="table-title">Customers</h3>
    <p v-if="customers.length < 1" class="alert alert-dark">We Have no customers yet</p>
    <table class="table table-bordered table-responsive">
      <thead>
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>Email Address</th>
          <th>Phone Number</th>
          <th>House Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.id }}</td>

          <td v-if="editing === customer.id">
            <input type="text" v-model="customer.name" />
          </td>
          <td v-else>{{ customer.name }}</td>

          <td v-if="editing === customer.id">
            <input type="text" v-model="customer.email" />
          </td>
          <td v-else>{{ customer.email }}</td>

          <td v-if="editing === customer.id">
            <input type="text" v-model="customer.phone" />
          </td>
          <td v-else>{{ customer.phone }}</td>

          <td v-if="editing === customer.id">
            <input type="text" v-model="customer.address.street" />
          </td>
          <td v-else>{{ customer.address.street }}</td>
          <td v-if="editing === customer.id">
            <button @click="editCustomer(customer)" class="btn btn-success">Save</button>
            <button @click="cancelEdit(customer)" class="btn btn-outline-warning">Cancel</button>
          </td>
          <td v-else class="actions">
            <button @click="editMode(customer)" class="btn btn-primary">Edit</button>
            <button @click="$emit('delete:customer', customer.id)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "customer-table",
  props: {
    customers: Array
  },
  data() {
    return {
      editing: null
    };
  },
  methods: {
    editMode(customer) {
      this.cachedCustomer = { ...customer };
      this.editing = customer.id;
    },

    editCustomer(customer) {
      if (
        customer.name === "" ||
        customer.email === "" ||
        customer.phone === "" ||
        customer.address.street === ""
      )
        return;
      this.$emit("edit:customer", customer.id, customer);
      this.editing = null;
    },

    cancelEdit(customer) {
      Object.assign(customer, this.cachedCustomer)
      this.editing = null;
    }
  }
};
</script>

<style scoped>
.table-title {
  text-align: left;
  padding: 0 0 0px 8px;
  margin-bottom: 0.8rem;
  border-left: 5px solid rgb(110, 216, 198);
}

.actions {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  margin: 0 0.5rem 0 0;
}

thead th {
  font-size: 0.8rem;
}

tbody td {
  font-size: 0.8rem;
}

tbody button {
  font-size: 0.6rem;
}
</style>