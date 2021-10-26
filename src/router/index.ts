import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '@/store';
import applicationConfig from '@/views/Index/Application/config';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/',
    component: () => import('@/views/Index/Layout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Index/Home.vue'),
      },
      {
        path: '/homemore',
        name: 'HomeMore',
        component: () => import('@/views/Index/HomeMore.vue'),
      },
      {
        path: '/application',
        name: 'Application',
        component: () => import('@/views/Index/Application/Layout.vue'),
        children: [
          {
            path: 'list',
            name: 'ApplicationList',
            component: () => import('@/views/Index/Application/List.vue'),
          },
          {
            path: 'doing/improve-enterprise-info',
            name: 'DoingImproveEnterpriseInfo',
            component: () => import('@/views/Index/Application/DoingImproveEnterpriseInfo.vue'),
            props: (route) => ({
              step: +route.query.step || 0,
            }),
          },
          {
            path: 'doing/export-supply-exchange',
            name: 'DoingExportSupplyExchange',
            component: () => import('@/views/Index/Application/DoingExportSupplyExchange.vue'),
            props: (route) => ({
              id: +route.query.id,
            }),
          },
          {
            path: 'detail/export-supply-exchange',
            name: 'DetailExportSupplyExchange',
            component: () => import('@/views/Index/Application/DetailExportSupplyExchange.vue'),
            props: (route) => ({
              id: +route.query.id,
            }),
          },
          {
            path: 'doing/export-independent-station',
            name: 'DoingExportIndependentStation',
            component: () => import('../views/Index/Application/DoingExportIndependentStation.vue'),
            props: (route) => ({
              id: +route.query.id,
            }),
          },
          {
            path: 'detail/export-independent-station',
            name: 'DetailExportIndependentStation',
            component: () => import('../views/Index/Application/DetailExportIndependentStation.vue'),
            props: (route) => ({
              id: +route.query.id,
            }),
          },
          ...applicationConfig.routes,
          {
            path: '',
            redirect: 'list',
          },
        ],
      },
      {
        path: '/service',
        name: 'ServiceCenter',
        component: () => import('@/views/Index/ServiceCenter/Layout.vue'),
        children: [
          {
            path: 'enterprise',
            name: 'ServiceEnterprise',
            component: () => import('@/views/Index/ServiceCenter/Enterprise.vue'),
          },
          {
            path: 'import',
            name: 'ServiceImport',
            component: () => import('@/views/Index/ServiceCenter/Import.vue'),
          },
          {
            path: 'export',
            name: 'ServiceExport',
            component: () => import('@/views/Index/ServiceCenter/Export.vue'),
          },
          {
            path: '/',
            redirect: 'import',
          },
        ],
      },
      {
        path: '/Order',
        name: 'OrderManagement',
        component: () => import('@/views/Index/Order/Layout.vue'),
        children: [
          {
            path: 'Purchase',
            name: 'PurchaseOrder',
            component: () => import('@/views/Index/Order/Purchase.vue'),
          },
          {
            path: 'PurchaseDetail',
            name: 'PurchaseDetailOrder',
            component: () => import('@/views/Index/Order/PurchaseDetail.vue'),
            props: (route) => ({
              id: +route.query.id,
            }),
          },
          {
            path: 'Total',
            name: 'TotalOrder',
            component: () => import('@/views/Index/Order/Total.vue'),
          },
          {
            path: 'TotalDetail',
            name: 'TotalDetailOrder',
            component: () => import('@/views/Index/Order/TotalDetail.vue'),
            props: (route) => ({
              id: +route.query.id,
            }),
          },
          {
            path: 'Logistics',
            name: 'LogisticsOrder',
            component: () => import('@/views/Index/Order/Logistics.vue'),
          },
          {
            path: '/',
            redirect: 'Total',
          },
        ],
      },
      {
        path: '/Commodity',
        name: 'CommodityManagement',
        component: () => import('@/views/Index/CommodityManagement/list.vue'),
      },
      {
        path: '/enterprise',
        name: 'EnterpriseManagement',
        component: () => import('@/views/Index/EnterpriseManagement/Layout.vue'),

        children: [
          {
            path: 'management/editing',
            name: 'EnterpriseEditing',
            component: () => import('@/views/Index/EnterpriseManagement/Editing.vue'),
            props: (route) => ({
              id: +route.query.id,
            }),
          },
          {
            path: 'list',
            name: 'EnterpriseList',
            component: () => import('@/views/Index/EnterpriseManagement/List.vue'),
          },
          {
            path: 'data',
            name: 'EnterpriseData',
            component: () => import('@/views/Index/EnterpriseManagement/Data.vue'),
            props: (route) => ({
              id: +route.query.id,
            }),
          },
          {
            path: 'management/add',
            name: 'EnterpriseAdd',
            component: () => import('@/views/Index/EnterpriseManagement/Add.vue'),
            props: (route) => ({
              id: +route.query.id,
            }),
          },
          {
            path: '/',
            redirect: 'list',
          },
        ],
      },
    ],
  },
  {
    path: '/*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth) && !store.state.logged) {
    next({
      name: 'Login',
      query: {
        redirect: to.fullPath,
      },
    });
  } else {
    next();
  }
});

export default router;
