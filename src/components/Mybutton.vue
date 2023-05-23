<template>
        <el-button type="primary">
            {{msg}}
        </el-button>
</template>
  
  <script>
  export default {
    name: 'Mybutton',
    props: {
      msg: String
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="less">
      button {
        border: none;
        outline: none;
        appearance: none;
        cursor: pointer;
    }
    button {
        box-shadow: 0 5px 0 0 rgb(168, 43, 193);
        background: rgb(168, 43, 193);
        border-radius: 6px;
        color: white;
        transition: all .1s ease-out;
    }
    button:hover {
        background: rgb(168, 43, 193);
        box-shadow: 0 4px 0 0 rgb(132, 34, 151);
        transform: translateY(1px);
    }
    button:hover:active {
        box-shadow: 0 1px 0 0 rgb(128, 0, 0);
        transform: translateY(4px);
    }

  </style>