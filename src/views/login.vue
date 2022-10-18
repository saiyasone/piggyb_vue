<template>
  <div class="login">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form>
        <ValidationProvider rules="isRequired|isEmail">
          <div class="form-group mb-2" slot-scope="{ errors }">
            <label for="">Email</label>
            <b-field :message="errors[0]" :type="{ 'is-danger': errors[0]}">
              <b-input
                v-model="form.email"
                type="email"
                placeholder="example@gmail.com"
              ></b-input>
            </b-field>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="isRequired|min:6">
          <div slot-scope="{ errors }" class="form-group">
            <label for="password"> Password</label>
            <b-field :message="errors[0]" :type="{ 'is-danger': errors[0] }">
              <b-input
                v-model="form.password"
                type="password"
                placeholder="password"
              ></b-input>
            </b-field>
          </div>
        </ValidationProvider>

        <div class="mt-4">
          <b-button
            @click="handleSubmit(login)"
            class="is-success"
            type="submit"
            >login</b-button
          >
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  computed: {
    isAuth() {
      return store.getters["auth/isAuthenticated"];
    },
  },
  methods: {
    login: function () {
      store.dispatch("auth/login", this.form);
    },
  },

  created() {
    if (this.isAuth) {
      return this.$router.push({
        name: "core",
      });
    }
  },
};
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
}
</style>
