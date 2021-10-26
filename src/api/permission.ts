import DefaultGenerator from './DefaultGenerator';

export const login = DefaultGenerator.post<{
  'userName': string; // 账号
  'password': string; // 密码（前端两次md5加密）
  'verifyCode': string; // 验证码
}, boolean>('/master/index/userLogin');

export const AdminLogin = DefaultGenerator.post<{
  'adminName': string; // 账号
  'password': string; // 密码（前端两次md5加密）
  'verifyCode': string; // 验证码
}, boolean>('/admin/index/adminLogin');

export const AdminLogout = DefaultGenerator.post<void, void>('/admin/index/out');

export const logout = DefaultGenerator.post<void, void>('/master/index/out');

export interface BaseEnterprise {
  'uscCode': string; // 统一社会信用代码
  'enterpriseName': string; // 企业中文名称
  'chargeName': string; // 法人（负责人）姓名
  'chargeCertType': string; // 法人（负责人）证件类型
  'chargeCertNum': string; // 法人（负责人）证件号码
  'startDate': string; // 身份证有效起始日期
  'endDate': string; // 身份证有效结束日期
  'bLinkName': string; // 业务联系人真实姓名
  'bLinkTel': string; // 业务联系人手机
  'tLinkName': string; // 技术联系人真实姓名
  'tLinkTel': string; // 技术联系人手机
  'enterpriseType': string; // 企业类型：0 跨境电子商务平台企业，1 跨境电子商务企业，2 监管场所运营人，3 物流企业，4 支付企业，5 境内服务商
  'businessType': string; // 拟开展跨境电子商务业务类型：0：9610（零售出口），1：9710（B2B出口），2：9810（海外仓-出口），3：1210（保税出口），4：9610（直购出口）
  'licenseUrl': string; // 营业执照复印件地址
  'invite_code': string; // 邀请码
}

export interface AdminBaseEnterprise {
  'uscCode': string; // 统一社会信用代码
  'enterpriseName': string; // 企业中文名称
  'chargeName': string; // 法人（负责人）姓名
  'chargeCertType': string; // 法人（负责人）证件类型
  'chargeCertNum': string; // 法人（负责人）证件号码
  'startDate': string; // 身份证有效起始日期
  'endDate': string; // 身份证有效结束日期
  'bLinkName': string; // 业务联系人真实姓名
  'bLinkTel': string; // 业务联系人手机
  'tLinkName': string; // 技术联系人真实姓名
  'tLinkTel': string; // 技术联系人手机
  'enterpriseType': string; // 企业类型：0 跨境电子商务平台企业，1 跨境电子商务企业，2 监管场所运营人，3 物流企业，4 支付企业，5 境内服务商
  'businessType': string; // 拟开展跨境电子商务业务类型：0：9610（零售出口），1：9710（B2B出口），2：9810（海外仓-出口），3：1210（保税出口），4：9610（直购出口）
  'licenseUrl': string; // 营业执照复印件地址
}

export const register = DefaultGenerator.post<{
  'userName': string; // 用户名
  'password': string; // 密码
  'rePassword': string; // 确认密码
  'email': string; // 邮箱
  'enterprise'?: BaseEnterprise;
}, boolean>('/master/index/register');

export const AdminRegister = DefaultGenerator.post<{
  'adminName': string; // 用户名
  'password': string; // 密码
  'rePassword': string; // 确认密码
  'email': string; // 邮箱
  'enterprise'?: AdminBaseEnterprise;
}, boolean>('/admin/index/register');
