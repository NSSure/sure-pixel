<template>
    <canvas :id="canvasId" :width=width :height=height></canvas>
</template>

<script>
export default {
    name: "sprite-canvas",
    props: {
        canvasId: {
            required: true
        },
        displayOnly: {
            required: false,
            default: false
        },
        width: {
            required: true
        },
        height: {
            required: true
        },
        fillColor: {
            required: false
        }
    },
    data() {
        return {
            canvas: {},
            context: {},
            initialPosition: { x: null, y: null },
            currentPosition: { x: null, y: null },
            gridDimensions: { width: 512, height: 512, rows: 16, columns: 16 },
            gridSideLength: -1,
            dirtySquares: [],
            spriteData: []
        }
    },
    mounted() {
        this.canvas = document.getElementById(this.canvasId);
        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = '#e7e7e7';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (!this.displayOnly) {
            this.canvas.addEventListener('click', this.canvasClicked);
            this.canvas.onmousemove = this.canvasHovered;
        }
        
        this.draw();
    },
    methods: {
        draw(event) {
            this.drawBackgroundGrid();

            for (let i = 0; i < this.dirtySquares.length; i++) {
                let dirtySquare = this.dirtySquares[i];
                this.context.fillStyle = this.fillColor;
                this.context.clearRect(dirtySquare.column * 16, dirtySquare.row * 16, 16, 16);
                this.context.beginPath();
                this.context.fillRect(dirtySquare.column * 16, dirtySquare.row * 16, 16, 16);
                this.context.closePath();

                // Move the dirty square to the actual sprite data array.
                this.spriteData.push(dirtySquare);
            }

            this.dirtySquares = [];
            requestAnimationFrame(this.draw);
        },
        drawBackgroundGrid() {
            for(let i = 0; i < 32; i++) {
                for (let ii = 0; ii < 32; ii++) {
                    if (i % 2 === 0) {
                        if (ii % 2 === 0) {
                            this.context.fillStyle= '#4C4C4C';
                        } else {
                            this.context.fillStyle= '#555555';
                        }
                    } else {
                        if (ii % 2 === 0) {
                            this.context.fillStyle= '#555555';
                        } else {
                            this.context.fillStyle= '#4C4C4C';
                        }
                    }

                    let xPos = ii * 16;
                    let yPos = i * 16;

                    let gridPosition = this.getGridPositionByCoordinates({ x: xPos, y: yPos })

                    // Only draw the background transparent grid if there is no sprite data for that specific canvas grid position.
                    if (!this.spriteData.find(x => x.row === gridPosition.row && x.column === gridPosition.column)) {
                        this.context.clearRect(xPos, yPos, 16, 16);
                        this.context.beginPath();
                        this.context.fillRect(xPos, yPos, 16, 16);
                        this.context.closePath();
                    }
                }
            }
        },
        canvasClicked(event) {
            this.initialPosition = this.getMouseCoordinates(event);
            this.dirtySquare = this.getGridPositionByCoordinates(this.initialPosition);
            this.dirtySquare.fillColor = this.fillColor;
            this.dirtySquares.push(this.dirtySquare);
        },
        canvasHovered(event) {
            console.log(event);
            if (event) {
                let mouseCoordinates = this.getMouseCoordinates(event);
                this.context.fillStyle = '#C0C0C0';
                this.context.fillRect(mouseCoordinates.x, mouseCoordinates.y, 16, 16);
            }
        },
        getGridPositionByCoordinates(mouseCoordinates) {
            // 16 is the px dimensions of each grid square.
            let c = Math.floor(mouseCoordinates.x / 16);
            let r = Math.floor(mouseCoordinates.y / 16);
            return { row: r, column: c };
        },
        getMouseCoordinates(event) {
            let rect = this.canvas.getBoundingClientRect();
            let position = { x: null, y: null };
            position.x = event.clientX - rect.left;
            position.y = event.clientY - rect.top;
            return position;
        },
        clearCanvas() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.fillStyle = '#e7e7e7';
        }
        // drawCircle() {
        //     this.currentPosition = this.getMouseCoordinates();
        //     let xDiff = this.currentPosition.x - this.initialPosition.x;
        //     let yDiff = this.currentPosition.y - this.initialPosition.y;
        //     let hypotenuse = Math.hypot(xDiff, yDiff);
        //     let radius = hypotenuse / 2;
        //     this.context.beginPath();
        //     this.context.arc(this.currentPosition.x / 2, this.currentPosition.y /2, radius, 0, 2 * Math.PI, true);
        //     this.context.stroke();
        //     this.context.closePath();
        // }
    }
};
</script>

<style lang="css" scoped>

</style>

