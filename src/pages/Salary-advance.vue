<template>
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
          <h6 class="text-subtitle2 text-grey-8 q-mb-sm">
            30,000 credit available
          </h6>
          <h6 class="text-h4 text-bold text-primary">20%</h6>
          <h6 class="text-subtitle2 text-grey-8 q-mt-sm">10,000 Credited</h6>
        </div>
      </q-knob>
    </div>
    <div>
      <q-tabs v-model="tab" class="bg-transparent">
        <q-tab
          name="Borrow"
          icon="payments"
          label="Borrow"
          class="text-grey-8 bg-transparent"
        />

        <q-tab
          name="Pay"
          icon="payments"
          label="Pay"
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
        title="Salary Advances"
        :rows="rows"
        :columns="columns"
        row-key="name"
        flat
        bordered
        :filter="filter"
        virtual-scroll
        class="q-ma-none q-pa-none"
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" /></template></q-input></template
      ></q-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Percentage value of the progress bar
const value = 20;
const toggle = ref(true);
const filter = ref("");
const label = "Auto-deduct";

const columns = [
  {
    name: "Requested",
    required: true,
    label: "Requested",
    align: "left",
    field: (row) => row.Requested,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "Approved",
    align: "center",
    label: "Approved",
    field: "Approved",
    sortable: true,
  },
  { name: "Paid", label: "Paid", field: "Paid", sortable: true },
  { name: "Actions", label: "Actions ", field: "Actions" },
];
const rows = [
  {
    Requested: "Frozen Yogurt",
    Approved: 159,
    Paid: 6.0,
    Actions: 24,
  },
  {
    Requested: "Ice cream sandwich",
    Approved: 237,
    Paid: 9.0,
    Actions: 37,
  },
  {
    Requested: "Eclair",
    Approved: 262,
    Paid: 16.0,
    Actions: 23,
  },
  {
    Requested: "Cupcake",
    Approved: 305,
    Paid: 3.7,
    Actions: 67,
  },
  {
    Requested: "Gingerbread",
    Approved: 356,
    Paid: 16.0,
    Actions: 49,
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
