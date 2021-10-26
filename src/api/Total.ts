import DefaultGenerator from './DefaultGenerator';
import { PagingResult } from './types.d';

export interface GetTotalInfo {
    'tep_id': number;
    'total_no': string;
    'create_time': string;
    'total_status': string;
    'route_name': string;
    'total_number': string;
    'total_price': number;
    'total_trade_way': string;
    'warehouse_name': string;
}
export interface Router {
    'lr_id': number;
    'route_name': string;
}

interface Total {
    'total_no': string;
    'purchase_no': string;
    'lr_id': string;
    'total_status': string;
    'time_area': [string, string];
}
interface Detail {
    'tep_id': number;
    'total_no': string;
    'create_time': string;
    'total_status': string;
    'route_name': string;
    'total_number': string;
    'total_price': string;
    'total_trade_way': string;
    'split_status': string;
    'warehouse_name': string;
    'total_logistics_no': string;
    'sub_total': number;
    'sub_order': Sub[];
}

interface Sub {
    'sep_id': number;
    'sub_no': string;
    'logistics_no': string;
    'total_fee': string;
    'goods_detail': GoodsDetail[];
}
interface GoodsDetail {
    'sepg_id': number;
    'sep_id': number;
    'eg_id': number;
    'barcode': string;
    'sku': string;
    'goods_name': string;
    'number': number;
    'price': string;
    'main_photo': string;
}

export const TotalInfo = DefaultGenerator.post<Total, PagingResult<GetTotalInfo>>('/master/total_purchase/getTotalList');

export const deleteBill = DefaultGenerator.post<{ 'tep_id': number[] }>('/master/total_purchase/deleteTotalBill');

export const Route = DefaultGenerator.get<{ 'lr_id': number }, Router[]>('/master/total_purchase/getRoute');

export const GetDetail = DefaultGenerator.get<{ 'tep_id': number }, Detail>('/master/total_purchase/getTotalInfo');

// export const GetDetail = DefaultGenerator.get<{ 'tep_id': number }, Detail>('/master/total_purchase/getTotalInfo');
