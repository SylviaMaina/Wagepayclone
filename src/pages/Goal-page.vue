<template>
  <q-dialog v-model="dialog" position="bottom">
    <q-card class="q-pa-lg">
      <q-card-header>
        <h6>Contributions : 10,000</h6>
      </q-card-header>
      <q-card-section>
        <q-input label="Amount" hint="Ksh 1,000" />
        <q-select v-model="model" :options="options" label="Top-up From" />
      </q-card-section>
      <q-card-actions class="bg-white text-primary flex justify-center q-my-lg">
        <q-btn
          rounded
          style="
            width: 9rem;
            height: 1rem;
            font-size: 0.8rem;
            border-radius: 40rem;
          "
          class="q-px-sm"
          color="primary"
          label="Continue"
          v-close-popup
          @click="authDialog = true"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog
    v-model="authDialog"
    position="bottom"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-white text-black" style="width: 300px">
      <q-card-header align="center">
        <h6 class="text-h6 q-pa-sm">Authenticate Transaction</h6>
        <h6 class="text-subtitle2 text-grey-7">
          Use Pin to authenticate transaction
        </h6>
      </q-card-header>

      <q-card-section class="q-pt-none">
        <q-input label="OTP" mask="****" hint="1234" />
      </q-card-section>

      <q-card-actions align="center" class="bg-white text-primary">
        <q-btn
          rounded
          style="width: 10rem; height: 2rem; font-size: 1rem"
          color="primary"
          label="Complete"
          v-close-popup
          @click="
            inception = false;
            secondDialog = false;
          "
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="cancel"
    position="bottom"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-white text-black" style="width: 300px">
      <q-card-header align="left">
        <h6 class="text-h6 q-pa-sm q-ml-sm">Cancel Saving</h6>
      </q-card-header>

      <q-card-section class="q-pt-none">
        <h6 class="text-subtitle2 text-grey-7">
          Please note that you'll incur 5% cancelllation fee if the saving was
          locked
        </h6>
      </q-card-section>

      <q-card-actions align="center" class="bg-white text-primary">
        <q-btn
          rounded
          style="width: 10rem; height: 2rem; font-size: 1rem"
          color="primary"
          label="Continue"
          v-close-popup
          @click="
            cancel = false;
            confirm = true;
          "
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog
    v-model="confirm"
    position="left"
    class="q-mt-xl q-mx-lg"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="height: 10rem; border-radius: 1rem">
      <q-card-section class="q-pt-none text-center q-mt-xl">
        <h6 class="text-subtitle2 text-grey-7">
          Your emergency saving of Ksh 10,000 is now available for withdrawal
        </h6>
      </q-card-section>
    </q-card>
  </q-dialog>
  <div class="q-pa-md">
    <div class="q-pa-md flex flex-center">
      <q-knob
        show-value
        font-size="10px"
        class="q-ma-md"
        v-model="value"
        size="250px"
        :thickness="0.25"
        color="primary"
        track-color="grey-3"
      >
        <div
          class="text-center flex column"
          style="
            width: 60%;
            height: 80%;
            align-items: center;
            justify-content: center;
          "
        >
          <h6 class="text-h4 text-bold text-primary">60%</h6>
          <h6
            class="text-subtitle2 text-grey-8 q-mt-sm"
            style="font-size: 0.8rem"
          >
            Ksh 2,000 of Ksh 12,000
          </h6>
          <h6 class="text-subtitle2 text-grey-8 q-mb-sm">Mature in 65 days</h6>
          <q-icon name="lock" size="1.2rem" />
        </div>
      </q-knob>
    </div>
    <div>
      <q-tabs v-model="tab" class="bg-transparent">
        <q-tab
          name="Topup"
          icon="payments"
          label="Topup"
          class="text-grey-8 bg-transparent"
          @click="dialog = true"
        />

        <q-tab
          name="Cancel"
          icon="close"
          label="Cancel"
          @click="cancel = true"
          class="text-grey-8 bg-transparent"
        />

        <q-tab class="q-ma-none q-pa-none">
          <q-toggle v-model="toggle" color="primary" class="" switch-label />
          <div class="q-toggle-label">{{ label }}</div>
        </q-tab>
      </q-tabs>
    </div>
    <div>
      <q-table
        title="Emergency Goal"
        :rows="rows"
        :columns="columns"
        row-key="name"
        flat
        bordered
        :filter="filter"
        virtual-scroll
        class="q-ma-none q-pa-none"
      >
      </q-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const options = ["Card", "Mobile"];

const value = 20;
const toggle = ref(true);
const filter = ref("");
const label = "AutoSave";
const dialog = ref(false);
const authDialog = ref(false);
const cancel = ref(false);
const confirm = ref(false);
const columns = [
  {
    name: "Date",
    required: true,
    label: "Date",
    align: "left",
    field: (row) => row.Date,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "Amount",
    align: "center",
    label: "Amount",
    field: "Amount",
    sortable: true,
  },
  { name: "Total", label: "Total", field: "Total", sortable: true },
];
const rows = [
  {
    Date: "12 / 12 / 2024",
    Amount: 159,
    Total: 6.0,
  },
  {
    Date: "12 / 12 / 2024",
    Amount: 237,
    Total: 9.0,
  },
  {
    Date: "12 / 12 / 2024",
    Amount: 262,
    Total: 16.0,
  },
  {
    Date: "12 / 12 / 2024",
    Amount: 305,
    Total: 3.7,
  },
  {
    Date: "12 / 12 / 2024",
    Amount: 356,
    Total: 16.0,
  },
];
</script>

<style>
.q-circular-progress .q-circular-progress__center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.q-toggle-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.q-toggle-label {
  margin-top: 10px;
  font-size: 14px;
  color: #616161;
  font-weight: 500;
}
.q-tab__label {
  margin-top: 20px;
}
</style>
