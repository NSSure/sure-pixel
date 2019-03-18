<template>
  <div class="default">
    <div class="content-area">
      <div class="sidebar-left">
        <toolbox></toolbox>
        <verte style="padding-bottom: 15px;" v-model="fillColor" picker="square" model="rgb" menuPosition="center"></verte>
      </div>
      <div class="editor">
        <base-canvas canvas-id="pixel-editor" width="512" height="512" :fill-color="fillColor"></base-canvas>
      </div>
      <div class="sidebar-right" style="padding: 15px;">
        <layers></layers>
      </div>
    </div>
    <div class="footer">
      <frames></frames>
    </div>
  </div>
</template>

<script>
import Toolbox from './Toolbox.vue'
import Layers from './Layers.vue'
import Frames from './Frames.vue'
import BaseCanvas from './canvas/BaseCanvas'

export default {
  name: "default",
  components: {
    Toolbox,
    Layers,
    Frames,
    BaseCanvas
  },
  data() {
    return {
      fillColor: '#000000'
    }
  }
};
</script>

<style lang="css" scoped>
.default {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}

.default > .content-area {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.default > .content-area > .sidebar-left {
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
  border-right: 1px solid silver;
  /* padding: 15px; */
  width: 64px;
}

.default > .content-area > .editor {
  display: flex;
  justify-content: center;
  background-color: #787878;
  flex: 1;
}

.default > .content-area > .editor > canvas {
  align-self: center;
  box-shadow: 0 15px 30px 0 rgba(0,0,0,.11), 0 5px 15px 0 rgba(0,0,0,.08);
}

.default > .content-area > .sidebar-right {
  background-color: #f7f7f7;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
  border-left: 1px solid silver;
  width: 200px;
}

.default > .footer {
  background-color: #f7f7f7;
  box-shadow: inset 0 2px 4px 0 rgba(0,0,0,.06);
  border-top: 1px solid silver;
  padding: 15px;
  display: flex;
  flex-direction: row;
}
</style>

