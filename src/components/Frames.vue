<template>
    <div class="frames">
        <button type="button" @click="addFrame()">Add New Frame</button>
        <div @click="activateFrame(index)" v-for="(frame, index) of frames" :key="index" >
            <base-canvas 
                :canvas-id="frame.id" 
                width="100"
                height="100" 
                :class="{ 'active-outline': index === activeFrameIndex }">
            </base-canvas> 
        </div>
    </div>
</template>

<script>
import BaseCanvas from './canvas/BaseCanvas'

export default {
    name: 'frames',
    components: {
        BaseCanvas
    },
    data() {
        return {
            activeFrameIndex: 0
        }
    },
    computed: {
        frames() {
            return this.$store.state.spriteFrames;
        }
    },
    methods: {
        addFrame() {
            this.$store.dispatch('addSpriteFrame');
            this.activeFrameIndex = (this.frames.length - 1);
        },
        activateFrame(index) {
            this.activeFrameIndex = index;
        }
    }
};
</script>

<style lang="css" scoped>
.frames {
    display: flex;
    flex-direction: row;
}

.frames > * {
    margin-right: 15px;
}
</style>

