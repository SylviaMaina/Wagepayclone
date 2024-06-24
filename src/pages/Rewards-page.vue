<template>
  <div
    class="text-center bg-transparent flex column justify-evenly q-my-lg"
    style="height: 5rem"
  >
    <h6 class="text-subtitle1 text-weight-light bg-transparent">
      Total Rewards
    </h6>
    <h6 class="text-h4 text-weigh-thin text-primary">Kes 12,000</h6>
  </div>
  <q-card
    class="my-card bg-white"
    style="height: 10rem; position: relative; border: 1px solid green"
  >
    <q-card-section>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-grey-8"
            >Credit Rewards</q-item-label
          >
          <q-item-label class="text-h6">200</q-item-label>
        </q-item-section>

        <q-item-section side middle>
          <q-badge outline color="green" label="10%" class="q-pa-sm" />
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-separator class="pro" />

    <q-card-actions class="justify-center">
      <q-item-label class="text-subtitle1 text-grey-8"
        ><q-icon name="save" size="20px" class="q-mr-sm" />Withdraw to
        wallet</q-item-label
      >
    </q-card-actions>
  </q-card>
  <q-card
    class="my-card bg-white"
    style="
      height: 10rem;
      position: relative;
      border: 1px solid rgba(231, 199, 37, 1);
    "
  >
    <q-card-section>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-grey-8">Bills Rewards</q-item-label>
          <q-item-label class="text-h6">1000</q-item-label>
        </q-item-section>

        <q-item-section side middle>
          <q-badge outline color="green" label="10%" class="q-pa-sm" />
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-separator class="pro" />

    <q-card-actions class="justify-center">
      <q-item-label class="text-subtitle1 text-grey-8"
        ><q-icon name="save" size="20px" class="q-mr-sm" />Withdraw to
        wallet</q-item-label
      >
    </q-card-actions>
  </q-card>
  <q-card
    class="my-card bg-white"
    style="height: 10rem; position: relative; border: 1px solid black"
  >
    <q-card-section>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-grey-8"
            >Employer Rewards</q-item-label
          >
          <q-item-label class="text-h6">1000</q-item-label>
        </q-item-section>

        <q-item-section side middle>
          <q-badge outline color="green" label="10%" class="q-pa-sm" />
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-separator class="pro" />

    <q-card-actions class="justify-center">
      <q-item-label class="text-subtitle1 text-grey-8"
        ><q-icon name="save" size="20px" class="q-mr-sm" />Withdraw to
        wallet</q-item-label
      >
    </q-card-actions>
  </q-card>
  <q-card
    class="my-card bg-white"
    style="height: 10rem; position: relative; border: 1px solid black"
  >
    <q-card-section>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-grey-8"
            >Interest Rewards</q-item-label
          >
          <q-item-label class="text-h6">200</q-item-label>
        </q-item-section>

        <q-item-section side middle>
          <q-badge outline color="green" label="10%" class="q-pa-sm" />
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-separator class="pro" />

    <q-card-actions class="justify-center">
      <q-item-label class="text-subtitle1 text-grey-8"
        ><q-icon name="save" size="20px" class="q-mr-sm" />Withdraw to
        wallet</q-item-label
      >
    </q-card-actions>
  </q-card>
</template>

<script setup></script>

<style lang="scss" scoped>
.my-card {
  width: 90%;
  margin: 0 auto;
  display: flex;
  margin-bottom: 2rem;
  flex-direction: column;
  justify-self: center;
  justify-content: space-between;
}
</style>
