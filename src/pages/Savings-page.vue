<template>
  <div
    style="
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      height: 19rem;
      margin-top: 10px;
    "
  >
    <q-card class="my-card bg-white" style="height: 8rem">
      <q-card-section align="center">
        <h6 class="text-subtitle1 text-grey-8">Total Savings</h6>
        <h6 class="q-mt-sm">
          <span :class="{ blurred: !amountVisible }" class="q-mr-lg">
            Ksh. {{ user.savings }}
          </span>
          <q-icon
            :name="amountVisible ? 'visibility_off' : ' visibility'"
            @click="toggleVisibility"
          />
        </h6>
      </q-card-section>
    </q-card>
    <q-card class="my-card bg-warning" style="height: 10rem">
      <q-card-header class="q-ml-lg">
        <h6 class="text-subtitle1 q-mt-sm">Next Saving</h6>
        <h6 class="text-subtitle2 text-grey-8">Due on 12/08/2024</h6>
      </q-card-header>
      <q-card-section class="q-py-none q-px-none q-ma-sm full-width bg-white">
        <q-item
          class="q-py-sm q-px-none flex justify-between"
          style="width: 80%; margin: 0 auto"
        >
          <h6 class="text-subtitle1">Emergency</h6>
          <h6 class="text-subtitle1">Kes 1200</h6>
          <h6 class="text-subtitle1 text-primary">Pay</h6>
        </q-item>
      </q-card-section>
    </q-card>
  </div>

  <div class="q-mt-lg">
    <q-table
      title="Your Saving Goals"
      :rows="rows"
      :columns="columns"
      row-key="name"
      flat
      bordered
      :filter="filter"
      virtual-scroll
      class="q-ma-none q-pa-none"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="goalName" :props="props">
            {{ props.row.goalName }}
          </q-td>
          <q-td key="targetAmount" :props="props">
            {{ props.row.targetAmount }}
          </q-td>
          <q-td key="goalProgress" :props="props">
            {{ props.row.goalProgress }}
          </q-td>
          <q-td key="Actions" :props="props">
            <router-link :to="`/goal/${props.row.savingsId}`"
              ><q-icon name="more_horiz" size="30px" color="black"
            /></router-link>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useUserStore } from "src/store/user";
import { onMounted, ref } from "vue";

const amountVisible = ref(true);
const store = useUserStore();
const user = ref("");

const filter = ref("");
function toggleVisibility() {
  amountVisible.value = !amountVisible.value;
}

const columns = [
  {
    name: "goalName",
    required: true,
    label: "Goal",
    align: "left",
    field: (row) => row.goalName,
    sortable: true,
  },

  {
    name: "targetAmount",
    align: "center",
    align: "left",
    label: "Goal Target",
    field: (row) => row.targetAmount,
    sortable: true,
  },
  {
    name: "goalProgress",
    label: "Goal Progress",
    align: "left",
    field: (row) => row.goalProgress,
    sortable: true,
  },
  { name: "Actions", label: "Actions ", align: "left", field: "Actions" },
];
const rows = ref([]);

const fetchUser = async () => {
  try {
    await store.fetchUserProfile();
    user.value = store.currentUser;
    rows.value = store.currentUser.savingsGoals;
  } catch (error) {
    console.log("Error", error);
  }
};

onMounted(fetchUser);
</script>

<style lang="scss" scoped>
.blurred {
  font-size: 16px;
  color: transparent;
  text-shadow: 0 0 8px #000;
}
.my-card {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-self: center;
  justify-content: space-between;
}
</style>
