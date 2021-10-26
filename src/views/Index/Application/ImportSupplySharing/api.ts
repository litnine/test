import DefaultGenerator from '@/api/DefaultGenerator';

interface BaseSupplySharing {
  'service_id'?: number;// 申请id（存在则更新，不存在则新增）
  'enterprise_name': string;// 企业全称
  'enterprise_type': number;// 企业类型：0有限责任公司，1个人独资企业，2合资企业，3其他
  'license_no': string;// 统一社会信用代码
  'register_place': string;// 企业注册地
  'license_url': string;// 营业执照
  'account': string;// 用户名
  'password': string;// 密码
  'rePassword': string;// 确认密码
  'invitation_code': string;// 平台邀请码
  'platform_name': string;// 平台简称
  'main_category': string;// 主营类目
  'link_name': string;// 联系人姓名
  'link_tel': string;// 联系电话
  'link_email': string;// 联系邮箱
}
interface SupplySharing extends Omit<BaseSupplySharing, 'rePassword'> {
  'service_id': number;
  'apply_no': string;
  'apply_time': string;
  'success_time': string;
  'apply_status': string;
  'step': number;
  'is_expedited': number;
  'u_id': number;
}

export const save = DefaultGenerator.post<BaseSupplySharing, SupplySharing>('/master/supply_sharing_import/saveInfo');

export const next = DefaultGenerator.post<BaseSupplySharing, SupplySharing>('/master/supply_sharing_import/applySupplySharing');

export const getDetail = DefaultGenerator.post<{ 'service_id': number }, SupplySharing>('/master/supply_sharing_import/applyInfo');

/**
 * 加急
 */
export const expedite = DefaultGenerator.post<{ 'service_id': number }>('/master/supply_sharing_import/expedited');

export const cancel = DefaultGenerator.post<{ 'service_id': number }>('/master/supply_sharing_import/revoke');

/**
 * 申请完成
 */
export const complete = DefaultGenerator.post<{ 'service_id': number }>('/master/supply_sharing_import/applySuccess');

/**
 * 判断是否有正在办理的货源共享业务
 */
export const preCheck = DefaultGenerator.post('/master/supply_sharing_import/judge');
