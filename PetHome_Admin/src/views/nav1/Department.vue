<script src="../mock/department.js"></script>
<template>
    <div><!--避免多个根元素-->
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <!--行内-->
            <!--搜索框form-->
            <el-form :model="searchForm" :inline="true"><!--双向绑定vue对象的searchForm 以及确定在行内-->
                <!--新增按钮-->
                <el-form-item>
                    <!--点击事件为显示新增模态框-->
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
                <!--搜索框-->
                <el-form-item>
                    <el-input v-model="searchForm.name" placeholder="部门名称"></el-input>
                </el-form-item>
                <!--搜索确认按钮-->
                <el-form-item>
                    <el-button type="success" @click="search">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--新增模态框-->
        <!--：visible 是否可见 sync同步关闭按钮 rule是验证规则 -->
        <el-dialog title="新增/编辑部门信息" :visible.sync="dialogFormVisible" width="400px" >
            <el-form :model="departmentForm" :rules="rules" ref="departmentForm">

                <!--不是行内 自动上下排列-->
                <!--需要进行编辑和新增的是name和sn-->
                <!--该条输入框绑定的数据name 用作rules进行规定-->
                <el-form-item label="" label-width="150" prop="name">
                    <!--双向绑定编辑表单的名称 内显示部门名称进行提示-->
                    <el-input v-model="departmentForm.name" autocomplete="off" placeholder="部门名称" ></el-input>
                </el-form-item>
                <el-form-item label="" label-width="150" prop="sn">
                    <el-input v-model="departmentForm.sn" autocomplete="off" placeholder="部门编号"></el-input>
                </el-form-item>

                <!--页面布局工具 24等分 装两个下拉框 gutter 间隔 span 占栅格数-->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <!--选择部门经理的下拉框-->
                        <el-form-item label="">
                            <!--选择内容双向绑定部门新增信息表的经理id-->
                            <el-select v-model="departmentForm.manager_id" placeholder="请选择部门经理">
                                <!--循环添加进去 obj in list label表示显示的文本 value表示在该list数组的值=manager_id-->
                                <el-option
                                        v-for="manager in managerOptions"
                                        :label="manager.username"
                                        :value="manager.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <!--选择上级部门的下拉框-->
                        <el-form-item label="">
                            <!--选择内容双向绑定部门新增信息表的上级部门parentid-->
                            <el-select v-model="departmentForm.parent_id" placeholder="请选择上级部门">
                                <!--循环添加进去 obj in list label表示显示的文本 value表示在该list数组的值=上级部门id-->
                                <el-option
                                        v-for="parent in parentOptions"
                                        :label="parent.name"
                                        :value="parent.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="" placeholder="请选择状态" v-show="isNeedState">

                            <!--单选框-->
                            <!--选择内容双向绑定部门修改信息表的状态state-->
                            <el-radio v-model="departmentForm.state" :label="0">启用</el-radio>
                            <el-radio v-model="departmentForm.state" :label="-1">禁用</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!--取消的点击事件 隐藏模态框-->
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <!--确定的点击事件：提交表单-->
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>

        <!--表格绑定状态改变函数调用方法改变批量删除选择数组的值-->
        <el-table
                :data="departments"
                style="width: 100%;margin: auto" @selection-change="selsChange">
            <!--批量删除的选择键-->
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="id" label="编号" width="180"></el-table-column>
            <el-table-column prop="sn" label="部门编号" width="180"></el-table-column>
            <el-table-column prop="name" label="部门名称" width="180"></el-table-column>
            <!--自定义列的显示 格式化展示 状态为0启用 -1禁用-->
            <!--方法一 格式化方法format 定义格式化函数 但不能解析html标签-->
            <!-- <el-table-column prop="state" label="状态" width="180" :formatter="format"></el-table-column>-->

            <el-table-column prop="state" label="状态" width="180" >
                <template slot-scope="scope">
                    <b v-if="scope.row.state==0" style="color: green">启用</b>
                    <span v-else style="color: red">禁用</span>
                </template>
            </el-table-column>
            <el-table-column prop="manager_id" label="经理" width="180"></el-table-column>
            <el-table-column prop="parent.name" label="上级部门" width="180"></el-table-column>
            <!--&lt;!&ndash;头像&ndash;&gt;
            &lt;!&ndash;自定义列的显示&ndash;&gt;
            <el-table-column label="头像" width="180">
               &lt;!&ndash;定义scope作为所有数据的代表&ndash;&gt;
                <template slot-scope="scope">
                    &lt;!&ndash;头像按大小显示&ndash;&gt;
                    <div class="demo-fit">
                        &lt;!&ndash;scope.row当前对象.image的头像属性 正方形 大小100 满足dit 属性是满&ndash;&gt;
                        <el-avatar shape="square" :size="100" :fit="fit" :src="scope.row.image"></el-avatar>
                    </div>
                </template>
            </el-table-column>
            &lt;!&ndash;性别&ndash;&gt;
            <el-table-column label="性别" width="180">
                <template slot-scope="scope">
                    &lt;!&ndash;性别&ndash;&gt;
                    {{scope.row.sex==1?'男':'女'}}
                </template>
            </el-table-column>-->
            <!--操作列-->
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--工具条 批量删除和分页工具栏-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.selections.length===0">批量删除</el-button>
            <!--分页工具栏 sizes每页条数选择下拉框 prev上一页pager选择页码 next下一页 jumper跳转-->
            <el-pagination small layout="prev, pager, next,jumper,total" :total="total" style="float: right"
                           @current-change="currentChange"></el-pagination>
        </el-col>

    </div>
