<template>
  <el-card class="wrap">
        <div class="condition">
            <div class="but">
                <el-button type="primary" @click="visible1=true">添加部门</el-button>
                <el-button type="primary" @click="visible2=true">批量上传</el-button>
                <el-button type="info" @click="download">下载模板</el-button>
            </div>
            <div class="search">
                <span><el-input
                    placeholder=" "
                    suffix-icon="el-icon-search"
                    v-model="input"
                    @change="search"
                    style="width:150px">
                </el-input></span>
                <!-- <span class="none"></span> -->
                <span>
                    <el-button type="primary"  @click="getList">查询</el-button>
                </span>
                <span>
                    <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
                </span>
            </div>
            <!-- 设置添加设备弹出框 -->
            <el-dialog :visible.sync="visible1" center :width="addwidth" title="添加设备">
                <el-form :model="form1"  ref="form1">
                    <el-form-item label="IP范围"  label-width="80px">
                        <el-input v-model="form1.ip" placeholder="ip范围" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="部门名称"  label-width="80px">
                        <el-input v-model="form1.department" placeholder="部门名称" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="上级部门"  label-width="80px">
                        <el-input v-model="form1.updepartment" placeholder="上级部门" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="备注"  label-width="80px">
                        <el-input v-model="form1.tip" placeholder="备注" style="width:200px"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="info" @click="visible1=false">取 消</el-button>
                    <el-button type="primary" @click="submitAdd">保 存</el-button>
                </div>
            </el-dialog>
            <el-dialog
                title="批量上传"
                :visible.sync="visible2"
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
      <el-divider></el-divider>

      <div class="usertable">
          <template>
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                label="IP"
                prop="ip">
                </el-table-column>
                <el-table-column
                label="部门名称"
                prop="department">
                </el-table-column>
                <el-table-column
                label="上级部门"
                prop="updepartment">
                </el-table-column>
                 <el-table-column
                label="备注"
                prop="tip">
                </el-table-column>
                <el-table-column
                label="更新时间"
                prop="time">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
          </template>
      </div>


  </el-card>
</template>

<script>
    export default {
        data(){
            return{
                input:'',
                visible1:false,
                visible2:false,
                visible3:false,
                form1:{
                    ip: '',
                    department: '',
                    updepartment:'',
                    tip:'',
                    time:''
                },
                addwidth:'340px',
                tableData: [
                    {
                    ip: '192.168.1.111',
                    department:'研发部',
                    time:'2021-12-03 08:32',
                    updepartment:'上海总部',
                    tip:'网上采购'
                    },
                    {
                    ip: '192.168.1.111',
                    department:'研发部',
                    time:'2021-12-03 08:32',
                    updepartment:'上海总部',
                    tip:'网上采购'
                    },
                    {
                    ip: '192.168.1.111',
                    department:'研发部',
                    time:'2021-12-03 08:32',
                    updepartment:'上海总部',
                    tip:'网上采购'
                    }
                ]
            }
        },
        created(){
            this.getList();
        },
        mounted(){

        },
        methods:{
            download(){

            },
            search(){
                this.$axios.get('/qqqqqqqqqq',{
                    params:{
                        qqqqqqqqqq:this.input
                    }
                }).then(
                    (res)=>{
                        this.tableData=res.data.qqqqqqqqqq;
                    }
                )
            },
            getList(){
                this.$axios.get('/qqqqqqqqqq')
                .then(
                    (res)=>{
                        this.tableData=res.data.qqqqqqqqqq;
                    }
                )
            },
            submitAdd(){
                this.visible1=false;
                this.$axios.post('/qqqqqqqqqq',{
                    xxx:this.form1.ip,
                    xxx:this.form1.department
                    //等等 补充完整添加的字段  在el-dialog里面
                })
                .then(
                    (res)=>{
                        this.tableData=res.data.qqqqqqqqqq;
                    }
                )
            },
            //开启关闭函数
            handleDelete(index, row){
                this.$axios.delete('/qqqqqqqqqq',{
                    params:{
                        qqqqqqqqqq:row.time
                        //修改并补充完整
                    }
                }).then(
                    (res)=>{
                        this.getList();
                    }
                )
            }
        }
    }
</script>

<style>

</style>
<style scoped>
.wrap{
    width: 94%;
    margin: auto;
}
.condition{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}
.search{
    display: flex;
    flex-direction: row;
}
/* .count{
    margin-right: 20px;
} */
span:not(:last-child){
    margin-right: 10px;
}
</style>