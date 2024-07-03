<script setup>
import { useUserStore } from "src/store/user";
import axios from "../../axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const pin = ref("");
const userStore = useUserStore();

const HandleLogin = async () => {
  try {
    const response = await axios.post("/login", {
      email: email.value,
      pin: pin.value,
    });

    if (response.status === 200) {
      const token = response.data.token;
      localStorage.setItem("token", token);
      userStore.token = token; //ensure the token is set in the store
      await userStore.fetchUserProfile(); //fetch user profile
      router.push("/home");
    } else {
      console.log("Something went wrong");
    }
  } catch (error) {}
};
</script>

<template>
  <div>
    <div class="q-ma-lg">
      <h2 class="text-h5 text-weight-medium">Login</h2>
      <h6 class="text-subtitle2 text-weight-light q-mt-lg">
        Please use the Phone and pin provided during the registration process
      </h6>
    </div>
    <div class="full-width">
      <q-form
        class="q-mx-lg flex column justify-between"
        style="height: 20rem; width: 11/12"
      >
        <q-input
          v-model="email"
          label="Email"
          type="email"
          placeholder="example@email.com"
        />
        <q-input v-model="pin" label="Pin" placeholder="*****" />
        <h6 class="text-subtitle1">
          Forgot your pin? <span class="text-yellow-10">RESET PIN</span>
        </h6>
        <div class="flex justify-center">
          <!-- <router-link to="/home" style="text-decoration: none"> -->
          <q-btn
            style="
              background-color: rgba(231, 199, 37, 1);
              border-radius: 30rem;
              width: 15rem;
              height: 3rem;
            "
            @click="HandleLogin"
            class="q-h-14 align-center q-rounded-xl text-white q-max-w-lg:h-12 q-max-w-lg:mb-5"
            size="18px"
          >
            Login
          </q-btn>
          <!-- </router-link> -->
        </div>
      </q-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.q-input {
  border-bottom: 1px solid rgba(43, 41, 41, 0.956);
}
:deep(span.q-btn__content) {
  background-color: transparent !important;
}
</style>
