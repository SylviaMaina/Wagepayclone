<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import { Loading } from "quasar";
import { useRouter } from "vue-router";
const isLoggedIn = ref(false);
const email = ref("");
const password = ref("");
const router = useRouter();
const error = ref(false);
const session = ref("");
const progressOTP = ref(false);

const HandleLogin = async () => {
  Loading.show();
  try {
    const response = await axios.post(
      "https://dev.mywagepay.com/api/v1/auth/login",
      { email: email.value, password: password.value }
    );
    const data = response.data;

    console.log(data);

    if (data.status === 200) {
      Loading.hide();
      session.value = data.data.login_id;
      progressOTP.value = true;
      isLoggedIn.value = true;
    } else {
      error.value = true;
      Loading.hide();
    }
  } catch (err) {
    console.error("Error:", err);
    error.value = true;
    Loading.hide();
  }
};

watch([progressOTP, session], ([newProgressOtp, newSession]) => {
  if (isLoggedIn.value && newProgressOtp && newSession) {
    router.push(`/verify?authcode=${newSession}`);
  }
});

const dismissError = () => {
  error.value = false;
};
</script>

<template>
  <div>
    <q-banner v-if="error" class="bg-primary text-white">
      Unfortunately, the login attempt was unsuccessful, please try again.
      <template v-slot:action>
        <q-btn flat color="white" label="Dismiss" @click="dismissError" />
      </template>
    </q-banner>
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
        <q-input v-model="password" label="Pin" placeholder="*****" />
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
