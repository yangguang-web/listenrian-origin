import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component:()=>import('../components/page/Login.vue'),   
        },
        {
            path: '/',
            component:()=>import('../components/common/Home.vue'),
            children:[
                {
                    path: '/index',
                    component:()=>import('../components/page/Index.vue'),
                    meta: { title: '系统首页'}
                },
                {
                    path: '/userlist',
                    component:()=>import('../components/page/SetUser.vue'),
                    meta: { title: '用户管理'}
                },
                {
                    path: '/collectstartegy',
                    component:()=>import('../components/page/SetCollect.vue'),
                    meta: { title: '采集策略' }
                },
                {
                    path: '/statusofcapture',
                    component:()=>import('../components/page/StatusCapture.vue'),
                    meta: { title: '采集终端' }
                },
                {
                    path: '/capitallist',
                    component:()=>import('../components/page/CapitalList.vue'),
                    meta: { title: '网络资产' }
                },
                {
                    path: '/departmentip',
                    component:()=>import('../components/page/DepartmentIP.vue'),
                    meta: { title: '单位网段' }
                },
                {
                    path: '/logs',
                    component:()=>import('../components/page/Logs.vue'),
                    meta: { title: '审计日志' }
                },
                {
                    path: '/unnormallist',
                    component:()=>import('../components/page/UnnormalList.vue'),
                    meta: { title: '违规事件' }
                },
                {
                    path: '/warninglist',
                    component:()=>import('../components/page/WarningList.vue'),
                    meta: { title: '安全事件' }
                },
                {
                    path: '/rulesetting',
                    component:()=>import('../components/page/RuleSetting.vue'),
                    meta: { title: '规则管理' }
                },
                {
                    path: '/datacontent',
                    component:()=>import('../components/page/DataContent.vue'),
                    meta: { title: '数据目录' }
                },
                {
                    path: '/httpanalysis',
                    component:()=>import('../components/page/HttpAnalysis.vue'),
                    meta: { title: 'HTTP分析' }
                },
                {
                    path: '/sessionanalysis',
                    component:()=>import('../components/page/SessionAnalysis.vue'),
                    meta: { title: '会话分析' }
                },
                {
                    path: '/dnsanalysis',
                    component:()=>import('../components/page/DNSAnalysis.vue'),
                    meta: { title: 'DNS分析' }
                },
                {
                    path: '/eventtraceback',
                    component:()=>import('../components/page/EventTraceback.vue'),
                    meta: { title: '事件回溯' }
                },
                {
                    path: '/normalanalysis',
                    component:()=>import('../components/page/NormalAnalysis.vue'),
                    meta: { title: '分析报告' }
                },
                {
                    path: '/secureanalysis',
                    component:()=>import('../components/page/SecureAnalysis.vue'),
                    meta: { title: '安全分析' }
                },
                {
                    path: '/detail',
                    component:()=>import('../components/page/DetailTraceback.vue'),
                    meta: { title: '会话回溯' }
                },
                // secureanalysis normalanalysis dnsanalysis eventtraceback httpanalysis datacontent rulesetting warninglist  capitallist departmentip unnormallist
                {
                    path: '/accesslimit',
                    component:()=>import('../components/page/SetAccess.vue'),
                    meta: { title: '访问限制' }
                },
                {
                    path: '/supersearch',
                    component:()=>import('../components/page/SuperSearch.vue'),
                    meta: { title: '超级搜索' }
                },
                {
                    path: '/setdevice',
                    component:()=>import('../components/page/SetDevice.vue'),
                    meta: { title: '设备管理' }
                },
                {
                    path: '/datacenter',
                    component:()=>import('../components/page/DataCenter.vue'),
                    meta: { title: '数据中心'}
                }
            ]
        },
        {
            path: '/login',
            component:()=>import('../components/page/Login.vue'),
        },
        {
            path: '/404',
            component:()=>import('../components/page/404.vue')
        },
        // {
        //     path: '/403',
        //     component: resolve => require(['../components/page/403.vue'], resolve)
        // },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
