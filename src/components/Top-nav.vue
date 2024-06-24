<template>
  <div>
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
          <h6 class="text-grey-9 text-subtitle2 q-pl-lg">Hello, John Doe</h6>
        </div>

        <q-icon name="notifications_none" size="30px" color="black" />
      </q-toolbar>
    </q-header>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
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
</style>
