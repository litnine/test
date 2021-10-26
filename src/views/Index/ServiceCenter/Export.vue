<template>
  <el-main>
    <ServiceTabs
      class="main-box"
      :layout="layout"
    />
  </el-main>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@vue/composition-api';

import ServiceTabs from '@/components/ServiceTabs.vue';

import { preCheck as preCheckSupplyExchange } from '@/api/exportSupplyExchange';
import { preCheck as preCheckExportIndependentStation } from '@/api/exportIndependentStation';
import applicationConfig from '@/views/Index/Application/config';

export default defineComponent({
  name: 'ServiceExport',
  components: { ServiceTabs },
  setup() {
    return {
      layout: [
        {
          title: '商品服务',
          sections: [
            {
              title: '出口货源服务专区',
              items: [
                {
                  title: '出口货源共享',
                  description: '进口供应链、品牌商以及境外持货商家可作为供应商注册加入货源平台共享货源，供给进口企业和买手采购。',
                  icon: 'supervisor_account',
                  color: '#ffc300',
                  ...applicationConfig.NAME_ENTRANCE_MAP.ExportSupplySharing,
                },
                {
                  title: '出口货源采购',
                  description: '基础服务；对于开展跨境电商货物出口业务但不具备优质货源的企业或个人，可通过出口货源平台采购到多品类、高价格竞争优势的出口货源。',
                  icon: 'shopping_cart',
                  color: '#ffc300',
                  ...applicationConfig.NAME_ENTRANCE_MAP.ExportSupplyPurchase,
                },
              ],
            },
            {
              title: '跨境物流服务专区',
              items: [
                {
                  title: '跨境电商出口物流',
                  description: '基础服务；与货源采购搭配使用，办理该服务后获取转运物流中心系统账号，采购货物后能查看货物的物流、仓储、调拨情况等',
                  icon: 'call_split',
                  color: '#ffc300',
                  ...applicationConfig.NAME_ENTRANCE_MAP.ExportSupplyLogistics,
                },
                // {
                //   title: '国际货运代理',
                //   description: '为跨境电商出口企业提供国际货运代理服务，支持集运、多式联运等多种运输方式。将货物及时、安全地运至指定地点',
                //   icon: 'airplanemode_active',
                //   color: '#3c8be2',
                //   preCheck: null,
                //   route: null,
                // },
                // {
                //   title: '出口货物查验',
                //   description: '与海关监管场站开展业务合作，为出口电商企业提供兼容多种贸易方式的出口货物查验通关服务。',
                //   icon: 'security',
                //   color: '#00baad',
                //   preCheck: null,
                //   route: null,
                // },
                // {
                //   title: '货物转关',
                //   description: '根据出口企业实际出境地的不同，企业提供必要的转关资料，由平台协助企业办理出口货物的转关业务。',
                //   icon: 'autorenew',
                //   color: '#3c8be2',
                //   preCheck: null,
                //   route: null,
                // },
                // {
                //   title: '国内货物运输',
                //   description: '为企业提供国内货车租订服务，协助企业将货物运输至指定的仓库或海关监管场站。',
                //   icon: 'local_shipping',
                //   color: '#00baad',
                //   preCheck: null,
                //   route: null,
                // },
              ],
            },
            // {
            //   title: '仓储服务专区',
            //   items: [
            //     {
            //       title: '海外仓租赁',
            //       description: '平台合作多个海外仓，可以为想要通过跨境电商9810出口海外仓模式出口的企业提供境外仓储服务。',
            //       icon: 'card_giftcard',
            //       color: '#3c8be2',
            //       preCheck: null,
            //       route: null,
            //     },
            //     {
            //       title: '国内仓库租赁',
            //       description: '提供多个费用低、储存空间大的货物仓库，供企业自由地租赁货仓,储存出口货物.',
            //       icon: 'business_center',
            //       color: '#00baad',
            //       preCheck: null,
            //       route: null,
            //     },
            //     {
            //       title: 'WMS仓储管理系统',
            //       description: '提供管理仓库业务的仓储系统，可以支持一般贸易与跨境贸易货物的共同存放、分类监管。',
            //       icon: 'home',
            //       color: '#3c8be2',
            //       preCheck: null,
            //       route: null,
            //     },
            //   ],
            // },
            {
              title: '出口申报服务专区',
              items: [
                {
                  title: '出口订单申报',
                  description: '基础服务；为企业提供跨境电商货物出口的订单申报服务。企业作为电商企业主体提供各种订单数据，由平台协助向海关总署进行申报。',
                  icon: 'shopping_basket',
                  color: '#ffc300',
                  ...applicationConfig.NAME_ENTRANCE_MAP.ExportOrderReport,
                },
                // {
                //   title: '出口运单申报',
                //   description: '支持货物出口的运单申报，对接跨境物流企业，从物流企业处获取所需的运单信息并输送至海关数据中心。',
                //   icon: 'flight_takeoff',
                //   color: '#00baad',
                //   preCheck: null,
                //   route: null,
                // },
                // {
                //   title: '出口清单申报',
                //   description: '对接海关数据中心，可为企业提供跨境电商出口业务的清单申报服务。',
                //   icon: 'assignment',
                //   color: '#3c8be2',
                //   preCheck: null,
                //   route: null,
                // },
                // {
                //   title: 'B2B出口报关单申报',
                //   description: '平台支持9710跨境电商直接出口模式的报关单申报，一般情况下清单和报关单企业申报两者中的一个则可。特别地，若货物涉税则必须要申报报关单。',
                //   icon: 'find_in_page',
                //   color: '#00baad',
                //   preCheck: null,
                //   route: null,
                // },
                // {
                //   title: '海外仓出口申报',
                //   description: '与9710出口模式类似，企业可以通过平台进行9810出口海外仓业务的清单或报关单申报。而除此之外，9810出口模式还需企业申报海外仓的订仓单。',
                //   icon: 'event_note',
                //   color: '#3c8be2',
                //   preCheck: null,
                //   route: null,
                // },
              ],
            },
            {
              title: '出口资金服务专区',
              items: [
                {
                  title: '出口收结汇',
                  description: '与银行开展合作，由银行作为支付机构为跨境电商出口企业提供合法、低费率的出口收结汇服务。',
                  icon: 'account_balance_wallet',
                  color: '#ffc300',
                  preCheck: preCheckSupplyExchange,
                  route: { name: 'DoingExportSupplyExchange' },
                },
                // {
                //   title: '资金清算、分账',
                //   description: '企业在银行预留用于收取货款的资金账户，当货款打进该账户时，由银行根据企业提供的规则进行资金清算及分账。',
                //   icon: 'call_split',
                //   color: '#00baad',
                //   preCheck: null,
                //   route: null,
                // },
                // {
                //   title: '伞形账户办理',
                //   description: '企业可通过平台向银行申请一个绑定境外电商平台店铺的子账户，而店铺的收益则会由银行协助办理收结汇后打至该子账户。',
                //   icon: 'beach_access',
                //   color: '#3c8be2',
                //   preCheck: null,
                //   route: null,
                // },
                // {
                //   title: '国际收支申报',
                //   description: '通过平台提供的渠道进行出口收结汇业务的企业，银行可代为办理国际收支申报业务。',
                //   icon: 'airplay',
                //   color: '#3c8be2',
                //   preCheck: null,
                //   route: null,
                // },
              ],
            },
            // {
            //   title: '供应链金融服务专区',
            //   items: [
            //     {
            //       title: '质押贷款',
            //       description: '提供质押贷款的资金服务，企业可通过暂时质押货物，获取用于周转的资金。',
            //       icon: 'assignment_returned',
            //       color: '#00baad',
            //       preCheck: null,
            //       route: null,
            //     },
            //     {
            //       title: '保付代理',
            //       description: '企业可通过平台委托银行办理保付代理金融服务，增加流动资金。',
            //       icon: 'gavel',
            //       color: '#3c8be2',
            //       preCheck: null,
            //       route: null,
            //     },
            //   ],
            // },
            // {
            //   title: '技术服务专区',
            //   items: [
            //     {
            //       title: '出口独立站建设',
            //       description: '提供跨境电商出口独立站的建设服务，为企业搭建跨境电商出口平台，协助企业上传商品信息，对接货源并完成各项申报业务。',
            //       icon: 'desktop_windows',
            //       color: '#3c8be2',
            //       preCheck: preCheckExportIndependentStation,
            //       route: { name: 'DoingExportIndependentStation' },
            //     },
            //     {
            //       title: '系统运维',
            //       description: '平台从跨境物流、货源、资金等方面配备了四大功能系统，为用户提供综合服务，并负责系统的日常运营和维护。',
            //       icon: 'build',
            //       color: '#00baad',
            //       preCheck: null,
            //       route: null,
            //     },
            //     {
            //       title: '系统开发',
            //       description: '定制化平台配套的系统功能，根据实际需求帮助企业开发企业ERP、出口线上商城、微信小程序等。',
            //       icon: 'account_circle',
            //       color: '#3c8be2',
            //       preCheck: null,
            //       route: null,
            //     },
            //     {
            //       title: '系统培训',
            //       description: '为企业提供各大系统的用户使用指南，帮助企业尽快熟悉系统的相关操作事项，并配有专人随时为企业答疑。',
            //       icon: 'assignment',
            //       color: '#00baad',
            //       preCheck: null,
            //       route: null,
            //     },
            //     {
            //       title: '服务器搭建',
            //       description: '协助企业完成服务器的落地、云服务器的部署以及海关申报环境的搭建。',
            //       icon: 'filter_drama',
            //       color: '#3c8be2',
            //       preCheck: null,
            //       route: null,
            //     },
            //   ],
            // },
          ],
        },
        {
          title: '物流仓储',
          sections: [
            {
              title: '跨境物流服务专区',
              items: [
                {
                  title: '跨境电商出口物流',
                  description: '基础服务；与货源采购搭配使用，办理该服务后获取转运物流中心系统账号，采购货物后能查看货物的物流、仓储、调拨情况等',
                  icon: 'call_split',
                  color: '#ffc300',
                  ...applicationConfig.NAME_ENTRANCE_MAP.ExportSupplyLogistics,
                },
                {
                  title: '国际货运代理',
                  description: '为跨境电商出口企业提供国际货运代理服务，支持集运、多式联运等多种运输方式。将货物及时、安全地运至指定地点',
                  icon: 'airplanemode_active',
                  color: '#3c8be2',
                  preCheck: null,
                  route: null,
                },
                {
                  title: '出口货物查验',
                  description: '与海关监管场站开展业务合作，为出口电商企业提供兼容多种贸易方式的出口货物查验通关服务。',
                  icon: 'security',
                  color: '#00baad',
                  preCheck: null,
                  route: null,
                },
                {
                  title: '货物转关',
                  description: '根据出口企业实际出境地的不同，企业提供必要的转关资料，由平台协助企业办理出口货物的转关业务。',
                  icon: 'autorenew',
                  color: '#3c8be2',
                  preCheck: null,
                  route: null,
                },
                {
                  title: '国内货物运输',
                  description: '为企业提供国内货车租订服务，协助企业将货物运输至指定的仓库或海关监管场站。',
                  icon: 'local_shipping',
                  color: '#00baad',
                  preCheck: null,
                  route: null,
                },
              ],
            },
            {
              title: '仓储服务专区',
              items: [
                {
                  title: '海外仓租赁',
                  description: '平台合作多个海外仓，可以为想要通过跨境电商9810出口海外仓模式出口的企业提供境外仓储服务。',
                  icon: 'card_giftcard',
                  color: '#3c8be2',
                  preCheck: null,
                  route: null,
                },
                {
                  title: '国内仓库租赁',
                  description: '提供多个费用低、储存空间大的货物仓库，供企业自由地租赁货仓,储存出口货物.',
                  icon: 'business_center',
                  color: '#00baad',
                  preCheck: null,
                  route: null,
                },
                {
                  title: 'WMS仓储管理系统',
                  description: '提供管理仓库业务的仓储系统，可以支持一般贸易与跨境贸易货物的共同存放、分类监管。',
                  icon: 'home',
                  color: '#3c8be2',
                  preCheck: null,
                  route: null,
                },
              ],
            },
          ],
        },
        {
          title: '申报服务',
          sections: [
            {
              title: '出口申报服务专区',
              items: [
                {
                  title: '出口订单申报',
                  description: '基础服务；为企业提供跨境电商货物出口的订单申报服务。企业作为电商企业主体提供各种订单数据，由平台协助向海关总署进行申报。',
                  icon: 'shopping_basket',
                  color: '#ffc300',
                  ...applicationConfig.NAME_ENTRANCE_MAP.ExportOrderReport,
                },
                {
                  title: '出口运单申报',
                  description: '支持货物出口的运单申报，对接跨境物流企业，从物流企业处获取所需的运单信息并输送至海关数据中心。',
                  icon: 'flight_takeoff',
                  color: '#00baad',
                  preCheck: null,
                  route: null,
                },
                {
                  title: '出口清单申报',
                  description: '对接海关数据中心，可为企业提供跨境电商出口业务的清单申报服务。',
                  icon: 'assignment',
                  color: '#3c8be2',
                  preCheck: null,
                  route: null,
                },
                {
                  title: 'B2B出口报关单申报',
                  description: '平台支持9710跨境电商直接出口模式的报关单申报，一般情况下清单和报关单企业申报两者中的一个则可。特别地，若货物涉税则必须要申报报关单。',
                  icon: 'find_in_page',
                  color: '#00baad',
                  preCheck: null,
                  route: null,
                },
                {
                  title: '海外仓出口申报',
                  description: '与9710出口模式类似，企业可以通过平台进行9810出口海外仓业务的清单或报关单申报。而除此之外，9810出口模式还需企业申报海外仓的订仓单。',
                  icon: 'event_note',
                  color: '#3c8be2',
                  preCheck: null,
                  route: null,
                },
              ],
            },
          ],
        },
        {
          title: '资金服务',
          sections: [
            {
              title: '出口资金服务专区',
              items: [
                {
                  title: '出口收结汇',
                  description: '与银行开展合作，由银行作为支付机构为跨境电商出口企业提供合法、低费率的出口收结汇服务。',
                  icon: 'account_balance_wallet',
                  color: '#ffc300',
                  preCheck: preCheckSupplyExchange,
                  route: { name: 'DoingExportSupplyExchange' },
                },
                {
                  title: '资金清算、分账',
                  description: '企业在银行预留用于收取货款的资金账户，当货款打进该账户时，由银行根据企业提供的规则进行资金清算及分账。',
                  icon: 'call_split',
                  color: '#00baad',
                  preCheck: null,
                  route: null,
                },
                {
                  title: '伞形账户办理',
                  description: '企业可通过平台向银行申请一个绑定境外电商平台店铺的子账户，而店铺的收益则会由银行协助办理收结汇后打至该子账户。',
                  icon: 'beach_access',
                  color: '#3c8be2',
                  preCheck: null,
                  route: null,
                },
                {
                  title: '国际收支申报',
                  description: '通过平台提供的渠道进行出口收结汇业务的企业，银行可代为办理国际收支申报业务。',
                  icon: 'airplay',
                  color: '#3c8be2',
                  preCheck: null,
                  route: null,
                },
              ],
            },
            {
              title: '供应链金融服务专区',
              items: [
                {
                  title: '质押贷款',
                  description: '提供质押贷款的资金服务，企业可通过暂时质押货物，获取用于周转的资金。',
                  icon: 'assignment_returned',
                  color: '#00baad',
                  preCheck: null,
                  route: null,
                },
                {
                  title: '保付代理',
                  description: '企业可通过平台委托银行办理保付代理金融服务，增加流动资金。',
                  icon: 'gavel',
                  color: '#3c8be2',
                  preCheck: null,
                  route: null,
                },
              ],
            },
          ],
        },
        {
          title: '技术服务',
          sections: [
            {
              title: '技术服务专区',
              items: [
                {
                  title: '出口独立站建设',
                  description: '提供跨境电商出口独立站的建设服务，为企业搭建跨境电商出口平台，协助企业上传商品信息，对接货源并完成各项申报业务。',
                  icon: 'desktop_windows',
                  color: '#3c8be2',
                  preCheck: preCheckExportIndependentStation,
                  route: { name: 'DoingExportIndependentStation' },
                },
                {
                  title: '系统运维',
                  description: '平台从跨境物流、货源、资金等方面配备了四大功能系统，为用户提供综合服务，并负责系统的日常运营和维护。',
                  icon: 'build',
                  color: '#00baad',
                  preCheck: null,
                  route: null,
                },
                {
                  title: '系统开发',
                  description: '定制化平台配套的系统功能，根据实际需求帮助企业开发企业ERP、出口线上商城、微信小程序等。',
                  icon: 'account_circle',
                  color: '#3c8be2',
                  preCheck: null,
                  route: null,
                },
                {
                  title: '系统培训',
                  description: '为企业提供各大系统的用户使用指南，帮助企业尽快熟悉系统的相关操作事项，并配有专人随时为企业答疑。',
                  icon: 'assignment',
                  color: '#00baad',
                  preCheck: null,
                  route: null,
                },
                {
                  title: '服务器搭建',
                  description: '协助企业完成服务器的落地、云服务器的部署以及海关申报环境的搭建。',
                  icon: 'filter_drama',
                  color: '#3c8be2',
                  preCheck: null,
                  route: null,
                },
              ],
            },
          ],
        },
      ],
    };
  },
});
</script>
