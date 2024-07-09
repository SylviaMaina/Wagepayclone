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
      v-if="user"
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
          <q-item v-for="(bill, index) in bills" :key="index">
            <q-item-section avatar>
              <q-icon size="30px" name="money" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ bill.billName }}</q-item-label>
              <q-item-label caption>Ksh {{ bill.amount }}</q-item-label>
            </q-item-section>
            <q-item-section side><q-checkbox /> </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section align="center">
        <h6 class="text-subtitle2 text-grey-9">Total</h6>
        <h6 class="text-h6 text-weight-semibold">Ksh {{ user.billTotal }}</h6>
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
        <q-input label="Bill Name" v-model="billName" />
        <q-input label="Account Number" v-model="accNumber" />
        <q-input label="Amount" v-model="amount" />
        <q-input label="Recepient Phone(optional)" v-model="recepientphone" />
        <q-input label="Recepient Email" v-model="recepientEmail" />
      </q-card-section>
      <q-card-actions align="center" class="bg-white text-primary q-mb-lg">
        <q-btn
          rounded
          style="width: 10rem; height: 2rem; font-size: 1rem"
          color="primary"
          label="Add Bill"
          @click="newBill"
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
    <q-card
      v-if="user"
      class="my-card bg-white"
      style="height: 10rem; position: relative"
    >
      <q-card-section align="center">
        <h6 class="text-subtitle1 text-grey-8">Total Bills</h6>
        <h6 class="q-mt-sm">
          <span :class="{ blurred: !amountVisible }" class="q-mr-lg">
            Ksh. {{ user.billTotal }}
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
    <div v-if="bills">
      <q-tabs class="bg-transparent q-my-lg">
        <q-tab
          v-for="(bill, index) in bills"
          :key="index"
          :name="bill.billName"
          icon="timeline"
          :label="bill.billName"
          class="text-grey-9 bg-transparent"
        />
        <q-tab name="All" icon="apps" label="All" />
      </q-tabs>
    </div>

    <q-card class="my-card bg-warning" style="height: 10rem">
      <q-card-header class="q-ml-lg">
        <h6 class="text-subtitle1 q-mt-sm flex justify-between items-center">
          Due Bills
          <q-icon
            name="add"
            @click="inception = true"
            size="20px"
            class="text-grey-9 bg-transparent centered q-px-sm"
          />
        </h6>
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

  <div class="q-mt-xl">
    <q-table
      :rows="bills"
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
            {{ props.row.billName }}
          </q-td>
          <q-td key="Amount" :props="props">
            {{ props.row.amount }}
          </q-td>

          <q-td key="Actions" :props="props">
            <h6
              @click="payBill(props.row.billId, props.row.amount)"
              class="text-subtitle2"
            >
              Pay
            </h6>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useUserStore } from "src/store/user";
import axios from "../axios";
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";

const dialog = ref(false);
const withdraw = ref(false);
const group = ref(null);
const radio = ref(false);
const inception = ref(false);
const secondDialog = ref(false);
const authDialog = ref(false);
const addCard = ref(false);
const billName = ref("");
const accNumber = ref("");
const amount = ref();
const recepientphone = ref("");
const recepientEmail = ref("");
const store = useUserStore();
const user = ref(null);
const bills = ref([]);
const $q = useQuasar();

const amountVisible = ref(true);
const filter = ref("");
function toggleVisibility() {
  amountVisible.value = !amountVisible.value;
}

const fetchUser = async () => {
  try {
    await store.fetchUserProfile();
    user.value = store.currentUser;
    bills.value = store.currentUser.bills;
  } catch (error) {
    console.log("Error", error);
  }
};

onMounted(fetchUser);

const newBill = async () => {
  try {
    const response = await axios.post("/setbill", {
      userId: user.value.id,
      billName: billName.value,
      accNumber: accNumber.value,
      amount: amount.value,
      recepientphone: recepientphone.value,
      recepientEmail: recepientEmail.value,
    });
    if ((response.status = 200)) {
      $q.notify({ type: "positive", message: "Bill saved successfully!" });
      fetchUser();
    }
  } catch (error) {}
};

const payBill = async (billId, amount) => {
  try {
    const response = await axios.post("/paybill", {
      billId: billId,
      amount: amount,
      source: "card",
      userId: user.value.id,
    });
    if ((response.status = 200)) {
      $q.notify({ type: "positive", message: "Bill paid successfully!" });
      fetchUser();
    }
  } catch (error) {
    console.log("Error", error);
  }
};

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
  { name: "Actions", label: "Actions ", field: "Actions" },
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
