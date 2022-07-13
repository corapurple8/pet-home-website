<template>
    <div><!--避免多个根元素-->
        <!--上层工具栏-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <!--上层 新增按钮 + 模糊查询输入框+ 提交查询按钮-->
            <!--行内表单-->
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item>
                    <el-button type="success" @click="handleAdd">新增</el-button>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="searchForm.username" placeholder="按员工姓名模糊查询"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--新增/编辑员工的模态框-->
        <!--:visible.sync是否可见且与关闭同步-->
        <el-dialog title="新增/编辑员工" :visible.sync="dialogFormVisible">
            <el-form :model="employeeForm"  :rules="rules" ref="employeeForm">
                <el-form-item label="" prop="username" >
                    <el-input v-model="employeeForm.username" autocomplete="off" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input v-model="employeeForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="employeeForm.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="employeeForm.age" autocomplete="off" placeholder="请输入年龄"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="employeeForm.phone" autocomplete="off" placeholder="请输入电话"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="employeeForm.job_id" autocomplete="off" placeholder="请输入职位"></el-input>
                </el-form-item>
                <el-form-item label="" placeholder="请选择是否启用" v-show="isNeedState">
                    <el-radio v-model="employeeForm.state" :label="0">启用</el-radio>
                    <el-radio v-model="employeeForm.state" :label="-1">禁用</el-radio>
                    <el-radio v-model="employeeForm.state" :label="1">待审核</el-radio>
                    <el-radio v-model="employeeForm.state" :label="2">待激活</el-radio>
                    <el-radio v-model="employeeForm.state" :label="3">驳回</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!--取消直接关闭模态框-->
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <!--确定时绑定单击事件提交表单-->
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>

        <!--表格展示-->
        <el-table :data="employees" style="width: 100%"  @selection-change="selsChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="id" label="编号" width="180"></el-table-column>
            <el-table-column prop="username" label="姓名" width="180"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
            <el-table-column prop="phone" label="电话" width="180"></el-table-column>
            <el-table-column prop="password" label="密码" width="180"></el-table-column>
            <el-table-column prop="age" label="年龄" width="180"></el-table-column>
            <el-table-column prop="state" label="状态" width="180">
                <!--自定义列显示-->
                <template slot-scope="scope">
                    <b v-if="scope.row.state==0" style="color: green">启用</b>
                    <b v-else-if="scope.row.state==1" style="color:gray">待审核</b>
                    <b v-else-if="scope.row.state==2" style="color:gray">待激活</b>
                    <b v-else-if="scope.row.state==3" style="color:gray">驳回</b>
                    <span v-else style="color: red">禁用</span>
                </template>
            </el-table-column>
            <el-table-column prop="job_id" label="职位" width="180"></el-table-column>
            <!--自定义列数据 添加操作-->
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button type="warning" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <!--批量删除按钮 无选择项则禁用-->
            <el-button type="danger" @click="batchRemove" :disabled="this.selections.length===0">批量删除</el-button>
            <!--分页工具栏-->
            <!--上一页 页码选择 下一页 跳转-->
            <el-pagination style="float: right" small layout="prev, pager, next,jumper" :total="total" @current-change="currentChange"></el-pagination>
        </el-col>

    </div>
</template>

