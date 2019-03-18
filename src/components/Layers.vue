<template>
  <div class="layers-panel">
    <div class="header">
      <span>Layers</span>
    </div>
    <div class="ribbon">
      <button type="button" @click="addLayer()">
        <i class="fa fa-plus"></i>
      </button>
      <button type="button" @click="moveLayerUp()">
        <i class="fa fa-arrow-up"></i>
      </button>
      <button type="button" @click="moveLayerDown()">
        <i class="fa fa-arrow-down"></i>
      </button>
      <button type="button" @click="editLayer()">
        <i class="fa fa-pencil-alt"></i>
      </button>
      <button type="button" @click="removeLayer()">
        <i class="fa fa-window-close"></i>
      </button>
    </div>
    <ul class="layers">
      <li class="layer" v-for="(layer, index) of layers" :key="index" :class="{ 'active': index === selectedIndex }" @click="selectLayer(layer, index)">
        <div class="layer-editor" v-if="isEditMode && index === selectedIndex" >
            <input type="text" v-model="pendingLayerName" />      
            <button @click="updateLayer()">
                <i class="fa fa-save"></i>
            </button>
            <button @click="isEditMode = false">
                <i class="fa fa-ban"></i>
            </button>
        </div>
        <span v-else>{{layer.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name: "layers",
    data() {
        return {
            layers: [],
            selectedIndex: -1,
            selectedLayer: {},
            isEditMode: false,
            pendingLayerName: ''
        };
    },
    methods: {
        addLayer() {
            this.layers.push({ id: `layer-id-${this.layers.length + 1}`, name: `Layer ${this.layers.length + 1}` })
        },
        editLayer() {
            if (this.selectedLayer.id) {
                this.isEditMode = true;
                this.pendingLayerName = this.selectedLayer.name;
            }
        },
        removeLayer() {
            this.layers = this.layers.filter(x => x.id !== this.selectedLayer.id);
            this.selectedLayer = this.layers[this.selectedIndex];

            if (this.layers.length === 0) {
                this.selectedIndex = -1;
            }
        },
        moveLayerUp() {
            if (this.selectedIndex > 0) {
                let belowIndex = this.selectedIndex - 1;
                let layerAbove = this.layers[belowIndex];
                this.layers.splice(belowIndex, 1, this.selectedLayer);
                this.layers.splice(this.selectedIndex, 1, layerAbove);
                this.selectedIndex = belowIndex;
            }
        },
        moveLayerDown() {
            if (this.selectedIndex < (this.layers.length - 1)) {
                let aboveIndex = this.selectedIndex + 1;
                let layerBelow = this.layers[aboveIndex];
                this.layers.splice(aboveIndex, 1, this.selectedLayer);
                this.layers.splice(this.selectedIndex, 1, layerBelow);
                this.selectedIndex = aboveIndex;
            }
        },
        selectLayer(layer, index) {
            if (index !== this.selectedIndex) {
                this.isEditMode = false;
                this.selectedLayer = layer;
                this.selectedIndex = index;
            }
        },
        updateLayer()  {
            this.layers[this.selectedIndex].name = this.pendingLayerName;
            this.pendingLayerName = '';
            this.isEditMode = false;
        }
    }
};
</script>

<style lang="css" scoped>
.layers-panel {
  border: 1px solid silver;
  flex: 1;
}

.layers-panel > .header {
  background-color: #dddddd;
  padding: 10px;
  text-align: left;
}

.layers-panel > .ribbon {
  display: flex;
  flex-direction: row;
}

.layers-panel > .ribbon button {
  border: none;
  flex: 1;
  padding: 10px;
  cursor: pointer;
}

.layers-panel > .ribbon button:hover {
  background-color: #c0c0c0;
}

.layers-panel > .layers {
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 250px;
  overflow-y: auto;
}

.layers-panel > .layers li {
  border-top: 1px solid silver;
  padding: 5px;
  text-align: left;
  cursor: default;
}

.layers-panel > .layers li.active {
    background-color: #DDDDDD;
}

.layers-panel > .layers li:hover {
  background-color: #dddddd;
  cursor: pointer;
}

.layers-panel > .layers li a {
  text-decoration: none;
  color: #333333;
}
</style>

