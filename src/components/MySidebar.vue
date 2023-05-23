<template>
<div>  
<nav class="main-menu">
            <div>
                <div>
                    <el-avatar :src="headImage"></el-avatar>
                </div>
                <div v-if="!is_active"  style="color:white;font-size: 10px;">
                    未绑定
                </div>
                <div v-else  style="color:white;font-size: 10px;margin-top: 5%;">
                    {{ Mymail }}
                </div>

                
            </div>

            <ul>
                <li class="has-subnav">
                    <a href="#" @click="changeInfor">
                       <i class="fa fa-2x el-icon-user-solid"></i>
                        <span class="nav-text">
                            修改信息
                        </span>
                    </a> 
                </li>

                <li class="has-subnav">
                    <a href="#" @click="mailOp">
                       <i class="fa fa-2x el-icon-s-promotion"></i>
                        <span class="nav-text">
                            设置邮箱
                        </span>
                    </a> 
                </li>

                <!-- <li class="has-subnav">
                    <a href="#" @click="unbindVisible = true">
                       <i class="fa fa-2x el-icon-s-release"></i>
                        <span class="nav-text">
                            解绑邮箱
                        </span>
                    </a> 
                </li> -->
             
                <li class="has-subnav" @click="open">
                    <a href="#">
                    <i class="fa fa-2x el-icon-wallet" ></i>
                        <span class="nav-text">
                            余额&nbsp;
                            <Transition name="el-zoom-in-center">
                                    <i v-if="!isOpen" class="el-icon-arrow-down"> </i>
                                    <i v-if="isOpen" class="el-icon-arrow-up"> </i>           
                            </Transition>
                        </span>
                    </a>
                </li>

                <el-collapse-transition>
                    <li v-if="isOpen">
                    
                    <i class="fa fa-2x"></i>
                        <span class="nav-text" style="color:#999; font-family: arial;font-size: 14px;">
                            ￥{{money}}
                        </span>
                   
                    </li>
                </el-collapse-transition>
                


                <li class="has-subnav">
                    <a href="#" @click="click_cart">
                       <i class="fa fa-2x el-icon-shopping-cart-2"></i>
                        <span class="nav-text">
                            购物车
                        </span>
                    </a> 
                </li>

                <li class="has-subnav">
                    <a href="#" @click="click_order">
                       <i class="fa fa-2x el-icon-shopping-bag-2"></i>
                        <span class="nav-text">
                            我的订单
                        </span>
                    </a>
                   
                </li>

                <li class="has-subnav">
                    <a href="#" @click="dialogFormVisible=true">
                        <i class="fa fa-2x el-icon-coin"></i>
                        <span class="nav-text">
                           充值
                        </span>
                    </a>
                </li>

                <li class="has-subnav">
                    <a href="#">
                        <i class="fa fa-2x el-icon-headset"></i>
                        <span class="nav-text">
                           联系客服
                        </span>
                    </a>
                </li>

                <li class="has-subnav">
                    <a href="#" @click="bellVisible=true">
                        <i class="fa fa-2x el-icon-bell"></i>
                        <span class="nav-text">
                           通知开关
                        </span>
                    </a>
                </li>


            </ul>

            <ul class="logout" >
                <li>
                   <a href="#" @click="goBack">
                         <i class="fa fa-2x el-icon-switch-button"></i>
                        <span class="nav-text">
                            退出
                        </span>
                    </a>
                </li>  
            </ul>
