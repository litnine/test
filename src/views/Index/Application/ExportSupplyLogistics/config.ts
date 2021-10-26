export const KEY = 'ExportSupplyLogistics';

export const PROJECT_TYPE = 1;

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
