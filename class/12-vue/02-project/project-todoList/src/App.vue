<!--1.页面-->
<template>
  <div class="App" id='app'>
    <h3>ToDo List</h3>
    <!--2.3使用组件-->
    <Header :addTodo="addTodo" />
    <List :todos="todos" :delTodo="delTodo" />
    <Footer 
      :todos="todos" 
      :selectedAlltodo="selectedAlltodo" 
      :delAllDone="delAllDone"
    />
  </div>
</template>
<!--2.逻辑-->
<script>
  //2.1 引入组件
  import Header from './components/Header.vue'
  import List from './components/List.vue'
  import Footer from './components/Footer.vue'
  export default {
    name:'App',
    //2.2 注册组件
    components:{
      Header,
      List,
      Footer
    },
    data(){
      return{
        todos:[
          {task:"吃饭",done:false},
          {task:"看电影",done:false},
          {task:"learn",done:true},
        ]
      }
    },
    methods:{
      delTodo(index){
        this.todos.splice(index,1)
      },
      addTodo(item){
        this.todos.unshift(item)
      },
      selectedAlltodo(val){
        this.todos.forEach(item=>{
          item.done = val
        })
      },
      delAllDone(){
        this.todos = this.todos.filter(item=>!item.done)
      }
    }
  }
</script>
<!--3.样式-->
<style>
  #app{
    width: 600px;
    margin: 100px auto;
  }
  #app h3{
    width: 100%;
    text-align: center;
    line-height: 30px;
  }
</style>