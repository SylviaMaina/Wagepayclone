import { defineStore } from "pinia";

export const useGoalStore = defineStore("goal", {
  state: () => ({
    goalType: false,
    interest: 0,
    startDate: "",
    goalName: "",
    targetAmount: 0,
    autoSave: false,
    reminder: false,
    deductDate: "",
  }),
  actions: {
    nextStep() {
      if (this.step < 6) this.step++;
    },
    prevStep() {
      if (this.step > 1) this.step--;
    },
    resetSteps() {
      this.step = 1;
    },
  },
});
