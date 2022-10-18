<template>
  <header>
    <nav>
      <div class="logo">
        <a href="/">
          <img src="@/assets/images/ipos-dashboard.png" alt="ipos" />
        </a>
      </div>

      <ul>
        <li v-if="isAuth">
          <router-link to="/about">ປະເພດ</router-link>
        </li>
        <li v-if="isAuth">
          <router-link to="/product">ວັດຖຸດິບ</router-link>
        </li>
        <li v-if="isAuth">
          <router-link to="/order">ສັ່ງຊື້</router-link>
        </li>
        <li v-if="isAuth">
          <router-link to="/menu">ເມນູ</router-link>
        </li>
        <li v-if="isAuth">
          <router-link to="/unit">ຫົວໜ່ວຍ</router-link>
        </li>
        <li v-if="isAuth">
          <router-link to="/office">ສ່ວນຕົວ</router-link>
        </li>
        <li v-if="isAuth">
          <router-link to="/core">ແອັດມິນ</router-link>
        </li>
        <li v-if="!isAuth">
          <router-link to="/login">ເຂົ້າລະບົບ</router-link>
        </li>
        <li v-if="isAuth" @click="logout()" class="btn">ອອກ</li>
      </ul>
    </nav>
  </header>
</template>

<script>
import store from "../store";
export default {
  computed: {
    isAuth() {
      return store.getters["auth/isAuthenticated"];
    },
  },

  methods: {
    logout() {
      store.dispatch("auth/logout");
    },
  },
};
</script>

<style>
@import "@/assets/css/header.css";
</style>