</nav>
    <el-dialog title="输入充值金额" :visible.sync="dialogFormVisible" width="30%">
        <el-input style="font-size:20px;width: 40%;text-align: center;" v-model.number="Addmoney"></el-input>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">我再想想</el-button>
            <span @click="Recharge" style="margin-left:5%">
                <Mybutton msg="氪金"  class="Mybutton"></Mybutton>
            </span>
            
            <!-- <el-button type="primary" @click="dialogFormVisible = false">氪金</el-button> -->
        </div>
    </el-dialog>
    <el-dialog title="绑定邮箱" :visible.sync="bindVisible" width="30%">
        <span>
            <el-input placeholder="请输入您的邮箱" v-model="email"></el-input> 
        </span>
        <div  style="margin-top:5%;margin-bottom: 5%;">
            <el-button @click="sendMail">发送邮件</el-button>
        </div>
        <el-input placeholder="请输入您的验证码" v-model="safe"></el-input> 
        <div slot="footer" class="dialog-footer">
            <el-button @click="bindVisible = false">我再想想</el-button>
            <span @click="bind" style="margin-left:5%">
                <Mybutton msg="确认提交"  class="Mybutton"></Mybutton>
            </span>    
        </div>
    </el-dialog>

    <el-dialog title="解绑邮箱" :visible.sync="unbindVisible" width="30%">
        您将解绑您的邮箱： {{ Mymail }}
        <div slot="footer" class="dialog-footer">
            <el-button @click="unbindVisible=false">我再想想</el-button>
            <span @click="unbind" style="margin-left:5%">
                <Mybutton msg="确认解绑"  class="Mybutton"></Mybutton>
            </span>    
        </div>
    </el-dialog>

    <el-dialog title="更改通知开关" :visible.sync="bellVisible" width="30%">
        <div style="font-size:20px;margin-bottom:5%">
            余额变动提醒
            <el-switch
                v-model="money_change"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
        </div>

        <div style="font-size:20px;margin-bottom:5%">
            订单提醒
            <el-switch
                v-model="buy_change"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
        </div>
        
        <div slot="footer" class="dialog-footer">
            <el-button @click="bellVisible=false">我再想想</el-button>
            <span @click="changeBell" style="margin-left:5%">
                <Mybutton msg="确认更改"  class="Mybutton"></Mybutton>
            </span>    
        </div>
    </el-dialog>
    



</div>     
</template>

<script>
import head_image from "../assets/head.png";
import Mybutton from "./Mybutton.vue";
import axios from 'axios';
export default {
name: 'MySidebar',
components: {
    Mybutton
},
props: {
    username: String,
    money: String,
    password: String,
    Mymail:String,
    money_change:Boolean,
    buy_change:Boolean,
    is_active:Boolean
},
data() {
    return {
        headImage : head_image,
        isOpen:false,
        visible: true,
        dialogFormVisible: false,
        Addmoney: 100,
        bindVisible:false,
        email: '',
        unbindVisible:false,
        safe: '',
        systemSafe: '',
        bellVisible:false
    }
},
methods: {
    mailOp() {
        if (!this.is_active) {
            this.bindVisible = true;
        } else {
            this.unbindVisible = true;
        }
    },
    changeBell() {
        this.bellVisible=false;
        if (this.Mymail != '') {
            this.$axios.put('/api/bind/',{
                    userId:this.username,
                    money_change:this.money_change,
                    is_active:true,
                    buy_change:this.buy_change
                }).then((res) => {
                    this.$notify({
                        title: '更改成功失败',
                        message: '消息通知开关更改成功辣~',
                        type: 'success'
                    });
                });
        }
    },
    open(){
        this.isOpen = !this.isOpen;
    },
    goBack() {
        this.$router.push({path: '/'});
    },
    click_cart() {
                let routerDate = this.$router.resolve({
                    path: '/cart',
                    query: {
                        id:this.username
                    }
                });
                window.open(routerDate.href,'_blank');
            },
    click_order() {
                let routerDate = this.$router.resolve({
                    path: '/order',
                    query: {
                        id:this.username
                    }
                });
                window.open(routerDate.href,'_blank');
            },
    Recharge() {
        this.dialogFormVisible = false;
        this.$axios.put('/api/addmoney/',{
            money: this.Addmoney,
            userId: this.username,
            password: this.password
        }).then((res) => {
        });
        this.$notify.success({
                        title: '充值成功',
                        message: '钱包鼓鼓的，可以去烧瓶啦~'
                    });
    },
    changeInfor() {
        let routerDate = this.$router.resolve({
                    path: '/information',
                    query: {
                        id:this.username
                    }
                });
                window.open(routerDate.href,'_blank');
    },
    sendMail() {
        this.$axios({
                                method: 'post',
                                url: '/api/bind/',
                                data: JSON.stringify({
                                        userId:this.username,
                                        email_address:this.email
                                        })
                                }).then(res => {
                                    this.$notify({
                                        title:'发送成功',
                                        message:'请注意查收邮件',
                                        type:'success'
                                    });
                                    this.systemSafe = res.data.请输入验证码;
                                }).catch((err) => {
                                    if (err.response) {
                                            this.$notify({
                                                title:'发送失败',
                                                message:'由于神奇的原因失败辽~',
                                                type:'error'
                                        });
                                    }
                                });
    },
    unbind() {
        this.unbindVisible = false;
        this.$axios({
                    method: 'delete',
                    url: '/api/unbind/' + this.username + '/' + this.password + '/',
                }).then(res => {
                    this.$notify({
                        title: '成功解绑',
                        message: '感谢您的支持',
                        type: 'success'
                    });
                });    
        this.is_active = false;
    },
    bind() {
        this.bindVisible=false;
        if (this.systemSafe == this.safe) {
            this.$notify({
                        title: '成功绑定',
                        message: '感谢您的支持',
                        type: 'success'
                    });
            this.$axios.put('/api/bind/',{
                    userId:this.username,
                    money_change:true,
                    is_active:true,
                    buy_change:true
                }).then((res) => {
                });
            this.is_active = true;
            this.Mymail = this.email;
        } else {
            this.$notify({
                        title: '绑定失败',
                        message: '验证码错误',
                        type: 'error'
                    });
            this.$axios({
                    method: 'delete',
                    url: '/api/unbind/' + this.username + '/' + this.password + '/',
                }).then(res => {
                }); 
            
        }
    }
}
}
</script>

