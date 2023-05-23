<template>
    <div class="body">
        
        
        <Transition appear name="slide-fade">
            <div v-show="show" class="mainWindow" key="livelist">
                
                <div style="padding-top:5%; padding-bottom:5%">
                    <h1>修改个人信息</h1>
                </div>
    
                <div style="width:60%;margin: auto;">
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="旧密码" prop="pass">
                            <el-input type="password" v-model="ruleForm.pass" autocomplete="off" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="checkPass">
                            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="新身份" prop="checkRole">
                                <el-radio-group v-model="ruleForm.role">
                                    <el-radio  label="买家"></el-radio>
                                    <el-radio  label="商家"></el-radio>
                                </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>
            
                <div style="margin-top:5%;margin-bottom: 3%;">
                    <Mybutton msg="提交修改" @click.native="submitForm('ruleForm')"></Mybutton>
                </div>
            </div>
        </Transition>    
    </div>
    </template>
    
        <script>
        import Mybutton from '@/components/Mybutton.vue';
        export default {
        name: "Information",
        components:{
            Mybutton
        },
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入原始密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新的密码'));
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
            username: '',
            ruleForm: {
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
                checkRole: [
                    { validator:validateRole, trigger: 'blur'}
                ]
            }
          };
        },
        created() {
            document.addEventListener('keyup',this.keyup);       
            this.username=this.$route.query.id;
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
                var type = 1;
                if (this.ruleForm.role == "买家") {
                    type = 1;
                } else if (this.ruleForm.role == "商家") {
                    type = 2;
                }
                if (valid) {
                    this.$axios.put('/api/change/password/' + this.ruleForm.pass + '/',{
                        userId:this.username,
                        passWord:this.ruleForm.checkPass,
                        type:type,
                        money:0
                    }).then((res) => {

                            this.$notify.success({
                                title: '修改成功',
                                message: '请重新登录'
                            });
                            this.$router.push({name:'Login'});
                        

                    }).catch((err) => {
                        if (err.response) {
                            this.$notify.error({
                                title:'修改失败',
                                message:'原始密码错误！'
                            });
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
            .body {
                position : absolute;
                width : 100%;
                height : 100%;
                background: url("../assets/information.jpg") no-repeat;
                background-size:cover;
            }
            button{
                color: white;
                background-color: rgb(192, 48, 221);
                font-size: 20px;
            }
            .mainWindow {
                background-color: rgb(250, 219, 219);
                opacity: 0.9;
                width: 40%;
                height: 50%;
                margin: auto;
                margin-top: 10%;
                border-radius: 50px;
            }
    
    </style>