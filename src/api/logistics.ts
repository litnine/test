import DefaultGenerator from './DefaultGenerator';

interface WarehouseNode {
    'warehouse_name': string;
    'warehouse_type': number;
    'warehouse_address': string;
    'customs_name': string;
    'account': string;
    'password': string;
    'repassword': string;
}
interface WarehouseInfo {
    'lw_id': number;
    'warehouse_name': string;
    'warehouse_type_zn': string;
    'warehouse_address': string;
    'customs_name': string;
    'account': string;
}
interface GetWarehouseNode {
    'lw_id': number;
    'warehouse_name': string;
    'warehouse_type': number;
    'warehouse_address': string;
    'customs_name': string;
    'account': string;
}
interface RouteInfo {
    'lw_id': number;
    'route_name': string;
    'detail': Detail[];
}

interface Detail {
    'sort': string;
    'warehouse_id': string;
    'warehouse_name': string;
    'type': string;
}

export interface AddRoute {
    'route_name': string;
    'detail': Detail[];
}
export interface GetRoute {
    'lr_id': number;
    'route_name': string;
    'detail': Detail[];
}
export interface GetWarehouse {
    'warehouse_info': WarehouseInfo[];
    'route_info': RouteInfo[];
}

export const GetWarehouseInfo = DefaultGenerator.post<{ 'company_id': '' }, GetWarehouse>('/master/supply_logistics/getLogisticInfo');

export const deleteBill = DefaultGenerator.post<{ 'lw_id': number }>('/master/supply_logistics/deleteWarehouse');

export const deleteRoute = DefaultGenerator.post<{ 'lr_id': number }>('/master/supply_logistics/deleteRoute');

// export const WarehouseList = DefaultGenerator.post<{ 'type': string }, WarehouseLists>('/master/supply_logistics/getPassWarehouseList');

export const WarehouseList = DefaultGenerator.post<
  { 'type': 'self' | 'common' },
  { 'warehouse_list': Pick<Detail, 'warehouse_id' | 'warehouse_name'>[] }
>('/master/supply_logistics/getPassWarehouseList');

export const WarehouseNode = DefaultGenerator.post<WarehouseNode>('/master/supply_logistics/addWarehouseNode');

export const saveWarehouseNode = DefaultGenerator.post<GetWarehouseNode>('/master/supply_logistics/saveWarehouseNode');

export const getWarehouseNode = DefaultGenerator.post<{ 'lw_id': number }, GetWarehouseNode>('/master/supply_logistics/getWarehouseNode');

export const AddRouteInfo = DefaultGenerator.post<AddRoute>('/master/supply_logistics/addRouteInfo');

export const saveRouteInfo = DefaultGenerator.post<GetRoute>('/master/supply_logistics/saveRouteInfo');

export const getRouteInfo = DefaultGenerator.post<{ 'lr_id': number }, GetRoute>('/master/supply_logistics/getRouteInfo');
