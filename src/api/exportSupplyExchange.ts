/* eslint-disable @typescript-eslint/camelcase */
import DefaultGenerator from './DefaultGenerator';

export interface BaseSupplyExchenge {
    'agent_name': string;// 代理人姓名
    'agent_tel': string;// 代理人电话
    'agent_email': string;// 代理人邮箱
    'receipt_no': string;// 回执编号
    'enterprise_name': string;// 企业名称
    'enterprise_type': number;// 企业类型
    'license_no': string;// 注册编号
    'register_place': string;// 企业注册地
    'license_url': string;// 营业执照
}
export interface SupplyExchenge extends BaseSupplyExchenge{
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

export const getDetail = DefaultGenerator.post<{ 'service_id': number }, SupplyExchenge>('/master/export_exchange/applyInfo');

/**
 * 加急
 */
export const expedite = DefaultGenerator.post<{ 'service_id': number }>('/master/export_exchange/expedited');

export const cancel = DefaultGenerator.post<{ 'service_id': number }>('/master/export_exchange/revoke');
/**
 * 申请完成
 */
export const complete = DefaultGenerator.post<{ 'service_id': number }>('/master/export_exchange/applySuccess');

/**
 * 判断是否有正在办理的货源共享业务
 */
export const preCheck = DefaultGenerator.post('/master/export_exchange/judge');

export const save1 = DefaultGenerator.post<BaseSupplyExchenge, SupplyExchenge>('/master/export_exchange/saveInfo');

export const next1 = DefaultGenerator.post<BaseSupplyExchenge, SupplyExchenge>('/master/export_exchange/applyExportExchange');

export const save2 = DefaultGenerator.post<
  { 'service_id': number; 'shop': Shop[] }
>('/master/export_exchange/saveShop', {
  data: {
    next_step: 0,
  },
});

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
