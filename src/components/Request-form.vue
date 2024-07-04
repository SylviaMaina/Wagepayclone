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
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const amount = ref("");
const payable = ref("");
const prompt = ref(props.modelValue);

const submitForm = () => {
  // Logic to handle form submission
  console.log("Amount:", amount.value);
  console.log("Payable by:", payable.value);

  // Close the dialog after submission
  prompt.value = false;
};

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
