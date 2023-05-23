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
            <div style="display: inline-block;">
                <div class="search-box" style="margin-right: 40px;">
                    <input type="text" v-model="content" style="border:0px;outline:0px;font-size:16px;height: 30px;" size="50" :placeholder="welcome">
                    <el-button type="primary" @click="search" style="height: 37px;font-size:15px">开始烧瓶</el-button>
                </div>
                <div class="type-box">
                    <span style="margin-right: 10px" @click.prevent="classification(1)"><a href=# :class="{'activeCss':active==1}">食品饮料</a></span>
                    <span style="margin-right: 10px" @click.prevent="classification(2)"><a href=# :class="{'activeCss':active==2}">日常用品</a></span>
                    <span style="margin-right: 10px" @click.prevent="classification(3)"><a href=# :class="{'activeCss':active==3}">文学</a></span>
                    <span style="margin-right: 10px" @click.prevent="classification(4)"><a href=# :class="{'activeCss':active==4}">医药</a></span>
                </div>
            </div>
            <div style="display: inline-block;">
                <span @click="click_order" style="margin-right:20px"><el-button type="primary" style="height: 37px;font-size:16px">我的订单</el-button></span>
                <span @click="click_cart" style="margin-right:20px"><el-button type="primary" style="height: 37px;font-size:16px">我的购物车</el-button></span>
                <span><el-button type="primary" style="height: 37px;font-size:16px">联系客服</el-button></span>
            </div>
        </div>

    <div id="main">
         <div id="detail" style="display: flex;">
            <div class="goodsPic">
                <img :src="img()">
            </div>

            <div id="information">
                <div class="title">
                    {{des}}
                </div>

                <div class="price">
                    <div id="act1">
                        烧瓶狂欢季
                    </div>
                    <div id="act2">
                        热卖中 下单即抢
                    </div>
                    <div id="num">
                        ￥{{price}}
                    </div>

                    <!-- <div>
                        卖出：{{soldCount}}
                    </div>
                    <div>
                        库存：{{availCount}}
                    </div> -->
                    
                    <div id="numberBox">
                        <el-input-number v-model="number" :step="1"></el-input-number>
                        <el-divider></el-divider>
                    </div>
                    <div>
                        <div style="text-align:center;">
                            售出量：{{soldCount}}
                        </div>
                        <div style="text-align:center;">
                            库存量：{{availCount}}
                        </div>
                        
                    </div>
                    <div id="car">
                        <el-button  type="primary" id="car_but" @click="add">加入购物车</el-button>
                    </div>
                    <div id="car">
                        <el-button  type="primary" id="car_but" @click="buy">立即购买</el-button>
                        <div id="place">
                            配送至...<el-input v-model="place" placeholder="北航" style="width:100px"></el-input>
                        </div>
                    </div>
                </div>
            </div>

         </div>
    </div>
</div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Detail",
        created() {
            this.price=this.$route.query.price;
            this.des=this.$route.query.des;
            this.id=this.$route.query.id;
            this.username=this.$route.query.username;
            this.availCount=this.$route.query.availCount;
            this.soldCount=this.$route.query.soldCount;
            axios.get('/api/goodimage/' + this.id + '/').then((res) => {
                this.pic = res.data[0].pic;
            })
        },
        data() {
            return {
                username: '',
                price: '',
                des: '',
                id: '',
                pic: '',
                number: 1,
                availCount: 0,
                soldCount: 0,
                place: '北航'
            }
        },
        computed: {
            welcome: function() {
                return 'Hi, ' + this.username + '~ 开始您的烧瓶之旅';
            }
        },
        methods: {
            img() {
                return this.pic;
            },
            add() {
                if (this.number <= 0) {
                    alert('请至少添加一件商品~');
                } else {
                    this.$axios({
                        method: 'post',
                        url: '/api/addtocart/',
                        data: JSON.stringify({
                                buyerId: this.username,
                                goodId: this.id,
                                count: this.number
                        })
                    })
                    alert('添加成功！');
                }               
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
            buy() {
                if (this.number <= 0) {
                    alert('请至少添加一件商品~');
                } else {
                    this.$axios({
                        method: 'post',
                        url: '/api/buy/',
                        data: JSON.stringify({
                                count: this.number,
                                buyerId: this.username,
                                goodId: this.id,
                                place: this.place
                        })
                    }).then(res => {
                        if (res.data == -2) {
                            alert('商品余量不足！');
                        }else if (res.data == -1) {
                            alert('余额不足！');
                        }else {
                            alert('购买成功！欢迎下次光临')
                        }
                    })
                }  
            },
            back() {
                this.$router.push({path:'/main',query: {userId: this.id} });     
            }
        }
    }

</script>

<style scoped>
        .logo {
            display: inline-block;
            color: rgb(174, 0, 255);
            font-size: 30px;
            font-weight: 600;
            margin-right: 40px;
        }
        a {
            text-align: center;
            color: black;
            text-decoration: none;
            font-size: 17px;
        }
        a:hover {
            color: red;
        }
        .center {
            margin-top: 10px;
            text-align: center;
            margin-bottom: 10px;
        }
        button:hover {
            background-color: cornflowerblue;
        }
        button {
            background-color:rgb(174, 0, 255);
            color: white;
        }
        .search-box{
            display: inline-block;
            border-width: 2px;
            border-style: solid;
            border-color: rgb(174, 0, 255);
            padding-left: 0px;
            padding-top: 0px;
            padding-bottom: 0px;
        }
        #main {
            width: 80%;
            background-color: rgb(241, 241, 241);
            position: absolute;
            /* padding-left: 15%;
            padding-right: 15%; */
            text-align: left;
        }
        #detail {
            /* height: 100%;
            width: 70%; */
            background-color: white;
            margin: auto;
            /* border-radius: 5%; */
            /* padding-top: 1%;
            padding-left: 1%; */
            position: relative;
        }
        #information {
            display: inline-block;
            position: absolute;
            top: 50px;
            left: 40%;
        }
        .goodsPic {
            margin-left: 100px;
            margin-top: 50px;
            display: flex;
            width: 450px;
            height: 450px;
            /* border-width: 2px;
            border-style: solid;
            border-color: gray; */
            box-shadow: #E4E7ED 0 0 5px;
        }
        .title {
            margin-left: 200px;
            padding-bottom: 50px;
            width: 500px;
            height: auto;
            text-align: center;
            font-size: 25px;
            font-weight: 700;
        }
        .price {
            background-color: rgb(255, 42, 42);
            margin-left: 230px;
            width: 426px;
            height: 98px;
            /* margin-top: 60px;
            margin-left: 40px; */
            padding-left: 1%;
            padding-right: 1%;
        }
        #act1 {
            display: inline-block;
            color: white;
            font-size: 25px;
            font-family: STSong;
            font-weight: 800;
        }
        #act2 {
            display: inline-block;
            text-align: right;
            color: white;
            font-size: 20px;
            width: 270px;
        }
        #num {
            background-color: white;
            color: orangered;
            font-size: 30px;
            height: 50%;
            margin-top: 5px;
        }
        #numberBox {
            text-align: center;
            margin-top: 20%;
        }
        #car {
            text-align: center;
            margin-top: 5%;
        }
        #car_but {
            font-size: 25px;
            background-color: red;  
        }
        #car_but:hover {
            background-color: cornflowerblue;
        }
        .type-box {
            padding-left: 60px;
            padding-right: 80px;
            padding-top: 13px;
            width: 340px;
            display: flex;
            justify-content: space-between;
            flex: auto;
        }
        #place {
            margin-top:20px;
        }
</style>