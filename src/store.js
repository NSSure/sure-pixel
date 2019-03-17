import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = () => {
    return new Vuex.Store({
        state: {
            spriteFrames: []
        },
        actions: {
            async addSpriteFrame({ commit }) {
                commit('addSpriteFrame');
            }
        },
        mutations: {
            addSpriteFrame(state) {
                state.spriteFrames.push({
                    id: `sure-frame-${state.spriteFrames.length + 1}`,
                    data: []
                })
            }
        }
    })
};

export default store;