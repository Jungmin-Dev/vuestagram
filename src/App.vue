<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step === 1" @click="step++">Next</li>
      <li v-if="step === 2" @click="publish">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo"/>
  </div>

<!--  <p>{{name}}</p>-->

<!--  <p>{{$store.state.more}}</p>-->
<!--  <button @click="$store.dispatch('getData')">더보기 버튼</button>-->

  <container :Posting="Posting" :step="step" @Post="stepChange" :url="url" @content="content_=$event" :filter="filter"/>
  <button @click="more"> 더보기</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile"/>
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>

</template>

<script>

import Container from "@/components/Container";
import data from "./store/data"
import axios from 'axios'
import {mapMutations, mapState} from "vuex";

export default {
  mounted(){
    this.emitter.on('작명', (filter)=>{
      this.filter = filter
    })
  },
  name: 'App',
  components: {Container},
  data() {
    return {
      카운터: 0,
      Posting: data,
      count: 0,
      step: 3,
      url: null,
      content_: null,
      filter: null
    }
  },
  // return 존재 해야함
  computed:{
    ...mapState(['name', 'age', 'likes']),
    ...mapState({ 내이름 : 'name'})
  },


  methods: {
    ...mapMutations(['setMore', '좋아요']),
    content(content) {
      this.content_ = content
    },
    async more() {

      const data = await axios.get(`https://codingapple1.github.io/vue/more${this.count}.json`).then((res) => res.data);
      this.count++
      this.Posting = [...this.Posting, data]
    },
    stepChange(step) {
      this.step = step
    },
    upload(e) {
      let a = e.target.files
      this.url = URL.createObjectURL(a[0]);
      this.step = 1
    },
    publish() {
      let 내게시물 = {
        name: "Kim Jungmin",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.url,
        likes: 3600000,
        date: "May 15",
        liked: true,
        content: this.content_,
        filter: this.filter
      };
      this.Posting.unshift(내게시물)
      this.step = 0
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

ul {
  padding: 5px;
  list-style-type: none;
}

.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}

.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}

.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}

.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}

.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}

.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}

.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}

.inputfile {
  display: none;
}

.input-plus {
  cursor: pointer;
}

#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
