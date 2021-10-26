import DefaultGenerator from './DefaultGenerator';
import { PagingParams, PagingResult } from './types.d';

export interface BaseCompany {
  'company_id'?: number;
  'company_name': string;
  'usc_code': string;
  'charge_name': string;
  'b_link_name': string;
  'b_link_tel': string;
  't_link_name': string;
  't_link_tel': string;
  'company_type': number;
  'business_type': number[];
  'license_url': string;
  'sign': string[];
}

interface Company extends BaseCompany {
  'company_id': number;
}

interface CompanyListItem {
  'company_id': number;
  'company_name': string;
  'company_type': number;
  'company_type_cn': string;
}

interface BaseShop {
  'shop_name': string;
  'platform_name': string;
  'charge_name': string;
  'link_tel': string;
  'main_category': string[];
}

interface ShopItem extends BaseShop {
  'shop_id': number;
  'turnover': string;
}

export const saveTempCompany = DefaultGenerator.post<BaseCompany, { 'company_id': number }>('/master/company/temporary');

export const createOrUpdateCompany = DefaultGenerator.post<BaseCompany, { 'company_id': number }>('/master/company/addCompany');

export const getTempCompany = DefaultGenerator.post<void, Company>('/master/company/getTemporaryCompany');

export const getCompany = DefaultGenerator.post<{ 'company_id': number }, Company>('/master/company/getCompanyInfo');

export const listCompanies = DefaultGenerator.post<{
  'company_type'?: number;
  'company_name'?: string;
}, CompanyListItem[]>('/master/company/getCompanyList');

export const deleteCompany = DefaultGenerator.post<{ 'company_id': number }, void>('/master/company/deleteCompany');

export const listShops = DefaultGenerator.post<{
  'company_id'?: number;
  'sort_type'?: string;
} & PagingParams, PagingResult<ShopItem>>('/master/company/getShopList');

export const createShop = DefaultGenerator.post<{ 'company_id': number } & BaseShop, void>('/master/company/addShop');

export const deleteShopInBatch = DefaultGenerator.post<{ 'ids': number[] }, Company>('/master/company/deleteShop');

export const listPlatforms = DefaultGenerator.post<void, Array<{
  'platform_id': number;
  'platform_name': string;
}>>('/master/company/getPlatformList');
