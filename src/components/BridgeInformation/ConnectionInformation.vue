<template>
  <div class="lg-connection-information">
    <header @click="toggleShowMore">
      <div class="name">{{ bridge.name }}</div>
      <div class="icons-container">
        <figure class="icon" v-if="hasCurrentInformation">
          <img :src="getIcon('INFO')" alt="" />
        </figure>
        <figure v-if="hasWarning" class="icon">
          <img :src="getIcon('WARNING')" alt="" />
        </figure>

        <figure class="icon dropdown">
          <img :src="dropDownIcon" alt="" />
        </figure>
      </div>
    </header>
    <transition name="slide-down" mode="out-in">
      <div v-if="showMore">
        <section>
          <connection-services :bridge="bridge" />
        </section>
        <section v-if="hasCurrentInformation">
          <connection-information-element :bridge="bridge" />
        </section>

        <section v-if="hasWarning">
          <connection-warning></connection-warning>
        </section>
        <section>
          <connection-accessibility :bridge="bridge" />
        </section>
      </div>
    </transition>
  </div>
</template>

<script>
import { IconsService } from "@/service/IconsService";
import ConnectionWarning from "@/components/BridgeInformation/components/ConnectionWarning";
import ConnectionAccessibility from "@/components/BridgeInformation/components/ConnectionAccessibility";
import ConnectionInformationElement from "@/components/BridgeInformation/components/ConnectionInformation";
import ConnectionServices from "@/components/BridgeInformation/components/ConnectionServices";

export default {
  name: "ConnectionInformation",
  props: {
    bridge: {
      type: Object,
      required: true
    }
  },
  components: {
    ConnectionWarning,
    ConnectionInformationElement,
    ConnectionAccessibility,
    ConnectionServices
  },
  data() {
    return {
      showMore: false
    };
  },
  watch: {
    activeConnection(newValue) {
      newValue.id === this.bridge.id
        ? (this.showMore = true)
        : (this.showMore = false);
    }
  },
  computed: {
    dropDownIcon() {
      return this.showMore
        ? IconsService.icons("ANGLE_UP")
        : IconsService.icons("ANGLE_DOWN");
    },
    activeConnection() {
      return this.$store.state.connections.activeConnection;
    },
    hasCurrentInformation() {
      return this.bridge.currentInformation.length !== 0;
    },
    hasWarning() {
      return this.$store.state.connections.warning !== null;
    }
  },
  methods: {
    getIcon(name) {
      return IconsService.icons(name);
    },
    toggleShowMore() {
      this.showMore = !this.showMore;
      this.bridge.setActive();
      this.bridge.flyTo();
    }
  }
};
</script>

<style lang="scss" scoped></style>
