export const KEY = 'ExportOrderReport';

export const PROJECT_TYPE = 3;

export { preCheck } from './api';

export const routes = {
  doing: {
    path: `doing/${KEY}`,
    name: `Doing${KEY}`,
    component: () => import('./Doing.vue'),
  },
  detail: {
    path: `detail/${KEY}`,
    name: `Detail${KEY}`,
    component: () => import('./Detail.vue'),
  },
};
