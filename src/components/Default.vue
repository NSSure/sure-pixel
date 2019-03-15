<template>
  <div class="default">
    <div class="content-area">
      <div class="sidebar-left">
        <div class="toolbar">
          <button type="button" class="tool-item active"><i class="fa fa-pencil-alt fa-lg"></i></button>
          <button type="button" class="tool-item"><i class="fa fa-eraser fa-lg"></i></button>
          <button type="button" class="tool-item"><i class="fa fa-paint-brush fa-lg"></i></button>
        </div>
        <swatches v-model="fillColor" colors="text-advanced" show-fallback popover-to="right" swatch-size="16"></swatches>
      </div>
      <div class="editor">
        <canvas id="pixel-canvas" width=512 height=512></canvas>
      </div>
      <div class="sidebar-right">
        
      </div>
    </div>
    <div class="footer">
      <button type="button">Add New Frame</button>
      <img src="https://via.placeholder.com/100" />
    </div>
  </div>
</template>

<script>
import Swatches from 'vue-swatches'
// Import the styles too, globally

export default {
  name: "default",
  components: {
    Swatches
  },
  data() {
    return {
      fillColor: '#000000',
      canvas: {},
      context: {},
      isDrawing: false,
      initialPosition: { x: null, y: null },
      currentPosition: { x: null, y: null },
      gridDimensions: { width: 600, height: 600, rows: 16, columns: 16 },
      gridSideLength: -1,
      // { row: -1, column: -1 }
      dirtySquares: []
    }
  },
  mounted() {
    this.canvas = document.getElementById('pixel-canvas');
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = '#e7e7e7';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height); 
    this.canvas.addEventListener('click', this.beginDrawing);
    this.draw();
  },
  methods: {
    drawGrid() {
      this.context.lineWidth = 0.5;
      this.context.setTransform(1, 0, 0, 1, 0, 0);
      this.context.translate(0.5, 0.5);

      for (let i = 0; i < this.gridDimensions.width; i += this.gridDimensions.columns) {
        //draw vertical line HEIGHT length, x=i
        this.context.beginPath();
        this.context.moveTo(i, 0);
        this.context.lineTo(i, this.gridDimensions.height);
        this.context.stroke();
        this.context.closePath();
        //draw horizontal line WIDTH length, y=i
        this.context.beginPath();
        this.context.moveTo(0, i)
        this.context.lineTo(this.gridDimensions.width, i)
        this.context.stroke();
        this.context.closePath();
      }

      this.context.lineWidth = 0;
    },
    getGridPositionByCoordinates(mouseCoordinates) {
      // 16 is the px dimensions of each grid square.
      let c = Math.floor(mouseCoordinates.x / 16);
      let r = Math.floor(mouseCoordinates.y / 16);
      return { row: r, column: c };
    },
    beginDrawing(event) {
      this.initialPosition = this.getMouseCoordinates();
      this.dirtySquare = this.getGridPositionByCoordinates(this.initialPosition);
      this.dirtySquares.push(this.dirtySquare);
      this.isDrawing = true;
    },
    endDrawing() {
      this.isDrawing = false;
    },
    draw(event) {
      for (let i = 0; i < this.dirtySquares.length; i++) {
        console.log('dirty sqaure drawing');
        let dirtySquare = this.dirtySquares[i];
        this.context.fillStyle= this.fillColor;
        console.log(dirtySquare.column * 16);
        this.context.clearRect(dirtySquare.column * 16, dirtySquare.row * 16, 16, 16);
        this.context.beginPath();
        this.context.fillRect(dirtySquare.column * 16, dirtySquare.row * 16, 16, 16);
        this.context.closePath();
      }

      this.dirtySquares = [];
      this.drawGrid();
      requestAnimationFrame(this.draw);
    },
    getMouseCoordinates() {
      let rect = this.canvas.getBoundingClientRect();
      let position = { x: null, y: null };
      position.x = event.clientX - rect.left;
      position.y = event.clientY - rect.top;
      return position;
    },
    clearCanvas() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = '#e7e7e7';
    },
    drawCircle() {
      this.currentPosition = this.getMouseCoordinates();
      let xDiff = this.currentPosition.x - this.initialPosition.x;
      let yDiff = this.currentPosition.y - this.initialPosition.y;
      let hypotenuse = Math.hypot(xDiff, yDiff);
      let radius = hypotenuse / 2;
      this.context.beginPath();
      this.context.arc(this.currentPosition.x / 2, this.currentPosition.y /2, radius, 0, 2 * Math.PI, true);
      this.context.stroke();
      this.context.closePath();
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
  width: 200px;
  background-color: #f7f7f7;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
  border-right: 1px solid silver;
  padding: 15px;
}

.toolbar {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  align-content: flex-start;
  flex: 1;
}

.tool-item {
  background-color: #DDDDDD;
  border: none;
  padding: 15px;
  width: 50%;
}

.tool-item.active {
  background-color: silver;
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

.default > .footer > * {
  margin-right: 15px;
}
</style>

