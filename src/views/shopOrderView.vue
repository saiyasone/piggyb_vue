<template>
  <div class="shop-orders">
    <h1>ຮ້ານຄ້າ</h1>
    <div class="columns">
      <div class="column is-one-third">
        <div v-if="shops">
          <div v-for="shop of shops" :key="shop.id" class="boxes card">
            <div class="card-content">
              <router-link :to="{ path: '/order/' + shop.id }">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img
                        src="https://bulma.io/images/placeholders/96x96.png"
                        alt="Placeholder image"
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">{{ shop.name }}</p>
                    <p class="subtitle is-6">@{{ shop.address }}</p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      page: 1,
    };
  },

  computed: {
    shops() {
      return store.getters["shop/items"];
    },
  },

  created() {
    this.loadShops();
  },

  methods: {
    loadShops() {
      store.dispatch("shop/getShops", this.page);
    },
  },
};
</script>

<style scoped>
.boxes {
  cursor: pointer;
  margin-bottom: 0.75rem;
}
.boxes:hover {
  background: #ddd;
}
</style>
