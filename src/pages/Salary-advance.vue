<template>
  <RequestForm v-model:modelValue="prompt" />
  <div class="q-pa-md" v-if="user">
    <div
      class="q-pa-md flex flex-center"
      v-for="(advance, index) in user.salaryAdvances"
      :key="index"
    >
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
            {{ advance.remainingAmount }} Credit available
          </h6>
          <h6 class="text-h4 text-bold text-primary">
            {{ value.toFixed(0) }}%
          </h6>
          <h6 class="text-subtitle2 text-grey-8 q-mt-sm">
            {{ advance.borrowedAmount }} Credited
          </h6>
        </div>
      </q-knob>
    </div>
    <div>
      <q-tabs class="bg-transparent">
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
    <q-card class="q-pa-lg" v-if="user">
      <div v-for="(advance, index) in user.salaryAdvances" :key="index">
        <h6>Total Credit: {{ advance.borrowedAmount }}</h6>
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
import { computed, onMounted, ref } from "vue";
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
const columns = ref([
  {
    name: "repaymentId",
    align: "center",
    label: "Id",
    field: (row) => row.repaymentId,
    sortable: true,
  },
  {
    name: "date",
    label: "Repayment Date",
    align: "center",

    field: (row) => row.date,
    sortable: true,
  },
  {
    name: "amount",
    label: "Amount ",
    align: "center",
    field: (row) => row.amount,
  },
]);
const rows = ref([]);

const fetchUserProfile = async () => {
  try {
    await store.fetchUserProfile();
    user.value = store.currentUser;
    rows.value = store.currentUser.salaryAdvances[0].repayments;
  } catch (error) {
    console.log("Error", error);
  }
};
onMounted(fetchUserProfile);

const requestAdvance = async () => {
  try {
    if (user.value.salaryAdvances[0].borrowedAmount != 0) {
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
      await fetchUserProfile();
      pay.value = false;
    }
  } catch (error) {
    console.log("Error", error);
  }
};

const value = computed(() => {
  const borrowedAmount = store.user.salaryAdvances[0]?.borrowedAmount || 0;
  const totalAmount = store.user.salaryAdvances[0]?.amount || 1;
  return (borrowedAmount / totalAmount) * 100;
});

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
