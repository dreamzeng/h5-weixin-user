import {asyncComponent} from '@/lib/utils'
const lawyerDetail=asyncComponent('pages/lawyer/lawyer-detail.vue');//律师详情
const lawyerService=asyncComponent('pages/lawyer/lawyer-service.vue');//律师更多服务

const enterpriseServiceList=asyncComponent('pages/enterpriseService/enterprise-service.vue');//企业服务打包
const enterpriseServicewrite=asyncComponent('pages/enterpriseService/enterprise-service-write.vue');//定制服务、提交需求
const subSuccess=asyncComponent('pages/enterpriseService/sub_success.vue');//定制成功、提交成功

const usefeedback=asyncComponent('pages/enterpriseService/feedback.vue');//意见反馈

const customerServicetop=asyncComponent('pages/customerService/customer-service-top.vue');//客服与帮助（一级目录）
const customerServicesecond=asyncComponent('pages/customerService/customer-service-second.vue');//客服与帮助（二级目录）
const customerServicedetail=asyncComponent('pages/customerService/customer-service-detail.vue');//客服与帮助（详情）

const texts=asyncComponent('pages/enterpriseService/text.vue');//demo


export let r = [
    {
        path: '/lawyerDetail',
        name: 'lawyerDetail',
        component: lawyerDetail,
        meta:{
            title:'律师详情'
        }
    },

    {
        path: '/lawyerService',
        name: 'lawyerService',
        component: lawyerService,
        meta:{
            title:'律师服务'
        }
    },

    {
        path: '/enterpriseServiceList',
        name: 'enterpriseServiceList',
        component: enterpriseServiceList,
        meta:{
            title:'企业服务'
        }
    },

    {
        path: '/enterpriseServicewrite',
        name: 'enterpriseServicewrite',
        component: enterpriseServicewrite,
        meta:{
            auth:true
        }
    },

    {
        path: '/texts',
        name: 'texts',
        component: texts,
    },

    {
        path: '/subSuccess',
        name: 'subSuccess',
        component: subSuccess,
        meta:{
            title:'提交成功'
        }
    },

    {
        path: '/usefeedback',
        name: 'usefeedback',
        component: usefeedback,
        meta:{
            title:'意见反馈',
            auth:true
        }
    },

    {
        path: '/customerServicetop',
        name: 'customerServicetop',
        component: customerServicetop,
        meta:{
            title:'客服与帮助'
        }
    },

    {
        path: '/customerServicesecond',
        name: 'customerServicesecond',
        component: customerServicesecond,
        meta:{
            title:'客服与帮助'
        }
    },

    {
        path: '/customerServicedetail',
        name: 'customerServicedetail',
        component: customerServicedetail,
    }
]