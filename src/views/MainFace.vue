<template>
<div>
    <span @click="flashMoney">
        <MySidebar v-bind:money="money" v-bind:password="password" v-bind:is_active="is_active"
        v-bind:username="username" v-bind:mymail="mail" v-bind:buy_change="buy_change" v-bind:money_change="money_change">
        </MySidebar>
    </span>
    
    <div class="center">
        <div style="position: absolute;margin-left:15%;margin-top:-1%">
            <img src="../assets/LOGO1.png" width="150">
        </div>
        <div class="logo" style="text-align:center;display: inline-block;">
            <div>烧瓶</div>
            <div style="font-size: 16px;">心仪生活上烧瓶</div>
        </div>
        <div style="display: inline-block;">
            <div class="search-box" style="margin-right: 40px;">
                <input type="text" v-model="content" style="border:0px;outline:0px;font-size:16px;height: 30px;padding-top: 5px;padding-bottom: 5px;" size="50" :placeholder="welcome">
                <MyButton @click.native="search" style="height: 37px;font-size:15px" msg="开始烧瓶"></MyButton>
            </div>
            <div class="type-box">
                <span style="margin-right: 10px" @click.prevent="classification(1)"><a href=# :class="{'activeCss':active==1}">药品</a></span>
                <span style="margin-right: 10px" @click.prevent="classification(2)"><a href=# :class="{'activeCss':active==2}">食品饮料</a></span>
                <span style="margin-right: 10px" @click.prevent="classification(3)"><a href=# :class="{'activeCss':active==3}">文学</a></span>
                <span style="margin-right: 10px" @click.prevent="classification(4)"><a href=# :class="{'activeCss':active==4}">日常用品</a></span>
            </div>
        </div>
        <div style="display: inline-block;margin-bottom: 1%;">
            <MyCartButton style="z-index:999;position:absolute;" v-bind:username="username"></MyCartButton>
        </div>
    </div>
    
    <div style="width:70%;margin:0 auto">
        <el-carousel :interval="3000" type="card" height="400px">
            <el-carousel-item v-for="item in el_pic">
                <img :src="require('../assets/'+ item)" class="picture">
            </el-carousel-item>

        </el-carousel>
    </div>
        
    <div id="main">

    <div class="elevator">
        <div class="elevator-item" @click="gotoUp">
            <i class="el-icon-sort-up" ></i>
            <span class="elevator-text">
                顶部
            </span>
        </div>
        <div class="elevator-item" @click="changeSignIn">
            <i class="el-icon-close" v-if="signin==false"></i>
            <i class="el-icon-check" v-else></i>
            <span class="elevator-text">
                打卡
            </span>
        </div>
        <div class="elevator-item">
            <i class="el-icon-headset"></i>
            <span class="elevator-text">
                客服
            </span>
        </div>
        <div class="elevator-item" @click="feedbackVisible = true;">
            <i class="el-icon-edit"></i>
            <span class="elevator-text">
                反馈
            </span>
        </div>
        <div class="elevator-item" @click="gotoBottom">
            <i class="el-icon-sort-down"></i>
            <span class="elevator-text">
                底部
            </span>
        </div>
    </div>

        <div v-if="goodsGroup.length===0" style="margin-top:3%">
            <el-skeleton :rows="30" animated />
        </div>
             
        <div v-for="good in goodsGroup" 
        style="display: inline-block;margin-bottom: 5%;" >   
        <Transition appear name="slide-fade">
            <MyCard v-bind:price="good.price" v-bind:name="good.description" v-bind:id="good.id" 
            v-bind:picture="getImage(good)" v-bind:availCount="good.availCount"
            v-bind:soldCount="good.soldCount" v-bind:username="username"
            v-bind:address="good.address">
            </MyCard>
        </Transition>
        </div>
        
        <div style="margin-bottom:10%">
            <el-pagination
              background
              layout="prev, pager, next,jumper, ->, total"
              :total="sum"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              style="text-align: center">
            </el-pagination> 
        </div>
    
    </div>
    <el-dialog title="反馈" :visible.sync="feedbackVisible">
  <el-form>
    <el-form-item label="请抒发您的想法:" :label-width="formLabelWidth">
        <el-input v-model="feedbackContent" type="textarea"
        :autosize="{ minRows: 2, maxRows: 100}">
        </el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="feedbackVisible = false">我再想想</el-button>
    <el-button type="primary" @click="feedback">确定提交</el-button>
  </div>
</el-dialog>

