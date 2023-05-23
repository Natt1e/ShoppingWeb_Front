<template>
<div>
  <div style="width:5%;">
        <Mybutton msg="我的购物车" @click.native="func1" ></Mybutton>
  </div> <!--end container -->


<div class="container">
  <div class="shopping-cart" v-if="visiable==true">
    <div class="shopping-cart-header">
      <div class="shopping-cart-total">
        <span class="lighter-text">Total:</span>
        <span class="main-color-text">￥{{ total }}</span>
      </div>
    </div> <!--end shopping-cart-header -->

    <ul class="shopping-cart-items">
      <div v-if="goods.length == 0">
        <el-empty image-size:50px description="这里什么都没有呢，快去逛逛叭~" ></el-empty>
      </div>
          
      
      <li class="clearfix" v-for="good in goods">
        <div class="imageBox" v-if="good.pic.length!=0"
        :style="{'backgroundImage': 'url(' + require('../../../static/' + good.pic[0])  + ')'}">
        </div>
        <div class="imageBox" v-if="good.pic.length==0"
        :style="{'backgroundImage': 'url(' + require('../../../static/' + '-1.jpg')  + ')'}">
        </div>
        <div class="goodName">{{ good.good }}</div>
        <span class="item-name"></span>
        <span class="item-price">￥{{ good.price }}</span>
        <span class="item-quantity">数量: {{ good.count }}</span>
      </li>
    </ul>
    <!-- <Mybutton msg="结算"></Mybutton> -->
  </div> <!--end shopping-cart -->
</div> <!--end container -->
</div>
</template>
    
    <script>
    import $ from  'jquery';
    import Mybutton from './Mybutton.vue';
    import axios from 'axios';
        export default {
            name: 'MyCartButton',
            props: {
              username: ''
            },
            components: {
                Mybutton
            },
            data() {
              return {
                visiable:false,
                goods:[],
                goodDetail: [],
                total: 0
              }
            },
            methods: {
                async func1() {
                  await axios.get('/api/getcart/' + this.username + '/').then((res) => {
                        this.goods = res.data;
                    });
                    this.total = 0;
                    for (var i = 0;i < this.goods.length;i++) {
                      this.total = this.total + this.goods[i].count * this.goods[i].price;
                    }
                    this.visiable = true;
                    $(".shopping-cart").fadeToggle( "fast");
                }     
            }
        }
    </script>
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped lang="less">
    .imageBox::after {
        content: "";
        display: inline-block;
        padding-bottom: 100%;
    }
.imageBox {
      display:inline-block;
      border-radius: 5px; 
      width:40%;
      background: no-repeat; 
      -webkit-background-size: 100%;
      -moz-background-size: 100%;
      -o-background-size: 100%;
      background-size: 100%;
      margin: auto;
}
.goodName {
      color: rgb(18, 14, 14);
        text-align: center;
        word-wrap: break-word;
        white-space: pre-wrap;
        width: 90%;
        margin: auto;
        font-weight: 500;
        font-size: 15px;
}

*, *:before, *:after {
  box-sizing: border-box;
}

body {
  font: 14px/22px "Lato", Arial, sans-serif;
  background: #6394F8;
}

.lighter-text {
  color: #ABB0BE;
}

.main-color-text {
  color: #6394F8;
}


.container {
  margin: auto;
  overflow: auto;
}


.shopping-cart {
  white-space: nowrap;
  margin: 20px 0;
  float: right;
  background: rgb(251, 240, 240);
  width: 340px;
  height: 500px;
  position: relative;
  border-radius: 3px;
  padding: 20px;
  overflow: auto;
  
  
  .shopping-cart-header {
    border-bottom: 1px solid #E8E8E8;
    padding-bottom: 15px;
    
    .shopping-cart-total {
      float: right;
    }
  }
  
  .shopping-cart-items {
    
    padding-top: 20px;

      li {
        margin-bottom: 18px;
      }

    img {
      float: left;
      margin-right: 12px;
    }
    
    .item-name {
      display: block;
      padding-top: 10px;
      font-size: 16px;
    }
    
    .item-price {
      color: #6394F8;
      margin-right: 8px;
    }
    
    .item-quantity {
      color: #ABB0BE;
    }
  }
   
}

.shopping-cart:after {
	bottom: 100%;
	left: 89%;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
	border-bottom-color: white;
	border-width: 8px;
	margin-left: -8px;
}

button {
     background-color: rgb(192, 48, 221);
     color:white;
}
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
.clearfix {
  border-top-style: solid;
  border-bottom-style: solid;
  border-left-style: solid;
  border-color: #ABB0BE;
  border-width: 0.5px;
  padding-top: 5%;
  padding-bottom: 5%;
  border-radius: 10px;

}



    </style>