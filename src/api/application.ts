import DefaultGenerator from './DefaultGenerator';
import {
  PagingParams,
  PagingResult,
} from './types.d';

export const listApplications = DefaultGenerator.post<PagingParams, PagingResult<{
  'id': number; // 申请记录id
  'service_id': number; // 对应每个项目的申请记录id
  'apply_no': string; // 申请单号
  'project_type': number; // 项目类型：0跨境电商出口货源共享，1跨境电商出口物流，2跨境电商出口结汇，3跨境电商出口订单申报 4跨境电商出口货源采购
  'project_type_cn': string;
  'apply_time': string; // 申请时间
  'apply_status': string; // 申请进度
  'step': number; // 对应每个项目申请的步骤
}>>('/master/apply_list/getApplyList');

export const cancelInBatch = DefaultGenerator.post<{ id: number[] }>('/master/apply_list/batchRevocation');
