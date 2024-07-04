<template>
  <RequestForm v-model:modelValue="prompt" />
  <div class="q-pa-md" v-if="user">
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
            {{ user.availableCredit }} Credit available
          </h6>
          <h6 class="text-h4 text-bold text-primary">
            {{ value.toFixed(0) }}%
          </h6>
          <h6 class="text-subtitle2 text-grey-8 q-mt-sm">
            {{ user.borrowedAmount }} Credited
          </h6>
        </div>
      </q-knob>
    </div>
    <div>
      <q-tabs v-model="tab" class="bg-transparent">
        <q-tab
          name="Borrow"
          icon="payments"
          label="Borrow"
          @click="requestAdvance"
          class="text-grey-8 bg-transparent"
        />

        <q-tab
          name="Pay"
          icon="payments"
          label="Pay"
          @click="pay = true"
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
  <q-dialog v-model="pay" position="bottom">
    <q-card class="q-pa-lg">
      <div>
        <h6>Total Credit: {{ user.borrowedAmount }}</h6>
      </div>
      <q-input v-model="WAmount" label="Amount" placeholder="Ksh 1,000" />
      <q-select
        v-model="WOption"
        :options="option"
        label="Pay from"
        color="teal"
        clearable
        options-selected-class="text-deep-orange"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-icon :name="scope.opt.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <div style="display: flex; justify-content: center">
        <q-btn
          rounded
          label="Pay Credit"
          @click="PayLoan"
          color="primary"
          text-color="white"
          size="14px"
          class="q-mt-xl q-px-xl"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from "quasar";
import axios from "../axios";
import { useUserStore } from "../store/user";
import { onMounted, ref } from "vue";
import RequestForm from "src/components/Request-form.vue";

// Percentage value of the progress bar
const store = useUserStore();
const prompt = ref(false);
const toggle = ref(true);
const filter = ref("");
const label = "Auto-deduct";
const user = ref(null);
const pay = ref(false);
const WAmount = ref();
const WOption = ref();
const $q = useQuasar();

onMounted(async () => {
  try {
    await store.fetchUserProfile();
    user.value = store.user;
  } catch (error) {
    console.log("Error", error);
  }
});

const requestAdvance = async () => {
  try {
    if (user.value.salaryAdvances.remainingAmount != 0) {
      $q.notify({
        type: "negative",
        message: "Please clear existing loan to request a new one",
      });
    } else {
      prompt.value = true;
    }
  } catch (error) {
    console.log("Error", error);
  }
};

const PayLoan = async () => {
  try {
    const formattedAmount = parseFloat(WAmount.value);

    // Check if amount is a valid number
    if (isNaN(formattedAmount) || formattedAmount <= 0) {
      $q.notify({ type: "negative", message: "Invalid amount!" });
      return;
    }

    const advanceId =
      user.value.salaryAdvances && user.value.salaryAdvances.length > 0
        ? user.value.salaryAdvances[0].advanceId
        : null;

    if (!advanceId) {
      $q.notify({
        type: "negative",
        message: "No advance found for the user!",
      });
      return;
    }

    const response = await axios.post("/pay", {
      userId: user.value.id,
      source: WOption.value.label,
      amount: formattedAmount,
      advanceId: advanceId,
    });

    if (response.status === 200) {
      $q.notify({ type: "positive", message: "Advance paid successfully" });
      user.value.borrowedAmount = response.data.user.borrowedAmount;
      user.value.availableCredit = response.data.user.availableCredit;
      pay.value = false;
    }
  } catch (error) {
    console.log("Error", error);
  }
};

const value = (store.user.borrowedAmount / store.user.eligibleAdvance) * 100;
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

const option = [
  {
    label: "Mobile",
    value: "Mobile",
    description: "Enter amount you with to withdraw",
    icon: "money",
  },
  {
    label: "Card A",
    value: "CardA",
    description: "Choose the card you wish to use",
    icon: "payments",
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
