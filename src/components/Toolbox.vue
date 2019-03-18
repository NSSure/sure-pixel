<template>
    <div class="toolbox">
        <button type="button" class="tool-item active"><i class="fa fa-pencil-alt fa-lg"></i></button>
        <button type="button" class="tool-item"><i class="fa fa-eraser fa-lg"></i></button>
        <button type="button" class="tool-item"><i class="fa fa-paint-brush fa-lg"></i></button>
        <button type="button" class="tool-item"><i class="fa fa-hand-paper fa-lg"></i></button>
    </div>
</template>

<script>
export default {
    name: "toolbox"
};
</script>

<style lang="css" scoped>
.toolbox {
  display: flex;
  align-items: flex-start;
  /* flex-wrap: wrap; */
  flex-direction: column;
  flex: 1;
}

.tool-item {
  background-color: #DDDDDD;
  border: none;
  width: 100%;
  height: 64px;
}

.tool-item:hover {
  background-color: silver;
}

.tool-item.active {
  background-color: silver;
}

</style>

