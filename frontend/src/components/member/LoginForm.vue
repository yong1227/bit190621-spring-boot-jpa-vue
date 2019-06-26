<template>
<div>
  <Nav></Nav>
  <form @submit="submit">
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" class="form-control" id="email" placeholder="Enter email">
    </div>
    <div class="form-group">
      <label for="pwd">Password:</label>
      <input type="password" class="form-control" id="pwd" placeholder="Enter password">
    </div>
    <div class="checkbox">
      <label><input type="checkbox"> Remember me</label>
    </div>
    <button type="submit" class="btn btn-default"><router-link to="/ListTable"> Submit</router-link></button>
  </form>
  <Footer></Footer>
</div>
</template>

<script>
import Nav from '@/components/common/Nav.vue'
import Footer from'@/components/common/Footer.vue'
import ListTable from '@/components/member/ListTable'
export default {
  components: {
    Nav,
    Footer
  },
  methods:{
    submit(){
      alert('보내짐');

    }
  }
}
</script>

<style scoped>
</style>