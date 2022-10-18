<template>
  <div class="shopOrder-stock">
    <p>ID: {{ shopId }}</p>
    <Pagination :total="total" :page="page" @handleEmit="handlePage($event)" />
    <table class="table mt-2 mb-3">
      <thead>
        <tr>
          <th>ລາຍການ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item of stocks" :key="item.id">
          <td>
            {{ item.name }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import store from "@/store";
import Pagination from "@/components/pagination.vue";
export default {
  props: ["shopId"],

  data() {
    return {
      page: 1,
    };
  },

  components: {
    Pagination,
  },

  created() {
    this.loadShopStock(this.shopId);
  },
  methods: {
    loadShopStock(val) {
      if (this.$route.query.page) {
        this.page = parseInt(this.$route.query.page);
      } else {
        this.page = 1;
      }
      store.dispatch("shop/getStocks", {
        page: this.page,
        id: val,
      });
    },

    handlePage(index) {
      this.page = index;
      this.$router.push({
        query: {
          page: this.page,
        },
      });
      this.loadShopStock(this.shopId);
    },
  },

  computed: {
    stocks() {
      return store.getters["shop/stockItems"];
    },
    total() {
      return store.getters["shop/stockTotal"];
    },
  },
  watch: {
    shopId(newVal) {
      this.loadShopStock(newVal);
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
}
</style>
