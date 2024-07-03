<template>
  <div>
    <div class="q-ma-lg">
      <h2 class="text-h5 text-weight-medium">Register</h2>
      <h6 class="text-subtitle2 text-weight-light q-mt-lg">
        This information is used for registration and validation
      </h6>
    </div>
    <div class="full-width">
      <q-form
        class="q-mx-lg flex column justify-between"
        style="height: 30rem; width: 11/12"
      >
        <q-input v-model="idNumber" label="ID number" placeholder="123456" />

        <q-input
          v-model="email"
          label="Email"
          placeholder="example@gmail.com"
        />
        <q-input
          v-model="phoneNumber"
          label="Phone Number"
          placeholder="0712345678"
        />
        <h6 class="text-subtitle1 text-weight-light">
          By submiting this application you confirm that you are authorized to
          share this information and agree with our<span
            class="text-yellow-10 q-ml-sm"
            @click="clearDb"
            >Terms and Conditions</span
          >
        </h6>
        <div class="flex justify-center">
          <!-- <router-link to="/verify" style="text-decoration: none"> -->
          <q-btn
            style="
              background-color: rgba(231, 199, 37, 1);
              border-radius: 30rem;
              width: 15rem;
              height: 3rem;
            "
            @click="register"
            class="q-h-14 align-center q-rounded-xl text-white q-max-w-lg:h-12 q-max-w-lg:mb-5"
            size="18px"
          >
            Continue
          </q-btn>
          <!-- </router-link> -->
        </div>
      </q-form>
    </div>
  </div>
  <q-inner-loading :showing="visible">
    <q-spinner-gears size="50px" color="primary" />
  </q-inner-loading>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const visible = ref(false);
const idNumber = ref("");
const email = ref("");
const phoneNumber = ref("");
const router = useRouter();

const register = async () => {
  visible.value = true;
  try {
    const res = await axios.post("http://localhost:3000/auth/register", {
      idNumber: idNumber.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
    });
    if (res.status === 201) {
      // Use 201 Created status code for registration
      visible.value = false;
      console.log("Registration Successful");
      const userId = res.data.user.id; // Access the correct user ID from the response
      router.push({ path: "/secure", query: { id: userId } });
    } else {
      visible.value = false;
      console.log("Error registering");
    }
  } catch (error) {
    visible.value = false;
    console.log("Error", error);
  }
};

const clearDb = async () => {
  visible.value = true;
  try {
    const res = await axios.post("http://localhost:3000/auth/clear-db");
    if (res.status === 200) {
      visible.value = false;
      console.log("Database cleared successfully");
    } else {
      visible.value = false;
      console.log("Error clearing database");
    }
  } catch (error) {
    visible.value = false;
    console.log("Error", error);
  }
};
</script>

<style lang="scss" scoped>
.q-input {
  border-bottom: 1px solid rgba(43, 41, 41, 0.956);
}
:deep(span.q-btn__content) {
  background-color: transparent !important;
}
</style>
