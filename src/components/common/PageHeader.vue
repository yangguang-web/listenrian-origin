<template>
    <div class="bread">
        <!-- <span v-if="isShowTime" style="color:#606266;font-size:15px"><i class="bi bi-clock text-info"></i>&nbsp;更新于：{{realtime}}</span> -->
        <!-- <span @click="showTimePicker"><i class="bi bi-clock"></i>时间段</span> -->
        
        <el-page-header @back="goBack" :content="component_name">
        </el-page-header>
    </div>
</template>

<script>
import { store } from './../../store/store.js';
export default {
    data(){
        return{
            store,
            component_name:''
        }
    },
    watch:{
        $route(to,from){
            this.component_name=this.$route.meta.title;
        }
    },
    created(){
        this.component_name=this.$route.meta.title;
    },
    computed:{
        realtime(){
            return store.state.realtime;
        },
        isShowTime(){
            return store.state.isShowTime;
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
    }
    
}
</script>
<style lang="scss" scoped>
span{
    // height: 30px;
    float: right;
    line-height: 50px;
    margin-right: 20px;
    padding: 5px;
    border-radius: 5px;
    background-color: #3fb1e3;
    color: white;
}
.bread{
    height: 50px;
    font-size: 15px;
    color: #303133;
}

</style>

