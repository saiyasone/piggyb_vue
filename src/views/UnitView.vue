<template>
  <div class="units">
    <h2 class="mb-3">ຫົວໜ່ວຍ</h2>
    <div class="mb-2" v-if="units">
      <ul>
        <li v-for="unit of units" :key="unit.id">
          {{ unit.name }}
        </li>
      </ul>
    </div>

    <Pagination :total="total" :page="page" @handleEmit="handlePage($event)" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Pagination from "@/components/pagination.vue";
export default {
  data() {
    return {
      page: 1,
    };
  },
  components: {
    Pagination,
  },
  created() {
    this.initializeForm();
  },

  computed: {
    ...mapGetters({
      items: "unit/items",
      total: "unit/totalItems",
    }),

    units() {
      return this.items;
    },
  },

  methods: {
    ...mapActions({
      getUnits: "unit/getUnits",
    }),

    initializeForm() {
      let param = this.$route.query.page;
      if (param) {
        this.page = +param;
      } else {
        this.page = 1;
      }
      this.getUnits(this.page);
    },

    handlePage(index) {
      this.page = index;
      this.$router.push({
        query: {
          page: this.page,
        },
      });
      this.getUnits(this.page);
    },
  },
};
</script>
