import { getEnterpriseInfo } from '@/api/home';
import { ApiOutput } from '@/lib/axios-api-generator';
import WebStorageSynchro from './lib/web-storage-synchro';
// import { getCompany } from '@/api/enterprisemanagement';

export const loggedSynchro = new WebStorageSynchro<boolean>('APP_LOGGED', {
  type: Boolean,
});

export const userSynchro = new WebStorageSynchro<ApiOutput<typeof getEnterpriseInfo>['info']>('APP_USER');

// export const companySynchro = new WebStorageSynchro<typeof getCompany>('COMPANY_ID',{
//   type: String,
// });
