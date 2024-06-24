<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-dialog v-model="dialog" position="bottom">
        <q-card class="q-pa-lg">
          <q-card-header>
            <h6>Emergency Goal</h6>
          </q-card-header>
          <q-card-section class="q-px-none">
            <h6 class="text-subtitle2 text-grey-9">
              Would you like to set a locked saving or an open one?
            </h6>
            <q-toggle
              keep-color
              v-model="toggle"
              color="primary"
              label="Locked Saving"
              switch-label
              class="q-mt-lg"
            />
          </q-card-section>
          <q-card-section class="q-px-none">
            <h6 class="text-subtitle2 font-weight-bold">
              How long would you like your saving to be locked?
            </h6>
            <h6 class="text-subtitle2 text-grey-9" style="font-size: 0.8rem">
              The percentage figure shows how much interest you will earn with
              that locked period
            </h6>
          </q-card-section>
          <div class="q-ma-none q-px-none">
            <q-radio val="line" label="3- upto 9%" />
            <q-radio val="rectangle" label="6- upto 6%" />
            <q-radio val="ellipse" label="9- upto 7%" />
            <q-radio val="polygon" label="12- upto 8%" />
          </div>
          <q-card-actions
            class="bg-white text-primary flex justify-between q-my-lg"
          >
            <q-btn
              bordered
              style="
                width: 9rem;
                border: 1px solid rgba(231, 199, 37, 1);
                height: 1rem;
                font-size: 0.8rem;
                border-radius: 40rem;
              "
              label="Cancel"
              v-close-popup
              @click="
                inception = false;
                secondDialog = false;
              "
              class="q-px-sm"
            />
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
              @click="secondDialog = true"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="secondDialog" position="bottom" transition-show="fade">
        <q-card class="q-pa-lg">
          <q-card-header>
            <h6>Emergency Goal</h6>
          </q-card-header>
          <q-card-section class="q-px-none">
            <h6 class="text-subtitle2 text-grey-9">
              What is your emergency goal?
            </h6>
            <q-input label="Emergency" hint="eg. School fees" />
            <h6 class="text-subtitle2 text-grey-9">
              How much do you want to save monthly?
            </h6>
            <q-input hint="1,000" />
          </q-card-section>
          <q-card-section class="q-px-none">
            <q-item class="bg-warning">
              <q-item-section avatar>
                <img
                  src="../assets/Ellipse 19.png"
                  alt="savings"
                  style="width: 4rem; height: 4rem"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Your savings target is</q-item-label>
                <q-item-label caption lines="2">Ksh 3,000.</q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>

          <q-card-actions
            class="bg-white text-primary flex justify-between q-my-lg"
          >
            <q-btn
              bordered
              style="
                width: 9rem;
                border: 1px solid rgba(231, 199, 37, 1);
                height: 2rem;
                font-size: 0.8rem;
                border-radius: 40rem;
              "
              label="Cancel"
              v-close-popup
              @click="
                dialog = true;
                secondDialog = false;
              "
            />
            <q-btn
              rounded
              style="
                width: 9rem;
                height: 2rem;
                font-size: 0.8rem;
                border-radius: 40rem;
              "
              color="primary"
              label="Continue"
              v-close-popup
              @click="
                dialog = false;
                secondDialog = false;
                prompt = true;
              "
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog
        v-model="prompt"
        position="bottom"
        transition-show="fade"
        transition-hide="fade"
      >
        <q-card
          style="
            min-width: 350px;
            height: 20rem;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            border-top: 4px solid rgba(231, 199, 37, 1);
          "
        >
          <q-card-header>
            <h6 class="text-h5 q-pl-sm">Emergency Goal</h6>
          </q-card-header>

          <q-card-section
            class="q-pt-none flex column justify-between"
            style="height: 8rem"
            ><h6 class="text-grey-7 q-pl-sm" style="font-size: small">
              When would you like to start saving?
            </h6>
            <q-input
              v-model="date"
              mask="date"
              :rules="['date']"
              class="q-px-sm"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions
            class="bg-white text-primary flex justify-between q-my-lg"
          >
            <q-btn
              bordered
              style="
                width: 9rem;
                border: 1px solid rgba(231, 199, 37, 1);
                height: 2rem;
                font-size: 0.8rem;
                border-radius: 40rem;
              "
              label="Cancel"
              v-close-popup
              @click="
                dialog = false;
                secondDialog = true;
              "
            />
            <q-btn
              rounded
              style="
                width: 9rem;
                height: 2rem;
                font-size: 0.8rem;
                border-radius: 40rem;
              "
              color="primary"
              label="Continue"
              v-close-popup
              @click="
                dialog = false;
                secondDialog = false;
                prompt = false;
                reminder = true;
              "
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog
        v-model="reminder"
        position="bottom"
        transition-show="fade"
        transition-hide="fade"
      >
        <q-card
          style="
            min-width: 350px;
            height: 25rem;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            border-top: 4px solid rgba(231, 199, 37, 1);
          "
        >
          <q-card-header>
            <h6 class="text-h5 q-pl-sm">Emergency Goal</h6>
          </q-card-header>

          <q-card-section class="q-pt-none" style="height: rem"
            ><h6 class="text-grey-7" style="font-size: small">
              Would you like to set a reminder?
            </h6>
            <q-toggle
              keep-color
              v-model="toggle"
              color="primary"
              switch-label
              class="q-mt-lg"
            />
            <q-input
              v-model="date"
              mask="date"
              :rules="['date']"
              class="q-px-sm"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions
            class="bg-white text-primary flex justify-between q-my-lg"
          >
            <q-btn
              bordered
              style="
                width: 9rem;
                border: 1px solid rgba(231, 199, 37, 1);
                height: 2rem;
                font-size: 0.8rem;
                border-radius: 40rem;
              "
              label="Cancel"
              v-close-popup
              @click="
                dialog = false;
                secondDialog = true;
              "
            />
            <q-btn
              rounded
              style="
                width: 9rem;
                height: 2rem;
                font-size: 0.8rem;
                border-radius: 40rem;
              "
              color="primary"
              label="Continue"
              v-close-popup
              @click="
                dialog = false;
                secondDialog = false;
                prompt = false;
                card = true;
              "
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog
        v-model="card"
        position="bottom"
        transition-show="fade"
        transition-hide="fade"
      >
        <q-card
          style="
            min-width: 350px;
            height: 30rem;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            border-top: 4px solid rgba(231, 199, 37, 1);
          "
        >
          <q-card-header>
            <h6 class="text-h5 q-pl-sm">Emergency Goal</h6>
          </q-card-header>

          <q-card-section class="q-pt-none" style="height: rem"
            ><h6 class="text-grey-7" style="font-size: small">
              Would you like your saving automatically deducted from card?
            </h6>
            <q-toggle
              keep-color
              v-model="toggle"
              color="primary"
              switch-label
              class="q-mt-lg"
            />
            <q-input
              v-model="date"
              mask="date"
              :rules="['date']"
              class="q-px-sm"
              hint="Input the deduction date"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions
            class="bg-white text-primary flex justify-between q-my-lg"
          >
            <q-btn
              bordered
              style="
                width: 9rem;
                border: 1px solid rgba(231, 199, 37, 1);
                height: 2rem;
                font-size: 0.8rem;
                border-radius: 40rem;
              "
              label="Cancel"
              v-close-popup
              @click="
                dialog = false;
                secondDialog = true;
              "
            />
            <q-btn
              rounded
              style="
                width: 9rem;
                height: 2rem;
                font-size: 0.8rem;
                border-radius: 40rem;
              "
              color="primary"
              label="Continue"
              v-close-popup
              @click="
                dialog = false;
                secondDialog = false;
                prompt = false;
                summary = true;
              "
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog
        v-model="summary"
        position="bottom"
        transition-show="fade"
        transition-hide="fade"
      >
        <q-card
          style="
            min-width: 350px;
            height: 50rem;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            border-top: 4px solid rgba(231, 199, 37, 1);
          "
          class="q-pa-lg"
        >
          <q-card-header>
            <h6>Summary</h6>
          </q-card-header>
          <q-card-section class="q-px-none">
            <q-input
              v-model="text"
              placeholder="Emergency"
              hint="Goal Name"
              :dense="dense"
              disable
              readonly
            />
            <q-input
              v-model="text"
              placeholder="Ksh 1,000"
              hint="Monthly Saving"
              :dense="dense"
              disable
              readonly
            />
            <q-input
              v-model="text"
              placeholder="3 months"
              hint="Target Period"
              :dense="dense"
              disable
              readonly
            />
            <q-input
              v-model="text"
              placeholder="Ksh 3,000"
              hint="Target Amount"
              :dense="dense"
              disable
              readonly
            />
          </q-card-section>
          <q-card-section class="q-px-none row">
            <div class="flex column items-start q-mr-sm justify-center">
              <h6 class="text-subtitle2 text-grey-5">Autosave</h6>
              <q-toggle
                keep-color
                v-model="toggle"
                color="primary"
                switch-label
                class="q-mt-lg"
              />
              <q-input
                v-model="text"
                placeholder="30/12/2024"
                hint=" Deductin Date"
                :dense="dense"
                disable
                readonly
              />
            </div>
            <div class="flex column items-start justify-center">
              <h6 class="text-subtitle2 text-grey-5">Reminder</h6>
              <q-toggle
                keep-color
                v-model="toggle"
                color="primary"
                switch-label
                class="q-mt-lg"
              />
              <q-input
                v-model="text"
                placeholder="30/12/2024"
                hint=" Deductin Date"
                :dense="dense"
                disable
                readonly
              />
            </div>
          </q-card-section>

          <q-card-actions
            class="bg-white text-primary flex items-center justify-center q-my-lg"
          >
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
              label="Set Goal"
              v-close-popup
              @click="summary = false"
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
        <q-page-sticky position="bottom-top" :offset="[0, -30]">
          <q-fab icon="add" color="primary" @click="dialog = true"> </q-fab>
        </q-page-sticky>
      </q-footer>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const dialog = ref(false);
const toggle = ref(false);
const secondDialog = ref(false);
const prompt = ref(false);
const date = ref("2019/02/01");
const reminder = ref(false);
const card = ref(false);
const summary = ref(false);
</script>

<style scoped>
.q-header .background-circle {
  position: absolute;
  top: -5%;
  left: -3rem;
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  background: rgba(231, 199, 37, 0.12);
  z-index: 1;
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
