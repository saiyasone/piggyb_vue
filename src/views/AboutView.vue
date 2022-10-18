<template>
  <div class="about">
    <h1>This is an about page</h1>

    <ValidationObserver v-slot="{ handleSubmit }">
      <form>
        <ValidationProvider name="name" rules="isRequired">
          <div class="form-group mb-2" slot-scope="{ errors }">
            <label for="name">
              <span class="has-text-danger">*</span> ລາຍການ</label
            >
            <b-field :message="errors[0]" :type="{ 'is-danger': errors[0] }">
              <b-input
                type="text"
                placeholder="ລາຍການ"
                v-model="name"
              ></b-input>
            </b-field>
          </div>
        </ValidationProvider>
        <b-button @click="handleSubmit(save)" type="button" class="is-info">
          <b-icon pack="fas" icon="users" size="is-medium" type="is-success"></b-icon>
          {{ isCreate ? "ແກ້ໄຂ" : "ເພີ່ມ" }}
        </b-button>
      </form>
    </ValidationObserver>

    <div class="mt-3" v-if="categories">
      <table>
        <thead>
          <tr>
            <th>ລະຫັດ</th>
            <th>ລາຍການ</th>
            <th>ຈັດການ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item of categories" :key="item.id">
            <td>
              {{ item.id }}
            </td>
            <td>
              {{ item.name }}
            </td>
            <td>
              <b-button class="is-success" @click="filterData(item)">
                Edit
              </b-button>
              <b-button class="ml-2 is-danger" @click="deleteOne(item.id)">
                Delete
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import store from "../store";

export default {
  data() {
    return {
      id: "",
      name: "",
      isCreate: false,
    };
  },
  created() {
    this.loadAPI();
  },

  methods: {
    loadAPI() {
      store.dispatch("category/getAllCategories");
    },

    save() {
      if (this.isCreate) {
        store.dispatch("category/updateCategory", {
          id: this.id,
          name: this.name,
        });
      } else {
        store.dispatch("category/createCategory", this.name);
      }
      this.clearForm();
    },

    filterData(item) {
      this.id = item.id;
      this.name = item.name;
      this.isCreate = true;
    },

    deleteOne(id) {
      store.dispatch("category/deleteCategory", id);
    },

    clearForm() {
      this.id = "";
      this.name = "";
      this.isCreate = false;
    },
  },

  computed: {
    categories() {
      return store.getters["category/categories"];
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
}
table th {
  padding: 5px 8px;
  border-collapse: collapse;
  border: 1px solid #ddd;
}
table td {
  padding: 5px 8px;
  border-collapse: collapse;
  border: 1px solid #ddd;
  vertical-align: middle;
}
</style>
