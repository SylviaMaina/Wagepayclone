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
        <q-input v-model="number" label="ID number" placeholder="123456" />

        <q-input v-model="text" label="Email" placeholder="example@gmail.com" />
        <q-input
          v-model="number"
          label="Phone Number"
          placeholder="0712345678"
        />
        <h6 class="text-subtitle1 text-weight-light">
          By submiting this application you confirm that you are authorized to
          share this information and agree with our<span
            class="text-yellow-10 q-ml-sm"
            >Terms and Conditions</span
          >
        </h6>
        <div class="flex justify-center">
          <router-link to="/verify" style="text-decoration: none">
            <q-btn
              style="
                background-color: rgba(231, 199, 37, 1);
                border-radius: 30rem;
                width: 15rem;
                height: 3rem;
              "
              class="q-h-14 align-center q-rounded-xl text-white q-max-w-lg:h-12 q-max-w-lg:mb-5"
              size="18px"
            >
              Continue
            </q-btn>
          </router-link>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.q-input {
  border-bottom: 1px solid rgba(43, 41, 41, 0.956);
}
:deep(span.q-btn__content) {
  background-color: transparent !important;
}
</style>
