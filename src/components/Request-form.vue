<template>
  <q-dialog v-model="prompt" position="bottom">
    <q-card
      style="
        min-width: 350px;
        height: 40rem;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
      "
    >
      <q-card-header>
        <h6 class="text-h5 q-pl-sm">Salary advance request form</h6>
        <h6 class="text-grey-7 q-pl-sm" style="font-size: small">
          Please note that this amount will be automatically deducted from your
          next salary
        </h6>
      </q-card-header>

      <q-card-section
        class="q-pt-none flex column justify-between"
        style="height: 8rem"
      >
        <q-input
          dense
          v-model="amount"
          label="Amount"
          placeholder="Ksh 1000"
          autofocus
          @keyup.enter="prompt = false"
        />
        <q-input
          dense
          v-model="payable"
          label="Payable by"
          type="date"
          placeholder="11/11/2024"
          autofocus
          @keyup.enter="prompt = false"
        />
      </q-card-section>
      <q-card-section>
        <q-toggle
          label="Autodeduct"
          color="primary"
          class="q-ma-none q-pa-none"
        />
        <h6 class="text-grey-7 q-pl-sm" style="font-size: small">
          This will automatically deduct your loan from your card
        </h6>
      </q-card-section>
      <q-card-actions align="center" class="text-primary">
        <q-btn
          rounded
          size="10px"
          class="q-pa-xl"
          style="width: 10rem; height: 2rem; font-size: 1rem"
          color="primary"
          label="Submit"
          @click="RequestLoan"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { date, useQuasar } from "quasar";
import axios from "../axios";
import { useUserStore } from "src/store/user";
import { ref, watch, defineProps, defineEmits, onMounted } from "vue";

const store = useUserStore();
const user = ref(null);
const amount = ref(null);
const payable = ref(null);
const prompt = ref(false);
const $q = useQuasar();

const fetchUserInfo = async () => {
  try {
    await store.fetchUserProfile();
    user.value = store.currentUser;
  } catch (error) {
    console.log("Error", error);
  }
};

onMounted(fetchUserInfo);

const RequestLoan = async () => {
  try {
    const formattedAmount = parseFloat(amount.value);

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
    const response = await axios.post("/request", {
      userId: user.value.id,
      amount: amount.value,
      date: payable.value,
      advanceId: advanceId,
    });
    if (response.status === 200) {
      $q.notify({
        type: "positive",
        message: "Advance requested successfully",
      });
      await fetchUserInfo();
      prompt.value = false;
    } else {
      $q.notify({ type: "negative", message: "Something went " });
      prompt.value = false;
    }
  } catch (error) {
    console.log("Error", error);
  }
};

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

// Watch for changes in prop and update the local state accordingly
watch(
  () => props.modelValue,
  (newVal) => {
    prompt.value = newVal;
  }
);

// Emit the update to the parent component
watch(prompt, (newVal) => {
  emit("update:modelValue", newVal);
});
</script>

<style lang="scss" scoped></style>
