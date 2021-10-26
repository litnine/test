/* eslint-disable @typescript-eslint/camelcase */
import DefaultGenerator from './DefaultGenerator';

export interface BaseIndependentStation {
    'enterprise_name': string;
    'enterprise_type': number;
    'license_no': string;
    'register_place': string;
    'license_url': string;
    'passport_photo_front_url': string;
    'passport_photo_back_url': string;
    'holding_photo_url': string;
    'site_name': string;
    'site_type': number;
    'site_leader': string;
    'leader_phone': string;
    'leader_email': string;
}
export interface SupplyExchenge extends BaseIndependentStation{
    'service_id': number;
    'apply_no': string;
    'apply_time': string;
    'success_time': string;
    'apply_status': string;
    'step': number;
    'is_expedited': number;
    'u_id': number;
    'shop': Shop[];
}
export interface Shop {
    'platform_name': string;
    'shop_name': string;
    'effective_link': string;
    'bank_account': string;
    'shop_leader': string;
    'link_tel': string;
    'link_email': string;
}

export const getDetail = DefaultGenerator.post<{ 'service_id': number }, SupplyExchenge>('/master/independent_construction/applyInfo');

/**
 * 加急
 */
export const expedite = DefaultGenerator.post<{ 'service_id': number }>('/master/independent_construction/expedited');

export const cancel = DefaultGenerator.post<{ 'service_id': number }>('/master/independent_construction/revoke');
/**
 * 申请完成
 */
export const complete = DefaultGenerator.post<{ 'service_id': number }>('/master/independent_construction/applySuccess');

/**
 * 判断是否有正在办理的货源共享业务
 */
export const preCheck = DefaultGenerator.post('/master/independent_construction/judge');

export const next1 = DefaultGenerator.post<BaseIndependentStation, SupplyExchenge>('/master/export_exchange/applyExportExchange');

export const next2 = DefaultGenerator.post<
  { 'service_id': number; 'shop': Shop[] }
>('/master/export_exchange/saveShop', {
  data: {
    next_step: 1,
  },
});
export const getNodes = DefaultGenerator.post<
  { 'service_id': number }
>('/master/export_exchange/getShopList');
