import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
import Departmentnt from "./views/nav1/Department"
import Employee from "./views/nav1/Employee"
import ShopRegister from "./views/user/ShopRegister"
import Shop from "./views/user/Shop"
import Product from "./views/product/Product"
import Adopt from "./views/pet/Adopt"
import Pet from "./views/pet/Pet"

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/shopRegister',
        component: ShopRegister,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '组织机构管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
           /* { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },*/
            { path: '/departmentnt', component: Departmentnt, name: '部门管理' },
            { path: '/employee', component: Employee, name: '员工管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '商家用户管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' },
            { path: '/shop', component: Shop, name: '商家管理' },
        ]
    },{
        path: '/',
        component: Home,
        name: '商品管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' },
            { path: '/product', component: Product, name: '商品管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '宠物管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' },
            { path: '/adopt', component: Adopt, name: '寻主管理' },
            { path: '/pet', component: Pet, name: '宠物管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;