<template>
<div class="body">
    <!-- <Transition appear name="logo-fade">
            <div style="position:absolute;margin-left: 80%;">
                <img src="../assets/LOGO1.png" width="250px">
            </div>
    </Transition> -->
    <div style="font-size:30px;font-weight:900;margin-top: 1%;margin-bottom: 1%;">
        Hi~,{{ username }},这是您商品的情况：
    </div>
 

    <el-dialog title="上架商品" :visible.sync="upVisible" width="30%" center>
        
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="商品名称" prop="name">
                        <el-input v-model="ruleForm.description" type="textarea"
                        :autosize="{ minRows: 2, maxRows: 100}">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品价格￥" prop="checkPrice">
                        <el-input v-model="ruleForm.price" autocomplete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="库存量" prop="checkCount">
                        <el-input  v-model="ruleForm.availCount" autocomplete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="发货地" prop="addr">
                        <el-input  v-model="ruleForm.address" autocomplete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="商品类型" prop="checkType">
                            <el-radio-group v-model="ruleForm.type">
                                <el-radio  label="药品"></el-radio>
                                <el-radio  label="食品饮料"></el-radio>
                                <el-radio  label="文学"></el-radio>
                                <el-radio  label="日常用品"></el-radio>
                            </el-radio-group>
                            
                    </el-form-item>
            </el-form>

        <span slot="footer" class="dialog-footer">    
            <el-button @click="buyVisiable=false">我再想想</el-button>
            <el-button type="primary" @click.native="submitForm('ruleForm')">立即上架</el-button>
        </span>
    </el-dialog>

    <div>
        <iframe :src="src1" 
            width="500" height="300" border="0"  
            marginwidth="0" marginheight="0" scrolling="0" allowtransparency="yes"></iframe>

            <iframe :src="src2" width="500" height="300" border="0"  
            marginwidth="0" marginheight="0" scrolling="0" allowtransparency="yes"></iframe>

            <iframe :src="src3" width="500" height="300" border="0"  
            marginwidth="0" marginheight="0" scrolling="0" allowtransparency="yes"></iframe>

            <iframe :src="src4" width="500" height="300" border="0"  
            marginwidth="0" marginheight="0" scrolling="0" allowtransparency="yes"></iframe>
    </div>
            


    <Mybutton msg="上架商品" @click.native="upVisible=true"></Mybutton>


</div>
</template>
    
    <script>
        import Mybutton from '@/components/Mybutton.vue';
        export default {
            name: "Bussiness",
            components: {
                Mybutton
            },
            created() {
                this.username = this.$route.query.userId;
                // this.$axios.get('/api/getsellerechart/uu/',{
                //     }).then((res) => {           
                //     });
            },
            mounted() {

            },
            data() {
                var checkName = (rule, value, callback) => {
                    if (!this.ruleForm.description) {
                        return callback(new Error('商品名不能为空'));
                    } else {
                        callback();
                    }
                };
                var validateCount = (rule, value, callback) => {
                    let result = this.ruleForm.availCount;
                        if (!result) {
                            callback(new Error('请输入库存量'));
                        } else {
                            var passwordreg = /(?![^0-9]*$)/;
                            if (!passwordreg.test(result)) {
                                return callback(new Error('库存量必须由数字组成'));
                            } else {
                                callback();
                            }
                        }
                };
                var validatePrice = (rule, value, callback) => {
                    let result = this.ruleForm.price;
                    if (!result) {
                        callback(new Error('请输入商品单价'));
                    } else {
                        var passwordreg = /(?![^0-9]*$)/;
                            if (!passwordreg.test(result)) {
                                return callback(new Error('价格必须由数字组成'));
                            } else {
                                callback();
                            }
                    }
                };
                var checkAddr = (rule, value, callback) => {
                    if (!this.ruleForm.address) {
                        return callback(new Error('发货地不能为空'));
                    } else {
                        callback();
                    }
                };
                var validateType = (rule, value, callback) => {
                    if (!this.ruleForm.type) {
                        return callback(new Error('商品类型不能为空'));
                    } else {
                        callback();
                    }
                };

                return {
                    username: '',
                    src1 : '/static/sellerGoodPie(wkshop).html',
                    src2: '/static/sellerOrderPie(wkshop).html',
                    src3: '/static/sellerSoldCountLine(wkshop).html',
                    src4: '/static/sellerSoldMoneyLine(wkshop).html',
                    upVisible: false,
                    ruleForm : {
                        description: '',
                        price: '',
                        availCount: '',
                        address: '',
                        type: ''
                    },
                    rules: {
                        checkCount: [
                            {validator:validateCount, trigger: 'blur'}
                        ],
                        checkPrice: [
                            { validator:validatePrice, trigger: 'blur'}
                        ],
                        name: [
                            {validator:checkName, trigger: 'blur'}
                        ],
                        addr: [
                        {validator:checkAddr, trigger: 'blur'}
                        ],
                        checkType: [
                            {validator:validateType, trigger: 'blur'}
                        ]
                    }             
                }
            },
            methods: {
                up() {
                    this.upVisible = false;
                    this.$notify({
                        title: '上架成功',
                        message: '祝老板财源广进~',
                        type: 'success'
                    });
                },
                submitForm(formName) {
                    console.log(this.username);
                    console.log(this.ruleForm.price);
                    console.log(this.ruleForm.availCount);
                    console.log(this.ruleForm.description);
                    console.log(this.ruleForm.address);
                    if (this.type =='药品') {
                        this.type = 1; 
                    } else if (this.type == '食品饮料') {
                        this.type = 2;
                    } else if (this.type == '文学') {
                        this.type = 3;
                    } else {
                        this.type = 4;
                    }
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.$axios({
                                method: 'post',
                                url: '/api/uploadgood/',
                                data: JSON.stringify({
                                        seller: this.username,
                                        price: this.ruleForm.price,
                                        availCount: this.ruleForm.availCount,
                                        soldCount: 0,
                                        description: this.ruleForm.description,
                                        type: this.type,
                                        address: this.ruleForm.address
                                        })
                                }).then(res => {
                                    this.$notify({
                                        title:'上架成功',
                                        message:'商品已经成功上架',
                                        type:'success'
                                    });
                                }).catch((err) => {
                                    if (err.response) {
                                            this.$notify({
                                                title:'上架失败',
                                                message:'由于神奇的原因失败辽~',
                                                type:'error'
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
        .logo-fade-enter-active {
            transition: all 2s ease;
        }
        .logo-fade-enter, .logo-fade-leave-to {
            transform: translateX(-1000px) rotate(720deg);
            opacity: 0;
        }
        .body {
            position : absolute;
	        width : 100%;
	        height : 100%;
            background: url("../assets/business.png") no-repeat;
            background-size:cover;
        }
</style>