<style scoped lang="less">
        .Mybutton{
            color: white;
            background-color: rgb(192, 48, 221);
            font-size: 20px;
        }
.fa-2x {
font-size: 2em;
}
.fa {
position: relative;
display: table-cell;
width: 60px;
height: 36px;
text-align: center;
vertical-align: middle;
font-size:20px;
}


.main-menu:hover,nav.main-menu.expanded {
width:200px;
overflow:visible;
}

.main-menu {
background:#212121;
border-right:1px solid #e5e5e5;
position:fixed;
top:0;
bottom:0;
height:100%;
left:0;
width:60px;
overflow:hidden;
-webkit-transition:width .05s linear ;
transition:width .05s linear;
-webkit-transform:translateZ(0) scale(1,1);
z-index:1000;
}
.has-subnav {
    margin-top: 15px;
}
.main-menu>ul {
margin:7px 0;
}

.main-menu li {
position:relative;
display:block;
width:200px;
}

.main-menu li>a {
position:relative;
display:table;
border-collapse:collapse;
border-spacing:0;
color:#999;
font-family: arial;
font-size: 14px;
text-decoration:none;
-webkit-transform:translateZ(0) scale(1,1);
-webkit-transition:all .1s linear;
transition:all .1s linear;
  
}

.main-menu .nav-icon {
position:relative;
display:table-cell;
width:60px;
height:36px;
text-align:center;
vertical-align:middle;
font-size:18px;
}

.main-menu .nav-text {
position:relative;
display:table-cell;
vertical-align:middle;
width:190px;
}

.main-menu>ul.logout {
    position: fixed;
    bottom: 10%;
}
.no-touch .scrollable.hover {
overflow-y:hidden;
}

.no-touch .scrollable.hover:hover {
overflow-y:auto;
overflow:visible;
}

a:hover,a:focus {
text-decoration:none;
}

nav {
-webkit-user-select:none;
-moz-user-select:none;
-ms-user-select:none;
-o-user-select:none;
user-select:none;
}

nav ul,nav li {
outline:0;
margin:0;
padding:0;
}
.main-menu li:hover>a,nav.main-menu li.active>a,.dropdown-menu>li>a:hover,.dropdown-menu>li>a:focus,.dropdown-menu>.active>a,.dropdown-menu>.active>a:hover,.dropdown-menu>.active>a:focus,.no-touch .dashboard-page nav.dashboard-menu ul li:hover a,.dashboard-page nav.dashboard-menu ul li.active a {
color:#fff;
background-color:#5fa2db;
}

</style>