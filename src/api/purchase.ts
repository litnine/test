/* eslint-disable @typescript-eslint/camelcase */
import DefaultGenerator from './DefaultGenerator';
import { PagingResult } from './types.d';

export interface GetPurchaseInfo {
    'ep_id': number;
    'purchase_no': string;
    'total_goods_number': string;
    'total_fee': string;
    'purchase_time': string;
    'status': string;
    'total_no': string;
    'total_status': number;
    'total_trade_way': string;
}

interface Purchase {
    'page': number;
    'size': number;
    'purchase_no': string;
    'barcode': string;
    'status': string;
    'time_area': [string, string];
}

export interface Router {
    'lr_id': number;
    'route_name': string;
}
interface GoodsDetail {
    'epg_id': number;
    'main_photo': string;
    'goods_name': string;
    'barcode': string;
    'sku': string;
    'number': string;
    'price': string;
    'total': string;
}
export interface Detail {
    'ep_id': string;
    'purchase_no': string;
    'total_goods_number': string;
    'total_fee': string;
    'purchase_time': string;
    'status': string;
    'total_no': string;
    'total_status': string;
    'total_trade_way': string;
    'goods_detail': GoodsDetail[];
}

export const PurchaseInfo = DefaultGenerator.post<Purchase, PagingResult<GetPurchaseInfo>>('/master/supply_purchase/getPurchaseList');

export const Route = DefaultGenerator.get<{ 'lr_id': number }, Router[]>('/master/supply_purchase/getRoute');

export const GetDetail = DefaultGenerator.get<{ 'ep_id': number }, Detail>('/master/supply_purchase/getPurchaseInfo');

export const deleteBill = DefaultGenerator.post<{ 'epg_id': number }>('/master/supply_purchase/deletePurchaseGoods');

export const deletePurchase = DefaultGenerator.post<{ 'ep_id': number[] }>('/master/supply_purchase/deletePurchase');

export const exportPurchase = DefaultGenerator.post<{ 'ep_id': number[]; 'time_area': [ string, string ]}>('/master/supply_purchase/exportPurchase');