</div> 
</template>
      
      <script>
    import axios from 'axios';
    import MySidebar from '@/components/MySidebar.vue';
    import MyButton from '@/components/Mybutton.vue';
    import MyCard from "@/components/Mycard.vue";
    import MyCartButton from '@/components/MyCartButton.vue';
      export default {
        name: "MainFace",
        components: {
            MySidebar,
            MyButton,
            MyCard,
            MyCartButton
        },
        data() {
          return {
            username: '',
            password: '',
            goods: [],
            pic: '',
            content: '',
            active: 999,
            el_pic:['el-1.jpg','el-2.jpg','el-3.jpg','el-4.jpg','el-5.jpg'],
            mail : '',
            money: '',
            currentPage: 1,
            pageSize: 30,
            goodsGroup : [],
            sessionid: '',
            sum : 1334,
            carts: [],
            feedbackVisible:false,
            feedbackContent:'',
            formLabelWidth: "",
            signin: false,
            buy_change:false,
            money_change:false,
            is_active:false
          }
        },
        computed: {
            welcome: function() {
                return 'Hi, ' + this.username + '~ 开始您的烧瓶之旅';
            }
        },
        created() {
            document.addEventListener('keyup',this.keyup);
            this.username = this.$route.query.userId;
            this.password = this.$route.query.password;
            this.money = this.$route.query.money;
            this.mail = this.$route.query.mail;
            this.sessionid = this.$route.query.sessionid;
            this.$axios({
                    method: 'post',
                    url: '/api/goodcount/999/'
                    })
                .then(res => {
                    this.sum=res.data.count;           
                }).catch ((err) => {
                    
                });
                
            axios.get('/api/goods/999/1/31/',{
            }).then((res) => {
                this.goodsGroup = res.data;             
            });

            axios.get('/api/getcart/' + this.username + '/').then((res) => {
                this.carts = res.data;
            });

            axios.get('/api/ischecked/' + this.username + '/').then((res) => {
                if (res.data.msg=="今日未打卡") {
                    this.signin = false;
                } else {
                    this.signin = true;
                }
            });

            axios.get('/api/getemail/' + this.username + '/').then((res) => {
                this.money_change = res.data.money_change;
                this.buy_change = res.data.buy_change;
                this.is_active = res.data.is_active;
            })

        },
        methods: {
            getImage(good) {
                if (good.pic.length == 0) {
                    return '-1.jpg';
                } else {
                    return good.pic[0];
                }
            },
            keyup(e) {
                let me = this;
                var key = e.which || e.keyCode;
                if (key == 13) {
                    me.search(e);
                }
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                let begin = (currentPage-1)*this.pageSize+1;
                let end = (currentPage)*this.pageSize+1;
                axios.get('/api/goods/' + this.active + '/' + begin + '/' + end + '/').then((res) => {
                    this.goodsGroup = res.data;               
                });
            },
            classification(type) {
                this.active = type;
                axios.get('/api/goods/' + type + '/1/31/').then((res) => {
                    this.goodsGroup = res.data;              
                });
                this.$axios({
                    method: 'post',
                    url: '/api/goodcount/' + type + '/'
                    })
                .then(res => {
                    this.sum=res.data.count;           
                }).catch ((err) => {
                    
                });

            },
            async search(e) {
                let target = e.target;
                if (target.nodeName == 'SPAN' || target.nodeName == 'I') {
                    target = e.target.parentNode;
                }
                target.blur();
                await axios.get('/api/search/'+this.content+'/').then((res) => {
                    this.goodsGroup = res.data;              
                });
                this.sum = this.goodsGroup.length;

            },
            gotoUp() {
                let top = document.documentElement.scrollTop || document.body.scrollTop;
                // 实现滚动效果 
                const timeTop = setInterval(() => {
                    document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
                    if (top <= 0) {
                        clearInterval(timeTop);
                    }
                }, 5);
            },
            gotoBottom() {
                 scrollTo(0, document.documentElement.scrollHeight);
            },
            flashMoney() {
                this.$axios.get('/api/signin/' + this.username + '/' + this.password + '/').then((res) => {
                    this.money = res.data.money;
                }).catch((err) => {})
            },
            feedback() {
                this.feedbackVisible = false;
                this.$notify({
                    title: '提交成功',
                    message: '感谢您的反馈，我们会继续改进',
                    type: 'success'
                });
            },
            changeSignIn() {
                if (this.signin == false) {
                    this.$axios({
                    method: 'post',
                    url: '/api/check/',
                    data: JSON.stringify({
                                userId:this.username
                            })
                    }).then(res => {
                        this.signin = true;
                    });
                    this.$notify({
                        title:'打卡成功',
                        message:'记得坚持打卡喔',
                        type:'success'
                    });
                } else {
                    this.$notify({
                        title:'重复打卡',
                        message:'今天打过卡了喔',
                        type:'error'
                    });
                }
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
        .elevator {
            position: fixed;
            right: 1%;
            top : 20%;
            text-align: center;
            background-color: white;
        }
        .elevator-item {
            padding: 8px;
            padding-bottom: 0;
            background-color: rgb(227, 227, 227);
            width: 40px;   
        }
        .elevator-text {
            padding-bottom: 10px;
            border-bottom-style: solid;
            border-color: rgb(201, 200, 200);
            border-width: 1px;
            display: block;
        }
        .elevator :hover {
            background-color: rgb(174, 0, 255);
            color: white;
        }
        .picture {
            height: 100%;
            width:100%;
            max-width:100%;
        }
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
            background-color: rgb(240, 234, 234);
            position: absolute;
            padding-left: 15%;
            padding-right: 5%;
            text-align: left;
            width: 80%;
        }
        .goodsPic {
            display: block;
            width: 120px;
            height: 120px;
            margin: auto;
            cursor: pointer;
            transition: 1s;
        }
        .goodsPic:hover{
            transform: scale(1.5);
        }
        .goodsBox {
            position: relative;
            overflow: hidden;
            display: inline-block;
            width: 190px;
            height: 226px;
            background-color:white;
            padding-top: 2.5%;
            margin-right: 20px;
            margin-top: 2%;
        }
        .goodsTxt {
            color: gray;
            font-size: 6px;
            text-align: center;
            margin-top: 15%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 180px;
        }
        .price {
            color: red;
            font-size: 20px;
            font-weight: 600;
            position: absolute;
            bottom: 10px;
            left:50px
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
        .activeCss {
            color: red;
        }
      </style>