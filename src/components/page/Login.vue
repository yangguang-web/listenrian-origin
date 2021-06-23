<template>
  <div class="wrap">
        <!-- logo+标题 -->
        <div class="title">
            <div class="logo">
            </div>

            <div class="name">
              听雨—网络全流量智能分析
            </div>
        </div>
        <!-- 登录表单 -->
        <div class="con">
            <el-input
              id="typein"
              placeholder="username"
              prefix-icon="el-icon-user-solid"
              v-model="username"
              style="margin-bottom:20px">
            </el-input>
            <el-input
              id="typein"
              type="password"
              placeholder="password"
              prefix-icon="el-icon-lock"
              v-model="password"
              @keyup.enter.native="submit"
              style="margin-bottom:20px">
            </el-input>
            <el-button
              type="primary"
              @click="submit" 
              style="width:100%;font-size:16px;border-radius:10px">
              登 录
            </el-button>
        </div>
        <!-- 版权信息 -->
        <!-- test2 -->
        <div class="copyright">
            Copyright&nbsp;&copy; 2021&nbsp;&nbsp;福建奇点时空数字科技有限公司
        </div>
  </div>
</template>
<script>
    export default {
        name:'login',
        data: function(){
          return{
            username:'',
            password:''
          }
        },
        methods:{
          submit(){
              this.$router.push('/index');
              // this.$axios.post('/api/auth/', {
              //     username: this.username,
              //     password: this.password
              // }).then((res) => {
              //     this.$message.success('登录成功！');
              //     console.log(res.data);
              // })
          },
        }
    }
</script>

<style scoped>
.el-input /deep/ .el-input__icon{
    line-height: 36px;
    color: #3fb1e3;
}
/* 输入框默认状态下样式 */
.el-input /deep/ .el-input__inner{
    background-color: rgba(0, 0, 0, 0.032);
    border-color: #3fb1e3;
    border-width: 1.8px;
    border-radius: 10px;
    font-size: 16px;
    height: 36px;
    line-height: 36px;
    color: darkslategray;
}
/* 输入框焦点时边框颜色 */
.el-input /deep/ .el-input__inner:focus{
    border-color: #3fb1e3;
    border-radius: 16px;
    border-width: 2px;
    color:black;
}
/* 输入框内图标的颜色 */
.el-input--small /deep/ .el-input__icon{
    line-height: 36px;
    color: #3fb1e3;
}
</style>>

<style lang="scss" scoped>
$--color-primary:#3fb1e3;
/* 组件根容器 */
.wrap{
    width: 100%;
    height: 100vh;
    background-size:100% 100%;
    background-repeat:no-repeat;
    background-image: url('./../../../static/gradient.jpg');
    // background-image: url('./../../../static/loginbg.jpg');
    display: flex;
}
/* logo */
.logo{
    display: inline-block;
    width: 72px;
    height: 72px;
    margin-right: 20px;
    line-height: 72px;
    background-size:100% 100%;
    background-repeat:no-repeat;
    background-image: url('./../../../static/t_logo.png');
}
/* 标题 */
.name{
    display: inline-block;
    width: auto;
    height: 72px;
    line-height: 72px;
    color: #0170A8;
}
/* logo+标题的容器 */
.title{
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 72px;
    line-height: 72px;
    top: 8vh;
    color: $--color-primary;
    font-size: 48px;
    letter-spacing: 2px;
}
/* 版权信息 */
.copyright{
    position: absolute;
    width: 100%;
    bottom: 5px;
    color: rgba(245, 245, 245, 0.804);
    text-align: center;
    letter-spacing: 1px;
    font-size: 12px;
}
/* 登录表单容器 */
.con{
    padding: 32px 42px 32px 42px;
    width: 360px;
    height: auto;
    margin:auto;
    align-self: center;
    background-color: #0000;
    border-radius: 8px;
    box-shadow:0px 3px 8px  rgba(0, 128, 128, 0.637);
    box-shadow: 2px 3px 12px #3fb2e3ca;

}
@media screen and (min-width: 1920px) {
    .title{
      font-size: 60px;
    }
} 
@media screen and (min-height: 800px) {
    .title{
      font-size: 60px;
    }
}
</style>