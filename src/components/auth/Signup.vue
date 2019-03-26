<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center deep-purple-text">Sign Up</h2>
      <div class="field">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" v-model="password">
      </div>
      <div class="field">
        <label for="username">Username</label>
        <input type="text" name="username" id="username" v-model="username">
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "../../firebase/firebase.js";
import firebase from "firebase";
export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      username: null,
      feedback: null,
      slug: null
    };
  },
  methods: {
    signup() {
      if (this.username && this.email && this.password) {
        this.slug = slugify(this.username, {
          replacement: "-",
          remove: /[$*_+~.()'""!\-:@]/g,
          lower: true
        });
        let ref = db.collection("users").doc(this.slug);
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = "This username already exists.";
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                ref.set({
                  username: this.username,
                  geolocation: null,
                  user_id: cred.user.uid
                });
              })
              .then(() => {
                this.$router.push({ name: "map" });
              })
              .catch(err => {
                // eslint-disable-next-line
                console.error(err);
                this.feedback = err.message;
              });
            this.feedback = "This username is free to use.";
          }
        });
      } else {
        this.feedback = "Please fill in all fields.";
      }
    }
  }
};
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.signup .field {
  margin-bottom: 16px;
}
</style>
