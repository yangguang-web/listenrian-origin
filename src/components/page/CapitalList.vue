<template>
  <el-card class="wrap">
        <div class="condition">
            <div class="but">
                <el-button type="primary" @click="visible1=true">添加设备</el-button>
                <el-button type="primary" @click="visible2=true">批量上传</el-button>
                <el-button type="info" @click="download">下载模板</el-button>
            </div>
            <div class="search">
                <span><el-input
                    placeholder=" "
                    suffix-icon="el-icon-search"
                    v-model="input"
                    @change="searchCapital"
                    style="width:150px">
                </el-input></span>
                <!-- <span class="none"></span> -->
                <span>
                    <el-button type="primary"  @click="searchCapital">查询</el-button>
                </span>
                <span>
                    <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
                </span>
            </div>
            <!-- 设置添加设备弹出框 -->
            <el-dialog :visible.sync="visible1" center :width="addwidth" title="添加设备">
                <el-form :model="form1"  ref="form1">
                    <el-form-item label="IP地址"  label-width="80px">
                        <el-input v-model="form1.ip" placeholder="ip地址" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="MAC地址"  label-width="80px">
                        <el-input v-model="form1.mac" placeholder="mac地址" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="设备名称"  label-width="80px">
                        <el-input v-model="form1.devicename" placeholder="设备的名称" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="设备类型"  label-width="80px">
                        <el-input v-model="form1.devicetype" placeholder="设备的类型" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="所属部门"  label-width="80px">
                        <el-input v-model="form1.department" placeholder="设备所属部门" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人"  label-width="80px">
                        <el-input v-model="form1.manager" placeholder="相关负责人员" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="备注"  label-width="80px">
                        <el-input v-model="form1.note" placeholder="描述信息" style="width:200px"></el-input>
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
            stripe
            style="width: 100%">
                <el-table-column
                label="IP"
                prop="ip">
                </el-table-column>
                <el-table-column
                label="MAC地址"
                prop="mac">
                </el-table-column>
                <el-table-column
                label="设备名称"
                prop="devicename">
                </el-table-column>
                 <el-table-column
                label="设备类型"
                prop="devicetype">
                </el-table-column>
                <el-table-column
                label="MAC地址"
                prop="mac">
                </el-table-column>
                <el-table-column
                label="部门"
                prop="department">
                </el-table-column>
                <el-table-column
                label="备注"
                prop="note">
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
                    mac: '',
                    time:'',
                    note:'',
                    department:'',
                    devicename:'',
                    devicetype:'',
                    
                },
                max_count:3,
                form2:{
                    ip:'',
                    action:''
                },
                addwidth:'340px',
                tableData: [
                    {
                    ip: '192.168.1.111',
                    mac: 'fa:16:3e:f6:6f:a18',
                    department:'研发部',
                    time:'2021-12-03 08:32',
                    devicename:'笔记本电脑',
                    devicetype:'硬件',
                    note:'网上采购'
                    },
                    {
                    ip: '192.168.1.111',
                    mac: 'fa:16:3e:f6:6f:a18',
                    department:'人事部',
                    time:'2021-05-17 14:08',
                    devicename:'笔记本电脑',
                    devicetype:'硬件',
                    note:'网上采购'
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
            //下载模板
            download(){

            },
            //根据输入值搜索
            searchCapital(){
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
            //获取初始数据 默认所有 
            getList(){
                this.$axios.get('/qqqqqqqqqq')
                .then(
                    (res)=>{
                        this.tableData=res.data.qqqqqqqqqq;
                    }
                )
            },
            //添加新数据
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
            //删除函数
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
    width: 100%;
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
span:not(:last-child){
    margin-right: 10px;
}
</style>