</template>

<script>
    //import departments from '../mock/department';
    export default {
        name:'department',
        data() {
            //定义表单验证部门名称规则 自带参数 rules里的当前内容规则对象 value当前验证的内容值 回调函数
            var deptNameUnique=(rule,value,callback)=>{
                //callback()表示成功
                //callback(new error("失败的提示消息"))
                //发送请求根据部门name查询
                this.$http.get("/getDepartmentByName/"+value).then(res=>{
                    //res.data是ajaxresult对象 res.data.data返回查询到的部门
                    let resultId = res.data.data.id;
                    if (resultId){//id存在说明是修改
                        //判断是否和表单本身相同 若是不同则说明修改后和别的部门重名了
                        if (resultId!=this.departmentForm.id){
                            callback(new Error("该名称已存在"));
                        }else {
                            callback();
                        }
                    }else {//新增
                        //如果查询到了部门
                        if (res.data.data){
                            callback(new Error("该名称已存在"));
                        }else {
                            callback();
                        }
                    }
                })
            }

            return {
                //'id':' 'name':'phone':'email':'@email','address': 'createTime
                departments: [],//表格展示数据,自动循环展示每一个对象
                total:0,//分页总数
                //搜索框 只对名字模糊查询
                searchForm:{
                    name:"",
                    pageNo:1,
                    pageSize:10
                },
                //新增编辑框 其余信息用null代替
                departmentForm:{
                    id:null,
                    name:"",
                    sn:"",
                    state:0,
                    manager_id:null,
                    parent_id:null
                },
                //直接在挂载完成后直接查询出来 节省资源
                managerOptions:[],//新增修改模态框 选择部门经理的下拉菜单查询出的所有经理数组
                parentOptions:[],//新增修改模态框 选择上级部门的下拉菜单查询出的所有部门数组
                selections:[],//批量删除的选择数组
                //模态框是否可见
                dialogFormVisible:false,
                //状态启用选择框是否可见 编辑有用
                isNeedState:false,
                rules:{
                    //与form-item的prop绑定
                    name: [
                        //必须填写  message验证失败的提示信息 trigger 触发该验证的时间 blur失焦
                        { required: true, message: '请输入部门名称', trigger: 'blur' },
                        //自定义部门名称验证规则 自定义了方法 验证器 触发器
                        {validator:deptNameUnique,trigger: 'blur'}
                    ],
                    sn: [
                        //必须填写  message验证失败的提示信息 trigger 触发该验证的时间 blur失焦
                        { required: true, message: '请输入部门编号', trigger: 'blur' }
                    ]
                },
                //头像大小规定尺寸 满
                fit: 'contain'
            }
        },
        methods:{
            //新增按钮的点击事件
            handleAdd(){
                //不可见状态修改
                this.isNeedState=false;
                //显示模态框
                this.dialogFormVisible = true;
                //清空表单  重新赋值
                this.departmentForm={
                    id:null,
                        name:"",
                        sn:"",
                        manager_id:null,
                        parent_id:null
                }
            },
            //编辑部门的点击事件
            handleEdit(id){
                //发送请求进行数据回显
                this.$http.get("/department/"+id).then(res=>{
                    //获取到的对象直接赋值给编辑表单
                    let {success,msg,data} = res.data;
                    if (success){
                        this.departmentForm=data;
                        //显示状态修改
                        this.isNeedState=true;
                        //显示模态框
                        this.dialogFormVisible=true;
                    }
                })
            },
            //提交表单的方法
            submitForm(){
                //验证成功后再提交表单 refs参考 新增表单的验证方法-rules
                //进行判断 如果表单的id不为空则是编辑 发送编辑请求
                if (this.departmentForm.id){
                    this.$refs.departmentForm.validate(v=>{
                        //如果通过验证再发送请求
                        if (v){
                            //departmentForm表单信息双向绑定所以直接作为发送请求的参数
                            //axios发送请求
                            this.$http.post("/department",this.departmentForm).then(res=>{
                                //对象解构定义返回对象 新增的data是null
                                let {success,msg,data} =res.data;
                                //判断
                                if (success){
                                    //关闭模态框
                                    this.dialogFormVisible=false;
                                    //发送成功消息框
                                    this.$message.success(msg);
                                    //刷新表格
                                    this.loadData();
                                }else {
                                    //发送失败消息框
                                    this.$message.error(msg);
                                }
                            })
                        }
                    })
                }else {
                    //新增
                    this.$refs.departmentForm.validate(v=>{
                        //如果通过验证再发送请求
                        if (v){
                            //departmentForm表单信息双向绑定所以直接作为发送请求的参数
                            //axios发送请求
                            this.$http.put("/department",this.departmentForm).then(res=>{
                                //对象解构定义返回对象 新增的data是null
                                let {success,msg,data} =res.data;
                                //判断
                                if (success){
                                    //关闭模态框
                                    this.dialogFormVisible=false;
                                    //发送成功消息框
                                    this.$message.success(msg);
                                    //刷新表格
                                    this.loadData();
                                }else {
                                    //发送失败消息框
                                    this.$message.error(msg);
                                }
                            })
                        }
                    })
                }


            },
            //自定义列显示 格式化数据
            format(row, column, cellValue, index){
                //当前行对象，当前列属性封装对象，当前列值，下标
                if (cellValue==0){
                    return "启用";
                }else {
                    return "禁用";
                }
            },
            //当前页状态改变方法
            currentChange(pageNo){
                //改变请求数据 query表单中的页码写在searchForm里
                this.searchForm.pageNo = pageNo;
                //重新发送请求
                this.loadData();
            },
            //封装后的发请求方法
            loadData(){

                //直接发送请求
                //相当于当前vue对象.axios的post请求方法, 参数是请求 和请求参数
                this.$http.patch("/departments",this.searchForm).then(res=>{
                    //then 是成功的回调函数 catch是失败 但一般不用
                    //直接在页面中展示生成的假数据 因为拦截器已经返回了假数据作为结果的data
                    //但当前data是object类型  要赋值应该再.list属性
                    /*this.departments=res.data.list;*/
                    //双向绑定直接赋值则显示
                    //easymock或后端接口整合
                    //对返回的对象进行解构定义
                    let {success,msg,data}=res.data;
                    //进行判断再赋值
                    if (success){
                        //发送成功消息框
                        this.total=data.total;
                        this.$message.success(msg);
                        this.departments=data.rows;
                    }else {
                        //发送失败消息框
                        this.$message.error(msg);
                    }

                })

                //发送请求 查询所有部门 因为是部门组件 必须在每一次做修改也就是加载后再查一遍
                this.$http.get("/departments").then(res=>{
                    let {success,data} = res.data;//ajaxresult
                    if (success){
                        //查询成功即赋值给上级部门数组
                        this.parentOptions = data;
                    }
                })
            },
            //高级查询的方法
            search(){
                //因为name已经双向绑定 所以直接发送请求
                this.loadData();
            },
            //删除单条方法
            handleDel(id){
                //触发后弹出确认框 提示信息 标题 json对象设置
                this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //发送删除请求
                    this.$http.delete("/department/"+id).then(res=>{
                        //对象解构定义返回对象 新增的data是null
                        let {success,msg,data} =res.data;
                        //判断
                        if (success){
                            //发送成功消息框
                            this.$message.success(msg);
                            //刷新表格
                            this.loadData();
                        }else {
                            //发送失败消息框
                            this.$message.error(msg);
                        }
                    })
                })

             },
            //批量删除方法
            batchRemove(){

                this.$confirm('此操作将永久删除这些部门, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = [];
                    for (let i = 0; i <this.selections.length ; i++) {
                        ids.push(this.selections[i].id);
                    }
                    //发送删除请求
                    this.$http.delete("/departments/"+ids.join(",")).then(res=>{
                        //对象解构定义返回对象 新增的data是null
                        let {success,msg,data} =res.data;
                        //判断
                        if (success){
                            //发送成功消息框
                            this.$message.success(msg);
                            //刷新表格
                            this.loadData();
                        }else {
                            //发送失败消息框
                            this.$message.error(msg);
                        }
                    })
                })

            },
            //表格状态改变触发函数 改变选择数组的值 启用批量删除的按钮
            selsChange(selections){
                this.selections=selections;
            }
        },
        //挂载完成后
        mounted() {
            //发送请求 查询所有经理
            this.$http.get("/getEmployeeByJobId/5").then(res=>{
                let {success,data} = res.data;//ajaxresult
                if (success){
                    //查询成功即赋值给经理数组
                    this.managerOptions = data;
                }
            })
            //发送请求显示数据
            this.loadData();
        }
    }
</script>

<style scoped>

</style>
