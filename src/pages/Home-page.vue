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
  <div class="full-width">
    <div class="q-pa-lg bg-transparent">
      <div
        class="text-center bg-transparent flex column justify-evenly"
        style="height: 10rem"
      >
        <h6 class="text-subtitle1 text-weight-light bg-transparent">
          Available Amount
        </h6>
        <h6 class="text-h4 text-weigh-thin bg-transparent">Kes 12,000</h6>
        <h6 class="text-subtitle2 bg-transparent">Savings: ksh 12,000</h6>
      </div>
      <div>
        <q-tabs class="bg-transparent q-ma-sm">
          <q-tab
            name="Top-Up"
            icon="wallet"
            label="Top-Up"
            class="text-green-9 bg-transparent"
            @click="show()"
          />
          <q-tab
            name="Withdraw"
            icon="inbox"
            label="Withdraw"
            class="text-red-9 bg-transparent"
            @click="withdraws()"
          />
          <q-tab
            name="Shop"
            icon="shop"
            label="Shop"
            class="text-black bg-transparent"
            @click="radios()"
          />
          <q-tab
            name="Save"
            icon="savings"
            label="Movies"
            class="text-yellow-9 bg-transparent"
          />
        </q-tabs>
      </div>
      <q-card class="my-card q-mt-lg">
        <q-card-section class="my-card">
          <div class="flex justify-between">
            <h6>Request Advance</h6>
            <q-icon name="add" size="30px" />
          </div>
          <div>
            <h6 class="text-subtitle2 text-weight-light">
              You are eligible for kes 50,000
            </h6>
            <div>
              <q-slider
                v-model="standard"
                :min="0"
                :max="50000"
                track-size="10px"
              />
              <div class="flex justify-between">
                <h6
                  class="text-subtitle2 text-black-2 q-mt-none text-weight-light"
                >
                  Borrowed {{ standard }}
                </h6>
                <h6
                  class="text-subtitle2 text-black-2 q-mt-none text-weight-light"
                >
                  Available {{ remaining }}
                </h6>
              </div>
              <h6 class="text-subtitle2 text-weight-bold">Due in 20 days</h6>
            </div>
          </div>
        </q-card-section></q-card
      >
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
            class="text-yellow-9 bg-transparent"
          />
          <q-tab
            name="More"
            icon="apps"
            label="More"
            @click="inception = true"
            class="text-yellow-9 bg-transparent"
          />
        </q-tabs>
      </div>
      <div>
        <q-toolbar class="text-black">
          <q-toolbar-title>Transactions</q-toolbar-title>
        </q-toolbar>
        <q-list>
          <q-item>
            <q-item-section top class="q-pa-none">
              <q-icon name="inbox" color="red" size="30px" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Electricity</q-item-label>
              <q-item-label caption>12/07/2022</q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label>-ksh 200.00</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section top class="q-pa-none">
              <q-icon name="train" color="green" size="30px" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Transport</q-item-label>
              <q-item-label caption>12/07/2022</q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label>-ksh 200.00</q-item-label>
            </q-item-section>
          </q-item></q-list
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const standard = ref(2);
const dialog = ref(false);
const withdraw = ref(false);
const group = ref(null);
const radio = ref(false);
const inception = ref(false);
const secondDialog = ref(false);
const authDialog = ref(false);
const addCard = ref(false);
const remaining = computed(() => 50000 - standard.value);

function show() {
  dialog.value = true;
}
function withdraws() {
  withdraw.value = true;
}
function radios() {
  radio.value = true;
}
const options = ["Income", "Float", "Collection"];
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

const rdio = [
  { label: "Pay Bill", value: "bat", color: "primary" },
  { label: "Buy Goods", value: "friend", color: "primary" },
];
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  height: 11rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(231, 199, 37, 0.12);
}
.relative {
  position: relative;
  width: 100%;
}

.header {
  position: absolute;
  top: 0;
  width: 100vw;
}

:deep(.q-tab__label) {
  color: black;
  margin-top: 0.8rem;
}
</style>
