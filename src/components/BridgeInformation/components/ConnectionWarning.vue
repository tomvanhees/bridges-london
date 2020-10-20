<template>
  <div class="connection-warning">
    <div class="icon">
      <img :src="require('@/assets/images/icon_warning.svg')" alt="" />
    </div>

    <div>
      <div class="title">{{ $store.state.connections.warning.title }}</div>
      <div class="description">
        {{ $store.state.connections.warning.generalInfo }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConnectionWarning"
};
</script>

<style scoped></style>
