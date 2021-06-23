<template>
    <div class="wrap">
        <div class="left">
          <div class="capture-header">
            <div class="capture-title">
                <i class="bi bi-compass-fill" style="padding-left:5px;"></i>
                数据结构
            </div>
            <div class="capture-action">
                <span><el-input v-model="input" @keyup.enter.native="search" @change="search" suffix-icon="el-icon-search" style="width:120px"></el-input></span>
                <span><el-button type="primary">Excel</el-button></span>
            </div>
          </div>
          <el-divider></el-divider>
          <el-table
              :data="tableData"
              stripe
              border
              style="width: 100%;margin-bottom:15px">
              <el-table-column
              prop="date"
              label="字段">
              </el-table-column>
              <el-table-column
              prop="name"
              label="类型">
              </el-table-column>
              <el-table-column label="操作">
                  <template slot-scope="scope">
                      <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">添加到定制项</el-button>
                  </template>
              </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pagesize"   
            layout="total, sizes, prev, pager, next"
            :total="all">
           </el-pagination>
        </div>

        <!-- ======================================== -->
        <!-- ======================================== -->
        <!-- ======================================== --><!-- ======================================== -->
        <!-- ======================================== --><!-- ======================================== -->
        <!-- ======================================== -->
        <div class="right">
          <div class="capture-header">
            <div class="capture-title">
                <i class="bi bi-compass-fill" style="padding-left:5px;"></i>
                定制搜索项
            </div>
            <div class="capture-action">
                <!-- <span><el-button type="primary" @click="visible=true">添加</el-button></span> -->
                <span><el-input v-model="input2" @keyup.enter.native="search" @change="search" suffix-icon="el-icon-search" style="width:140px"></el-input></span>
                <span><el-button type="primary">Excel</el-button></span>
            </div>
          </div>
          <el-dialog :visible.sync="visible" center :width="addwidth" title="添加新数据">
              <el-form :model="form"   ref="form">
                  <el-form-item label="字段名">
                      <el-input v-model="form.keys" placeholder="字段名称" style="width:200px"></el-input>
                  </el-form-item>
                  <el-form-item label="描述">
                      <el-input v-model="form.values" placeholder="描述信息"  style="width:200px"></el-input>
                  </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button type="info" @click="visible=false">取 消</el-button>
                  <el-button type="primary" @click="submit">保 存</el-button>
              </div>
          </el-dialog>
          <el-divider></el-divider>
          <el-table
              :data="tableData2"
              stripe 
              border
              style="width: 100%;margin-bottom:15px">
              <el-table-column
              prop="date"
              label="字段">
              </el-table-column>
              <el-table-column
              prop="name"
              label="类型">
              </el-table-column>
              <el-table-column label="操作">
                  <template slot-scope="scope">
                      <el-button
                      size="mini"
                      @click="handleEdit2(scope.$index, scope.row)">编辑</el-button>
                      <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
              </el-table-column>
          </el-table>
          <el-dialog :width="addwidth" center title="修改数据"  :visible.sync="visible2">
              <el-form :model="form2">
                  <el-form-item label="字段">
                      <el-input v-model="form2.keys" style="width:200px"></el-input>
                  </el-form-item>
                  <el-form-item label="描述">
                      <el-input v-model="form2.values" style="width:200px"></el-input>
                  </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button type="info"  @click="visible2= false">取消</el-button>
                  <el-button type="primary"  @click="submit2">保存</el-button>
              </div>
          </el-dialog>
          <el-pagination
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="currentPage2"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagesize2"   
          layout="total, sizes, prev, pager, next"
          :total="all2">
          </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name:'datacontent',
    data() {
      return {
        visible:false,
        visible2:false,
        input:'',
        input2:'',
        currentPage:1,
        currentPage2:1,
        pagesize:10,
        pagesize2:10,
        all:10,
        all2:10,
        form:{
          keys:'',
          values:''
        },
        form2:{
          keys:'',
          values:''
        },
        addwidth:'260px',
        tableData: [{
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }],
        tableData2: [{
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }, {
          date: 'cert.alt',
          name: 'keyword'
        }]
      }
    },
    created(){
      // this.getList();
      // this.getList2();
    },
    methods:{
      //获取左边表格数据
      getList(){
        this.$axios.get('/test').then((res)=>{
          this.tableData=res.data.data;
            console.log(res.data);
        })
      },
      //获取右边表格数据
      getList2(){
        this.$axios.get('/test').then((res)=>{
          this.tableData2=res.data.data;
            console.log(res.data);
        })
      },
      //左边图表根据输入值搜索
      search(){
        this.$axios.get('/qqqqqq',{
          params:{
            qqqq:this.input
          }
        }).then((res)=>{
          this.tableData=res.data.data;
        })
      },
      //左边图表根据输入值搜索
      search2(){
        this.$axios.get('/qqqqqq',{
          params:{
            qqqq:this.input2
          }
        }).then((res)=>{
          this.tableData2=res.data.data;
        })
      },
      submit(){

      },
      submit2(){
          this.$axios.post('/test',{
            qqqq:this.form2.keys,
            qqqq:this.form2.values
          }).then((res)=>{
            this.getList2();
          })
      },
      //当前页面显示数量变化时
      handleSizeChange(){

      },
      //当前页码变化时
      handleCurrentChange(){

      },
      //当前页面显示数量变化时
      handleSizeChange2(){

      },
      //当前页码变化时
      handleCurrentChange2(){

      },
      handleEdit(index, row){
          console.log(row.name);
          this.$axios.post('/qqqqqq',{
            date:row.date,
            name:row.name
          }).then(
            (res)=>{
              this.getList2();
            }
          )
      },
      handleEdit2(index, row){
          this.visible2=true;
          this.form2.keys=row.date;
          this.form2.values=row.name;
      },
      handleDelete(index, row){
          this.visible2=true;
      }
    }
}
</script>

<style scoped>
.wrap{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
}
.left{
  width: 44%;
  background-color: white;
  border-radius: 6px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 8%);
}
.right{
  width: 50%;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 8%);
  padding: 20px;
}
.capture-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.capture-title{
    color: #404244;
    font-size: 18px;
}
span:not(:last-child){
    margin-right: 10px;
}
</style>