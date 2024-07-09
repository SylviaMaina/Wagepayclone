<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <RequestForm v-model:modelValue="prompt" />
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

                      <q-item-section class="text-red" @click="handleLogout"
                        >Logout</q-item-section
                      >
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
          <q-fab icon="add" color="primary" @click="requestAdvance"> </q-fab>
        </q-page-sticky>
      </q-footer>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import RequestForm from "../components/Request-form.vue";
import { useUserStore } from "src/store/user";
import { useQuasar } from "quasar";

const prompt = ref(false);
const store = useUserStore();
const user = ref(null);
const $q = useQuasar();

onMounted(async () => {
  try {
    await store.fetchUserProfile();
    user.value = store.currentUser;
  } catch (error) {
    console.log("Error", error);
  }
});
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

const handleLogout = () => {
  store.logout();
  router.push("/login");
};
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
