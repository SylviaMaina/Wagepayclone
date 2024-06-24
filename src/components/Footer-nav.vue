<template>
  <q-footer class="bg-grey-2" elevated>
    <q-tabs v-model="tab" class="bg-transparent">
      <q-item to="/home" class="q-ma-none q-pa-none">
        <q-tab
          name="Home"
          icon="home"
          label="Home"
          class="text-grey-8 bg-transparent"
      /></q-item>
      <q-item to="/advance" class="q-ma-none q-pa-none">
        <q-tab
          name="Advance"
          icon="search"
          label="Advance"
          class="text-grey-8 bg-transparent"
        />
      </q-item>
      <q-item to="/savings" class="q-ma-none q-pa-none">
        <q-tab
          name="Saving"
          icon="savings"
          label="Saving"
          class="text-grey-8 bg-transparent"
        />
      </q-item>
      <q-item to="/bills" class="q-ma-none q-pa-none">
        <q-tab
          name="Bills"
          icon="wallet"
          label="Bills"
          class="text-grey-8 bg-transparent"
        />
      </q-item>
      <q-item to="/rewards" class="q-ma-none q-pa-none">
        <q-tab
          name="Rewards"
          icon="event"
          label="Rewards"
          class="text-grey-8 bg-transparent"
        />
      </q-item>
    </q-tabs>
  </q-footer>
</template>

<script setup></script>

<style lang="scss" scoped></style>
