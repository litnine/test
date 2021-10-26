import DefaultGenerator from '@/api/DefaultGenerator';

export interface BaseWarehouse {
  'warehouse_id'?: string;
  'warehouse_name': string;
  'warehouse_type': string;
  'warehouse_address': string;
  'customs_name': string;
  'account': string;
  'password': string;
  'rePassword'?: string;
}

export interface Warehouse extends BaseWarehouse {
  'warehouse_id': string;
  'rePassword': string;
}

interface LogisticsRouteDetailItem {
  'sort': string;
  'warehouse_id': string;
  'warehouse_name': string;
}

interface LogisticsRoute {
  'route_name': string;
  'detail': LogisticsRouteDetailItem[];
}

interface BaseSupplyLogistics {
  'service_id'?: number;// 申请id（存在则更新，不存在则新增）
  'enterprise_name': string;// 企业全称
  'enterprise_type': number;// 企业类型：0有限责任公司，1个人独资企业，2合资企业，3其他
  'license_no': string;// 统一社会信用代码
  'register_place': string;// 企业注册地
  'license_url': string;// 营业执照
  'account': string;// 用户名
  'password': string;// 密码
  'rePassword': string;// 确认密码
  'link_name': string;// 联系人姓名
  'link_tel': string;// 联系电话
  'link_email': string;// 联系邮箱
}
export interface SupplyLogistics extends BaseSupplyLogistics {
  'service_id': number;
  'apply_no': string;
  'apply_time': string;
  'success_time': string;
  'apply_status': string;
  'step': number;
  'is_expedited': number;
  'u_id': number;
  'warehouse': Warehouse[];
  'route': LogisticsRoute[];
}

export const getDetail = DefaultGenerator.post<{ 'service_id': number }, SupplyLogistics>('/master/supply_logistics/applyInfo');

/**
 * 加急
 */
export const expedite = DefaultGenerator.post<{ 'service_id': number }>('/master/supply_logistics/expedited');

export const cancel = DefaultGenerator.post<{ 'service_id': number }>('/master/supply_logistics/revoke');

/**
 * 申请完成
 */
export const complete = DefaultGenerator.post<{ 'service_id': number }>('/master/supply_logistics/applySuccess');

/**
 * 判断是否有正在办理的货源共享业务
 */
export const preCheck = DefaultGenerator.post('/master/supply_logistics/judge');

export const save1 = DefaultGenerator.post<BaseSupplyLogistics, SupplyLogistics>('/master/supply_logistics/saveInfo');

export const next1 = DefaultGenerator.post<BaseSupplyLogistics, SupplyLogistics>('/master/supply_logistics/applySupplyLogistics');

export const save2 = DefaultGenerator.post<
  { 'service_id': number; 'warehouse': BaseWarehouse[] },
  SupplyLogistics
>('/master/supply_logistics/saveWarehouse', {
  data: {
    next_step: 0,
  },
});

export const next2 = DefaultGenerator.post<
  { 'service_id': number; 'warehouse': BaseWarehouse[] },
  SupplyLogistics
>('/master/supply_logistics/saveWarehouse', {
  data: {
    next_step: 1,
  },
});

export const getNodes = DefaultGenerator.post<
  { 'service_id': number; 'type': 'self' | 'common' },
  { 'warehouse_list': Pick<Warehouse, 'warehouse_id' | 'warehouse_name'>[] }
>('/master/supply_logistics/getWarehouseList');

export const save3 = DefaultGenerator.post<
  Pick<SupplyLogistics, 'service_id' | 'route'>,
  SupplyLogistics
>('/master/supply_logistics/saveRoute', {
  data: {
    next_step: 0,
  },
});

export const next3 = DefaultGenerator.post<
  Pick<SupplyLogistics, 'service_id' | 'route'>,
  SupplyLogistics
>('/master/supply_logistics/saveRoute', {
  data: {
    next_step: 1,
  },
});
