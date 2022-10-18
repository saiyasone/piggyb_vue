<template>
  <div>
    <h2>Products</h2>

    <section v-if="products" class="mt-2 mb-2">
      <ul>
        <li v-for="item of products" :key="item.id">
          {{ item.name }} - ( {{ item.Category.name }} )
        </li>
      </ul>
    </section>

    <section class="pagination">
      <Pagination
        :total="totalItems"
        :page="page"
        @handleEmit="handlePage($event)"
      />
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Pagination from "@/components/pagination.vue";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      page: 1,
    };
  },
  created() {
    this.initializeForm();
  },
  methods: {
    ...mapActions({
      getProducts: "product/getProducts",
    }),
    initializeForm() {
      if (this.$route.query.page) {
        this.page = parseInt(this.$route.query.page);
      } else {
        this.page = 1;
      }
      this.loadProducts();
    },

    loadProducts() {
      this.getProducts(this.page);
    },
    loadAllProducts() {},

    handlePage(index) {
      this.page = index;
      this.$router.push({
        query: {
          page: this.page,
        },
      });
      this.loadProducts();
    },
  },

  computed: {
    products() {
      return this.$store.getters["product/productItems"];
    },

    totalItems() {
      return this.$store.getters["product/totalItems"];
    },
  },

  watch: {
    page() {
      return this.page;
    },
  },
};
</script>
