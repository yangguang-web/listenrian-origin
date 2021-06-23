<template>
    <div class="wrap">
        <div class="d-header">
            <div class="d-on">
                <div class="d-on-t">
                    开启系统
                </div>
                <div class="d-on-box" @click="turnon">
                    <i class="bi bi-pause-circle-fill"></i>
                </div>
            </div>
            <div class="d-off">
                <div class="d-off-t">
                    关闭系统
                </div>
                <div class="d-off-box" @click="turnoff">
                    <i class="bi bi-play-circle-fill"></i>
                </div>
            </div>
            <div class="d-up">
                <div class="d-up-t">
                    系统更新
                </div>
                <div class="d-up-box" @click="visible=true">
                    <i class="bi bi-cloud-upload"></i>
                </div>
            </div>
            <el-dialog
                title="上传更新包"
                :visible.sync="visible"
                width="400px">
                <el-upload
                class="upload-demo"
                drag
                action="https://192.168.xx.xx:8080/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kbs</div> -->
                </el-upload>
            </el-dialog>
        </div>
            
        <div class="d-footer">
            <span class="d-f-title"><i class="bi bi-exclamation-circle text-danger" style="font-size:20px;padding-right:5px"></i>存储空间告警设置</span>
            <el-divider></el-divider>
            <div class="d-f-input">
                磁盘告警阀值(范围25-95):
                <el-slider
                v-model="max_num"
                show-input
                :show-input-controls="false"
                :max="95"
                :min="25"
                @change="submitWarning">
                </el-slider>
                <!-- <el-input
                type="number"
                placeholder="范围25-95"
                v-model="max_num"
                max=95
                min=25
                clearable
                style="width:180px;margin-right:10px"
                size="small">
                </el-input> -->
                <!-- <el-button type="primary" size="small" @click="submitWarn">提交</el-button> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            max_num:80,
            visible:false
        }
    },
    methods:{
        turnon(){
            this.$axios.post('/qqq',{
                qqqqqqqqqq:1
            }).then((res)=>{
                console.log(res.data);
            })
        },
        turnoff(){
            this.$axios.post('/qqq',{
                qqqqqqqqqq:2
            }).then((res)=>{
                console.log(res.data);
            })
        },
        submitWarning(){
            this.$axios.post('/qqq',{
                qqqqqqqqqq:this.max_num
            }).then((res)=>{
                console.log(res.data);
            })
        }
    }
}
</script>

<style scoped>
.wrap{
    width: 100%;
    height: auto;
    background-color: white;
    border-radius: 10px;
    margin: auto;
    margin-top: 15px;
}
.d-header{
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    padding: 50px;
}
i{
    font-size: 44px;
}
/* 块标题 */
.d-on-t,.d-off-t,.d-up-t{
    text-align: center;
    font-size: 18px;
    height: 50px;
    color: #3fb1e3;
    padding-bottom: 20px;
}
/* 块容器 */
.d-on-box,.d-off-box,.d-up-box{
    height: 100px;
    width: 180px;
    border-radius: 10px;
    /* border: 1px solid #3fb1e3; */
    background-color: #3fb1e3;
    display: flex;
    justify-content:center;
    align-items: center;
    color: white;
    cursor: pointer;
    box-shadow: 0px 5px 8px rgb(230, 230, 230);
}
/* 块hover */
.d-on-box:hover,.d-up-box:hover{
    background-color: #29a2d6;
    box-shadow: 0px 5px 8px rgb(214, 214, 214);
}
.d-off-box{
    background-color: #8C8C8C;
}
.d-off-box:hover{
    background-color: #7c7c7c;
    box-shadow: 0px 5px 8px rgb(214, 214, 214);
}
.d-f-title{
    display: block;
    font-size: 18px;
}
.d-footer{
    width: 100%;
    padding: 50px;
    padding-left: 70px;
    border-radius: 10px;
}
.d-f-input{
    color: #606266;
}
.d-f-title{
    font-size: 20px;
    padding-top: 20px;
    color: #303133;
}
@media screen and (min-width: 1920px){
    .d-on-box,.d-off-box,.d-up-box{
        height: 115px;
        width: 215px;
        border-radius: 15px;
        box-shadow: 0px 5px 12px rgb(199, 199, 199);
    }
}
@media screen and (min-height: 800px){
    .d-on-box,.d-off-box,.d-up-box{
        height: 115px;
        width: 215px;
        border-radius: 15px;
        box-shadow: 0px 5px 12px rgb(199, 199, 199);
        /* background-color: rgba(red, green, blue, alpha); */
    }
}

</style>
