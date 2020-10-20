<template>
  <div class="connection-accessibility">
    <div class="title">Toegankelijkheid</div>
    <div class="accessibility-item-container">
      <template v-for="(item, index) in bridge.accessibility">
        <figure
          :key="index"
          class="accessibility-item"
          v-if="item.possible"
          :title="item.name"
        >
          <img :src="fetchIcon(item.name)" alt="" />
        </figure>
      </template>
    </div>
  </div>
</template>

<script>
import { Bridge } from "@/classes/Bridge";
import { IconsService } from "@/service/IconsService";

export default {
  name: "Accessibility",
  props: {
    bridge: {
      type: Bridge,
      required: true
    }
  },
  methods: {
    fetchIcon(name) {
      return IconsService.accessebilityIcon(name);
    }
  }
};
</script>
