<template>
  <div id="main-header">
    <section class="logo-and-name">
      <div id="logo">
        <img src="../../assets/images/logo.svg" alt="Bridges logo" />
      </div>
      <div class="names">
        <div id="app_name">Bridges</div>
        <div id="app_current_location">London</div>
      </div>
    </section>
    <section class="news-item-button" @click="$emit('toggleNewsMenu')">
      <figure>
        <img src="../../assets/images/icon_news.svg" alt="" />
      </figure>
    </section>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped></style>
