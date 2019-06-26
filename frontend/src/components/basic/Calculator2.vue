<template>
<div>
  <Nav></Nav>
  <div class="calculator">
    <div class="display">{{current || '0'}}</div>
    <div @click="clear" class="btn">C</div>
    <div @click="sign" class="btn">+/-</div>
    <div @click="percent" class="btn">%</div>
    <div @click="divide" class="btn operator">÷</div>
    <div @click="append('7')" class="btn">7</div>
    <div @click="append('8')" class="btn">8</div>
    <div @click="append('9')" class="btn">9</div>
    <div @click="times" class="btn operator">x</div>
    <div @click="append('4')" class="btn">4</div>
    <div @click="append('5')" class="btn">5</div>
    <div @click="append('6')" class="btn">6</div>
    <div @click="minus" class="btn operator">-</div>
    <div @click="append('1')" class="btn">1</div>
    <div @click="append('2')" class="btn">2</div>
    <div @click="append('3')" class="btn">3</div>
    <div @click="add" class="btn operator">+</div>
    <div @click="append('0')" class="btn zero">0</div>
    <div @click="dot" class="btn">.</div>
    <div @click="equal" class="btn operator">=</div>
  </div>
  <Footer></Footer>
</div>  
</template>

<script>
import Nav from "@/components/common/Nav.vue";
import Footer from "@/components/common/Footer.vue";

export default {
   data(){
       return{
           //null 이 더 큰 범위여서 null로 한다.
           previous : '',
           current : '',
           //operator는 기능을 담당해서 null로 한다.
           operator : null,
           operatorClicked : false
       }
   },
   components: {
    Nav,
    Footer
  },  
   methods:{
       add(){
           this.operator = (a,b) => a+b;
           this.setPrevious();
       },
       minus(){
           this.operator = (a,b) => a-b;
           this.setPrevious();
       },
       times(){
           this.operator = (a,b) => a*b;
           this.setPrevious();
       },
       divide(){
           this.operator = (a,b) => a/b;
           this.setPrevious();
       },
       equal(){
           this.current = `${this.operator(
               parseFloat(this.previous),
               parseFloat(this.current)
               )}`;
               this.previous = null;
       },
       clear(){
           this.current = '';
       },
       setPrevious(){
           this.previous = this.current;
           this.operatorClicked = true;
       },
       append(number){
           if(this.operatorClicked){
               this.current = '';
               this.operatorClicked = false;
           }
           this.current = `${this.current}${number}`
       },
       dot(){},
       sign(){},
       percent(){}
   }
}
</script>

<style scoped>
.calculator {
  margin: 0 auto;
  width: 400px;
  font-size: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
}
.display {
  grid-column: 1 / 5;
  background-color: #333;
  color: white;
}
.zero {
  grid-column: 1 / 3;
}
.btn {
  background-color: #f2f2f2;
  border: 1px solid #999;
}
.operator {
  background-color: orange;
  color: white;
}
</style>