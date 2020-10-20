<template>
  <section class="mobile-connection-information">
    <header @click="showMore = !showMore">
      <div class="white-bar"></div>

      <div class="name">{{ connection.name }}</div>
      <div class="icons-container">
        <figure class="icon">
          <img :src="require('@/assets/images/icon_info.svg')" alt="" />
        </figure>
        <figure v-if="$store.state.connections.warning" class="icon">
          <img :src="require('@/assets/images/icon_warning.svg')" alt="" />
        </figure>
      </div>
    </header>
    <div>
      <connection-services :bridge="connection"></connection-services>
    </div>
    <transition name="slide-down" mode="out-in">
      <div v-if="showMore" @click="showMore = !showMore">
        <connection-information :bridge="connection"></connection-information>
        <connection-warning
          v-if="$store.state.connections.warning"
        ></connection-warning>
        <connection-accessibility
          :bridge="connection"
        ></connection-accessibility>
      </div>
    </transition>
  </section>
</template>

<script>
import ConnectionServices from "@/components/BridgeInformation/components/ConnectionServices";
import ConnectionAccessibility from "@/components/BridgeInformation/components/ConnectionAccessibility";
import ConnectionWarning from "@/components/BridgeInformation/components/ConnectionWarning";
import ConnectionInformation from "@/components/BridgeInformation/components/ConnectionInformation";

export default {
  name: "MobileConnectionInformation",
  components: {
    ConnectionServices,
    ConnectionAccessibility,
    ConnectionInformation,
    ConnectionWarning
  },
  computed: {
    connection() {
      return this.$store.state.connections.activeConnection;
    }
  },
  data() {
    return {
      showMore: false
    };
  }
};
</script>

<style scoped></style>
