<template>
  <div>
    <div
      class="connection-information"
      :key="`information_${index}`"
      v-for="(information, index) in bridge.currentInformation"
    >
      <div class="icon">
        <img :src="require('@/assets/images/icon_info.svg')" alt="" />
      </div>
      <div>
        <div class="title">{{ information.title }}</div>
        <div class="description">
          {{ information.information }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Bridge } from "@/classes/Bridge";

export default {
  name: "ConnectionInformation",
  props: {
    bridge: Bridge
  }
};
</script>

<style scoped></style>
