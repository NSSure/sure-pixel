import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = () => {
    return new Vuex.Store({
        state: {
            spriteFrames: [],
            hoverPosition: { x: null, y: null }
        },
        actions: {
            async addSpriteFrame({ commit }) {
                commit('addSpriteFrame');
            },
            async setHoverPosition({ commit }, hoverPosition) {
                commit('setHoverPosition', hoverPosition);
            }
        },
        mutations: {
            addSpriteFrame(state) {
                state.spriteFrames.push({
                    id: `sure-frame-${state.spriteFrames.length + 1}`,
                    data: []
                })
            },
            setHoverPosition(state, hoverPosition) {
                state.hoverPosition = hoverPosition;
            }
        }
    })
};

export default store;