<script>
    export default {
        name: "Employee",
        data(){
            return{
                searchForm:{//高级查询表单
                    username:"",
                    pageSize:10,//分页默认条数
                    pageNo:1,//当前页默认为1
                },
                employees:[],//表格展示数据员工数组
                total:0,//查询总数 分页工具
                dialogFormVisible:false,//新增和编辑模态框的是否可见
                isNeedState:false,//模态框中的state启用选择是否可见
                employeeForm:{
                    id:null,
                    username:"",
                    email:"",
                    phone:"",
                    password:"",
                    age:null,
                    state:0,//默认启用
                    job_id:null,
                },
                rules: {//新增编辑等表单验证规则
                    username: [
                        //必填 提示信息 失焦触发
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ]
                },
                selections:[],//批量删除的选择对象数组
            }
        },
        methods:{
            //新增员工点击事件
            handleAdd(){
                //清空模态框相当于给其赋值一个新对象
                this.employeeForm={
                    id:null,
                        username:"",
                        email:"",
                        phone:"",
                        password:"",
                        age:null,
                        state:0,//默认启用
                        job_id:null,
                }
                //将状态选择框隐藏
                this.isNeedState = false;
                //再显示模态框
                this.dialogFormVisible = true;
            },
            handleEdit(id){
                //先进行数据回显
                //发送请求查询
                this.$http.get("/employee/"+id).then(res=>{
                    let{success,msg,data} = res.data;
                    this.employeeForm = data;
                    //将状态选择框显示
                    this.isNeedState = true;
                    //再显示模态框
                    this.dialogFormVisible = true;
                })
            },
            //提交表单事件
            submitForm(){
                //先进行判断
                if (this.employeeForm.id){//id存在发送修改请求
                    //若验证通过则发送请求
                    this.$refs.employeeForm.validate(v=>{
                        if (v){//验证成功
                            this.$http.post("/employee",this.employeeForm).then(res=>{
                                let {success,msg,data} = res.data;//ajaxresult对象
                                if (success){
                                    //发送成功信息
                                    this.$message.success(msg);
                                    //重新加载表格
                                    this.loadData();
                                    //关闭模态框
                                    this.dialogFormVisible = false;
                                }else {
                                    //发送错误信息
                                    this.$message.error(msg);
                                }
                            })
                        }
                    })
                }else {//id不存在 发送添加请求
                    //若验证通过则发送请求
                    this.$refs.employeeForm.validate(v=>{
                        if (v){//验证成功
                            this.$http.put("/employee",this.employeeForm).then(res=>{
                                let {success,msg,data} = res.data;//ajaxresult对象
                                if (success){
                                    //发送成功信息
                                    this.$message.success(msg);
                                    //重新加载表格
                                    this.loadData();
                                    //关闭模态框
                                    this.dialogFormVisible = false;
                                }else {
                                    //发送错误信息
                                    this.$message.error(msg);
                                }
                            })
                        }
                    })
                }
            },
            //单个删除
            handleDel(id){
                //确认框
                this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //发送删除请求
                    this.$http.delete("/employee/"+id).then(res=>{
                        let {success,msg,data} = res.data;//ajaxresult对象
                        if (success){
                            //发送成功信息
                            this.$message.success(msg);
                            //重新加载
                            this.loadData();
                        }else {
                            //发送错误信息
                            this.$message.error(msg);
                        }
                    })
                })
            },
            //批量删除表格选择选中状态改变
            selsChange(selections){
                //将选择中的对象赋值给数组
                this.selections = selections;
            },
            //批量删除
            batchRemove(){
                //确认框
                this.$confirm('此操作将永久删除这些员工, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = [];
                    for (let i = 0; i <this.selections.length ; i++) {
                        ids.push(this.selections[i].id);
                    }
                    //发送批量删除请求
                    this.$http.delete("/employees/"+ids.join(",")).then(res=>{
                        let {success,msg,data} = res.data;//ajaxresult对象
                        if (success){
                            //发送成功信息
                            this.$message.success(msg);
                            //重新加载
                            this.loadData();
                        }else {
                            //发送错误信息
                            this.$message.error(msg);
                        }
                    })
                })
            },
            //高级查询点击事件查询
            search(){
                //已经双向绑定 直接查询加载数据
                this.loadData();
            },
            //加载表格数据
            loadData(){
                //发送请求
                this.$http.patch("/employees",this.searchForm).then(res=>{
                    let {success,msg,data} = res.data;//ajaxresult对象
                    if (success){
                        //查询成功则赋值给当前双向绑定的表格信息对象
                        this.employees=data.rows;
                        this.total = data.total;
                        //发送成功信息
                        this.$message.success(msg);
                    }else {
                        //发送错误信息
                        this.$message.error(msg);
                    }
                })
            },
            //分页触发器
            currentChange(pageNo){
                this.searchForm.pageNo = pageNo;
                //重新加载
                this.loadData();
            }
        },
        //挂载函数
        mounted() {
            //页面加载就调用加载表格数据的方法
            this.loadData();
        }
    }
</script>

<style scoped>

</style>