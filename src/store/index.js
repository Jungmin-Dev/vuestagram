import {createStore} from 'vuex'
import axios from 'axios'

const store = createStore({
    state() {
        return {
            name: 'kim',
            age: 20,
            likes: [30, 20, 10],
            좋나요: [false, false, false],
            more: {}
        }
    },
    mutations: {
        이름변경(state) {
            state.name = 'park'
        },
        나이변경(state, payload) {
            state.age += payload;
        },
        좋아요(state, index) {
            if (!state.좋나요[index])
                state.likes[index]++;
            else
                state.likes[index]--;
            state.좋나요[index] = !state.좋나요[index]
        },
        setMore(state, payload) {
            state.more = payload
            console.log(state.more)
        }
    },
    actions: {
        getData({commit}) {
            axios.get(`https://codingapple1.github.io/vue/more0.json`)
                .then((res) => {
                    commit('setMore', res.data);

                })

        }
    }
})

export default store