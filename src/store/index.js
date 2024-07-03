// src/stores/index.js
import { createPinia } from "pinia";
import { store } from "quasar/wrappers";

export const pinia = createPinia();

export default store(pinia);
