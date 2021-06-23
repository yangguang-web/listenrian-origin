<template>
    <el-card class="container">
        <div class="condition">
            <div class="but">
                <el-button type="primary" @click="visible1=true">添加用户</el-button>
                <el-button type="primary" @click="visible2=true">设置登录锁定</el-button>
            </div>
            <div class="search">
                <el-input
                        placeholder=" "
                        suffix-icon="el-icon-search"
                        v-model="iuser"
                        @change="getUserList"
                        style="width:150px">
                </el-input>
                <span class="none"></span>
                <el-button type="primary" @click="getUserList">搜索</el-button>
                <el-button type="primary" icon="el-icon-refresh" @click="getUserList"></el-button>
            </div>
            <!-- 设置添加用户弹出框 -->
            <el-dialog :visible.sync="visible1" center :width="addwidth" title="添加新用户">
                <el-form :model="form1" :rules="rules" ref="form1">
                    <el-form-item label="用户名称">
                        <el-input v-model="form1.uname" placeholder="用户名" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码">
                        <el-input v-model="form1.upwd" placeholder="密码" show-password style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input v-model="form1.urepwd" placeholder="再次输入密码" show-password
                                  style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="用户角色">
                        <el-select v-model="form1.urole" placeholder="请选择" style="width:200px">
                            <el-option label="超级管理员" value="admin"></el-option>
                            <el-option label="普通用户" value="user"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="info" @click="visible1=false">取 消</el-button>
                    <el-button type="primary" @click="submitAddUser">保 存</el-button>
                </div>
            </el-dialog>
            <!-- 设置登录锁定次数弹出框 -->
            <el-dialog :visible.sync="visible2" center :width="addwidth" title="设置登录失败锁定次数">
                <span class="count">限定次数</span>
                <el-input type="number"
                          v-model="max_count"
                          style="width:200px">
                </el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button type="info" @click="visible2=false">取 消</el-button>
                    <el-button type="primary" @click="submitCount">保 存</el-button>
                </div>
            </el-dialog>
        </div>

        <el-divider></el-divider>

        <div class="usertable">
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            label="用户名称"
                            prop="name">
                    </el-table-column>
                    <el-table-column
                            label="用户角色"
                            prop="role">
                    </el-table-column>
                    <el-table-column
                            label="更新时间"
                            prop="time">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <el-dialog :width="addwidth" center title="修改用户信息" :visible.sync="visible3">
                <el-form :model="form2">
                    <el-form-item label="用户名称">
                        <el-input v-model="form2.uname" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="用户角色">
                        <el-select v-model="form2.urole" placeholder="请选择" style="width:200px">
                            <el-option label="超级管理员" value="admin"></el-option>
                            <el-option label="普通用户" value="user"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="修改密码">
                        <el-switch
                                v-model="form2.isUpdate"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                        <!-- <el-input  v-model="form2.isUpdate" show-password style="width:200px"></el-input> -->
                    </el-form-item>
                    <el-form-item v-if="form2.isUpdate" label="新的密码">
                        <el-input v-model="form2.upwd" placeholder="设置新密码" show-password style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item v-if="form2.isUpdate" label="确认密码">
                        <el-input v-model="form2.urepwd" placeholder="再次输入新密码" show-password
                                  style="width:200px"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="info" @click="visible3= false">取消</el-button>
                    <el-button type="primary" @click="submitUpdateUser">保存</el-button>
                </div>
            </el-dialog>
        </div>
    </el-card>
</template>

<script>
import Vue from 'vue'

