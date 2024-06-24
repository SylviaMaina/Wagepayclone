<template>
  <q-dialog v-model="dialog" position="bottom">
    <q-card class="q-pa-lg">
      <div>
        <h6>Top-up your wallet</h6>
      </div>
      <q-input v-model="text" label="Amount" />
      <q-select v-model="model" :options="options" label="Top-up From" />
      <div style="display: flex; justify-content: center">
        <q-btn
          rounded
          label="Top Up"
          color="primary"
          text-color="white"
          size="14px"
          class="q-mt-xl q-px-xl"
        />
      </div>
    </q-card>
  </q-dialog>
  <q-dialog v-model="withdraw" position="bottom">
    <q-card class="q-pa-lg">
      <div>
        <h6>Available: 10,000</h6>
      </div>
      <q-input v-model="text" label="Amount" placeholder="Ksh 1,000" />
      <q-select
        v-model="model"
        :options="option"
        label="Withdraw to"
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
          label="Withdraw"
          color="primary"
          text-color="white"
          size="14px"
          class="q-mt-xl q-px-xl"
        />
      </div>
    </q-card>
  </q-dialog>
  <q-dialog v-model="radio" position="bottom">
    <q-card class="q-pa-lg">
      <h6>Shop with wallet</h6>
      <q-option-group :options="rdio" type="radio" v-model="group" />
      <div style="display: flex; justify-content: center">
        <q-btn
          rounded
          label="Proceed"
          color="primary"
          text-color="white"
          size="14px"
          class="q-mt-xl q-px-xl"
        />
      </div>
    </q-card>
  </q-dialog>
  <q-dialog v-model="inception" position="bottom">
    <q-card
      style="
        height: 25rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      "
    >
      <q-card-section align="right">
        <q-icon name="add" size="30px" @click="addCard = true" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-list
          style="
            height: 8rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          "
        >
          <q-item>
            <q-item-section avatar>
              <q-icon size="30px" name="money" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Shop Rent</q-item-label>
              <q-item-label caption>Ksh 50,000</q-item-label>
            </q-item-section>
            <q-item-section side><q-checkbox /> </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon size="30px" name="money" />
            </q-item-section>
            <q-item-section>
              <q-item-label>House Rent</q-item-label>
              <q-item-label caption>Ksh 20,000</q-item-label>
            </q-item-section>
            <q-item-section side><q-checkbox /> </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section align="center">
        <h6 class="text-subtitle2 text-grey-9">Total</h6>
        <h6 class="text-h6 text-weight-semibold">Ksh 50,000</h6>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          rounded
          style="width: 10rem; height: 3rem; font-size: 1rem"
          color="primary"
          label="Pay"
          @click="secondDialog = true"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog
    v-model="secondDialog"
    position="bottom"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-white text-black" style="width: 300px">
      <q-card-header>
        <div class="text-h6 q-pa-sm">Choose Payment Method</div>
      </q-card-header>

      <q-card-section class="q-pt-none">
        <q-list
          style="
            height: 8rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
          "
        >
          <q-item>
            <q-item-section avatar>
              <q-icon size="30px" name="money" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Mobile</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon size="30px" name="payment" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Card</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="center" class="bg-white text-primary">
        <q-btn
          rounded
          style="width: 10rem; height: 2rem; font-size: 1rem"
          color="primary"
          label="Pay"
          @click="authDialog = true"
          v-close-popup
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
  <q-dialog v-model="addCard" position="bottom">
    <q-card
      style="
        height: 40rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      "
    >
      <q-card-header>
        <h6 class="q-px-lg q-pt-lg">New Bill</h6>
      </q-card-header>
      <q-card-section
        class="q-pa-lg"
        style="
          height: 30rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        "
      >
        <q-input label="Bill Name" />
        <q-input label="Account Number" />
        <q-input label="Amount" />
        <q-input label="Recepient Phone(optional)" />
        <q-input label="Recepient Email" />
      </q-card-section>
      <q-card-actions align="center" class="bg-white text-primary q-mb-lg">
        <q-btn
          rounded
          style="width: 10rem; height: 2rem; font-size: 1rem"
          color="primary"
          label="Add Bill"
          @click="authDialog = true"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <div
    style="
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      height: 25rem;
      margin-top: 10px;
    "
  >
    <q-card class="my-card bg-white" style="height: 10rem; position: relative">
      <q-card-section align="center">
        <h6 class="text-subtitle1 text-grey-8">Total Savings</h6>
        <h6 class="q-mt-sm">
          <span :class="{ blurred: !amountVisible }" class="q-mr-lg">
            Ksh. 12,000
          </span>
          <q-icon
            :name="amountVisible ? 'visibility_off' : ' visibility'"
            @click="toggleVisibility"
          />
        </h6>
      </q-card-section>
      <q-separator class="pro" />

      <q-card-actions class="justify-center">
        <h6 class="text-subtitle2 text-primary" @click="inception = true">
          View All
        </h6>
      </q-card-actions>
    </q-card>
    <div>
      <q-tabs class="bg-transparent q-my-lg">
        <q-tab
          name="Electricity"
          icon="timeline"
          label="Electricity"
          class="text-grey-9 bg-transparent"
        />
        <q-tab
          name="Cable"
          icon="paid"
          label="Cable"
          class="text-grey-9 bg-transparent"
        />
        <q-tab
          name="Rent"
          icon="savings"
          label="Rent"
          @click="inception = true"
          class="text-grey-9 bg-transparent"
        />
        <q-tab
          name="All"
          icon="apps"
          label="All"
          @click="inception = true"
          class="text-grey-9 bg-transparent"
        />
      </q-tabs>
    </div>
    <q-card class="my-card bg-warning" style="height: 10rem">
      <q-card-header class="q-ml-lg">
        <h6 class="text-subtitle1 q-mt-sm">Due Bills</h6>
        <h6 class="text-subtitle2 text-grey-8">
          Please pay your water bill before 22 Jul 2022
        </h6>
      </q-card-header>
      <q-card-section class="q-py-none q-px-none q-ma-sm full-width bg-white">
        <q-item
          class="q-py-sm q-px-none flex justify-between"
          style="width: 80%; margin: 0 auto"
        >
          <h6 class="text-subtitle1">Emergency</h6>
          <h6 class="text-subtitle1">Kes 1200</h6>
          <h6 class="text-subtitle1 text-primary" @click="inception = true">
            Pay
          </h6>
        </q-item>
      </q-card-section>
    </q-card>
  </div>
  <div class="flex justify-between q-mt-xl bg-transparent">
    <h6
      class="text-red-9 text-subtitle1 text-center"
      style="border-right: 1.5px solid gray; width: 50%"
    >
      Upcoming
    </h6>
    <h6 class="text-gray-9 text-subtitle1 text-center" style="width: 50%">
      Previous
    </h6>
  </div>

  <div class="q-mt-xl">
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"
      flat
      bordered
      :filter="filter"
      virtual-scroll
      class="q-ma-none q-pa-none"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="Name" :props="props">
            {{ props.row.Name }}
          </q-td>
          <q-td key="Amount" :props="props">
            {{ props.row.Amount }}
          </q-td>
          <q-td key="DueDate" :props="props">
            {{ props.row.DueDate }}
          </q-td>
          <q-td key="Actions" :props="props">
            <h6 @click="secondDialog = true" class="text-subtitle2">
              {{ props.row.Actions }}
            </h6>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from "vue";

const standard = ref(2);
const dialog = ref(false);
const withdraw = ref(false);
const group = ref(null);
const radio = ref(false);
const inception = ref(false);
const secondDialog = ref(false);
const authDialog = ref(false);
const addCard = ref(false);

const amountVisible = ref(true);
const filter = ref("");
function toggleVisibility() {
  amountVisible.value = !amountVisible.value;
}

const columns = [
  {
    name: "Name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.Name,
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
  {
    name: "DueDate",
    label: "Due Date",
    field: "DueDate",
    sortable: true,
  },
  { name: "Actions", label: "Actions ", field: "Actions" },
];
const rows = [
  {
    Name: "Electricity",
    Amount: 1590,
    DueDate: "12/12/2024",
    Actions: "Pay",
  },
  {
    Name: "Rent",
    Amount: 23700,
    DueDate: "01/12/2024",
    Actions: "Pay",
  },
];
</script>

<style lang="scss" scoped>
.blurred {
  font-size: 16px;
  color: transparent;
  text-shadow: 0 0 8px #000;
}
.my-card {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-self: center;
  justify-content: space-between;
}
</style>
