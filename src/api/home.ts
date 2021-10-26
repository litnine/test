import DefaultGenerator from './DefaultGenerator';
import { BaseEnterprise } from './permission';

interface Enterprise {
  'e_id': number;
  'usc_code': string;
  'enterprise_name': string;
  'charge_name': string;
  'charge_cert_type': number;
  'charge_cert_type_cn': string;
  'charge_cert_num': string;
  'idcard_startDate': string;
  'idcard_endDate': string;
  'b_link_name': string;
  'b_link_tel': string;
  't_link_name': string;
  't_link_tel': string;
  'enterprise_type': string;
  'enterprise_type_cn': string;
  'business_type': number;
  'business_type_cn': string;
  'license_url': string;
  'create_time': string;
  'verify_status': number;
  'verify_status_cn': string;
}

export const getEnterpriseInfo = DefaultGenerator.post<void, {
  'info': {
    'id': number;
    'account': string;
    'phone': string;
    'email': string;
    'login_time': number;
    'create_time': number;
    'status': number;
    'is_deleted': 0 | 1;
    'session_id': string;
    'authorize': 0 | 1;
    'is_super': 0 | 1;
    'is_admin': 0 | 1;
    'warehouse_id': number;
    'e_id': number;
    'sharing_service': boolean;
    'logistics_service': boolean;
    'settle_service': boolean;
    'order_service': boolean;
    'purchase_service': boolean;
    'auth': string[] ;
    'enterprise': Enterprise | null;
  };
}>('/master/home/enterpriseInfo');

export const updateEnterpriseInfo = DefaultGenerator.post<BaseEnterprise, void>('/master/home/updateEnterprise');

export const getEntry = DefaultGenerator.post<void, Array<{
  'id': number;
  'icon': string; // 图标
  'entry_name': string; // 入口名称
  'jump_link': string; // 跳转链接
  'is_new': number; // 是否显示“new”：0否，1是
}>>('/master/home/getEntry');

export const getCarousel = DefaultGenerator.post<void, Array<{
  'id': number;
  'carousel_name': string;
  'carousel_pic': string;
  'sort': string;
}>>('/master/home/getCarousel');
