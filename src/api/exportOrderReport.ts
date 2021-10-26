/* eslint-disable @typescript-eslint/camelcase */
import DefaultGenerator from './DefaultGenerator';

interface Step1 {
  'service_id'?: number; // 申请id（存在则更新，不存在则新增）
  'single_window_registration': number; // 是否完成中国国际贸易单一窗口注册
  'operator_filing': number; // 是否完成对外贸易经营者备案
  'enterprise_filing': number; // 是否完成海关企业备案
  'port_access': number; // 是否完成电子口岸入网并制卡
  'dxpid_apply': number; // 是否完成DXPID申请
}

interface Step2 {
  'service_id': number; // 申请id
  'contract_url': string; // 合同
}

interface Step3 {
  'service_id': number; // 申请id
  'enterprise_name': string; // 办理企业
  'enterprise_type': number; // 企业类型
  'license_no': string; // 统一社会信用代码
  'register_place': string; // 企业注册地
  'license_url': string; // 营业执照
  'e_custom_num': string; // 电商企业海关备案号
  'platform_name': string; // 电商平台企业名
  'p_custom_num': string; // 电商平台海关备案号
  'port_name': string; // 现场海关或口岸名
  'dxpid': string; // DXPID
  'cart_account': string; // 操作员卡账号
  'cart_password': string; // 操作员卡密码
  'single_window': number; // 单一窗口
  'enterprise_record_number': string; // 企业备案编号
  'ftp_account': string; // 加签客户端ftp账号
  'ftp_password': string; // 加签客户端ftp密码
}

export interface ExportOrderReport extends Step1, Step2, Step3 {
  'service_id': number;
  'apply_no': string;
  'apply_time': string;
  'success_time': string;
  'apply_status': string;
  'step': number;
  'is_expedited': number;
  'u_id': number;
}

export const getDetail = DefaultGenerator.post<{ 'service_id': number }, ExportOrderReport>('/master/export_order/applyInfo');

export const save1 = DefaultGenerator.post<Step1, ExportOrderReport>('/master/export_order/preCheck', {
  data: {
    next_step: 0,
  },
});

export const next1 = DefaultGenerator.post<Step1, ExportOrderReport>('/master/export_order/preCheck', {
  data: {
    next_step: 1,
  },
});

export const next2 = DefaultGenerator.post<Step2, ExportOrderReport>('/master/export_order/uploadContract');

export const save3 = DefaultGenerator.post<Step3, ExportOrderReport>('/master/export_order/fillInformation', {
  data: {
    next_step: 0,
  },
});

export const next3 = DefaultGenerator.post<Step3, ExportOrderReport>('/master/export_order/fillInformation', {
  data: {
    next_step: 1,
  },
});

/**
 * 加急
 */
export const expedite = DefaultGenerator.post<{ 'service_id': number }>('/master/export_order/expedited');

export const cancel = DefaultGenerator.post<{ 'service_id': number }>('/master/export_order/revoke');

/**
 * 申请完成
 */
export const complete = DefaultGenerator.post<{ 'service_id': number }>('/master/export_order/applySuccess');

/**
 * 判断是否有正在办理的货源共享业务
 */
export const preCheck = DefaultGenerator.post('/master/export_order/judge');
