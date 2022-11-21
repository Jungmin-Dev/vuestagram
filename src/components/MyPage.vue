<template>
  <div style="padding : 10px">
    <h4>팔로워</h4>
    <input placeholder="🔍"/>
    <div class="post-header" v-for="(follower, index) in followers" :key="index">
      <div class="profile" :style="`background-image:url(${follower.image})`"></div>
      <span class="profile-name">{{ follower.name }}</span>
    </div>
  </div>
</template>

<script>
import {computed, onMounted, onUpdated, ref, toRefs} from "vue";
import axios from "axios";
import {useStore} from 'vuex'

export default {
  name: "MyPage",
  setup(props) {
    // 재 랜더링을 위해 ref 사용한다.
    let followers = ref([]);

    let { one } = toRefs(props);
    console.log(one)

    onUpdated(()=>{
      let result = computed( () =>{
        return followers.value.length
      })
      console.log(result.value)
    })

    let store = useStore();
    console.log(store.state.name);



    onMounted(() => {
      axios.get('/follower.json').then((res) => {
        followers.value = res.data;
      })
    })

    return {followers}
  }
}
</script>

<style scoped>

</style>