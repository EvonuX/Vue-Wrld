<template>
  <div class="navbar">
    <nav class="deep-purple dark">
      <div class="container">
        <router-link to="/" class="brand-logo left">Wrld</router-link>
        <ul class="right">
          <li v-if="!user">
            <router-link to="/signup">Sign Up</router-link>
          </li>
          <li v-if="!user">
            <router-link to="/login">Log In</router-link>
          </li>
          <li v-if="user">
            <span>Logged in as {{ user.email }}</span>
          </li>
          <li v-if="user">
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {
      user: null
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "login" });
        });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(cred => {
      if (cred) {
        this.user = cred;
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<style>
.navbar ul span {
  font-weight: bold;
}
</style>
