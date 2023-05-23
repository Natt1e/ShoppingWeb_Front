<template>
<div>

    <div class="topBox">
        <Transition appear name="logo-fade">
            <div style="position:absolute;margin-top:-4.8%;margin-left: 8%;">
                <img src="../assets/LOGO1.png" width="250px">
            </div>
        </Transition>
        
        
        <div style="position:relative;margin-right: 40%;padding-top: 1%;">
                    
            <!-- <div class="logo swing animated" style="text-align:center;display: inline-block;">
                <div>烧瓶</div>
                <div style="font-size: 16px;font:Microsoft Yahei;">心仪生活上烧瓶</div>
            </div> -->
            <div style="display:inline-block;font-size:35px;font-weight:500;color: #606266;">
                欢迎登录
            </div>  
        </div> 

    </div>

    
    <div class="main">
        <Transition appear name="slide-fade">
        <div class="box">
            <form autocomplete="off">
                <div>
                    <span class="title">
                        欢迎登录
                    </span>
                        <el-input style="font-size:20px;margin-top: 6%;"  placeholder="请输入用户名" prefix-icon="el-icon-user-solid"  v-model="username" clearable>
                        </el-input>

                        <el-input style="font-size:20px;margin-top: 6%;"  placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="password" show-password>
                        </el-input>
                    <Mybutton @click.native="click_login" msg="登录" style="width:200px;margin-top: 10%;"> </Mybutton>
                    
                    <div style="margin-top:10%">
                        没有账户？
                        <el-link type="primary" icon="el-icon-arrow-right" @click="click_re">
                            立即注册
                        </el-link>
                    </div>

                </div>
                
            </form>    
        </div>
        </Transition>
    </div>
    
    <!-- <div style="text-align:center;margin-top: 10px;">
        <a href="#" style="text-decoration: none;">联系我们</a>
    </div> -->
    <footer>
        Copyright © 2022-2022  烧瓶shopping.com 版权所有
    </footer>
    
</div>
</template>
  
  <script>
  import Mybutton from '@/components/Mybutton.vue'; 
  import VueCookie from 'vue-cookie';
  export default {
    name: "Login",
    components:{
        Mybutton
    },
    data() {
      return {
        username: '',
        password: '',
        money: '',
        mail: '',
        sessionid: '',
        type: null
      }
    },
    created() {
        document.addEventListener('keyup',this.keyup);
    },
    methods: {
      keyup(e) {
        let me = this;
        var key = e.which || e.keyCode;
        if (key == 13) {
            me.click_login(e);
        }
      },
      click_re() {
        this.$router.push({name:'Register'});
      },
      click_login(e) {
        let target = e.target;
        if (target.nodeName == 'SPAN' || target.nodeName == 'I') {
            target = e.target.parentNode;
        }
        target.blur();
        if (this.username === '') {
            this.$notify.error({
                        title: '未输入用户名',
                        message: '请输入用户名'
                    });            
        }        
        else if (this.password === '') {
            this.$notify.error({
                        title: '未输入密码',
                        message: '请输入密码'
                    });   
        } else {
        this.$axios.get('/api/signin/' + this.username + '/' + this.password + '/').then((res) => {
            this.mail = res.data.email_address;
            this.money = res.data.money;
            this.sessionid = res.data.sessionid;
            this.type = res.data.type;
            if (this.type == 1) {
                this.$router.push({path:'/main' , query: {userId: this.username, 
                money: this.money, mail: this.mail, sessionid: this.sessionid, password:this.password} });
            } else {
                this.$router.push({path:'/business' , query: {userId: this.username, 
                money: this.money, mail: this.mail, password:this.password} });
            }
            
            }).catch((err) => {
            if (err.response) {
                if (err.response.status == 404) {
                    this.$notify.error({
                        title: '用户名不存在',
                        message: '您输入的用户名不存在，请重新输入或注册'
                    });
                } else {
                    this.$notify.error({
                        title: '密码错误',
                        message: '您输入的密码有误，请重新输入'
                    });
                }
            }
        }) }
      }
    }
  }
  </script>
  
  <style scoped>
        .slide-fade-enter-active {
            transition: all .8s ease;
        }
        .slide-fade-enter, .slide-fade-leave-to {
            transform: translateY(200px);
            opacity: 0;
        }
        .swing {
            -webkit-transform-origin: top center;
            -ms-transform-origin: top center;
            transform-origin: top center;
            -webkit-animation-name: swing;
            animation-name: swing;
         }
        .animated {
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
        }
        .logo-fade-enter-active {
            transition: all 2s ease;
        }
        .logo-fade-enter, .logo-fade-leave-to {
            transform: translateX(1000px) rotate(720deg);
            opacity: 0;
        }
        .logo {
            display: inline-block;
            color: rgb(174, 0, 255);
            font-size: 30px;
            font-weight: 600;
            margin-top:10px;
            margin-right: 40px;
        }
        .topBox {
            padding-top: 9px;
            padding-bottom: 18px;
            font:"Microsoft YaHei";
            width: 100%;
        }
        .main {
            margin-top: 1%;
            width: 100%;
            height: 530px;
            background-color: rgba(247, 154, 211, 0.483);
            background-image: url(../assets/loginbg.jpg);
            background-size: 100%;
            background-attachment: fixed;
            padding-top: 40px;
        }
        .title{
            font-family: "San Francisco UI";
            font-size: 30px;
            font-weight: Bloder;

        }
        a:hover {
            color: red;
        }   
        a {
            text-decoration: none;
        }
        .fool {
            font-size: 10px;
            font-family: STSong;
            text-align: center;
            background-color: rgb(247, 241, 233);
            padding-top: 10px;
            padding-bottom: 10px;
        }
        .inputBox {
            outline: 0px;
            border: 0px;
            height: 40px;
        }
        button{
            color: white;
            background-color: rgb(192, 48, 221);
            font-size: 20px;
        }
    footer {
        background: black;
        color: gray;
        font-size: 13px;
        padding: 20px 20px;
        text-align: center;
        font-weight: bold;
        font-family: 'Courier New', Courier, monospace;
    }

    .box {
	position: relative;
    margin-left: 70%;
	width: 380px;
	height: 420px;
	background: white;
	border-radius: 8px;
	overflow: hidden;
    }

.box::before {
	content: '';
	z-index: 1;
	position: absolute;
	top: -50%;
	left: -50%;
	width: 380px;
	height: 420px;
	transform-origin: bottom right;
	background: linear-gradient(0deg, transparent, rgb(162, 35, 188), rgb(192, 48, 221));
	animation: animate 6s linear infinite;
}

.box::after {
	content: '';
	z-index: 1;
	position: absolute;
	top: -50%;
	left: -50%;
	width: 380px;
	height: 420px;
	transform-origin: bottom right;
	background: linear-gradient(0deg, transparent, rgb(27, 26, 26), rgb(26, 25, 25));
	animation: animate 6s linear infinite;
	animation-delay: -3s;
}
@keyframes animate {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
form {
	position: absolute;
	inset: 5px;
	background: white;
	padding: 50px 40px;
	border-radius: 8px;
	z-index: 2;
	display: flex;
	flex-direction: column;
}
  </style>