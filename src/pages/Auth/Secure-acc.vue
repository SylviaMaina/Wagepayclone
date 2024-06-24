<template>
  <div>
    <div class="q-ma-lg">
      <h2 class="text-h5 text-weight-medium">Secure your account</h2>
      <h6 class="text-subtitle2 text-weight-light q-mt-lg">
        Enter a pin to secure your account
      </h6>
    </div>
    <div class="full-width">
      <q-form
        class="q-mx-lg flex column justify-between"
        style="height: 20rem; width: 11/12"
      >
        <div style="display: flex; width: 100%; justify-content: space-between">
          <q-input
            v-model="text"
            placeholder="*"
            class="q-ml-sm text-center flex justify-center items-center"
          />
          <q-input
            v-model="text"
            placeholder="*"
            class="q-ml-sm text-center flex justify-center items-center"
          />
          <q-input
            v-model="text"
            placeholder="*"
            class="q-ml-sm text-center flex justify-center items-center"
          />
          <q-input
            v-model="text"
            placeholder="*"
            class="q-ml-sm text-center flex justify-center items-center"
          />
        </div>
        <h6 class="text-subtitle1 text-center text-yellow-10">Resend code</h6>
        <div class="flex justify-center">
          <router-link to="/login" style="text-decoration: none">
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
:deep(.q-placeholder) {
  text-align: center;
}
</style>
