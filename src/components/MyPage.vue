<template>
  <div style="padding : 10px">
    <h4>νλ‘μ</h4>
    <input placeholder="π" @input="doThis"/>

    <div class="post-header" v-for="(follower, index) in searchFollowers" :key="index">
      <div class="profile" :style="`background-image:url(${follower.image})`"></div>
      <span class="profile-name">{{ follower.name }}</span>
    </div>
  </div>
</template>

<script>
import {computed, onMounted, onUpdated, ref, toRefs} from "vue";
import axios from "axios";
// import { useStore } from 'vuex'

export default {
  name: "MyPage",
  props: {
    one: Number
  },
  setup(props) {
    // μ¬ λλλ§μ μν΄ ref μ¬μ©νλ€.
    let followers = ref([]);
    let searchFollowers = ref();

    const doThis = (e) => {
      if (!e.target.value) {
        searchFollowers.value = [...followers.value]
      } else {
        let newFollower = followers.value.filter((follower) => follower.name.includes(e.target.value))
        searchFollowers.value = [...newFollower]
      }
    }

    let {one} = toRefs(props);
    console.log(one.value)

    onUpdated(() => {
      let result = computed(() => {
        return followers.value.length
      })
      console.log(result.value)
    })

    // vuex μ¬μ© -- mapState λ vue 5 λ²μ  μ΄μλΆν° μ¬μ© κ°λ₯
    // let store = useStore();
    // console.log(store.state.name);


    onMounted(() => {
      axios.get('/follower.json').then((res) => {
        followers.value = res.data;
        searchFollowers.value = res.data;
      })
    })

    return {followers, doThis, searchFollowers}
  }
}
</script>

<style scoped>

</style>