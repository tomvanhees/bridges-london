<template>
  <div id="map"></div>
</template>

<script>
import { MapBoxGlMap } from "@/classes/MapBoxGlMap";

export default {
  name: "BlMap",
  data() {
    return {
      map: {}
    };
  },
  mounted() {
    this.map = MapBoxGlMap.getInstace();
  }
};
</script>
