<template>
    <div class="header">
        <div class="left">
            <div class="logo" @click="collapseChage">
            </div>
            <div class="title">听雨-网络全流量智能分析
            </div>
        </div>
        <div class="right">
            <div class="timepick" v-show="visible">
                <el-date-picker
                v-model="timerange"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="max-width: 370px;margin-right:10px;line-height:60px">
                </el-date-picker>
                <el-button type="plain" 
                    style="height:36px" 
                    v-show="visible" 
                    @click="getList">
                    确定
                </el-button>
            </div>
            <div class="util" @click="toggle">
                <i class="bi bi-clock"></i>
            </div>
            <div class="account">
                <i class="bi bi-person-fill" id="usericon"></i>
                <span id="username">{{this.user}}</span>
                <i v-if="this.fs"  @click="handleFullScreen"  class="bi bi-fullscreen-exit" id="fullicon"></i>
                <i v-if="!this.fs" @click="handleFullScreen" class="bi bi-arrows-fullscreen" id="fullicon"></i>
                <i class="bi bi-gear-fill"  @click="drawer=true" id="seticon"></i>
                <i v-if="!this.confirm" class="bi bi-power" id="logout" @click="logout"></i>
                <el-popconfirm
                    confirm-button-text='退出'
                    cancel-button-text='取消'
                    icon="el-icon-info"
                    icon-color="red"
                    title="是否退出登录？"
                    @confirm="logout"
                    v-if="this.confirm"
                    >
                    <i class="bi bi-power" slot="reference" id="logout2"></i>
                </el-popconfirm>
            </div>
        </div>
        <!-- 设置弹出界面 -->
        <el-drawer
            title="系统配置"
            :visible.sync="drawer"
            :direction="direction"
            :show-close="false"
            :size="drawer_width"
            :modal="false"
            >
            <div class="setting">
                <div class="set-item">
                    <div class="toggle-title">
                        <i class="el-icon-s-platform" id="conicon"></i>
                        页面状态缓存
                    </div>
                    <el-switch
                        v-model="value"
                        active-text="开启"
                        inactive-text="关闭"
                        @change="toggleKeepAlive">
                    </el-switch>
                </div>
                <el-divider></el-divider>
                <div class="set-item">
                    <div class="toggle-title">
                        <i class="el-icon-s-flag" id="conicon"></i>
                        页头显示设置
                    </div>
                    <el-switch
                        v-model="value2"
                        active-text="显示"
                        inactive-text="隐藏"
                        @change="togglePageHeader">
                    </el-switch>
                </div>
                <el-divider></el-divider>
                <!-- <div class="set-item" id="toggle-color">
                    <div class="toggle-title">
                        <i class="el-icon-s-open" id="conicon"></i>
                        切换主题色
                    </div>
                    <el-button type="primary"></el-button>
                    <el-button type="success"></el-button>
                    <el-button type="warning"></el-button>
                    <el-button type="danger"></el-button>
                    <el-button type="info"></el-button>
                </div>
                <el-divider></el-divider> -->
                <div class="set-item">
                    <div class="toggle-title"><i class="el-icon-question" id="conicon"></i>显示页面刷新时间</div>
                    <el-button 
                        type="primary" 
                        v-if="this.showTime"  
                        @click="toggleTime">
                        已显示
                    </el-button>
                    <el-button 
                        type="info" 
                        v-if="!this.showTime" 
                        @click="toggleTime">
                        已隐藏
                    </el-button>
                </div>
                <el-divider></el-divider>
                <div class="set-item">
                    <div class="toggle-title"><i class="el-icon-question" id="conicon"></i>退出前确认</div>
                    <el-button 
                        type="primary" 
                        v-if="this.confirm"  
                        @click="toggleLogoutConfirm">
                        已开启
                    </el-button>
                    <el-button 
                        type="info" 
                        v-if="!this.confirm" 
                        @click="toggleLogoutConfirm">
                        已禁用
                    </el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
    import bus from '../common/bus';
    import { store } from './../../store/store.js';
    export default {
        data(){
            return {
                store,
                visible:false,
                timerange:[],
                value:false,
                value2:true,            //是否显示模态框
                confirm:false,          //退出登录确认
                drawer_width:'300px',   //设置界面宽度
                drawer:false,           //设置界面显示
                direction: 'rtl',       //设置界面的弹出方向
                user:'admin',           //当前登录用户名
                collapse: true,         //侧边栏的展开
                fs:false,               //全屏字段
                showTime:true,
                pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            }
            }
        },
        mounted(){
            this.fs=document.fullscreen;
            this.collapseChage();
        },
        computed:{
            isKeep(){
                return store.state.isKeep;
            },
            isShow(){
                return store.state.isShow;
            }
        },
        methods:{
            
            getList(){
                this.visible=false;
                sessionStorage.setItem('time',this.timerange);
                store.commit('setIndexTime');

                console.log(this.$store.state.timerange); //可以获取时间了
                
                this.$axios.get('/qqqqqq',{
                    params:{

                    }
                }).then(
                    (res)=>{

                    }
                )
            },
            //切换是否显示时间选择器
            toggle(){
                this.visible=!this.visible
            },
            //退出登录 清除相关信息并返回登录界面
            logout(){
                window.localStorage.clear();
                window.sessionStorage.clear();
                this.$router.push('/login');
            },
            // 切换页面是否缓存
            toggleKeepAlive(){
                store.commit('toggleKeepAliveMutation');
                this.value=this.$store.state.isKeep;
            },
            // 切换页头的显示
            togglePageHeader(){
                store.commit('togglePageHeaderMutation');
                this.value2=this.$store.state.isShow;
            },
            // 切换时间的显示
            toggleTime(){
                store.commit('toggleShowTime');
                this.showTime=this.$store.state.isShowTime;
            },
            // 退出登录时是否要确认
            toggleLogoutConfirm(){
                this.confirm=!this.confirm;
            },
            //获取用户名
            getUser(){
                this.user=sessionStorage.getItem('role')?sessionStorage.getItem('role'):'admin';
            },
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if(this.fs){
                    if(document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                    localStorage.setItem('full',this.fs);
                    this.fs=!this.fs;
                } 
                else{
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        element.msRequestFullscreen();
                    }
                    localStorage.removeItem('full');
                    this.fs=!this.fs;
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
$--color-primary:#3fb1e3;
$--red:crimson;
.el-drawer{
    box-shadow: none;
}
.header{
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    font-size: 22px;
    color: #fff;
    background-color: #3fb1e3;
    box-shadow: 0px 3px 10px #e2e2e2;
    z-index: 1000;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    // height: 60px;
    // width: 100%;
    // position: fixed;
    // top: 0;
    // z-index: 9999;
    // display: flex;
    // flex-direction: row;
    // justify-content: space-between;
    // box-shadow: 0 2px 8px #f0f1f2;
    // background-color: $--color-primary;
    #logout:hover{
        color:$--red;
    }
    #logout2:hover{
        color:$--red;
    }
    #fullicon:hover{
        background-color: whitesmoke;
        color: $--color-primary;
        transition: all 0.4s;
    }
    #seticon:hover{
        background-color: whitesmoke;
        color: $--color-primary;
        transition: all 0.4s;
    }
    .setting{
        width: 85%;
        margin: 0 auto;
        .set-item{
            margin-bottom: 20px;
        }
        .toggle-title{
            font-size: 15px;
            color: #72767b;
            color: $--color-primary;
            margin-bottom: 10px;
            letter-spacing: 1px;
            #conicon{
                color: $--color-primary;
                padding: 0 3px;
            }
        }
    }
}
</style>
<style scoped>
.timepick{
    line-height: 60px;
    margin-right: 15px;
}
.util{
    align-self: center;
    color: white;
    font-size: 20px;
    margin-right: 10px;
    cursor: pointer;
}
.left,.right{
    display: flex;
    flex-direction: row;
}
.right{
    font-size: 14px;
}
.account{
    display: flex;
    color: white;
}
#fullicon{
    align-self: center;
    color: white;
    margin: 0 5px 0 0;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    font-size: 1.1rem;
    border-radius:50%;
}
#seticon{
    align-self: center;
    color: white;
    margin: 0;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    font-size: 1.1rem;
    border-radius:50%;
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    animation: rotation 4s linear infinite;
    -moz-animation: rotation 2s linear infinite;
    -webkit-animation: rotation 4s linear infinite;
    -o-animation: rotation 2s linear infinite;
}
@keyframes rotation {
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
}
@-webkit-keyframes rotation {
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
}
#username{
    align-self: center;
    color: white;
    font-size: 1.1rem;
    margin: 0 10px 0 2px;
}
#usericon{
    align-self: center;
    font-size: 1.2rem;
    text-align: center;
    margin-left: 2px;
}
#logout,#logout2{
    font-size: 22px;
    margin: 0 10px 0 0;
    padding: 2px 8px;
    border-radius: 6px;
    align-self: center;
    color: white;
    /* line-height: 60px; */
    cursor: pointer;
}
#logout2{
    font-size: 22px;
    margin: 0 20px 0 10px;
    padding: 2px 8px;
    border-radius: 6px;
    align-self: center;
    color: white;
    line-height: 60px;
    cursor: pointer;
}
#logout2:hover{
    background-color: whitesmoke;
    transition: all 0.5s;
}
#logout:hover{
    background-color: whitesmoke;
    transition: all 0.5s;
}
.logo{
    width: 46px;
    height: 46px;
    background-image: url(./../../../static/logo.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: 50%;
    align-self: center;
    margin: 0 10px;
    cursor: pointer;
}
.menu{
    height: 30px;
    width: 32px;
    border: 2px solid white;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.title{
    font-size: 26px;
    line-height: 58px;
    color: white;
}
.collapse-btn{
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;  
}
</style>
