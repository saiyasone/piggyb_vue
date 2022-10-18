<template>
<div class="Menu">
  <h1 class="mb-4">ລາຍການເມນູ</h1>
  <div v-if="menus">
    <div class="columns">
      <div class="column is-two-thirds">
        <div v-if="loading" class="is-centered">
          <p>ກຳລັງໂຫຼດເນື້ອຫາ ...</p>
        </div>

        <div v-else class="grid">
          <div v-for="menu of menus" :key="menu.id" class="item">
            <div class="inner">
              <div class="photo">
                <div v-for="item of cart" :key="item.id">
                  <div v-if="menu.id === item.id">
                    <span class="mr-2">
                      {{ item.amount | number }}
                    </span>
                    <b-button @click="removeItem(item.id)" class="is-danger btn-delete">x</b-button>
                  </div>
                </div>
                <img @click="addCart(menu)" :src="imgPath + '/menus/' + menu.photo" :alt="menu.name" />
              </div>
              <div @click="addCart(menu)" class="content">
                <p>
                  {{ menu.name }}
                </p>
                <p>
                  {{ menu.price | number }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="column">
        <h2>Total: {{ total }}</h2>
        <div v-if="cart">
          <div v-if="cart.length">
            <ul>
              <li class="is-flex is-align-items-center mb-2" v-for="item of cart" :key="item.id">
                {{ item.name }} - {{ item.price | number }} x{{ item.amount }}
                =
                {{ item.total | number }}
                <b-button @click="removeItem(item.id)" class="ml-2 is-danger">x</b-button>
              </li>
            </ul>
            <div class="is-centered">
              <b-button class="is-danger" @click="destroyCart()">ລ້າງອອກ</b-button>
            </div>
          </div>
          <div v-else>
            <p>Not found</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  basePhoto
} from "@/helpers/environment";
import {
  mapActions
} from "vuex";
import store from "@/store";

export default {
  data() {
    return {
      imgPath: "",
    };
  },
  computed: {
    menus() {
      return this.$store.getters["menu/menus"];
    },

    cart() {
      return this.$store.getters["cart/cart"];
    },

    total() {
      return this.$store.getters["cart/total"];
    },
    loading() {
      return this.$store.getters["loading"];
    },
  },

  created() {
    this.initializeForm();
  },
  destroyed() {
    this.destroyCart();
  },
  methods: {
    ...mapActions({
      deleteItem: "cart/deleteItem",
      refreshToken: "auth/refreshToken",
      destroyCart: "cart/emptyCart",
    }),

    initializeForm() {
      this.imgPath = basePhoto;
      this.$store.dispatch("menu/getMenuAll");
    },

    addCart(menu) {
      const data = {
        id: menu.id,
        name: menu.name,
        amount: 1,
        price: menu.price,
        total: menu.price * 1,
      };
      store.dispatch("cart/addToCart", data);
    },

    removeItem(id) {
      this.deleteItem(id);
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
}

.grid .item {
  cursor: pointer;
  padding: 0.75rem 1rem;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 12%);
  border-radius: 5px;
}

.item img {
  width: 100%;
  height: 200px;
  object-fit: contain;
}

.item .photo {
  position: relative;
}

.item .btn-delete {
  position: absolute;
  top: 10px;
  right: 12px;
}
</style>
