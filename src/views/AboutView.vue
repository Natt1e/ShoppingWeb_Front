<template>
  <div>

    <div>
        <MyCartButton></MyCartButton>
        <Mybutton></Mybutton>
        <el-button @click="te"></el-button>
    </div>
 
  </div>
  </template>
  
  <script>
      import Mybutton from '@/components/Mybutton.vue';
      import MyCard from "@/components/Mycard.vue";
      import MySidebar from '@/components/MySidebar.vue';
      import MyCartButton from '@/components/MyCartButton.vue';
      export default {
          name: "Detail",
          components: {
              Mybutton,
              MyCard,
              MySidebar,
              MyCartButton
          },
          created() {

          },
          data() {
              return {
                  name: '王新宇 崭新出厂 statTrak☆ 磨损0.00054250 全新现货',
                  pic: "el-1.jpg",
                  price: '123',
                  availCount : 999,
                  soldCount : 888,
                  address: '北京魏永分货中心',
                  seller: 'seller',
                  grade: 8.8,
                  value: 8.8,
                  test: '',
                  visible:false
                  
              }
          },
          methods: {
            async img(id) {
                  await this.$axios.get('/api/goodimages/' + id + '/').then((res) => {
                    this.test = res.data[0].path
                    return test;
                });
            },
            test1() {
                this.img(7);
            },
            te() {
                this.$axios({
                    method: 'post',
                    url: '/api/addcomment/',
                    data: JSON.stringify({
                            grade: 1,
                            comment:'12',
                            orderId:5
                            })
                    })
                .then(res => {
                    
                });
            }
          }
      }
  </script>
  
  
  <style scoped>
 
  </style>