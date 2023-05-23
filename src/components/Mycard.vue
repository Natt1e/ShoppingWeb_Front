<template>
<span style="display:inline-block;">
<div class="wrapper">
  <div class="container">
    <div class="top"  @click="click_detail()"
    :style="{'backgroundImage': 'url(' + require('../../../static/' + picture)  + ')'}">
    </div>
    <div class="bottom" :id="id">
      <div class="left">
        <div class="details">
            <div class="goodsName">
                {{name}}
            </div>
            <div>
                <h2>￥{{price}}</h2>
            </div>    
        </div>
        <div class="buy" @click="fun1"><i class="el-icon-shopping-cart-2"></i></div>
      </div>
      <div class="right">
        <div class="done"><i class="el-icon-success"></i></div>
        <div class="details">
          <h1>已成功添加</h1>
        </div>
        <div class="remove" @click="fun2"><i class="el-icon-remove"></i></div>
      </div>
    </div>
  </div>
  <div class="inside">
    <div class="icon"><i class="el-icon-more"></i></div>
    <div class="contents">
      <span style="color:white;display: inline-block;">
        <div style="margin-bottom:15%;margin-top: 10%;">
            <h1>地址:{{ address }}</h1>
        </div>
        <div style="margin-bottom:15%">
            <h1>库存量：{{ availCount }}</h1>
        </div>
        <div style="margin-bottom:15%">
            <h1>已售出：{{ soldCount }}</h1>
        </div>
      </span>
      
    </div>
  </div>
</div>
</span>
</template>

<script>
import $ from  'jquery'
    export default {
        name: 'MyCard',
        props: {
          id:Number,
          name:String,
          price:String,
          picture:String,
          grade:String,
          availCount:Number,
          soldCount:Number,
          commentCount:String,
          address:String,
          username:String
        },
        methods: {
            fun1() {
                document.getElementById(this.id).classList.add("clicked");
                this.addTocart();
            },
            fun2() {
               document.getElementById(this.id).classList.remove("clicked");
            },
            click_detail(){
                let routerDate = this.$router.resolve({
                    path: '/detail',
                    query: {
                            id: this.id,
                            username: this.username
                            }
                });
                window.open(routerDate.href,'_blank');
            },
            addTocart() {
              this.$axios({
                    method: 'post',
                    url: '/api/addcart/',
                    data: JSON.stringify({
                            buyer: this.username,
                            good: Number(this.id),
                            count: 1
                            })
                    })
                .then(res => {         
                }).catch ((err) => {
                    
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.goodsName{
            color: gray;
            font-size: 13px;
            text-align: center;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 80%;
            margin: 0% auto;
}

.wrapper{
  width: 300px;
  height: 500px;
  background: white;
  overflow: hidden;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0;
  transform: scale(0.95);
  transition: box-shadow 0.5s, transform 0.5s;
  &:hover{
    transform: scale(1);
    box-shadow: 5px 20px 30px rgba(0,0,0,0.2);
  }
  
    .container{
    width:100%;
    height:100%;
    .top{
      height: 80%;
      width:100%;
      background: no-repeat center center; 
      -webkit-background-size: 100%;
      -moz-background-size: 100%;
      -o-background-size: 100%;
      background-size: 100%;
    }
    .bottom{
      width: 200%;
      height: 20%;
      transition: transform 0.5s;
      &.clicked{
        transform: translateX(-50%);
      }
      h1{
          margin:0;
          padding:0;
      }
      p{
          margin:0;
          padding:0;
      }
      .left{
        height:100%;
        width: 50%;
        background: #f4f4f4;
        position:relative;
        float:left;
        .details{
          padding: 20px;
          float: left;
          width: calc(70% - 40px);
        }
        .buy{
          float:right;
          width: calc(30% - 2px);
          height:100%;
          background: #f1f1f1;
          transition: background 0.5s;
          border-left:solid thin rgba(0,0,0,0.1);
          i{
            font-size:30px;
            padding:30px;
            color: #254053;
            transition: transform 0.5s;
          }
          &:hover{
            background: #a6deb7;
          }
          &:hover i{
            transform: translateY(5px);
            color:#00394B;
          }
        }
      }
      .right{
        width: 50%;
        background: #A6CDDE;
        color: white;
        float:right;
        height:200%;
        overflow: hidden;
        .details{
          padding: 20px;
          float: right;
          width: calc(70% - 40px);
        }
        .done{
          width: calc(30% - 2px);
          float:left;
          transition: transform 0.5s;
          border-right:solid thin rgba(255,255,255,0.3);
          height:50%;
          i{
            font-size:30px;
            padding:30px;
            color: white;
          }
        }
        .remove{
          width: calc(30% - 1px);
          clear: both;
          border-right:solid thin rgba(255,255,255,0.3);
          height:50%;
          background: #BC3B59;
          transition: transform 0.5s, background 0.5s;
          &:hover{
            background: #9B2847;
          }
          &:hover i{
            transform: translateY(5px);
          }
          i{
            transition: transform 0.5s;
            font-size:30px;
            padding:30px;
            color: white;
          }
        }
        &:hover{
          .remove, .done{
            transform: translateY(-100%);
          }
        }
      }
    }
  }
  
  .inside{
    z-index:9;
    background: #92879B;
    width:140px;
    height:140px;
    position: absolute;
    top: -70px;
    right: -70px;
    border-radius: 0px 0px 200px 200px;
    transition: all 0.5s, border-radius 2s, top 1s;
    overflow: hidden;
    .icon{
      position:absolute;
      right:85px;
      top:85px;
      color:white;
      opacity: 1;
    }
    &:hover{
      width:100%;
      right:0;
      top:0;
      border-radius: 0;
      height:80%;
      .icon{
        opacity: 0;
        right:15px;
        top:15px;
      }
      .contents{
        opacity: 1;
        transform: scale(1);
        transform: translateY(0);
      }
    }
    .contents{
      padding: 5%;
      opacity: 0;
      transform: scale(0.5);
      transform: translateY(-200%);
      transition: opacity 0.2s, transform 0.8s;
      table{
        text-align:left;
        width:100%;
      }
      h1, p, table{
        color: white;
      }
      p{
        font-size:13px;
      }
    }
  }
}
</style>