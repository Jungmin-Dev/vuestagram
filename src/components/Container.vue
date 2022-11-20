<template>
  <div>
    <button @click="this.$emit('Post', 0)"> Post</button>
    <button @click="$emit('Post', 1)"> 필터</button>
    <button @click="$emit('Post', 2)"> 글작성</button>
    <div v-if="step===0">
      <Post :Posting="post" v-for="(post, index) in Posting" :key="index" :index="index"/>
    </div>

    <div v-if="step===1">
      <div :class="filter" class="upload-image" :style="{backgroundImage: `url(${url})`}"></div>
      <div class="filters">
        <filter-box :filter="filter" v-for="(filter, index) in filters" :key="index" :url="url">
          {{ filter }}
        </filter-box>
      </div>
    </div>

    <div v-if="step===2">
      <!-- 글작성페이지 -->
      <div :class="filter" class="upload-image" :style="{backgroundImage: `url(${url})`}"></div>
      <div class="write">
        <textarea @input="this.$emit('content', $event.target.value)" v-model="content"
                  class="write-box">write!</textarea>
      </div>
    </div>

    <div v-if="step===3">
      <my-page :one="122"></my-page>
    </div>
  </div>
</template>

<script>
import Post from './Post'
import FilterBox from "@/components/FilterBox";
import MyPage from "@/components/MyPage";
export default {
  name: "ContainerVue",
  components: {Post, FilterBox, MyPage},

  props: {
    Posting: Object,
    step: Number,
    url: String,
    filter: String
  },
  data() {
    return {
      content: null,
      filters: ["aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson",
        "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua",
        "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"]
    }
  }
}
</script>

<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}

.filters {
  overflow-x: scroll;
  white-space: nowrap;
}

.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}

.filters::-webkit-scrollbar {
  height: 5px;
}

.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>