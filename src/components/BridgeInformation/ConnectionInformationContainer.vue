<template>
  <div class="bridge-information-element-container">
    <lg-connection-information
      :bridge="bridge"
      :key="`bridge_information_${bridge.id}`"
      v-for="bridge in $store.state.connections.items"
    >
    </lg-connection-information>
  </div>
</template>

<script>
import LgConnectionInformation from "@/components/BridgeInformation/ConnectionInformation";

export default {
  name: "ConnectionInformationContainer",
  components: {
    LgConnectionInformation
  }
};
</script>

<style scoped></style>
