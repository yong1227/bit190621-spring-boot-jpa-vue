<template>
   <div>
   <nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Home</a>
    </div>
    <ul class="nav navbar-nav">
      <li class="active"><router-link to="/">Home</router-link></li>
      <li><router-link to="Calculator2">계산기</router-link></li>
      <li><router-link to="ListTable">테이블</router-link></li>
      <li><router-link to="JoinForm">회원가입</router-link></li>
      <li><router-link to="LoginForm">로그인</router-link></li>
    </ul>
  </div>
</nav>
   </div> 
</template>
<script>
export default {
    
}
</script>
<style scoped>
</style>