import {createStore} from 'vuex'

const store = createStore({
    state() {
        return {
            name: 'kim',
            age: 20,
            likes: [30, 20, 10],
            좋나요: [false, false, false]
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
        }
    }
})

export default store