<template>
  <header>
    <div v-on:click="$emit('close')" class="back-button">
      <span class="icon"
        ><img src="../../assets/images/chevron-left-solid.svg" alt=""
      /></span>
      <span class="text">Vorige</span>
    </div>
    <div class="title">Nieuwsberichten</div>
  </header>
</template>

<script>
export default {
  name: "NewslistHeader"
};
</script>
