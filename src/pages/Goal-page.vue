<template>
  <q-dialog v-model="dialog" position="bottom">
    <q-card class="q-pa-lg">
      <q-card-header>
        <h6>Total target amount : {{ info.targetAmount }}</h6>
      </q-card-header>
      <q-card-section>
        <q-input label="Amount" hint="Ksh 1,000" v-model="amount" />
        <q-select v-model="source" :options="options" label="Top-up From" />
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
          @click="Save"
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
          @click="clearLoan"
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
          Your emergency saving of Ksh {{ user.goalProgress }} is now available
          for withdrawal
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
        v-model="progress"
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
          <h6 class="text-h4 text-bold text-primary">
            {{ progress.toFixed(0) }}%
          </h6>
          <h6
            class="text-subtitle2 text-grey-8 q-mt-sm"
            style="font-size: 0.8rem"
          >
            Ksh {{ info.goalProgress }} of Ksh {{ info.targetAmount }}
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
        :title="info.goalName"
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
import { useQuasar } from "quasar";
import axios from "../axios";
import { useUserStore } from "src/store/user";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const options = ["Card", "Mobile"];
const store = useUserStore();
const user = ref(null);
const info = ref({});
const amount = ref(0);
const source = ref("");
const toggle = ref(true);
const filter = ref("");
const label = "AutoSave";
const dialog = ref(false);
const authDialog = ref(false);
const cancel = ref(false);
const confirm = ref(false);
const route = useRoute();
const $q = useQuasar();
const rows = ref([]);
const router = useRouter();

const fetchUser = async () => {
  try {
    await store.fetchUserProfile();
    user.value = store.currentUser.id;
  } catch (error) {
    console.log("Error", error);
  }
};
onMounted(fetchUser);

const savingsId = route.params.goalId;

console.log(route.params);

const getDetails = async () => {
  try {
    const response = await axios.get(`/savings/${savingsId}`);

    if (response.status === 200) {
      authDialog.value = false;
      info.value = response.data.savingsGoal;
      rows.value = response.data.savingsGoal.savings;
    } else {
      authDialog.value = false;
      console.log("Unexpected status:", response.status);
    }
  } catch (error) {
    authDialog.value = false;
    console.error("Error:", error.message);
  }
};

onMounted(getDetails);

const Save = async () => {
  try {
    const response = await axios.post("/save", {
      userId: user.value,
      source: source.value,
      amount: amount.value,
      savingsId: savingsId,
    });
    if ((response.status = 200)) {
      $q.notify({ type: "positive", message: "Goal saved successfully!" });
      getDetails();
    }
  } catch (error) {
    console.log("Error", error);
  }
};

const clearLoan = async () => {
  try {
    const response = await axios.post("/clear-saving", {
      userId: user.value,
      savingsId: savingsId,
    });
    if ((response.status = 200)) {
      $q.notify({ type: "positive", message: "Goal deleted successfully!" });
      cancel.value = false;
      router.push("/savings");
      getDetails();
    }
  } catch (error) {
    console.log("Error", error);
  }
};

const progress = computed(() => {
  if (!info.value || !info.value.targetAmount) return 0;
  return (info.value.goalProgress / info.value.targetAmount) * 100;
});

const columns = [
  {
    name: "Date",
    required: true,
    label: "Date",
    align: "left",
    field: (row) => row.date,
  },
  {
    name: "Amount",
    align: "center",
    label: "Amount",
    field: "Amount",
    sortable: true,
    field: (row) => row.amount,
  },
  {
    name: "Total",
    label: "Total",
    field: "Total",
    sortable: true,
    field: (row) => row.source,
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
