<template>
  <div class="full-height relative">
    <router-link
      to="/login"
      class="q-w-11/12 q-mx-auto"
      style="text-decoration: none"
    >
      <h6
        style="margin-top: 160px"
        class="text-subtitle1 text-grey-10 q-mr-lg q-mt-xl q-max-w-lg:mt-lg text-right q-max-w-lg:mr-4"
      >
        Skip
      </h6>
    </router-link>

    <div style="width: 388px; height: 450px" class="full-width absolute">
      <div style="" class="flex column items-center">
        <div class="q-mx-auto">
          <img
            src="../../assets/logo 1.png"
            alt="healthy choices"
            class="q-w-40 q-h-40"
          />
        </div>
        <div style="height: 20rem" class="flex justify-evenly column q-mt-sm">
          <h2
            class="text-h4 q-mx-auto text-center q-max-w-lg:text-5xl text-weight-regular"
          >
            Welcome to
          </h2>
          <div class="flex justify-evenly column">
            <h6 class="text-h3 text-center text-weight-bold q-pb-xl">
              myWagePay
            </h6>
            <h6 class="text-h6 text-center text-weight-regular">
              Start ways to borrow now
            </h6>
          </div>
        </div>
        <router-link
          to="/onboarding2"
          class="q-w-11/12 q-mx-auto"
          style="text-decoration: none"
        >
          <button
            style="
              background-color: rgba(231, 199, 37, 1);
              border-radius: 30rem;
              width: 15rem;
              border: none;
              height: 3rem;
            "
            class="q-h-14 q-rounded-xl text-white q-max-w-lg:h-12 q-max-w-lg:mb-5"
          >
            Take a tour
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
:deep(span.q-btn__content) {
  background-color: transparent !important;
}
</style>
