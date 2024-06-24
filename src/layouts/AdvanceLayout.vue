<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
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
              Please note that this amount will be automatically deducted from
              your next salary
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
      <q-header class="bg-grey-1 q-pa-sm">
        <q-toolbar class="flex justify-between">
          <div class="flex items-center">
            <q-avatar>
              <img
                src="../assets/Ellipse 11.png"
                alt="profile"
                class="profile-pic"
              />
              <q-popup-proxy :breakpoint="200">
                <q-card>
                  <q-list>
                    <q-item clickable v-ripple>
                      <q-item-section avatar>
                        <q-icon color="primary" name="edit" />
                      </q-item-section>

                      <q-item-section class="text-primary"
                        >Edit Profile</q-item-section
                      >
                    </q-item>
                    <q-item clickable v-ripple>
                      <q-item-section avatar>
                        <q-icon color="red" name="power" />
                      </q-item-section>

                      <q-item-section class="text-red">Logout</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                      <q-item-section avatar>
                        <q-icon color="green" name="lock" />
                      </q-item-section>

                      <q-item-section class="text-green"
                        >Change Pin</q-item-section
                      >
                    </q-item>
                  </q-list>
                </q-card>
              </q-popup-proxy>
            </q-avatar>
          </div>

          <q-icon
            name="notifications_none"
            size="30px"
            color="black"
          /> </q-toolbar
      ></q-header>

      <router-view />

      <q-footer class="bg-grey-2" elevated>
        <q-tabs v-model="tab" class="bg-transparent">
          <q-item to="/home" class="q-ma-none q-pa-none">
            <q-tab
              name="Home"
              icon="home"
              label="Home"
              class="text-grey-8 bg-transparent"
          /></q-item>
          <q-item to="/advance" class="q-ma-none q-pa-none">
            <q-tab
              name="Advance"
              icon="search"
              label="Advance"
              class="text-grey-8 bg-transparent"
            />
          </q-item>
          <q-item to="/savings" class="q-ma-none q-pa-none">
            <q-tab
              name="Saving"
              icon="savings"
              label="Saving"
              class="text-grey-8 bg-transparent"
            />
          </q-item>
          <q-item to="/bills" class="q-ma-none q-pa-none">
            <q-tab
              name="Bills"
              icon="wallet"
              label="Bills"
              class="text-grey-8 bg-transparent"
            />
          </q-item>
          <q-item to="/rewards" class="q-ma-none q-pa-none">
            <q-tab
              name="Rewards"
              icon="event"
              label="Rewards"
              class="text-grey-8 bg-transparent"
            />
          </q-item>
        </q-tabs>
        <q-page-sticky position="bottom-top" :offset="[-30, -30]">
          <q-fab icon="add" color="primary" @click="onClick"> </q-fab>
        </q-page-sticky>
      </q-footer>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const prompt = ref(false);
function onClick() {
  prompt.value = !prompt.value;
}
</script>

<style scoped>
.background-circle {
  position: absolute;
  top: -5%;
  left: -3rem;
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  background: rgba(231, 199, 37, 0.12); /* Adjust color as needed */
}
.profile-pic {
  width: 2rem;
  height: 2rem;
  background: transparent;
  border-radius: 50%;
}
:deep(.q-page-sticky) {
  transform: translate(0px, -90px) !important;
}
</style>
