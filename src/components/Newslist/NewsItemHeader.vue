<template>
  <div class="news-item-header">
    <div class="icon-container" @click="$store.commit('news/closeShowItem')">
      <span class="icon">
        <img src="../../assets/images/chevron-left-solid.svg" alt="" /> </span
      ><span class="text">Vorige</span>
    </div>

    <div class="title">Nieuwsbericht</div>
  </div>
</template>

<script>
export default {
  name: "NewsItemHeader"
};
</script>

<style scoped></style>
