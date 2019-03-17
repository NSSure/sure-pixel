<template>
    <div class="toolbox">
        <button type="button" class="tool-item active"><i class="fa fa-pencil-alt fa-lg"></i></button>
        <button type="button" class="tool-item"><i class="fa fa-eraser fa-lg"></i></button>
        <button type="button" class="tool-item"><i class="fa fa-paint-brush fa-lg"></i></button>
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

</style>

