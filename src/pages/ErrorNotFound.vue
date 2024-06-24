<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div style="background-color: transparent">
      <div style="font-size: 30vh; background-color: transparent">404</div>

      <div class="text-h2" style="opacity: 0.4; background-color: transparent">
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "ErrorNotFound",
});
</script>
