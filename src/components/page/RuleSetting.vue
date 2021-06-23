<template>
  <el-card class="container">
      <div class="condition">
            <div class="but">
                <el-button type="primary" @click="visible1=true">添加规则</el-button>
                <el-button type="primary" @click="visible2=true">批量上传</el-button>
            </div>
            <div class="search">
                    <span>
                        <el-input
                            placeholder=" "
                            suffix-icon="el-icon-search"
                            v-model="s_collect"
                            @change="search"
                            style="width:150px">
                        </el-input>
                    </span>
                    
                    <span>
                        <el-button type="primary"  @click="search">查询</el-button>
                    </span>

                    <span>
                        <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
                    </span>
            </div>
            <!-- 设置添加IP弹出框 -->
            <el-dialog :visible.sync="visible1" center :width="addwidth" title="添加策略">
                <el-form :model="form1"  ref="form1">
                        <el-form-item label="目标" label-width="50px">
                            <el-input v-model="form1.ip" placeholder="ip地址"  style="width:200px"></el-input>
                        </el-form-item>
                        <el-form-item label="操作"  label-width="50px">
                            <el-select v-model="form1.action" placeholder="请选择" style="width:200px">
                                <el-option label="允许" value="true"></el-option>
                                <el-option label="拒绝" value="false"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="方向" label-width="50px">
                            <el-select v-model="form1.direction" placeholder="请选择" style="width:200px">
                                <el-option label="接入" value="in"></el-option>
                                <el-option label="访问" value="out"></el-option>
                                <el-option label="外连" value="both"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="客体" label-width="50px">
                            <el-input v-model="form1.ip2" placeholder="ip地址"  style="width:200px"></el-input>
                        </el-form-item>
                        <el-form-item label="备注"  label-width="50px">
                            <el-input v-model="form1.note" placeholder="备注信息"  style="width:200px"></el-input>
                        </el-form-item>
                        
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="info" @click="unsubmit">取 消</el-button>
                    <el-button type="primary" @click="submitAdd">保 存</el-button>
                </div>
            </el-dialog>
            <el-dialog
                title="上传更新包"
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
                label="目标"
                prop="ip">
                </el-table-column>
                <el-table-column
                label="操作"
                prop="action">
                </el-table-column>
                <el-table-column
                label="采集方向"
                prop="direction">
                </el-table-column>
                <el-table-column
                label="端口"
                prop="ip2">
                </el-table-column>
                <el-table-column
                label="备注"
                prop="note">
                </el-table-column>
            </el-table>
          </template>
      </div>
  </el-card>
</template>

<script>
    export default {
        name:'rulesetting',
        data(){
            return{
                visible1:false,
                visible2:false,
                s_collect:'',
                form1:{
                    ip:'',
                    ip2: '',
                    action: '',
                    direction:'',
                    note:''
                },
                addwidth:'320px',
                tableData: [{
                    ip:'192.168.1.121',
                    ip2: '192.168.1.111',
                    action: '拒绝',
                    direction:'流入',
                    note:'test'
                    }, {
                    ip:'192.168.1.121',
                    ip2: '192.168.1.111',
                    action: '允许',
                    direction:'流出',
                    note:'test'
                    }, {
                    ip:'192.168.1.121',
                    ip2: '192.168.1.111',
                    action: '拒绝',
                    direction:'双向',
                    note:'test'
                }]
            }
        },
        created(){
            
        },
        mounted(){

        },
        methods:{
            //根据输入值搜索
            search(){
                this.$axios.get('/qqqqqqqqqq',{
                    params:{
                        qqqqqqqqqq:this.s_collect
                    }
                }).then(
                    (res)=>{
                        this.tableData=res.data.qqqqqqqqqq;
                    }
                )
            },
            unsubmit(){
                this.visible1=false;
                this.form1.ip='';
                this.form1.ip2='';
                this.form1.direction='';
                this.form1.note='';
                this.form1.action='';
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
            //提交新数据
            submitAdd(){
                this.visible1=false;
                this.$axios.post('/qqqqqqqqqq',{
                    xxx:this.form1.xx,
                    xxx:this.form1.xx
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

<style scoped>
.container{
    width: 90%;
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