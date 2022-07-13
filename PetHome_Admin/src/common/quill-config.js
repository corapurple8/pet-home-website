const toolOptions = [
    ['bold', 'italic', 'underline', 'strike'],// 加粗，斜体，下划线，删除线
    ['blockquote'],// 引用
    [{ 'header': 1 }, { 'header': 2 }],// 标题，键值对的形式；1、2表示字体大小
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],//列表
    [{ 'indent': '-1'}, { 'indent': '+1' }],// 缩进
    [{ 'direction': 'rtl' }],// 文本方向
    [{ 'size': ['small', false, 'large', 'huge'] }],// 字体大小
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],//几级标题
    [{ 'color': [] }, { 'background': [] }],// 字体颜色，字体背景颜色
    [{ 'font': [] }],//字体
    [{ 'align': [] }],//对齐方式
    ['clean'],//清除字体样式
    ['image']//上传图片、上传视频
];
const handlers = {
    image(val){
        if(val){
            if(this.container.parentNode.id == 'intro'){
                let fileInput = document.getElementById("quill-img1").getElementsByTagName("input");
                fileInput[0].click()
            }else if(this.container.parentNode.id == 'orderNotice'){
                let fileInput = document.getElementById("quill-img2").getElementsByTagName("input");
                fileInput[0].click()
            }
        }
    }
};




export default {
    placeholder: '',
    theme: 'snow',  // 主题
    modules: {
        toolbar: {
            container: toolOptions,  // 工具栏选项
            handlers: handlers  // 事件重写
        }
    },
    initButton:function(){      //在使用的页面中初始化按钮样式
        const sourceEditorButton = document.querySelector('.ql-sourceEditor');
        sourceEditorButton.style.cssText = "width:80px; border:1px solid #ccc; border-radius:5px;";
        sourceEditorButton.innerText="源码编辑";
    }
};