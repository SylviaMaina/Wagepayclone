<template>
  <div class="full-height relative">
    <h6
      style="margin-top: 160px"
      class="text-subtitle1 text-grey-10 q-mr-lg q-mt-xl q-max-w-lg:mt-lg text-right q-max-w-lg:mr-4"
    >
      Skip
    </h6>
    <div style="width: 388px; height: 450px" class="full-width absolute">
      <div style="" class="flex column items-center">
        <div class="q-mx-auto">
          <img
            src="../../assets/refund-concept-illustration_114360-6723 1 (2).png"
            alt="healthy choices"
            style="height: 286px; width: 388px"
            class=""
          />
        </div>
        <div style="height: 14rem" class="flex justify-evenly column q-mt-sm">
          <div class="flex justify-evenly column">
            <h6 class="text-h6 q-mx-lg text-center text-weight-bold q-pb-xl">
              Simple ways to help you take control of your money
            </h6>
            <h6 class="text-subtitle1 text-center text-weight-light q-mx-sm">
              Choose your country code and enter your phone number.Choose your
              country code and enter your phone number
            </h6>
          </div>
        </div>
        <router-link
          to="/info"
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
            Activate
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
