<script src="../mock/adopt.js"></script>
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
                    <el-input v-model="searchForm.name" placeholder="寻主信息宠物名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="searchForm.state" placeholder="寻主信息状态"></el-input>
                </el-form-item>
                <!--搜索确认按钮-->
                <el-form-item>
                    <el-button type="success" @click="search">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-col>


        <!--处理寻主信息的模态框-->
        <el-dialog title="处理寻主信息" :visible.sync="dialogFormVisible2" width="1000px">
            <el-form :model="adoptForm">
                <!--不是行内 自动上下排列-->
                <!--需要进行编辑和新增的是name和sn-->
                <!--该条输入框绑定的数据name 用作rules进行规定-->
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="" label-width="150">
                            <!--双向绑定编辑表单的名称 内显示寻主信息名称进行提示-->
                            <p>标题:{{adoptForm.title}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="" label-width="150">
                            <p>萌宠名称:{{adoptForm.name}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="" label-width="150">
                            <!--双向绑定编辑表单的名称 内显示寻主信息名称进行提示-->
                            <p>价格:{{adoptForm.price}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="" label-width="150">
                            <p>年龄：{{adoptForm.age}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="" label-width="150">
                            <!--双向绑定编辑表单的名称 内显示寻主信息名称进行提示-->
                            <p>性别:{{adoptForm.sex}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="" label-width="150">
                            <p>地址:{{adoptForm.address}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="" label-width="150">
                            <!--双向绑定编辑表单的名称 内显示寻主信息名称进行提示-->
                            <p>毛色:{{adoptForm.coatColor.name}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="" label-width="150">
                            <p>类型:{{adoptForm.petType.name}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="" label-width="150">
                            <!--双向绑定编辑表单的名称 内显示寻主信息名称进行提示-->
                            <p>出售人:{{adoptForm.user.username}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                        <!--取消的点击事件 隐藏模态框-->
                        <el-button @click="dialogFormVisible2 = false">我不收购</el-button>
                        <!--确定的点击事件：提交表单-->
                        <el-button type="primary" @click="submitPet">我要收购</el-button>
                </el-row>
            </el-form>
        </el-dialog>

        <!--添加宠物的模态框-->
        <el-dialog title="修改宠物信息" :visible.sync="dialogFormVisible3" width="1000px">
            <el-form :model="petForm">
                <!--不是行内 自动上下排列-->
                <!--需要进行编辑和新增的是name和sn-->
                <!--该条输入框绑定的数据name 用作rules进行规定-->
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="" label-width="150">
                            <!--双向绑定编辑表单的名称 内显示寻主信息名称进行提示-->
                            <p>标题:{{adoptForm.title}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="" label-width="150">
                            <p>萌宠名称:{{adoptForm.name}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="" label-width="150">
                            <p>价格:{{adoptForm.price}}</p>
                            <!--双向绑定编辑表单的名称 内显示寻主信息名称进行提示-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="" label-width="150">
                            <p>年龄:{{adoptForm.age}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="" label-width="150">
                            <p>性别:{{adoptForm.sex}}</p>
                            <!--双向绑定编辑表单的名称 内显示寻主信息名称进行提示-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="" label-width="150">
                            <p>地址:{{adoptForm.address}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="" label-width="150">
                            <p>毛色:{{adoptForm.coatColor.name}}</p>
                            <!--双向绑定编辑表单的名称 内显示寻主信息名称进行提示-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="" label-width="150">
                            <p>类型:{{adoptForm.petType.name}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="" label-width="150">
                            <p>出售人:{{adoptForm.user.username}}</p>
                            <!--双向绑定编辑表单的名称 内显示寻主信息名称进行提示-->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="" label-width="150">
                            <!--双向绑定编辑表单的名称 内显示商品名称进行提示-->
                            <el-input v-model="petForm.name" autocomplete="off" placeholder="萌宠名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="" label-width="150">
                            <el-input v-model="petForm.saleprice" autocomplete="off" placeholder="售价"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-upload
                        class="upload-demo"
                        action="http://localhost:8080/fastdfs/uploadFile/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="handleSuccess"
                        :file-list="fileList"
                        list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <el-form-item label="" label-width="150">
                    <el-upload class="avatar-uploader quill-img" id="quill-img1" style="display: none;"
                               action="http://localhost:8080/fastdfs/uploadFile"
                               :show-file-list="false"
                               :on-success="quillImgSuccess1"
                               accept='.jpg,.jpeg,.png,.gif'>
                    </el-upload>
                    <quill-editor id="intro" v-model="petForm.petDetail.intro" placeholder="宠物描述" ref="intro" :options="quillOption"></quill-editor>
                </el-form-item>
                <el-form-item label="" label-width="150">
                    <el-upload class="avatar-uploader quill-img" id="quill-img2" style="display: none;"
                               action="http://localhost:8080/fastdfs/uploadFile"
                               :show-file-list="false"
                               :on-success="quillImgSuccess2"
                               accept='.jpg,.jpeg,.png,.gif'>
                    </el-upload>
                    <quill-editor id="orderNotice" v-model="petForm.petDetail.adoptNotice" placeholder="领养须知" ref="orderNotice" :options="quillOption"></quill-editor>
                </el-form-item>
                <el-row>
                    <!--确定的点击事件：提交表单-->
                    <el-button type="primary" @click="savePet">保存该宠物</el-button>
                </el-row>
            </el-form>
        </el-dialog>


        <!--表格绑定状态改变函数调用方法改变批量删除选择数组的值-->
        <el-table
                :data="adopts"
                style="width: 100%;margin: auto" @selection-change="selsChange">
            <!--批量删除的选择键-->
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="id" label="编号" width="180"></el-table-column>
            <el-table-column prop="title" label="寻主信息标题" width="180"></el-table-column>
            <el-table-column prop="name" label="宠物名字" width="180"></el-table-column>
            <el-table-column prop="price" label="售价" width="180"></el-table-column>
            <el-table-column prop="age" label="年纪" width="180"></el-table-column>
            <el-table-column prop="gender" label="公母" width="180"></el-table-column>
            <el-table-column prop="coatColor.name" label="萌宠毛色" width="180"></el-table-column>
            <el-table-column prop="resources" label="图片资源" width="180"></el-table-column>
            <el-table-column prop="petType.name" label="宠物类型" width="180"></el-table-column>
            <el-table-column prop="address" label="地址" width="180"></el-table-column>
            <el-table-column prop="user.username" label="送养人" width="180"></el-table-column>
            <el-table-column prop="shop.name" label="接收店铺" width="180"></el-table-column>
            <!--自定义列的显示 格式化展示 状态为0启用 -1禁用-->
            <!--方法一 格式化方法format 定义格式化函数 但不能解析html标签-->
            <!-- <el-table-column prop="state" label="状态" width="180" :formatter="format"></el-table-column>-->

            <el-table-column prop="state" label="状态" width="180">
                <template slot-scope="scope">
                    <b v-if="scope.row.state==0" style="color: green">启用</b>
                    <b v-else-if="scope.row.state==1" style="color: green">待处理</b>
                    <b v-else-if="scope.row.state==3" style="color: green">已驳回</b>
                    <span v-else style="color: #ff0000">已处理</span>
                </template>
            </el-table-column>
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
            <el-button type="danger" @click="handleAdopt" :disabled="this.selections.length!=1">处理寻主信息</el-button>
            <!--分页工具栏 sizes每页条数选择下拉框 prev上一页pager选择页码 next下一页 jumper跳转-->
            <el-pagination small layout="prev, pager, next,jumper,total" :total="total" style="float: right"
                           @current-change="currentChange"></el-pagination>
        </el-col>

    </div>
</template>

<script>
    import { quillEditor } from "vue-quill-editor"; //调用编辑器 
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import quillOption from '../../common/quill-config.js'
    export default {
        name: 'adopt',
        components: {
            quillEditor     //自定义局部组件 使用导入的vue-quill-editor js内部的组件
        },
        data() {
            return {

                //富文本框设置激活
                quillOption:quillOption,
                //'id':' 'name':'phone':'email':'@email','address': 'createTime
                adopts: [],//表格展示数据,自动循环展示每一个对象
                total: 0,//分页总数
                //搜索框 只对名字模糊查询
                searchForm: {
                    name: "",
                    state: "",
                    pageNo: 1,
                    pageSize: 10
                },
                //回显寻主信息
                adoptForm:{
                    id:"",
                    name:"",
                    price:"",
                    age:"",
                    gender:"",
                    coatColor: {
                        id:"",
                        name:""
                    },
                    resources:"",
                    petType: {
                        id:"",
                        name:""
                    },
                    address:"",
                    state:"",
                    title:"",
                    user: {
                        id:"",
                        username:"",
                    },
                    shop: {
                        id:"",
                        name:""
                    },
                },
                //宠物信息(确认收购后显示的表单 收购后该宠物成为商品写进pet中，但还没上架)
                petForm:{
                    adopt: {
                        id:"",
                        name:"",
                        price:"",
                        age:"",
                        gender:"",
                        coatColor: {
                            id:"",
                            name:""
                        },
                        resources:"",
                        petType: {
                            id:"",
                            name:""
                        },
                        address:"",
                        state:"",
                        title:"",
                        user: {
                            id:"",
                            username:"",
                        },
                        shop: {
                            id:"",
                            name:""
                        },
                    },
                    id:"",
                    name:"",
                    resources:"",
                    saleprice:"",
                    offsaletim:"",
                    onsaletime:"",
                    state:-1,//直接设置为下架
                    costprice:"",
                    createtime:"",
                    petType: {
                        id:"",
                        name:"",
                    },
                    shop: {
                        id:"",
                    },
                    user:"",
                    petDetail:{
                        id:"",
                        intro:"",
                        adoptNotice:"",
                        pet_id:"",
                    }
                },
                //图片上传
                fileList: [],

                //直接在挂载完成后直接查询出来 节省资源
                managerOptions: [],//新增修改模态框 选择寻主信息经理的下拉菜单查询出的所有经理数组
                parentOptions: [],//新增修改模态框 选择上级寻主信息的下拉菜单查询出的所有寻主信息数组
                selections: [],//批量删除的选择数组
                //模态框是否可见
                dialogFormVisible: false,
                //处理寻主信息的模态框是否可见
                dialogFormVisible2:false,
                //收购后宠物表单提交的模态框是否可见
                dialogFormVisible3:false,
                //状态启用选择框是否可见 编辑有用
                isNeedState: false,
                rules: {
                    //与form-item的prop绑定
                    name: [
                        //必须填写  message验证失败的提示信息 trigger 触发该验证的时间 blur失焦
                        {required: true, message: '请输入寻主信息名称', trigger: 'blur'},
                    ],
                },
                //头像大小规定尺寸 满
                fit: 'contain'
            }
        },
        methods: {
            //新增按钮的点击事件
            handleAdd() {
                //不可见状态修改
                this.isNeedState = false;
                //清空表单  重新赋值
                this.fileList = [];
                this.adoptForm = {
                    id: null,
                    name: "",
                    resources: "",
                    state: 0,
                }
                //显示模态框
                this.dialogFormVisible = true;
            },
            //图片上传的各种控制方法
            handleSuccess(res, file, fileList) {//成功上传
                //console.log("===========")
                //console.log(response.data);
                //console.log(file);
                //console.log(fileList);
                //将地址返回
                let url = res.data;
                let fileName = url.substring(url.lastIndexOf("/") + 1);
                console.debug(url)
                console.debug(fileName)

                this.fileList.push({name: fileName, url: url});
                console.debug("=====================")
                console.debug(this.fileList)
            },
            handleRemove(file, fileList) {
                console.debug(file)
                let url = file.url;//file 格式
                //找到文件名
                //let fileName = url.substring(url.lastIndexOf("/") + 1);
                //
                // for (let i = 0; i < this.fileList.length; i++) {
                //     if (this.fileList[i].url == url) {
                //         //删掉该下标的对象 该方法表示删除i下标的一个对象
                //         this.fileList.slice(i, 1)
                //     }
                // }
                let filePath = url.substring(20);
                //let arr = filePath.split("/");
                //console.debug(arr)
                //先将uri编码然后转为string传入请求
                //let path = JSON.stringify(encodeURIComponent(filePath));
                //console.debug(filePath)
                //发请求删除fastdfs的该图片
                //this.$http.delete("/fastdfs/delete/" + arr[1]+"/"+arr[5])
                this.$http.get("/fastdfs/delete?path=" + filePath)
                    .then(res => {
                        if (res.data.success) {
                            this.$message({
                                message: '删除成功!',
                                type: 'success'
                            });
                        } else {
                            this.$message({
                                message: '删除失败!',
                                type: 'error'
                            });
                        }
                    })
            },
            handlePreview(file) {
                //预览
                console.log(file);
            },
            //处理寻主信息的点击事件
            handleAdopt(){
                //新的模态框显示一下该行的数据回显
                //选择框的对象只允许选择一个直接用
                this.adoptForm = this.selections[0];
                console.debug(this.selections[0])
                console.debug(this.adoptForm)
                //然后显示模态框
                this.dialogFormVisible2 = true;
            },
            //提交寻主信息表单
            submitPet(){
                //初始化最终商品表单
                this.petForm.adopt = this.adoptForm;
                this.petForm.costprice = this.adoptForm.saleprice;
                this.petForm.name = this.adoptForm.name;
                this.petForm.petType = this.adoptForm.petType;
                this.petForm.resources=this.adoptForm.resources;
                this.petForm.shop = this.adoptForm.shop;
                this.petForm.user = null;
                //展示模态框
                this.dialogFormVisible3 = true;
            },
            //保存宠物信息
            savePet(){
                //先把图片转到resources
                if (this.fileList != null) {
                    for (let i = 0; i < this.fileList.length; i++) {
                        console.debug("循环里的url：" + this.fileList[i].url)
                        if (!this.petForm.resources) {
                            this.petForm.resources = this.fileList[i].url;
                        } else {
                            this.petForm.resources = this.petForm.resources + "," + this.fileList[i].url;
                        }
                    }
                }
                //发送请求
                this.$http.put("/pet",this.petForm).then(res=>{
                    let{success,msg,data}=res.data;
                    if (success){
                        //成功后刷新表格
                        //关闭模态框
                        this.dialogFormVisible2 = false;
                        this.dialogFormVisible3 = false;
                        this.loadData();
                    }
                })
            },
            //编辑寻主信息的点击事件
            handleEdit(id) {
                //编辑寻主信息
                //发送请求进行数据回显
                this.$http.get("/adopt/" + id).then(res => {
                    //获取到的对象直接赋值给编辑表单
                    let {success, msg, data} = res.data;//此时的data用adoptDetail接收 包括寻主信息信息
                    if (success) {
                        this.adoptForm = data.adopt;
                        this.fileList = [];
                        let urls = this.adoptForm.resources.split(",")
                        for (let i = 0; i < urls.length; i++) {
                            let fileName = urls[i].substring(urls[i].lastIndexOf("/") + 1);
                            let url = urls[i];
                            this.fileList.push({name: fileName, url: url});
                        }
                        //显示状态修改
                        this.isNeedState = true;
                        //显示模态框
                        this.dialogFormVisible = true;
                    }
                })
            },
            //提交表单的方法
            submitForm() {
                console.debug(this.fileList)
                //先把图片转到resources
                if (this.fileList != null) {
                    for (let i = 0; i < this.fileList.length; i++) {
                        console.debug("循环里的url：" + this.fileList[i].url)
                        if (!this.adoptForm.resources) {
                            this.adoptForm.resources = this.fileList[i].url;
                        } else {
                            this.adoptForm.resources = this.adoptForm.resources + "," + this.fileList[i].url;
                        }
                    }
                }
                console.debug("路径" + this.adoptForm.resources)
                //验证成功后再提交表单 refs参考 新增表单的验证方法-rules
                //进行判断 如果表单的id不为空则是编辑 发送编辑请求
                if (this.adoptForm.id) {
                    this.$refs.adoptForm.validate(v => {
                        //如果通过验证再发送请求
                        if (v) {
                            //adoptForm表单信息双向绑定所以直接作为发送请求的参数
                            //axios发送请求
                            this.$http.post("/adopt", this.adoptForm).then(res => {
                                //对象解构定义返回对象 新增的data是null
                                let {success, msg, data} = res.data;
                                //判断
                                if (success) {
                                    //关闭模态框
                                    this.dialogFormVisible = false;
                                    //发送成功消息框
                                    this.$message.success(msg);
                                    //刷新表格
                                    this.loadData();
                                } else {
                                    //发送失败消息框
                                    this.$message.error(msg);
                                }
                            })
                        }
                    })
                } else {
                    //新增
                    this.$refs.adoptForm.validate(v => {
                        //如果通过验证再发送请求
                        if (v) {
                            //adoptForm表单信息双向绑定所以直接作为发送请求的参数
                            //axios发送请求
                            this.$http.put("/adopt", this.adoptForm).then(res => {
                                //对象解构定义返回对象 新增的data是null
                                let {success, msg, data} = res.data;
                                //判断
                                if (success) {
                                    //关闭模态框
                                    this.dialogFormVisible = false;
                                    //发送成功消息框
                                    this.$message.success(msg);
                                    //刷新表格
                                    this.loadData();
                                } else {
                                    //发送失败消息框
                                    this.$message.error(msg);
                                }
                            })
                        }
                    })
                }
            },
            //两个富文本框的响应成功事件
            //寻主信息描述 富文本编辑框图片上传
            //宠物描述 富文本编辑框图片上传
            quillImgSuccess1(res, file) {
                // 获取富文本组件实例
                let quill = this.$refs.intro.quill;
                // 如果上传成功
                if (res.success) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.data为服务器返回的图片地址
                    quill.insertEmbed(length, 'image', res.data);// 这里的url是图片的访问路径不是真实物理路径
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
            },
            //领养须知 富文本编辑框图片上传
            quillImgSuccess2(res, file) {
                // 获取富文本组件实例
                let quill = this.$refs.orderNotice.quill;
                // 如果上传成功
                if (res.success) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.data为服务器返回的图片地址
                    quill.insertEmbed(length, 'image', res.data);// 这里的url是图片的访问路径不是真实物理路径
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
            },
            //当前页状态改变方法
            currentChange(pageNo) {
                //改变请求数据 query表单中的页码写在searchForm里
                this.searchForm.pageNo = pageNo;
                //重新发送请求
                this.loadData();
            },
            //封装后的发请求方法
            loadData() {

                //直接发送请求
                //相当于当前vue对象.axios的post请求方法, 参数是请求 和请求参数
                this.$http.patch("/adopts", this.searchForm).then(res => {
                    //then 是成功的回调函数 catch是失败 但一般不用
                    //直接在页面中展示生成的假数据 因为拦截器已经返回了假数据作为结果的data
                    //但当前data是object类型  要赋值应该再.list属性
                    /*this.adopts=res.data.list;*/
                    //双向绑定直接赋值则显示
                    //easymock或后端接口整合
                    //对返回的对象进行解构定义
                    let {success, msg, data} = res.data;
                    //进行判断再赋值
                    if (success) {
                        //发送成功消息框
                        this.total = data.total;
                        this.$message.success(msg);
                        this.adopts = data.rows;
                    } else {
                        //发送失败消息框
                        this.$message.error(msg);
                    }

                })

                //发送请求 查询所有寻主信息 因为是寻主信息组件 必须在每一次做修改也就是加载后再查一遍
                this.$http.get("/adopts").then(res => {
                    let {success, data} = res.data;//ajaxresult
                    if (success) {
                        //查询成功即赋值给上级寻主信息数组
                        this.parentOptions = data;
                    }
                })
            },
            //高级查询的方法
            search() {
                //因为name已经双向绑定 所以直接发送请求
                this.loadData();
            },
            //删除单条方法
            handleDel(id) {
                //触发后弹出确认框 提示信息 标题 json对象设置
                this.$confirm('此操作将永久删除该寻主信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //发送删除请求
                    this.$http.delete("/adopt/" + id).then(res => {
                        //对象解构定义返回对象 新增的data是null
                        let {success, msg, data} = res.data;
                        //判断
                        if (success) {
                            //发送成功消息框
                            this.$message.success(msg);
                            //刷新表格
                            this.loadData();
                        } else {
                            //发送失败消息框
                            this.$message.error(msg);
                        }
                    })
                })

            },
            //表格状态改变触发函数 改变选择数组的值 启用批量删除的按钮
            selsChange(selections) {
                this.selections = selections;
            }
        },
        //挂载完成后
        mounted() {
            //发送请求显示数据
            this.loadData();
        }
    }
</script>

<style scoped>

</style>
