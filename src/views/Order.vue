<template>
    <div>
        <div class="center">
            <span @click="back">
            <div style="display: inline-block;">
                <img src="../assets/logo.png" width="80">
            </div>
            <div class="logo" style="text-align:center;display: inline-block;">
                <div>烧瓶</div>
                <div style="font-size: 16px;">心仪生活上烧瓶</div>
            </div>
            </span>
            <div class="logo">
                我的订单
            </div>
            <span style="font-weight:900;">
                合计支付：￥{{ total }}
            </span>
            
        </div>

        <div v-if="goods.length==0" id="no">
                <el-empty image-size:50px description="这里什么都没有呢，快去逛逛叭~"></el-empty>
        </div>
        <div id = "main" v-if="goods.length!=0">
            <div class="item" v-for="good in goods">
            <div class="imageBox" @click="click_detail(good)" v-if="good.pic.length!=0"
            :style="{'backgroundImage': 'url(' + require('../../../static/' + good.pic[0])  + ')'}">
            </div>
            <div class="imageBox" @click="click_detail(good)" v-if="good.pic.length==0"
            :style="{'backgroundImage': 'url(' + require('../../../static/' + '-1.jpg')  + ')'}">
            </div>
            <div class="nameText">
                {{ good.good }}
            </div>
            <div class="priceBox">
                <div style="padding-top:50%">
                    <div>
                      支付:￥{{ good.actual_paid }}
                    </div>
                    quanatity:{{ good.count }}
                </div>

            </div>
            <div class="counter">
                <div>
                    FORM:{{ good.FromPlace }}
                </div>
                <div>
                    TO:{{ good.ToPlace }}
                </div>
                <el-button   type="primary"  @click="submitComment1(good)"
                style="background-color: rgb(174, 0, 255);color: white;">
                    写评价
                </el-button>
                <div class="money">
                    
                </div>
                <div>
                    {{ good.time }}
                </div>
                
            </div>
        </div>
        </div>
        <el-dialog
            title="撰写评价"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <el-rate v-model="score"></el-rate>
            <el-input v-model="content" type="textarea"
            :autosize="{ minRows: 3, maxRows: 100}">
            </el-input>
            <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">我再想想</el-button>
            <el-button type="primary" @click="submitComment">提交评价</el-button>
            </span>
        </el-dialog>
    
    </div>
    </template>
    
    <script>
        import axios from 'axios';
        import Mybutton from '@/components/Mybutton.vue';
        export default {
            name: "Detail",
    async created() {
        this.id = this.$route.query.id;
        await axios.get("/api/getorder/" + this.id + "/all/").then((res) => {
            this.goods = res.data;
        });
        this.total = 0;
        for (var i = 0;i < this.goods.length;i++) {
            this.total = this.total + Number(this.goods[i].actual_paid);
        }      
    },
    components() {
        Mybutton;
    },
    data() {
        return {
            id: "",
            goods: [],
            centerDialogVisible: false,
            content: '',
            score: null,
            currentId: null,
            currentOrder:null,
            total: 0
        };
    },
    methods: {
        back() {
            this.$router.push({ path: "/main", query: { userId: this.id } });
        },
        submitComment() {
            this.centerDialogVisible = false;
            if (this.content === "") {
                this.$notify.error({
                        title: '评论失败',
                        message: '评论内容不能为空'
                    });
            } else {
                this.$axios({
                    method: 'post',
                    url: '/api/addcomment/',
                    data: JSON.stringify({
                            grade: this.score,
                            comment:this.content,
                            orderId:this.currentOrder
                            })
                    })
                .then(res => {
                    
                });
                
                this.$notify.success({
                        title: '评论成功',
                        message: '感谢您的评论~'
                    });
            }

        },
        submitComment1(good) {
            this.centerDialogVisible = true;
            this.currentId = good.goodId;
            this.currentOrder = good.id;
        },
        click_detail(good) {
            let routerDate = this.$router.resolve({
                    path: '/detail',
                    query: {
                            id: good.goodId,
                            username: this.id
                            }
                });
                window.open(routerDate.href,'_blank');
        }
    },
    filters: {
        numFilter(value) {
            let real = parseFloat(value).toFixed(2);
            return real;
        }
    },
    components: { Mybutton }
}
    </script>
    
    <style scope>
    button {
            color: white;
            background-color: rgb(192, 48, 221);
            font-size: 20px;
        }
    .item {
        position: relative;
        text-align: left;
        width: 80%;
        height: auto;
        margin: auto;
        border-style: solid;
        border-color: rgba(149, 157, 159, 0.58);
        background-color: aliceblue;
        margin-top: 3%;
    }
    .imageBox::after {
        content: "";
        padding-bottom: 100%;
        display: block;
    }
    .imageBox {
      display: inline-block;
      width:15%;
      background: no-repeat; 
      -webkit-background-size: 100%;
      -moz-background-size: 100%;
      -o-background-size: 100%;
      background-size: 100%;
    }
    .nameText {
        display: inline-block;
        vertical-align: top;
        font-size: 18px;
        font-weight: 700;
        height: auto;
        width: 40%;
        overflow: hidden;
    }
    .priceBox {
        margin-left: 3%;
        padding-right: 3%;
        display: inline-block;
        font-size: 20px;
        border-right: solid;
        border-color: rgb(201, 200, 199) ;
        border-width: 1px;
        font-weight: 900;
        position: absolute;
        vertical-align: bottom;
        height: 100%;
    }
    .counter {
        text-align: right;
        position: absolute;
        display: inline-block;
        right: 0;
        margin-right: 3%;
    }
    .money {
        margin-top: 20%;
        font-size: 25px;
        font-weight: 1000;
    }

            .logo {
                display: inline-block;
                color: rgb(174, 0, 255);
                font-size: 30px;
                font-weight: 600;
                margin-right: 40px;
            }
            .center {
                margin-top: 10px;
                text-align: center;
                margin-bottom: 10px;
            }
        #main{
            height: auto;
            width: 75%;
            background-color: rgb(207, 202, 202);
            position: absolute;
            margin-left: 15%;
            margin-top: 1%;
            border-radius: 50px;
            padding-bottom: 10%;
            }
        .block{
            display: inline-block;
        }
        #cart{
            background-color: white;
            width: 70%;
            height: 90px;
            padding-top: 1%;
            padding-left: 1%;
            position: relative;
        }
        #des{
            position: absolute; top:20px;
            margin-right: 20px;
            width: 200px;
        }
        #txt{
            font-size: 13px;
            text-align: left;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        #price{
            position: absolute; top:20px;left:350px;
        }
        #numberCount{
            position: absolute; top:20px;left:450px;
        }
        #count{
            position: absolute; top:20px;left:550px;
        }
        #place{
            position: absolute; top:20px;left:650px;
        }
        #time{
            position: absolute; top:20px;left:750px;
        }
        #no {
            margin-left: -120px;
        }
    </style>