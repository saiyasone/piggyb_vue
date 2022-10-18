<template>
<b-pagination :total="total" v-model="propPage" :range-before="3" :range-after="1" :per-page="10" class="is-info" @change="handlePage($event)"></b-pagination>
</template>

<script>
export default {
  emits: ["handleEmit"],
  props: {
    page: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
  data() {
    return {}
  },

  methods: {
    handlePage(value) {
      this.$emit("handleEmit", value);
    },
  },
  computed: {
    propPage: {
      get() {
        return this.page;
      },
      set(value) {
        this.$emit("handleEmit:page", value);
      },
    },
  },
};
</script>

<style scoped>
.pagination-link.is-current {
  background: var(--bg-color);
}
</style>
