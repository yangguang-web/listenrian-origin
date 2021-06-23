<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse"   router>
            <template v-for="item in items">
                <!-- 如果有子菜单 -->
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index" v-if="item.title!='运维工具'">
                        <template slot="title">
                            <i :class="item.icon" id="icons"></i><span slot="title" id="menutitle">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">    
                            <i :class="subItem.icon" id="icons"></i><span slot="title"  class="subtitle">{{ subItem.title }}</span>                               
                        </el-menu-item>
                    </el-submenu>
                </template>
                <!-- 没有子选项的渲染 -->
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon" id="icons"></i><span slot="title" id="menutitle">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>
<script>
    import bus from '../common/bus';
    export default {
        data(){
            return {
                collapse: false,
                //超级管理员可见菜单
                items:[
                    {
                        icon: 'el-icon-house',
                        index: 'index',
                        title: '系统首页'
                    },
                    // {
                    //     icon: 'el-icon-monitor',
                    //     index: 'datacenter',
                    //     title: '大屏数据'
                    // },
                    {
                        icon: 'el-icon-s-data',
                        index: 'datacenter2',
                        title: '性能分析',
                        subs:[
                            {
                                index: 'sessionanalysis',
                                title: '会话分析'
                            },
                            {
                                index: 'httpanalysis',
                                title: 'HTTP分析'
                            },
                            {
                                index: 'dnsanalysis',
                                title: 'DNS分析'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-data-analysis',
                        index: 'ploysetting',
                        title: '安全分析',
                        subs: [
                            {
                                index: 'secureanalysis',
                                title: '安全报告'
                            },
                            {
                                index: 'warninglist',
                                title: '安全事件'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-s-claim',
                        index: 'viewbytime',
                        title: '合规分析',
                            subs: [
                                {
                                    index: 'normalanalysis',
                                    title: '分析报告'
                                },
                                {
                                    index: 'unnormallist',
                                    title: '违规事件'
                                },
                                {
                                    index: 'rulesetting',
                                    title: '规则管理'
                                }
                            ]
                    },{
                        icon: 'el-icon-s-order',
                        index: 'datacontent',
                        title: '数据目录'
                    },
                    {
                        icon: 'el-icon-search',
                        index: 'supersearch',
                        title: '超级搜索'
                    },
                    {
                        icon: 'el-icon-s-promotion',
                        index: 'eventtraceback',
                        title: '事件回溯'
                    },
                    {
                        icon: 'el-icon-coin',
                        index: 'viewbytime5',
                        title: '资产管理',
                            subs: [
                                {
                                    index: 'capitallist',
                                    title: '网络资产'
                                },
                                {
                                    index: 'departmentip',
                                    title: '单位网段'
                                },
                            ]
                    },
                    {
                        icon: 'el-icon-s-platform',
                        index: 'viewbytime6',
                        title: '运行状态',
                            subs: [
                                {
                                    index: 'statusofcapture',
                                    title: '采集终端'
                                },
                            ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'viewbytime7',
                        title: '系统设置',
                            subs: [
                                {
                                    index: 'setdevice',
                                    title: '设备管理'
                                },
                                {
                                    index: 'collectstartegy',
                                    title: '采集策略'
                                },
                                {
                                    index: 'accesslimit',
                                    title: '访问限制'
                                },
                                {
                                    index: 'userlist',
                                    title: '用户管理'
                                },
                            ]
                    },
                    {
                        icon: 'el-icon-printer',
                        index: 'logs',
                        title: '审计日志'
                    },
                ],
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        methods:{
            // 根据登录身份显示不同的菜单
            // diff(){
            //     if(localStorage.getItem('role')=='admin'){
            //         this.items=this.items;
            //     }
            //     else{
            //         this.items=this.ordinary;
            //     }
            // },
            logout(){
                window.localStorage.clear();
                this.$router.push('/login');
            }
        },
    }
</script>
<style>
.el-submenu__icon-arrow{
    margin-top: -5px;
    font-size: 14px;
    font-weight: bold;
}
</style>
<style scoped>
    .el-menu{
        border-right: 1px solid #ededed;
        border-right: none;
    }
    /* 侧边栏定位 */
    .sidebar{
        display:block;
        position:absolute;
        left:0;
        top: 60px;
        bottom:0;
        overflow-y:scroll;
        width:220px;
        border:none;
        clear:both;
    }
    /* 滚动条样式 */
    .sidebar::scrollbar{
        width: 0;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    /* 侧边栏箭头 */
    .el-submenu__icon-arrow{
        font-weight: bold;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: auto;
    }
    .sidebar > ul {
        height:100%;
    }
    /* 图标 */
    #icons{
        font-weight: bold;
        padding-left:5px;
    }
    /* 一级标题 */
    #menutitle{
        font-size: 16px;
        padding-left: 15px;
    }
    /* 二级标题 */
    .subtitle{
        font-size: 16px;
        padding-left: 20px;
    }
    @media screen and (min-width: 1920px){
        #icons{
            padding-left:0px;
        }
        #menutitle{
            font-size: 18px;
            padding-left:20px;
        }
        .subtitle{
            font-size: 16px;
            padding-left:20px;
        }
    }
    @media screen and (min-height: 800px){
        #icons{
            padding-left:0px;
        }
        #menutitle{
            font-size: 18px;
            padding-left:20px;
        }
        .subtitle{
            font-size: 16px;
            padding-left:20px;
        }
    }  
</style>
