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

import applicationConfig from '@/views/Index/Application/config';

export default defineComponent({
  name: 'ServiceImport',
  components: { ServiceTabs },
  setup() {
    return {
      layout: [
        {
          title: '商品服务',
          sections: [
            {
              title: '进口货源服务专区',
              items: [
                {
                  title: '进口货源共享',
                  description: '进口供应链、品牌商以及境外持货商家可作为供应商注册加入货源平台共享货源，供给进口企业和买手采购。',
                  icon: 'supervisor_account',
                  color: '#ffc300',
                  ...applicationConfig.NAME_ENTRANCE_MAP.ImportSupplySharing,
                },
                {
                  title: '进口货源采购',
                  description: '基础服务；对于开展跨境电商货物进口业务但不具备优质货源的企业或个人，可通过进口货源平台采购到多品类、高价格竞争优势的进口货源。',
                  icon: 'shopping_cart',
                  color: '#ffc300',
                  ...applicationConfig.NAME_ENTRANCE_MAP.ImportSupplyPurchase,
                },
              ],
            },
          ],
        },
        {
          title: '物流仓储',
          sections: [
            {
              title: '进口物流服务专区',
              items: [
                {
                  title: '跨境电商进口物流',
                  description: '基础服务；与货源采购搭配使用，注册转运物流中心账号并设置进口物流路线，查看采购货物的物流、库存、调拨情况等。',
                  icon: 'call_split',
                  color: '#ffc300',
                  ...applicationConfig.NAME_ENTRANCE_MAP.ImportSupplyLogistics,
                },
                {
                  title: '进口货物通关',
                  description: '根据不同进口线路选择海关监管场所完成货物通关，企业需要提前在业务现场监管场完成备案，配合通关查验工作。',
                  icon: 'security',
                  color: '#00baad',
                  preCheck: null,
                  route: null,
                },
                {
                  title: '货物转区或转关',
                  description: '根据跨境电商进口模式不同，企业在货物物流过程中会产生转区或转关操作。',
                  icon: 'autorenew',
                  color: '#3c8be2',
                  preCheck: null,
                  route: null,
                },
                {
                  title: '中港车租赁',
                  description: '为企业提供中港车租赁服务，协助企业将存于香港的货物运输进境抵达监管场地。',
                  icon: 'directions_car',
                  color: '#3c8be2',
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
                  description: '直购模式中需要备货至海外仓并完成打包发货的企业和商家申请此项服务。',
                  icon: 'card_giftcard',
                  color: '#3c8be2',
                  preCheck: null,
                  route: null,
                },
                {
                  title: '保税仓租赁',
                  description: '保税模式中需要备货至保税仓并完成打包发货的企业和商家申请此项服务。',
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
              title: '进口申报服务专区',
              items: [
                {
                  title: '进口订单申报',
                  description: '基础服务；为企业提供跨境电商货物进口的订单申报服务。企业作为电商企业主体提供各种订单数据，由平台协助向海关总署进行申报。',
                  icon: 'shopping_basket',
                  color: '#ffc300',
                  preCheck: null,
                  route: null,
                },
                {
                  title: '进口运单申报',
                  description: '支持货物进口的运单申报，对接跨境物流企业，从物流企业处获取所需的运单信息并推送至海关数据中心。',
                  icon: 'flight_takeoff',
                  color: '#00baad',
                  preCheck: null,
                  route: null,
                },
                {
                  title: '进口支付单申报',
                  description: '与银行开展合作，由银行作为支付机构协助企业向海关申报支付信息。',
                  icon: 'monetization_on',
                  color: '#3c8be2',
                  preCheck: null,
                  route: null,
                },
                {
                  title: '进口清单申报',
                  description: '对接海关数据中心，可为企业提供跨境电商进口业务的清单申报服务。',
                  icon: 'assignment',
                  color: '#00baad',
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
              title: '进口资金服务专区',
              items: [
                {
                  title: '进口购付汇',
                  description: '与银行开展合作，由银行作为支付机构为跨境电商进口企业提供合法、低费率的进口购结汇服务。',
                  icon: 'account_balance_wallet',
                  color: '#ffc300',
                  preCheck: null,
                  route: null,
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
                  title: '国际收支申报',
                  description: '通过平台提供的渠道进行进口购结汇业务的企业，银行可代为办理国际收支申报业务。',
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
                  title: '进口独立站建设',
                  description: '提供跨境电商进口独立站的建设服务，为企业搭建跨境电商进口平台，协助企业上传商品信息，对接货源并完成各项申报业务。',
                  icon: 'desktop_windows',
                  color: '#3c8be2',
                  preCheck: null,
                  route: null,
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
                  description: '定制化平台配套的系统功能，根据实际需求帮助企业开发企业ERP、进口线上商城、微信小程序等。',
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
