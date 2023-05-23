<template>
<div class="body">
    <Transition appear name="logo-fade">
        <div style="position:absolute;margin-left:5%">
            <img src="../assets/LOGO1.png" width="300px">
        </div>
    </Transition>
    
    
    <Transition appear name="slide-fade">
        <div v-show="show" class="mainWindow" key="livelist">
            
            <div style="padding-top:5%; padding-bottom:5%">
                <h1>欢迎来到烧瓶</h1>
            </div>

            <div style="width:60%;margin: auto;">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model.number="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="身份" prop="checkRole">
                            <el-radio-group v-model="ruleForm.role">
                                <el-radio  label="买家"></el-radio>
                                <el-radio  label="商家"></el-radio>
                            </el-radio-group>
                            
                    </el-form-item>
                </el-form>
            </div>
        
            <div style="margin-top:5%;margin-bottom: 3%;">
                <Mybutton msg="提交" @click.native="submitForm('ruleForm')"></Mybutton>
            </div>
            <Mybutton msg="返回登录" @click.native="click_return"></Mybutton>
        </div>
    </Transition>    
</div>
</template>

    <script>
    import Mybutton from '@/components/Mybutton.vue';
    export default {
    name: "Register",
    components:{
        Mybutton
    },
    data() {
        var checkUser = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'));
            } else if(value.length > 128) {
                return callback(new Error('用户名字符数不能超过128'));
            } else {
                var passwordreg = /(?![^a-zA-Z0-9]*$)/;
                if (!passwordreg.test(value)) {
                    return callback(new Error('用户名必须由数字或英文字母组成'));
                } else {
                    callback();
                }
                
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入的密码不一致'));
            } else {
                callback();
            }
        };
        var validateRole = (rule, value, callback) => {
            if (this.ruleForm.role == "") {
                callback(new Error('请选择身份'));
            } else {
                callback();
            }
        };
      return {
        ruleForm: {
            username: '',
            pass: '',
            checkPass: '',
            role: ''
        },
        show: true,
        status: 0,
        correct: true,
        rules: {
            pass: [
                {validator:validatePass, trigger: 'blur'}
            ],
            checkPass: [
                { validator:validatePass2, trigger: 'blur'}
            ],
            username: [
                {validator:checkUser, trigger: 'blur'}
            ],
            checkRole: [
                { validator:validateRole, trigger: 'blur'}
            ]
        }
      };
    },
    created() {
        document.addEventListener('keyup',this.keyup);
    },
    methods: {
        keyup(e) {
            let me = this;
            var key = e.which || e.keyCode;
            if (key == 13) {
                me.submitForm('ruleForm');
            }
        },
        click_return() {
        this.$router.push({name:'Login'});
        },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            var type = 3;
            if (this.ruleForm.role == "买家") {
                type = 1;
            } else if (this.ruleForm.role == "商家") {
                type = 2;
            }
            if (valid) {
                this.$axios({
                    method: 'post',
                    url: '/api/signup/',
                    data: JSON.stringify({
                            userId: this.ruleForm.username,
                            passWord: this.ruleForm.pass,
                            type: type
                            })
                    })
                .then(res => {
                    this.$notify({
                        title: '注册成功',
                        message: '欢迎来到烧瓶！',
                        type: 'success'
                    })
                    this.$router.push({name:'Login'});
                }).catch ((err) => {
                    if (err.response){
                        if (err.response.status == 401) {
                            this.$alert('该用户名已存在，请您更改','注册失败',{
                                type: 'warning'
                            })
                        }                    
                    }
                });
            } else {
                console.log('error');
                return false;
            }
        });
      }
    }
  }
    </script>

<style scoped>
        /deep/.el-input__inner {
            background-color: transparent !important;
            border: 1px solid #9a8c8c;
        }
        .slide-fade-enter-active {
            transition: all .8s ease;
        }
        .slide-fade-enter, .slide-fade-leave-to {
            transform: translateY(200px);
            opacity: 0;
        }
        .logo-fade-enter-active {
            transition: all 2s ease;
        }
        .logo-fade-enter, .logo-fade-leave-to {
            transform: translateX(1000px) rotate(720deg);
            opacity: 0;
        }
        .body {
            position : absolute;
	        width : 100%;
	        height : 100%;
            background: url("../assets/registerBackground.png") no-repeat;
            background-size:cover;
        }
        button{
            color: white;
            background-color: rgb(192, 48, 221);
            font-size: 20px;
        }
        .logo {
            display: inline-block;
            color: rgb(174, 0, 255);
            font-size: 36px;
            font-weight: 700;
            margin-right: 20px;
        }
        .mainWindow {
            background-color: rgb(250, 219, 219);
            opacity: 0.9;
            width: 40%;
            height: 60%;
            margin: auto;
            margin-top: 10%;
            border-radius: 50px;
        }

        .registerBtn {
            font-size: 20px;
            width: 200px;
            margin-top: 3%;
            margin-bottom: 3%;
            color: white;
            background-color: rgb(192, 48, 221);
        }
</style>