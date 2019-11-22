<template>
  <div id="app" class="app-container">
    <h1 class="app-title">Customer Book</h1>

    <customer-form @add:customer="addCustomer" />
    <customer-table
      :customers="customers"
      @delete:customer="deleteCustomer"
      @edit:customer="editCustomer"
    />
  </div>
</template>

<script>
import CustomerTable from "@/components/CustomerTable.vue";
import CustomerForm from "@/components/CustomerForm.vue";
import api from "./api";

export default {
  name: "app",
  components: {
    CustomerTable,
    CustomerForm
  },
  data() {
    return {
      customers: []
    };
  },

  mounted() {
    this.getCustomers();
  },

  methods: {
    /**
     * @method getCustomers  Gets all customers
     */
    async getCustomers() {
      try {
        const { data } = await api.get("users");
        this.customers = data;
      } catch (error) {
        return error;
      }
    },
    
    /**
     * @method addCustomer Adds a new customer to the database
     */
    async addCustomer(customer) {
      try {
        const { data } = await api.post("users", customer);
        this.customers = [...this.customers, data];
      } catch (error) {
        return error;
      }
    },

    /**
     * @method editCustomer Edits the data of an existing customer
     */
    async editCustomer(id, updatedCustomer) {
      try {
        const { data } = await api.patch(`users/${id}`, updatedCustomer);
        this.customers = this.customers.map(customer =>
          customer.id === id ? data : customer
        );
      } catch (error) {
        return error;
      }
    }, 

    /**
     * @method deleteCustomer Deletes a customer from the database
     */
    async deleteCustomer(id) {
      try {
        await api.delete(`users/${id}`)
        this.customers = this.customers.filter(customer => customer.id !== id);
      } catch (error) {
        return error;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  margin-top: 60px;
}

.app-container {
  max-width: 45rem;
  margin: 0 auto;
}

.app-title {
  text-align: center;
  margin-bottom: 2rem;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
</style>
