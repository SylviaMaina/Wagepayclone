const routes = [
  { path: "/", component: () => import("pages/Onboarding/Onboarding-1.vue") },
  {
    path: "/onboarding2",
    component: () => import("pages/Onboarding/Oboarding-2.vue"),
  },
  {
    path: "/onboarding3",
    component: () => import("pages/Onboarding/Onboarding-3.vue"),
  },
  {
    path: "/onboarding4",
    component: () => import("pages/Onboarding/Onboarding-4.vue"),
  },
  {
    path: "/active",
    component: () => import("pages/Onboarding/Landing-page.vue"),
  },
  {
    path: "/info",
    component: () => import("pages/Auth/Personal-info.vue"),
  },
  {
    path: "/login",
    component: () => import("pages/Auth/Log-in.vue"),
  },
  {
    path: "/verify",
    component: () => import("pages/Auth/Verify-code.vue"),
  },
  {
    path: "/secure",
    component: () => import("pages/Auth/Secure-acc.vue"),
  },

  {
    path: "/",
    name: "Home",
    component: () => import("layouts/MainLayout.vue"),

    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("pages/Home-page.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/advance",
        name: "Advance",
        component: () => import("pages/Salary-advance.vue"),
      },
      {
        path: "/goal/:goalId",
        name: "Goal",
        component: () => import("pages/Goal-page.vue"),
      },
      {
        path: "/rewards",
        name: "Rewards",
        component: () => import("pages/Rewards-page.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "Advance",
    component: () => import("layouts/AdvanceLayout.vue"),

    children: [
      {
        path: "/advance",
        name: "Advance",
        component: () => import("pages/Salary-advance.vue"),
      },
      {
        path: "/savings",
        name: "Savings",
        component: () => import("pages/Savings-page.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "saving",
    component: () => import("layouts/SavingLayout.vue"),

    children: [
      {
        path: "/savings",
        name: "Savings",
        component: () => import("pages/Savings-page.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "bills",
    component: () => import("layouts/SavingLayout.vue"),

    children: [
      {
        path: "/bills",
        name: "Bills",
        component: () => import("pages/Bills-page.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
