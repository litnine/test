import DefaultGenerator from './DefaultGenerator';
import { PagingResult } from './types.d';
// import { String } from 'lodash';

export interface ListItem {
    'eg_id': number;
    'main_photo': string;
    'goods_name': string;
    'barcode': string;
    'type_name': string;
    'price': string;
    'shelf_status': number;
    'shelf_status_zn': string;
}

export interface GoodsInfo {
    'eg_id': number;
    'type_id': number;
    'goods_name': string;
    'barcode': string;
    'hscode': string;
    'country': string;
    'sku': string;
    'ems_no': string;
    'attr_name': string;
    'ingredient': string;
    'gross_weight': string;
    'net_weight': string;
    'currency': string;
    'form_price': string;
    'unit': string;
    'price': string;
    'std_unit': string;
    'unit_sum1': string;
    'sec_unit': string;
    'unit_sum2': string;
    'main_photo': string;
}

export const listGetGoods = DefaultGenerator.post<{
    'page': number;
    'size': number;
    'goods_name': string;
    'keyword': string;
}, PagingResult<ListItem>>('/master/supply_sharing/getGoodsList');

export const createOrUpdateCompany = DefaultGenerator.post<{ 'company_id': number }>('/master/company/addCompany');

export const deleteBill = DefaultGenerator.post<{ 'eg_id': [number] }>('/master/supply_sharing/deleteGoods');

export const setGoodsStatus = DefaultGenerator.post<{ 'eg_id': number[]; 'shelf_status': number }>('/master/supply_sharing/setGoodsStatus');

export const getAllType = DefaultGenerator.post<{ 'eg_id': number[] }, {}[]>('/master/supply_sharing/getAllType');

export const getTypeList = DefaultGenerator.post<{ 'type_name': string }, {}[]>('/master/supply_sharing/getTypeList');

export const deleteType = DefaultGenerator.post<{ 'type_id': string }, {}[]>('/master/supply_sharing/deleteType');

export const addType = DefaultGenerator.post<{ 'parent_id': string; 'type_name': string }>('/master/supply_sharing/addType');

export const saveType = DefaultGenerator.post<{ 'type_id': string; 'type_name': string }>('/master/supply_sharing/saveType');

export const getTypeById = DefaultGenerator.post<{ 'type_id': string }, {}>('/master/supply_sharing/getTypeById');

export const getGoodsInfo = DefaultGenerator.post<{ 'eg_id': string }, GoodsInfo>('/master/supply_sharing/getGoodsInfo');

export const saveGoodsDetail = DefaultGenerator.post<GoodsInfo>('/master/supply_sharing/saveGoodsDetail');

export const exportGoodsList = DefaultGenerator.post<{ 'eg_id': number[] }>('/master/supply_sharing/exportGoodsList');
