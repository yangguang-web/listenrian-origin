<template>
    <div class="wrapper">
        <!-- 顶部导航栏 -->
        <v-head></v-head>
        <!-- 侧边栏 -->
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">

            <v-nav v-if="this.isShow"></v-nav>

            <div class="content" v-if="this.isKeep" :class="{'content-collapses':collapse}">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
            <div class="content" v-if="!this.isKeep" :class="{'content-collapses':collapse}">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import vHead from './Header.vue';
    import vNav from './PageHeader.vue';
    import vSidebar from './Sidebar.vue';
    // import vFooter from './Footer';
    import bus from './bus';
    import { store } from './../../store/store.js';
    export default {
        data(){
            return{
                collapse: false,
            }
        },
        components:{
            vHead, 
            vSidebar,
            vNav
        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        },
        computed:{
            isKeep(){
                return store.state.isKeep;
            },
            isShow(){
                return store.state.isShow;
            }
        }
    }
</script>
/* 公共组件样式 */
<style>
.el-page-header__left .el-icon-back{
  font-size: 24px;
}
.el-page-header__left .el-icon-back:hover{
  color: black;
  font-weight: bold;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
}
.el-page-header{
    line-height: 50px;
}
.el-card{
    border-radius: 6px;
}
.el-dialog{
    border-radius: 8px;
    box-shadow: none;
}
.el-divider--horizontal{
    height: 2px;
}
.el-menu-item:hover, .el-menu-item:focus{
    border-radius: 10px;
}
.el-submenu__title{
    border-radius: 10px;
}
.el-dialog--center .el-dialog__body{
    padding-bottom: 0px;
}
.el-form-item{
    margin-bottom: 12px;
}
#nprogress .bar {
    background: #fd4545de !important;
    background: #45c9fdde !important;
    background: #3f76eee8 !important;
    background: #6f42c1 !important;
    height: 2.5px;
    /* z-index: 9999; */
}
html,body,#app,.wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
<style scoped>
.bread{
    width: 100%;
    height: 50px;
    background-color: rgb(255, 255, 255);
    padding-left: 30px;
}
.content-box{
    position: absolute;
    top: 60px;
    right: 0;
    left: 0;
    overflow-y: scroll;
    width:auto;
    height: 100%;
    margin-left: 220px;
    background-color: white;
    transition: all 0.5s;
    padding-bottom: 50px;
}
.content-box::scrollbar{
    width: 0;
}
.content-box::-webkit-scrollbar{
    width: 0;
}
.content{
    padding: 20px;
    padding-bottom: 30px;
    margin-left: 10px;
    margin-right: 30px;
    border-radius: 15px;
    background-color: #F5F8FA;
}
.content-collapse{
    margin-left:65px;
}
.content-collapses{
    margin-left: 0px;
}

</style>
<style scoped>
@media screen and (min-width: 1920px){
    .content-collapse{
        margin-left:44px;
    }
}
@media screen and (min-height: 800px){
    .content-collapse{
        margin-left:44px;
    }
}
</style>