export default {
    data() {
        return {
            iuser: '',
            visible1: false,
            visible2: false,
            visible3: false,
            form1: {
                uname: '',
                upwd: '',
                urepwd: '',
                urole: 'user'
            },
            max_count: 3,
            rules: {
                // username: [
                //     { required: true, message: '请输入用户名', trigger: 'blur' },
                //     { min: 5, max: 20, message: '长度应该在 5 到 20 个字符', trigger: 'blur' }
                // ],
                // pwd:[
                //     {required: true, message:'请设置密码',trigger:'blur'},
                //     {min:6,max:12,message:'长度应为6到12个字符',trigger:'blur'}
                // ],
                // sure_pwd:[
                //     { validator: validatePass, required: true, trigger: 'blur' }
                //     // {required: true, message:'请设置密码',trigger:'blur'},
                //     // {min:6,max:12,message:'长度应为6到12个字符',trigger:'blur'}
                // ]
            },
            form2: {
                uname: '',
                upwd: '',
                isUpdate: false,
                urepwd: '',
                urole: ''
            },
            addwidth: '340px',
            tableData: [{
                time: '2016-05-02',
                name: '王小虎',
                role: '普通用户'
            }, {
                time: '2016-05-02',
                name: '王小虎',
                role: '普通用户'
            }, {
                time: '2016-05-02',
                name: '王小虎',
                role: '普通用户'
            }, {
                time: '2016-05-02',
                name: '王小虎',
                role: '普通用户'
            }]
        }
    },
    created() {
        this.getUserList();
    },
    mounted() {
    },
    methods: {
        // 获取所有用户
        getUserList() {
            this.$axios.get('/api/v1/users', {
                params: {
                    name: this.iuser,
                }
            })
                    .then((res) => {
                        // this.$message.success(res.status);
                        let r = [];
                        res.data.hits.hits.forEach(item => {
                            let d = {};
                            d.time = (new Date(item._source.update_at)).toLocaleString('zh-cn', {'hour12': false});
                            d.name = item._source.name;
                            d.role = item._source.role;
                            d._id = item._source._id;
                            r.push(d)
                        })
                        this.tableData = r;
                    })
        },
        //根据输入框的值进行搜索
        searchUser() {
            this.$axios.get('/qqqqqqqqqq', {
                params: {
                    qqqqqqqqqq: this.iuser
                }
            }).then((res) => {
                console.log('666');
            })
        },
        //添加用户
        submitAddUser() {
            const csrfToken = this.getCookie('csrfToken')
            this.$axios.post('/api/v1/users', {
                name: this.form1.uname,
                pwd: this.form1.upwd,
                repwd: this.form1.urepwd,
                role: this.form1.urole
            }, {
                params: {
                    _csrf: csrfToken
                }
            }).then((res) => {
                console.log('---\n',res.data);
                if( res.data.result === 'failed') { alert(res.data.message); return }
                this.visible1 = false;
                this.getUserList();
            })
        },
        //限定次数
        submitCount() {
            const csrfToken = this.getCookie('csrfToken')
            this.$axios.post('/api/v1/setting/login-try-times', {
                value: this.max_count
            },{
                params: {
                    _csrf: csrfToken
                }}).then((res) => {
                this.visible2 = false;
            })
        },
        //编辑用户
        submitUpdateUser() {
            const csrfToken = this.getCookie('csrfToken')
            this.visible3 = false;
            this.$axios.put('/api/v1/user/uname', {
                name: this.form2.uname,
                role: this.form2.urole,
                isUpdate: this.form2.isUpdate,
                pwd: this.form2.upwd,
                repwd: this.form2.urepwd
            },{
                params: {
                    _csrf: csrfToken
                }}).then((res) => {
                if(res.data.result < 0 ){ alert(res.data.message); return}
                this.getUserList();
                this.visible3 = false;
            })
        },
        //获取点击的当前行数据
        handleEdit(index, row) {
            console.log(row.name);
            console.log(row.time);
            console.log(row.role);
            this.visible3 = true;
            this.form2.uname = row.name;
            this.form2.upwd = row.upwd;
            this.form2.urepwd = row.urepwd;
            this.form2.urole = row.role;
        },
        handleDelete(index, row) {
            const csrfToken = this.getCookie('csrfToken')
            //删除时要传递的字段和值   值通过row.xx来拿到
            this.$axios.delete('/api/v1/user/' + row.name, {
                params: {
                    _csrf: csrfToken
                }
            }).then((res) => {
                console.log('--user delete success ->', res);
                this.getUserList();
            })
        },
        getCookie(userName) {
            if (document.cookie.length > 0) {
                let c_start = document.cookie.indexOf(userName + "=");
                if (c_start !== -1) {
                    c_start = c_start + userName.length + 1;
                    let c_end = document.cookie.indexOf(";", c_start);
                    if (c_end === -1) {
                        c_end = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(c_start, c_end));
                }
            }
        }
    }
}
</script>

<style scoped>
.container {
    width: 90%;
}

.condition {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}

.search {
    display: flex;
    flex-direction: row;
}

.count {
    margin-right: 20px;
}

.none {
    width: 10px;
}
</style>
